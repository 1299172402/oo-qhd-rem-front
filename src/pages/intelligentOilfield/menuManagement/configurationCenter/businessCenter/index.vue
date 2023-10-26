<!--后台——业务中心-->
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
        <el-form-item label="大屏名称" prop="businessName">
          <el-input
            v-model="queryParams.businessName"
            placeholder="请输入大屏名称"
            clearable
            size="small"
            style="width: 240px;"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="业务模块" prop="businessModule">
          <!-- <el-select v-model="queryParams.businessModule" placeholder="请选择" clearable size="small" style="width: 240px">
          <el-option v-for="dict in dict.type.sys_business_module" :key="dict.value" :label="dict.label"
            :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="queryParams.businessModule"
            size="small"
            style="width: 240px;"
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
    <page-panel-new header-title="业务列表" style="height: calc(100% - 100px);">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px;">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:business:add']"
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
          label="业务ID"
          prop="businessNo"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="业务名称"
          prop="businessName"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="业务模块"
          prop="businessModule"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ searchOption?.find(dict => dict.value == scope.row.businessModule)?.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务缩略图" align="center" width="150">
          <template slot-scope="scope">
            <img
              v-if="scope.row.businessImg"
              :src="scope.row.businessImg"
              class="avatar"
              style="height: 30px;margin: 5px auto;width: 53px;"
            >
            <span v-else>{{ scope.row.businessImg }}</span>
          </template>
        </el-table-column>
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
              v-hasPermi="['system:business:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:business:rolePermission']"
              size="mini"
              type="text"
              @click="handleRole(scope.row)"
            >
              角色权限
            </el-button>
            <el-button
              v-hasPermi="['system:business:tenantPermission']"
              size="mini"
              type="text"
              @click="handleOrganization(scope.row)"
            >
              租户权限
            </el-button>
            <el-button
              v-hasPermi="['system:business:remove']"
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
        <!-- <el-form-item label="业务ID" prop="businessNo">
          <el-input v-model="addform.businessNo"></el-input>
          </el-form-item> -->
        <el-form-item label="业务名称" prop="businessName">
          <el-input v-model="addform.businessName" />
        </el-form-item>
        <el-form-item label="业务模块" prop="businessModule">
          <!-- <el-select v-model="addform.businessModule" placeholder="请选择" clearable size="small" style="width: 240px">
            <el-option v-for="dict in dict.type.sys_business_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="addform.businessModule"
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
        <el-form-item label="业务URL" prop="businessUrl">
          <el-input v-model="addform.businessUrl" />
        </el-form-item>
        <el-form-item label="业务缩略图" prop="businessImg">
          <el-upload
            class="avatar-uploader imageUpload"
            action=""
            :show-file-list="false"
            :http-request="addformHttpRequest"
            :disabled="addform.businessImg ? true : false"
          >
            <div
              style="width: 100%; height: 100%; position: relative;"
              @mouseenter="onmouseoveradd"
              @mouseleave="onmouseout"
            >
              <div v-show="visibledelAdd" class="imgback">
                <i class="el-icon-delete" @click.stop="deleteImg" />
              </div>
              <img v-if="addform.businessImg" :src="addform.businessImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
          </el-upload>
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
        <!-- <el-form-item label="业务ID" prop="businessNo">
          <el-input v-model="form.businessNo"></el-input>
          </el-form-item> -->
        <el-form-item label="业务名称" prop="businessName">
          <el-input v-model="form.businessName" />
        </el-form-item>
        <el-form-item label="业务模块" prop="businessModule">
          <!-- <el-select v-model="form.businessModule" placeholder="请选择" clearable size="small" style="width: 240px">
            <el-option v-for="dict in dict.type.sys_business_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="form.businessModule"
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
        <el-form-item label="业务URL" prop="businessUrl">
          <el-input v-model="form.businessUrl" />
        </el-form-item>
        <el-form-item label="业务缩略图" prop="businessImg">
          <el-upload
            class="avatar-uploader imageUpload"
            action=""
            :show-file-list="false"
            :http-request="formHttpRequest"
            :disabled="form.businessImg ? true : false"
          >
            <div
              style="width: 100%; height: 100%; position: relative;"
              @mouseenter="onmouseover"
              @mouseleave="onmouseout"
            >
              <div v-show="visibledel" class="imgback">
                <i class="el-icon-delete" @click.stop="deleteImg" />
              </div>
              <img v-if="form.businessImg" :src="form.businessImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
          </el-upload>
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
import { listBusiness, addBusiness, delBusiness, updateBusiness, uploadBusinessImg } from "@/api/intelligentOilfield/system/business";
import { listRole } from "@/api/intelligentOilfield/system/role";
// import { treeselect as menuTreeselect, roleMenuTreeselect } from '@/api/intelligentOilfield/system/menu';
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import { listTenant } from "@/api/intelligentOilfield/messaging";

export default {
  name: "LargeScreenConfiguration",
  dicts: ["sys_business_module"],
  data() {
    return {
      searchOption: [],
      visibledel: false,
      visibledelAdd: false,
      form: {
        // businessNo: undefined,
        businessName: undefined, businessModule: undefined, businessUrl: undefined, businessImg: undefined
      },
      // 表单校验
      rules: {
        businessModule: [{ required: true, message: "业务模块不能为空", trigger: "blur" }],
        businessName: [{ required: true, message: "业务名称不能为空", trigger: "blur" }],
        // businessNo: [{ required: true, message: '业务ID不能为空', trigger: 'blur' }],
        businessUrl: [{ required: true, message: "业务URL不能为空", trigger: "blur" }],
        businessImg: [{ required: true, message: "业务缩略图不能为空", trigger: "blur" }]
      },
      openEdit: false,
      openAdd: false,
      addform: {
        businessModule: "",
        businessName: "",
        // businessNo: '',
        businessUrl: "",
        businessImg: ""
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
        businessName: undefined,
        businessModule: undefined
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
    this.getOrgTreeData();
    this.getRoleList();
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
      listBusiness(this.queryParams).then(response => {
        response.data.rows.forEach(item => {
          item.businessModule = String(item.businessModule.toLocaleString());
        });
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
    /** 新增上传缩略图 */
    addformHttpRequest({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      uploadBusinessImg(formData).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.addform.businessImg = res.data.msg;
        }
      });
    },
    /** 确认新增 */
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          addBusiness(this.addform).then(res => {
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
      this.businessImg = "";
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
      this.form.businessModule = String(row.businessModule.toLocaleString());
      this.form.businessName = row.businessName;
      // this.form.businessNo = row.businessNo;
      this.form.businessId = row.businessId;
      this.form.businessUrl = row.businessUrl;
      this.form.businessImg = row.businessImg;
    },
    /** 修改上传缩略图 */
    formHttpRequest({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      uploadBusinessImg(formData).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.form.businessImg = res.data.msg;
        }
      });
    },
    onmouseover() {
      if (this.form.businessImg) {
        this.visibledel = true;
      }
    },
    onmouseoveradd() {
      if (this.addform.businessImg) {
        this.visibledelAdd = true;
      }
    },
    onmouseout() {
      this.visibledel = false;
      this.visibledelAdd = false;
    },
    deleteImg() {
      this.form.businessImg = "";
      this.addform.businessImg = "";
      this.visibledel = false;
      this.visibledelAdd = false;
    },
    /** 确认修改 */
    submitEdit() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          updateBusiness(this.form).then(res => {
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
        // businessNo: undefined,
        businessName: undefined,
        businessModule: undefined,
        businessUrl: undefined,
        businessImg: undefined
      };
      this.resetForm("formAdd");
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const { businessId } = row;
      this.$modal
        .confirm("是否确认删除该业务？")
        .then(() => delBusiness(businessId))
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
      this.form.businessId = row.businessId;
      // 回显勾选的数据
      this.$nextTick(() => {
        this.roleList.forEach(item => {
          if (row.roleIds.includes(item.roleId)) {
            this.$refs.roleTable.toggleRowSelection(item);
          }
        });
      });
    },
    /** 提交按钮（角色权限） */
    submitRole() {
      this.form.roleIds = this.ids;
      updateBusiness(this.form).then(res => {
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
      this.form.businessId = row.businessId;
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
      this.form.tenantIds = this.tenantids;
      updateBusiness(this.form).then(res => {
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
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        businessName: undefined,
        businessModule: undefined
      };
      this.resetForm("queryForm");
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    /** 角色多选框选中数据 */
    handleRoleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId);
    },
    /** 组织机构多选框选中数据 */
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

.imgback {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
</style>