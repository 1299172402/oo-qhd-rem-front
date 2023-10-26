import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function analyzeOilWellFluidAttributionQuery({ assetCode, date, evalResult, ogfId, operationZone, pageNum, pageSize, wellId } = {}) {
  return request({
    url: `${baseUrl}/wellMonthlyAnalysis/analyzeOilWellFluidAttributionQuery?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
