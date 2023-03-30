import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryDensityInfo(data) {
  return request({
    url: `${baseUrl}/density/DensityInfoMaintenance/queryDensityInfo`,
    method: "post",
    data
  });
}
export function save(data) {
  return request({
    url: `${baseUrl}/density/DensityInfoMaintenance/save`,
    method: "post",
    data
  });
}
