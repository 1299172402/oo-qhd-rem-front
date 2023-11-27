import Axios from "@/utils/request";
const masterUrl = process.env.NODE_ENV == "production" ? "/omc003d" : "/omc003d";
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"
export function getuserListByUserNames(data) {
    return Axios({
        url: `${masterUrl}/system/syncData/userListByUserNames`,
        method: "post",
        data
    });
}

export function getFieldListsDetail(data) {
    return Axios({
        url: `${masterUrl}/queryOperatorsCheckFieldListsDetail`,
        method: "post",
        data
    });
}
export function getblockData(params) {
    return Axios({
        url: `${baseUrl}/injectionProductionDeploy/getblockData`,
        method: "post",
        params: params
    }).then((res) => {
        return res.data
    });
}
