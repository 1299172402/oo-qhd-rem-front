import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function queryProductList(data) {
  return request({
    url: `${baseUrl}/workCompanyDesignate/WorkCompanyDesignate/queryProductList`,
    method: "post",
    data
  });
}
export function getOilFieldList({ orgId } = {}) {
  return request({
    url: `${baseUrl}/workCompanyDesignate/getOilFieldList/${orgId}`,
    method: "get",
  });
}
export function getWorkCompany() {
  return request({
    url: `${baseUrl}/workCompanyDesignate/getWorkCompany`,
    method: "get",
  });
}
export function queryLayerList() {
  return request({
    url: `${baseUrl}/workCompanyDesignate/queryLayerList`,
    method: "get",
  });
}
