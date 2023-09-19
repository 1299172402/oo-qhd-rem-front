import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function wellGroupEvaluation(data) {
    return request({
        url: `${baseUrl}/wellGroupDynamicAnalysis/wellGroupModelCal`,
        method: "post",
        timeout:'30000',
        data
    });
}
