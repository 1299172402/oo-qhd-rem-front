import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function dailyMainEvent(data) {
  return request({
    url: `${baseUrl}/outputManagement/dailyMainEvent`,
    method: "post",
    data
  });
}
export function outputTracing(data) {
  return request({
    url: `${baseUrl}/outputManagement/outputTracing`,
    method: "post",
    data
  });
}
export function outputTracingAnalysis(data) {
  return request({
    url: `${baseUrl}/outputManagement/outputTracingAnalysis`,
    method: "post",
    data
  });
}
export function platformOutputContributeAnalysis(data) {
  return request({
    url: `${baseUrl}/outputManagement/platformOutputContributeAnalysis`,
    method: "post",
    data
  });
}
export function reasonAnalysis(data) {
  return request({
    url: `${baseUrl}/outputManagement/reasonAnalysis`,
    method: "post",
    data
  });
}
export function reasonAnaylysisReport(data) {
  return request({
    url: `${baseUrl}/outputManagement/reasonAnaylysisReport`,
    method: "post",
    data
  });
}
export function wellOutputWaveAnalysis(data) {
  return request({
    url: `${baseUrl}/outputManagement/wellOutputWaveAnalysis`,
    method: "post",
    data
  });
}
