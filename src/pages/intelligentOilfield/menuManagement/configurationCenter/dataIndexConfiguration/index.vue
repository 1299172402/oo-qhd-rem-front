<!-- 后台——指标中心配置 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px"
      >
        <el-form-item label="指标名称" prop="indexName">
          <el-input
            v-model="queryParams.indexName"
            placeholder="请输入指标名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="指标模块" prop="indexModule">
          <!-- <el-select v-model="queryParams.indexModule" placeholder="请选择" clearable size="small" style="width: 240px">
          <el-option v-for="dict in dict.type.sys_index_module" :key="dict.value" :label="dict.label"
            :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="queryParams.indexModule"
            style="width: 240px"
            placeholder="请选择"
            clearable
            size="small"
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
    <page-panel-new header-title="数据指标列表" style="height: calc(100% - 100px)">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:index:add']"
            type="primary"
            size="mini"
            style="height: 40px"
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
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          label="指标ID"
          prop="indexNo"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="指标名称"
          prop="indexName"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="指标模块"
          prop="indexModule"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ searchOption?.find(dict => dict.value == scope.row.indexModule)?.label }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="指标缩略图" align="center" width="150">
          <template slot-scope="scope">
            <img v-if="scope.row.indexImg" :src="scope.row.indexImg" class="avatar" style="height:40px;margin:auto" />
            <span v-else>{{ scope.row.indexImg }}</span>
          </template>
          </el-table-column> -->
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
          <template v-if="scope.row.roleId !== 1" slot-scope="scope">
            <el-button
              v-hasPermi="['system:index:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:index:rolePermission']"
              size="mini"
              type="text"
              @click="handleRole(scope.row)"
            >
              角色权限
            </el-button>
            <el-button
              v-hasPermi="['system:index:tenantPermission']"
              size="mini"
              type="text"
              @click="handleOrganization(scope.row)"
            >
              租户权限
            </el-button>
            <el-button
              v-hasPermi="['system:index:remove']"
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
        <!-- <el-form-item label="指标ID" prop="indexNo">
          <el-input v-model="addform.indexNo"></el-input>
          </el-form-item> -->
        <el-form-item label="指标名称" prop="indexName">
          <el-input v-model="addform.indexName" />
        </el-form-item>
        <el-form-item label="指标模块" prop="indexModule">
          <!-- <el-select v-model="addform.indexModule" placeholder="请选择" clearable size="small">
            <el-option v-for="dict in dict.type.sys_index_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
            </el-select> -->
          <el-select
            v-model="addform.indexModule"
            style="width: 100%"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="item in searchOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上传方式" prop="uploadingMode">
          <el-radio-group v-model="addform.uploadingMode">
            <el-radio
              v-for="item in dict.type.uploading_mode"
              :key="item.value"
              :label="item.value"
              @change="changeUploadingMode(item)"
            >
              {{
                item.label
              }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isShowURL" label="指标URL" prop="indexUrl">
          <el-input v-model="addform.indexUrl" />
        </el-form-item>
        <!-- <el-form-item label="指标缩略图" prop="indexImg">
          <el-upload class="avatar-uploader imageUpload" action="" :show-file-list="false"
            :http-request="addformHttpRequest">
            <img v-if="addform.indexImg" :src="addform.indexImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item> -->
        <!-- TODO: Maybe change back -->
        <el-form-item v-else label="上传指标代码" prop="indexCode">
          <el-input
            v-model="addform.indexCode"
            type="textarea"
            :rows="10"
            placeholder="请输入上传指标代码"
          />
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
        <!-- <el-form-item label="指标ID" prop="indexNo">
          <el-input v-model="form.indexNo"></el-input>
          </el-form-item> -->
        <el-form-item label="指标名称" prop="indexName">
          <el-input v-model="form.indexName" />
        </el-form-item>
        <el-form-item label="指标模块" prop="indexModule">
          <!-- <el-select v-model="form.indexModule" placeholder="请选择" clearable size="small">
            <el-option v-for="dict in dict.type.sys_index_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
            </el-select> -->
          <el-select
            v-model="form.indexModule"
            style="width: 100%"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="item in searchOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上传方式" prop="uploadingMode">
          <el-radio-group v-model="form.uploadingMode">
            <el-radio
              v-for="item in dict.type.uploading_mode"
              :key="item.value"
              :label="item.value"
              @change="changeUploadingMode(item)"
            >
              {{
                item.label
              }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isShowURL" label="指标URL" prop="indexUrl">
          <el-input v-model="form.indexUrl" />
        </el-form-item>
        <!-- <el-form-item label="指标缩略图" prop="indexImg">
          <el-upload class="avatar-uploader imageUpload" action="" :show-file-list="false"
            :http-request="formHttpRequest">
            <img v-if="form.indexImg" :src="form.indexImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item> -->
        <!-- TODO: Maybe change back -->
        <el-form-item v-else label="上传指标代码" prop="indexCode">
          <el-input
            v-model="form.indexCode"
            type="textarea"
            :rows="10"
            placeholder="请输入上传指标代码"
          />
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
import { listIndex, addIndex, delIndex, updateIndex, uploadIndexImg } from "@/api/intelligentOilfield/system/index";
import { listRole } from "@/api/intelligentOilfield/system/role";
// import { treeselect as menuTreeselect, roleMenuTreeselect } from '@/api/intelligentOilfield/system/menu';
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import { listTenant } from "@/api/intelligentOilfield/messaging";

export default {
  name: "DataIndexConfiguration",
  dicts: ["sys_index_module", "uploading_mode"],
  data() {
    return {
      isShowURL: true,
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
      dataList: [
        // {
        //   key1: 'ZHY0291',
        //   key2: '产量波动指标',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '产量相关指标',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '产量执行',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '剩余油分布情况',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '油田大事件',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '月度产量情况',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '产量够成情况',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '采油速度',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '采油速度',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
        // {
        //   key1: 'ZHY0291',
        //   key2: '采油速度',
        //   key3: '油藏管理',
        //   key4: '_',
        //   key5: '2022.11.15 18:36',
        // },
      ],
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
      openAdd: false,
      openEdit: false,
      addform: {
        indexModule: "",
        indexName: "",
        // indexNo: '',
        indexUrl: "",
        // indexImg: ''
        indexCode: "",
        uploadingMode: "1"
      },
      // 表单校验
      rules: {
        indexModule: [{ required: true, message: "指标模块不能为空", trigger: "blur" }],
        indexName: [{ required: true, message: "指标名称不能为空", trigger: "blur" }],
        // indexNo: [{ required: true, message: '指标ID不能为空', trigger: 'blur' }],
        indexUrl: [{ required: true, message: "指标URL不能为空", trigger: "blur" }]
        // indexImg: [{ required: true, message: '指标缩略图不能为空', trigger: 'blur' }],
      },
      form: {
        //  indexNo: undefined,
        uploadingMode: "1", indexName: undefined, indexModule: undefined, indexUrl: undefined, indexCode: undefined
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        indexName: undefined,
        indexModule: undefined,
        uploadingMode: "1"
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
      // 是否展开，默认全部展开
      isExpandAll: false,
      isCheck: false,
      searchOption: []
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
    changeUploadingMode(item) {
      this.isShowURL = item.value === "1";
    },
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/JPG";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /** 查询指标列表 */
    getList() {
      this.loading = true;
      // this.total = this.dataList.length;
      this.loading = false;
      listIndex(this.queryParams).then(response => {
        this.dataList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 获取角色权限列表 */
    getRoleList() {
      listRole(this.roleQueryParam).then(response => {
        this.roleTotal = response.data.total;
        this.roleList = response.data.rows;
      });
    },
    // 表单重置
    reset() {
      this.addform = {
        indexModule: undefined,
        indexName: undefined,
        // indexNo: undefined,
        indexUrl: undefined,
        // indexImg: undefined
        indexCode: undefined,
        uploadingMode: "1"
      };
      this.resetForm("formAdd");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.openAdd = true;
      this.title = "新增指标";
      this.reset();
    },
    /** 新增上传缩略图 */
    addformHttpRequest({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      uploadIndexImg(formData).then(res => {
        if (res ? res.data.code === 200 : false) {
          //   this.addform.indexImg = res.data.msg
        }
      });
    },
    /** 确认新增 */
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          addIndex(this.addform).then(res => {
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.openEdit = true;
      this.title = "编辑";
      this.form.indexModule = String(row.indexModule.toLocaleString());
      this.form.indexName = row.indexName;
      // this.form.indexNo = row.indexNo;
      this.form.indexId = row.indexId;
      this.form.indexUrl = row.indexUrl;
      //   this.form.indexImg = row.indexImg;
      this.form.indexCode = row.indexCode;
    },
    /** 修改上传缩略图 */
    formHttpRequest({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      uploadIndexImg(formData).then(res => {
        if (res ? res.data.code === 200 : false) {
          //   this.form.indexImg = res.data.msg
        }
      });
    },
    /** 确认修改 */
    submitEdit() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          updateIndex(this.form).then(res => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const { indexId } = row;
      this.$modal
        .confirm("是否确认删除该指标？")
        .then(() => delIndex(indexId))
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
      this.form.indexId = row.indexId;
      this.$nextTick(() => {
        this.roleList.forEach(item => {
          if (row.roleIds.includes(item.roleId)) {
            this.$refs.roleTable.toggleRowSelection(item);
          }
        });
        // this.toggleSelection(
        //   [{
        //     "searchValue": null,
        //     "createBy": null,
        //     "createTime": "2022-12-28 15:07:44",
        //     "updateBy": null,
        //     "updateTime": null,
        //     "remark": null,
        //     "params": {
        //     },
        //     "roleId": '103',
        //     "roleName": "新的角色试试",
        //     "roleKey": "julia",
        //     "roleSort": "3",
        //     "dataScope": "1",
        //     "menuCheckStrictly": true,
        //     "deptCheckStrictly": true,
        //     "status": "0",
        //     "delFlag": "0",
        //     "flag": false,
        //     "menuIds": null,
        //     "deptIds": null,
        //     "num": 0,
        //     "admin": false
        //   }])
      });
    },
    /** 查询组织机构树形数据列表 */
    getOrgTreeData() {
      listTenant(this.tenantQueryParam).then(response => {
        this.deptList = response.data.rows;
        this.tentTotal = response.data.total;
      });
    },
    /** 打开租户权限弹框 */
    handleOrganization(row) {
      this.defaultCheckedKeys = [];
      this.title = "租户权限";
      // 设置选中的机构   将deptId放进defaultCheckedKeys这个数组中就可以 如下示例
      // this.defaultCheckedKeys= [200]
      this.form.indexId = row.indexId;
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
    /** 角色多选框设置数据选中状态 */
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       console.log(row);
    //       console.log(this.$refs);
    //       this.$refs.roleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.roleTable.clearSelection();
    //   }
    // },
    /** 角色多选框选中数据 */
    handleRoleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId);
    },
    /** 组织机构多选框选中数据 */
    handleOrganizationSelectionChange(selection) {
      this.tenantids = selection.map(item => item.tenantId);
    },

    /** 提交按钮 */
    submitRole() {
      // this.form.roleIds = this.ids;
      const params = {
        roleIds: this.ids,
        indexId: this.form.indexId
      };
      updateIndex(params).then(res => {
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
    /** 提交按钮（租户权限） */
    submitOrganization() {
      // this.form.tenantIds = this.tenantids;
      const params = {
        tenantIds: this.tenantids,
        indexId: this.form.indexId
      };
      updateIndex(params).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess("绑定完成");
          this.openOrganization = false;
          this.getList();
        }
      });
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