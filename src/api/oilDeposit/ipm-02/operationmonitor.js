import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm02/api" : "/ipm02/api"

export function getAccumulateUnqualifyDay(data) {
  return Axios({
    url: `${baseUrl}/injection/charts/getAccumulateUnqualifyDay`,
    method: "post",
    data
  });
}
export function getPassRate(data) {
  return Axios({
    url: `${baseUrl}/injection/charts/getPassRate`,
    method: "post",
    data
  });
}
export function getPassRateMonthly(data) {
  return Axios({
    url: `${baseUrl}/injection/charts/getPassRateMonthly`,
    method: "post",
    data
  });
}
export function getQualifiedRatio(data) {
  return Axios({
    url: `${baseUrl}/injection/charts/getQualifiedRatio`,
    method: "post",
    data
  });
}
export function getIntervalWorkConditionDataCurve(intervalConditionDto) {
  return Axios({
    url: `${baseUrl}/injection/getIntervalWorkConditionDataCurve`,
    method: "post",
    data: intervalConditionDto,
  });
}
export function getLayerInjectionDetail({ date, intervalType, platId } = {}) {
  return Axios({
    url: `${baseUrl}/injection/getLayerInjectionDetail?date=${date || ""}&intervalType=${intervalType || ""}&platId=${platId || ""}`,
    method: "get",
  });
}
export function getSingleUnqualifiedDetail(data) {
  return Axios({
    url: `${baseUrl}/injection/getSingleUnqualifiedDetail`,
    method: "post",
    data
  });
}
export function getUnqualifiedDetail(data) {
  return Axios({
    url: `${baseUrl}/injection/getUnqualifiedDetail`,
    method: "post",
    data
  });
}
export function getWarnDetails(data) {
  return Axios({
    url: `${baseUrl}/injection/getWarnDetails`,
    method: "post",
    data
  });
}
export function getWarnInfo(data) {
  return Axios({
    url: `${baseUrl}/injection/getWarnInfo`,
    method: "post",
    data
  });
}
export function getWarnStatusCount(data) {
  return Axios({
    url: `${baseUrl}/injection/getWarnStatusCount`,
    method: "post",
    data
  });
}
export function getWaterChartInfo({borepipeId} = {}) {
  return Axios({
    url: `${baseUrl}/injection/getWaterChartInfo?borepipeId=${borepipeId || ""}`,
    method: "get",
  });
}
export function getWaterPointDistribution(dto) {
  return Axios({
    url: `${baseUrl}/injection/getWaterPointDistribution`,
    method: "post",
    data: dto
  });
}
export function getInjWellDetectData(data) {
  return Axios({
    url: `${baseUrl}/injection/injWellDetect`,
    method: "post",
    data
  });
}
export function updateWarnStatus(dto) {
  return Axios({
    url: `${baseUrl}/injection/updateWarnStatus`,
    method: "put",
    data: dto,
  });
}
