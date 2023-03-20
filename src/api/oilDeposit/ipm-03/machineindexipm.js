import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm03/api" : "/ipm03/api"
export function getInjectRecycle(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getInjectRecycleMicro?platId=${platId}`,
    method: "post",
  });
}
export function getInjectWarn(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getInjectWarnMicro?platId=${platId}`,
    method: "post",
  });
}
export function getInjectWaterCount(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getInjectWaterCountMicro?platId=${platId}`,
    method: "post",
  });
}
export function getInjectWaterWarn() {
  return Axios({
    url: `${baseUrl}/machineIndex/getInjectWaterWarn`,
    method: "post",
  });
}
export function getMachineInject() {
  return Axios({
    url: `${baseUrl}/machineIndex/getMachineInject`,
    method: "post",
  });
}
export function getProdInfo(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getProdInfoMicro?platId=${platId}`,
    method: "post",
  });
}
export function getWarnInfo() {
  return Axios({
    url: `${baseUrl}/machineIndex/getWarnInfo`,
    method: "post",
  });
}
export function getWarnInfo(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getWarnInfoMicro?platId=${platId}`,
    method: "post",
  });
}
export function getWarnRecord() {
  return Axios({
    url: `${baseUrl}/machineIndex/getWarnRecord`,
    method: "post",
  });
}
export function getWarnRecord(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getWarnRecordMicro?platId=${platId}`,
    method: "post",
  });
}
export function getWellCount(platId) {
  return Axios({
    url: `${baseUrl}/machineIndex/getWellCountMicro?platId=${platId}`,
    method: "post",
  });
}
export function getWellCountProd() {
  return Axios({
    url: `${baseUrl}/machineIndex/getWellCountProd`,
    method: "post",
  });
}
