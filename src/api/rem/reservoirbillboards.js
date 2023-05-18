import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation({ date, dateComp, ogfId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/getYieldFluctuation?date=${ date || "" }&dateComp=${ dateComp || "" }&ogfId=${ ogfId || "" }`,
        method: "get",
    });
}
export function monthlyProductionComparison({ date } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/monthlyProductionComparison?date=${ date || "" }`,
        method: "get",
    });
}
export function productionMetricsOverview({ date } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/productionMetricsOverview?date=${ date || "" }`,
        method: "get",
    });
}
export function queryMeasureEffectTrack({ platformId, timeGranularityCode, showNormal, oilFieldId, evaluationDate } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryMeasureEffectTrack?platformId=${ platformId || "" }&timeGranularityCode=${ timeGranularityCode || "" }&showNormal=${ showNormal || "" }&oilFieldId=${ oilFieldId || "" }&evaluationDate=${ evaluationDate || "" }`,
        method: "get",
    });
}
export function queryProblemWellStatis({ date, platformId, wellId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryProblemWellStatis?date=${ date || "" }&platformId=${ platformId || "" }&wellId=${ wellId || "" }`,
        method: "get",
    });
}
export function queryYieldTracking({ ogfId, orgId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryYieldTracking?ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
        method: "get",
    });
}

export function queryOilFieldIncident({ wellId, chronicleTypeCode, startTime, endTime } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryOilFieldIncident?wellId=${ wellId || "" }&chronicleTypeCode=${ chronicleTypeCode || "" }&startTime=${ startTime || "" }&endTime=${ endTime || "" }`,
        method: "get",
    });
}
export function queryOilFieldIncidentType() {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryOilFieldIncidentType`,
        method: "get",
    });
}