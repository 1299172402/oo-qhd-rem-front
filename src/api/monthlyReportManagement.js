import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"
export function getProductionIndex({ assetCode, month, ogfId, orgId } = {}) {
  return request({
    url: `${baseUrl}/monthlyReportManagement/getProductionIndex?assetCode=${ assetCode || "" }&month=${ month || "" }&ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
    method: "get",
  });
}