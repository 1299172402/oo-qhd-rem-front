import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function cementingQuality(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/cementingQuality`,
    method: "post",
    data
  });
}
export function chartComparationAnalysis(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/chartComparationAnalysis`,
    method: "post",
    data
  });
}
export function declineRate(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/declineRate`,
    method: "post",
    data
  });
}
export function depositionFaciesDiagram(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/depositionFaciesDiagram`,
    method: "post",
    data
  });
}
export function deviationData(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/deviationData`,
    method: "post",
    data
  });
}
export function divLayerTestData(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/divLayerTestData`,
    method: "post",
    data
  });
}
export function drillingTrajectory(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/drillingTrajectory`,
    method: "post",
    data
  });
}
export function findDynamicAnalysis(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/dynamicAnalysis`,
    method: "post",
    data
  });
}
export function dynamicProd(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/dynamicProd`,
    method: "post",
    data
  });
}
export function fluidProducingIntensity(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/fluidProducingIntensity`,
    method: "post",
    data
  });
}
export function fluidProductivityIndex(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/fluidProductivityIndex`,
    method: "post",
    data
  });
}
export function fluidProductivityIndexMeter(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/fluidProductivityIndexMeter`,
    method: "post",
    data
  });
}
export function getComPerfInterval(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/getComPerfInterval`,
    method: "post",
    data
  });
}
export function getMajorEventsBriefly(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/getMajorEventsBriefly`,
    method: "post",
    data
  });
}
export function getProductionStatus({ ogfId, platformId, wellId } = {}) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/getProductionStatus?ogfId=${ ogfId || "" }&platformId=${ platformId || "" }&wellId=${ wellId || "" }`,
    method: "get",
  });
}
export function getSectionWell(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/getSectionWell`,
    method: "post",
    data
  });
}
export function groundReason(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/groundReason`,
    method: "post",
    data
  });
}
export function injectionClosed(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/injectionClosed`,
    method: "post",
    data
  });
}
export function injectionMeasureRecommend(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/injectionMeasureRecommend`,
    method: "post",
    data
  });
}
export function injectionWellDynamicAnalysisDetail(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/injectionWellDynamicAnalysisDetail`,
    method: "post",
    data
  });
}
export function layerInjectionStatus(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/layerInjectionStatus`,
    method: "post",
    data
  });
}
export function layerReason(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/layerReason`,
    method: "post",
    data
  });
}
export function layerVariationTrend(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/layerVariationTrend`,
    method: "post",
    data
  });
}
export function loggingCurve(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/loggingCurve`,
    method: "post",
    data
  });
}
export function loggingInterpretation(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/loggingInterpretation`,
    method: "post",
    data
  });
}
export function measureRecommend(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/measureRecommend`,
    method: "post",
    data
  });
}
export function microLayerData(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/microLayerData`,
    method: "post",
    data
  });
}
export function microPhasePlot(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/microPhasePlot`,
    method: "post",
    data
  });
}
export function oilFieldIndicatorVariation(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/oilFieldIndicatorVariation`,
    method: "post",
    data
  });
}
export function operatingStatus(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/operatingStatus`,
    method: "post",
    data
  });
}
export function outProfileLoggingInterpretation(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/outProfileLoggingInterpretation`,
    method: "post",
    data
  });
}
export function potential(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/potential`,
    method: "post",
    data
  });
}
export function pressure(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/pressure`,
    method: "post",
    data
  });
}
export function proWellDynamicAnalysisDetail(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/proWellDynamicAnalysisDetail`,
    method: "post",
    data
  });
}
export function produceData(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/produceData`,
    method: "post",
    data
  });
}
export function produceTableData(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/produceTableData`,
    method: "post",
    data
  });
}
export function pumpReplaceDetail(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/pumpReplaceDetail`,
    method: "post",
    data
  });
}
export function reserveProducing(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/reserveProducing`,
    method: "post",
    data
  });
}
export function saturationLoggingInterpretation(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/saturationLoggingInterpretation`,
    method: "post",
    data
  });
}
export function saveSectionWell(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/saveSectionWell`,
    method: "post",
    data
  });
}
export function seismicAttributePlot(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/seismicAttributePlot`,
    method: "post",
    data
  });
}
export function seismicPlot(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/seismicPlot`,
    method: "post",
    data
  });
}
export function structureDiagram(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/structureDiagram`,
    method: "post",
    data
  });
}
export function supplyDischargeRelationship(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/supplyDischargeRelationship`,
    method: "post",
    data
  });
}
export function testReport(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/testReport`,
    method: "post",
    data
  });
}
export function testWellReport(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/testWellReport`,
    method: "post",
    data
  });
}
export function uploadPic(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/uploadPic`,
    method: "post",
    data
  });
}
export function wellBaseInfo(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/wellBaseInfo`,
    method: "post",
    data
  });
}
export function wellBoreReason(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/wellBoreReason`,
    method: "post",
    data
  });
}
export function wellCompletionDiagram(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/wellCompletionDiagram`,
    method: "post",
    data
  });
}
export function wellDailyIndicatorVariation(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/wellDailyIndicatorVariation`,
    method: "post",
    data
  });
}
export function wellNetDiagram(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/wellNetDiagram`,
    method: "post",
    data
  });
}
export function wellProSumIndicatorVariation(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/wellProSumIndicatorVariation`,
    method: "post",
    data
  });
}
export function workingHistory(data) {
  return request({
    url: `${baseUrl}/dynamicAnalysis/workingHistory`,
    method: "post",
    data
  });
}
export function pumpReplaceDetailSkip(data) {
    return request({
        url: `${baseUrl}/dynamicAnalysis/pumpReplaceDetailSkip`,
        method: "post",
        data
    });
}
