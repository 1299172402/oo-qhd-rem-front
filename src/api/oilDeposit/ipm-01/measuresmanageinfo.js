import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"


export function getDocDownloadUrl(data){
  return Axios({
    url: `${baseUrl}/measuresManage/getDocDownloadUrl?docUrl=${data.filePath}&docSl=${data.fileType}`,
    method: "get",
    responseType:'blob',
  })
}

export function getInjMeasuresEffectStatistics(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getInjMeasuresEffectStatistics`,
    method: "post",
    data
  });
}
export function getInjWaterMeasuresEffect(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getInjWaterMeasuresEffect`,
    method: "post",
    data
  });
}
export function getInjWaterWellProduction(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getInjWaterWellProduction`,
    method: "post",
    data
  });
}
export function getMeasureTypeTree(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getMeasureTypeTree`,
    method: "post",
    data
  });
}
export function getMeasuresConsManage(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getMeasuresConsManage`,
    method: "post",
    data
  });
}
export function getMeasuresSchemesDesign(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getMeasuresSchemesDesign`,
    method: "post",
    data
  });
}
export function getOilMeasures(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getOilMeasures`,
    method: "post",
    data
  });
}
export function getOilWellMeasuresEffect(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getOilWellMeasuresEffect`,
    method: "post",
    data
  });
}
export function getOilWellProduction(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getOilWellProduction`,
    method: "post",
    data
  });
}
export function getOilMeasuresReduce(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getOilMeasuresReduce`,
    method: "post",
    data
  });
}
export function getWaterMeasuresLayer(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getWaterMeasuresLayer`,
    method: "post",
    data
  });
}
export function getWaterMeasuresReduce(data) {
  return Axios({
    url: `${baseUrl}/measuresManage/getWaterMeasuresReduce`,
    method: "post",
    data
  });
}