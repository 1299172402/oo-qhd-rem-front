import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getOnSiteWork({ ogfId, asseCode, wellId, measureTypeCode, yearTime, pageNum, pageSize } = {}) {
  return request({
    url: `${baseUrl}/actionPlanManagement/onSiteWork?ogfId=${ ogfId || "" }&asseCode=${ asseCode || "" }&wellId=${ wellId || "" }&measureTypeCode=${ measureTypeCode || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&yearTime=${ yearTime || "" }`,
    method: "get",
  });
}
export function queryMeasurePlanList(data) {
  return request({
    url: `${baseUrl}/actionPlanManagement/queryMeasurePlanList`,
    method: "post",
    data
  });
}
export function queryPlatformPob(data) {
    return request({
        url: `/prm01/api/prm/rc/queryPlatformPob`,
        method: "post",
        data
    });
}
export function onSiteWorkActionEvent() {
    return request({
        url: `${baseUrl}/actionPlanManagement/onSiteWorkActionEvent`,
        method: "get",
    });
}