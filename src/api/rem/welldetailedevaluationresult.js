import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryByWellidCwid({ cwid, wellId } = {}) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/queryByWellidCwid?cwid=${ cwid || "" }&wellId=${ wellId || "" }`,
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
