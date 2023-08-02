import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"
export function queryLinkageAlarmInfo({ authorizedPersonnel,alarmTime } = {}) {
    return request({
        url: `${baseUrl}/linkageAlarmInfo/queryLinkageAlarmInfo?authorizedPersonnel=${ authorizedPersonnel || "" }&alarmTime=${ alarmTime || "" }`,
        method: "get",
    });
}
