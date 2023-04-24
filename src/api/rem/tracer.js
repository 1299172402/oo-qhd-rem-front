import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getWellGroupByWellId({ wellId } = {}) {
  return request({
    url: `${baseUrl}/tracerController/getWellGroupByWellId?wellId=${ wellId || "" }`,
    method: "get",
  });
}
