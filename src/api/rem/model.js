import request from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function wellGroupEvaluation(data) {
    return request({
        url: `${baseUrl}/wellGroupDynamicAnalysis/wellGroupModelCal`,
        method: "post",
        timeout: 300000,
        data
    });
}

export function updateDateByCode({code,startDate,endDate} = {}) {
    return request({
        url: `${baseUrl}/modelController/updateDateByCode?code=${code || ""}&startDate=${startDate || ""}&endDate=${endDate || ""}`,
        method: "get",
    });
}
