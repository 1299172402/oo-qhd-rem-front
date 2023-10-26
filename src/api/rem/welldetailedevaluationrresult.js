import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryByCwid({ controlledReserves } = {}) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/queryByWellidCwid`,
    method: "get",
          data: controlledReserves,
  });
}
export function saveWellDetailedEvaluation(data) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationResult/saveWellDetailedEvaluation`,
    method: "post",
    data
  });
}
