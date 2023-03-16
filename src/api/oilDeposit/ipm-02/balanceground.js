import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm02/api" : "/ipm02/api"

export function getFlowInfo(platId) {
  return Axios({
    url: `${baseUrl}/balanceGround/balance/getFlowInfo?platId=${platId}`,
    method: "get",
  });
}
export function getAllowProd(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getAllowProd`,
    method: "post",
    data
  });
}
export function getCloseInfo(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getCloseInfo`,
    method: "post",
    data
  });
}
export function getInjWaterSummarize(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getInjWaterSummarize`,
    method: "post",
    data
  });
}
export function getOilWellLastData(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getOilWellLastData`,
    method: "post",
    data
  });
}
export function getPlatButtonInfo(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getPlatButtonInfo`,
    method: "post",
    data
  });
}
export function getProcessData(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getProcessData`,
    method: "post",
    data
  });
}
export function getWarnCount(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getWarnCount`,
    method: "post",
    data
  });
}
export function getWarnInfo(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/getWarnInfo`,
    method: "post",
    data
  });
}
export function getWarnProgramme(warnId) {
  return Axios({
    url: `${baseUrl}/balanceGround/getWarnProgramme?warnId=${warnId}`,
    method: "get",
  });
}
export function updateInjWaterComputation(injWaterCalculateDto) {
  return Axios({
    url: `${baseUrl}/balanceGround/updateInjWaterComputation`,
    method: "put",
    data: injWaterCalculateDto,
  });
}
export function updateWarnStatus({ warnId, warningStatus , handlePerson } = {}) {
  return Axios({
    url: `${baseUrl}/balanceGround/updateWarnStatus?warnId=${warnId || ""}&warningStatus=${warningStatus || ""}&handlePerson=${handlePerson || ""}`,
    method: "get",
  });
}
export function updateWarnRemark(data) {
  return Axios({
    url: `${baseUrl}/balanceGround/updateWarnRemark`,
    method: "post",
    data
  });
}
