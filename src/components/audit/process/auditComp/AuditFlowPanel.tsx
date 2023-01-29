import Vue from "vue";
import { getActionDesc } from "@/components/audit/utils";
import "../styles/AuditFlowStyle.less"; 

export default Vue.extend({
  name: "AuditFlowPanel",
  inject: ["auditContext"],
  data() {
    return {
      leftWidth: "auto"      
    }
  },
  props: {
    dataSource: {
      type: Array,
      required: true
    }
  },
  methods: {
    /**
         * 根据任务审批信息判断当前节点的类型描述
         */
    getActionDesc(item) {
      return getActionDesc(item);
    },
    blockChain(blockProcessId) {
      this.$refs.blockChain.showModal(blockProcessId);
    }
  },
  render() {
        
    return (
      <t-timeline layout="vertical" mode="same">
        {
          this.dataSource.map(item => {
            if (item.endDate) {
              this.leftWidth = "140px";
            }
            return (
              <div class={"audit-flow-item"}>
                <div class={"audit-flow-item-left"} style={{width: this.leftWidth}}>
                  <div class={"audit-flow-item-left-title"}>{item.taskName}</div>
                  <div class={"audit-flow-item-left-person"}>{item.assigneeName}</div>
                  <div class={"audit-flow-item-left-time"}>{item.endDate}</div>
                </div>
                <t-timeline-item class={"audit-flow-item-right"}>
                  <div class={"audit-flow-item-right-title"}>{getActionDesc(item)}</div>
                  <div>
                    <t-tag theme="primary" variant="light">{ item.assigneeDeptName || "未指定部门" }</t-tag>
                  </div>
                  <p class="audit-flow-item-description">
                    {
                      item.operation !== '3' ? <span>审批意见：</span> : null
                    }
                    <span>{item.opinion}</span>
                  </p>
                </t-timeline-item>
              </div>
            )
          }
          )
        }
      </t-timeline>
    )
  }
})