import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function checkToken(data) {
  return request({
    url: `${baseUrl}/oauth/check_token`,
    method: "post",
    data
  });
}
