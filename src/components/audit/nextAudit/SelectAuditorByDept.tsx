import Vue from "vue";
import { queryAuditorDeptTree, queryUserBydept } from "./api/api";
import SelectAuditorByDepModalForAudit from "./SelectAuditorByDepModalForAudit";


/**
   * 业务逻辑策略模式
   * @type {{auditNeedDefault(): (Promise<void>|undefined)}}
   */
const stragegyMap = {
  auditNeedDefault() {
    const setDefault = () => {
      if (this.handMeDown?.actId === this.queryParams?.actId) {
        const { auditUserSearchCallBackData, dataScope, applyScope, relativePerson, resourceId } = this.queryParams;
        const params = {
          startDeptId: auditUserSearchCallBackData,
          dataScope,
          applyScope,
          relativePerson,
          unlimit: false
        };
        return queryAuditorDeptTree(params)
          .then((res) => {
            if (res.success && res.result?.length > 0) {
              const item = res.result[0];
              return { orgCode: item.orgCode, id: [item.id].toString() };
            } 
            return [];
              
          }).then(selectedRow => {
            const { orgCode, id } = selectedRow;
            const queryUserByDeptParams = {
              id,
              roleCode: resourceId,
              orgCode,
              pageNo: 1,
              pageSize: 10
            }
            queryUserBydept(queryUserByDeptParams)
              .then((result) => {
                if (result.success) {
                  const { records } = result.result;
                  if (records && records.length > 0) {
                    this.selectOK(records, records[0].userId)
                  }
                  return records;
                }
              })
          })
      }
    };
    if (this.queryParams.actId) {
      setDefault();
    } else {
      const unWatch = this.$watch("queryParams", (newVal: { actId?: string} = {}) => {
        if (newVal.actId) {
          setDefault();
          unWatch();
        }
      })
    }
  }
};

export default Vue.extend({
  name: "SelectAuditorByDept",
  components: {SelectAuditorByDepModalForAudit},
  inject: {
    // 用于接收父组件的属性
    handMeDown: {
      from: "handMeDown",
      default: () => ({})
    }
  },
  props: {
    modalWidth: {
      type: Number,
      default: 1250,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    multi: {
      type: Boolean,
      default: true,
      required: false
    },
    queryParams: {
      type: Object,
      default: () => ({})
    },
    selectUsers: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      visible: false,
      userIds: "",
      userNames: "",
      userInfos: []
    }
  },
  mounted() {
    this.userIds = this.value;
    if (this.handMeDown?.field) stragegyMap[this.handMeDown?.field].apply(this); // 默认选择下一节点审批人逻辑
  },
  watch: {
    value(val) {
      this.userIds = val
    },
    visible: {
      handler() {
        if (this.visible === true) {
          this.onSearchDepUser();
        }
      },
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    initComp(userNames) {
      this.userNames = userNames
    },
    onSearchDepUser() {
      // 传值进入选择组件
      // 选择组件可见
      this.$nextTick(() => {
        this.$refs.selectModal.showModal(this.queryParams);
      });
    },
    buttonOpen() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.selectModal.showModal(this.queryParams);
      });
    },
    /**
     * visibleChange
     */
    visibleChange() {
      this.visible = false;
      this.$emit("close");
    },
    selectOK(rows, idstr, needClose = true) {
      if (!rows) {
        this.userNames = ''
        this.userIds = ''
      } else {
        let temp = ''
        rows.forEach(item => {
          temp += `,${  item.realname}`
          if (!this.userInfos.find(v => v.userId === item.userId)) {
            this.userInfos.push(item)
          }
        });
        this.userNames = temp.substring(1)
        this.userIds = idstr
      }
      this.$emit("change", rows, this.queryParams.actId, idstr)
      if (needClose) {
        this.visible = false;
      }
    },
    /**
     * 删掉人员
     */
    handleChange() {
      this.selectOK([], "", false)
    }
  },
  render() {
    return (
      <div>
        <t-popup 
          on-visible-change={(val) => {this.visible = val}} 
          content={() =>
            <SelectAuditorByDepModalForAudit
              {...this.$attrs}
              ref="selectModal"
              modalWidth={this.modalWidth}
              multi={this.multi}
              onClose={this.visibleChange}
              selectOk={this.selectOK}
              user-id={this.value}
              onInitComp={this.initComp}
              style="width: 440px"
            />
          }>
          <t-select
            value={this.selectUsers || undefined}
            mode="multiple"
            notFoundContent={false}
            showArrow={true}
            filterOption={false}
            placeholde={this.$attrs.placeholder}
            onChange={this.handleChange}
            popupVisible={false}
            clearable={true}
          >
          </t-select>
        </t-popup>
      </div>
    )
  }
})