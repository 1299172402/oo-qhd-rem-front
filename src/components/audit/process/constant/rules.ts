export default {
  "currentAction.key": [
    {
      required: true,
      message: "审批意见必填",
      trigger: "blur"
    }
  ],
  opinion: [{ required: true, message: "审批意见必填", trigger: "blur" }],
  terminateProcessReason: [{ required: true, message: "请输入驳回意见", trigger: ["blur", "change"] }],
  nextAuditInfo: [
    { required: true, message: "请选择下一节点处理人", trigger: "all" },
    {
      validator(value) {
        if (value && (value.nextAuditInfos || value.delegateInfo)) {
          return true;
        }
        return false;
      },
      trigger: "all",
      message: "请选择下一节点处理人"
    }
  ]
};
interface ActionType {
    startAuditPageModel: string[],
    // 提交流程
    submitProcess: string[],
    // 审批通过
    completeTask: string[],
    // 审批退回
    rejectTask: string[],
    // 审批驳回
    terminateProcessInstance: string[],
    // 获取流程任务审批页面信息
    taskAuditPageModel: string[],
    // 委派
    delegateTask: string[],
    // 归还委托任务
    resolveTask: string[],
    // 申领
    claimTask: string[],
    // 保存数据
    saveData: string[],
    // 获取签章文件列表
    prepareSignDocs: string[],
    // 签章
    signDoc: string[],
    // 重启流程
    restartSubmitProcess: string[]
}

export const differentTypeRequire: Partial<ActionType> = {
  terminateProcessInstance: ["currentAction.key", "terminateProcessReason", "nextAuditInfo"],
  completeTask: ["currentAction.key", "opinion", "nextAuditInfo", "nextAuditInfo.nextAuditInfos"],
  rejectTask: ["currentAction.key", "opinion"]
};