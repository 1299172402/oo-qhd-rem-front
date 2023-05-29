import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"

export function getMeasureOptimumParams(data) {
  return Axios({
    url: `${baseUrl}/insight/getMeasureOptimumParams`,
    method: "post",
    data
  });
}
export function getConstructionParam(data) {
  return Axios({
    url: `${baseUrl}/insight/getConstructionParam`,
    method: "post",
    data
  });
}
export function getOilAdaptability(data) {
  return Axios({
    url: `${baseUrl}/insight/getOilAdaptability`,
    method: "post",
    data
  });
}
export function getOilMeasureCount(data) {
  return Axios({
    url: `${baseUrl}/insight/getOilMeasureCount`,
    method: "post",
    data
  });
}
export function getOilMeasuresEffect(data) {
  return Axios({
    url: `${baseUrl}/insight/getOilMeasuresEffect`,
    method: "post",
    data
  });
}
export function getSelectWellParam(data) {
  return Axios({
    url: `${baseUrl}/insight/getSelectWellParam`,
    method: "post",
    data
  });
}
export function getWaterAdaptability(data) {
  return Axios({
    url: `${baseUrl}/insight/getWaterAdaptability`,
    method: "post",
    data
  });
}
export function getWaterMeasureCount(data) {
  return Axios({
    url: `${baseUrl}/insight/getWaterMeasureCount`,
    method: "post",
    data
  });
}
export function getWaterMeasuresEffect(data) {
  return Axios({
    url: `${baseUrl}/insight/getWaterMeasuresEffect`,
    method: "post",
    data
  });
}
export function getWaterRanking(data,typeCode,date) {
  return Axios({
    url: `${baseUrl}/insight/getWaterRanking?ogfId=${data}&typeCode=${typeCode}&date=${date}`,
    method: "get",
  });
}

