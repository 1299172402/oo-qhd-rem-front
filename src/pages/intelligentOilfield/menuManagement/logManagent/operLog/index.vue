<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        style="margin-top: 20px"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="系统模块" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入系统模块"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="操作人员" prop="operName">
          <el-input
            v-model="queryParams.operName"
            placeholder="请输入操作人员"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="类型" prop="businessType">
          <el-select
            v-model="queryParams.businessType"
            placeholder="操作类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in dict.type.sys_oper_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="操作状态"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in dict.type.sys_common_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="dateRange"
            size="small"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <div class="g-row-flex" style="justify-content: flex-end;">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </div>
      </el-form>
    </header-search>

    <page-panel-new header-title="操作日志" style="height: calc(100% - 165px)">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:operlog:export']"
            type="primary"
            plain
            size="mini"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:operlog:remove']"
            type="danger"
            plain
            size="mini"
            :disabled="multiple"
            class="commonBtn delbutton"
            @click="handleDelete"
          >
            删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:operlog:remove']"
            type="danger"
            plain
            size="mini"
            class="commonBtn"
            @click="handleClean"
          >
            清空
          </el-button>
        </el-col>
      </el-row>
      <el-table
        ref="tables"
        height="calc(100% - 110px)"
        :data="list"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%"
        :default-sort="defaultSort"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <!-- <el-table ref="tables" v-loading="loading" :data="list"  -->
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column label="系统模块" align="center" prop="title" />
        <el-table-column label="操作类型" align="center" prop="businessType">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_oper_type" :value="scope.row.businessType" />
          </template>
        </el-table-column>
        <el-table-column label="请求方式" align="center" prop="requestMethod" />
        <el-table-column
          label="操作人员"
          align="center"
          prop="operName"
          :show-overflow-tooltip="true"
          sortable="custom"
          :sort-orders="['descending', 'ascending']"
          width="100"
        />
        <!-- TODO: Maybe change back -->
        <!--          <el-table-column
             label="主机"
             align="center"
             prop="operIp"
             width="130"
             :show-overflow-tooltip="true"
           /> -->
        <el-table-column label="操作状态" align="center" prop="status">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_common_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column
          label="操作日期"
          align="center"
          prop="operTime"
          sortable="custom"
          :sort-orders="['descending', 'ascending']"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.operTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:operlog:query']"
              size="mini"
              type="text"
              @click="handleView(scope.row, scope.index)"
            >
              详细
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </page-panel-new>

    <!-- 操作日志详细 -->
    <el-dialog
      title="操作日志详细"
      :visible.sync="open"
      width="700px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        size="mini"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块：">
              {{ form.title }} / {{ typeFormat(form) }}
            </el-form-item>
            <el-form-item label="登录信息：">
              {{ form.operName }} / {{ form.operIp }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">
              {{ form.operUrl }}
            </el-form-item>
            <el-form-item label="请求方式：">
              {{ form.requestMethod }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作方法：">
              {{ form.method }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">
              {{ form.operParam }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回参数：">
              {{ form.jsonResult }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作状态：">
              <div v-if="form.status === 0">
                正常
              </div>
              <div v-else-if="form.status === 1">
                失败
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间：">
              {{ parseTime(form.operTime) }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.status === 1" label="异常信息：">
              {{ form.errorMsg }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="commonBtn" @click="open = false">
          关 闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, delOperlog, cleanOperlog } from "@/api/intelligentOilfield/system/operlog";

export default {
  name: "OperLog",
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 默认排序
      defaultSort: { prop: "operTime", order: "descending" },
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        operName: undefined,
        businessType: undefined,
        status: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    /** 查询登录日志 */
    getList() {
      this.list = [];
      const [beginTime, endTime] = this.dateRange;
      this.queryParams.beginTime = beginTime;
      this.queryParams.endTime = endTime;
      list(this.addDateRange(this.queryParams)).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    // 操作日志类型字典翻译
    typeFormat(row) {
      return this.selectDictLabel(this.dict.type.sys_oper_type, row.businessType);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.$refs.tables.sort(this.defaultSort.prop, this.defaultSort.order);
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.operId);
      this.multiple = !selection.length;
    },
    /** 排序触发事件 */
    handleSortChange(column) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.getList();
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.open = true;
      this.form = row;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const operIds = row.operId || this.ids;
      this.$modal
        .confirm(`是否确认删除日志编号为"${operIds}"的数据项？`)
        .then(() => delOperlog(operIds))
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal
        .confirm("是否确认清空所有操作日志数据项？")
        .then(() => cleanOperlog())
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("清空成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/operlog/export",
        {
          ...this.queryParams
        },
        `operlog_${new Date().getTime()}.xlsx`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.app-container {
  height: 100%;

  .commonHeader {
    height: 145px !important;
  }

  .el-table {
    overflow: scroll;
  }
}
</style>