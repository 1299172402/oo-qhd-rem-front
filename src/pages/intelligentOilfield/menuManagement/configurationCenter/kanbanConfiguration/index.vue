<!-- 后台——看板配置 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        style="margin-top: 18px"
        :inline="true"
      >
        <el-form-item label="看板名称" prop="boardName">
          <el-input
            v-model="queryParams.boardName"
            placeholder="请输入看板配置名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="看板模块" prop="boardModule">
          <!-- <el-select v-model="queryParams.boardModule" style="width: 240px" placeholder="请选择看板模块">
          <el-option v-for="dict in dict.type.sys_board_module" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select> -->
          <el-select
            v-model="queryParams.boardModule"
            size="small"
            style="width: 240px"
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
        <el-form-item label="看板类型" prop="boardType">
          <el-select
            v-model="queryParams.boardType"
            style="width: 240px"
            placeholder="请选择看板类型"
            clearable
          >
            <el-option
              v-for="dict in dict.type.sys_board_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
            <!-- <el-option v-for="item in postOptions" :key="item.postId" :label="item.postName" :value="item.postId"
                                                      :disabled="item.status == 1"></el-option> -->
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

    <page-panel-new header-title="大屏列表" style="height: calc(100% - 100px)">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:board:add']"
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
          label="看板ID"
          prop="boardNo"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="看板名称" prop="boardName" align="center" />
        <el-table-column label="看板模块" prop="boardModule" align="center">
          <template slot-scope="scope">
            <span>{{ searchOption?.find((dict) => dict.value == scope.row.boardModule)?.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="看板类型" prop="boardType" align="center">
          <template slot-scope="scope">
            <span>{{ dict.type.sys_board_type?.find((dict) => dict.value == scope.row.boardType)?.label }}</span>
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
        <el-table-column label="看板缩略图" align="center" width="150">
          <template slot-scope="scope">
            <img
              v-if="scope.row.boardImg"
              :src="scope.row.boardImg"
              class="avatar"
              style="height: 30px;margin: 5px auto;width: 30px;"
            >
            <!-- TODO: Maybe change back -->
            <!-- <span v-else class="thumbnail" style="height:30px;margin:5px auto;width: 30px;font-size:14px">{{ scope.row.boardName[0] }}</span> -->
            <div v-else class="bgImage g-row-flex-HV" style="height: 30px;margin: 5px auto;width: 30px;font-size: 14px">
              {{ scope.row.boardName[0] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template v-if="scope.row.roleId !== '1'" slot-scope="scope">
            <el-button
              v-hasPermi="['system:board:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:board:rolePermission']"
              size="mini"
              type="text"
              @click="handleRole(scope.row)"
            >
              角色权限
            </el-button>
            <el-button
              v-hasPermi="['system:board:tenantPermission']"
              size="mini"
              type="text"
              @click="handleOrganization(scope.row)"
            >
              租户权限
            </el-button>
            <el-button
              v-hasPermi="['system:board:remove']"
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
        <!-- <el-form-item label="看板ID" prop="boardNo">
          <el-input v-model="addform.boardNo"></el-input>
        </el-form-item> -->
        <el-form-item label="看板名称" prop="boardName">
          <el-input v-model="addform.boardName" />
        </el-form-item>
        <el-form-item label="看板模块" prop="boardModule">
          <!-- <el-select v-model="addform.boardModule" placeholder="请选择" clearable size="small">
            <el-option v-for="dict in dict.type.sys_board_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="addform.boardModule"
            size="small"
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
        <el-form-item label="看板类型" prop="boardType">
          <el-select
            v-model="addform.boardType"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in dict.type.sys_board_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="看板URL" prop="boardUrl">
          <el-input v-model="addform.boardUrl" />
        </el-form-item>
        <el-form-item label="看板缩略图">
          <el-upload
            class="avatar-uploader imageUpload"
            action=""
            :show-file-list="false"
            :http-request="addformHttpRequest"
            :disabled="addform.boardImg ? true : false"
          >
            <div
              style="width: 100%; height: 100%; position: relative"
              @mouseenter="onmouseoveradd"
              @mouseleave="onmouseout"
            >
              <div v-show="visibledelAdd" class="imgback">
                <i class="el-icon-delete" @click.stop="deleteImg" />
              </div>
              <img v-if="addform.boardImg" :src="addform.boardImg" class="avatar">
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
        <!-- <el-form-item label="看板ID" prop="boardNo">
          <el-input v-model="form.boardNo"></el-input>
        </el-form-item> -->
        <el-form-item label="看板名称" prop="boardName">
          <el-input v-model="form.boardName" />
        </el-form-item>
        <el-form-item label="看板模块" prop="boardModule">
          <!-- <el-select v-model="form.boardModule" placeholder="请选择" clearable size="small">
            <el-option v-for="dict in dict.type.sys_board_module" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select> -->
          <el-select
            v-model="form.boardModule"
            size="small"
            style="width: 240px"
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
        <el-form-item label="看板类型" prop="boardType">
          <el-select
            v-model="form.boardType"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in dict.type.sys_board_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="看板URL" prop="boardUrl">
          <el-input v-model="form.boardUrl" />
        </el-form-item>
        <el-form-item label="看板缩略图" prop="boardImg">
          <el-upload
            class="avatar-uploader imageUpload"
            action=""
            :show-file-list="false"
            :http-request="formHttpRequest"
            :disabled="form.boardImg ? true : false"
          >
            <div
              style="width: 100%; height: 100%; position: relative"
              @mouseenter="onmouseover"
              @mouseleave="onmouseout"
            >
              <div v-show="visibledel" class="imgback">
                <i class="el-icon-delete" @click.stop="deleteImg" />
              </div>
              <img v-if="form.boardImg" :src="form.boardImg" class="avatar">
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
          align="cboard"
          :reserve-selection="true"
        />
        <el-table-column label="序号" type="index" width="120" />
        <el-table-column
          label="角色名称"
          prop="roleName"
          align="cboard"
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
import { listBoard, addBoard, delBoard, updateBoard, uploadBoardImg } from "@/api/intelligentOilfield/system/board";
import { listRole } from "@/api/intelligentOilfield/system/role";
// import { treeselect as menuTreeselect, roleMenuTreeselect } from '@/api/intelligentOilfield/system/menu';
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import { listTenant } from "@/api/intelligentOilfield/messaging";

export default {
  name: "KanbanConfiguration",
  dicts: ["sys_board_module", "sys_board_type"],
  data() {
    return {
      searchOption: [],
      visibledel: false,
      visibledelAdd: false,
      form: {
        boardModule: undefined,
        boardType: undefined,
        boardName: undefined,
        // boardNo: undefined,
        boardUrl: undefined,
        boardImg: undefined
      },
      // 表单校验
      rules: {
        boardModule: [{ required: true, message: "看板模块不能为空", trigger: "blur" }],
        boardType: [{ required: true, message: "看板类型不能为空", trigger: "blur" }],
        boardName: [{ required: true, message: "看板名称不能为空", trigger: "blur" }],
        // boardNo: [{ required: true, message: '看板ID不能为空', trigger: 'blur' }],
        boardUrl: [{ required: true, message: "看板URL不能为空", trigger: "blur" }]
      },
      openEdit: false,
      openAdd: false,
      addform: {
        boardModule: "",
        boardType: "",
        boardName: "",
        // boardNo: '',
        boardUrl: "",
        boardImg: ""
      },
      size: [10, 20, 30, 50],
      roleOptions: [],
      postOptions: [],
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
        boardName: undefined,
        boardModule: undefined,
        boardType: undefined
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
    /** 查询看板列表 */
    getList() {
      this.loading = true;
      // this.total = this.dataList.length;
      this.loading = false;
      listBoard(this.queryParams).then(response => {
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
      uploadBoardImg(formData).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.addform.boardImg = res.data.msg;
        }
      });
    },
    /** 确认新增 */
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          addBoard(this.addform).then(res => {
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
      //   this.form.boardModule = String(row.boardModule.toLocaleString());
      //   this.form.boardType = String(row.boardType.toLocaleString());
      this.form.boardModule = row.boardModule;
      this.form.boardType = row.boardType;
      this.form.boardName = row.boardName;
      // this.form.boardNo = row.boardNo;
      this.form.boardId = row.boardId;
      this.form.boardUrl = row.boardUrl;
      this.form.boardImg = row.boardImg;
    },
    /** 修改上传缩略图 */
    formHttpRequest({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      uploadBoardImg(formData).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.form.boardImg = res.data.msg;
        }
      });
    },
    onmouseover() {
      if (this.form.boardImg) {
        this.visibledel = true;
      }
    },
    onmouseoveradd() {
      if (this.addform.boardImg) {
        this.visibledelAdd = true;
      }
    },
    onmouseout() {
      this.visibledel = false;
      this.visibledelAdd = false;
    },
    deleteImg() {
      this.form.boardImg = "";
      this.addform.boardImg = "";
      this.visibledel = false;
      this.visibledelAdd = false;
    },
    /** 确认修改 */
    submitEdit() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          updateBoard(this.form).then(res => {
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
        boardModule: undefined,
        boardType: undefined,
        boardName: undefined,
        // boardNo: undefined,
        boardUrl: undefined,
        boardImg: undefined
      };
      this.resetForm("formAdd");
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const { boardId } = row;
      this.$modal
        .confirm("是否确认删除该快捷入口？")
        .then(() => delBoard(boardId))
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
      this.form.boardId = row.boardId;
      this.getRoleList();
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
      this.form.roleIds = this.ids;
      updateBoard(this.form).then(res => {
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
    /** 租户权限 */
    handleOrganization(row) {
      this.defaultCheckedKeys = [];
      this.title = "租户权限";
      this.form.boardId = row.boardId;
      this.getOrgTreeData().then(() => {
        // 回显勾选的数据
        this.openOrganization = true;
        this.$nextTick(() => {
          this.deptList.forEach(item => {
            if (row.tenantIds.includes(item.tenantId)) {
              this.$refs.tenantTable.toggleRowSelection(item);
            }
          });
        });
      }).catch(() => {
        this.$message.error("租户信息获取失败！");
      });
    },
    /** 提交按钮（租户权限） */
    submitOrganization() {
      this.form.tenantIds = this.tenantids;
      updateBoard(this.form).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess("绑定完成");
          this.openOrganization = false;
          this.getList();
        }
      });
    },
    /** 查询组织机构树形数据列表 */
    getOrgTreeData() {
      return listTenant(this.tenantQueryParam).then(response => {
        this.deptList = response.data.rows;
        this.tentTotal = response.data.total;
        Promise.resolve();
      }).catch(() => {
        Promise.reject();
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