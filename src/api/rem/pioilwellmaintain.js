import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"
export function queryPioilWellInfo(data) {
  return request({
    url: `${baseUrl}/prodIntervalOilwell/queryPioilWellInfo`,
    method: "post",
    data
  });
}
export function addPINew(data) {
    return request({
        url: `${baseUrl}/prodIntervalOilwell/addPINew`,
        method: "post",
        data
    });
}

export function queryPiInfo(data) {
  return request({
    url: `${baseUrl}/prodIntervalOilwell/queryPiInfo`,
    method: "post",
    data  
  });
}

export function queryLnInfo(data) {
  return request({
    url: `${baseUrl}/prodIntervalOilwell/queryLnInfo`,
    method: "post",
    data
  });
}
export function upDataPiInfo(data) {
  return request({
    url: `${baseUrl}/prodIntervalOilwell/upPiInfo`,
    method: "post",
    data
  });
}
export function addDataPiInfo(data) {
  return request({
    url: `${baseUrl}/prodIntervalOilwell/addPiInfo`,
    method: "post",
    data
  });
}
export function deleteDataPiInfo(data) {
  return request({
    url: `${baseUrl}/prodIntervalOilwell/deletePiInfo`,
    method: "post",
    data
  });
}
export function queryPIcomInfo(data) {
    return request({
        url: `${baseUrl}/prodIntervalOilwell/queryPIcomInfo`,
        method: "post",
        data
    });
}