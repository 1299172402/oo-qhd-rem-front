import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function conectionPlot(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/conectionPlot`,
    method: "post",
    data
  });
}
export function effectiveThicknessDiagram(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/effectiveThicknessDiagram`,
    method: "post",
    data
  });
}
export function indicatorVariationTrendency(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/indicatorVariationTrendency`,
    method: "post",
    data
  });
}
export function injectionEffectivity(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/injectionEffectivity`,
    method: "post",
    data
  });
}
export function permeabilityBarCharts(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/permeabilityBarCharts`,
    method: "post",
    data
  });
}
export function permeabilityDistribution(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/permeabilityDistribution`,
    method: "post",
    data
  });
}
export function pressureMaintain(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/pressureMaintain`,
    method: "post",
    data
  });
}
export function proInjectBalance(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/proInjectBalance`,
    method: "post",
    data
  });
}
export function proInjectLineCharts(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/proInjectLineCharts`,
    method: "post",
    data
  });
}
export function reservoirDataConstructureDaigramForWellGroup(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/reservoirDataConstructureDaigramForWellGroup`,
    method: "post",
    data
  });
}
export function sandLayerThicknessDiagram(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/sandLayerThicknessDiagram`,
    method: "post",
    data
  });
}
export function seismicAttributePlot(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/seismicAttributePlot`,
    method: "post",
    data
  });
}
export function tracer(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/tracer`,
    method: "post",
    data
  });
}
export function waterContainRaiseRate(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/waterContainRaiseRate`,
    method: "post",
    data
  });
}
export function wellGroupDevLineCharts(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/wellGroupDevLineCharts`,
    method: "post",
    data
  });
}
export function wellGroupDynamicAnalysisDetail(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/wellGroupDynamicAnalysisDetail`,
    method: "post",
    data
  });
}
export function wellGroupMeasureStat(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/wellGroupMeasureStat`,
    method: "post",
    data
  });
}
export function wellGroupRecommendMeasure(data) {
  return request({
    url: `${baseUrl}/wellGroupDynamicAnalysis/wellGroupRecommendMeasure`,
    method: "post",
    data
  });
}
