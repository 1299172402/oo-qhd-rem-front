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
// 水平段维护 - 获取水平井水平段信息 
export function getHorizonSection(params) {
  return request({
      url: `${baseUrl}/modelConfigController/getHorizonSection`,
      method: "get",
      params,
  });
}
// 水平段维护 - 保存或更新水平井水平段信息 
export function saveOrUpdateHorizonSection(data) {
  return request({
      url: `${baseUrl}/modelConfigController/saveOrUpdateHorizonSection`,
      method: "put",
      data,
  });
}
// 压力维护 - 获取单井压力信息信息 
export function getSinglePress(params) {
  return request({
      url: `${baseUrl}/modelConfigController/getSinglePress`,
      method: "get",
      params,
  });
}
// 压力维护 - 保存或更新单井压力信息信息 
export function saveOrUpdateSinglePress(data) {
  return request({
      url: `${baseUrl}/modelConfigController/saveOrUpdateSinglePress`,
      method: "put",
      data,
  });
}