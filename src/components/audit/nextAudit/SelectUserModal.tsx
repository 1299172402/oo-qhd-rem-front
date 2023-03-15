import Vue from "vue";
import { mapGetters } from "vuex";
import { getAction } from "@/api/common/manage";
import DeptTree from "./DeptTree";
import OpenClose from "./OpenClose";
import UserTable from "./UserTable";
import "./style/SelectUserModalStyle.less"

const allLoading = {
  dept: true,
  user: true
};

const perfixCls = "select-user-modal";
export default Vue.extend({
  name: "SelectAudit",
  components: {
    DeptTree,
    UserTable,
    OpenClose
  },
  inject: {
    needRestart: {
      default: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "选择用户"
    },
    modalWidth: {
      type: Number,
      default: 0
    },
    // 是否允许自定义添加用户
    allowAdd: {
      type: Boolean,
      default: false
    },
    // 用户能否多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 部门能否多选
    deptMultiple: {
      type: Boolean,
      default: false
    },
    // 审批节点选人时需要有该参数
    queryParams: {
      type: Object,
      default: () => ({})
    },
    // 默认查询的角色
    roleCode: {
      type: String,
      default: ""
    },
    users: {
      type: Array,
      default: () => []
    },
    // 默认不显示部门，不查询部门
    showDept: {
      type: Boolean,
      default: false
    },
    setDefault: {
      type: Boolean,
      default: false
    },
    swOrganType: {
      type: String,
      default: "0"
    },
    // 默认不选择部门，不传递部门
    selectDept: {
      type: Boolean,
      default: false
    },
    // 默认不选择部门
    needDeptBeforeChoose: {
      type: Boolean,
      default: false
    },
    // 判断是否为协办人的选择，如果是选择协办人的情况，会在遇到有多个部门的人员时截取他的第一个部门作为协办人保存时的部门
    isCosponsor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTree: true,
      defaultIsOpenDept: (this as any).showDept,
      depts: [],
      myRoleCode: this.roleCode,
      dataMap: {},
      loading: true,
      selectedDepts: [],
      initData: [],
      startSearchUser: false,
      selectedUsers: [],
      deleteId: "",
      customtags: [],
      inputVisible: false,
      inputValue: "",
      columns: [
        {
          title: "用户姓名",
          align: "center",
          colKey: "nickName",
          width: 120,
          key: "nickName"
        },
        {
          title: "操作",
          align: "center",
          colKey: "action",
          width: 80,
          key: "action",
          cell: (h, { row, index }) => <a onClick={() => {
            (this as any).handleDelete(row, index)
          }}>删除</a>,
        }
      ],
      userMutiple: this.multiple,
      userTableQueryParams: {
        deptId: ""
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    /**
     * 本组件内部使用的是否打开弹窗
     */
    myVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("changeVisible", val);
      }
    },
    forceRender() {
      return this.setDefault || this.needRestart;
    },
    rightWidth() {
      return this.selectDept ? { width: "300px" } : { width: "210px" };
    }
  },
  watch: {
    /**
     * 弹窗打开状态变化，需要同步一下自定义的数据
     */
    myVisible(val) {
      if (val) {
        this.customtags = this.users.filter(v => !v.userId || v.userId === v.realname).map(v => v.realname);
        this.initData = this.users.filter(v => v.userId && v.userId !== v.realname);
        this.selectedUsers = this.initData;
        this.setDataMap(this.initData);
      }
    },
    /**
     * 审批节点选人时传入参数，对流程中规定的部门与角色信息进行赋值筛选
     */
    queryParams: {
      handler(val) {
        if (val) {
          if (val.canBreakScope !== undefined) {
            this.showTree = val.canBreakScope;
            if (!this.showTree) {
              allLoading.dept = false;
            }
          }
          let deptId = "";
          if (val.applyScope) {
            deptId = val.applyScope;
          } else if (val.relativePerson === "Login") {
            // 默认选中当前登录人的部门
            deptId = this.userInfo.deptId;
          } else {
            deptId = val.auditUserSearchCallBackData;
          }
          if (deptId) {
            this.depts = [{
              key: deptId
            }];
          }
          this.myRoleCode = val.resourceId || "";
          if (typeof val.canMultiSelect === "boolean") {
            this.userMutiple = val.canMultiSelect;
          }
          if (deptId) {
            this.handleDeptCheckChange(deptId);
            this.setStartSearchUser();
            // getAction("/sys/sysDepart/getById", {
            //   id: deptId
            // })
            //   .then(v => {
            //     if (v.result && v.result.id === deptId) {
            //       this.handleDeptCheckChange([v.result]);
            //       this.setStartSearchUser();
            //     } else {
            //       this.$message.warning("没有找到预期的部门");
            //     }
            //   });
          } else if (val.orgCode) {
            this.handleDeptCheckChange([{ orgCode: val.orgCode }]);
          } else {
            this.setStartSearchUser();
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (!this.showDept && JSON.stringify(this.queryParams) === "{}") {
      this.setStartSearchUser();
    }
    if (this.selectDept) {
      this.columns.splice(1, 0, {
        title: "部门",
        align: "center",
        dataIndex: "departName",
        width: 120,
        key: "departName",
        customRender: (t) => {
          if (this.isCosponsor) {
            return t.includes("|") ? t.split("|")[0].slice(0, -1) : t;
          }
          return t;
        }
      });
    }
  },
  methods: {
    /**
     * 设置 startSearchUser 为 true
     */
    setStartSearchUser() {
      (this as any).startSearchUser = {
        roleCode: (this as any).myRoleCode
      };
    },
    /**
     * 部门组件数据加载完成，需要判断用户组件是否也加载完成再决定页面的loading
     */
    handleDataOk() {
      allLoading.dept = false;
      (this as any).loading = !(!allLoading.user && !allLoading.dept);
    },
    /**
     * 同步用户组件传出的loading状态，需要判断部门组件与用户组件都加载完成loading才为false
     */
    handleUserTableLoading(val) {
      allLoading.user = val;
      if (!(this as any).showDept) {
        (this as any).loading = val;
      } else {
        (this as any).loading = !(!allLoading.user && !allLoading.dept);
      }
    },
    /**
     * 关闭当前弹窗
     */
    handleClose() {
      (this as any).myVisible = false;
    },
    /**
     * 点击确定，将数据抛出给父组件并且关闭弹窗
     */
    handleOk() {
      (this as any).myVisible = false;
      let re = [];
      re = [...(this as any).selectedUsers, ...(this as any).customtags.map(v => ({
        userId: "",
        realname: v
      }))];
      this.$emit("ok", re);
    },
    /**
     * 点击已选用户中的删除按钮，将用户删掉，并且将用户的id传给用户组件
     */
    handleDelete(row, index) {
      (this as any).selectedUsers.splice(index, 1);
      (this as any).deleteId = row.userId;
      if (!(this as any).selectedUsers || (this as any).selectedUsers.length === 0) {
        if (this.$refs.userTable) {
          (this.$refs.userTable as any).clearCurrentSelectUser();
        }
      }
    },
    /**
     * 已选部门改变，本页面的已选部门跟着同步
     */
    handleDeptCheckChange(id: string) {
      // (this as any).selectedDepts = val || [];
      // const orgCode = val.map(v => v.orgCode).join(",");
      this.$set((this as any).userTableQueryParams, "deptId", id);
    },
    /**
     * 自定义用户输入框显示出来
     */
    showInput() {
      (this as any).inputVisible = true;
      this.$nextTick((this as any).handleInputFocus);
    },
    handleInputFocus() {
      (this.$refs.input as any).focus();
    },
    /**
     * 自定义输入框的值改变，将其值赋值给变量
     */
    handleInputChange(e) {
      (this as any).inputValue = e.target.value;
    },
    /**
     * 自定义输入框失焦，将输入的值插入到自定义用户数组中，并隐藏输入框显示自定义按钮
     */
    handleInputConfirm() {
      const {inputValue} = (this as any);
      let {customtags} = (this as any);
      if (inputValue && customtags.indexOf(inputValue) === -1) {
        customtags = [...customtags, inputValue];
      }
      Object.assign(this, {
        customtags,
        inputVisible: false,
        inputValue: ""
      });
    },
    /**
     * 已选择用户改变，需要同步一下本组件中的数据
     */
    handleSelectedUserChange(keys, rows) {
      (this as any).setDataMap(rows);
      const re = [];
      keys.forEach(key => {
        re.push((this as any).dataMap[key]);
      });
      (this as any).selectedUsers = re;
      (this as any).deleteId = "";
      if (!(this as any).multiple && re.length > 0) {
        (this as any).customtags = [];
      }
    },
    /**
     * 设置默认用户
     */
    handleSetDefault(keys, rows) {
      (this as any).handleSelectedUserChange(keys, rows);
      (this as any).handleOk();
    },
    /**
     * 保存一下映射的完整数据
     */
    setDataMap(rows) {
      rows.forEach(v => {
        if (!(this as any).dataMap[v.userId]) {
          (this as any).dataMap[v.userId] = v;
        }
      });
    }
  },
  render() {
    const treeContainerCls = [
      `${perfixCls}__container__left`,
      {opening: this.defaultIsOpenDept, closing: !this.defaultIsOpenDept}
    ]

    let inputOrtagEl = null;
    if (this.inputVisible) {
      inputOrtagEl = <t-input
        ref="input"
        type="text"
        size="small"
        style="width: 78px"
        value={this.inputVisible}
        onChange={this.handleInputChange}
        onBlur={this.handleInputConfirm}
        onKeydow={this.handleInputConfirm}
      />
    } else if (this.multiple || (this.selectedUsers.length + this.customtags.length === 0)) {
      inputOrtagEl = (<t-tag
        style="background: #fff; borderstyle: dashed"
        onClick={this.showInput}
      >
        <t-icon name="add" /> 自定义
      </t-tag>
      )
    }

    return (
      <t-dialog
        width={this.modalWidth}
        visible={this.myVisible}
        title={this.title}
        placement="center"
        onConfirm={this.handleOk}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        class={perfixCls}
        closeOnOverlayClick={false}
      >
        <t-loading loading={this.loading} class={`${perfixCls}__spin`}>
          <div class={`${perfixCls}__container`}>
            {
              this.showTree ? 
                <div class={treeContainerCls}>
                  <DeptTree 
                    showTag={true}
                    depts={this.depts}
                    swOrganType={this.swOrganType}
                    multiple={this.deptMultiple}
                    onOk={this.handleDataOk}
                    onChange={this.handleDeptCheckChange}
                  />
                  <OpenClose
                    style={`display: ${!this.loading ? "inline-block" : "none"}`}
                    iconClass={{toLeft: "chevron-left-double", toRight: "chevron-right-double"}}
                    defaultIsOpen={this.defaultIsOpenDept}
                    marginLeft={{left: ["calc(50% - 25px)", "0"]}}
                    onClick={val => { this.defaultIsOpenDept = val}}
                  />
                </div> : null
            }
            <div class={`${perfixCls}__container__center`}>
              <UserTable
                ref="userTable"
                showRoleSelect={this.showTree}
                setDefault={this.setDefault}
                deleteId={this.deleteId}
                initData={this.initData}
                needDeptBeforeChoose={this.needDeptBeforeChoose}
                params={this.userTableQueryParams}
                multiple={this.userMutiple}
                startSearch={this.startSearchUser}
                onLoading={this.handleUserTableLoading}
                onChange={this.handleSelectedUserChange}
                {...this.$attrs}
              />
            </div>
            <div class={`${perfixCls}_container__right`} style={this.rightWidth}>
              <div class={`${perfixCls}__container__right__right-label`} readOnly >已选用户</div>
              <div class={`${perfixCls}__container__right__right-table-container`}>
                <t-table
                  columns={this.columns}
                  data={this.selectedUsers}
                  class={`${perfixCls}__container__right-table`}
                  pagination={null}
                  size="medium"
                  bordered
                  rowKey="userId"
                  style="margin-bottom: 10px"
                >
                </t-table>
                {
                  this.allowAdd ? <div class="custom-div">
                    {
                      this.customtags.map((item, index) => (
                        <t-tag key={`tag_${index}`} closable={true} onClose={() => { this.customtags = this.customtags.filter((v) => v !== item)}}>
                          {item}
                        </t-tag>
                      ))
                    }
                    {inputOrtagEl}
                  </div> : null
                }
              </div>
            </div>
          </div>
        </t-loading>
      </t-dialog>
    )
  }
});