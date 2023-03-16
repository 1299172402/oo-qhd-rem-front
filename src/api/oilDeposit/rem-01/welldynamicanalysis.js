import Axios from '@/utils/request'

export function cementingQuality(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/cementingQuality`,
    method: "post",
    data: request,
  });
}
export function declineRate(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/declineRate`,
    method: "post",
    data: request,
  });
}
export function depositionFaciesDiagram(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/depositionFaciesDiagram`,
    method: "post",
    data: request,
  });
}
export function deviationData(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/deviationData`,
    method: "post",
    data: request,
  });
}
export function drillingTrajectory(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/drillingTrajectory`,
    method: "post",
    data: request,
  });
}
export function dynamicProd(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/dynamicProd`,
    method: "post",
    data: request,
  });
}
export function fluidProducingIntensity(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/fluidProducingIntensity`,
    method: "post",
    data: request,
  });
}
export function getComPerfInterval(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/getComPerfInterval`,
    method: "post",
    data: request,
  });
}
export function groundReason(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/groundReason`,
    method: "post",
    data: request,
  });
}
export function injectionClosed(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/injectionClosed`,
    method: "post",
    data: request,
  });
}
export function injectionMeasureRecommend(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/injectionMeasureRecommend`,
    method: "post",
    data: request,
  });
}
export function injectionWellDynamicAnalysisDetail(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/injectionWellDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}
export function layerInjectionStatus(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/layerInjectionStatus`,
    method: "post",
    data: request,
  });
}
export function layerReason(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/layerReason`,
    method: "post",
    data: request,
  });
}
export function layerVariationTrend(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/layerVariationTrend`,
    method: "post",
    data: request,
  });
}
export function loggingCurve(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/loggingCurve`,
    method: "post",
    data: request,
  });
}
export function loggingInterpretation(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/loggingInterpretation`,
    method: "post",
    data: request,
  });
}
export function measureRecommend(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/measureRecommend`,
    method: "post",
    data: request,
  });
}
export function microLayerData(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/microLayerData`,
    method: "post",
    data: request,
  });
}
export function microPhasePlot(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/microPhasePlot`,
    method: "post",
    data: request,
  });
}
export function operatingStatus(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/operatingStatus`,
    method: "post",
    data: request,
  });
}
export function outProfileLoggingInterpretation(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/outProfileLoggingInterpretation`,
    method: "post",
    data: request,
  });
}
export function potential(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/potential`,
    method: "post",
    data: request,
  });
}
export function pressure(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/pressure`,
    method: "post",
    data: request,
  });
}
export function proWellDynamicAnalysisDetail(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/proWellDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}
export function produceData(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/produceData`,
    method: "post",
    data: request,
  });
}
export function reserveProducing(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/reserveProducing`,
    method: "post",
    data: request,
  });
}
export function saturationLoggingInterpretation(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/saturationLoggingInterpretation`,
    method: "post",
    data: request,
  });
}

/**
 *   地震属性图
 * @param request
 * @returns {AxiosPromise}
 */
export function seismicAttributePlot(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/seismicAttributePlot`,
    method: "post",
    data: request,
  });
}
export function seismicPlot(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/seismicPlot`,
    method: "post",
    data: request,
  });
}
export function structureDiagram(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/structureDiagram`,
    method: "post",
    data: request,
  });
}
export function supplyDischargeRelationship(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/supplyDischargeRelationship`,
    method: "post",
    data: request,
  });
}
export function testReport(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/testReport`,
    method: "post",
    data: request,
  });
}
export function testWellReport(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/testWellReport`,
    method: "post",
    data: request,
  });
}

/**
 *   hwh
 * 0301(0302)-01-辅助分析-静态资料-上传图片
 * @param request
 * @returns {AxiosPromise}
 */
export function uploadPic(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/uploadPic`,
    method: "post",
    data: request,
  });
}
export function wellBaseInfo(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/wellBaseInfo`,
    method: "post",
    data: request,
  });
}
export function wellBoreReason(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/wellBoreReason`,
    method: "post",
    data: request,
  });
}
export function wellCompletionDiagram(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/wellCompletionDiagram`,
    method: "post",
    data: request,
  });
}
export function wellNetDiagram(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/wellNetDiagram`,
    method: "post",
    data: request,
  });
}
export function workingHistory(request) {
  return Axios({
    url: `/rem01/api/dynamicAnalysis/workingHistory`,
    method: "post",
    data: request,
  });
}
