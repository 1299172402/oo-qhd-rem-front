import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

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
export function getWellDailyMeasureInfo({ ogfId, rollingForecastDate } = {}) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/getWellDailyMeasureInfo?ogfId=${ ogfId || "" }&rollingForecastDate=${ rollingForecastDate || "" }`,
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
export function updateWellDailyMeasureInfoById({ wellDailyMeasureImprovementDTO } = {}) {
  return request({
    url: `${baseUrl}/wellDailyMeasureImprove/updateWellDailyMeasureInfoByIds`,
    method: "put",
          data: wellDailyMeasureImprovementDTO,
  });
}
