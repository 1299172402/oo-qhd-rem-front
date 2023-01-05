import axios from 'axios'
import { Message } from 'element-ui'
import { saveAs } from 'file-saver'
// import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { blobValidate } from "@/utils/commonSettings";
import proxy from '@/config/host';

const env = 'development';
const baseURL =  proxy[env].API

export default {
  zip(url, name) {
    const myUrl = baseURL + url 
    axios({
      method: 'get',
      myUrl,
      responseType: 'blob',
      headers: { 'Authorization': `Bearer ${this.$store.getters['user/token']}` }
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  saveAs(text, name, opts) {
    saveAs(text, name, opts);
  },
  async printErrMsg(data) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default
    Message.error(errMsg);
  }
}

