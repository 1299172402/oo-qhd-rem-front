import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryWellControlReserves({ layerId, wellId } = {}) {
  return request({
    url: `${baseUrl}/wellControlReservesData/queryWellControlReserves?layerId=${ layerId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function addWellControlReserves(data) {
  return request({
    url: `${baseUrl}/wellControlReservesData/addWellControlReserves`,
    method: "post",
    data
  });
}
export function queryWellControlReservesWell({assetCode,ogfId } = {}) {
    return request({
        url: `${baseUrl}/wellControlReservesData/queryWellControlReservesWell?assetCode=${ assetCode || "" }&ogfId=${ ogfId || "" }`,
        method: "get",
    });
}
export function queryWellControlReservesLayer({wellId } = {}) {
    return request({
        url: `${baseUrl}/wellControlReservesData/queryWellControlReservesLayer?wellId=${ wellId || "" }`,
        method: "get",
    });
}