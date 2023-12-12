import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function wellGroupList(data) {
  return request({
    // url: `${baseUrl}/wellGroupInforMaintenance/wellConnectivityEval/wellGroupList`,
    url: `${baseUrl}/injectionProductionDeploy/wellConnectivityEval/selectWellGroupNew`,
    method: "post",
    data
  });
}
