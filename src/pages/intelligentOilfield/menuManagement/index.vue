<!-- 后台——菜单管理 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        style="margin-top: 20px"
        :inline="true"
      >
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="queryParams.menuName"
            placeholder="请输入菜单名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item v-if="showAppSearch" label="所属应用" prop="appId">
          <el-select
            v-model="queryParams.appId"
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
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="菜单状态"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
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

    <page-panel-new header-title="菜单管理" style="height: calc(100% - 100px);">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:menu:add']"
            type="primary"
            size="mini"
            @click="handleAdd({}, '外层新增')"
          >
            新增
          </el-button>
        </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
      <el-table
        v-if="refreshTable"
        height="calc(100% - 78px)"
        :data="menuList"
        row-key="menuId"
        :default-expand-all="isExpandAll"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px' }"
        :cell-class-name="cellClassName"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          prop="menuName"
          label="菜单名称"
          :show-overflow-tooltip="true"
          width="160"
          align="left"
        />
        <el-table-column
          prop="icon"
          label="图标"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="菜单排序"
          width="80"
          align="center"
        />
        <el-table-column
          prop="menuType"
          label="菜单类型"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.menuType | filterType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="menuType"
          label="所属应用"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.appId | filterAppId() }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="appId" label="所属应用" width="100">
          <template slot-scope="scope">
            <span>{{ searchOption.find(item=>item.value===scope.row.appId)?.label }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="perms"
          label="权限标识"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          prop="component"
          label="组件路径"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:menu:edit']"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:menu:add']"
              size="mini"
              type="text"
              @click="handleAdd(scope.row, '内层新增')"
            >
              新增
            </el-button>
            <el-button
              v-hasPermi="['system:menu:remove']"
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
    </page-panel-new>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="680px"
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
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio v-if="isShowRadioBtnM" label="M">
                  目录
                </el-radio>
                <el-radio v-if="isShowRadioBtn" label="C">
                  菜单
                </el-radio>
                <el-radio v-if="isShowRadioBtn" label="F">
                  按钮
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="form.menuType === 'M' && form.parentId === '0'" :span="24">
            <el-form-item label="菜单图标">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <icon-select ref="iconSelect" @selected="selected" />
                <el-input
                  slot="reference"
                  v-model="form.icon"
                  placeholder="点击选择图标"
                  clearable
                  @clear="clearIcon"
                >
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px; width: 16px"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div v-if="form.menuType != 'F'">
              <el-form-item prop="path">
                <span slot="label">
                  <el-tooltip content="路由name名称" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                  路由名称
                </span>
                <el-input v-model="form.path" placeholder="请输入路由名称" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="form.menuType != 'F'">
              <el-form-item>
                <span slot="label">
                  <el-tooltip content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                  是否外链
                </span>
                <el-radio-group v-model="form.isFrame">
                  <el-radio label="0">
                    是
                  </el-radio>
                  <el-radio label="1">
                    否
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="form.menuType != 'F'">
              <el-form-item :prop="form.isFrame === '0' ? 'link' : ''">
                <span slot="label">
                  <el-tooltip
                    content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
                    placement="top"
                  >
                    <i class="el-icon-question" />
                  </el-tooltip>
                  路由地址
                </span>
                <el-input v-model="form.link" placeholder="请输入路由地址" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="form.menuType != 'F'">
              <el-form-item>
                <span slot="label">
                  <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                  显示状态
                </span>
                <el-radio-group v-model="form.visible">
                  <el-radio v-for="dict in dict.type.sys_show_hide" :key="dict.value" :label="dict.value">
                    {{
                      dict.label
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="form.menuType == 'C'">
              <el-form-item prop="component">
                <span slot="label">
                  <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                  组件路径
                </span>
                <el-input v-model="form.component" placeholder="请输入组件路径" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="form.menuType != 'M'">
              <el-form-item>
                <el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100" />
                <span slot="label">
                  <el-tooltip
                    content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                    placement="top"
                  >
                    <i class="el-icon-question" />
                  </el-tooltip>
                  权限字符
                </span>
              </el-form-item>
            </div>
          </el-col>

          <!-- <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item>
              <el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255" />
              <span slot="label">
                <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                路由参数
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                是否缓存
              </span>
              <el-radio-group v-model="form.isCache">
                <el-radio label="0">缓存</el-radio>
                <el-radio label="1">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                显示状态
              </span>
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in dict.type.sys_show_hide"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                菜单状态
              </span>
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
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
import { listMenu, getMenu, delMenu, addMenu, updateMenu } from "@/api/intelligentOilfield/system/menu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/intelligentOilfield/icon-select/index.vue";
import { appList } from "@/api/intelligentOilfield/system/dataper";
import { applicationAllList } from "@/api/intelligentOilfield/portal/officeMode";

var that;
export default {
  name: "Menu",
  dicts: ["sys_show_hide", "sys_normal_disable"],
  components: { Treeselect, IconSelect },
  filters: {
    filterType(value) {
      switch (value) {
        case "M":
          return "目录";
        case "C":
          return "菜单";
        case "F":
          return "按钮";
        default:
          return "目录";
      }
      //   return value === 'M'?'目录':(value === 'C'?'菜单':'按钮');
    },
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
      default: undefined
    }
  },
  data() {
    return {
      searchOption: [],
      appSelect: [],
      isShowRadioBtn: false,
      isShowRadioBtnM: true,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部折叠
      isExpandAll: false,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined,
        appId: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
        orderNum: [{ required: true, message: "菜单顺序不能为空", trigger: "blur" }],
        path: [{ required: true, message: "路由名称不能为空", trigger: "blur" }],
        component: [{ required: true, message: "组件路径不能为空", trigger: "blur" }],
        link: [{ required: true, message: "路由地址不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
    this.getAppList();
    this.getSelectOptions();
  },
  beforeCreate() {
    that = this;
  },
  activated() {
    this.getList();
  },
  methods: {
    getSelectOptions() {
      this.searchOption = [];
      applicationAllList().then(response => {
        response.data.data.forEach(el => {
          this.searchOption.push({
            label: el.appName,
            value: el.appId
          });
        });
        this.searchOption.unshift({ label: "无", value: undefined });
      });
    },
    getAppList() {
      appList().then(res => {
        if (res.data.code === 200) {
          this.appSelect = res.data.rows;
        }
      });
    },
    cellClassName({ row, columnIndex }) {
      if (columnIndex === 0 && row.children && row.children?.length === 0 && row.parentId === "0") {
        return "indentationClass";
      }
    },
    // 解决弹窗input框不能输入问题
    change() {
      this.$forceUpdate();
    },
    // 清除图标
    clearIcon() {
      this.form.icon = "#";
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listMenu({ ...this.queryParams, appId: this.queryParams.appId || this.appId }).then(response => {
        this.menuList = this.handleTree(response.data.data, "menuId");
        this.loading = false;
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      const params = {};
      if (this.appId) {
        params.appId = this.appId;
      }
      listMenu(params).then(response => {
        this.menuOptions = [];
        const menu = { menuId: 0, menuName: "主类目", children: [] };
        menu.children = this.handleTree(response.data.data, "menuId");
        this.menuOptions.push(menu);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        menuId: undefined,
        parentId: 0,
        menuName: undefined,
        icon: undefined,
        menuType: "M",
        orderNum: undefined,
        isFrame: "1",
        isCache: "0",
        visible: "0",
        status: "0",
        link: "",
        path: undefined,
        component: "",
        perms: undefined,
        appId: undefined
      };
      this.isShowRadioBtnM = true;
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    /** 新增按钮操作 */
    handleAdd(row, type) {
      this.isShowRadioBtn = type !== "外层新增";
      this.reset();
      this.getTreeselect();
      if (type === "外层新增") {
        this.isShowRadioBtnM = true;
      }
      if (row && row.menuId) {
        this.form.parentId = row.menuId;
        if (row.menuType === "M") {
          this.isShowRadioBtnM = true;
        } else {
          this.isShowRadioBtnM = false;
          this.form.menuType = "C";
        }
      } else {
        this.form.parentId = "0";
      }
      this.open = true;
      this.title = "添加菜单";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isShowRadioBtn = true;
      this.reset();
      this.getTreeselect();
      getMenu(row.menuId).then(response => {
        this.form = response.data.data;
        this.open = true;
        this.title = "修改菜单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if (this.form.icon === "" || Number(this.form.parentId) !== 0) {
        this.clearIcon();
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.appId && this.appId) {
            this.form.appId = this.appId;
          }
          if (this.form.menuType === "M" && this.form.parentId === "0") {
            if (this.form.icon === undefined || this.form.icon === "#") {
              this.form.icon = "build";
            }
          }
          if (this.form.menuId !== undefined) {
            updateMenu(this.form).then(res => {
              if (res ? res.data.code === 200 : false) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addMenu(this.form).then(res => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal
        .confirm(`是否确认删除名称为"${row.menuName}"的数据项？`)
        .then(() => delMenu(row.menuId))
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
::v-deep .indentationClass .cell{
  margin-left: 24px;
}

.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}
</style>