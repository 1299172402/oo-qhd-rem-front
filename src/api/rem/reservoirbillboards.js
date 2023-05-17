import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation({ 对比时间, 对比时间前一天, 油田id } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/getYieldFluctuation?对比时间=${ 对比时间 || "" }&对比时间前一天=${ 对比时间前一天 || "" }&油田id=${ 油田id || "" }`,
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
export function queryMeasureEffectTrack({ 平台id, 时间数据粒度, 是否显示正常指标, 油田id, 评价时间 } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryMeasureEffectTrack?平台id=${ 平台id || "" }&时间数据粒度=${ 时间数据粒度 || "" }&是否显示正常指标=${ 是否显示正常指标 || "" }&油田id=${ 油田id || "" }&评价时间=${ 评价时间 || "" }`,
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
