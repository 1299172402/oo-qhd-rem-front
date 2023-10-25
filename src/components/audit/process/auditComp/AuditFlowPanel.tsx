import Vue from "vue";
import moment from "dayjs";
import { getActionDesc } from "@/components/audit/utils";
import "../styles/AuditFlowStyle.less";
/* eslint-disable */
function computeWidth(val) {
  if (val > 0) {
    this.$nextTick(() => {
      let _maxWidth = this.maxWidth;
      document.querySelectorAll(".audit-flow-item-left")
        .forEach((item) => { _maxWidth = Math.max(_maxWidth, item.clientWidth); });
      this.maxWidth = _maxWidth;
      this.maxWidthStyle = `${_maxWidth + 10}px`;
    });
  }
}
/* eslint-disable */
export default Vue.extend({
  name: "AuditFlowPanel",
  inject: ["auditContext"],
  props: {
    dataSource: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      maxWidthStyle: "auto",
      maxWidth: 0
    };
  },
  watch: {
    "dataSource.length": function(val) {
      computeWidth.call(this, val);
    }
  },
  mounted() {
    if (this.dataSource.length > 0) {
      computeWidth.call(this, this.dataSource.length);
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
          this.dataSource.map((item) => (
            <div class={"audit-flow-item"}>
              <div class={"audit-flow-item-left"} style={{ width: `${this.maxWidthStyle}` }}>
                <div class={"audit-flow-item-left-title"}>{item.taskName}</div>
                <div class={"audit-flow-item-left-person"}>{item.assigneeName}</div>
                <div class={"audit-flow-item-left-time"}>{ moment(item.endDate).format("YYYY-MM-DD HH:mm:ss") }</div>
              </div>
              <t-timeline-item class={"audit-flow-item-right"}>
                <div class={"audit-flow-item-right-title"}>{getActionDesc(item)}</div>
                <div>
                  <t-tag theme="primary" variant="light">{ item.assigneeDeptName || "未指定部门" }</t-tag>
                </div>
                <p class="audit-flow-item-description">
                  {
                    item.operation !== "3" ? <span>审批意见：</span> : null
                  }
                  <span>{item.opinion}</span>
                </p>
              </t-timeline-item>
            </div>
          )
          )
        }
      </t-timeline>
    );
  }
});