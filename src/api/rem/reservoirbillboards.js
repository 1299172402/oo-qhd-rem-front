import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation({ date, dateComp, ogfId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/getYieldFluctuation?date=${ date || "" }&dateComp=${ dateComp || "" }&ogfId=${ ogfId || "" }`,
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
export function queryMeasureEffectTrack({ evaluationDate, oilFieldId, platformId, showNormal, timeGranularityCode } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryMeasureEffectTrack?evaluationDate=${ evaluationDate || "" }&oilFieldId=${ oilFieldId || "" }&platformId=${ platformId || "" }&showNormal=${ showNormal || "" }&timeGranularityCode=${ timeGranularityCode || "" }`,
    method: "get",
  });
}
export function queryOilFieldIncident({ chronicleTypeCode, endTime, startTime, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncident?chronicleTypeCode=${ chronicleTypeCode || "" }&endTime=${ endTime || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryOilFieldIncidentType() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncidentType`,
    method: "get",
  });
}
export function queryProblemWellStatis({ date, platformId, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryProblemWellStatis?date=${ date || "" }&platformId=${ platformId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryShutDownWellStatisCharts({ endTime, startTime } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisCharts?endTime=${ endTime || "" }&startTime=${ startTime || "" }`,
    method: "get",
  });
}
export function queryShutDownWellStatisDetails({ endTime, injShutdownTypeCode, pageNum, pageSize, shutdownPlanTypeCode, startTime, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisDetails?endTime=${ endTime || "" }&injShutdownTypeCode=${ injShutdownTypeCode || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&shutdownPlanTypeCode=${ shutdownPlanTypeCode || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryYieldTracking({ ogfId, orgId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryYieldTracking?ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
    method: "get",
  });
}
