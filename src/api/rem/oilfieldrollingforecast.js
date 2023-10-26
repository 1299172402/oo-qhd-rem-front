import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getCompanyStruggleAndExamineAll({ date, unitType } = {}) {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/getCompanyStruggleAndExamine?date=${ date || "" }&unitType=${ unitType || "" }`,
    method: "get",
  });
}
export function getForecastDate() {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/getForecastDate`,
    method: "get",
  });
}
export function getOilFieldInfo() {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/getOilFieldInfo`,
    method: "get",
  });
}
export function getOilForecastProd({ date, rollingForecastDate, unitType } = {}) {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/getOilForecastProd?date=${ date || "" }&rollingForecastDate=${ rollingForecastDate || "" }&unitType=${ unitType || "" }`,
    method: "get",
  });
}
export function getOilResidueLevel({ date, unitType } = {}) {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/getOilResidueLevel?date=${ date || "" }&unitType=${ unitType || "" }`,
    method: "get",
  });
}
export function getWorkCompanyTrack({ date, rollingForecastDate, unitType } = {}) {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/getWorkCompanyTrack?date=${ date || "" }&rollingForecastDate=${ rollingForecastDate || "" }&unitType=${ unitType || "" }`,
    method: "get",
  });
}
export function saveInfluencingFactorsOfOilfieldProduction(data) {
  return request({
    url: `${baseUrl}/oilFieldRollingForecast/saveInfluencingFactorsOfOilfieldProduction`,
    method: "post",
    data
  });
}
