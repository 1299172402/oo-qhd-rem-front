import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getControlledReserves({ layerId, wellId } = {}) {
  return request({
    url: `${baseUrl}/controlledReserves/getControlledReserves?layerId=${ layerId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function saveControlledReserves(data) {
  return request({
    url: `${baseUrl}/controlledReserves/saveControlledReserves`,
    method: "post",
    data
  });
}
