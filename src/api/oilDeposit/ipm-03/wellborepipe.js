import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm03/api" : "/ipm03/api"
export function getIsoline() {
  return Axios({
    url: `${baseUrl}/WellBorePipe/getIsoline`,
    method: "get",
  });
}
