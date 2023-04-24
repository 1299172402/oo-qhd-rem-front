import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getAccessToken({ name, parameters } = {}) {
  return request({
    url: `${baseUrl}/oauth/token?name=${ name || "" }&parameters=${ parameters || "" }`,
    method: "get",
  });
}
export function postAccessToken(data) {
  return request({
    url: `${baseUrl}/oauth/token`,
    method: "post",
    data
  });
}
