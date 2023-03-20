import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function redirectToUi() {
  return request({
    url: `${baseUrl}/swagger-ui.html`,
    method: "get",
  });
}
