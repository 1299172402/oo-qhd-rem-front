import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"
//===油藏动态管理/油井动态分析===//
//生产动态数据
export function dynamicProd(request) {
  return Axios({//0301-01-生产动态（模型计算）
    url: `${baseUrl}/dynamicAnalysis/dynamicProd`,
    method: "post",
    data: request,
  });
}
//生产问题检测
export function operatingStatus(request) {
  return Axios({//0301-01-生产问题监测-油井工况（模型计算）
    url: `${baseUrl}/dynamicAnalysis/operatingStatus`,
    method: "post",
    data: request,
  });
}
export function supplyDischargeRelationship(request) {
  return Axios({// 0301-01-生产问题监测-供排关系（模型计算）
    url: `${baseUrl}/dynamicAnalysis/supplyDischargeRelationship`,
    method: "post",
    data: request,
  });
}
export function declineRate(request) {
  return Axios({// 0301-01-生产问题监测-递减率（模型计算）
    url: `${baseUrl}/dynamicAnalysis/declineRate`,
    method: "post",
    data: request,
  });
}
export function fluidProducingIntensity(request) {
  return Axios({// 0301-01-生产问题监测-采液强度（模型计算）
    url: `${baseUrl}/dynamicAnalysis/fluidProducingIntensity`,
    method: "post",
    data: request,
  });
}
export function fluidProductivityIndex(request) {
  return Axios({// 0301-01--潜力分析-采液指数（模型计算）
    url: `${baseUrl}/dynamicAnalysis/fluidProductivityIndex`,
    method: "post",
    data: request,
  });
}
export function fluidProductivityIndexMeter(request) {
  return Axios({// 0301-01--潜力分析-米采液指数（模型计算）
    url: `${baseUrl}/dynamicAnalysis/fluidProductivityIndexMeter`,
    method: "post",
    data: request,
  });
}
//潜力分析
export function potential(request) {
  return Axios({// 0301-01-潜力分析-提液潜力（模型计算）
    url: `${baseUrl}/dynamicAnalysis/potential`,
    method: "post",
    data: request,
  });
}
export function reserveProducing(request) {
  return Axios({// 0301-01--潜力分析-储量动用（模型计算
    url: `${baseUrl}/dynamicAnalysis/reserveProducing`,
    method: "post",
    data: request,
  });
}
//措施推荐
export function measureRecommend(request) {
  return Axios({// 0301-01-措施推荐（模型计算）油井
    url: `${baseUrl}/dynamicAnalysis/measureRecommend`,
    method: "post",
    data: request,
  });
}
export function proWellDynamicAnalysisDetail(request) {
  return Axios({// 油井动态分析详细列表
    url: `${baseUrl}/dynamicAnalysis/proWellDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}
//===油藏动态管理/水井动态分析===//
//生产问题
export function layerVariationTrend(request) {
  return Axios({// 0302-01-生产问题-井层指标变化趋势
    url: `${baseUrl}/dynamicAnalysis/layerVariationTrend`,
    method: "post",
    data: request,
  });
}
export function layerInjectionStatus(request) {
  return Axios({// 0302-01-生产问题-井层注水工况
    url: `${baseUrl}/dynamicAnalysis/layerInjectionStatus`,
    method: "post",
    data: request,
  });
}
//超欠注原因分析
export function groundReason(request) {
  return Axios({// 0302-01-超欠注原因分析-地面原因
    url: `${baseUrl}/dynamicAnalysis/groundReason`,
    method: "post",
    data: request,
  });
}
export function wellBoreReason(request) {
  return Axios({// 0302-01--超欠注原因分析-井筒原因
    url: `${baseUrl}/dynamicAnalysis/wellBoreReason`,
    method: "post",
    data: request,
  });
}
export function layerReason(request) {
  return Axios({// 0302-01--超欠注原因分析-地层原因
    url: `${baseUrl}/dynamicAnalysis/layerReason`,
    method: "post",
    data: request,
  });
}
export function injectionClosed(request) {
  return Axios({// 0302-01--超欠注原因分析-停注恢复
    url: `${baseUrl}/dynamicAnalysis/injectionClosed`,
    method: "post",
    data: request,
  });
}
//措施推荐
export function injectionMeasureRecommend(request) {
  return Axios({// 0302-01--措施推荐 水井
    url: `${baseUrl}/dynamicAnalysis/injectionMeasureRecommend`,
    method: "post",
    data: request,
  });
}
export function injectionWellDynamicAnalysisDetail(request) {
  return Axios({//　0302-01-水井动态分析详细列表
    url: `${baseUrl}/dynamicAnalysis/injectionWellDynamicAnalysisDetail`,
    method: "post",
    data: request,
  });
}

//===============单井动态辅助分析================//

//0301(0302)-02-辅助分析-静态资料-小层平面图
export function microPhasePlot(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/microPhasePlot`,
    method: "post",
    data: request,
  });
}

//0301(0302)-03-辅助分析-静态资料-地震属性图
export function seismicAttributePlot(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/seismicAttributePlot`,
    method: "post",
    data: request,
  });
}

//0301(0302)-04-辅助分析-静态资料-沉积相图
export function depositionFaciesDiagram(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/depositionFaciesDiagram`,
    method: "post",
    data: request,
  });
}

//0301(0302)-05-辅助分析-静态资料-小层顶页面构造图
export function structureDiagram(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/structureDiagram`,
    method: "post",
    data: request,
  });
}

//0301(0302)-06-辅助分析-静态资料-测井曲线
export function loggingCurve(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/loggingCurve`,
    method: "post",
    data: request,
  });
}

//0301(0302)-07-辅助分析-静态资料-固井质量测井图
export function cementingQuality(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/cementingQuality`,
    method: "post",
    data: request,
  });
}

//0301(0302)-08-辅助分析-静态资料-随钻轨迹
export function drillingTrajectory(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/drillingTrajectory`,
    method: "post",
    data: request,
  });
}

//0301(0302)-09-辅助分析-静态资料-地震剖面图
export function seismicPlot(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/seismicPlot`,
    method: "post",
    data: request,
  });
}

//0301(0302)-10-辅助分析-静态资料-测井解释成果
export function loggingInterpretation(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/loggingInterpretation`,
    method: "post",
    data: request,
  });
}

//0301(0302)-11-辅助分析-静态资料-小层数据
export function microLayerData(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/microLayerData`,
    method: "post",
    data: request,
  });
}

//0301(0302)-12-辅助分析-静态资料-井斜数据
export function deviationData(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/deviationData`,
    method: "post",
    data: request,
  });
}

//0301(0302)-13-辅助分析-生产动态资料-生产数据
export function produceData(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/produceData`,
    method: "post",
    data: request,
  });
}

//0301(0302)-14-辅助分析-生产动态资料--井网图
export function wellNetDiagram(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/wellNetDiagram`,
    method: "post",
    data: request,
  });
}
//0301(0302)-15-辅助分析-生产动态资料--完井管状图
export function wellCompletionDiagram(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/wellCompletionDiagram`,
    method: "post",
    data: request,
  });
}
//0301(0302)-16-辅助分析-生产动态资料-作业井史
export function workingHistory(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/workingHistory`,
    method: "post",
    data: request,
  });
}
//0301(0302)-17-辅助分析-生产动态资料-射孔数据
export function getComPerfInterval(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/getComPerfInterval`,
    method: "post",
    data: request,
  });
}
//0301(0302)-18-辅助分析-生产动态资料-单井基本信息
export function wellBaseInfo(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/wellBaseInfo`,
    method: "post",
    data: request,
  });
}
//0301(0302)-19-辅助分析-动态监测资料-压力测试
export function pressure(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/pressure`,
    method: "post",
    data: request,
  });
}
//0301(0302)-20-辅助分析-动态监测资料-产液剖面
export function outProfileLoggingInterpretation(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/outProfileLoggingInterpretation`,
    method: "post",
    data: request,
  });
}
//0301(0302)-21-辅助分析-动态监测资料-饱和度测井
export function saturationLoggingInterpretation(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/saturationLoggingInterpretation`,
    method: "post",
    data: request,
  });
}
//0301(0302)-22-辅助分析-动态监测资料-化验数据
export function testReport(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/testReport`,
    method: "post",
    data: request,
  });
}
//0301(0302)-23-辅助分析-动态监测资料-试井报告
export function testWellReport(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/testWellReport`,
    method: "post",
    data: request,
  });
}
//0301-24-辅助分析-动态监测资料-分层测试数据
export function divLayerTestData(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/divLayerTestData`,
    method: "post",
    data: request,
  });
}
//0300-01-单井累产指标变化动态
export function wellProSumIndicatorVariation(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/wellProSumIndicatorVariation`,
    method: "post",
    data: request,
  });
}

//0300-02-单井日产指标变化动态
export function wellDailyIndicatorVariation(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/wellDailyIndicatorVariation`,
    method: "post",
    data: request,
  });
}
//0300-03-油田指标变化动态
export function oilFieldIndicatorVariation(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/oilFieldIndicatorVariation`,
    method: "post",
    data: request,
  });
}
//0300-04-曲线对比分析
export function chartComparationAnalysis(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/chartComparationAnalysis`,
    method: "post",
    data: request,
  });
}
export function findDynamicAnalysisUsingPOST(request) {
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/dynamicAnalysis`,
    method: "post",
    data: request,
  });
}

export function getSectionWell(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/getSectionWell`,
    method: "post",
    data: request,
  });
}
export function queryAdjacentWellData({ wellId } = {}) {
    return Axios({
        url: `${baseUrl}/oilAnalysisReportController/queryAdjacentWellData?wellId=${ wellId || "" }`,
        method: "get",
    });
}

export function queryEvaluationWaterInjCount({ assetCode ,date,ogfId , reservoirUnitId, wellId} = {},) {
    return Axios({
        url: `${baseUrl}/evaluationWaterInjCount/queryEvaluationWaterInjCount?assetCode=${ assetCode || "" }&date=${ date || "" }&ogfId=${ ogfId || "" }&reservoirUnitId=${ reservoirUnitId || "" }&wellId=${ wellId || "" }`,
        method: "get",
    });
}

export function getLayerWell(request){
  return Axios({
    url: `${baseUrl}/dynamicAnalysis/getLayerWell`,
    method: "post",
    data: request,
  });
}