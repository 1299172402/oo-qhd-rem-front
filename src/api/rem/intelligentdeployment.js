import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function chopSection(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/chopSection`,
    method: "post",
    data
  });
}
export function dividingCoefficient(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/dividingCoefficient`,
    method: "post",
    data
  });
}
export function dividingCoefficientSave(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/dividingCoefficientSave`,
    method: "post",
    data
  });
}
export function downLoadUnicomModeloperationDto(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/downLoadUnicomModeloperationDto`,
    method: "post",
    data
  });
}
export function exportChopSection(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/exportChopSection`,
    method: "post",
    data
  });
}
export function exportDividingCoefficient(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/exportDividingCoefficient`,
    method: "post",
    data
  });
}
export function exportProductionSplit(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/exportProductionSplit`,
    method: "post",
    data
  });
}
export function getListOgf() {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/getAllOgf`,
    method: "get",
  });
}
export function getWellListByBlockId(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/getWellData`,
    method: "post",
    data
  });
}
export function getBlockList(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/getblockData`,
    method: "post",
    data
  });
}
export function productionSplit(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/productionAplit`,
    method: "post",
    data
  });
}
export function calculateUpdate({ groupParamDTO } = {}) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/calculateUpdate`,
    method: "get",
          data: groupParamDTO,
  });
}
export function calculateUpdate(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/calculateUpdate`,
    method: "post",
    data
  });
}
export function calculateUpdate({ groupParamDTO } = {}) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/calculateUpdate`,
    method: "delete",
          data: groupParamDTO,
  });
}
export function calculateUpdate({ groupParamDTO } = {}) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/calculateUpdate`,
    method: "put",
          data: groupParamDTO,
  });
}
export function selectWellGroup({ blockId, dateTime, ogfId } = {}) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/selectWellGroup?blockId=${ blockId || "" }&dateTime=${ dateTime || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function unicomModelOperation(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/unicomModelOperation`,
    method: "post",
    data
  });
}
export function waterWellAndLayerData({ blockId } = {}) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/waterWellAndLayerData?blockId=${ blockId || "" }`,
    method: "get",
  });
}
export function wellGroupParamConfiguration(data) {
  return request({
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/wellGroupParamConfiguration`,
    method: "post",
    data
  });
}
