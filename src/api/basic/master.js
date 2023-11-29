import request from '@/utils/request'
const masterUrl = process.env.NODE_ENV == "production" ? "/omc003d" : "/omc003d"

export function fetchPlatforms(data) {
    return request({
        url: `${masterUrl}/fetchPlatforms`,
        method: "post",
        data
    });
}
export function QueryPlatformDetail(data) {
    return request({
        url: `${masterUrl}/QueryPlatformDetail`,
        method: "post",
        data
    });
}

export function queryOilAndGasFieldQueryPositionDetail(data) {
    return request({
        url: `${masterUrl}/queryOilAndGasFieldQueryPositionDetail`,
        method: "post",
        data
    });
}

export function userListByUserNames(data) {
    return request({
        url: `${masterUrl}/system/syncData/userListByUserNames`,
        method: "post",
        data
    });
}
export function QueryBlockDetail(data) {
    return request({
        url: `${masterUrl}/QueryBlockDetail`,
        method: "post",
        data
    });
}
export function QueryWellDetail(data) {
    return request({
        url: `${masterUrl}/QueryWellDetail`,
        method: "post",
        data,
    });
}
export function QueryOgfDetail(data) {
    return request({
        url: `${masterUrl}/QueryOgfDetail`,
        method: "post",
        data,
    });
}