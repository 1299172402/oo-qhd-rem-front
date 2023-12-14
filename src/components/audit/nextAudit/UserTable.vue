
<template>
  <div>
    <div :class="perfixCls + '__center-search'">
      <t-input
        v-model="queryParam.nickName"
        placeholder="用户名"
        clearable
        @enter="handleSearch"
      />
      <select-single-input
        v-if="showRoleSelect && loadUser"
        v-model="queryParam.roleKey"
        :options="roleOptions"
        value-field="roleKey"
        text-field="roleName"
        placeholder="请选择角色"
      />
      <t-button @click="handleSearch">
        查询
      </t-button>
      <slot name="queryButton" />
    </div>
    <t-table
      v-if="multiple"
      ref="table"
      bordered
      row-key="userId"
      :columns="columns"
      :data="dataSource"
      :pagination="ipagination"
      :class="perfixCls + '__center-table'"
      max-height="600"
      :selected-row-keys="selectedRowKeys"
      @select-change="rehandleSelectChange"
      @change="(e) => handleTableChange(e, 'tdesign')"
    >
      <div slot="deptName" slot-scope="{row}">
        {{ row.dept?.deptName || "" }}
      </div>
    </t-table>
    <t-radio-group v-else :value="currentSelectUser">
      <t-table
        ref="table"
        bordered
        row-key="userId"
        :columns="columns"
        :data="dataSource"
        :pagination="ipagination"
        :class="perfixCls + '__center-table'"
        max-height="600"
        @change="(e) => handleTableChange(e, 'tdesign')"
      >
        <t-radio
          slot="select"
          slot-scope="{row}"
          :value="row.userId"
          @click="handleSelectUserChange(row)"
        />
        <div slot="deptName" slot-scope="{row}">
          {{ row.dept?.deptName || "" }}
        </div>
      </t-table>
    </t-radio-group>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import SelectSingleInput from "./SelectSingleInput.vue";
import ListMixin from "@/components/mixins/ListMixin";
import "./style/UserTableStyle.less";
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";

let mountedQueryPromise = null;

export default Vue.extend({
  name: "UserTable",
  components: {
    SelectSingleInput
  },
  mixins: [ListMixin],
  inject: {
    needRestart: {
      default: false
    }
  },
  props: {
    showRoleSelect: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 查询参数
    params: {
      type: Object,
      default: () => ({})
    },
    // 初始化角色code
    roleCode: {
      type: String,
      default: ""
    },
    // 已选用户点击删除的id
    deleteId: {
      type: String,
      default: ""
    },
    // 弹窗之外可能删除用户，该字段用于初始化弹窗
    initData: {
      type: Array,
      default: () => []
    },
    // 是否可以开始请求数据
    startSearch: {
      type: [Boolean, Object],
      default: false
    },
    canSelf: {
      type: Boolean,
      default: true
    },
    setDefault: {
      type: Boolean,
      default: false
    },
    // 是否需要先选择部门
    needDeptBeforeChoose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      perfixCls: "select-user-table",
      disableMixinCreated: true,
      columns: [
        this.multiple ? { colKey: "row-select", type: "multiple" } : { title: "#", colKey: "id", width: 60, align: "center", cell: "select" },
        { title: "用户名", width: 150, align: "center", colKey: "nickName" },
        { title: "部门", align: "center", colKey: "deptName", ellipsis: true, cell: "deptName" }
      ],
      url: {
        list: "/system/user/list"
      },
      queryParam: {
        nickName: "",
        roleKey: "",
        deptId: ""
      },
      dicts: {
        roleCodeOptions: []
      },
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30"],
        maxPageBtn: 5,
        foldedMaxPageBtn: 3,
        showTotal: (total, range) => `${range[0]}-${range[1]} 共${total}条`,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      afterMounted: false,
      mySetDefault: this.setDefault,
      tableHeight: 0,
      currentSelectUser: "",
      roleOptions: [], // 用户角色
      loadUser: false // 是否已经加载完成角色
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
    /**
     * 用于重置默认选中数据
     */
  },
  watch: {
    /**
     * 外部请求参数变化，重新查询用户
     */
    params: {
      handler(val) {
        this.queryParam = { ...this.queryParam, ...val };
        if (this.afterMounted) {
          this.handleSearch();
        }
      },
      immediate: true,
      deep: true
    },
    /**
     * 该页面加载loading同步给父组件
     * 选人时用户组件没有单独的loading，是整个组合组件的loading
     */
    loading(val) {
      this.$emit("loading", val);
    },
    /**
     * 检测到删除id有变动，如果有值，需要将删掉的用户在表格中同步不勾选
     */
    deleteId(val) {
      if (val) {
        this.selectedRowKeys = this.selectedRowKeys.filter(v => v !== val);
        this.selectionRows = this.selectionRows.filter(v => v.userId !== val);
      }
    },
    /**
     * 打开弹窗时重置勾选数据
     */
    initData: {
      handler(val) {
        this.selectedRowKeys = val.map(v => v.userId);
        this.selectionRows = this.selectionRows?.filter(v => this.selectedRowKeys.includes(v.userId));
      },
      immediate: true,
      deep: true
    },
    /**
     * 需要等待机构树数据请求后再查询用户数据
     */
    startSearch: {
      handler(val) {
        if (val) {
          if (typeof val !== "boolean") {
            this.queryParam = { ...this.queryParam, ...val };
          }
          this.handleSearch()
            .then(() => {
              this.afterMounted = val;
              if (this.mySetDefault && this.dataSource.length > 0) {
                this.$emit("set-default", [this.dataSource[0].userId], [this.dataSource[0]]);
                this.mySetDefault = false;
              }
            });
        }
      },
      immediate: true
    }
  },
  created() {
    this.getRoles();
  },
  methods: {
    /**
     * 根据AppId获取角色信息
     */
    getRoles() {
      const params = {
        appId: proxy[env].appId
      };
        // 拉取用户角色
      this.$request.get("/system/role/list", { params })
        .then(res => {
          this.roleOptions = res.data.rows;
        })
        .finally(() => {
          this.loadUser = true;
        });
    },
    clearCurrentSelectUser() {
      this.currentSelectUser = "";
    },
    /**
     * 单选用户处理
     */
    handleSelectUserChange(row) {
      if (this.needDeptBeforeChoose) {
        if (!this.queryParam.deptId) {
          return this.$message.warning("请先选择部门");
        }
      }
      this.currentSelectUser = row.userId;
      this.$emit("change", [row.userId], [row]);
    },
    /**
     * 多选用户处理
     */
    rehandleSelectChange(value, { selectedRowData }) {
      if (this.needDeptBeforeChoose) {
        if (!this.queryParam.deptId) {
          return this.$message.warning("请先选择部门");
        }
      }
      this.selectedRowKeys = value;
      this.$emit("change", value, selectedRowData);
    },
    /**
     * 重新设置默认值
     */
    restartDefaultFn() {
      this.handleSearch().then(() => {
        if (this.dataSource.length > 0) {
          this.$emit("set-default", [this.dataSource[0].userId], [this.dataSource[0]]);
        }
      });
    },
    /**
     * 执行查询
     * mounted中的查询所有用户会先执行，如果有默认的部门或者角色，还会执行查询
     * 如果mounted的查询结果晚于部门或者角色变动的查询返回，会导致展示结果不正确
     * 应该等有返回之后再执行查询
     */
    handleSearch(val) {
      if (mountedQueryPromise) {
        return mountedQueryPromise
          .then(() => {
            mountedQueryPromise = null;
            return this.searchQuery(val);
          });
      }
      mountedQueryPromise = this.searchQuery(val);
      return mountedQueryPromise;
    },
    /**
     * 审批节点不能选自己
     */
    getCheckboxProps(row) {
      const props = this.canSelf ? {} : { disabled: this.userInfo.id === row.userId };
      return { props };
    }
  }
});
</script>
<style scoped lang="less">
@import "./style/UserTableStyle.less";
</style>