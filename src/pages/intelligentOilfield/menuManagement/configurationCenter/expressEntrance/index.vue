<!-- 后台——快捷入口 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px;"
      >
        <el-form-item label="快捷入口名称" prop="enterName">
          <el-input
            v-model="queryParams.enterName"
            placeholder="请输入快捷入口名称"
            clearable
            size="small"
            style="width: 240px;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
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

    <page-panel-new header-title="快捷入口配置" style="height: calc(100% - 100px);">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px;">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:enter:add']"
            type="primary"
            size="mini"
            style="height: 40px;"
            @click="handleAdd"
          >
            新增
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="dataList"
        height="calc(100% - 113px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          label="快捷入口名称"
          prop="enterName"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="入口模块" prop="enterModule" align="center">
          <template slot-scope="scope">
            <span>{{ searchOption?.find((dict) => dict.value == scope.row.enterModule)?.label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="入口URL"
          prop="enterUrl"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template v-if="scope.row.roleId !== '1'" slot-scope="scope">
            <el-button
              v-hasPermi="['system:enter:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:enter:rolePermission']"
              size="mini"
              type="text"
              @click="handleRole(scope.row)"
            >
              角色权限
            </el-button>
            <el-button
              v-hasPermi="['system:enter:tenantPermission']"
              size="mini"
              type="text"
              @click="handleOrganization(scope.row)"
            >
              租户权限
            </el-button>
            <el-button
              v-hasPermi="['system:enter:remove']"
              size="mini"
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
    <!-- 新增对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openAdd"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="formAdd"
        :model="addform"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="快捷入口名称" prop="enterName">
          <el-input v-model="addform.enterName" />
        </el-form-item>
        <el-form-item label="入口模块" prop="enterModule">
          <!-- <el-select v-model="addform.enterModule" placeholder="请选择" clearable size="small" style="width: 240px">
            <el-option v-for="dict in dict.type.sys_business_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="addform.enterModule"
            size="small"
            style="width: 100%;"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in searchOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入口URL" prop="enterUrl">
          <el-input v-model="addform.enterUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdd">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancelAdd('formAdd')">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openEdit"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="formEdit"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="快捷入口名称" prop="enterName">
          <el-input v-model="form.enterName" />
        </el-form-item>
        <el-form-item label="入口模块" prop="enterModule">
          <!-- <el-select v-model="form.enterModule" placeholder="请选择" clearable size="small" style="width: 240px">
            <el-option v-for="dict in dict.type.sys_business_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="form.enterModule"
            size="small"
            style="width: 100%;"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in searchOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入口URL" prop="enterUrl">
          <el-input v-model="form.enterUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancelEdit('formEdit')">
          取 消
        </el-button>
      </div>
    </el-dialog>

    <!-- 角色权限配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      @close="closeRole"
    >
      <el-table
        ref="roleTable"
        :data="roleList"
        :row-key="(row) => row.roleId"
        @selection-change="handleRoleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :reserve-selection="true"
        />
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          label="角色名称"
          prop="roleName"
          align="center"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <pagination
        v-show="roleTotal > 0"
        :total="roleTotal"
        :page.sync="roleQueryParam.pageNum"
        :limit.sync="roleQueryParam.pageSize"
        :page-sizes="size"
        @pagination="getRoleList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRole">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancel">
          取 消
        </el-button>
      </div>
    </el-dialog>

    <!-- 租户权限配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openOrganization"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      @close="closeTenant"
    >
      <!-- <el-tree class="tree-border" :data="deptList" :default-checked-keys="defaultCheckedKeys" show-checkbox
        default-expand-all ref="dept" @check="handleOrganizationSelectionChange" node-key="tenantId" empty-text="加载中，请稍候"
        :props="defaultProps" :check-strictly="isCheck"></el-tree> -->
      <el-table
        ref="tenantTable"
        :data="deptList"
        :row-key="(row) => row.tenantId"
        @selection-change="handleOrganizationSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :reserve-selection="true"
        />
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          label="租户名称"
          prop="tenantName"
          align="center"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <pagination
        v-show="tentTotal > 0"
        :total="tentTotal"
        :page.sync="tenantQueryParam.pageNum"
        :limit.sync="tenantQueryParam.pageSize"
        :page-sizes="size"
        @pagination="getOrgTreeData"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOrganization">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancelDataScope">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEnter, addEnter, delEnter, updateEnter } from "@/api/intelligentOilfield/system/configyration";
import { listRole } from "@/api/intelligentOilfield/system/role";
// import { treeselect as menuTreeselect, roleMenuTreeselect } from '@/api/intelligentOilfield/system/menu';
// import { listDept } from '@/api/intelligentOilfield/system/dept';
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import { listTenant } from "@/api/intelligentOilfield/messaging";

export default {
  name: "ShortcutEntryConfiguration",
  dicts: ["sys_business_module"],
  data() {
    return {
      searchOption: [],
      form: { tenantId: this.$store.getters["user/tenantId"], enterName: undefined, enterUrl: undefined, enterModule: undefined },
      // 表单校验
      rules: {
        enterName: [{ required: true, message: "快捷入口不能为空", trigger: "blur" }],
        enterUrl: [{ required: true, message: "入口URL不能为空", trigger: "blur" }],
        enterModule: [{ required: true, message: "入口模块不能为空", trigger: "blur" }]
      },
      openEdit: false,
      openAdd: false,
      addform: {
        enterName: "",
        enterUrl: "",
        enterModule: ""
      },
      size: [10, 20, 30, 50],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      tenantids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      dataList: [],
      // 角色列表
      roleList: [],
      // 组织机构列表
      deptList: [],
      defaultCheckedKeys: [], // 组织机构回显
      // 弹出层标题
      title: "",
      // 是否显示弹出层角色权限
      open: false,
      // 是否显示弹出层（租户权限）
      openOrganization: false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        enterName: undefined
      },
      // 角色弹框的分页参数
      roleTotal: 0,
      tentTotal: 0,
      roleQueryParam: {
        pageNum: 1,
        pageSize: 10
      },
      tenantQueryParam: {
        pageNum: 1,
        pageSize: 10
      },
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      isCheck: false
    };
  },
  watch: {
    "$store.state.user.tenantId": {
      handler(newValue) {
        if (newValue) {
          this.getSelectOptions();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getList();
    this.getRoleList();
    this.getOrgTreeData();
  },
  activated() {
    this.getList();
  },
  methods: {
    getSelectOptions() {
      const tenantId = this.$store.getters["user/tenantId"];
      this.searchOption = [];
      applicationAllList(tenantId).then(response => {
        response.data.data.forEach(el => {
          this.searchOption.push({
            label: el.appName,
            value: el.appId
          });
        });
      });
    },
    /** 查询指标列表 */
    getList() {
      this.loading = true;
      // this.total = this.dataList.length;
      this.loading = false;
      listEnter(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.dataList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.openAdd = true;
      this.title = "新增";
      this.reset();
    },
    /** 确认新增 */
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          addEnter(this.addform).then(res => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess("新增成功");
              this.openAdd = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 取消新增 */
    cancelAdd(formName) {
      this.$refs[formName].resetFields();
      this.openAdd = false;
    },
    /** 获取角色权限列表 */
    getRoleList() {
      listRole(this.roleQueryParam).then(response => {
        this.roleTotal = response.data.total;
        this.roleList = response.data.rows;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.openEdit = true;
      this.title = "编辑";
      this.form.enterName = row.enterName;
      this.form.enterUrl = row.enterUrl;
      this.form.enterId = row.enterId;
      this.form.enterModule = row.enterModule;
    },
    /** 确认修改 */
    submitEdit() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          updateEnter(this.form).then(res => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess("修改成功");
              this.openEdit = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 取消修改 */
    cancelEdit(formName) {
      this.$refs[formName].resetFields();
      this.openEdit = false;
    },
    // 表单重置
    reset() {
      this.addform = {
        enterName: undefined,
        enterUrl: undefined,
        enterModule: undefined
      };
      this.resetForm("formAdd");
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const { enterId } = row;
      this.$modal
        .confirm("是否确认删除该快捷入口？")
        .then(() => delEnter(enterId))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.queryParams.pageNum = 1;
            this.getList();
            this.$modal.msgSuccess("删除成功");
          }
        })
        .catch(() => {});
    },
    /** 打开角色权限弹框 */
    handleRole(row) {
      this.title = "角色权限";
      this.open = true;
      this.form.enterId = row.enterId;
      // 回显勾选的数据
      this.$nextTick(() => {
        this.roleList.forEach(item => {
          if (row.roleIds.includes(item.roleId)) {
            // console.log(row.roleIds)
            this.$refs.roleTable.toggleRowSelection(item);
          }
        });
      });
    },
    /** 提交按钮（角色权限） */
    submitRole() {
      const params = {
        enterId: this.form.enterId,
        roleIds: this.ids
      };
      updateEnter(params).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess("绑定完成");
          this.open = false;
          this.getList();
        }
      });
    },
    // 角色权限弹框关闭前
    closeRole() {
      this.$refs.roleTable.clearSelection();
      this.roleQueryParam.pageNum = 1;
    },
    closeTenant() {
      this.$refs.tenantTable.clearSelection();
      this.tenantQueryParam.pageNum = 1;
    },
    /** 打开租户权限弹框 */
    handleOrganization(row) {
      this.defaultCheckedKeys = [];
      this.title = "租户权限";
      this.form.enterId = row.enterId;
      this.openOrganization = true;
      // 回显勾选的数据
      this.$nextTick(() => {
        this.deptList.forEach(item => {
          if (row.tenantIds.includes(item.tenantId)) {
            // console.log(row.roleIds)
            this.$refs.tenantTable.toggleRowSelection(item);
          }
        });
      });
    },
    /** 提交按钮（租户权限） */
    submitOrganization() {
      const params = {
        enterId: this.form.enterId,
        tenantIds: this.tenantids
      };
      updateEnter(params).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess("绑定完成");
          this.openOrganization = false;
          this.getList();
        }
      });
    },
    /** 查询租户权限列表 */
    getOrgTreeData() {
      listTenant(this.tenantQueryParam).then(response => {
        this.deptList = response.data.rows;
        this.tentTotal = response.data.total;
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openOrganization = false;
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
    /** 角色多选框选中数据 */
    handleRoleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId);
    },
    /** 租户权限多选框选中数据 */
    // handleOrganizationSelectionChange(checkedNodes, currentNode) {
    //   this.defaultCheckedKeys = currentNode.checkedKeys;
    // },
    handleOrganizationSelectionChange(selection) {
      this.tenantids = selection.map(item => item.tenantId);
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