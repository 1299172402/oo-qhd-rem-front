import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function delectByWellGroupId({ wellGroupId } = {}) {
  return request({
    url: `${baseUrl}/wellGroupInforMaintenance/wellConnectivityEval/delectByWellGroupId?wellGroupId=${ wellGroupId || "" }`,
    method: "get",
  });
}
export function saveAllWellGroup(data) {
  return request({
    url: `${baseUrl}/wellGroupInforMaintenance/wellConnectivityEval/saveAllWellGroup`,
    method: "post",
    data
  });
}
export function wellGroupList(data) {
  return request({
    url: `${baseUrl}/wellGroupInforMaintenance/wellConnectivityEval/wellGroupList`,
    method: "post",
    data
  });
}
export function wellGroupParamConfiguration(data) {
  return request({
    url: `${baseUrl}/wellGroupInforMaintenance/wellConnectivityEval/wellGroupParamConfiguration`,
    method: "post",
    data
  });
}
export function wellGroupParamConfigurationList(data) {
  return request({
    url: `${baseUrl}/wellGroupInforMaintenance/wellConnectivityEval/wellGroupParamConfigurationList`,
    method: "post",
    data
  });
}
