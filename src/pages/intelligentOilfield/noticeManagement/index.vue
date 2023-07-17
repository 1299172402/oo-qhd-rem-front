<!-- 后台——通知通告管理 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100 colon">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="通知租户" prop="tenantId">
          <el-select
            v-model="queryParams.tenantId"
            placeholder="请选择通知租户"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in tenantSelect"
              :key="index"
              :label="item.tenantName"
              :value="item.tenantId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="通知内容" prop="noticeContent">
          <el-input
            v-model="queryParams.noticeContent"
            placeholder="请输入通知内容"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="操作人员" prop="createBy">
          <el-input
            v-model="queryParams.createBy"
            placeholder="请输入操作人员"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="类型" prop="noticeType">
          <el-select
            v-model="queryParams.noticeType"
            placeholder="请选择类型"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in types"
              :key="index"
              :label="item.type"
              :value="item.noticeType"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="buttonArea">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>

    <page-panel-new header-title="通知通告列表">
      <el-row :gutter="10" class="mb8 mbBottom">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:notice:add']"
            type="primary"
            size="mini"
            @click="handleAdd"
          >
            新增
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="noticeList"
        height="calc(100% - 96px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column
          label="序号"
          type="index"
          width="120"
          align="center"
        />
        <el-table-column
          label="通知内容"
          prop="noticeContent"
          :show-overflow-tooltip="true"
          width="260"
          align="center"
        />
        <el-table-column
          label="通知类型"
          prop="noticeTypename"
          :show-overflow-tooltip="true"
          width="150"
          align="center"
        />
        <el-table-column
          label="通知租户"
          prop="tenantListName"
          width="200"
          align="center"
        />
        <el-table-column
          label="创建者"
          prop="createBy"
          width="180"
          align="center"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="240"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="noticetype"
          width="100"
          align="center"
        />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template v-if="scope.row.noticeType === '2'" slot-scope="scope">
            <el-button
              v-if="scope.row.status === '0'"
              v-hasPermi="['system:notice:enable']"
              type="text"
              @click="handleStart(scope.row)"
            >
              启用
            </el-button>
            <el-button
              v-if="scope.row.status === '1'"
              v-hasPermi="['system:notice:close']"
              type="text"
              @click="handleClose(scope.row)"
            >
              关闭
            </el-button>
            <el-button
              v-hasPermi="['system:notice:remove']"
              type="text"
              class="delbutton"
              @click="handleDelete(scope.row)"
            >
              删除
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
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="addform"
        :model="addform"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="通知内容" prop="noticeContent">
              <el-input
                v-model="addform.noticeContent"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 2, maxRows: 6}"
                style="width: 300px"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="通知类型" prop="noticeType">
              <el-select
                v-model="addform.noticeType"
                style="width: 300px"
                placeholder="请选择应用"
                clearable
              >
                <el-option
                  v-for="(item, index) in noticetypes"
                  :key="index"
                  :label="item.noticeName"
                  :value="item.noticeId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addform.noticeType === 1">
          <el-col :span="12" :offset="3">
            <el-form-item label="发送时间" prop="radio">
              <div>
                <el-radio v-model="addform.radio" :label="1">
                  即刻发送
                </el-radio>
              </div>
              <div style="display: flex; align-items: center">
                <el-radio v-model="addform.radio" :label="2">
                  定时发送
                </el-radio>
                <el-form-item v-if="addform.radio == 2" label="" prop="sendTime">
                  <el-date-picker
                    v-model="addform.sendTime"
                    type="datetime"
                    format="yyyy.MM.dd HH : mm"
                    value-format="yyyy-MM-dd HH:mm:00"
                    placeholder="请选择定时时间"
                  />
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="通知对象" prop="tenantIds">
              <el-table
                :data="tenantList"
                row-key="tenantId"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                :default-expand-all="isExpandAll"
                height="auto"
                style="max-height: 500px; overflow: scroll;width: 310px;max-width: 310px"
                @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  align="center"
                />
                <el-table-column
                  prop="tenantName"
                  label="部门名称"
                  width="200"
                  align="center"
                />
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancel">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addnotice, noticeList, deldataNotice, updatenotice, listTenant } from "@/api/intelligentOilfield/system/notice";

export default {
  name: "Notice",
  dicts: ["sys_normal_disable"],
  data() {
    return {
      open: false, // 新增弹框
      title: "", // 弹窗标题
      types: [
        { noticeType: "1", type: "通知" },
        { noticeType: "2", type: "公告" }
      ], // 类型
      tenantSelect: [],
      noticetypes: [
        { noticeId: 1, noticeName: "通知" },
        { noticeId: 2, noticeName: "公告" }
      ],
      addform: {
        noticeContent: "",
        noticeType: "",
        radio: 1,
        sendTime: "",
        tenantIds: []
      },
      // 是否展开，默认全部展开
      isExpandAll: true,
      tenantList: [],
      rules: {
        noticeContent: [{ required: true, message: "请输入通知内容" }],
        noticeType: [{ required: true, message: "请选择通知类型" }],
        radio: [{ required: true, message: "请选择发送时间" }],
        sendTime: [{ required: true, message: "请选择定时时间" }],
        tenantIds: [{ required: true, message: "请选择通知对象" }]
      },
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      noticeList: [],
      // 选中数组
      ids: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        tenantId: undefined,
        noticeContent: undefined,
        createBy: undefined,
        noticeType: undefined
      }
    };
  },
  created() {
    this.getList();
    this.choiceTenants(); // 获取组织机构
  },
  activated() {
    this.getList();
  },
  methods: {
    /** 查询通知通告列表 */
    getList() {
      this.loading = true;
      noticeList(this.queryParams).then(response => {
        response.data.rows.forEach(item => {
          if (item.noticeType === "1") {
            item.noticeTypename = "通知";
            if (item.status === "0") {
              item.noticetype = "未发送";
            } else if (item.status === "1") {
              item.noticetype = "已发送";
            } else {
              item.noticetype = "发送失败";
            }
          } else {
            item.noticeTypename = "公告";
            if (item.status === "0") {
              item.noticetype = "未启用";
            } else {
              item.noticetype = "播放中";
            }
          }
          if (item.tenantList) {
            item.tenantName = item.tenantList?.map(d => d?.tenantName).join(",");
          }
        });
        this.noticeList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 选择机构
    choiceTenants() {
      this.title = "新增通知";
      this.choiceTenant = true;
      listTenant({
        pageNum: 1,
        pageSize: 100000
      }).then(response => {
        this.tenantSelect = response.data.rows;
        this.tenantList = this.handleTree(response.data.rows, "tenantId");
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu !== undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.addform = {
        noticeContent: "",
        noticeType: "",
        radio: 1,
        sendTime: "",
        tenantIds: []
      };
      this.resetForm("addform");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
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
    // 多选框选中数据（选择机构）
    handleSelectionChange1(selection) {
      this.addform.tenantIds = selection.map(item => item.tenantId);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增通知";
      this.choiceTenants();
    },
    /** 关闭按钮操作 */
    handleClose(row) {
      this.$modal
        .confirm("是否确认关闭该通告？")
        .then(() => { row.status = 0; })
        .then(() => updatenotice(row))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess("关闭成功");
          }
        })
        .catch(() => {});
    },
    /** 启用按钮操作 */
    handleStart(row) {
      this.$modal
        .confirm("是否确认启用该通告？")
        .then(() => { row.status = 1; })
        .then(() => updatenotice(row))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess("启用成功");
          }
        })
        .catch(() => {});
    },
    /** 确认增加按钮 */
    submitForm() {
      this.$refs.addform.validate(valid => {
        if (valid) {
          const notice = this.addform;
          addnotice(notice).then(res => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const dataIds = row.noticeId;
      this.$modal
        .confirm("是否确认删除该条通知公告？")
        .then(() => deldataNotice(dataIds))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess("删除成功");
          }
        })
        .catch(() => {});
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

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>