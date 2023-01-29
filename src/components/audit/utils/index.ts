import { cloneDeep } from "lodash";

export interface User {
    userId: string,
    realname: string
}

export function getUsersInitDataFromStringField(val: string): User[] {
  let re = [];
  try {
    const user = val.split(";;");
    re = user.map(v => ({
      userId: v.split("-=-")[0] !== "0" && v.split("-=-")[0] || v.split("-=-")[1],
      realname: v.split("-=-")[1]
    }));
  } catch (e) {
    re = [];
  }
  return re;
}

/**
 * 根据任务审批信息判断当前节点的类型描述
 * @param {*} item 任务审批信息
 * @param {*} defaultText operation为其他值时返回的默认描述
 */
export function getActionDesc(item, defaultText?) {
  return item.operation === "5" && "发起申请" || item.operation === "1" && "通过" || item.operation === "0" && "退回" || item.operation === "3" && "待处理" || item.operation === "6" && "驳回" || defaultText;
}
/**
 * 验证必填项
 * @param {*} _this vue实例
 * @param {*} ref 要验证的form标记的ref名称
 */
export function getValidateFormResult(_this, ref) {
  return _this.$refs[ref].validate();
}

export function transformPathToName(path: string): string {
  return path.slice(1).replace(/:/g, "@").replace(/\//g, "-");
}

/**
 * 根据关键字将扁平结构组合成树形结构
 * @param {*} rawData 所有数据
 * @param {*} key 自己的关键字
 * @param {*} pKey 父级的关键字
 */
export function changeListToTree(rawData, key = "key", pKey = "parentId") {
  const map = {};
  let node;
  const entitiesList = [];
  let i;
  for (i = 0; i < rawData.length; i++) {
    map[rawData[i][key]] = rawData[i];
  }
  for (i = 0; i < rawData.length; i += 1) {
    node = rawData[i];
    if (node[pKey] !== null && map[node[pKey]]) {
      if (!map[node[pKey]].children) {
        map[node[pKey]].children = [];
      }
      map[node[pKey]].children.push(node);
    } else {
      entitiesList.push(node);
    }
  }
  return entitiesList;
}

/**
 * 过滤数据再组成树形结构
 * @param {*} listData 平行结构数据
 * @param {*} value 过滤值
 * @param {*} textField 数据过滤的属性
 */
export function filterTreeDict(listData, value, textField = "title") {
  return changeListToTree(cloneDeep(listData.filter(v => v[textField].indexOf(value) !== -1)));
}

export function generateList(treeData, pDeptFullName = "") {
  let dataList = [];
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    const {key} = node;
    const pName = pDeptFullName ? `${pDeptFullName  }-${  node.departName}` : node.departName;
    dataList.push({ key, title: node.title, parentId: node.parentId, deptFullName: pName, orgCode: node.orgCode });
    if (node.children) {
      dataList = [...dataList, ...generateList(node.children, pName)];
    }
  }
  return dataList;
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj === "object")) {
    return;
  }
  Object.keys(obj).forEach(key => {
    if (Object.hasOwnProperty.call(obj, key) && (obj[key] == null || obj[key] === undefined || obj[key] === "")) {
      delete obj[key];
    } 
  })
  return obj;
}

/**
 * 下拉数据过滤
 * @param {*} input
 * @param {*} option
 */
export function optionsFilter(input, option) {
  return (
    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
  );
}