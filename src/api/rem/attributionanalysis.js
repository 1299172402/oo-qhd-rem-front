import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function analyzeOilWellFluidAttributionQuery({ assetCode, date, evalResult, ogfId, operationZone, wellId } = {}) {
  return request({
    url: `${baseUrl}/attributionAnalysis/analyzeOilWellFluidAttributionQuery?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
