import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function handleError() {
  return request({
    url: `${baseUrl}/oauth/error`,
    method: "get",
  });
}
export function handleError(data) {
  return request({
    url: `${baseUrl}/oauth/error`,
    method: "post",
    data
  });
}
export function handleError() {
  return request({
    url: `${baseUrl}/oauth/error`,
    method: "delete",
  });
}
export function handleError() {
  return request({
    url: `${baseUrl}/oauth/error`,
    method: "put",
  });
}
