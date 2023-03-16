import Axios from '@/utils/request'
//油藏管理-产量管理 REM-02 产量管理敏态服务接口

//06-当日关键事件（REM-02-05）
export function dailyMainEvent(request) {
  return Axios({
    url: `/rem02/api/outputManagement/dailyMainEvent`,
    method: "post",
    data: request,
  });
}
//03-产量跟踪分析
export function outputTracing(request) {
  return Axios({
    url: `/rem02/api/outputManagement/outputTracing`,
    method: "post",
    data: request,
  });
}
//01-油田产量跟踪预警分析统计图
export function outputTracingAnalysis(request) {
  return Axios({
    url: `/rem02/api/outputManagement/outputTracingAnalysis`,
    method: "post",
    data: request,
  });
}
//04-平台产量贡献分析（REM-02-03）
export function platformOutputContributeAnalysis(request) {
  return Axios({
    url: `/rem02/api/outputManagement/platformOutputContributeAnalysis`,
    method: "post",
    data: request,
  });
}
//02-获取归因分析表信息（REM-02-02）
export function reasonAnalysis(request) {
  return Axios({
    url: `/rem02/api/outputManagement/reasonAnalysis`,
    method: "post",
    data: request,
  });
}
//05-单井产量波动分析（REM-02-04）
export function wellOutputWaveAnalysis(request) {
  return Axios({
    url: `/rem02/api/outputManagement/wellOutputWaveAnalysis`,
    method: "post",
    data: request,
  });
}
//05-归因分析报告
export function reasonAnayLysisReport(request){
  return Axios({
    url: '/rem02/api/outputManagement/reasonAnaylysisReport',
    method: "post",
    data: request,
  });
}