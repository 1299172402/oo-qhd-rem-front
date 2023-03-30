import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function getPeoplePlan(data) {
  return request({
    url: `${baseUrl}/actionPlanManagement/peoplePlan`,
    method: "post",
    data
  });
}
export function getProjectPeople(data) {
  return request({
    url: `${baseUrl}/actionPlanManagement/projectPeople`,
    method: "post",
    data
  });
}
