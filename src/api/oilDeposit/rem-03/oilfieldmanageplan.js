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
    url: `${baseUrl  }/oilFieldManagePlanController/adjustWellChart`,
    method: "post",
    data: request,
  });
}
export function chart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/chart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/compositeDeclineRate`,
    method: "post",
    data: request,
  });
}
export function composiveDeclineChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/composiveDeclineChart`,
    method: "post",
    data: request,
  });
}
export function declineChartData(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/declineChartData`,
    method: "post",
    data: request,
  });
}
export function declineIndicatorEveluationResult(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/declineIndicatorEveluationResult`,
    method: "post",
    data: request,
  });
}
export function devPhaseInfos(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/devPhaseInfos`,
    method: "post",
    data: request,
  });
}
export function devStatusInfos(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/devStatusInfos`,
    method: "post",
    data: request,
  });
}

export function devStatusInfosDate(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/devStatusInfosDate`,
    method: "get",
  });
}

export function devWellChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/devWellChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/dividingLayerQualityRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/dividingTestRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/dynamicMoniterFinshRate`,
    method: "post",
    data: request,
  });
}
export function experienceFormulaCalResult(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/experienceFormulaCalResult`,
    method: "post",
    data: request,
  });
}
export function fetchMeasureInfos(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/fetchMeasureInfos`,
    method: "post",
    data: request,
  });
}
export function fetchMeasureStatInfos(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/fetchMeasureStatInfos`,
    method: "post",
    data: request,
  });
}
export function fieldDevWarnings(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/fieldDevWarnings`,
    method: "post",
    data: request,
  });
}
export function generalDeclineChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/generalDeclineChart`,
    method: "post",
    data: request,
  });
}
export function generalPressure(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/generalPressure`,
    method: "post",
    data: request,
  });
}
export function indicatorEveluationResults(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/indicatorEveluationResults`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/indicatorResult`,
    method: "post",
    data: request,
  });
}
export function injectionProRate(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/injectionProRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/injectionWellDividingRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/injectionYear`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/layerPressureLevelRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/measureChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/natureDeclineChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/natureDeclineRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/natureDeclineRateForTech`,
    method: "post",
    data: request,
  });
}
export function newLastYearChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/newLastYearChart`,
    method: "post",
    data: request,
  });
}
export function newToInjectionChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/newToInjectionChart`,
    method: "post",
    data: request,
  });
}
export function oilFieldDevWarnings(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/oilFieldDevWarnings`,
    method: "post",
    data: request,
  });
}
export function oilFieldOutputVaryChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/oilFieldOutputVaryChart`,
    method: "post",
    data: request,
  });
}
export function oilFieldRecoveryRatio(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/oilFieldRecoveryRatio`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/oilYear`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/oldLastYearChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/oldToInjectionChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/oldWellChart`,
    method: "post",
    data: request,
  });
}
export function outputDegree(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/outputDegree`,
    method: "post",
    data: request,
  });
}
export function outputDegreeTongChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/outputDegreeTongChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/outputSpeed`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/proSpeed`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/proTimeRate`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisClose(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisClose`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForInjectionWell(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisForInjectionWell`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisForProWell(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisForProWell`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisSave(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisSave`,
    method: "post",
    data: request,
  });
}
export function proWellIndicatorWarningAssosiationAnalysisToObserve(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/proWellIndicatorWarningAssosiationAnalysisToObserve`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/proWellUsageRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/rateOfmoistureRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/reservoirsControlDegreeChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/reservoirsProRateChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/reservoirsUseDegreeChart`,
    method: "post",
    data: request,
  });
}
export function searchDevTrendAnalysis(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchDevTrendAnalysis`,
    method: "post",
    data: request,
  });
}
export function searchGasChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchGasChart`,
    method: "post",
    data: request,
  });
}
export function searchInjectionChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchInjectionChart`,
    method: "post",
    data: request,
  });
}
export function searchInjectionTable(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchInjectionTable`,
    method: "post",
    data: request,
  });
}
export function searchLongTermPlan(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchLongTermPlan`,
    method: "post",
    data: request,
  });
}
export function searchOilProductionChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchOilProductionChart`,
    method: "post",
    data: request,
  });
}
export function searchOilProductionTable(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/searchOilProductionTable`,
    method: "post",
    data: request,
  });
}
export function targetChart(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/targetChart`,
    method: "post",
    data: request,
  });
}
export function tongChartData(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/tongChartData`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterContainRaiseChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterControlDegreeChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterCutRaiseRate`,
    method: "post",
    data: request,
  });
}
export function waterDriveChartData(request) {
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/waterDriveChartData`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterDriveUseDegreeChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterIndicatorChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterQualityRate`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/waterSotreRateChart`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/experienceFormulaParameter`,
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
    url: `${baseUrl  }/oilFieldManagePlanController/techIndicatorStat`,
    method: "post",
    data: request,
  });
}

/**
 *  hwh
 *  0502-10-注水指标管理-注水指标统    计
 * @param request
 * @returns {AxiosPromise}
 */
export function injectionIndicatorStat(request){
  return Axios({
    url: `${baseUrl  }/oilFieldManagePlanController/injectionIndicatorStat`,
    method: "post",
    data: request,
  });
}

export function nameAndCode(request){
  return Axios({
    url: `${baseUrl}/oilFieldManagePlanController/nameAndCode`,
    method: 'post',
    data: request
  })
}
/**
 * 作业公司产量跟踪
 */
export function getReportFroms(params) {
  const url = `${baseUrl}/oilFieldManagePlanController/getReportFroms`;
  return Axios.get(url, {params});
}

/**
 * 作业公司产量跟踪-日滚动预测
 */
export function getWorkCompanyTrack(params) {
  const url = `${baseUrl}/oilFieldRollingForecast/getWorkCompanyTrack`;
  return Axios.get(url, {params});
}

/**
 * 油田预测产量-日滚动预测
 */
export function getOilForecastProd(params) {
  const url = `${baseUrl}/oilFieldRollingForecast/getOilForecastProd`;
  return Axios.get(url, {params});
}

/**
 * 油田剩余水平-日滚动预测
 */
export function getOilResidueLevel(params) {
  const url = `${baseUrl}/oilFieldRollingForecast/getOilResidueLevel`;
  return Axios.get(url, {params});
}

/**
 * 滚动预测日期下拉-日滚动预测
 */
export function getForecastDate(params) {
  const url = `${baseUrl}/oilFieldRollingForecast/getForecastDate`;
  return Axios.get(url, {params});
}

/**
 * 油田列表接口
 * @param {*} params
 */
export function getOilFieldInfo(params){
  const url = `${baseUrl}/oilFieldRollingForecast/getOilFieldInfo`
  return Axios.get(url,{params});
}

/**
 * 保存油田产量影响因素
 * @param {*} request
 */
export function saveInfluencingFactorsOfOilfieldProduction(request){
  return Axios({
    url: `${baseUrl  }/oilFieldRollingForecast/saveInfluencingFactorsOfOilfieldProduction`,
    method: "post",
    data: request,
  });
}