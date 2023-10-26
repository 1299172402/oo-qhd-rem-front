import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryBasicData({ assetCode, wellId } = {}) {
  return request({
    url: `${baseUrl}/oilAnalysisReportController/queryBasicData?assetCode=${ assetCode || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
