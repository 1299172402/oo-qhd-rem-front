import { Loading } from 'element-ui';
import axiosInstance from '@/utils/request';
import { saveAs } from 'file-saver'

const  exportFile = (interfacePath, data, fileName = `type_${new Date().getTime()}.xlsx`) => {
  const loading = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", });
  return axiosInstance({
    url: interfacePath,
    method: "post",
    data,
    responseType: "blob"
  }).then((res) => {
    const blob = new Blob([res], { type: 'application/octet-stream'})
    saveAs(blob,`${fileName}`)
    loading.close()
  })
}
export default exportFile