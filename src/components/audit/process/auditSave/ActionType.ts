// 获取启动流程审批页面信息
const START = "startAuditPageModel";
// 提交流程
const SUBMIT = "submitProcess";
// 审批通过
const COMPLETE = "completeTask";
// 审批退回
const REJECT = "rejectTask";
// 审批驳回
const TERMINATEPROCESSINSTANCE = "terminateProcessInstance";
// 获取流程任务审批页面信息
const Model = "taskAuditPageModel";
// 委派
const DELEGATE = "delegateTask";
// 归还委托任务
const RESOLVE = "resolveTask";
// 申领
const CLAIM = "claimTask";
// 保存数据
const SAVEDATA = "saveData";
// 获取签章文件列表
const GETDOC = "prepareSignDocs";
// 签章
const SIGN = "signDoc";
// 重启流程
const RESTARTSUBMIT = "restartSubmitProcess";

export default {
  START,
  SUBMIT,
  COMPLETE,
  REJECT,
  TERMINATEPROCESSINSTANCE,
  Model,
  DELEGATE,
  RESOLVE,
  CLAIM,
  SAVEDATA,
  GETDOC,
  SIGN,
  RESTARTSUBMIT
};