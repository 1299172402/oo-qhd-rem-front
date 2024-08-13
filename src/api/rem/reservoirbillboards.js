import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getYieldFluctuation(data) {
  return request({
    url: `${baseUrl}/reservoirBillboards/getYieldFluctuation`,
    method: "post",
      data,
      headers: {
          showLoading: false
      }
  });
}
export function monthlyProductionComparison({ proPlanTypeCode,ogfId } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/monthlyProductionComparison?proPlanTypeCode=${ proPlanTypeCode || "" }&ogfId=${ ogfId || "" }`,
    method: "get",
  });
}
export function getProductionDataByPlanType({ proPlanTypeCode,ogfId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/getProductionDataByPlanType?proPlanTypeCode=${ proPlanTypeCode || "" }&ogfId=${ ogfId || "" }`,
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
export function queryOilFieldIncident({ chronicleTypeCode, endTime, ogfId, platformId, startTime, wellId,pageSize,pageNum } = {}) {
  return request({
    url: `${baseUrl}/reservoirBillboards/queryOilFieldIncident?chronicleTypeCode=${ chronicleTypeCode || "" }&endTime=${ endTime || "" }&ogfId=${ ogfId || "" }&platformId=${ platformId || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }&pageSize=${ pageSize || "" }&pageNum=${ pageNum || "" }`,
    method: "get",
  });
}
export function queryOilFieldIncidentDownloadFile({ chronicleTypeCode, endTime, ogfId, platformId, startTime, wellId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryOilFieldIncidentDownloadFile?chronicleTypeCode=${ chronicleTypeCode || "" }&endTime=${ endTime || "" }&ogfId=${ ogfId || "" }&platformId=${ platformId || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
        method: "get",
        responseType:'blob',
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
export function queryShutDownWellStatisDetailsDownloadFile({ endTime, injShutdownTypeCode, ogfId, pageNum, pageSize, platformId, shutdownPlanTypeCode, startTime, wellId } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryShutDownWellStatisDetailsDownloadFile?endTime=${ endTime || "" }&injShutdownTypeCode=${ injShutdownTypeCode || "" }&ogfId=${ ogfId || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&platformId=${ platformId || "" }&shutdownPlanTypeCode=${ shutdownPlanTypeCode || "" }&startTime=${ startTime || "" }&wellId=${ wellId || "" }`,
        method: "get",
        responseType: 'blob',
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
export function queryProblemWellStatisDetails({ wellId, ogfId,pageSize, pageNum,assetCode,yearDate } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryProblemWellStatisDetails?ogfId=${ ogfId || "" }&wellId=${ wellId || "" }&pageSize=${ pageSize || "" }&pageNum=${ pageNum || "" }&assetCode=${ assetCode || "" }&yearDate=${ yearDate || "" }`,
        method: "get",
    });
}
export function queryProblemWellStatisDetailsDownloadFile({ wellId, ogfId,pageSize, pageNum,assetCode,yearDate } = {}) {
    return request({
        url: `${baseUrl}/reservoirBillboards/queryProblemWellStatisDetailsDownloadFile?ogfId=${ ogfId || "" }&wellId=${ wellId || "" }&pageSize=${ pageSize || "" }&pageNum=${ pageNum || "" }&assetCode=${ assetCode || "" }&yearDate=${ yearDate || "" }`,
        method: "get",
        responseType: "blob",
    });
}
export function getOilVideoFromMinIO() {
    return request({
        url: `${baseUrl}/reservoirBillboards/getOilVideoFromMinIO`,
        method: "get",
        responseType: "blob",
    });
}
export function getAllProductionPlanTypes() {
    return request({
        url: `${baseUrl}/reservoirBillboards/getAllProductionPlanTypes`,
        method: "get",
    });
}