import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function oilWellFluidQuery({ assetCode, date, evalResult, ogfId, operationZone, pageNum, pageSize, wellId } = {}) {
  return request({
    url: `${baseUrl}/oilWellFluid/oilWellFluidQuery?assetCode=${ assetCode || "" }&date=${ date || "" }&evalResult=${ evalResult || "" }&ogfId=${ ogfId || "" }&operationZone=${ operationZone || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
