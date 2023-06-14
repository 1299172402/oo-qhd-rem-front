import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function InjectionProdInfo() {
  return request({
    url: `${baseUrl}/injectionProductionLinkage/injectionProdInfo`,
    method: "get",
  });
}
