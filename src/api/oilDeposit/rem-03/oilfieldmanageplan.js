import Axios from '@/utils/request'

/**
 *  hwh
 *  0102-05-详情统计图-调整井产量
 * @param request
 * @returns {AxiosPromise}
 */
export function adjustWellChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/adjustWellChart`,
    method: "post",
    data: request,
  });
}
export function chart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/chart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-04-技术指标管理-综合递减率
 * @param request
 * @returns {AxiosPromise}
 */
export function compositeDeclineRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/compositeDeclineRate`,
    method: "post",
    data: request,
  });
}
export function composiveDeclineChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/composiveDeclineChart`,
    method: "post",
    data: request,
  });
}
export function declineChartData(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/declineChartData`,
    method: "post",
    data: request,
  });
}
export function declineIndicatorEveluationResult(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/declineIndicatorEveluationResult`,
    method: "post",
    data: request,
  });
}
export function devPhaseInfos(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/devPhaseInfos`,
    method: "post",
    data: request,
  });
}
export function devStatusInfos(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/devStatusInfos`,
    method: "post",
    data: request,
  });
}
export function devWellChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/devWellChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-04-注水指标管理-分注井层段合格率
 * @param request
 * @returns {AxiosPromise}
 */
export function dividingLayerQualityRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/dividingLayerQualityRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-08-注水指标管理-分注井测试率
 * @param request
 * @returns {AxiosPromise}
 */
export function dividingTestRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/dividingTestRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-07-注水指标管理-动态监测完成率
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicMoniterFinshRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/dynamicMoniterFinshRate`,
    method: "post",
    data: request,
  });
}
export function experienceFormulaCalResult(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/experienceFormulaCalResult`,
    method: "post",
    data: request,
  });
}
export function fetchMeasureInfos(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/fetchMeasureInfos`,
    method: "post",
    data: request,
  });
}
export function fetchMeasureStatInfos(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/fetchMeasureStatInfos`,
    method: "post",
    data: request,
  });
}
export function fieldDevWarnings(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/fieldDevWarnings`,
    method: "post",
    data: request,
  });
}
export function generalDeclineChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/generalDeclineChart`,
    method: "post",
    data: request,
  });
}
export function generalPressure(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/generalPressure`,
    method: "post",
    data: request,
  });
}
export function indicatorEveluationResults(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/indicatorEveluationResults`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0402-14含水类-指标评价结果
 * @param request
 * @returns {AxiosPromise}
 */
export function indicatorResult(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/indicatorResult`,
    method: "post",
    data: request,
  });
}
export function injectionProRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/injectionProRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-06-注水指标管理-注水井分注率
 * @param request
 * @returns {AxiosPromise}
 */
export function injectionWellDividingRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/injectionWellDividingRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-01-注水指标管理-年注入量
 * @param request
 * @returns {AxiosPromise}
 */
export function injectionYear(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/injectionYear`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-02-注水指标管理-地层压力保持水平
 * @param request
 * @returns {AxiosPromise}
 */
export function layerPressureLevelRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/layerPressureLevelRate`,
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
    url: `rem/oilFieldManagePlanController/measureChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0402-10-递减类-自然递减率
 * @param request
 * @returns {AxiosPromise}
 */
export function natureDeclineChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/natureDeclineChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-09-注水指标管理-自然递减率
 * @param request
 * @returns {AxiosPromise}
 */
export function natureDeclineRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/natureDeclineRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-03-技术指标管理-自然递减率
 * @param request
 * @returns {AxiosPromise}
 */
export function natureDeclineRateForTech(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/natureDeclineRateForTech`,
    method: "post",
    data: request,
  });
}
export function newLastYearChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/newLastYearChart`,
    method: "post",
    data: request,
  });
}
export function newToInjectionChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/newToInjectionChart`,
    method: "post",
    data: request,
  });
}
export function oilFieldDevWarnings(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/oilFieldDevWarnings`,
    method: "post",
    data: request,
  });
}
export function oilFieldOutputVaryChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/oilFieldOutputVaryChart`,
    method: "post",
    data: request,
  });
}
export function oilFieldRecoveryRatio(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/oilFieldRecoveryRatio`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-01-技术指标管理-年产油量
 * @param request
 * @returns {AxiosPromise}
 */
export function oilYear(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/oilYear`,
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
    url: `rem/oilFieldManagePlanController/oldLastYearChart`,
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
    url: `rem/oilFieldManagePlanController/oldToInjectionChart`,
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
    url: `rem/oilFieldManagePlanController/oldWellChart`,
    method: "post",
    data: request,
  });
}
export function outputDegree(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/outputDegree`,
    method: "post",
    data: request,
  });
}
export function outputDegreeTongChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/outputDegreeTongChart`,
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
    url: `rem/oilFieldManagePlanController/outputSpeed`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-02-技术指标管理-采油速度
 * @param request
 * @returns {AxiosPromise}
 */
export function proSpeed(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proSpeed`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-06-技术指标管理-生产时率
 * @param request
 * @returns {AxiosPromise}
 */
export function proTimeRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proTimeRate`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisClose(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisClose`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForInjectionWell(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisForInjectionWell`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForProWell(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisForProWell`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisSave(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisSave`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisToObserve(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisToObserve`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-07-技术指标管理-油井利用率
 * @param request
 * @returns {AxiosPromise}
 */
export function proWellUsageRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/proWellUsageRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-05-注水指标管理-含水上升率
 * @param request
 * @returns {AxiosPromise}
 */
export function rateOfmoistureRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/rateOfmoistureRate`,
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
    url: `rem/oilFieldManagePlanController/reservoirsControlDegreeChart`,
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
    url: `rem/oilFieldManagePlanController/reservoirsProRateChart`,
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
    url: `rem/oilFieldManagePlanController/reservoirsUseDegreeChart`,
    method: "post",
    data: request,
  });
}
export function searchDevTrendAnalysis(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchDevTrendAnalysis`,
    method: "post",
    data: request,
  });
}
export function searchGasChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchGasChart`,
    method: "post",
    data: request,
  });
}
export function searchInjectionChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchInjectionChart`,
    method: "post",
    data: request,
  });
}
export function searchInjectionTable(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchInjectionTable`,
    method: "post",
    data: request,
  });
}
export function searchLongTermPlan(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchLongTermPlan`,
    method: "post",
    data: request,
  });
}
export function searchOilProductionChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchOilProductionChart`,
    method: "post",
    data: request,
  });
}
export function searchOilProductionTable(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/searchOilProductionTable`,
    method: "post",
    data: request,
  });
}
export function targetChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/targetChart`,
    method: "post",
    data: request,
  });
}
export function tongChartData(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/tongChartData`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  含水上升率
 * @param request
 * @returns {AxiosPromise}
 */
export function waterContainRaiseChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/waterContainRaiseChart`,
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
    url: `rem/oilFieldManagePlanController/waterControlDegreeChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-05-技术指标管理-含水上升率
 * @param request
 * @returns {AxiosPromise}
 */
export function waterCutRaiseRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/waterCutRaiseRate`,
    method: "post",
    data: request,
  });
}
export function waterDriveChartData(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/waterDriveChartData`,
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
    url: `rem/oilFieldManagePlanController/waterDriveUseDegreeChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 *  0402-08-含水类-水驱指数
 * @param request
 * @returns {AxiosPromise}
 */
export function waterIndicatorChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/waterIndicatorChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0502-03-注水指标管理-注水指标达标率
 * @param request
 * @returns {AxiosPromise}
 */
export function waterQualityRate(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/waterQualityRate`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0402-09-含水类-存水率
 * @param request
 * @returns {AxiosPromise}
 */
export function waterSotreRateChart(request) {
  return Axios({
    url: `rem/oilFieldManagePlanController/waterSotreRateChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 经验公式参数加载
 * @param request
 * @returns {AxiosPromise}
 */
export function experienceFormulaParameter(request){
  return Axios({
    url: `rem/oilFieldManagePlanController/experienceFormulaParameter`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0501-08-技术指标管理-技术指标统计列表
 * @param request
 * @returns {AxiosPromise}
 */
export function techIndicatorStat(request){
  return Axios({
    url: `rem/oilFieldManagePlanController/techIndicatorStat`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0502-10-注水指标管理-注水指标统计
 * @param request
 * @returns {AxiosPromise}
 */
export function injectionIndicatorStat(request){
  return Axios({
    url: `rem/oilFieldManagePlanController/injectionIndicatorStat`,
    method: "post",
    data: request,
  });
}

export function nameAndCode(request){
  return Axios({
    url: 'rem/oilFieldManagePlanController/nameAndCode',
    method: 'post',
    data: request
  })
}
/**
 * 作业公司产量跟踪
 */
export function queryOutputTraccking(params) {
  const url = 'rem/oilFieldManagePlanController/getReportFroms';
  return Axios.get(url, {params});
}

/**
 * 作业公司产量跟踪-日滚动预测
 */
export function getWorkCompanyTrack(params) {
  const url = 'rem/oilFieldRollingForecast/getWorkCompanyTrack';
  return Axios.get(url, {params});
}

/**
 * 油田预测产量-日滚动预测
 */
export function getOilForecastProd(params) {
  const url = 'rem/oilFieldRollingForecast/getOilForecastProd';
  return Axios.get(url, {params});
}

/**
 * 油田剩余水平-日滚动预测
 */
export function getOilResidueLevel(params) {
  const url = 'rem/oilFieldRollingForecast/getOilResidueLevel';
  return Axios.get(url, {params});
}

/**
 * 滚动预测日期下拉-日滚动预测
 */
export function getForecastDate(params) {
  const url = 'rem/oilFieldRollingForecast/getForecastDate';
  return Axios.get(url, {params});
}

/**
 * 油田列表接口
 * @param {*} params
 */
export function getOilFieldInfo(params){
  const url = 'rem/oilFieldRollingForecast/getOilFieldInfo'
  return Axios.get(url,{params});
}

/**
 * 保存油田产量影响因素
 * @param {*} request
 */
export function saveInfluencingFactorsOfOilfieldProduction(request){
  return Axios({
    url: `rem/oilFieldRollingForecast/saveInfluencingFactorsOfOilfieldProduction`,
    method: "post",
    data: request,
  });
}