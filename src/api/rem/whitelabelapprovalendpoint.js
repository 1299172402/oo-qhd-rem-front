import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getAccessConfirmation({ model } = {}) {
  return request({
    url: `${baseUrl}/oauth/confirm_access?model=${ model || "" }`,
    method: "get",
  });
}
export function getAccessConfirmation(data) {
  return request({
    url: `${baseUrl}/oauth/confirm_access`,
    method: "post",
    data
  });
}
export function getAccessConfirmation({ model } = {}) {
  return request({
    url: `${baseUrl}/oauth/confirm_access?model=${ model || "" }`,
    method: "delete",
  });
}
export function getAccessConfirmation({ model } = {}) {
  return request({
    url: `${baseUrl}/oauth/confirm_access?model=${ model || "" }`,
    method: "put",
  });
}
