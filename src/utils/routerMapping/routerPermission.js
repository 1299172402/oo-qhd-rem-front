/**
 * import文件映射，用于路由页面引入
 * 注意：1.映射名称必须为后端返回的name
 * 2.路由name不能重名必须唯一
 */

const GenerateRouter = {
  "Index": () => import("@/pages/intelligentOilfield/homePage/index.vue"), // 组织机构管理
  "Organization": () => import("@/pages/intelligentOilfield/organizationStructure/index.vue"), // 组织机构管理
  "User": () => import("@/pages/intelligentOilfield/userManagement/index.vue"), // 用户管理
  "AuthRole/:userId": () => import("@/pages/intelligentOilfield/userManagement/authRole.vue"), // 分配角色
  "AppRole/:id": () => import("@/pages/intelligentOilfield/userManagement/appRole.vue"), // 应用配置角色
  "Roles": () => import("@/pages/intelligentOilfield/rolesManagement/index.vue"), // 角色管理
  "Menu": () => import("@/pages/intelligentOilfield/menuManagement/index.vue"), // 菜单管理
  "UserAccess": () => import("@/pages/intelligentOilfield/userAccess/index.vue"), // 用户访问
  "Notice": () => import("@/pages/intelligentOilfield/noticeManagement/index.vue"), // 通知通告管理
  "Message": () => import("@/pages/intelligentOilfield/messageCenter/index1.vue"), // 消息中心管理
  "Equipment": () => import("@/pages/intelligentOilfield/messageCenter/equipment/index.vue"), // 设备维护
  "MyFirstMenu": () => import("@/pages/intelligentOilfield/firstMenu/index.vue"), // 一级菜单管理
  "MySecondMenu": () => import("@/pages/intelligentOilfield/secondMenu/index.vue"), // 二级菜单管理
  //   "LinkMenu":()=>import('@/pages/intelligentOilfield/iframePage/index.vue'),// 内部链接
  "Dict": () => import("@/pages/intelligentOilfield/dictManagement/index.vue"), // 字典管理

  "MyThirdMenu1": () => import("@/pages/intelligentOilfield/thirdMenu/index.vue"), // 三级菜单-1管理
  "MyThirdMenu2": () => import("@/pages/intelligentOilfield/myThirdMenu/index.vue"), // 三级菜单-2管理

  //   "Index":()=>import('@/pages/intelligentOilfield/demo/index.vue'),
  "CodeGeneration": () => import("@/pages/intelligentOilfield/codeGeneration/index.vue"),

  "HandleBusinessList": () => import("@/pages/common/handleBusinessList/index.vue"),
  "DoneBusinessList": () => import("@/pages/common/doneBusinessList/index.vue"),
  "MessageLog": () => import("@/pages/intelligentOilfield/messageCenter/index.vue"),
  "MessageSubject": () => import("@/pages/intelligentOilfield/messageCenter/messageConfig/index.vue"),
  "DemoIndex": () => import("@/pages/intelligentOilfield/demo/index.vue"),
  "DemoIndex2": () => import("@/pages/intelligentOilfield/demo/index2.vue"),
  "DemoIndex3": () => import("@/pages/intelligentOilfield/demo/index3.vue"),
  "DemoIndex5": () => import("@/pages/intelligentOilfield/demo/index5.vue"),
  "DragPanel": () => import("@/pages/intelligentOilfield/demo/demo3.vue"),
  "StatisticalExample": () => import("@/pages/statistical/index.vue"),
  "SystemAccess": () => import("@/pages/statistical/components/systemAccess.vue"),

  // 20230925添加路由映射
  "Density": () => import("@/pages/rem/basic/densityMaintenance/index.vue"),
  "Reserves": () => import("@/pages/rem/basic/wellControlReserves/index.vue"),
  "CustomQuery": () => import("@/pages/rem/basic/customQuery/index.vue"),
  "WellGroup_Maintenance": () => import("@/pages/rem/basic/wellGroup_Maintenance/index.vue"),

  "Developmenthistory": () => import("@/pages/rem/developStatus/developmenthistory.vue"),
  "DevelopmentTrendAnalysis": () => import("@/pages/rem/developStatus/developmentTrendAnalysis.vue"),
  "DevelopmentWarningCapacity": () => import("@/pages/rem/developStatus/developmentWarningCapacity.vue"),
  "developmaenWamingter": () => import("@/pages/rem/developStatus/developmentWarning/developmaenWamingter.vue"),
  "radioValue": () => import("@/pages/rem/developStatus/developmentWarning/radioValue.vue"),
  "developmaenWamingterOne": () => import("@/pages/rem/developStatus/developmentWarning/developmaenWamingterOne.vue"),
  "WarningDisposeOil": () => import("@/pages/rem/developStatus/warningDisposeOil.vue"),
  "WarningDisposeWater": () => import("@/pages/rem/developStatus/warningDisposeWater.vue"),
  "DevelopmentEffectEvaluation": () => import("@/pages/rem/developStatus/developmentEffectEvaluation/index.vue"),
  
  "TechnicalIndexManagement": () => import("@/pages/rem/devmentIndicators/technicalIndexManagement/index.vue"),
  "WaterInjectionIndexManagement": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/index.vue"),
  "AnnualInjection": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/annualInjection.vue"),
  "StratumPressure": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/stratumPressure.vue"),
  "WaterQuality": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/waterQuality.vue"),
  "SplitHole": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/splitHole.vue"),
  "WaterInjectionWell": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/waterInjectionWell.vue"),
  "DynamicMonitoring": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/dynamicMonitoring.vu"),
  "SplitWellTest": () => import("@/pages/rem/devmentIndicators/waterInjectionIndexManagement/splitWellTest.vue"),

  "OilAnalysisReport": () => import("@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/analysisReport.vue"),
  "attributtonAnalysis": () => import("@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/attributtonAnalysis.vue"),
  "OilAuxiliaryAnalysis": () => import("@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/index.vue"),
  "WaterAnalysisReport": () => import("@/pages/rem/performance/dynamicTracking/waterAuxiliaryAnalysis/analysisReport.vue"),
  "WaterAuxiliaryAnalysis": () => import("@/pages/rem/performance/dynamicTracking/waterAuxiliaryAnalysis/index.vue"),
  "WellGroupAnalysisReport": () => import("@/pages/rem/performance/dynamicTracking/wellGroupAnalysisAssistant/analysisReport.vue"),
  "WellGroupAnalysisAssistant": () => import("@/pages/rem/performance/dynamicTracking/wellGroupAnalysisAssistant/index.vue"),
  "BlockAnalysisReport": () => import("@/pages/rem/performance/dynamicTracking/blockAnalysisAided/analysisReport.vue"),
  "BlockAnalysisAided": () => import("@/pages/rem/performance/dynamicTracking/blockAnalysisAided/index.vue"),
  "/dynamicManagement/remHome": () => import("@/pages/rem/home/remHome/index.vue"),
  
  "Linkage": () => import("@/pages/rem/home/linkage/index.vue"),
  "Oilexhibition": () => import("@/pages/rem/home/reservoirDisplay/oilexhibition.vue"),
  "Worker": () => import("@/pages/rem/home/reservoirDisplay/worker.vue"),
  "Director": () => import("@/pages/rem/home/reservoirDisplay/director.vue"),
  "Leader": () => import("@/pages/rem/home/reservoirDisplay/leader.vue"),
  "shutdownDetection": () => import("@/pages/rem/home/reservoirDisplay/shutdownDetection.vue"),
  "oilEventDetail": () => import("@/pages/rem/home/reservoirDisplay/detailPage/oilEventDetail.vue"),
  "problemWellStatistics": () => import("@/pages/rem/home/reservoirDisplay/table/problemWellStatistics.vue"),

  "Modelconfig": () => import("@/pages/rem/modelConfiguration/modelconfig.vue"),
  "ModelOperate": () => import("@/pages/rem/modelConfiguration/modelOperate.vue"),
  
  "MediumLongTermPlanning": () => import("@/pages/rem/plan/mediumLongTermPlanning/index.vue"),
  "AnnualPlan": () => import("@/pages/rem/plan/annualPlan/index.vue"),
  "WaterInjectionVolumeDetail": () => import("@/pages/rem/plan/annualPlan/waterInjectionVolume/detail.vue"),
  "MeasureManagement": () => import("@/pages/rem/plan/measureManagement/index.vue"),
  "MeasureEffectTracking": () => import("@/pages/rem/plan/measureManagement/measureEffectTracking.vue"),
  "PersonnelMeasures": () => import("@/pages/rem/plan/measureManagement/personnelMeasures.vue"),
  "planmessage": () => import("@/pages/rem/plan/measureManagement/components/planmessage.vue"),
  "TwoIncreasesOneDecrease": () => import("@/pages/rem/plan/twoIncreasesOneDecrease/index.vue"),

  "RecoveryEfficiencyIndex": () => import("@/pages/rem/recoveryEfficiency/index.vue"), // 采收率及可采储量预测

  "IndexHome": () => import("@/pages/rem/intelligence/indexHome.vue"),
  "IpmHome": () => import("@/pages/rem/home/ipmHome/index.vue"),
  "intelligenceDetail": () => import("@/pages/rem/intelligence/detail.vue"),
  "ProductionSplit": () => import("@/pages/rem/intelligence/productionSplit/index.vue"),
  "splitSection": () => import("@/pages/rem/intelligence/productionSplit/splitSection.vue"),
  "DividingCoefficient": () => import("@/pages/rem/intelligence/productionSplit/DividingCoefficient.vue"),
  "ConnectivityData": () => import("@/pages/rem/intelligence/connectivityData/connectivityData.vue"),
  "coefficientCalculates": () => import("@/pages/rem/intelligence/connectivityData/connectivityCoefficientCalculatesProperty.vue"),
  "Optimization": () => import("@/pages/rem/intelligence/optimization/index.vue"),
  "optimizationDetail": () => import("@/pages/rem/intelligence/optimization/view.vue"),
  "optimizationResult": () => import("@/pages/rem/intelligence/optimization/result.vue"),

  "FluctuationWarningAnalysis": () => import("@/pages/rem/yield/fluctuationWarningAnalysis/index.vue"),
  "ProductionOperationAnalysisReport": () => import("@/pages/rem/yield/fluctuationWarningAnalysis/productionOperationAnalysisReport.vue"),
  "AnalysisAbnormal": () => import("@/pages/rem/yield/fluctuationWarningAnalysis/analysisAbnormal.vue"),
  "StatisticalTableProduction": () => import("@/pages/rem/yield/fluctuationWarningAnalysis/statisticalTableProduction.vue"),
  "ProductionSituationPrediction": () => import("@/pages/rem/yield/productionSituationPrediction/index.vue"),

  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
  // "": () => import(""),
};

export default GenerateRouter;