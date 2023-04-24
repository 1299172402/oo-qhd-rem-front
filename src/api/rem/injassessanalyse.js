import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function evaluationResultStatistics({ dateTime, ogfId } = {}) {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/evaluationResultStatistics?dateTime=${ dateTime || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function getSeparateTypeInfo() {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/getSeparateTypeInfo`,
    method: "get",
  });
}
export function injPlanAnalyzeAssessment({ dateTime, ogfId } = {}) {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/injPlanAnalyzeAssessment?dateTime=${ dateTime || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
