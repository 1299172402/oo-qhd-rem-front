<!-- 后台——用户访问 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100 colon">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item v-show="activeName === 'first'" label="用户名称" prop="nickName">
          <el-input
            v-model="queryParams.nickName"
            placeholder="请输入用户名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'first'" label="用户账号" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户账号"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item v-show="activeName === 'first'" label="组织机构" prop="deptId">
          <el-select
            v-model="queryParams.deptId"
            placeholder="请选择"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="activeName === 'first'" label="操作时间">
          <el-date-picker
            v-model="queryParams.loginDate"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择时间"
            @change="dateRange = []"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'first'" label="自定义时间">
          <el-date-picker
            v-model="dateRange"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="queryParams.loginDate = undefined"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'second'" label="应用名称" prop="appName">
          <el-input
            v-model="queryParams.appName"
            placeholder="请输入应用名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-show="activeName === 'second'" label="应用分类" prop="appCategory">
          <el-select
            v-model="queryParams.appCategory"
            placeholder="请选择"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in dict.type.sys_app_applyCenter"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="activeName === 'second'" label="绑定租户" prop="tenantId">
          <el-select
            v-model="queryParams.tenantId"
            placeholder="请选择"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in deptList"
              :key="index"
              :label="item.tenantName"
              :value="item.tenantId"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="buttonArea">
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
        </el-form-item>
      </el-form>
    </header-search>

    <page-panel-new header-title="用户访问" :class="activeName === 'first' ? 'page-panel-height' : ''">
      <el-row>
        <el-col :span="20">
          <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="handleClick">
            <el-tab-pane label="用户访问记录" name="first" />
            <el-tab-pane label="应用访问统计" name="second" />
          </el-tabs>
        </el-col>
        <el-col v-if="activeName === 'first'" :span="4" style="text-align: right">
          <el-button
            v-hasPermi="['system:userAccess:export']"
            type="primary"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
      <el-table
        v-if="activeName === 'first'"
        :data="userList"
        height="calc(100% - 113px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '10px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="65" />
        <el-table-column label="用户名称" prop="nickName" />
        <el-table-column label="用户账号" prop="userName" />
        <el-table-column label="组织机构" prop="dept.deptName" />
        <el-table-column label="访问时间" align="center" prop="loginDate">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.loginDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问页面" prop="accessPage" width="150" />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.userAccessStatus == 0">- -</span>
            <span v-else>活跃</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="activeName === 'second'"
        class="doubleHeader"
        :data="userList"
        height="calc(100% - 113px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '10px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="65" />
        <el-table-column label="应用名称" prop="appName" />
        <el-table-column label="应用类型">
          <template slot-scope="scope">
            {{ dict.type.sys_app_type?.find((dict) => dict.value == scope.row.appType)?.label }}
          </template>
        </el-table-column>
        <el-table-column label="应用分类" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ dict.type.sys_app_applyCenter?.find((dict) => dict.value == scope.row.apply)?.label }}
          </template>
        </el-table-column>
        <el-table-column label="绑定租户" prop="tenants" />
        <el-table-column label="访问时间" align="center" prop="updateTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label-class-name="twoRowHeader"
          prop="num"
          width="150"
          sortable
        >
          <template #header>
            <div class="headerSortRow1">
              <span>应用访问统计</span>
              <br>
              <span>(次)</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%">
        <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </page-panel-new>
  </div>
</template>
<script>

import { listUseraccess, getAccessCount, appAccessList } from "@/api/intelligentOilfield/system/user";
import { listDept } from "@/api/intelligentOilfield/system/dept";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import { listTenant } from "@/api/intelligentOilfield/messaging";

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
  name: "UserAccess",
  components: {},
  dicts: ["sys_normal_disable", "sys_app_applyCenter", "sys_app_type"],
  data() {
    return {
      activeName: "first",
      dataZhuzhuang: {
        xAxis: {
          data: [],
          type: "category",
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function(value) {
              if (value.length > 6) {
                return `${value.slice(0, 6)}...`;
              }
              return value;
            },
            textStyle: {
              padding: [5, 0, 0, 0],
              color: "rgb(144, 144, 144)" // X轴文字颜色
            },
            rotate: -45
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [
          {
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: "rgb(144, 144, 144)"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: []
          }
        ]
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      userList: [],
      // 是否显示弹出层（数据权限）
      menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptNodeAll: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: undefined,
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
        nickName: undefined,
        userName: undefined,
        loginDate: undefined,
        beginTime: undefined,
        endTime: undefined,
        appName: undefined,
        appCategory: undefined,
        tenantId: undefined
      },
      deptSelect: [],
      // 表单参数
      form: {},
      deptList: [],
      searchOption: []
    };
  },
  mounted() {
    this.getList();
  },
  created() {
    this.choiceDepts(); // 获取组织机构
    this.getAccessCount();
    this.getOrgTreeData();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.dateRange = [];
      this.resetForm("queryForm");
      this.getList();
    },
    /** 查询组织机构树形数据列表 */
    getOrgTreeData() {
      listTenant({
        pageNum: 1,
        pageSize: 1000
      }).then(response => {
        this.deptList = response.data.rows;
      });
    },
    // 查询统计表信息
    getAccessCount() {
      getAccessCount().then(response => {
        this.dataZhuzhuang.xAxis.data = [];
        this.dataZhuzhuang.series[0].data = [];
        response.data.data.forEach(item => {
          this.dataZhuzhuang.xAxis.data.push(item.appName);
          this.dataZhuzhuang.series[0].data.push(item.count);
        });
      });
    },
    // 选择机构
    choiceDepts() {
      listDept().then(response => {
        this.deptSelect = response.data.data;
        this.deptList = this.handleTree(response.data.data, "deptId");
      });
    },
    /** 查询用户访问列表 */
    getList() {
      this.loading = true;
      if (this.activeName === "first") {
        if (this.dateRange) {
          const [beginTime, endTime] = this.dateRange;
          this.queryParams.beginTime = beginTime;
          this.queryParams.endTime = endTime;
        } else {
          this.queryParams.beginTime = undefined;
          this.queryParams.endTime = undefined;
        }
        listUseraccess(this.queryParams).then(response => {
          this.userList = response.data.rows;
          this.total = response.data.total;
          this.loading = false;
        });
      } else {
        const param = {
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          appName: this.queryParams.appName ? this.queryParams.appName : undefined,
          appCategory: this.queryParams.appCategory ? this.queryParams.appCategory : undefined,
          tenantId: this.queryParams.tenantId ? this.queryParams.tenantId : undefined
        };
        appAccessList(param).then(response => {
          this.$nextTick(() => {
            this.userList = response.data.rows;
            this.total = response.data.total;
            this.loading = false;
          });
        });
      }
    },
    // 表单重置
    reset() {
      if (this.$refs.menu !== undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.menuExpand = false;
      this.menuNodeAll = false;
      this.deptExpand = true;
      this.deptNodeAll = false;
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        remark: undefined
      };
      this.resetForm("form");
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
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/exportAccessPage",
        {
          ...this.queryParams
        },
        `user_access_${new Date().getTime()}.xlsx`
      );
    }
  }
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}
</style>