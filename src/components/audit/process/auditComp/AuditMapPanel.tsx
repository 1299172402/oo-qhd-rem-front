import Vue from "vue";
import "../styles/AuditMapStyle.less";
import dayJs from "dayjs";

import { diagramDetail } from "@/components/audit/process/api/audit";
import { getActionDesc } from "@/components/audit/utils";
import { getAttributeByName } from "@/components/audit/utils/domUtil";

const nodeCovers = [];
export default Vue.extend({
  name: "AuditMapPanel",
  props: {
    dataSource: {
      type: String,
      required: true
    },
    procInstId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      flowDetail: [],
      scale: {
        // 图片原本宽度
        real: null,
        // 图片压缩后的宽度
        now: null,
        // 图片压缩后的宽度与原本宽度比例
        rate: null
      }
    };
  },
  mounted() {
    this.loadDiagramDetail();
  },
  methods: {
    /**
         * 加载图片详细信息
         */
    loadDiagramDetail() {
      diagramDetail(this.procInstId)
        .then(flowDetail => {
          this.flowDetail = flowDetail;
          this.creatDiagramDetail();
        });
    },
    handleImgLoad(ref) {
      this.scale[ref] = +getAttributeByName(this.$refs[ref], "width").slice(0, -2);
      if (this.scale.real && this.scale.now) {
        this.scale.rate = this.scale.now / this.scale.real;
        this.creatDiagramDetail();
      }
    },
    /**
         * 处理审批地图上的气泡提示信息
         */
    creatDiagramDetail() {
      if (!this.scale.rate) {
        return;
      }
      const flowMapWrapper = document.getElementById("flowMapWrapper");
      diagramDetail(this.procInstId)
        .then(flowDetail => {
          // eslint-disable-next-line no-restricted-syntax
          for (const node of flowDetail) {
            // 在节点位置上放一个div元素，方便鼠标移入移出操作时显示隐藏气泡
            const nodeCover = document.createElement("div");
            nodeCover.style.position = "absolute";
            const coords = node.position.split(",").map(v => v * this.scale.rate);
            nodeCover.className = "node-cover";
            nodeCover.style.width = `${coords[2] - coords[0]  }px`;
            nodeCover.style.height = `${coords[3] - coords[1]  }px`;
            nodeCover.style.left = `${coords[0]  }px`;
            nodeCover.style.top = `${coords[1]  }px`;
            nodeCover.style.textAlign = "center";
            nodeCover.style.lineHeight = `${(coords[3] - coords[1]) * 2 - 20  }px`;
            nodeCover.setAttribute("attrDataLeft", coords[0]);
            document.getElementById("flowMapWrapper").append(nodeCover);

            // 生成气泡的内容
            const tipWrapper = document.createElement("div");
            tipWrapper.style.position = "absolute";
            tipWrapper.style.visibility = "hidden";
            tipWrapper.setAttribute("attrDataLeft", coords[0]);
            tipWrapper.setAttribute("id", node.activityKey);
            // 遍历任务数据，将审批人信息、时间、审批状态以及意见生成元素并放入气泡中显示
            if (node.tasks.length === 0) {
              const taskEl = document.createElement("div");
              taskEl.className = "node-cover-tip__item";
              const activityNameEl = document.createElement("div");
              activityNameEl.innerText = `节点名称：${  node.activityName}`;
              taskEl.append(activityNameEl);
              tipWrapper.prepend(taskEl);
            } else {
              node.tasks.forEach(task => {
                if (task.autoSkip) {
                  const taskEl = document.createElement("div");
                  taskEl.className = "node-cover-tip__item";
                  const activityNameEl = document.createElement("div");
                  activityNameEl.innerText = `节点名称：${  node.activityName}`;
                  taskEl.append(activityNameEl);
                  const timeEl = document.createElement("div");
                  timeEl.innerText = `跳过时间：${  task.endTime && dayJs(task.endTime).format("YYYY-MM-DD HH:mm:ss") || ""}`;
                  taskEl.append(timeEl);
                  tipWrapper.prepend(taskEl);
                } else {
                  const taskEl = document.createElement("div");
                  taskEl.className = "node-cover-tip__item";
                  const activityNameEl = document.createElement("div");
                  activityNameEl.innerText = `节点名称：${  node.activityName}`;
                  taskEl.append(activityNameEl);
                  const assigneeNameEl = document.createElement("div");
                  assigneeNameEl.innerText = `审批人：${  task.assigneeName}`;
                  taskEl.append(assigneeNameEl);
                  const statusEl = document.createElement("div");
                  statusEl.innerText = `审批状态：${  getActionDesc(task, task.endTime ? "发起申请" : "当前处理人")}`;
                  taskEl.append(statusEl);
                  const timeEl = document.createElement("div");
                  timeEl.innerText = `审批时间：${  task.endTime && dayJs(task.endTime).format("YYYY-MM-DD HH:mm:ss") || ""}`;
                  taskEl.append(timeEl);
                  const commentEl = document.createElement("div");
                  commentEl.innerText = `审批意见：${  task.opinion || !task.operation && task.endTime && "发起流程" || ""}`;
                  taskEl.append(commentEl);
                  tipWrapper.prepend(taskEl);
                }
              });
            }
            flowMapWrapper.append(tipWrapper);

            // 获取气泡高度，便于计算气泡与顶部的距离
            const isNotArrive = node.tasks.length === 0; // 是未达节点
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const height = +getComputedStyle(tipWrapper, false).height.slice(0, -2) + (isNotArrive ? 28 : 0);
            const top = coords[1] - height + 3;
            let className = "node-cover-tip";
            const left = coords[0] - 62;
            const leftCom = (flowMapWrapper.offsetWidth - 226 - 62);
            // 上下右侧放不下时将气泡放左侧
            if (left > leftCom) {
              tipWrapper.style.left = `${coords[0] - 226 - 15 + (isNotArrive ? 6 : 0)  }px`;
              tipWrapper.style.top = `${isNotArrive ? (+coords[3] + +coords[1]) / 2 - 15 : coords[1]  }px`;
              className += " node-cover-tip--right";
            } else {
              tipWrapper.style.left = `${left  }px`;
              className += " node-cover-tip";

              // 如果顶部距离不够展示，将气泡放在下方显示
              if (top < -2) {
                tipWrapper.style.top = `${15 + +coords[3]  }px`;
                className += " node-cover-tip--long";
              } else {
                tipWrapper.style.top = `${top  }px`;
              }
            }
            if (isNotArrive) {
              className += " not-arrived";
            }
            tipWrapper.className = className;

            // 节点位置与气泡之间没有层级关系，无法使用hover伪类实现气泡隐藏显示
            nodeCovers.push({
              nodeCover,
              tipWrapper
            });
            // 点击节点隐藏气泡信息
            nodeCover.onclick = () => {
              nodeCovers.find(v => v.nodeCover === nodeCover).tipWrapper.style.visibility = "hidden";
            };
            // 鼠标移入节点位置切换气泡
            nodeCover.onmouseenter = () => {
              tipWrapper.style.visibility = "visible";
              nodeCovers.forEach(v => {
                if (nodeCover !== v) {
                  v.nodeCover.setAttribute("popover-show", "0");
                  v.tipWrapper.style.visibility = "hidden";
                }
              });
              nodeCover.setAttribute("popover-show", "1");
              tipWrapper.style.visibility = "visible";
            };
          }
        });
    }
  },
  render() {
    return (
      <div id="flowMapWrapper" class="audit-map-container" style="position:relative">
        <img
          ref="real"
          src={this.dataSource}
          style="opacity: 0;position: absolute;"
          alt="审批地图"
          onload={() => this.handleImgLoad('real')}
        />
        <img
          ref="now"
          src={this.dataSource}
          style="max-width: 100%"
          alt="审批地图"
          onLoad={() => this.handleImgLoad('now')}
        />
      </div>
    )
  }
})