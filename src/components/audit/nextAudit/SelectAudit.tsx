import { getUsersInitDataFromStringField } from "@/components/audit/utils";
import SelectUser from "@/components/audit/nextAudit/SelectUser";
import "./style/SelectAuditStyle.less"

export default {
  name: "SelectAudit",
  props: {
    useDelegationSetting: {
      type: Boolean,
      default: false
    },
    pageModel: {
      type: Object,
      default: () => ({})
    },
    apiFn: {
      type: Function,
      default: null
    },
    apiNextAuditInfosQueryParams: {
      type: Object,
      default: null
    },
    setDefault: {
      type: Boolean,
      default: true
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
    }
  },
  data() {
    return {
      nextAuditInfosQueryParams: {},
      showSelect: false,
      selectModel: undefined,
      afterInit: false
    };
  },
  computed: {
    resources() {
      if (this.useDelegationSetting) {
        return this.nextAuditInfosQueryParams.selectDelegationSettings?.selectResources;
      } 
      return this.nextAuditInfosQueryParams && this.nextAuditInfosQueryParams.nextActivities && this.nextAuditInfosQueryParams.nextActivities[0].assignResources;
            
    },
    blankTip() {
      if (this.useDelegationSetting) {
        return !!this.nextAuditInfosQueryParams.selectDelegationSettings?.selectResources;
      } 
      return !!this.assignResources;
            
    },
    assignResources() {
      return this.nextAuditInfosQueryParams?.nextActivities?.[0]?.assignResources || null;
    },
    /**
         * 选择下一节点人参数异常的时候disabled
         */
    disabled() {
      return !this.setting;
    },
    /**
         * 下一节点人员参数
         */
    setting() {
      if (this.useDelegationSetting) return this.nextAuditInfosQueryParams.selectDelegationSettings;
      return this.nextAuditInfosQueryParams?.nextActivities?.[0]?.selectNextAuditSetting || null;
    },
    /**
         * 将上次保存的审批人回显
         */
    initData() {
      let re = null;
      if (this.pageModel.nextAuditUsers) {
        try {
          re = JSON.parse(this.pageModel.nextAuditUsers).map(v => ({
            userId: v.userId,
            realname: v.userRealName
          }));
        } catch (e) {
          re = getUsersInitDataFromStringField(this.pageModel.nextAuditUsers);
        }
      }
      // eslint-disable-next-line no-unused-expressions
      this.setting && re && this.selectAuditorOk(re);
      return re || [];
    },
    /**
         * 父组件确定默认第一人并且不是编辑的时候默认第一个审批人
         */
    mySetDefault() {
      return this.setDefault && !this.$route.params.id;
    }
  },
  watch: {
    apiNextAuditInfosQueryParams(val, oldVal) {
      if (!this.apiFn && (val || oldVal)) {
        this.nextAuditInfosQueryParams = val;
        this.handleNextAuditInfosQueryParamsChange();
      }
    }
  },
  mounted() {
    const _this = this as any;
    if (_this.apiFn) {
      _this.apiFn()
        .then(v => {
          _this.nextAuditInfosQueryParams = v || {};
          _this.handleNextAuditInfosQueryParamsChange();
        });
    }
  },
  methods: {
    /**
         * 选择下一节点审批人完毕
         */
    selectAuditorOk(userArray) {
      this.pageModel.nextAuditInfos = [];
      if (!userArray || userArray.length === 0) {
        this.setNextAuditUsers();
        return;
      }
      this.pageModel.nextAuditInfos.push(this.setAuditUser(userArray, this.nextAuditInfosQueryParams.nextActivities?.[0]));
      this.$emit("change", this.pageModel.nextAuditInfos);
      this.setNextAuditUsers();
    },
    /**
         * 将下一节点审批人保存为字符串形式
         */
    setNextAuditUsers() {
      const rows = this.pageModel.nextAuditInfos[0] && this.pageModel.nextAuditInfos[0].users || [];
      this.pageModel.nextAuditUsers = JSON.stringify(rows);
    },
    /**
         * 包装提交时审批人信息
         */
    setAuditUser(userArray, setting) {
      const auditor = {
        actId: setting && setting.actId,
        users: []
      };
      userArray.forEach(item => {
        auditor.users.push({
          userId: item.userId,
          userRealName: item.realname || item.userRealName,
          email: item.email || "",
          phone: item.phone || ""
        });
      });
      return auditor;
    },
    /**
         * 下一节点人参数变化之后，判断是否显示下拉
         */
    handleNextAuditInfosQueryParamsChange() {
      if (!this.blankTip) {
        return;
      }
      if (!this.afterInit && this.pageModel.nextAuditUsers) {
        let user: any = [];
        try {
          user = JSON.parse(this.pageModel.nextAuditUsers);
        } catch (e) {
          user = getUsersInitDataFromStringField(this.pageModel.nextAuditUsers);
        }
        user = user[0] || user;
        this.handleSelectChange(user);
        this.selectModel = user.userId || user.id;
      }
      if (this.afterInit) {
        // 将下一节点人赋值为空
        this.handleSelectChange();
        this.selectModel = undefined;
      }
      this.afterInit = true;
    },
    /**
         * 下拉选项改变，给赋值下一节点人
         */
    handleSelectChange(val) {
      const row = val || {};
      this.$set(this.pageModel, "nextAuditInfos", !val ? [] : [{
        actId: this.nextAuditInfosQueryParams.nextActivities[0].actId,
        users: [{
          "email": row.recipient || row.email,
          "phone": row.phone,
          "userId": row.id || row.userId,
          "userRealName": row.name || row.realname
        }]
      }]);
      this.$set(this.pageModel, "nextAuditUsers", val ? JSON.stringify(val) : "");
      this.$emit("change", this.pageModel.nextAuditInfos);
    },
    /**
         * 下拉筛选
         */
    optionsFilter(input, option) {
      return (
        option.componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    onChange() {
      // ToDo
    }
  },
  render() {
    const getAuditComponent = () => {
      if (this.blankTip) {
        return <div>
          <t-select
            value={this.selectModel}
            clearable
            readOnly={true}
            onChange={this.handleSelectChange}
            placeholder="请选择下一节点审批人"
          >
            {
              this.resources.map(item => (
                <t-option label={item.name} value={item.id}>  
                </t-option>
              ))
            }
            
          </t-select>
        </div>
      } 
      return <SelectUser
        show-dept={true}
        sw-organ-type={""}
        set-init={this.setInit}
        set-default={this.mySetDefault}
        init-data={this.initData}
        reset={this.reset}
        disable={this.disabled}
        queryParams={this.setting}
        onChange={this.selectAuditorOk}
      />
            
    }
    return (
      <div class={"select-audit-contianer"}>
        { getAuditComponent() }
      </div>
    )
  }
}