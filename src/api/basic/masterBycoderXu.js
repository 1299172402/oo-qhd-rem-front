import Axios from "@/utils/request";
const masterUrl = process.env.NODE_ENV == "production" ? "/omc003d" : "/omc003d";
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"
export function getuserListByUserNames(data) {
    return Axios({
        url: `${baseUrl}/omc003d/userListByUserNames`,
        method: "post",
        data
    });
}

export function getFieldListsDetail(data) {
    return Axios({
        url: `${baseUrl}/omc003d/QueryOgfDetail`,
        method: "post",
        data
    });
}
export function getblockData(data) {
    return Axios({
        url: `${baseUrl}/omc003d/QueryReservoirAnalyseUnit`,
        method: "post",
        data
    });
}
export function getWellData(data) {
    return Axios({
        url: `${baseUrl}/omc003d/QueryWellDetail`,
        method: "post",
        data
    });
}
