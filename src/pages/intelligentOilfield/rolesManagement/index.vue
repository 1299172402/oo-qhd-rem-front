<!-- 后台——角色管理 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100 colon">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="queryParams.roleName"
            placeholder="请输入角色名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <!-- <el-form-item label="角色编码" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入角色编码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
                            </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择角色状态"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="showAppSearch" label="所属应用" prop="appId">
          <el-select
            v-model="queryParams.appId"
            style="width: 240px"
            placeholder="请选择所属应用"
            clearable
            filterable
          >
            <el-option
              v-for="item in searchOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
                            </el-form-item> -->
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

    <page-panel-new header-title="角色管理">
      <el-row :gutter="10" class="mb8 mbBottom">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:role:add']"
            type="primary"
            @click="handleAdd"
          >
            新增
          </el-button>
        </el-col>
        <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:role:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:role:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:role:export']"
          >导出</el-button
        >
                            </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
      <el-table
        :data="roleList"
        height="calc(100% - 114px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="120" />
        <!-- <el-table-column label="角色编号" prop="roleId" width="120" /> -->
        <el-table-column
          label="角色名称"
          prop="roleName"
          :show-overflow-tooltip="true"
          min-width="140"
        />
        <el-table-column label="角色类型" prop="roleType" width="120">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_role_type" :value="scope.row.roleType" />
          </template>
        </el-table-column>
        <el-table-column label="角色排序" prop="roleSort" width="120" />
        <el-table-column
          prop="menuType"
          label="所属应用"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.appId | filterAppId() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分配用户" align="center" width="120">
          <template v-if="scope.row.roleId !== '1'" slot-scope="scope">
            <el-button
              v-hasPermi="['system:role:detail']"
              type="text"
              @click="handleAuthUser(scope.row)"
            >
              查看({{
                scope.row.num }})
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="190"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding"
          width="240"
        >
          <template v-if="scope.row.roleId !== '1'" slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="请到相关应用下进行操作"
              placement="top-start"
              :disabled="!disabledHandle"
            >
              <el-button
                v-hasPermi="['system:role:edit']"
                type="text"
                :disabled="disabledHandle"
                @click="handleUpdate(scope.row)"
              >
                修改
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="请到相关应用下进行操作"
              placement="top-start"
              :disabled="!disabledHandle"
            >
              <el-button
                v-hasPermi="['system:role:remove']"
                type="text"
                class="delbutton"
                :disabled="disabledHandle"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="请到相关应用下进行操作"
              placement="top-start"
              :disabled="!disabledHandle"
            >
              <el-button
                v-hasPermi="['system:role:dataPermission']"
                type="text"
                :disabled="disabledHandle"
                @click="handleDataScope(scope.row)"
              >
                数据权限
              </el-button>
            </el-tooltip>
          <!-- <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:role:edit']">
            <span class="el-dropdown-link">
              <i class="el-icon-d-arrow-right el-icon--right"></i>更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="handleDataScope" icon="el-icon-circle-check"
                v-hasPermi="['system:role:edit']">数据权限</el-dropdown-item>
              <el-dropdown-item command="handleAuthUser" icon="el-icon-user"
                v-hasPermi="['system:role:edit']">分配用户</el-dropdown-item>
            </el-dropdown-menu>
                                </el-dropdown> -->
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
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="roleKey">
              <span slot="label">
                <el-tooltip content="控制器中定义的角色编码，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                角色编码
              </span>
              <el-input v-model="form.roleKey" placeholder="请输入角色编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色类型" prop="roleType">
              <el-select
                v-model="form.roleType"
                style="width: 267px"
                placeholder="请选择角色类型"
                :disabled="!!($route.params.id || form.appId !== '$system$' )"
              >
                <el-option
                  v-for="item in dict.type.sys_role_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色顺序" prop="roleSort">
              <el-input-number
                v-model="form.roleSort"
                style="width: 267px"
                controls-position="right"
                :min="0"
                @input.native="roleSortlChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">
                  {{
                    dict.label
                  }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="是否租户" prop="isTenant">
          <el-radio-group v-model="form.isTenant">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
          </el-form-item> -->
        <el-form-item label="菜单权限" prop="menuIds">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">
            展开/折叠
          </el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">
            全选/全不选
          </el-checkbox>
          <el-checkbox
            v-model="form.menuCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'menu')"
          >
            父子联动
          </el-checkbox>
          <el-tree
            ref="menu"
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            node-key="id"
            :check-strictly="!form.menuCheckStrictly"
            :props="defaultProps"
          />
        </el-form-item>
      <!-- <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
                              </el-form-item> -->
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

    <!-- 分配角色数据权限对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openDataScope"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="form.roleKey" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select
            v-model="form.dataScope"
            style="width: 360px"
            clearable
            @change="dataScopeSelectChange"
          >
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="form.dataScope == 2" label="数据权限">
          <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'dept')">
            展开/折叠
          </el-checkbox>
          <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'dept')">
            全选/全不选
          </el-checkbox>
          <el-checkbox
            v-model="form.deptCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'dept')"
          >
            父子联动
          </el-checkbox>
          <el-tree
            ref="dept"
            class="tree-border"
            :data="deptOptions"
            show-checkbox
            default-expand-all
            node-key="id"
            :check-strictly="!form.deptCheckStrictly"
            empty-text="加载中，请稍候"
            :props="defaultProps"
          >
            <!--知识点过长处理，鼠标悬浮文字弹框显示全部内容-->
            <span slot-scope="{ node }" class="custom-tree-node">
              <el-tooltip
                class="item"
                effect="dark"
                :content="node.label"
                placement="top-start"
              >
                <span> {{ node.label | ellipsis(16) }} </span>
              </el-tooltip>
              <div />
            </span>
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">
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
import { listRole, getRole, delRole, addRole, updateRole, dataScope, changeRoleStatus } from "@/api/intelligentOilfield/system/role";
import { treeselect as menuTreeselect, roleMenuTreeselect, roleMenuTreeSelectByAppId } from "@/api/intelligentOilfield/system/menu";
import { treeselect as deptTreeselect, roleDeptTreeselect } from "@/api/intelligentOilfield/system/dept";
import { appList } from "@/api/intelligentOilfield/system/dataper";
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";
import proxy from "@/config/host";

var that;
const env = import.meta.env.MODE || "development";
export default {
  name: "Roles",
  dicts: ["sys_normal_disable", "sys_role_type"],
  filters: {
    filterAppId(value) {
      if (value) {
        const temp = that.appSelect.filter(item => item.appId === value);
        return temp.length > 0 ? temp[0].appName : "";
      }
      return "";
    }
  },
  props: {
    showAppSearch: {
      type: Boolean,
      default: true
    },
    appId: {
      type: String,
      default: proxy[env].appId || "$system$"
    }
  },
  data() {
    return {
      appSelect: [],
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
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptNodeAll: false,
      // 日期范围
      dateRange: [],
      searchOption: [],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定义数据权限"
        },
        {
          value: "3",
          label: "本部门数据权限"
        },
        {
          value: "4",
          label: "本部门及以下数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
        appId: this.appId
      },
      options: [],
      // 下拉appid分页查询
      pagePrarms: {
        pageSize: 10,
        startIndex: 1,
        key: undefined,
        pagesNum: 0
      },
      allowLoad: true,
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [{ required: true, message: "请输入角色名称" }],
        roleType: [{ required: true, message: "请选择角色类型" }],
        roleKey: [{ required: true, message: "请输入角色编码" }],
        roleSort: [{ required: true, message: "请输入角色顺序" }],
        status: [{ required: true, message: "请选择角色状态" }]
        // isTenant: [{ required: true, message: '是否租户不能为空' }],
      },
      disabledHandle: false,
      isActivated: true
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    this.isActivated = false;
    this.getAppList();
    this.getSelectOptions();
  },
  activated() {
    if (this.isActivated) {
      this.getList();
    } else {
      this.isActivated = true;
    }
  },
  methods: {
    // 查看使用该角色的用户
    queryUserDetail() {},
    getAppList() {
      appList().then(res => {
        if (res.data.code === 200) {
          this.appSelect = res.data.rows;
          this.getList();
        }
      });
    },
    /** 查询角色列表 */
    getList() {
      if (this.appId !== this.queryParams.appId) {
        this.disabledHandle = true;
      } else {
        this.disabledHandle = false;
      }
      this.loading = true;
      listRole(this.addDateRange({ ...this.queryParams, appId: this.queryParams.appId || this.appId }, this.dateRange)).then(response => {
        this.roleList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      if (this.appId) {
        const params = {
          appId: this.appId
        };
        return roleMenuTreeSelectByAppId(params).then(response => {
          this.menuOptions = response.data.menus;
          return response;
        });
      }
      menuTreeselect().then(response => {
        this.menuOptions = response.data.data;
      });
    },
    /** 查询部门树结构 */
    getDeptTreeselect() {
      deptTreeselect().then(response => {
        this.deptOptions = response.data.data;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      const checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      const halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      //   checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      checkedKeys.unshift(...halfCheckedKeys);
      return checkedKeys;
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      const checkedKeys = this.$refs.dept.getCheckedKeys();
      // 半选中的部门节点
      const halfCheckedKeys = this.$refs.dept.getHalfCheckedKeys();
      //   checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      checkedKeys.unshift(...halfCheckedKeys);
      return checkedKeys;
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      if (this.appId) {
        const params = {
          appId: this.appId,
          roleId: roleId
        };
        return roleMenuTreeSelectByAppId(params).then(res => {
          this.menuOptions = res.data.menus;
          return res;
        });
      }
      return roleMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.data.menus;
        return response;
      });
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      return roleDeptTreeselect(roleId).then(response => {
        this.deptOptions = response.data.depts;
        return response;
      });
    },
    // 角色状态修改
    handleStatusChange(row) {
      const text = row.status === "0" ? "启用" : "停用";
      row.status = row.status === "0" ? "1" : "0";
      this.$modal
        .confirm(`确认要"${text}""${row.roleName}"角色吗？`)
        .then(() => {
          row.status = row.status === "1" ? "0" : "1";
          changeRoleStatus(row.roleId, row.status).then(res => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess(`${text}成功`);
            }
          }).catch(() => {
            row.status = row.status === "0" ? "1" : "0";
          });
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
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
        remark: undefined,
        appId: this.$route.params.id || this.appId
        // isTenant: '0'
      };
      this.resetForm("form");
    },
    // 所属应用
    getSelectOptions() {
      this.searchOption = [];
      applicationAllList().then(response => {
        response.data.data.forEach(el => {
          this.searchOption.push({
            label: el.appName,
            value: el.appId
          });
        });
      });
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
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleDataScope":
          this.handleDataScope(row);
          break;
        case "handleAuthUser":
          this.handleAuthUser(row);
          break;
        default:
          break;
      }
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type === "menu") {
        const treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
        }
      } else if (type === "dept") {
        const treeList = this.deptOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value;
        }
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type === "menu") {
        this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
      } else if (type === "dept") {
        this.$refs.dept.setCheckedNodes(value ? this.deptOptions : []);
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type === "menu") {
        this.form.menuCheckStrictly = !!value;
      } else if (type === "dept") {
        this.form.deptCheckStrictly = !!value;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      if (this.$route.params.id) {
        this.form.roleType = "application";
      }
      this.getMenuTreeselect();
      this.open = true;
      this.title = "新增角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const roleId = row.roleId || this.ids;
      const roleMenu = this.getRoleMenuTreeselect(roleId);
      getRole(roleId).then(response => {
        this.form = response.data.data;
        this.open = true;
        this.$nextTick(() => {
          roleMenu.then(res => {
            const { checkedKeys } = res.data;
            checkedKeys.forEach(v => {
              this.$nextTick(() => {
                this.$refs.menu.setChecked(v, true, false);
              });
            });
          });
        });
        this.title = "修改角色";
      });
    },
    /** 选择角色权限范围触发 */
    dataScopeSelectChange(value) {
      if (value !== "2") {
        this.$refs.dept.setCheckedKeys([]);
      }
    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      this.reset();
      const roleDeptTreeselect = this.getRoleDeptTreeselect(row.roleId);
      getRole(row.roleId).then(response => {
        this.form = response.data.data;
        this.openDataScope = true;
        this.$nextTick(() => {
          roleDeptTreeselect.then(res => {
            this.$refs.dept.setCheckedKeys(res.data.checkedKeys);
          });
        });
        this.title = "分配数据权限";
      });
    },
    /** 分配用户操作 */
    handleAuthUser(row) {
      const { roleId, roleName } = row;
      this.$router.push({ name: "rolesDetail", params: { roleId }, query: { pathName: roleName }});
      //   this.$router.push(`/system/role-auth/user/${roleId}`);
    },
    /** 提交按钮 */
    submitForm() {
      this.form.menuIds = this.getMenuAllCheckedKeys();
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.appId && this.$route.params.id) {
            this.form.appId = this.$route.params.id;
          }
          if (this.form.roleId !== undefined) {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            updateRole(this.form).then(res => {
              if (res ? res.data.code === 200 : false) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then(res => {
              if (res ? res.data.code === 200 : false) {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 提交按钮（数据权限） */
    submitDataScope() {
      if (this.form.roleId !== undefined) {
        this.form.deptIds = this.getDeptAllCheckedKeys();
        dataScope(this.form).then(res => {
          if (res ? res.data.code === 200 : false) {
            this.$modal.msgSuccess("修改成功");
            this.openDataScope = false;
            this.getList();
          }
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$modal
        .confirm("是否确认删除该角色？")
        .then(() => delRole(roleIds))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess("删除成功");
          }
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/role/export",
        {
          ...this.queryParams
        },
        `role_${new Date().getTime()}.xlsx`
      );
    },
    roleSortlChange(e) {
      if (e.target.value) {
        this.$refs.form.clearValidate("roleSort");
      }
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