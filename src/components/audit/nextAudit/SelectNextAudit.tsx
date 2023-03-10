import Vue from "vue";
import { cloneDeep } from "lodash";
import "./style/SelectNextAuditStyle.less";
import SelectAuditorByDept from "./SelectAuditorByDept";

interface DataReturned {
    nextAuditInfos?: [{ actId: any; users: any[]; }],
    delegateInfo?: {[k: string]: any},
    nextActId?: string,
}

const prefixCls = "select-next-audit"
export default Vue.extend({
  name: "SelectNextAudit",
  components: {
    SelectAuditorByDept
  },
  props: {
    nodeType: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    dataSource: {
      type: Object,
      required: true
    },
    watchValue: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      nextAuditInfo: {
        actId: "",
        actName: "",
        assignResources: [],
        selectNextAuditSetting: {}
      },
      auditIdString: "",
      selectAuditUser: {
        userId: "",
        realname: ""
      },
      // 保存并行节点时的下一节点们的保存数据
      parallelNodeModel: null
    };
  },
  computed: {
    assignMode() {
      if (this.nextAuditInfo.assignResources !== null) {
        this.setDefaultUserIfOnlyOne(this.nextAuditInfo.assignResources);
        return "DefaultNextAudit";
      } if (this.nextAuditInfo.actId !== "end" && this.nextAuditInfo.selectNextAuditSetting !== null) {
        return "AssignNextAudit";
      } 
      return "None";
            
    },
    selectNextAuditSetting() {
      return this.dataSource.nextActivities.find(i => i.actId === this.nextAuditInfo.actId)?.selectNextAuditSetting;
    },
    nextActivities() {
      let res = this.dataSource.nextActivities || [];
      const acceptActions = this.dataSource.acceptActions || [];
      if (acceptActions.includes("Reject")) {
        const arr = this.dataSource.preActivities || [];
        res = (this.dataSource.nextActivities || []).concat(arr); // 如果是选择节点, 需要合并历史节点的数组
      }
      return res;
    },
    /**
         * 是否需要选择下一节点审批人
         */
    isSelectNode() {
      return this.dataSource.preActivities && this.dataSource.preActivities.find(x => x.actId === this.nextAuditInfo.actId);
    },
    /**
         * 如果是并行节点
         * 有多个下一节点并且 actions 中没有 SelectNextAct 时是并行节点
         * 是并行节点则需要选择多个节点的审批人
         */
    isParallelNode() {
      if (!this.dataSource) {
        return false;
      }
      const re = this.dataSource.nextActivities?.length > 1 && !this.dataSource.acceptActions.includes("SelectNextAct");
      if (re) {
        // 根据并行节点数据，给设置绑定的数据对象
        this.setParallelNodeModel(this.dataSource.nextActivities);
      }
      this.$emit("parallel-node", re);
      return re;
    }
  },
  watch: {
    nodeType() {
      this.clearData();
    },
    /**
         * 下一节点数据变化时触发
         */
    nextActivities: {
      handler() {
        this.setActId();
      },
      immediate: true,
      deep: true
    },
    /**
         * 告诉父组件
         */
    assignMode: {
      handler(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.watchValue.assignMode = val;
      },
      immediate: true
    }
  },
  mounted() {
    this.clearData();
  },
  methods: {
    selectNextAct(actId) {
      this.nextAuditInfo = cloneDeep(this.nextActivities.find(item => item.actId === actId));
      this.selectAuditUser = {};
      this.$emit("selectAuditorOk", { nextActId: this.nextAuditInfo.actId });
    },
    selectAuditorOk(userArray, actId, idstr) {
      if (userArray.length === 0) {
        // shutdown the process
        this.selectAuditUser = { userId: "", realname: "" };
        this.selectAuditUser.userRealName = "";
        this.auditIdString = "";
        this.auditorDataReduction();
      } else {
        const [first] = userArray;
        this.selectAuditUser = {
          ...first,
          userId: first.userName,
          userRealName: first.nickName
        }
        this.auditIdString = idstr;
        this.auditorDataReduction();
      }
    },
    assignAuditorOk(key, resources = []) {
      const Auditor = cloneDeep(resources?.find(item => item.id === key));
      Auditor.userRealName = Auditor.name;
      Auditor.userId = Auditor.id;
      this.selectAuditUser = Auditor;
      this.auditorDataReduction();
    },
    auditorDataReduction() {
      const dataReturned: DataReturned = {};
      const id = this.selectAuditUser && this.selectAuditUser.userId;
      if (!id) {
        this.$emit("selectAuditorOk", dataReturned);
        return;
      }
      if (this.nodeType === "default") {
        dataReturned.nextAuditInfos = [{
          actId: this.nextAuditInfo.actId,
          users: [this.selectAuditUser]
        }];
      } else {
        dataReturned.delegateInfo = {
          delegateUser: this.selectAuditUser
        };
      }
      dataReturned.nextActId = this.nextAuditInfo.actId;
      this.$emit("selectAuditorOk", dataReturned);
    },
    clearData() {
      this.nextAuditInfo = {
        actId: "",
        actName: "",
        assignResources: []
      };
      this.auditIdString = "";
      this.selectAuditUser = {
        realname: ""
      };
      if (this.nextActivities[0]) {
        this.nextAuditInfo = cloneDeep(this.nextActivities[0]);
        this.$emit("selectAuditorOk", { nextActId: this.nextAuditInfo.actId });
      }
    },
    /**
         * 如果下节点活动数据大于0个，默认赋值第一个
         */
    setActId() {
      if (this.nextActivities.length > 0 && !this.isParallelNode) {
        this.nextAuditInfo.actId = this.nextActivities[0].actId;
        this.selectNextAct(this.nextAuditInfo.actId);
      }
    },
    /**
         * control the shown status of popover
         */
    showPopover() {
      this.visible = !this.visible;
    },
    /**
         * 下拉人员如果只有一人，则默认选中这人
         */
    setDefaultUserIfOnlyOne(val) {
      if (val?.length === 1) {
        this.selectAuditUser.userId = val[0].id;
        this.assignAuditorOk(this.selectAuditUser.userId, this.nextAuditInfo.assignResources);
      }
    },
    /**
         * 下拉筛选
         */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    /**
         * 根据并行节点数据，给设置绑定的数据对象
         * 需要跟节点的数据一一对应
         */
    setParallelNodeModel(items) {
      this.parallelNodeModel = items.map(v => {
        let users = {};
        if (v.assignResources?.length === 1) {
          users = {
            email: v.assignResources[0].recipient,
            phone: v.assignResources[0].phone,
            userId: v.assignResources[0].id,
            userRealName: v.assignResources[0].name
          };
        }
        return {
          actId: v.actId,
          // 暂时只考虑只会选择一个人的情况
          users
        };
      });
    },
    /**
         * 将页面上的数据转为要保存的数据结构
         */
    getParallelNodeModel() {
      return this.isParallelNode ? this.parallelNodeModel.map(v => ({
        ...v,
        users: v.users.userId ? [v.users] : []
      })) : null;
    },
    /**
         * 并行节点如果是下拉选人，需要将人的数据结构稍作转换
         */
    handleParallelNodeUserChange(val, index) {
      const item = val || {};
      this.parallelNodeModel[index].users = {
        email: item.recipient,
        phone: item.phone,
        userId: item.id,
        userRealName: item.name
      };
      this.emitParallelNodeselectAuditorOk();
    },
    /**
         * 并行节点弹窗选人确定后
         */
    handleParallelNodeModelSelectAuditorOk(vals, index) {
      const item = vals[0] || {}; this.parallelNodeModel[index].users = {
        email: item.email,
        phone: item.phone,
        userId: item.userName,
        userRealName: item.nickName
      };
      this.emitParallelNodeselectAuditorOk();
    },
    /**
         * 并行节点将数据抛出
         */
    emitParallelNodeselectAuditorOk() {
      const dataReturned: DataReturned = {};
      // 如果是并行节点 nodeType 应该只有 default
      dataReturned.nextAuditInfos = this.getParallelNodeModel();
      dataReturned.nextActId = "";
      this.$emit("selectAuditorOk", dataReturned);
    }
  },

  render() {
    const createSelectAuditEl = (node, index) => {
      if(node.assignResources) {
        return (
          <t-select
            placeholder="请选择审批人"
            onChange={(e) => this.handleParallelNodeUserChange(e, index)}
          >
            {
              this.node.assignResources.map(item => (
                <t-option
                  key={item.id}
                  value={item.id}
                  label={item.name}
                >
                </t-option>
              ))
            }
          </t-select>
        )
      }
      if (node.selectNextAuditSetting) {
        return (
          <SelectAuditorByDept
            placeholder="请选择审批人"
            value={this.parallelNodeModel[index].user.userId}
            text-prop="name"
            value-prop="id"
            options={node.assignResources}
            muti={false}
            onChange={(e) => {this.handleParallelNodeModelSelectAuditorOk(e, index)}}
          ></SelectAuditorByDept>
        )
      } 
      return null
    }

    return <div class={`${prefixCls}-container`}>
      {
        this.isParallelNode && this.parallelNodeModel ? 
          (
            <div class={`${prefixCls}-parallel-node-container`}>
              {
                this.dataSource.nextActivities.map((node, index) => (
                  <div key={node.actId} class={`${prefixCls}-parallel-node__item`}>
                    <div class={`${prefixCls}-parallel-node__item-name text-overflow-hidden`} title={node.actName}>
                      {node.actName}
                    </div>
                    <div class={[`${prefixCls}-parallel-node__item-user`, {'hide-red-border': this.parallelNodeModel[index].users.userId}]}>
                      {createSelectAuditEl(node, index)}
                    </div>
                  </div>
                ))
              }
            </div>
          ) : null
      }
      <div class={`${prefixCls}--default`}>
        <t-select value={this.nextAuditInfo.actId} onChange={this.selectNextAct}>
          {
            this.nextActivities?.map(item => <t-option key={item.actId} label={item.actName} value={item.actId} />)
          }
        </t-select>
        {
          this.assignMode === "AssignNextAudit" ? <SelectAuditorByDept
            onChange={this.selectAuditorOk}
            query-params={this.selectNextAuditSetting}
            value={this.auditIdString}
            select-users={this.selectAuditUser.nickName}
            multi={false}
          /> : null
        }
        {
          this.assignMode === "DefaultNextAudit" && !this.isSelectNode ? <div>
            <t-select
              value={this.selectAuditUser.userId}
              show-search
              filterOption={this.filterOption}
              onChange={($event) => this.assignAuditorOk($event, this.nextAuditInfo.assignResources)}
            >
              {
                this.nextAuditInfo.assignResources?.map(item => <t-option key={item.id} label={item.name} value={item.id} />)
              }
            </t-select>
          </div> : null
        }
      </div>
    </div>
  }
})