import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function list() {
  return request({
    url: `${baseUrl}/density/list`,
    method: "get",
  });
}
