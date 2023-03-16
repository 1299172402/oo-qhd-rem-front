import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm02/api" : "/ipm02/api"

export function getAllWaterInjectivity(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getAllWaterInjectivity`,
    method: "post",
    data
  });
}
export function getAllWaterInjectivityCurve(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getAllWaterInjectivityCurve`,
    method: "post",
    data
  });
}
export function getDrCompletionInfo(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getDrCompletionInfo`,
    method: "post",
    data
  });
}
export function getInjTubular(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getInjTubular`,
    method: "post",
    data
  });
}
export function getLayerInfo(wellId) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getLayerInfo?wellId=${ wellId}`,
    method: "get",
  });
}
export function getSingleWellStaticFoundation(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getSingleWellStaticFoundation`,
    method: "post",
    data
  });
}
export function getWaterInjectivity(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWaterInjectivity`,
    method: "post",
    data
  });
}
export function getWaterInjectivityCurve(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWaterInjectivityCurve`,
    method: "post",
    data
  });
}
export function getWellProductionInfo(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWellProductionInfo`,
    method: "post",
    data
  });
}
export function getWellWorkInfo(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWellWorkInfo`,
    method: "post",
    data
  });
}
export function getWellheadInfo(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWellheadInfo`,
    method: "post",
    data
  });
}
export function getWelltestInfo(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWelltestInfo`,
    method: "post",
    data
  });
}
export function getWotPerfInterval(data) {
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWotPerfInterval`,
    method: "post",
    data
  });
}

/**
 * hwh
 * 查询井眼轨迹信息
 * @param data
 * @returns {AxiosPromise}
 */
export function getWellTrajectory(data){
  return Axios({
    url: `${baseUrl}/injectSingleWellIpm/getWellTrajectory`,
    method: "post",
    data
  })
}
