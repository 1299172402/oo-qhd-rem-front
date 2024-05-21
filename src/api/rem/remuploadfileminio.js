import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function addRemUploadFileMinio(data) {
  return request({
    url: `${baseUrl}/RemUploadFileMinio/addRemUploadFileMinio`,
    method: "post",
    data
  });
}
export function deleteRemUploadFileMinio({ remUploadFileMinioId } = {}) {
  return request({
    url: `${baseUrl}/RemUploadFileMinio/deleteRemUploadFileMinio?remUploadFileMinioId=${ remUploadFileMinioId || "" }`,
    method: "delete",
  });
}
export function queryRemUploadFileMinio({ operationId, operationType, pageNum, pageSize, readOne } = {}) {
  return request({
    url: `${baseUrl}/RemUploadFileMinio/queryRemUploadFileMinio?operationId=${ operationId || "" }&operationType=${ operationType || "" }&pageNum=${ pageNum || "" }&pageSize=${ pageSize || "" }&readOne=${ readOne || "" }`,
    method: "get",
  });
}

export function wellGroupMainFileQuery({operationType} = {}) {
    return request({
        url: `${baseUrl}/fileUpload/wellGroupMainFileQuery?operationType=${ operationType || "" }`,
        method: "get",
    });
}

