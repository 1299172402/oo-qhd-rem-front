import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation() {
  return request({
    url: `${baseUrl}/reservoirBillboards/getYieldFluctuation`,
    method: "get",
      headers: {
          showLoading: false
      }
  });
}
export function monthlyProductionComparison({ date,ogfId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/monthlyProductionComparison?date=${ date || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function productionMetricsOverview({ogfId,orgId, date } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/productionMetricsOverview?date=${ date || "" }&orgId=${ orgId || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
    headers: {
      showLoading: false
    }
  });
}
export function queryCapacityComposition({ogfId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryCapacityComposition?ogfId=${ ogfId || "" }`,
    method: "get",
      headers: {
          showLoading: false
      }
  });
}
export function queryMeasureEffectTrack({ evaluationDate, oilFieldId, platformId, showNormal, timeGranularityCode } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryMeasureEffectTrack?evaluationDate=${ evaluationDate || "" }&oilFieldId=${ oilFieldId || "" }&platformId=${ platformId || "" }&showNormal=${ showNormal || "" }&timeGranularityCode=${ timeGranularityCode || "" }`,
    method: "get",
    headers: {
      showLoading: false
    }
  });
}
export function queryOilFieldIncident({ chronicleTypeCode, endTime, ogfId, platformId, startTime, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncident?chronicleTypeCode=${ chronicleTypeCode || "" }&endTime=${ endTime || "" }&ogfId=${ ogfId || "" }&platformId=${ platformId || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryOilFieldIncidentType() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncidentType`,
    method: "get",
  });
}
export function queryPlanValueDict() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryPlanValueDict`,
    method: "get",
  });
}
export function queryProblemWellStatis({ date, platformId,ogfId, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryProblemWellStatis?date=${ date || "" }&platformId=${ platformId || "" }&wellId=${ wellId || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
      headers: {
          showLoading: false
      }
  });
}
export function queryShutDownValueDict() {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownValueDict`,
    method: "get",
  });
}
export function queryShutDownWellStatisCharts({ ogfId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisCharts?ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function queryShutDownWellStatisDetails({ endTime, injShutdownTypeCode, ogfId, pageNum, pageSize, platformId, shutdownPlanTypeCode, startTime, wellId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisDetails?endTime=${ endTime || "" }&injShutdownTypeCode=${ injShutdownTypeCode || "" }&ogfId=${ ogfId || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&platformId=${ platformId || "" }&shutdownPlanTypeCode=${ shutdownPlanTypeCode || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function queryYieldTracking({ ogfId, orgId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryYieldTracking?ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
    method: "get",
      headers: {
          showLoading: false
      }
  });
}
export function getYieldTracking({ ogfId, orgId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/getYieldTracking?ogfId=${ ogfId || "" }&orgId=${ orgId || "" }`,
        method: "get",
        headers: {
            showLoading: false
        }
    });
}
export function queryProblemWellStatisDetails({ wellId, ogfId,pageSize, pageNum,assetCode } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryProblemWellStatisDetails?ogfId=${ ogfId || "" }&wellId=${ wellId || "" }&pageSize=${ pageSize || "" }&pageNum=${ pageNum || "" }&assetCode=${ assetCode || "" }`,
        method: "get",
    });
}
