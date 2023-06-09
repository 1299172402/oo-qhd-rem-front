import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation() {
  return request({
    url: `${baseUrl}/reservoirBillboards/getYieldFluctuation`,
    method: "get",
  });
}
export function monthlyProductionComparison({ date } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/monthlyProductionComparison?date=${ date || "" }`,
    method: "get",
  });
}
export function productionMetricsOverview({ date } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/productionMetricsOverview?date=${ date || "" }`,
    method: "get",
  });
}
export function queryCapacityComposition() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryCapacityComposition`,
    method: "get",
  });
}
export function queryMeasureEffectTrack({ evaluationDate, oilFieldId, platformId, showNormal, timeGranularityCode } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryMeasureEffectTrack?evaluationDate=${ evaluationDate || "" }&oilFieldId=${ oilFieldId || "" }&platformId=${ platformId || "" }&showNormal=${ showNormal || "" }&timeGranularityCode=${ timeGranularityCode || "" }`,
    method: "get",
  });
}
export function queryOilFieldIncident({ chronicleTypeCode, endTime, ogfId, platformId, startTime, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncident?chronicleTypeCode=${ chronicleTypeCode || "" }&endTime=${ endTime || "" }&ogfId=${ ogfId || "" }&platformId=${ platformId || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryOilFieldIncidentType() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncidentType`,
    method: "get",
  });
}
export function queryPlanValueDict() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryPlanValueDict`,
    method: "get",
  });
}
export function queryProblemWellStatis({ date, platformId, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryProblemWellStatis?date=${ date || "" }&platformId=${ platformId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryShutDownValueDict() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownValueDict`,
    method: "get",
  });
}
export function queryShutDownWellStatisCharts({ endTime, startTime } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisCharts?endTime=${ endTime || "" }&startTime=${ startTime || "" }`,
    method: "get",
  });
}
export function queryShutDownWellStatisDetails({ endTime, injShutdownTypeCode, ogfId, pageNum, pageSize, platformId, shutdownPlanTypeCode, startTime, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisDetails?endTime=${ endTime || "" }&injShutdownTypeCode=${ injShutdownTypeCode || "" }&ogfId=${ ogfId || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&platformId=${ platformId || "" }&shutdownPlanTypeCode=${ shutdownPlanTypeCode || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryYieldTracking({ ogfId, orgId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryYieldTracking?ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
    method: "get",
  });
}
