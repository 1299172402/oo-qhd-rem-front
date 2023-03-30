import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function wellGroupParamConfiguration(data) {
  return request({
    url: `${baseUrl}/wellGroupInforMaintenance/wellGroupParamConfiguration`,
    method: "post",
    data
  });
}
