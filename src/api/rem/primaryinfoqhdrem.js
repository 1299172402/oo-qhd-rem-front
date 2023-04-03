import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function fetchFields(data) {
  return request({
    url: `${baseUrl}/primaryInfoQhdRem/fetchFields`,
    method: "post",
    data
  });
}
