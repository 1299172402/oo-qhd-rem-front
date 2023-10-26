import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getPlatInfo({ ogfId } = {}) {
  return request({
    url: `${baseUrl}/baseData/getPlatInfo?ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function getWaterWellInfo({ assetCode } = {}) {
  return request({
    url: `${baseUrl}/baseData/getWaterWellInfo?assetCode=${ assetCode || "" }`,
    method: "get",
  });
}
