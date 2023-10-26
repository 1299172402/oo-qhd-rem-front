import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function openapiJson() {
  return request({
    url: `${baseUrl}/v3/api-docs/swagger-config`,
    method: "get",
  });
}
