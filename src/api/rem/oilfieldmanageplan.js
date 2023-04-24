import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function adjustWellChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/adjustWellChart`,
    method: "post",
    data
  });
}
export function adjustWellTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/adjustWellTable`,
    method: "post",
    data
  });
}
export function chart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/chart`,
    method: "post",
    data
  });
}
export function compositeDeclineRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/compositeDeclineRate`,
    method: "post",
    data
  });
}
export function composiveDeclineChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/composiveDeclineChart`,
    method: "post",
    data
  });
}
export function declineChartData(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/declineChartData`,
    method: "post",
    data
  });
}
export function declineIndicatorEveluationResult(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/declineIndicatorEveluationResult`,
    method: "post",
    data
  });
}
export function devPhaseInfos(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/devPhaseInfos`,
    method: "post",
    data
  });
}
export function devStatusInfos(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/devStatusInfos`,
    method: "post",
    data
  });
}
export function devWellChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/devWellChart`,
    method: "post",
    data
  });
}
export function devWellTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/devWellTable`,
    method: "post",
    data
  });
}
export function dividingLayerQualityRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/dividingLayerQualityRate`,
    method: "post",
    data
  });
}
export function dividingTestRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/dividingTestRate`,
    method: "post",
    data
  });
}
export function dynamicEvent(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/dynamicEvent`,
    method: "post",
    data
  });
}
export function dynamicMoniterFinshRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/dynamicMoniterFinshRate`,
    method: "post",
    data
  });
}
export function experienceFormulaCalResult(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/experienceFormulaCalResult`,
    method: "post",
    data
  });
}
export function experienceFormulaParameter(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/experienceFormulaParameter`,
    method: "post",
    data
  });
}
export function fetchMeasureInfos(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/fetchMeasureInfos`,
    method: "post",
    data
  });
}
export function fetchMeasureStatInfos(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/fetchMeasureStatInfos`,
    method: "post",
    data
  });
}
export function fieldDevWarnings(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/fieldDevWarnings`,
    method: "post",
    data
  });
}
export function generalDeclineChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/generalDeclineChart`,
    method: "post",
    data
  });
}
export function generalPressure(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/generalPressure`,
    method: "post",
    data
  });
}
export function getFetchMeasureInfos(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getFetchMeasureInfos`,
    method: "post",
    data
  });
}
export function getGasTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getGasTable`,
    method: "post",
    data
  });
}
export function getMeasureType() {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getMeasureType`,
    method: "get",
  });
}
export function getMeasureVersion() {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getMeasureVersion`,
    method: "get",
  });
}
export function getReportFroms({ date, unitType } = {}) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getReportFroms?date=${ date || "" }&unitType=${ unitType || "" }`,
    method: "get",
  });
}
export function getRollForecastVersion(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getRollForecastVersion`,
    method: "post",
    data
  });
}
export function getWorkProgress(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/getWorkProgress`,
    method: "post",
    data
  });
}
export function indicatorEveluationResults(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/indicatorEveluationResults`,
    method: "post",
    data
  });
}
export function indicatorResult(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/indicatorResult`,
    method: "post",
    data
  });
}
export function injectionIndicatorStat(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/injectionIndicatorStat`,
    method: "post",
    data
  });
}
export function injectionProRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/injectionProRate`,
    method: "post",
    data
  });
}
export function injectionWellDividingRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/injectionWellDividingRate`,
    method: "post",
    data
  });
}
export function injectionYear(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/injectionYear`,
    method: "post",
    data
  });
}
export function layerPressureLevelRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/layerPressureLevelRate`,
    method: "post",
    data
  });
}
export function measureChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/measureChart`,
    method: "post",
    data
  });
}
export function measureStatus(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/measureStatus`,
    method: "post",
    data
  });
}
export function measureTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/measureTable`,
    method: "post",
    data
  });
}
export function nameAndCode(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/nameAndCode`,
    method: "post",
    data
  });
}
export function natureDeclineChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/natureDeclineChart`,
    method: "post",
    data
  });
}
export function natureDeclineRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/natureDeclineRate`,
    method: "post",
    data
  });
}
export function natureDeclineRateForTech(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/natureDeclineRateForTech`,
    method: "post",
    data
  });
}
export function newLastYearChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/newLastYearChart`,
    method: "post",
    data
  });
}
export function newToInjectionChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/newToInjectionChart`,
    method: "post",
    data
  });
}
export function oilFieldDevWarnings(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oilFieldDevWarnings`,
    method: "post",
    data
  });
}
export function oilFieldOutputVaryChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oilFieldOutputVaryChart`,
    method: "post",
    data
  });
}
export function oilFieldRecoveryRatio(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oilFieldRecoveryRatio`,
    method: "post",
    data
  });
}
export function oilYear(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oilYear`,
    method: "post",
    data
  });
}
export function oldLastYearChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oldLastYearChart`,
    method: "post",
    data
  });
}
export function oldToInjectionChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oldToInjectionChart`,
    method: "post",
    data
  });
}
export function oldWellChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oldWellChart`,
    method: "post",
    data
  });
}
export function oldWellTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/oldWellTable`,
    method: "post",
    data
  });
}
export function outputDegree(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/outputDegree`,
    method: "post",
    data
  });
}
export function outputDegreeTongChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/outputDegreeTongChart`,
    method: "post",
    data
  });
}
export function outputSpeed(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/outputSpeed`,
    method: "post",
    data
  });
}
export function outputStat(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/outputStat`,
    method: "post",
    data
  });
}
export function proSpeed(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proSpeed`,
    method: "post",
    data
  });
}
export function proTimeRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proTimeRate`,
    method: "post",
    data
  });
}
export function proWellIndicatorWarningAssosiationAnalysisClose(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisClose`,
    method: "post",
    data
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForInjectionWell(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisForInjectionWell`,
    method: "post",
    data
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForProWell(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisForProWell`,
    method: "post",
    data
  });
}
export function proWellIndicatorWarningAssosiationAnalysisSave(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisSave`,
    method: "post",
    data
  });
}
export function proWellIndicatorWarningAssosiationAnalysisToObserve(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisToObserve`,
    method: "post",
    data
  });
}
export function proWellMeasure(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellMeasure`,
    method: "post",
    data
  });
}
export function proWellUsageRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/proWellUsageRate`,
    method: "post",
    data
  });
}
export function rateOfmoistureRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/rateOfmoistureRate`,
    method: "post",
    data
  });
}
export function reservoirsControlDegreeChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/reservoirsControlDegreeChart`,
    method: "post",
    data
  });
}
export function reservoirsProRateChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/reservoirsProRateChart`,
    method: "post",
    data
  });
}
export function reservoirsUseDegreeChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/reservoirsUseDegreeChart`,
    method: "post",
    data
  });
}
export function searchDevTrendAnalysis(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchDevTrendAnalysis`,
    method: "post",
    data
  });
}
export function searchGasChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchGasChart`,
    method: "post",
    data
  });
}
export function searchInjectionChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchInjectionChart`,
    method: "post",
    data
  });
}
export function searchInjectionTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchInjectionTable`,
    method: "post",
    data
  });
}
export function searchLongTermPlan(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchLongTermPlan`,
    method: "post",
    data
  });
}
export function searchOilProductionChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchOilProductionChart`,
    method: "post",
    data
  });
}
export function searchOilProductionTable(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/searchOilProductionTable`,
    method: "post",
    data
  });
}
export function targetChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/targetChart`,
    method: "post",
    data
  });
}
export function techIndicatorStat(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/techIndicatorStat`,
    method: "post",
    data
  });
}
export function tongChartData(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/tongChartData`,
    method: "post",
    data
  });
}
export function waterContainRaiseChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterContainRaiseChart`,
    method: "post",
    data
  });
}
export function waterControlDegreeChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterControlDegreeChart`,
    method: "post",
    data
  });
}
export function waterCutRaiseRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterCutRaiseRate`,
    method: "post",
    data
  });
}
export function waterDriveChartData(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterDriveChartData`,
    method: "post",
    data
  });
}
export function waterDriveUseDegreeChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterDriveUseDegreeChart`,
    method: "post",
    data
  });
}
export function waterIndicatorChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterIndicatorChart`,
    method: "post",
    data
  });
}
export function waterQualityRate(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterQualityRate`,
    method: "post",
    data
  });
}
export function waterSotreRateChart(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/waterSotreRateChart`,
    method: "post",
    data
  });
}
export function workingStatus(data) {
  return request({
    url: `${baseUrl}/oilFieldManagePlanController/workingStatus`,
    method: "post",
    data
  });
}
