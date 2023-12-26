import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/prm01/api" : "/prm01/api"

export function queryPlatformPob(data) {
    return request({
        url: `${baseUrl}/prm/rc/queryPlatformPob`,
        method: 'post',
        data,
    });
}
export function queryPOBProjectPeople(data) {
    return request({
        url: `${baseUrl}/prm/rc/queryPOBProjectPeople`,
        method: 'post',
        data,
    });
}
export function QueryAdministrationCenter(query) {
    return request({
        url: `${baseUrl}/queryAdministrationCenter`,
        method: 'get',
        params: query
    });
}
export function getPlatform(data) {
    return request({
        url: `${baseUrl}/queryProductionPlatformDetail`,
        method: 'get',
        params: data
    });
}