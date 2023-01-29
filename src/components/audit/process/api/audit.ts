import { getAction, postAction } from "./manage";
import { AuditPageInfo } from "@/components/audit/types";

/**
 * 根据taskId查询审批信息
 * @param taskId
 * @returns {*}
 */
export function auditPageInfo(taskId): Promise<AuditPageInfo> {
  return getAction(`/flow/task/${taskId}/audit-page-info`);
}
/**
 * 根据流程id查询流程图
 * @param {*} processId 流程id
 */
export function diagram(processId) {
  return getAction(`/flow/instance/${processId}/diagram`, null, { responseType: "blob" })
    .then(v => URL.createObjectURL(v));
}
/**
 * 根据流程id查询流程图详细信息
 * @param {*} processId 流程id
 */
export function diagramDetail(processId) {
  return getAction(`/flow/instance/${processId}/diagram-popover`)
    .then(v => v.activities);
}
/**
 * 根据流程id查询流程图
 * @param {*} procInstId 流程id
 */
export function commentList(procInstId) {
  return getAction("/flow/task/comment/list", {
    procInstId
  }).then(v => v.result);
}
/**
 * 申领
 * @param {*} taskId 任务id
 */
export function claim(taskId, data = {
  "assigneeGroups": [],
  "sendNotify": true
}) {
  return postAction(`/flow/task/${taskId}/claim`, data)
    .then(v => v.result);
}
/**
 * 撤销申领
 * @param {*} taskId 任务id
 */
export function unclaim(taskId) {
  return postAction(`/flow/task/${taskId}/unclaim`)
    .then(v => v.result);
}