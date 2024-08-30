import request from "@/utils/request";
const baseUrl = process.env.NODE_ENV == "production" ? "/api/v1" : "/api/v1"
const masterUrl = process.env.NODE_ENV == "production" ? "/omc003d" : "/omc003d"
export function queryDensityInfo(data){
    return request({
        url:`/api/v1/data_driven/algorithm/`,
        method : "post",
        data
    })
}

export function queryWellInfo(data){
    return request({
        url:`/api/v1/horizon_section_prediction/algorithm/`,
        method : "post",
        data
    })
}

export function userListByUserNames(data) {
    return request({
        url: `${masterUrl}/system/syncData/userListByUserNames`,
        method: "post",
        data,
    });
}

export function cabinDiv(data) {
    return request({
        url: `/api/v1/cabin_div/algorithm/`,
        method: "post",
        data,
    });
}

export function waterWarning(data) {
    return request({
        url: `/api/v1/water_warning/algorithm/`,
        method: "post",
        data,
    });
}