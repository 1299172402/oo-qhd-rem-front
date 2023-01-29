export default {
  "currentAction.key": [
    {
      required: true,
      message: "审批意见必填",
      trigger: "blur"
    }
  ],
  opinion: [{required: true, message: "审批意见必填", trigger: "blur"}],
  terminateProcessReason: [{ required: true, message: "请输入驳回意见", trigger: ["blur", "change"] }],
  nextAuditInfo: [
    { required: true, message: "请选择处理类型", trigger: ["blur", "change"] },
    {
      validator(value) {
        if (value.nextAuditInfos || value.delegateInfo) {
          return true;
        } 
        return false;
                
      },
      message: "请选择下一节点处理人"
    }
  ]
}