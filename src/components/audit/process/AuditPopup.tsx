import Vue from "vue";
import AuditPanel from "@/components/audit/process/auditComp/AuditPanel";
import AuditMapPanel from "@/components/audit/process/auditComp/AuditMapPanel";
import AuditFlowPanel from "@/components/audit/process/auditComp/AuditFlowPanel";
import "./styles/AuditPopupStyle.less";
import {
  diagram,
  commentList
} from "@/components/audit/process/api/audit";
import { actionApi } from "@/components/audit/process/auditSave/ActionApi";
import ActionType from "@/components/audit/process/auditSave/ActionType";
import { postAction } from "@/api/common/manage";
import { differentTypeRequire } from "@/components/audit/process/constant/rules";

export default Vue.extend({
  name: "AuditPopup",
  components: {
    AuditPanel,
    AuditMapPanel,
    AuditFlowPanel
  },
  inject: ["auditContext"],
  props: {
    dataSource: {
      type: Object,
      required: true
    },
    businessType: {
      type: String,
      required: true
    },
    isView: {
      type: Boolean,
      default: true
    },
    successCallback: {
      type: Function,
      default: () => ({})
    },
    errorCallback: {
      type: Function,
      default: () => ({})
    },
    // url which was used to get the documentList
    prepareUrl: {
      type: String,
      default: ""
    },
    // url which was used to sign the document
    signUrl: {
      type: String,
      default: ""
    },
    outsideAuditModel: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      showModal: false,
      needSignature: false, // variable which determines whether to open the signature process
      visible: false,
      loading: false,
      info: {},
      diagram: "",
      commentList: [],
      signatureVisible: false,
      // files' Ids' list
      fileIdList: [],
      // files' list
      fileList: [],
      signed: false,
      btnloading: false,
      tabIndex: "1" // 当前tab
    };
  },
  computed: {
    /**
         * 弹窗外部已确定操作类型
         */
    defaultAction() {
      return this.outsideAuditModel?.action;
    }
  },
  watch: {
    signed: {
      handler(val) {
        if (!val) {
          this.needSignature = false;
        }
      }
    }
  },
  mounted() {
    if (this.defaultAction && this.defaultAction === "Delegate") {
      const p = Promise.resolve();
      p.then(() => {
        this.$refs.auditInfo.setNodeType(this.defaultAction);
      });
    }
  },
  methods: {
    async initData() {
      // open
      this.visible = true;
      this.loading = true;
      // load base data
      await this.loadComment();
      await this.loadDiagram();
      // load next node info
      if (
        !this.isView &&
                (!this.defaultAction ||
                    !["Delegate", "Reject", "Terminate"].includes(this.defaultAction))
      ) {
        await this.nextNodeInfo();
      } else {
        this.$set(this.info, "selectDelegationSettings", this.dataSource.selectDelegationSettings);
        this.info.acceptActions = [];
        this.info.acceptActions.push(this.defaultAction);
      }
      if (!this.isView) {
        const { action } = this.$refs.auditInfo.auditDataReduction;
        await this.getDocs(action);
      }
      // close the loading
      this.loading = false;
    },
    signatureMoalClose() {
      this.closeModel();
    },
    openSuccess() {
      this.$refs.signModal.showFiles();
    },
    async loadDiagram() {
      this.diagram = await diagram(this.auditContext._processInstanceId);
    },
    async loadComment() {
      const list = await commentList(this.auditContext._processInstanceId);
      (list || []).forEach(item => {
        item.attachmentsArray = (item.attachments && item.attachments.split("|")) || [];
        item.up = false;
      });
      this.commentList = list.reverse() || [];
    },
    async nextNodeInfo() {
      const { data } = await actionApi(ActionType.Model, this.businessType, this.dataSource) as any;
      this.info = data;
    },
    async submit() {
      const _this = this as any;
      let interrupt = false;
      _this.loading = true;

      const { dataReturned, action } = _this.$refs.auditInfo.auditDataReduction;
      const fields = differentTypeRequire[action];
      // 不同的操作进行不同的校验
      const validateRes = fields ? await this.$refs.auditInfo.$refs.form.validate({ fields }) : await this.$refs.auditInfo.$refs.form.validate();
      if (validateRes !== true) {
        _this.$message.warning("请将必填项填写完整");
        _this.loading = false;
        return;
      }

      const _data = { ..._this.dataSource, procInstId: this.auditContext._processInstanceId };
      const data = Object.assign(_data, dataReturned);

      await this.saveData(data)
        .catch(() => {
          interrupt = true;
          this.loading = false;
        });
      // if (interrupt) return;
      // await this.getDocs(action).then((v) => {
      //   // v ? the doucument list existed : signature unneeded
      //   if (v) {
      //     interrupt = true;
      //   }
      // });
      if (interrupt) return;
      return this.submitMethod(action, _this.businessType, data);
    },
    /**
         * close the audit modal
         */
    closeModel() {
      this.visible = false;
      this.$emit("close", false);
      this.$nextTick(() => {
        this.tabIndex = "1";
      });
    },
    /**
         * part logic of top submit method
         * @param action audit action
         * @param businessType actionAip performance type
         * @param data formData
         */
    submitMethod(action, businessType, data) {
      if (!this.$refs.signModal || this.$refs.signModal.visible === false) {
        return actionApi(action, businessType, data)
          .then(() => {
            this.$message.success("提交成功", 3);
            this.successCallback();
            this.closeModel();
          })
          .catch(() => {
            this.errorCallback();
            this.closeModel();
          })
          .finally(() => {
            this.loading = false;
          });
      }
      this.loading = false;
    },
    // ------------------------------------------signature------------------------------------------
    /**
         * saveData If need signature
         * @param data saveDataEntity
         */
    async saveData(data) {
      if (this.dataSource.extendProperties.find(v => v.key === "signatureKey") && !this.signed) {
        return actionApi(ActionType.SAVEDATA, this.businessType, data);
      }
      // 没有签章key，不需要预存saveData
    },
    /**
         * prepare docs and calculate the needSignature
         * @param aciton audit action in top submit method
         */
    async getDocs(action) {
      if (this.dataSource.extendProperties.find(v => v.key === "signatureKey") && !this.signed) {
        const params = {
          businessKey: this.dataSource.bizId,
          taskId: this.dataSource.taskId,
          extendProperties: this.dataSource.extendProperties
        };
        if (this.dataSource.codeNumber || this.dataSource.codeNumber === 0) {
          const propertie = params.extendProperties?.find(item => item.key === "onlyCodeNumber");
          if (propertie) {
            propertie.value = this.dataSource.codeNumber;
          } else {
            params.extendProperties?.push({ key: "onlyCodeNumber", value: this.dataSource.codeNumber });
          }
        }
        return actionApi(ActionType.GETDOC, this.businessType, params).then(v => {
          this.fileList = v.result;
          // Pretreatment
          this.fileList = this.fileList.sort((a, b) => a.status > b.status);
          // user can not do a signature ,when fileList is an empty array or array without a single unsigned file
          if (process.env.NODE_ENV === "production" && window.location.host === "114.115.233.54:20042") {
            // 114测试环境下跳过盖章
            this.needSignature = false;
          } else if (this.fileList.length !== 0 && (typeof this.fileList.find(v => v.status === "0") !== "undefined")) {
            this.needSignature = true;
            // 找到签章key，需要进行签章，调整弹窗前置条件为true
          } else {
            this.needSignature = false;
            // 某些特殊情况，会进入这个判断分支，但返回为空数组，仍为后端设计的不期望进行签章的情况
          }
        }).then(() => {
          if (action === "completeTask" && this.needSignature && !this.signed) {
            this.signatureVisible = true;
            this.$refs.signModal.showModal();
            return 1;
          }
        });
      }
    },

    /**
         * load and decide signaturable
         * @param data saveDataEntity
         */
    async loadSignatureData(data) {
      if (this.dataSource.extendProperties.find(v => v.key === "signatureKey")) {
        actionApi(ActionType.SAVEDATA, this.businessType, data)
          .then(() => {
            // 可能进行签章状态，开始审批弹窗组件必备参数初始化
            const params = {
              businessKey: this.dataSource.bizId,
              taskId: this.dataSource.taskId,
              extendProperties: this.dataSource.extendProperties
            };
            actionApi(ActionType.GETDOC, this.businessType, params).then(v => {
              this.fileList = v.result;
              // Pretreatment
              this.fileList = this.fileList.sort((a, b) => a.status > b.status);
              // user can not do a signature ,when fileList is an empty array or array without a single unsigned file
              if (this.fileList.length !== 0 && (typeof this.fileList.find(v => v.status === "0") !== "undefined")) {
                this.needSignature = true;
                // 找到签章key，需要进行签章，调整弹窗前置条件为true
              } else {
                this.needSignature = false;
                // 某些特殊情况，会进入这个判断分支，但返回为空数组，仍为后端设计的不期望进行签章的情况
              }
            });
          });
      }
    },
    /**
         * get the document list
         * api: prepareSignDocs
         * @param params {businessKey,taskId,extendProperties}
         */
    getDocList(params) {
      return postAction(this.prepareUrl, params)
        .then(res => res.data);
    },
    /**
         * callBack function of signatureModal close
         @param val 完成签章后退出标识
         */
    closeSignatureModal(val) {
      if (val) {
        this.signed = true;
      }
      // close the signature modal
      this.signatureVisible = false;
      // record the signature status
      this.needSignature = false;
      // finishing the loading status
      this.loading = false;
    },
    /**
         * complete
         */
    completeSign() {
      this.signed = true;
      this.submit();
    }
  },
  render() {
    const AuditContent = (
      <t-tabs value={this.tabIndex} onChange={val => { this.tabIndex = val; }}>
        <t-tab-panel value="1" label="审批" destroyOnHide={false}>
          <AuditPanel ref={"auditInfo"} dataSource={this.info}/>
        </t-tab-panel>
        <t-tab-panel style={"display: flex"} value="2" label="审批信息">
          <AuditFlowPanel style={"flex: 2"} dataSource={this.commentList} />
          <AuditMapPanel style={"flex: 3"} procInstId={this.dataSource?.procInstId} dataSource={this.diagram} />
        </t-tab-panel>
      </t-tabs>
    );
    const ViewContent = (
      <t-tabs value={this.tabIndex} onChange={val => { this.tabIndex = val; }}>
        <t-tab-panel style={"display: flex"} value="1" label="审批信息">
          <AuditFlowPanel style={"flex: 2"} dataSource={this.commentList} />
          <AuditMapPanel style={"flex: 3"} procInstId={this.dataSource?.procInstId} dataSource={this.diagram} />
        </t-tab-panel>
      </t-tabs>
    );
    return (
      <t-dialog
        width={"70%"}
        placement={"center"}
        visible={this.visible}
        onClose={this.closeModel}
        onConfirm={this.submit}
        footer={!this.isView}
      >
        <t-loading loading={this.loading}>
          <div style={"min-height: 600px"}>
            { this.isView ? ViewContent : AuditContent }
          </div>
        </t-loading>
      </t-dialog>
    );
  }
});