// 获取常用时间
import dayjs from "dayjs";

export const LAST_7_DAYS = [
  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  dayjs().subtract(1, "day").format("YYYY-MM-DD")
];

export const LAST_30_DAYS = [
  dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  dayjs().subtract(1, "day").format("YYYY-MM-DD")
];

// 参数：起始时间，终止时间；返回：起始时间到终止时间中间所有时间，以MM-DD集合输出；前提条件：假定你已经保证了startDate 小于endDate，且二者不相等
export function enumerateDaysBetweenDates(startDate, endDate) {
  const daysList = [];
  const sDate = dayjs(startDate);
  const eDate = dayjs(endDate);
  const diffNum = eDate.diff(sDate, "day");
  daysList.push(sDate.format("MM-DD"));
  for (let i = 1; i < diffNum; i++) {
    daysList.push(sDate.add(i, "day").format("MM-DD"));
  }
  daysList.push(eDate.format("MM-DD"));
  return daysList;
}

// 参数：YYYY-MM-DD日期集合；返回：maxDate:其中最大的日志，minDate：其中最小的日期
export function compareDate(list) {
  const departList = [];
  const dateList = {
    maxDate: "",
    minDate: ""
  };
  list.forEach(item => {
    departList.push(new Date(item).getTime());
  });

  dateList.maxDate = dayjs(Math.max(...departList)).format("YYYY-MM-DD");
  dateList.minDate = dayjs(Math.min(...departList)).format("YYYY-MM-DD");
  return dateList;
}

// 时间戳转换为YYYY-MM-DD hh:mm:ss
export function compareDateToS(data) {
  const dy = dayjs(data).format("YYYY-MM-DD HH:mm:ss");
  return dy;
}