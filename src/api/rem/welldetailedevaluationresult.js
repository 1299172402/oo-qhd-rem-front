import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryByWellidCwid({ layerId, wellId } = {}) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/queryByWellidCwid?layerId=${ layerId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function saveWellDetailedEvaluation(data) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/saveControlledReserves`,
    method: "post",
    data
  });
}
