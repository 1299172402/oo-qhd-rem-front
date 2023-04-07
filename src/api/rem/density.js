import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryDensityInfo(data) {
  return request({
    url: `${baseUrl}/DensityInfoMaintenance/queryDensityInfo`,
    method: "post",
    data
  });
}
export function save(data) {
  return request({
    url: `${baseUrl}/DensityInfoMaintenance/save`,
    method: "post",
    data
  });
}
