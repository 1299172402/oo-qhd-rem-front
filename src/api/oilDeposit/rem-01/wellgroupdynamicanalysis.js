import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

//= ==油藏动态管理/井组动态分析===//
// 开发生产问题检测
export function indicatorVariationTrendency(wellGroupIndicatorRequest) {
  return Axios({// 0303-01-01-开发生产问题检测-指标变化趋势（模型计算）
    url: `${baseUrl}/oupDynamicAnalysis/indicatorVariationTrendency`,
    method: "post",
    data: wellGroupIndicatorRequest,
  });
}
export function injectionEffectivity(wellGroupIndicatorRequest) {
  return Axios({// 0303-01-03-开发生产问题检测-注水受效分析（模型计算）
    url: `${baseUrl}/oupDynamicAnalysis/injectionEffectivity`,
    method: "post",
    data: wellGroupIndicatorRequest,
  });
}
export function proInjectBalance(wellGroupIndicatorRequest) {
  return Axios({// 0303-01-04-开发生产问题检测-注采平衡（模型计算）
    url: `${baseUrl}/oupDynamicAnalysis/proInjectBalance`,
    method: "post",
    data: wellGroupIndicatorRequest,
  });
}
export function pressureMaintain(wellGroupIndicatorRequest) {
  return Axios({// 0303-01-05-开发生产问题检测-压力保持（模型计算）
    url: `${baseUrl}/oupDynamicAnalysis/pressureMaintain`,
    method: "post",
    data: wellGroupIndicatorRequest,
  });
}
// 措施推荐
export function wellGroupRecommendMeasure(wellGroupIndicatorRequest) {
  return Axios({// 0303-01-06-查询井组推荐措施（模型计算）
    url: `${baseUrl}/oupDynamicAnalysis/wellGroupRecommendMeasure`,
    method: "post",
    data: wellGroupIndicatorRequest,
  });
}

export function wellGroupDynamicAnalysisDetail(request) {
  return Axios({// 0303-01-井组动态分析详细列表
    url: `${baseUrl}/oupDynamicAnalysis/wellGroupDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-01-辅助分析-地震属性图
 * @param request
 * @returns {AxiosPromise}
 */
export function seismicAttributePlot(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/seismicAttributePlot`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-02-辅助分析-井组连通图
 * @param request
 * @returns {AxiosPromise}
 */
export function conectionPlot(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/conectionPlot`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-03-辅助分析-砂层厚度图
 * @param request
 * @returns {AxiosPromise}
 */
export function sandLayerThicknessDiagram(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/sandLayerThicknessDiagram`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-04-辅助分析-有效厚度图
 * @param request
 * @returns {AxiosPromise}
 */
export function effectiveThicknessDiagram(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/effectiveThicknessDiagram`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-05-辅助分析-渗透率分布图
 * @param request
 * @returns {AxiosPromise}
 */
export function permeabilityDistribution(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/permeabilityDistribution`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-06-辅助分析-渗透率柱状图
 * @param request
 * @returns {AxiosPromise}
 */
export function permeabilityBarCharts(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/permeabilityBarCharts`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-09-辅助分析-动态分析-示踪剂**
 * @param request
 * @returns {AxiosPromise}
 */
export function tracer(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/tracer`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-07-辅助分析-动态分析-井组开发曲线**
 * @param request
 * @returns {AxiosPromise}
 */
export function wellGroupDevLineCharts(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/wellGroupDevLineCharts`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-08-辅助分析-动态分析-注采对应区线**
 * @param request
 * @returns {AxiosPromise}
 */
export function proInjectLineCharts(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/proInjectLineCharts`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-10-辅助分析-动态分析-措施效果**
 * @param request
 * @returns {AxiosPromise}
 */
export function wellGroupMeasureStat(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/wellGroupMeasureStat`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0303-02-11-辅助分析-小层顶面构造图
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataConstructureDaigramForWellGroup(request) {
  return Axios({
    url: `${baseUrl}/oupDynamicAnalysis/reservoirDataConstructureDaigramForWellGroup`,
    method: "post",
    data: request,
  });
}