import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm03/api" : "/ipm03/api"
export function transformerHistoryDataDownload(request) {
  return Axios({
    url: `${baseUrl}/transformer/downloadHistoryData`,
    responseType: 'blob',
    method: "post",
    data: request,
  });
}
export function transformerStepDataDownload(request) {
  return Axios({
    url: `${baseUrl}/transformer/downloadStepData`,
    responseType: 'blob',
    method: "post",
    data: request,
  });
}
export function transformerDataDownload(request) {
  return Axios({
    url: `${baseUrl}/transformer/downloadTransformerData`,
    responseType: 'blob',
    method: "post",
    data: request,
  });
}
export function transformerDataByPage(request) {
  return Axios({
    url: `${baseUrl}/transformer/getTransformerDataPage`,
    method: "post",
    data: request,
  });
}
export function transformerHistoryData(request) {
  return Axios({
    url: `${baseUrl}/transformer/getTransformerHistoryData`,
    method: "post",
    data: request,
  });
}
export function transformerStepData(request) {
  return Axios({
    url: `${baseUrl}/transformer/getTransformerStepName`,
    method: "post",
    data: request,
  });
}
export function saveTransformerData(request) {
  return Axios({
    url: `${baseUrl}/transformer/saveTransformerData`,
    method: "post",
    data: request,
  });
}
