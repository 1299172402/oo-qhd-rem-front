import "./styles/AuditActionAreaStyle.less";
import Vue from "vue";
import AuditPopup from "@/components/audit/process/AuditPopup";
import { ActionAreaProps } from "@/components/audit/types";
import { acceptActionsOptions } from "@/components/audit/process/constant";
import { ActionMap } from "@/components/audit/process/auditComp/AuditPanel";

const actionMap = new Map<keyof ActionMap, string>();
acceptActionsOptions.forEach(item => {
  actionMap.set(item.value, item.text);
})

export default Vue.extend({
  name: "AuditActionArea",
  inject: ["auditContext"],
  props: {
    completeFn: {
      type: Function,
      default: () => ({})
    },
    cancelFn: {
      type: Function,
      default: () => ({})
    },
    infos: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dataSource: [],
      auditProps: {
        businessType: "",
        isView: false
      }
    }
  },
  computed: {
    showEditDataBtn() {
      return (this.model.extendProperties || []).find(v => v.key === "editData" && v.value === "true");
    }  
  },
  methods: {
    renderAuditComponent(props: ActionAreaProps): void {
      const { isView, businessType } = props;
      this.auditProps.isView = isView;
      this.auditProps.businessType = businessType;
      this.$refs.AuditPopup.initData();
    }
  },
  render() {
    const { footer } = this.$slots;
    const currentNodeEl = (
      <div className="audit-action-current-node">
        <span>
                    当前节点：
        </span>
        <span>
          {this.model.taskName}
        </span>
      </div>
    );
    const processingOperationEl = (
      <span>
        <span>
                    处理操作：
        </span>
        <t-radio-group default-value="1" onChange={(value: keyof ActionMap) => this.$emit("actionChange", value)}>
          {
            this.auditContext.acceptActions.map((val) => <t-radio value={val}>{actionMap.get(val)}</t-radio>)
          }
        </t-radio-group>
      </span>
    )
    const auditText = this.auditContext.isView ? "查看审批流" : null
    const defaultFooter = [
      this.actionOutside && this.isAudit ? currentNodeEl : <div />,
      <div class="audit-action-btns">
        {
          this.actionOutside && this.isAudit ? processingOperationEl : null
        }
        <t-button variant="outline" theme="default" onClick={this.cancelFn}>取消</t-button>
        <t-button onClick={() => this.completeFn(this.renderAuditComponent)}>
          {
            this.auditContext.isAudit ? "处理" : auditText
          }
        </t-button>
        {
          this.auditContext.isView ? <span>{ this.$slots.viewData }</span> : null
        }
        {
          this.auditContext.isAudit ? <span>{ this.$slots.auditData && this.$slots.auditData({ item: this.model}) }</span> : null
        }
        {
          this.showEditDataBtn ? <span>{ this.$slots.editData }</span> : null
        }
      </div>
    ];
    return (
      <div class="audit-action">
        {
          footer || defaultFooter
        }
        <AuditPopup
          ref={"AuditPopup"}
          dataSource={this.model}
          businessType={this.auditProps.businessType}
          isView={this.auditProps.isView}
          onClose={() => {
            this.$nextTick(() => {
              this.visible = false
            })
          }}
        />
      </div>
    )
  }
})