import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getOilFieldList({ orgId } = {}) {
  return request({
    url: `${baseUrl}/WorkCompanyDesignate/getOilFieldList/${orgId}`,
    method: "get",
  });
}
export function getWorkCompany() {
  return request({
    url: `${baseUrl}/WorkCompanyDesignate/getWorkCompany`,
    method: "get",
  });
}
