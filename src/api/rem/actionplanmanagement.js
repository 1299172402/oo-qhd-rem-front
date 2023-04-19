import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getOnSiteWork({ actionEvent, assetCode, month, ogfId, wellNo } = {}) {
  return request({
    url: `${baseUrl}/actionPlanManagement/onSiteWork?actionEvent=${ actionEvent || "" }&assetCode=${ assetCode || "" }&month=${ month || "" }&ogfId=${ ogfId || "" }&wellNo=${ wellNo || "" }`,
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
