import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryByWellidCwid({ controlledReserves } = {}) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationRresult/queryByWellidCwid`,
    method: "get",
          data: controlledReserves,
  });
}
export function saveWellDetailedEvaluation(data) {
  return request({
    url: `${baseUrl}/wellDetailedEvaluationRresult/saveControlledReserves`,
    method: "post",
    data
  });
}
