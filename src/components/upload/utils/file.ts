import axios, { download } from "@/utils/request";
import { responseWhitelist } from "./responseWhiteList";

/**
 * 根据全称获取文件名和文件后缀
 * @param fullPath 文件名，可能包含路径
 * @returns
 */
export function getFileNameAndExt(fullPath: string) {
  const fullName = fullPath.substr(fullPath.lastIndexOf("/") + 1);
  const index = fullName.lastIndexOf(".");
  return {
    name: fullName.slice(0, index),
    ext: fullPath.substr(index + 1)
  };
}

/**
 * 上传文件
 * @param data 上传的文件信息
 * @returns
 */
export function upload(data) {
  return axios({
    url: "/sys/common/upload",
    method: "post",
    headers: {
      "Content-type": "multipart/form-data"
    },
    data
  })
    .then(v => (v as any).message);
}

/**
 * 根据文件id下载文件
 * @param {*} id 文件id
 */
export function downFile(id) {
  return axios({
    url: `/sys/common/static/${id}`,
    method: "get",
    responseType: "blob"
  });
}
/**
 * 附件是否可预览
 * @param {*} attachmentId 文件id
 */
export function previewable(attachmentId) {
  return axios({
    url: `/sys/common/previewable/${attachmentId}`,
    method: "get"
  })
    .then(v => (v as any).result);
}

/**
 * 附件预览重试
 * @param {*} attachmentId 文件id
 */
export function retryPreview(attachmentId) {
  return axios({
    url: "/sys/common/retryPreview",
    method: "post",
    params: { attachmentId }
  })
    .then(v => (v as any).result);
}

/**
 * 附件预览
 * @param {*} attachmentId 文件id
 */
export function preview(attachmentId) {
  return axios({
    url: `/sys/common/preview/${attachmentId}`,
    method: "get",
    responseType: "blob"
  });
}

// 下载签到表
export function downFileExportXls(id: string) {
  return axios({
    url: `/tc/activity/participation/exportXls?activityId=${id}`,
    method: "get",
    responseType: "blob"
  });
}

/**
 * 用于下载文件，文件名通过 downloadfilename 返回
 * @param {*} url url
 * @param {*} data model 数据
 * @returns
 */
export function downloadTemplate(url, data) {
  // 设置respons白名单
  responseWhitelist.use(url, res => res);
  return axios({
    url,
    method: "post",
    responseType: "blob",
    data
  }).then(({ data: blobParts, headers }) => {
    download(blobParts, decodeURI(headers.downloadfilename), blobParts.type);
    // 清除白名单
    responseWhitelist.clear(url);
  });
}

/**
 * 将文件转为blob
 * @param {*} file 文件对象
 */
export function getImgUrl(file) {
  return Promise.resolve()
    .then(() => URL.createObjectURL(file));
}

export default {};