import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function authorize({ complete, model, name, parameters } = {}) {
  return request({
    url: `${baseUrl}/oauth/authorize?complete=${ complete || "" }&model=${ model || "" }&name=${ name || "" }&parameters=${ parameters || "" }`,
    method: "get",
  });
}
export function approveOrDeny(data) {
  return request({
    url: `${baseUrl}/oauth/authorize`,
    method: "post",
    data
  });
}
export function authorize({ complete, model, name, parameters } = {}) {
  return request({
    url: `${baseUrl}/oauth/authorize?complete=${ complete || "" }&model=${ model || "" }&name=${ name || "" }&parameters=${ parameters || "" }`,
    method: "delete",
  });
}
export function authorize({ complete, model, name, parameters } = {}) {
  return request({
    url: `${baseUrl}/oauth/authorize?complete=${ complete || "" }&model=${ model || "" }&name=${ name || "" }&parameters=${ parameters || "" }`,
    method: "put",
  });
}
