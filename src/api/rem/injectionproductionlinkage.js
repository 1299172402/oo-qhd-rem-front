import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function InjectionProdInfo() {
  return request({
    url: `${baseUrl}/injectionProductionLinkage/injectionProdInfo`,
    method: "get",
  });
}
export function queryLinkageAlarmInfo({ authorizedPersonnel,alarmTime } = {}) {
    return request({
        url: `${baseUrl}/linkageAlarmInfo/queryLinkageAlarmInfo?authorizedPersonnel=${ authorizedPersonnel || "" }&alarmTime=${ alarmTime || "" }`,
        method: "get",
        headers: {
            showLoading: false
        }
    });
}
export function addLinkageAlarmInfo(data) {
    return request({
        url: `${baseUrl}/linkageAlarmInfo/addLinkageAlarmInfo`,
        method: "post",
        data,
        headers: {
            showLoading: false
        }
    });
}