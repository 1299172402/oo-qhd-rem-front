import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function wellAvgFluidProdAllocUpdate(data) {
  return request({
    url: `${baseUrl}/injDeployOptimize/wellAvgFluidProdAllocUpdate`,
    method: "post",
    data
  });
}
export function wellGuessResult(data) {
  return request({
    url: `${baseUrl}/injDeployOptimize/wellGuessResult`,
    method: "post",
    data
  });
}
export function wellInjRatio(data) {
  return request({
    url: `${baseUrl}/injDeployOptimize/wellInjRatio`,
    method: "post",
    data
  });
}
export function getWellMonthAllocationList({ blockId, dateTime } = {}) {
  return request({
    url: `${baseUrl}/injDeployOptimize/wellMonthAllocation?blockId=${ blockId || "" }&dateTime=${ dateTime || "" }`,
    method: "get",
  });
}
export function wellMonthInj(data) {
  return request({
    url: `${baseUrl}/injDeployOptimize/wellMonthInj`,
    method: "post",
    data
  });
}
