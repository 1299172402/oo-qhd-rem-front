import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getSectionWell(data) {
  return request({
    url: `${baseUrl}/wellsGroupDynamicAnalysis/getSectionWell`,
    method: "post",
    data
  });
}
