// 门户-投影模式
import request from "@/utils/request";

// 查询报警信息【分页】
export function queryAlcAlarmByParam(data) {
  return request({
    url: `/gem001b/queryAlcAlarmByParam?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: "post",
    headers: {
      isAlarm: false
    },
    data
  });
}

// 查询报警等级
export function queryLevelSelectOptionList() {
  return request({
    url: "/gem001b/queryLevelSelectOptionList",
    method: "get"
  });
}

// 查询报警类型
export function queryAlcTypeSelectOptionList(data) {
  return request({
    url: `/gem001b/queryAlcTypeSelectOptionList?sourceId=${data}`,
    method: "post"
  });
}

// 报警信息-确认接口
export function updateAlcAlarmCheckTag(data) {
  return request({
    url: "/gem001b/updateAlcAlarmCheckTag",
    method: "post",
    data
  });
}

// 投影报警信息-堆叠柱状图表接口月统计【未调完】
export function alarmCountDailyStatistics(data) {
  return request({
    url: "/gem001b/alarmCountDailyStatistics",
    method: "post",
    data

  });
}

// 办公报警信息-折线图表接口日统计【未调完】
export function alarmMonthlyStatistics(data) {
  return request({
    url: "/gem001b/alarmCountMonthlyStatistics",
    method: "post",
    data
  });
}