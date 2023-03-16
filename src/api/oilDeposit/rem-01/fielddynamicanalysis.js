import Axios from '@/utils/request'

export function areaDiagram(request) {
  return Axios({
        url: `/rem01/api/fieldDynamicAnalysisController/areaDiagram`,
      //url: `/static/IsoFrameCom/data/response.json`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-开发资料-开发调整方案
 * @param request
 * @returns {AxiosPromise}
 */
export function developmentDataDevelopmentAdjustmentPlan(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/developmentDataDevelopmentAdjustmentPlan`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-开发资料-开发方案
 * @param request
 * @returns {AxiosPromise}
 */
export function developmentDataDevelopmentPlan(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/developmentDataDevelopmentPlan`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-开发资料-储量报告
 * @param request
 * @returns {AxiosPromise}
 */
export function developmentDataReservesReport(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/developmentDataReservesReport`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-开发资料-井网图
 * @param request
 * @returns {AxiosPromise}
 */
export function developmentDataWellPattern(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/developmentDataWellPattern`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-开发资料-井网完善图
 * @param request
 * @returns {AxiosPromise}
 */
export function developmentDataWellPatternImprovementChart(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/developmentDataWellPatternImprovementChart`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-累积水油比分布图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataAccumulatedWaterOilRatioDistribution(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataAccumulatedWaterOilRatioDistribution`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-综合开发曲线
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataComprehensiveDevelopmentCurve(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataComprehensiveDevelopmentCurve`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-注水强度等值图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataContourMapOfInjectionIntensity(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataContourMapOfInjectionIntensity`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-累产油产水现状图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataCumulativeOilAndWaterProductionStatusMap(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataCumulativeOilAndWaterProductionStatusMap`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-每米累计产油量
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataCumulativeOilProductionPerMeter(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataCumulativeOilProductionPerMeter`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-米采指数
 * @param request
 * @returns {AxiosPromise}
 */
export function meterProIndicator(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/meterProIndicator`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-开发指标表*
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataDevelopmentIndexTable(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataDevelopmentIndexTable`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-开发现状表*
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataDevelopmentStatusTable(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataDevelopmentStatusTable`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-压差图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataDifferentialPressureDiagram(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataDifferentialPressureDiagram`,
    method: "post",
    data: request,
  });
}

/**
 * 0304-区块分析辅助-动态资料-渗透率等值图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataDynamicLiquidLevelContourMap(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataDynamicLiquidLevelContourMap`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-注采比分布图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataInjectionProductionRatioDistribution(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataInjectionProductionRatioDistribution`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-采液强度等值图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataIsogramOfFluidProductionStrength(request) {
  return Axios({
    url: '/rem01/api/fieldDynamicAnalysisController/dynamicDataIsogramOfFluidProductionStrength',
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-液油水等值线图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataOilWaterContourMap(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataOilWaterContourMap`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-液油水差值图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataOilWaterDifferenceIsogram(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataOilWaterDifferenceIsogram`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-剩余油分布
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataRemainingOilDistribution(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataRemainingOilDistribution`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-总压降图
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataTotalPressureDropDiagram(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataTotalPressureDropDiagram`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-动态资料-产量构成曲线
 * @param request
 * @returns {AxiosPromise}
 */
export function dynamicDataYieldComponentCurve(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/dynamicDataYieldComponentCurve`,
    method: "post",
    data: request,
  });
}
export function outputStatusAnalysis(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/outputStatusAnalysis`,
    method: "post",
    data: request,
  });
}
export function proInjectionBalanceAnalysis(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/proInjectionBalanceAnalysis`,
    method: "post",
    data: request,
  });
}
export function proStatusAnalysis(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/proStatusAnalysis`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-油藏基础数据
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataBasicReservoirData(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataBasicReservoirData`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-综合地质图
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataComprehensiveGeologicalMap(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataComprehensiveGeologicalMap`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-构造图
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataConstructureDaigram(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataConstructureDaigram`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-岩芯化验数据
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataCoreTestData(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataCoreTestData`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-有效厚度图
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataEffectiveThicknessMap(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataEffectiveThicknessMap`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-五敏分析数据
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataFiveSensitivityAnalysisData(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataFiveSensitivityAnalysisData`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-相渗透率曲线
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataPhasePermeabilityCurve(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataPhasePermeabilityCurve`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-孔隙度裂缝发育情况
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataPorosityAndFractureDevelopment(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataPorosityAndFractureDevelopment`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-油藏剖面图
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataReservoirProfile(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataReservoirProfile`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-砂层厚度图
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataSandThicknessMap(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataSandThicknessMap`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-沉积相、沉积微图像
 * @param request
 * @returns {AxiosPromise}
 */
export function reservoirDataSedimentaryFaciesAndSedimentaryMicroImage(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/reservoirDataSedimentaryFaciesAndSedimentaryMicroImage`,
    method: "post",
    data: request,
  });
}
export function stableBaseAnalysis(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/stableBaseAnalysis`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-流媒体资料-原油粘度
 * @param request
 * @returns {AxiosPromise}
 */
export function streamingMediaDataCrudeOilViscosity(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/streamingMediaDataCrudeOilViscosity`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-流媒体资料-高压物性分析
 * @param request
 * @returns {AxiosPromise}
 */
export function streamingMediaDataHighPressurePhysicalPropertyAnalysis(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/streamingMediaDataHighPressurePhysicalPropertyAnalysis`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-流媒体资料-水物性数据
 * @param request
 * @returns {AxiosPromise}
 */
export function streamingMediaDataWaterPhysicalPropertyData(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/streamingMediaDataWaterPhysicalPropertyData`,
    method: "post",
    data: request,
  });
}
export function wellGroups(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/wellGroups`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-渗透率分布图
 * @param request
 * @returns {AxiosPromise}
 */
export function permeabilityDistributionForField(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/permeabilityDistributionForField`,
    method: "post",
    data: request,
  });
}

/**
 * hwh
 * 0304-区块分析辅助-储层资料-连井剖面图
 * @param request
 * @returns {AxiosPromise}
 */
export function wellTieProfiles(request) {
  return Axios({
    url: `/rem01/api/fieldDynamicAnalysisController/wellTieProfiles`,
    method: "post",
    data: request,
  })
}