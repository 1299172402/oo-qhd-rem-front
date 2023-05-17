import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation({ date, dateComp, ogfId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/getYieldFluctuation?date=${ date || "" }&dateComp=${ dateComp || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function productionMetricsOverview({ date } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/productionMetricsOverview?date=${ date || "" }`,
    method: "get",
  });
}
export function queryMeasureEffectTrack({ evaluationDate, oilFieldId, platformId, showNormal, timeGranularityCode, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryMeasureEffectTrack?evaluationDate=${ evaluationDate || "" }&oilFieldId=${ oilFieldId || "" }&platformId=${ platformId || "" }&showNormal=${ showNormal || "" }&timeGranularityCode=${ timeGranularityCode || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryProblemWellStatis({ date, platformId, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryProblemWellStatis?date=${ date || "" }&platformId=${ platformId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryYieldTracking({ ogfId, orgId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryYieldTracking?ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
    method: "get",
  });
}
