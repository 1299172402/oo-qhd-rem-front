import { getAction, postAction } from "../../../api/common/manage";
import { submitApi } from "@/components/audit/process/auditSave/ActionApi.ts";
import { PRODUCT_APPLY } from "@/constants/businessType.js";
import { startApi } from "@/components/audit/process/auditSave/ActionApi";

/**
 * 查询表单
 * @param {表单id} id 
 * @returns 通过id获取数据
 */
export function queryById(id) {
  return getAction(`/system/apply/${id}`);
}

/**
 * 保存表单
 * @param {表单数据} data 
 * @returns 返回内容
 */
export function save(data) {
  return postAction("/system/apply/saveOrUpdateApply", data);
} 

/**
 * 提交表单
 * @param {表单数据} data 
 * @returns 返回内容
 */
export function submit(data) {
  return submitApi(PRODUCT_APPLY, data).then(v => v.result);
}

/**
 * 删除数据
 * @param {数据id} id 
 * @returns 
 */
export function deleteById(id) {
  return postAction("/system/apply/deleteApplyById", { id })
}

/**
 * 获取流程平台信息
 * @returns 流程信息
 */
export function startProcess() {
  return startApi(PRODUCT_APPLY).then(v => v.data.data);
}

export default {};