import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryByWellidCwid(data) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/queryByWellidCwid`,
    method: "post",
    data
  });
}
export function saveWellDetailedEvaluation(data) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/saveControlledReserves`,
    method: "post",
    data
  });
}
