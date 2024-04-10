import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryWaterInjIntensityAttributeAnalysis({ assetCode, date, evalResult, evalTypeId, ogfId, operationZone, pageNum, pageSize, wellId } = {}) {
  return request({
    url: `${baseUrl}/waterInjIntensityAttributeAnalysis/queryWaterInjIntensityAttributeAnalysis?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&evalTypeId=${ evalTypeId || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}

export function queryWaterInjDownExcel({ assetCode, date, evalResult, evalTypeId, ogfId, operationZone, title, wellId } = {}) {
  return request({
    url: `${baseUrl}/waterInjIntensityAttributeAnalysis/queryWaterInjDownExcel?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&evalTypeId=${ evalTypeId || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&title=${ title || "" }&wellId=${ wellId || "" }`,
    method: "get",
    responseType: "blob",
  });
}
export function downloadFile({ code } = {}) {
  return request({
    url: `${baseUrl}/modelController/downloadFile?code=${ code || "" }`,
    method: "get",
    responseType: "blob",
  });
}