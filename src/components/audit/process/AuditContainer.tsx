import "./styles/AuditContainerStyle.less";
import { cloneDeep } from "lodash";
import Vue from "vue";
import AuditActionArea from "@/components/audit/process/AuditArea";
import {
  modelSchema,
  acceptActionsOptions
} from "@/components/audit/process/constant";
import { auditPageInfo } from "@/components/audit/process/api/audit";
import { actionApi, claimApi } from "@/components/audit/process/auditSave/ActionApi";
import { ActionAreaProps } from "@/components/audit/types";
import returnPaterPage from "@/utils/returnPaterPage";

export default Vue.extend({
  name: "AuditContainer",
  provide() {
    return {
      auditContext: this
    };
  },
  props: {
    // 传递参数说明
    // title：标签页的标题
    // processId：流程id
    // editableFormFields：允许编辑的说明
    // outsideAuditModel: { action: undefined, actionDisabled: false }
    infos: {
      type: Object,
      default: () => ({})
    },
    // beforeReject：退回前执行的函数，返回true表示可以往下执行
    beforeReject: {
      type: Function,
      default: null
    },
    // beforeComplete：通过前执行的函数，返回true表示可以往下执行
    beforeComplete: {
      type: Function,
      default: null
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    handleOk: {
      type: Function,
      default: vm => {
        vm.$nextTick(() => {
          vm.$router.go(-1);
          vm.$emit("return");
        });
      }
    },
    returnName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      model: cloneDeep(modelSchema),
      acceptActions: [],
      acceptActionsOptions
    };
  },
  computed: {
    _processInstanceId() {
      // infos.processId 应该在数据查询回来时赋值
      return this.model.procInstId || this.infos.processId;
    },
    isAudit() {
      return this.$route.query.businessKey && this.$route.query.taskId;
    },
    isView() {
      this.$set(this.infos, "isView", !this.isAudit);
      return !this.isAudit && !!this._processInstanceId;
    },
    showEditDateBtn() {
      return (this.model.extendProperties || []).find(v => v.key === "editData" && v.value === "true");
    },
    /**
         * 审批按钮展示文字，默认是审批
         */
    auditButtonText() {
      const re = (this.model.extendProperties || []).find(v => v.key === "audit_button_text");
      return re && re.value || this.infos.okText || "处理";
    },
    flowShowAction() {
      if (!this.actionOutSide) return false;
      if (!this.isAudit) return false;
      if (this.acceptActions.includes("Resolve")) return false;
      let item = (this.model.extendProperties || []).find(v => v.key === "operateFlowAuth");
      // if (item && !vHasPermissionFn(item.value)) { // 鉴权显示
      //     return false;
      // }
      item = (this.model.extendProperties || []).find(v => v.key === "flow_show_action" && v.value === "false");
      if (item) return false;
      return true;
    },
    showCurrentNode() {
      const ret = (this.model.extendProperties || []).some(v => v.key === "flow_show_action" && v.value === "false");
      if (ret) {
        return false;
      }
      return true;
    },
    /**
         * 是否将操作按钮放弹窗外面
         */
    actionOutside() {
      return !!this.infos.outsideAuditModel;
    },
    /**
         * 外放的审批参数对象
         */
    outsideAuditModel() {
      return this.infos.outsideAuditModel;
    }
  },
  watch: {
    /**
         * 给model的实例id赋值
         */
    _processInstanceId(val) {
      this.model.procInstId = val;
    },
    // eslint-disable-next-line func-names
    "$route": function(val) {
      if (val.path.indexOf("/Audit") !== -1 && this.acceptActions.length === 0) {
        this.getAuditPageInfo();
      }
    },
    toggleLeftMenuShow() {
      this.handleGetBtnGroupWidth();
    }
  },
  created() {
    this.getAuditPageInfo();
  },
  methods: {
    getAuditPageInfo() {
      const { taskId } = this.$route.query;
      const _this = this as any;
      if (taskId) {
        _this.model = cloneDeep(modelSchema);
        auditPageInfo(taskId)
          .then(v => {
            // 判断是否有申领
            if (this.infos.businessType && v.acceptActions.includes("Claim")) {
              const data = {
                bizId: _this.$route.query.businessKey,
                taskId: _this.$route.query.taskId
              };
              return claimApi(this.infos.businessType, data)
                .then(() => {
                  this.getAuditPageInfo();
                });
            }
            _this.acceptActions = v.acceptActions;
            _this.infos.acceptActions = v.acceptActions;
            // 设置默认的值(有通过默认选通过，没有则选中第一个)
            if (this.actionOutside) {
              if (_this.acceptActions.includes("Complete")) {
                this.outsideAuditModel.action = "Complete";
              } else {
                const [first] = _this.acceptActions;
                _this.outsideAuditModel.action = first;
              }
            }
            _this.infos.editableFormFields = v.editableFormFields;
            _this.infos.extendProperties = v.extendProperties;
            _this.infos.applyScope = v.applyScope || "";
            _this.infos.processDefinitionKey = v.processDefinitionKey || ""; // 当前节点key
            _this.infos.activityName = v.activityName;
            _this.model.editableFormFields = v.editableFormFields;
            _this.model.bizId = _this.$route.query.businessKey;
            _this.model.taskId = _this.$route.query.taskId;
            _this.model.taskName = v.activityName;
            _this.model.taskBeginDate = v.startTime;
            _this.model.taskDueDate = v.dueDate;
            _this.model.extendProperties = v.extendProperties || [];
            _this.model.flowBackToMeMode = v.flowBackToMeMode || "";
            if (_this.outsideAuditModel?.action) {
              _this.model.selectDelegationSettings = v.selectDelegationSettings;
            }
            _this.$emit("ready", _this.model.bizId, _this.model);
          }).catch(err => {
            if (process.env.NODE_ENV === "development") {
              console.error(err);
            }
          });
      } else {
        _this.$emit("ready", _this.$route.query.businessKey);
      }
    },
    async handleComplete(renderComponent) {
      const { businessType } = this.infos;
      if (!businessType) {
        this.$message.error("未定义业务流程key");
        return;
      }
      let canNext = true;
      if (this.beforeComplete) { // 通过前处理
        canNext = await this.getNextFlag(this.beforeComplete());
      }
      if (this.beforeReject) { // reject前处理
        canNext = canNext && await this.getNextFlag(this.beforeReject());
      }
      if (this.isAudit && this.actionOutside && !this.outsideAuditModel.action) { // 没有选择默认操作
        // 一般会有默认的行为，所以不会走到此分支
        return this.$message.warning("请先选择处理操作！");
      }
      Object.assign(this.model, this.infos.model || {});
      if (canNext) {
        // 点击处理按钮快速办结
        const quickFinish = (this.model.extendProperties || []).some(v => v.key === "quickFinish" && v.value === "true");
        if (quickFinish) {
          this.quickFinish("completeTask", this.model, businessType);
        } else {
          const actionAreaProps: ActionAreaProps = {
            businessType,
            dataSource: this.model,
            isView: this.isView,
            successCallback: this.handleOk,
            errorCallback: () => { this.$message.warning("审批失败"); },
            outsideAuditModel: this.outsideAuditModel
          };
          renderComponent(actionAreaProps);
        }
      }
    },
    async getNextFlag(promiseOrBoolean: boolean | Promise<any>) {
      if (typeof promiseOrBoolean === "boolean") {
        return promiseOrBoolean;
      }
      const ret = await promiseOrBoolean;
      return ret;
    },
    quickFinish(action, data, businessType) {
      const that = this as any;
      actionApi(action, businessType, data)
        .then(() => {
          that.$message.success("提交成功", 3);
          that.handleOk(that);
        })
        .catch(e => {
          console.error(e);
          that.$message.warning("审批失败");
        })
        .finally(() => {
          that.loading = false;
        });
    },
    handleCancel() {
      if (this.returnName && typeof this.returnName === "string") {
        returnPaterPage(this.$route.path, this.returnName);
      } else {
        console.error("AuditContainer:请确认returnPath路径配置正确");
      }
    }
  },
  render() {
    const that = this as any;
    const { cancelFn } = this.infos;
    const actionAreaProps = {
      class: "audit-container-actions",
      props: {
        completeFn: this.handleComplete,
        cancelFn: cancelFn || this.handleCancel,
        returnFn: this.handleCancel,
        infos: this.infos,
        isView: this.isView,
        model: this.model
      },
      on: {
        actionChange: action => {
          this.outsideAuditModel.action = action;
        }
      }
    };

    return (
      <div style="display: flex; flex-direction: column; height: 100%">
        <div class="audit-container-main">
          {this.$slots.default}
        </div>
        <div class="audit-container-footer">
          {
            that.hideFooter ? null : <AuditActionArea { ...actionAreaProps }>
              {{
                footer: () => this.$slots.footer,
                editData: () => this.$slots.editData
              }}
            </AuditActionArea>
          }
        </div>
      </div>
    );
  }
});