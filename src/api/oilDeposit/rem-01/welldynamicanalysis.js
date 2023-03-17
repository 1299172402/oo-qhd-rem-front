import Axios from '@/utils/request'

export function cementingQuality(request) {
  return Axios({
    url: `remcAnalysis/cementingQuality`,
    method: "post",
    data: request,
  });
}
export function declineRate(request) {
  return Axios({
    url: `remcAnalysis/declineRate`,
    method: "post",
    data: request,
  });
}
export function depositionFaciesDiagram(request) {
  return Axios({
    url: `remcAnalysis/depositionFaciesDiagram`,
    method: "post",
    data: request,
  });
}
export function deviationData(request) {
  return Axios({
    url: `remcAnalysis/deviationData`,
    method: "post",
    data: request,
  });
}
export function drillingTrajectory(request) {
  return Axios({
    url: `remcAnalysis/drillingTrajectory`,
    method: "post",
    data: request,
  });
}
export function dynamicProd(request) {
  return Axios({
    url: `remcAnalysis/dynamicProd`,
    method: "post",
    data: request,
  });
}
export function fluidProducingIntensity(request) {
  return Axios({
    url: `remcAnalysis/fluidProducingIntensity`,
    method: "post",
    data: request,
  });
}
export function getComPerfInterval(request) {
  return Axios({
    url: `remcAnalysis/getComPerfInterval`,
    method: "post",
    data: request,
  });
}
export function groundReason(request) {
  return Axios({
    url: `remcAnalysis/groundReason`,
    method: "post",
    data: request,
  });
}
export function injectionClosed(request) {
  return Axios({
    url: `remcAnalysis/injectionClosed`,
    method: "post",
    data: request,
  });
}
export function injectionMeasureRecommend(request) {
  return Axios({
    url: `remcAnalysis/injectionMeasureRecommend`,
    method: "post",
    data: request,
  });
}
export function injectionWellDynamicAnalysisDetail(request) {
  return Axios({
    url: `remcAnalysis/injectionWellDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}
export function layerInjectionStatus(request) {
  return Axios({
    url: `remcAnalysis/layerInjectionStatus`,
    method: "post",
    data: request,
  });
}
export function layerReason(request) {
  return Axios({
    url: `remcAnalysis/layerReason`,
    method: "post",
    data: request,
  });
}
export function layerVariationTrend(request) {
  return Axios({
    url: `remcAnalysis/layerVariationTrend`,
    method: "post",
    data: request,
  });
}
export function loggingCurve(request) {
  return Axios({
    url: `remcAnalysis/loggingCurve`,
    method: "post",
    data: request,
  });
}
export function loggingInterpretation(request) {
  return Axios({
    url: `remcAnalysis/loggingInterpretation`,
    method: "post",
    data: request,
  });
}
export function measureRecommend(request) {
  return Axios({
    url: `remcAnalysis/measureRecommend`,
    method: "post",
    data: request,
  });
}
export function microLayerData(request) {
  return Axios({
    url: `remcAnalysis/microLayerData`,
    method: "post",
    data: request,
  });
}
export function microPhasePlot(request) {
  return Axios({
    url: `remcAnalysis/microPhasePlot`,
    method: "post",
    data: request,
  });
}
export function operatingStatus(request) {
  return Axios({
    url: `remcAnalysis/operatingStatus`,
    method: "post",
    data: request,
  });
}
export function outProfileLoggingInterpretation(request) {
  return Axios({
    url: `remcAnalysis/outProfileLoggingInterpretation`,
    method: "post",
    data: request,
  });
}
export function potential(request) {
  return Axios({
    url: `remcAnalysis/potential`,
    method: "post",
    data: request,
  });
}
export function pressure(request) {
  return Axios({
    url: `remcAnalysis/pressure`,
    method: "post",
    data: request,
  });
}
export function proWellDynamicAnalysisDetail(request) {
  return Axios({
    url: `remcAnalysis/proWellDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}
export function produceData(request) {
  return Axios({
    url: `remcAnalysis/produceData`,
    method: "post",
    data: request,
  });
}
export function reserveProducing(request) {
  return Axios({
    url: `remcAnalysis/reserveProducing`,
    method: "post",
    data: request,
  });
}
export function saturationLoggingInterpretation(request) {
  return Axios({
    url: `remcAnalysis/saturationLoggingInterpretation`,
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
    url: `remcAnalysis/seismicAttributePlot`,
    method: "post",
    data: request,
  });
}
export function seismicPlot(request) {
  return Axios({
    url: `remcAnalysis/seismicPlot`,
    method: "post",
    data: request,
  });
}
export function structureDiagram(request) {
  return Axios({
    url: `remcAnalysis/structureDiagram`,
    method: "post",
    data: request,
  });
}
export function supplyDischargeRelationship(request) {
  return Axios({
    url: `remcAnalysis/supplyDischargeRelationship`,
    method: "post",
    data: request,
  });
}
export function testReport(request) {
  return Axios({
    url: `remcAnalysis/testReport`,
    method: "post",
    data: request,
  });
}
export function testWellReport(request) {
  return Axios({
    url: `remcAnalysis/testWellReport`,
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
    url: `remcAnalysis/uploadPic`,
    method: "post",
    data: request,
  });
}
export function wellBaseInfo(request) {
  return Axios({
    url: `remcAnalysis/wellBaseInfo`,
    method: "post",
    data: request,
  });
}
export function wellBoreReason(request) {
  return Axios({
    url: `remcAnalysis/wellBoreReason`,
    method: "post",
    data: request,
  });
}
export function wellCompletionDiagram(request) {
  return Axios({
    url: `remcAnalysis/wellCompletionDiagram`,
    method: "post",
    data: request,
  });
}
export function wellNetDiagram(request) {
  return Axios({
    url: `remcAnalysis/wellNetDiagram`,
    method: "post",
    data: request,
  });
}
export function workingHistory(request) {
  return Axios({
    url: `remcAnalysis/workingHistory`,
    method: "post",
    data: request,
  });
}
