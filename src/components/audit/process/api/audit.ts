import { getAction, postAction } from "@/api/common/manage";

/**
 * 根据taskId查询审批信息
 * @param taskId
 * @returns {*}
 */
export function auditPageInfo(taskId): Promise<any> {
  return getAction(`/system/flow/task/${taskId}/audit-page-info`);
}
/**
 * 根据流程id查询流程图
 * @param {*} processId 流程id
 */
export function diagram(processId) {
  return getAction(`/system/flow/instance/${processId}/diagram`, null, { responseType: "blob" })
    .then(v => URL.createObjectURL(v as any));
}
/**
 * 根据流程id查询流程图详细信息
 * @param {*} processId 流程id
 */
export function diagramDetail(processId) {
  return getAction(`/system/flow/instance/${processId}/diagram-popover`)
    .then(v => (v as any).activities);
}
/**
 * 根据流程id查询流程图
 * @param {*} procInstId 流程id
 */
export function commentList(procInstId) {
  return getAction("/system/flow/task/comment/list", {
    procInstId
  }).then(v => (v as any).data.data);
}
/**
 * 申领
 * @param {*} taskId 任务id
 */
export function claim(taskId, data = {
  "assigneeGroups": [],
  "sendNotify": true
}) {
  return postAction(`/system/flow/task/${taskId}/claim`, data)
    .then(v => (v as any).result);
}
/**
 * 撤销申领
 * @param {*} taskId 任务id
 */
export function unclaim(taskId) {
  return postAction(`/system/flow/task/${taskId}/unclaim`)
    .then(v => (v as any).result);
}