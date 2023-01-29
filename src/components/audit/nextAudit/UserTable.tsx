import Vue from "vue";
import { mapGetters } from "vuex";
import { queryall } from "./api/api";
import SelectSingleInput from "./SelectSingleInput";
import TableMixin from "../mixins/TableMixin";
import { optionsFilter } from "../utils";
import "./style/UserTableStyle.less"

let mountedQueryPromise = null;
const perfixCls = "select-user-table"
export default Vue.extend({
  name: "UserTable",
  components: {
    SelectSingleInput
  },
  mixins: [TableMixin],
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
      disableMixinCreated: true,
      columns: [
        { title: "", colKey: "id", width: 60, align: "center", cell: (h, { row }) => <t-radio value={row.userId} onClick={() => { (this as any).handleSelectUserChange(row) }}></t-radio>},
        { title: "姓名", width: 150, align: "center", colKey: "realname" },
        { title: "部门", align: "center", colKey: "departName", ellipsis: true }
      ],
      url: {
        list: "/sys/user/queryByOrgCodeForAddressSelector"
      },
      queryParam: {
        activitiSync: "1",
        realname: "",
        roleCode: "",
        orgCode: "",
        querySubDept: !this.needDeptBeforeChoose
      },
      dicts: {
        roleCodeOptions: []
      },
      afterMounted: false,
      mySetDefault: this.setDefault,
      tableHeight: 0,
      currentSelectUser: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
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
          this.handleSearch()
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
        this.selectionRows = this.selectionRows.filter(v => this.selectedRowKeys.includes(v.userId));
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
  mounted() {
    this.bindDicts();
  },
  methods: {
    clearCurrentSelectUser() {
      this.currentSelectUser = "";
    },
    handleSelectUserChange(row) {
      if (this.needDeptBeforeChoose) {
        if (!this.queryParam.orgCode) {
          return this.$message.warning("请先选择部门");
        }
      }
      this.currentSelectUser = row.userId;
      this.$emit("change", [row.userId], [row]);

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
       *
       * 绑定下拉数据
       */
    bindDicts() {
      return queryall()
        .then(v => {
          this.dicts.roleCodeOptions = v.result || [];
        });
    },
    /**
     * 下拉角色过滤
     */
    optionsFilter,
    /**
     * 用户选择勾选改变
     */
    handleSelectChange(selectedRowKeys, selectionRows) {
      if (this.needDeptBeforeChoose) {
        if (!this.queryParam.orgCode) {
          return this.$message.warning("请先选择部门");
        }
      }
      this.$emit("change", selectedRowKeys, selectionRows);
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
  },
  render() {
    const SelectSingleInputEl = (
      <SelectSingleInput
        value={this.queryParam.roleCode}
        options={this.dicts.roleCodeOptions}
        value-field="roleCode"
        text-field="roleName"
        placeholder="角色"
        filter-option={optionsFilter}
        onInput={(val) => {this.queryParam.roleCode = val}}
        onChangeValue={ (val) => {this.queryParam.roleCode = val}}
      />
    )
    return (
      <div>
        <div class={`${perfixCls}__center-search`}>
          <t-input
            value={this.queryParam.realname}
            placeholder="姓名"
            allow-clear
            onPressEnter={this.handleSearch}
            onChange={val => {this.queryParam.realname = val}}
          />
          {this.showRoleSelect ? SelectSingleInputEl : null}
          <t-button onClick={this.handleSearch}>
            查询
          </t-button>
          <slot name="queryButton"></slot>
        </div>
        <t-radio-group value={this.currentSelectUser}>
          <t-table
            ref="table"
            bordered
            row-key="userId"
            columns={this.columns}
            data={this.dataSource}
            pagination={this.ipagination}
            class={`${perfixCls}__center-table`}
            onChange={this.handleTableChange}
          />
        </t-radio-group>
      </div>
    )
  }
})