
import { postAction } from "@/api/common/manage";
import actionType from "./ActionType";

const BASE_URL = "/system/bizFlow";

export const startApi = (BusinessType, data?) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.START}`;
  return postAction(url, data);
};

export const submitApi = <T>(BusinessType: string, data: T) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.SUBMIT}`;
  return postAction(url, data);
};

const completeApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.COMPLETE}`;
  return postAction(url, data);
};

const rejectApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.REJECT}`;
  return postAction(url, data);
};

const terminateApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.TERMINATEPROCESSINSTANCE}`;
  return postAction(url, data);
};

export const modelApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.Model}`;
  return postAction(url, data).then(v => v.data);
};

const delegateApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.DELEGATE}`;
  return postAction(url, data);
};

const resolveApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.RESOLVE}`;
  return postAction(url, data);
};

export const claimApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.CLAIM}`;
  return postAction(url, data);
};

const saveDataApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.SAVEDATA}`;
  return postAction(url, data);
};

const getDocApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.GETDOC}`;
  return postAction(url, data);
};

const restartSubmitApi = (BusinessType, data) => {
  const url = `${BASE_URL}/${BusinessType}/${actionType.RESTARTSUBMIT}`;
  return postAction(url, {}, data);
};

export const actionApi = (ActionType, BusinessType, data) => {
  switch (ActionType) {
    case actionType.START:
      return startApi(BusinessType, data);
    case actionType.SUBMIT:
      return submitApi(BusinessType, data);
    case actionType.COMPLETE:
      return completeApi(BusinessType, data);
    case actionType.REJECT:
      return rejectApi(BusinessType, data);
    case actionType.TERMINATEPROCESSINSTANCE:
      return terminateApi(BusinessType, data);
    case actionType.Model:
      return modelApi(BusinessType, data);
    case actionType.DELEGATE:
      return delegateApi(BusinessType, data);
    case actionType.RESOLVE:
      return resolveApi(BusinessType, data);
    case actionType.SAVEDATA:
      return saveDataApi(BusinessType, data);
    case actionType.GETDOC:
      return getDocApi(BusinessType, data);
    case actionType.RESTARTSUBMIT:
      return restartSubmitApi(BusinessType, data);
    default:
      return Promise.resolve();
  }
};