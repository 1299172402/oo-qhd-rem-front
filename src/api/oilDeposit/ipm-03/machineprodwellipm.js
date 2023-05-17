import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"
export function getBriefHistory(machineProdDto) {
  return Axios({
    url: `${baseUrl}/detail/getBriefHistory`,
    method: "post",
    data: machineProdDto,
  });
}
export function getDeviationInfo(data) {
  return Axios({
    url: `${baseUrl}/detail/getDeviationInfo`,
    method: "post",
    data
  });
}
export function getFormaEquipmentInfo(machineProdDto) {
  return Axios({
    url: `${baseUrl}/detail/getFormaEquipmentInfo`,
    method: "post",
    data: machineProdDto,
  });
}
export function getProduceParams() {
  return Axios({
    url: `${baseUrl}/detail/getProduceParams`,
    method: "get",
  });
}
export function getPumpBaseInfo(machineProdDto) {
  return Axios({
    url: `${baseUrl}/detail/getPumpBaseInfo`,
    method: "post",
    data: machineProdDto
  });
}
export function getPumpTraitInfo(machineProdDto) {
  return Axios({
    url: `${baseUrl}/detail/getPumpTraitInfo`,
    method: "post",
    data: machineProdDto
  });
}
export function getPvtInfo(machineProdDto) {
  return Axios({
    url: `${baseUrl}/detail/getPvtInfo`,
    method: "post",
    data: machineProdDto,
  });
}
export function getRealtimeData(realtimeDataDto) {
  return Axios({
    url: `${baseUrl}/detail/getRealtimeData`,
    method: "post",
    data: realtimeDataDto,
  });
}
export function getOilWellData(realtimeDataDto) {
  return Axios({
    url: `${baseUrl}/detail/getOilWellData`,
    method: "post",
    data: realtimeDataDto,
  });
}
export function getPumpData(realtimeDataDto) {
  return Axios({
    url: `${baseUrl}/detail/getPumpData`,
    method: "post",
    data: realtimeDataDto,
  });
}
export function downloadDynamicInfo(realtimeDataDto) {
  return Axios({
    url: `${baseUrl}/detail/downloadDynamicInfo`,
    method: "post",
    responseType: 'blob',
    data: realtimeDataDto,
  });
}
export function getWellLastData(singleWarnDto) {
  return Axios({
    url: `${baseUrl}/detail/getWellLastData`,
    method: "post",
    data: singleWarnDto,
  });
}
export function getMachineBaseInfo(data) {
  return Axios({
    url: `${baseUrl}/detail/getMachineBaseInfo`,
    method: "post",
    data,
  });
}

export  function getPitshaftImgPathList(data){
  return Axios({
    url: `${baseUrl}/detail/getPitshaftImgPathList?borepipeId=${data}`,
    method: "get",
  })
}