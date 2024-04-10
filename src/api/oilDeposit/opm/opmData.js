import Axios from "@/utils/request";
import proxy from "@/config/host";
const env = import.meta.env.MODE || "development";
// const API_HOST = env === "mock" ? "/" : proxy[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截
const baseUrl = process.env.NODE_ENV == "production" ? "/opm-data" : "/opm-data";

export function wellFluxLastDayHour(data) {
  return Axios({
    url: `${baseUrl}/daily/wellFluxLastDayHour`,
    method: "post",
    data,
  });
}

export function getWellsHmiMetetData(wellName) {
  return Axios({
    // url: `/oo-qhd-prm-pom-agg/vms/getWellsHmiMetetData/${mName}`,
    url: `/oo-ppd-dpc-vms-model/vms/getWellHmiMetetData/${wellName}`,
    method: "get",
    headers: {
      showLoading: false,
      myToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoicWhkLXZtcyIsImV4cCI6MjM0MzQzNjY2MSwidXNlcklkIjoia3EifQ.seCIlaiaP340nDQX-hEptH-Qbx1IvyAg0L9GEEqCLZ4",
    },
  });
}
