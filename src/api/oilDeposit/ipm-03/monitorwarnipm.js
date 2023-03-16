import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm03/api" : "/ipm03/api"
export function getWarnCountByPlat(warnCountDto) {
  return Axios({
    url: `${baseUrl}/warn/charts/getWarnCountByPlat`,
    method: "post",
    data: warnCountDto,
  });
}
export function getWarnCountByType(warnCountDto) {
  return Axios({
    url: `${baseUrl}/warn/charts/getWarnCountByType`,
    method: "post",
    data: warnCountDto,
  });
}
export function getWarnTypeRatio(warnCountDto) {
  return Axios({
    url: `${baseUrl}/warn/charts/getWarnTypeRatio`,
    method: "post",
    data: warnCountDto,
  });
}
export function getAllstatusCount(dto) {
  return Axios({
    url: `${baseUrl}/warn/getAllstatusCount`,
    method: "post",
    data: dto,
  });
}
export function getHistoryWarn(warningDetailDto) {
  return Axios({
    url: `${baseUrl}/warn/getHistoryWarn`,
    method: "post",
    data: warningDetailDto,
  });
}
export function getSingleWarnDetails(warnDetailDto) {
  return Axios({
    url: `${baseUrl}/warn/getSingleWarnDetails`,
    method: "post",
    data: warnDetailDto,
  });
}
export function getWarnDetails(warnDetailDto) {
  return Axios({
    url: `${baseUrl}/warn/getWarnDetails`,
    method: "post",
    data: warnDetailDto,
  });
}
export function getWarnStatusCount(dto) {
  return Axios({
    url: `${baseUrl}/warn/getWarnStatusCount`,
    method: "post",
    data: dto,
  });
}
export function updateWarnStatus(dto) {
  return Axios({
    url: `${baseUrl}/warn/updateWarnStatus`,
    method: "put",
    data: dto,
  });
}
export function downloadHistoryWarn(realtimeDataDto) {
  return Axios({
    url: `${baseUrl}/warn/downloadHistoryWarn`,
    method: "post",
    responseType: 'blob',
    data: realtimeDataDto,
  });
}
