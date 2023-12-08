import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryProductionAnalysisList({ assetCode, date, evalResult, wellGroupName , ogfId, operationZone, pageNum, pageSize } = {}) {
  return request({
    url: `${baseUrl}/productionAnalysis/queryProductionAnalysisList?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&wellGroupName=${ wellGroupName || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }`,
    method: "get",
  });
}

export function queryProductionDownExcel({ assetCode, date, evalResult, wellGroupName, ogfId, operationZone, title } = {}) {
  return request({
    url: `${baseUrl}/productionAnalysis/queryProductionDownExcel?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&wellGroupName=${ wellGroupName || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&title=${ title || "" }`,
    method: "get",
    responseType: "blob",
  });
}
