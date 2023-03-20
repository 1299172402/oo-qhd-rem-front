import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm03/api" : "/ipm03/api"
export function getChangeTrajectory(chartConditionDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getChangeTrajectory`,
    method: "post",
    data: chartConditionDto,
  });
}
export function getCheckPumpPeriodList(checkPumpDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getCheckPumpPeriodList`,
    method: "post",
    data: checkPumpDto,
  });
}
export function getCheckPumpPeriodScatter(checkPumpDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getCheckPumpPeriodScatter`,
    method: "post",
    data: checkPumpDto,
  });
}
export function getCurrentAvgCheckPumpPeriod(monthlyFaultDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getCurrentAvgCheckPumpPeriod`,
    method: "post",
    data: monthlyFaultDto,
  });
}
export function getCurrentAvgFaultRatio(monthlyFaultDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getCurrentAvgFaultRatio`,
    method: "post",
    data: monthlyFaultDto,
  });
}
export function getCurrentAvgRunningTime(monthlyFaultDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getCurrentAvgRunningTime`,
    method: "post",
    data: monthlyFaultDto,
  });
}
export function getLoadRateDetail(runningIndexDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getLoadRateDetail`,
    method: "post",
    data: runningIndexDto,
  });
}
export function getFaultByWellId(checkPumpDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getFaultByWellId`,
    method: "post",
    data: checkPumpDto,
  });
}
export function getFaultRatioPie(faultTypeDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getFaultRatioPie`,
    method: "post",
    data: faultTypeDto,
  });
}
export function getFaultRatioPieCharts(faultTypeDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getFaultRatioPieCharts`,
    method: "post",
    data: faultTypeDto,
  });
}
export function getFaultRatioScatter(faultTypeDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getFaultRatioScatter`,
    method: "post",
    data: faultTypeDto,
  });
}
export function getFaultType() {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getFaultType`,
    method: "get",
  });
}
export function getLoadRateCurve(runningIndexDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getLoadRateCurve`,
    method: "post",
    data: runningIndexDto,
  });
}
export function getIndexList(runningIndexDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getIndexList`,
    method: "post",
    data: runningIndexDto,
  });
}
export function getProductionCurve(productionCurveDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getProductionCurve`,
    method: "post",
    data: productionCurveDto,
  });
}
export function getRunningIndex(runningIndexDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getRunningIndex`,
    method: "post",
    data: runningIndexDto,
  });
}
export function getRunningTimeList(runningTimeDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getRunningTimeList`,
    method: "post",
    data: runningTimeDto,
  });
}
export function getScatter(chartConditionDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getScatter`,
    method: "post",
    data: chartConditionDto,
  });
}
export function getLoadRate(runningIndexDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getLoadRate`,
    method: "post",
    data: runningIndexDto,
  });
}
export function getOilChartInfo(chartConditionDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getOilChartInfo`,
    method: "post",
    data: chartConditionDto,
  });
}
export function getOilPointDistribution(chartConditionDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getOilPointDistribution`,
    method: "post",
    data: chartConditionDto,
  });
}
export function getYearAvgCheckPumpPeriod(monthlyFaultDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getYearAvgCheckPumpPeriod`,
    method: "post",
    data: monthlyFaultDto,
  });
}
export function getYearAvgFaultRatio(monthlyFaultDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getYearAvgFaultRatio`,
    method: "post",
    data: monthlyFaultDto,
  });
}
export function getYearAvgRunningTime(monthlyFaultDto) {
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getYearAvgRunningTime`,
    method: "post",
    data: monthlyFaultDto,
  });
}

/**
 * hwh
 * 下载井运转时间信息
 * @param data
 * @returns {AxiosPromise}
 */
export function downloadRunningTimeList(data){
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/downloadRunningTimeList`,
    method: "post",
    data,
  })
}

/**
 * hwh
 * 获取油井工况异常井信息
 * @param data
 * @returns {AxiosPromise}
 */
export function getAbnormalWell(data){
  return Axios({
    url: `${baseUrl}/indexOverviewIpm/getAbnormalWell`,
    method: "post",
    data
  })
}