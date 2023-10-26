
import { axios } from "../../testRequest";
import store from "@/store";

const core = () => {
  const headerCondition = store.getters.filterCondition;
  return {
    "SW-GLOBAL-SEARCH-FILTER": headerCondition
  };
};

export function postAction(url, parameter) {
  return axios({
    headers: core(),
    url,
    method: "post",
    data: parameter
  });
}

export function getAction(url, parameter, other) {
  return axios({
    headers: core(),
    url,
    method: "get",
    params: parameter,
    ...other
  });
}