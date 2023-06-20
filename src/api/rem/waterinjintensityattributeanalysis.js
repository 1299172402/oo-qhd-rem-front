import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryWaterInjIntensityAttributeAnalysis({ assetCode, date, evalResult, evalTypeId, ogfId, operationZone, wellId } = {}) {
  return request({
    url: `${baseUrl}/waterInjIntensityAttributeAnalysis/queryWaterInjIntensityAttributeAnalysis?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&evalTypeId=${ evalTypeId || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
