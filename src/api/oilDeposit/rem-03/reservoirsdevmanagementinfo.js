import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

/**
 *  hwh
 *  0102-05-详情统计图-调整井产量
 * @param request
 * @returns {AxiosPromise}
 */
export function adjustWellChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/adjustWellChart`,
    method: "post",
    data: request,
  });
}
export function compositeDeclineRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/compositeDeclineRate`,
    method: "post",
    data: request,
  });
}
export function composiveDeclineChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/composiveDeclineChart`,
    method: "post",
    data: request,
  });
}
export function declineChartData(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/declineChartData`,
    method: "post",
    data: request,
  });
}
export function declineIndicatorEveluationResult(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/declineIndicatorEveluationResult`,
    method: "post",
    data: request,
  });
}
export function devPhaseInfos(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/devPhaseInfos`,
    method: "post",
    data: request,
  });
}
export function devStatusChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/devStatusChart`,
    method: "post",
    data: request,
  });
}
export function devStatusInfos(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/devStatusInfos`,
    method: "post",
    data: request,
  });
}
export function devWellChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/devWellChart`,
    method: "post",
    data: request,
  });
}
export function dividingLayerQualityRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/dividingLayerQualityRate`,
    method: "post",
    data: request,
  });
}
export function dividingTestRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/dividingTestRate`,
    method: "post",
    data: request,
  });
}
export function dynamicMoniterFinshRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/dynamicMoniterFinshRate`,
    method: "post",
    data: request,
  });
}
export function experienceFormulaCalResult(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/experienceFormulaCalResult`,
    method: "post",
    data: request,
  });
}
export function fetchMeasureInfos(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/fetchMeasureInfos`,
    method: "post",
    data: request,
  });
}
export function fetchMeasureStatInfos(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/fetchMeasureStatInfos`,
    method: "post",
    data: request,
  });
}
export function fieldDevWarnings(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/fieldDevWarnings`,
    method: "post",
    data: request,
  });
}
export function generalDeclineChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/generalDeclineChart`,
    method: "post",
    data: request,
  });
}
export function generalPressure(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/generalPressure`,
    method: "post",
    data: request,
  });
}
export function indicatorEveluationResults(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/indicatorEveluationResults`,
    method: "post",
    data: request,
  });
}
export function indicatorResult(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/indicatorResult`,
    method: "post",
    data: request,
  });
}
export function injectionProRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/injectionProRate`,
    method: "post",
    data: request,
  });
}
export function injectionWellDividingRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/injectionWellDividingRate`,
    method: "post",
    data: request,
  });
}
export function injectionYear(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/injectionYear`,
    method: "post",
    data: request,
  });
}
export function layerPressureLevelRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/layerPressureLevelRate`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0102-04-详情统计图-措施井产量
 * @param request
 * @returns {AxiosPromise}
 */
export function measureChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/measureChart`,
    method: "post",
    data: request,
  });
}
export function natureDeclineChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/natureDeclineChart`,
    method: "post",
    data: request,
  });
}
export function natureDeclineRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/natureDeclineRate`,
    method: "post",
    data: request,
  });
}
export function natureDeclineRateForTech(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/natureDeclineRateForTech`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0102-06-详情统计图-上年投产新井产量
 * @param request
 * @returns {AxiosPromise}
 */
export function newLastYearChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/newLastYearChart`,
    method: "post",
    data: request,
  });
}
export function newToInjectionChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/newToInjectionChart`,
    method: "post",
    data: request,
  });
}
export function oilFieldDevWarnings(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oilFieldDevWarnings`,
    method: "post",
    data: request,
  });
}
export function oilFieldOutputVaryChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oilFieldOutputVaryChart`,
    method: "post",
    data: request,
  });
}
export function oilFieldRecoveryRatio(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oilFieldRecoveryRatio`,
    method: "post",
    data: request,
  });
}
export function oilYear(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oilYear`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0102-06-详情统计图-上年老井本年产量
 * @param request
 * @returns {AxiosPromise}
 */
export function oldLastYearChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oldLastYearChart`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0102-12-详情统计图-老井转注
 * @param request
 * @returns {AxiosPromise}
 */
export function oldToInjectionChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oldToInjectionChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0102-03-详情统计图-老井产量
 * @param request
 * @returns {AxiosPromise}
 */
export function oldWellChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/oldWellChart`,
    method: "post",
    data: request,
  });
}
export function outputDegree(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/outputDegree`,
    method: "post",
    data: request,
  });
}
export function outputDegreeTongChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/outputDegreeTongChart`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0402-01-产能类-采油速度
 * @param request
 * @returns {AxiosPromise}
 */
export function outputSpeed(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/outputSpeed`,
    method: "post",
    data: request,
  });
}
export function outputTracing(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/outputTracing`,
    method: "post",
    data: request,
  });
}
export function outputTracingAnalysis(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/outputTracingAnalysis`,
    method: "post",
    data: request,
  });
}
export function platformOutputContributeAnalysis(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/platformOutputContributeAnalysis`,
    method: "post",
    data: request,
  });
}
export function proSpeed(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proSpeed`,
    method: "post",
    data: request,
  });
}
export function proTimeRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proTimeRate`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisClose(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proWellIndicatorWarningAssosiationAnalysisClose`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForInjectionWell(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proWellIndicatorWarningAssosiationAnalysisForInjectionWell`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForProWell(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proWellIndicatorWarningAssosiationAnalysisForProWell`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisSave(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proWellIndicatorWarningAssosiationAnalysisSave`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisToObserve(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proWellIndicatorWarningAssosiationAnalysisToObserve`,
    method: "post",
    data: request,
  });
}
export function proWellUsageRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/proWellUsageRate`,
    method: "post",
    data: request,
  });
}
export function rateOfmoistureRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/rateOfmoistureRate`,
    method: "post",
    data: request,
  });
}
export function reasonAnalysis(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/reasonAnalysis`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0402-05-储能类-储量控制程度
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirsControlDegreeChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/reservoirsControlDegreeChart`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0402-05-储能类-储采比
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirsProRateChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/reservoirsProRateChart`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0402-05-储能类-储量动用程度
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirsUseDegreeChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/reservoirsUseDegreeChart`,
    method: "post",
    data: request,
  });
}
export function searchDevTrendAnalysis(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchDevTrendAnalysis`,
    method: "post",
    data: request,
  });
}
export function searchGasChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchGasChart`,
    method: "post",
    data: request,
  });
}
export function searchInjectionChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchInjectionChart`,
    method: "post",
    data: request,
  });
}
export function searchInjectionTable(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchInjectionTable`,
    method: "post",
    data: request,
  });
}
export function searchLongTermPlan(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchLongTermPlan`,
    method: "post",
    data: request,
  });
}
export function searchOilProductionChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchOilProductionChart`,
    method: "post",
    data: request,
  });
}
export function searchOilProductionTable(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/searchOilProductionTable`,
    method: "post",
    data: request,
  });
}
export function targetChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/targetChart`,
    method: "post",
    data: request,
  });
}
export function tongChartData(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/tongChartData`,
    method: "post",
    data: request,
  });
}
export function waterContainRaiseChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterContainRaiseChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0402-06-储能类-水驱控制程度
 * @param request
 * @returns {AxiosPromise}
 */
export function waterControlDegreeChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterControlDegreeChart`,
    method: "post",
    data: request,
  });
}
export function waterCutRaiseRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterCutRaiseRate`,
    method: "post",
    data: request,
  });
}
export function waterDriveChartData(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterDriveChartData`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0402-06-储能类-水驱动用程度
 * @param request
 * @returns {AxiosPromise}
 */
export function waterDriveUseDegreeChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterDriveUseDegreeChart`,
    method: "post",
    data: request,
  });
}
export function waterIndicatorChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterIndicatorChart`,
    method: "post",
    data: request,
  });
}
export function waterQualityRate(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterQualityRate`,
    method: "post",
    data: request,
  });
}
export function waterSotreRateChart(request) {
  return Axios({
    url: `${baseUrl}/reservoirsDevManagementInfo/waterSotreRateChart`,
    method: "post",
    data: request,
  });
}
