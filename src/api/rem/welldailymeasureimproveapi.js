import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function calcSingleWellMeasureStatInfos({ dailyAllocatingBase, decreaseRate, effectDays, measureSeffectDate, timeEfficieincy } = {}) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/calcSingleWellMeasureStatInfos?dailyAllocatingBase=${ dailyAllocatingBase || "" }&decreaseRate=${ decreaseRate || "" }&effectDays=${ effectDays || "" }&measureSeffectDate=${ measureSeffectDate || "" }&timeEfficieincy=${ timeEfficieincy || "" }`,
    method: "get",
  });
}
export function delAfterInsertWellDailyMeasureInfo(data) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/delAfterInsertWellDailyMeasureInfo`,
    method: "post",
    data
  });
}
export function deleteWellDailyMeasureInfoByIds({ wellMeasureImprovementIds } = {}) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/deleteWellDailyMeasureInfoByIds`,
    method: "delete",
          data: wellMeasureImprovementIds,
  });
}
export function getWellDailyMeasureInfo({ ogfId, platform_id, rollingForecastDate } = {}) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/getWellDailyMeasureInfo?ogfId=${ ogfId || "" }&platform_id=${ platform_id || "" }&rollingForecastDate=${ rollingForecastDate || "" }`,
    method: "get",
  });
}
export function insertWellDailyMeasureInfo(data) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/insertWellDailyMeasureInfo`,
    method: "post",
    data
  });
}
export function insertWellDailyMeasureInfoSingle(data) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/insertWellDailyMeasureInfoSingle`,
    method: "post",
    data
  });
}
export function getWellDailyMeasureInfo() {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/queryMeasureTypeList`,
    method: "get",
  });
}
export function updateWellDailyMeasureInfoById({ wellDailyMeasureImprovementDTO } = {}) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/updateWellDailyMeasureInfoByIds`,
    method: "put",
          data: wellDailyMeasureImprovementDTO,
  });
}
