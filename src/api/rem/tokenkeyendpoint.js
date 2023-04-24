import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getKey({ name } = {}) {
  return request({
    url: `${baseUrl}/oauth/token_key?name=${ name || "" }`,
    method: "get",
  });
}
