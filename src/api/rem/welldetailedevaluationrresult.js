import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryByCwid({ cwid } = {}) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/queryByCwid?cwid=${ cwid || "" }`,
    method: "get",
  });
}
export function saveWellDetailedEvaluation(data) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/saveWellDetailedEvaluation`,
    method: "post",
    data
  });
}
