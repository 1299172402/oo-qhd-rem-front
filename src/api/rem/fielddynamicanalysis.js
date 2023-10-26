import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function areaDiagram(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/areaDiagram`,
    method: "post",
    data
  });
}
export function developmentDataDevelopmentAdjustmentPlan(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/developmentDataDevelopmentAdjustmentPlan`,
    method: "post",
    data
  });
}
export function developmentDataDevelopmentPlan(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/developmentDataDevelopmentPlan`,
    method: "post",
    data
  });
}
export function developmentDataReservesReport(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/developmentDataReservesReport`,
    method: "post",
    data
  });
}
export function developmentDataWellPattern(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/developmentDataWellPattern`,
    method: "post",
    data
  });
}
export function developmentDataWellPatternImprovementChart(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/developmentDataWellPatternImprovementChart`,
    method: "post",
    data
  });
}
export function dynamicDataAccumulatedWaterOilRatioDistribution(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataAccumulatedWaterOilRatioDistribution`,
    method: "post",
    data
  });
}
export function dynamicDataComprehensiveDevelopmentCurve(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataComprehensiveDevelopmentCurve`,
    method: "post",
    data
  });
}
export function dynamicDataContourMapOfInjectionIntensity(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataContourMapOfInjectionIntensity`,
    method: "post",
    data
  });
}
export function dynamicDataCumulativeOilAndWaterProductionStatusMap(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataCumulativeOilAndWaterProductionStatusMap`,
    method: "post",
    data
  });
}
export function dynamicDataCumulativeOilProductionPerMeter(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataCumulativeOilProductionPerMeter`,
    method: "post",
    data
  });
}
export function dynamicDataDevelopmentIndexTable(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataDevelopmentIndexTable`,
    method: "post",
    data
  });
}
export function dynamicDataDevelopmentStatusTable(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataDevelopmentStatusTable`,
    method: "post",
    data
  });
}
export function dynamicDataDifferentialPressureDiagram(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataDifferentialPressureDiagram`,
    method: "post",
    data
  });
}
export function dynamicDataDynamicLiquidLevelContourMap(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataDynamicLiquidLevelContourMap`,
    method: "post",
    data
  });
}
export function dynamicDataInjectionProductionRatioDistribution(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataInjectionProductionRatioDistribution`,
    method: "post",
    data
  });
}
export function dynamicDataIsogramOfFluidProductionStrength(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataIsogramOfFluidProductionStrength`,
    method: "post",
    data
  });
}
export function dynamicDataOilWaterContourMap(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataOilWaterContourMap`,
    method: "post",
    data
  });
}
export function dynamicDataOilWaterDifferenceIsogram(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataOilWaterDifferenceIsogram`,
    method: "post",
    data
  });
}
export function dynamicDataRemainingOilDistribution(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataRemainingOilDistribution`,
    method: "post",
    data
  });
}
export function dynamicDataTotalPressureDropDiagram(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataTotalPressureDropDiagram`,
    method: "post",
    data
  });
}
export function dynamicDataYieldComponentCurve(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/dynamicDataYieldComponentCurve`,
    method: "post",
    data
  });
}
export function fetchWellGroupEvaluationResult(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/fetchWellGroupEvaluationResult`,
    method: "post",
    data
  });
}
export function meterProIndicator(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/meterProIndicator`,
    method: "post",
    data
  });
}
export function outputStatusAnalysis(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/outputStatusAnalysis`,
    method: "post",
    data
  });
}
export function permeabilityDistributionForField(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/permeabilityDistributionForField`,
    method: "post",
    data
  });
}
export function proInjectionBalanceAnalysis(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/proInjectionBalanceAnalysis`,
    method: "post",
    data
  });
}
export function proStatusAnalysis(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/proStatusAnalysis`,
    method: "post",
    data
  });
}
export function reservoirDataBasicReservoirData(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataBasicReservoirData`,
    method: "post",
    data
  });
}
export function reservoirDataComprehensiveGeologicalMap(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataComprehensiveGeologicalMap`,
    method: "post",
    data
  });
}
export function reservoirDataConstructureDaigram(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataConstructureDaigram`,
    method: "post",
    data
  });
}
export function reservoirDataCoreTestData(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataCoreTestData`,
    method: "post",
    data
  });
}
export function reservoirDataEffectiveThicknessMap(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataEffectiveThicknessMap`,
    method: "post",
    data
  });
}
export function reservoirDataFiveSensitivityAnalysisData(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataFiveSensitivityAnalysisData`,
    method: "post",
    data
  });
}
export function reservoirDataPhasePermeabilityCurve(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataPhasePermeabilityCurve`,
    method: "post",
    data
  });
}
export function reservoirDataPorosityAndFractureDevelopment(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataPorosityAndFractureDevelopment`,
    method: "post",
    data
  });
}
export function reservoirDataReservoirProfile(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataReservoirProfile`,
    method: "post",
    data
  });
}
export function reservoirDataSandThicknessMap(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataSandThicknessMap`,
    method: "post",
    data
  });
}
export function reservoirDataSedimentaryFaciesAndSedimentaryMicroImage(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/reservoirDataSedimentaryFaciesAndSedimentaryMicroImage`,
    method: "post",
    data
  });
}
export function stableBaseAnalysis(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/stableBaseAnalysis`,
    method: "post",
    data
  });
}
export function streamingMediaDataCrudeOilViscosity(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/streamingMediaDataCrudeOilViscosity`,
    method: "post",
    data
  });
}
export function streamingMediaDataHighPressurePhysicalPropertyAnalysis(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/streamingMediaDataHighPressurePhysicalPropertyAnalysis`,
    method: "post",
    data
  });
}
export function streamingMediaDataWaterPhysicalPropertyData(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/streamingMediaDataWaterPhysicalPropertyData`,
    method: "post",
    data
  });
}
export function wellGroups(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/wellGroups`,
    method: "post",
    data
  });
}
export function wellTieProfiles(data) {
  return request({
    url: `${baseUrl}/fieldDynamicAnalysisController/wellTieProfiles`,
    method: "post",
    data
  });
}
