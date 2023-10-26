import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryCustomQueryList(data) {
  return request({
    url: `${baseUrl}/customQuery/getCustomQueryInfo`,
    method: "post",
    data
  });
}
