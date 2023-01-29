import "../styles/AuditPanelStyle.less"
import Vue from "vue";
import { cloneDeep } from "lodash";
import ActionType from "@/components/audit/process/auditSave/ActionType";
import { FLOW_AUDIT } from "@/components/audit/process/constant";
import rules from "@/components/audit/process/constant/rules";
import SelectNextAudit from "@/components/audit/nextAudit/SelectNextAudit";

export interface ActionMap {
    Delegate: string,
    Reject: string,
    Complete: string,
    Terminate: string,
    Finish: string
}

const actionMap: Readonly<ActionMap> = {
  "Delegate": "业务流转",
  "Reject": "退回",
  "Complete": "通过",
  "Terminate": "驳回",
  "Finish": "办结"
};

export default Vue.extend({
  name: "AuditPanel",
  inject: ["auditContext"],
  components: {
    SelectNextAudit
  },
  props: {
    dataSource: {
      type: Object,
      required: true
    },
    outsideAuditModel: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      // 当前是否是并行节点
      isParallelNode: false,
      rules: {
        ...rules,
        nextAuditInfoNextActId: [
          {
            message: "请先选择处理节点",
            // trigger: ["change", "blur"],
            validator: (this as any).nextActIdValidator,
          }
        ],
        parallelNodeAuditInfo: [{ required: true, message: "请选择处理人", trigger: ["blur"], transform: (this as any).parallelNodeAuditInfoTransform }]
      },
      FLOW_AUDIT,
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      nodeType: "default",
      auditInfo: {
        nextAuditInfo: {
          nextActId: undefined
        },
        currentAction: {
          key: "",
          value: "",
          action: ""
        },
        opinion: "",
        terminateProcessReason: "",
        flowBackToMe: false,
        attachments: ""
      },
      actions: [
        { key: "Complete", value: "通过", action: ActionType.COMPLETE },
        { key: "Reject", value: "退回", action: ActionType.REJECT },
        { key: "Terminate", value: "驳回", action: ActionType.TERMINATEPROCESSINSTANCE },
        { key: "Resolve", value: "归还委托", action: ActionType.RESOLVE }
      ],
      selectNextAuditWatch: {
        assignMode: ""
      }
    };
  },
  computed: {
    opinionRequired() {
      let res = false;
      (this.dataSource.extendProperties || []).forEach(x => {
        if (x.key === "opinionRequired" && x.value === "true") {
          res = true;
        }
      });
      return this.auditInfo.currentAction.key === "Reject" || res;
    },
    nextNodeType() {
      const keyword = "Delegate";
      const typeArray = this.operateFlowAuth && [{
        key: "default",
        value: "默认"
      }] || [];
      const accAct = this.dataSource.acceptActions;
      if (accAct && accAct.includes(keyword)) {
        typeArray.push({ key: "Delegate", value: "新增处理节点" });
        if (!this.operateFlowAuth) { this.setNodeType(keyword) }
      }
      return typeArray;
    },
    acceptActions() {
      // 设置默认的审批意见
      this.setDefaultOpinion(this.dataSource.extendProperties || []);
      const accAct = this.dataSource.acceptActions || [];
      if (this.nodeType === "Delegate") {
        return [{ key: "Delegate", disabled: false, value: "通过", action: ActionType.DELEGATE },
          { key: "Reject", disabled: true, value: "退回", action: ActionType.REJECT },
          { key: "bohui", disabled: true, value: "驳回", action: "bohui" }]; // TODO:
      } 
      const result = this.actions;
      if (result) {
        result.forEach(element => {
          element.disabled = !accAct.includes(element.key)
        });
      }
      return result;
            
    },
    auditDataReduction() {
      const dataReturned: any = {};
      if (!this.isResolve) {
        Object.assign(dataReturned, cloneDeep(this.auditInfo.nextAuditInfo));
        if (this.nodeType === "default") {
          // auditorInfo.nextAuditInfo
        } else {
          // 流程回到我
          if (!dataReturned.delegateInfo) {
            dataReturned.delegateInfo = {}
          }
          dataReturned.delegateInfo.flowBackToMe = this.auditInfo.flowBackToMe;
        }
      }
      // 审批意见
      dataReturned.opinion = this.auditInfo.opinion;
      dataReturned.terminateProcessReason = this.auditInfo.terminateProcessReason;
      // 附件
      dataReturned.attachments = this.auditInfo.attachments;

      const {action} = this.auditInfo.currentAction;
      return { dataReturned, action };
    },
    isResolve() {
      const key = "Resolve";
      const re = (this.dataSource.acceptActions || []).includes(key);
      if (re && this.auditInfo.currentAction.key !== key) {
        this.$set(this.auditInfo, "currentAction", this.acceptActions.find(item => item.key === key));
      }
      return re;
    },
    /**
         * 只选择到节点不用选人
         */
    onlyActivity() {
      if (this.isHistoryNode) return true;
      return this.selectNextAuditWatch.assignMode === "None" && this.nodeType !== "Delegate";
    },
    /**
         * 下一节点审批人的prop
         */
    nextAuditInfoProp () {
      if (this.onlyActivity) {
        return "nextAuditInfoNextActId";
      } 
      return (this.isParallelNode ? "parallelNodeAuditInfo" : "nextAuditInfo")
    },
    /**
         * 显示审批意见
         */
    flowShowComment() {
      return !(this.dataSource.extendProperties || []).find(v => v.key === "flow_show_comment" && v.value === "false");
    },
    /**
         * 显示处理操作
         */
    flowShowAction() {
      if (!this.auditInfo.currentAction.key) {
        this.setDefaultAction();
      }
      if (!this.operateFlowAuth) {
        return false;
      }
      return !(this.dataSource.extendProperties || []).find(v => v.key === "flow_show_action" && v.value === "false") && !this.isResolve;
    },
    /**
         * 是空值可显示处理操作字段
         * 有值的话，需要有权限的才显示
         */
    operateFlowAuth() {
      const item = (this.dataSource.extendProperties || []).find(v => v.key === "operateFlowAuth");
      return !item;
    },
    /**
         * 用于判断是否为选择节点
         */
    isSelectNode() {
      return this.dataSource.preActivities && this.dataSource.preActivities.length >= 0;
    },
    /**
         * 用来判断选择的内容是否为历史节点
         */
    isHistoryNode() {
      return this.isSelectNode && this.dataSource.preActivities.find(x => x.actId === this.auditInfo.nextAuditInfo.nextActId);
    },
    /**
         * 弹窗外部已确定操作类型
         */
    defaultAction() {
      return this.outsideAuditModel?.action;
    },
    /**
         * 当前节点的text
         */
    actionText() {
      if (this.defaultAction) {
        return this.acceptActionsMap[this.defaultAction] || actionMap[this.defaultAction];
      }
      return "";
    },
    curFlowBackToMeMode() {
      return this.flowBackToMeMode;
    }
  },
  watch: {
    nodeType: {
      handler() {
        const [first] = this.acceptActions;
        this.auditInfo.currentAction = first;
        this.auditInfo.nextAuditInfo = {};
      },
      deep: true
    }
  },
  created() {
    this.auditInfo.flowBackToMe = (this.flowBackToMeMode === "back");
  },
  methods: {
    nextActIdValidator() {
      return new Promise((resolve) => {
        if (this.auditInfo.nextAuditInfo.nextActId) {
          resolve({ result: true});
        } else {
          resolve({ result: false, message: "请选择处理节点", type: "error"});
        }
      })
    },
    selectAuditorOk(prarms) {
      this.auditInfo.nextAuditInfo = prarms;
      // 如果是选择节点就需要把prarms赋值给nextActId字段并转换提交方式
      if (this.isHistoryNode) {
        this.auditInfo.currentAction.action = "rejectTask";
        this.auditInfo.nextActId = prarms.nextActId;
      } else if (this.auditInfo.currentAction.action !== "delegateTask") {
        this.auditInfo.currentAction.action = "completeTask";
      }
      this.$nextTick(() => {
        if (this.isParallelNode) {
          this.$refs.form.validateField("parallelNodeAuditInfo");
        } else {
          this.$refs?.form.clearValidate([this.onlyActivity && "nextAuditInfoNextActId" || "nextAuditInfo"]);
        }
      });
    },
    changeCurrentAction({ target: { value: key }}) {
      if (key === "Reject") this.auditInfo.nextAuditInfo.nextActId = undefined;
      this.$set(this.auditInfo, "currentAction", cloneDeep(
        this.acceptActions.find(item => item.key === key)) || {}
      );
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs?.form.clearValidate();
        });
      });
    },
    /**
         * 设置默认的审批意见
         */
    setDefaultOpinion(array) {
      const findRe = array.find(v => v.key === "flow_default_comment");
      this.auditInfo.opinion = findRe && findRe.value || "";
    },
    /**
         * 设置默认的处理操作
         * 如果隐藏处理操作字段，则设置默认操作为通过
         * 主要用于安全检查整改回复
         */
    setDefaultAction() {
      let action = this.acceptActions && this.acceptActions[0];
      if (this.defaultAction) {
        // 如果外部已选择了操作
        action = { key: this.defaultAction };
      }
      if (this.isResolve) {
        action = (this.acceptActions || []).find(v => v.key === "Resolve");
      }
      if (action) {
        this.auditInfo.currentAction.key = action.key;
        this.changeCurrentAction({ target: { value: this.auditInfo.currentAction.key }});
      }
    },
    /**
         * 设置 nodeType
         */
    setNodeType(val) {
      this.nodeType = val;
    },
    /**
         * 并行节点时，需要将每个节点都选择下一节点人
         */
    parallelNodeAuditInfoTransform() {
      return this.auditInfo.nextAuditInfo.nextAuditInfos?.every(v => v.users.length > 0) ? "1" : "";
    }
  },
  render() {
    // 处理组件
    const opinionEl = (<t-form-item
      key="opinionRequired"
      label="处理意见"
      name="opinion"
      initialData="123456"
    >
      <t-textarea
        placeholder="请输入处理意见"
        clearable
        onChange={(val) => { this.auditInfo.opinion = val }} />
    </t-form-item>);
    // 驳回组件
    const terminateEl = (
      <t-form-item
        key="opinionRequired"
        label="处理意见"
        name="opinion"
      >
        <t-textarea
          placeholder="请输入处理意见"
          clearable
          onChange={(val) => { this.auditInfo.opinion = val }} />
      </t-form-item>
    );
        
    const defaultOpinionEl = (<t-form-item
      key="opinionRequired"
      label="处理意见"
      name="opinion"
    >
      <t-textarea
        placeholder="请输入处理意见"
        clearable
        onChange={(val) => { this.auditInfo.opinion = val }} />
    </t-form-item>);
        
    const curFlowBackToMeModeEl = (
      <t-form-item label="流程回到我">
        <t-checkbox onChange={(val) => { this.auditInfo.flowBackToMe = val }} disabled={this.curFlowBackToMeMode === "back"} />
      </t-form-item>
    )

    let terminateOrOpinionEl;
    if (this.opinionRequired) {
      terminateOrOpinionEl = opinionEl;
    } else if (this.auditInfo.currentAction.key === "Terminate"){
      terminateOrOpinionEl = terminateEl;
    } else {
      terminateOrOpinionEl = defaultOpinionEl
    }

    return (
      <t-form ref={"form"} rules={this.rules} data={this.auditInfo}>
        {
          this.flowShowAction && !this.isSelectNode ? <t-form-item label="处理操作" name="name" initialData="TDesign">
            {
              !this.defaultAction ? <t-radio-group value={this.auditInfo.currentAction.key} onChange={(val) => { this.auditInfo.currentAction.key = val }}>
                {
                  this.acceptActions.filter(v => v.key !== "Reslove" && v.disabled === false).map(item => <t-radio key={item.value} disable={item.disabled} value={item.key}>{item.value}</t-radio>)
                }
              </t-radio-group> : <span>{this.actionText}</span>
            }
          </t-form-item> : null
        }
        {
          //     退回操作 todo
        }
        {
          // 意见元素
          this.flowShowComment ? terminateOrOpinionEl : null
        }
        <t-form-item
          label="下一处理节点"
          name={this.nextAuditInfoProp}
          initialData="['1']"
          requiredMark={true}
        >
          <div class={"audit-panel-next-node"}>
            <div>
              <t-select value={this.nodeType} onChange={(val) => { this.nodeType = val }}>
                {
                  this.nextNodeType.map(item => <t-option key={item.value} label={item.value} value={item.key} />)
                }
              </t-select>
            </div>
            <SelectNextAudit 
              nodeType={this.nodeType}
              dataSource={this.dataSource}
              watch-value={this.selectNextAuditWatch}
              class={"select-next-audit"}
              onParallelNode={(val) => {this.isParallelNode = val}}
              onSelectAuditorOk={this.selectAuditorOk}
            />
          </div>
        </t-form-item>
        {
          this.nodeType === "Delegate" && this.curFlowBackToMeMode !== "go" ? curFlowBackToMeModeEl : null
        }
      </t-form>
    )
  }
})
