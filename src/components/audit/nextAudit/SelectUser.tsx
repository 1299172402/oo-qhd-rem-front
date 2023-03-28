import Vue from "vue";
import SelectUserModal from "@/components/audit/nextAudit/SelectUserModal";
import "./style/SelectUserStyle.less";

export default Vue.extend({
  name: "SelectUser",
  components: {
    SelectUserModal
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择人员"  
    },
    btnText: {
      type: String,
      default: "选择"
    },
    buttons: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: true
    },
    initData: {
      type: Array,
      default: () => []
    },
    labelValue: {
      type: Array,
      default: () => ["userId", "realname"]
    },
    reset: {
      type: Boolean,
      default: false
    },
    setInit: {
      type: Object,
      default: () => ({
        refresh: false,
        data: undefined
      })
    },
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
      visible: false,
      selectedUsers: [],
      afterInit: false
    }
  },
  watch: {
    reset() {
      this.selectedUsers = [];
      this.handleOk([]);
    },
    "setInit.refresh": {
      handler() {
        if (!this.setInit.data) {
          return;
        }
        this.selectedUsers = (this.setInit.data || []).map(item => {
          if (this.selectDept) {
            return {
              userId: item[this.labelValue[0]],
              realname: item[this.labelValue[1]],
              departId: item[this.labelValue[2]],
              departName: item[this.labelValue[3]]
            };
          }
          return {
            userId: item[this.labelValue[0]],
            realname: item[this.labelValue[1]]
          };
        });
      },
      immediate: true
    }
  },
  created() {
    this.unWacthInitData = this.$watch("initData", this.watchFn, { immediate: true });
  },
  methods: {
    watchFn(val) {
      if (!this.afterInit && val && val.length > 0) {
        this.selectedUsers = val.map(item => ({
          userId: item[this.labelValue[0]],
          realname: item[this.labelValue[1]]
        }));
        this.afterInit = true;
      } else if (this.afterInit && this.unWacthInitData) {
        this.unWacthInitData();
      }
    },
    /**
         * 弹窗选人确定
         */
    handleOk(val) {
      if (this.isCosponsor) {
        val.forEach(x => {
          if (x.departName.includes("|")) {
            x.departName = x.departName.split("|")[0].slice(0, -1);
          }
        });
      }
      this.selectedUsers = val;
      this.$emit("select", val);
      // change事件需要放在最后，否则会在select等事件触发前就触发校验
      this.$emit("change", val);
    },
    /**
         * 删掉人员
         */
    handleSelectChange(val) {
      this.selectedUsers = this.selectedUsers.filter(v => val.includes(v.userId || v.realname));
      this.$emit("select", this.selectedUsers);
      this.$emit("change", this.selectedUsers);
    },
    /**
         * 打开选择人员的弹窗
         */
    handleClick() {
      this.visible = true;
    }
  },
  render() {
    let { width } = this.$attrs;
    if (!width) {
      width = 1200;
    }
    return (
      <div class={"select-user-container"}>
        <div class={"select-user-input-container"}>
          {
            this.$slots.left ?
              this.$slots.left :
              <t-select-input
                readOnly={true}
                value={this.selectedUsers?.[0]?.nickName}
                class={"select-user-input"}
                placeholder={this.placeholder}
              >
              </t-select-input>
          }
        </div>
        <div class={"select-user-btn"}>
          <t-button
            disabled={this.disabled}
            onClick={this.handleClick}
          >
            {this.btnText}
          </t-button>
          <SelectUserModal
            {...this.$attrs}
            queryParams={this.$attrs.queryParams}
            modalWidth={width}
            isCosponsor={this.isCosponsor}
            users={this.selectedUsers}
            needDeptBeforeChoose={this.needDeptBeforeChoose}
            visible={this.visible}
            selectDept={this.selectDept}
            onOk={this.handleOk}
            onChangeVisible={(val) => {this.visible = val}}
          />
        </div>
      </div>
    )
  }
})