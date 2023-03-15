import Vue from "vue";
import moment from "dayjs";

Vue.filter("moment", (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => {
  if (!dataStr) {
    return "";
  }
  return moment(dataStr).format(pattern);
});

Vue.filter("ellipsis", (value, vlength = 25) => {
  if (!value) {
    return "";
  }
  if (value.length > vlength) {
    return `${value.slice(0, vlength)}...`;
  }
  return value;
});