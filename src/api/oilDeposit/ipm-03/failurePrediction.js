import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm03/api" : "/ipm03/api"
export function faultPrediction(params) {
  return Axios({
    url: `${baseUrl}/forecast/prediction/faultPrediction`,
    method: "post",
    data: params
  });
}
export function findBreakHistory(params) {
    return Axios({
      url: `${baseUrl}/forecast/prediction/findBreakHistory`,
      method: "post",
      data: params
    });
  }
  export function queryPumpInfoByWell(params) {
    return Axios({
      url: `${baseUrl}/forecast/pumpController/queryPumpInfoByWell`,
      method: "post",
      data: params
    });
  }
  export function queryDailyHistoryByTagname(params) {
    return Axios({
      url: `${baseUrl}/forecast/dailyData/queryDailyHistoryByTagname`,
      method: "post",
      data: params
    });
  }
  export function queryHealthSocrePrint(params) {
    return Axios({
      url: `${baseUrl}/forecast/healthScore/queryHealthSocrePrint`,
      method: "post",
      data: params
    });
  }

  export function insertForecast(params) {
    return Axios({
      url: `${baseUrl}/forecast/workoverInfo/insertForecast`,
      method: "post",
      data: params
    });
  }

  export function deleteForecast(params) {
    return Axios({
      url: `${baseUrl}/forecast/workoverInfo/deleteForecast`,
      method: "post",
      data: params
    });
  }

  
  export function loadForecast(params) {
    return Axios({
      url: `${baseUrl}/forecast/workoverInfo/loadForecast`,
      method: "post",
      data: params
    });
  }
    
  export function updateHistory(params) {
    return Axios({
      url: `${baseUrl}/forecast/workoverInfo/updateHistory`,
      method: "post",
      data: params
    });
  }

  export function getOneForecast(params) {
    return Axios({
      url: `${baseUrl}/forecast/workoverInfo/getOneForecast`,
      method: "post",
      data: params
    });
  }

  export function saveRule(params) {
    return Axios({
      url: `${baseUrl}/forecast/safeAlarm/saveRule`,
      method: "post",
      data: params
    });
  }

  export function copyRule(params) {
    return Axios({
      url: `${baseUrl}/forecast/safeAlarm/copyRule`,
      method: "post",
      data: params
    });
  }

  export function loadUserToken(params) {
    return Axios({
      url: `${baseUrl}/forecast${baseUrl}/forecast/loginuser/loadUserToken`,
      method: "post",
      data: params
    });
  }