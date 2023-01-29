import { postAction, getAction } from "../../process/api/manage";

// 角色管理
const addRole = (params) => postAction("/sys/role/add", params);
const editRole = (params) => postAction("/sys/role/edit", params);
// const getRoleList = (params)=>getAction("/sys/role/list",params);
// const deleteRole = (params)=>deleteAction("/sys/role/delete",params);
// const deleteRoleList = (params)=>deleteAction("/sys/role/deleteBatch",params);
const checkRoleCode = (params) => getAction("/sys/role/checkRoleCode", params);
const queryall = (params?) => getAction("/sys/role/queryall", params);

// 用户管理
const addUser = (params) => postAction("/sys/user/add", params);
const editUser = (params) => postAction("/sys/user/edit", params);
const queryUserRole = (params) => getAction("/sys/user/queryUserRole", params);
const getUserList = (params) => getAction("/sys/user/list", params);
const getRecentList = () => getAction("/flow/task/recent-selection");
// const deleteUser = (params)=>deleteAction("/sys/user/delete",params);
// const deleteUserList = (params)=>deleteAction("/sys/user/deleteBatch",params);
const frozenBatch = (params) => postAction("/sys/user/frozenBatch", params);
// 验证用户是否存在
const checkOnlyUser = (params) => getAction("/sys/user/checkOnlyUser", params);
// 改变密码
const changPassword = (params) => postAction("/sys/user/changPassword", params);

// 权限管理
const addPermission = (params) => postAction("/sys/permission/add", params);
const editPermission = (params) => postAction("/sys/permission/edit", params);
const getPermissionList = (params) => getAction("/sys/permission/list", params);
/* update_begin author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
const getSystemMenuList = (params) => getAction("/sys/permission/getSystemMenuList", params);
const getSystemSubmenu = (params) => getAction("/sys/permission/getSystemSubmenu", params);
/* update_end author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */

// const deletePermission = (params)=>deleteAction("/sys/permission/delete",params);
// const deletePermissionList = (params)=>deleteAction("/sys/permission/deleteBatch",params);
const queryTreeList = (params) => getAction("/sys/permission/queryTreeList", params);
const queryTreeListForRole = (params) => getAction("/sys/role/queryTreeList", params);
const queryListAsync = (params) => getAction("/sys/permission/queryListAsync", params);
const queryRolePermission = (params) => getAction("/sys/permission/queryRolePermission", params);
const saveRolePermission = (params) => postAction("/sys/permission/saveRolePermission", params);
// const queryPermissionsByUser = (params)=>getAction("/sys/permission/queryByUser",params);
const queryPermissionsByUser = (params) => getAction("/sys/permission/getUserPermissionByToken", params);
const loadAllRoleIds = (params) => getAction("/sys/permission/loadAllRoleIds", params);
const getPermissionRuleList = (params) => getAction("/sys/permission/getPermRuleListByPermId", params);
const queryPermissionRule = (params) => getAction("/sys/permission/queryPermissionRule", params);

// 部门管理
const queryDepartTreeList = (params) => getAction("/sys/sysDepart/queryTreeList", params);
const queryAuditorDeptTree = (params) => getAction("/sys/sysDepart/queryTreeByIdParam", params);
const queryIdTree = (params) => getAction("/sys/sysDepart/queryIdTree", params);
const queryParentName = (params) => getAction("/sys/sysDepart/queryParentName", params);
const searchByKeywords = (params) => getAction("/sys/sysDepart/searchBy", params);
const deleteByDepartId = (params) => postAction("/sys/sysDepart/delete", params);

// 日志管理
// const getLogList = (params)=>getAction("/sys/log/list",params);
const deleteLog = (params) => postAction("/sys/log/delete", params);
const deleteLogList = (params) => postAction("/sys/log/deleteBatch", params);

// 数据字典
const addDict = (params) => postAction("/sys/dict/add", params);
const editDict = (params) => postAction("/sys/dict/edit", params);
// const getDictList = (params)=>getAction("/sys/dict/list",params);
const treeList = (params) => getAction("/sys/dict/treeList", params);
// const delDict = (params)=>deleteAction("/sys/dict/delete",params);
// const getDictItemList = (params)=>getAction("/sys/dictItem/list",params);
const addDictItem = (params) => postAction("/sys/dictItem/add", params);
const editDictItem = (params) => postAction("/sys/dictItem/edit", params);
// const delDictItem = (params)=>deleteAction("/sys/dictItem/delete",params);
// const delDictItemList = (params)=>deleteAction("/sys/dictItem/deleteBatch",params);

// 字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`, params);
export const getDictItemsByCode = (code) => getAction(`/sys/dict/getDictItems/${code}`).then(v => v.result);

// 系统通告
const doReleaseData = (params) => getAction("/sys/annountCement/doReleaseData", params);
const doReovkeData = (params) => getAction("/sys/annountCement/doReovkeData", params);
// 获取系统访问量
const getLoginfo = (params) => getAction("/sys/loginfo", params);
const getVisitInfo = (params) => getAction("/sys/visitInfo", params);
// 数据日志访问
// const getDataLogList = (params)=>getAction("/sys/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params) => getAction("/sys/user/queryUserByDepId", params);
// 根据部门code查询用户信息
const queryUserBydept = (params) => getAction("/sys/user/queryByOrgCodeForAddressSelector", { ...params, activitiSync: "1" });
// 查询用户角色表里的所有信息
const queryUserRoleMap = (params) => getAction("/sys/user/queryUserRoleMap", params);
// 重复校验
const duplicateCheck = (params) => getAction("/sys/duplicate/check", params);
// 加载分类字典
const loadCategoryData = (params) => getAction("/sys/category/loadAllData", params);
const getTreeAllDataByCode = (code) => getAction("/sys/category/loadTreeRoot", {
  async: false,
  pcode: code
}).then(v => v.result);
// 字典新方法
/**
 * get the quesiton types' tree list-new api
 * @param {*} needAll default: true; use fasle if it's needed
 */
const getTreeByCodeNew = (needAll) => getAction("/common/issuecategory/loadTreeRoot", {
  needAll: (typeof needAll !== "undefined") ? needAll : true
}).then(v => v.result);

// ---------------新添加方法开始----------------
// 我的消息
const getScoreRole = (params) => getAction("/tc/score/role", params);
// 我的消息
const getMessageList = (params) => getAction("/tc/message/management/list", params);
// 我的积分
const getIntegralList = (params) => getAction("/tc/user/additional/score/info", params);
// 个人信息
const getUserOhterInfo = (params) => getAction("/tc/user/other/info", params);
const editUserOhterInfo = (params) => postAction("/tc/user/other/info/edit", params);
const changeGroup = (params) => postAction("/tc/user/professional/category/relation/change", params);// 换组
const leaveGroup = (params) => postAction("/tc/user/professional/category/relation/leave", params);// 退组
const revokeApplication = (params) => getAction("/tc/user/professional/category/relation/revoke", params);// 退组
// 专业组信息
const getSigsInfo = (params) => getAction("/tc/user/professional/category/relation/info", params);
// 附加信息
const getAdditionalInfo = (params) => getAction("/tc/user/additional/score/info/extra", params).then(v => v.result);
const editAdditionalFile = (params) => postAction("/tc/user/additional/score/info/edit", params); // 删除附加信息
const addAdditionalFile = (params) => postAction("/tc/user/additional/score/info/add", params); // 添加附加信息
// 地点list
const getAddressList = (params) => getAction("/tc/address/management/list", params).then(v => v.result);
const saveAddressList = (params) => postAction("/tc/address/management/save", params);  // 新增
const editAddressList = (params) => postAction("/tc/address/management/edit", params); // 编辑/删除 delFlag-1
// 活动信息
const saveActivity = (params) => postAction("/tc/activity/save", params); // 新增/编辑
const getUserNames = (params) => getAction("/tc/activity/getUserNames", params).then(v => v.result); // 活动添加 组织者姓名模糊查询
const getActivityById = (params) => getAction("/tc/activity/queryById", params).then(v => v.result); // 查看活动
const saveParticipationActivity = (params) => postAction("/tc/activity/participation/save", params); // 报名活动
const cancelParticipationActivity = (params) => postAction("/tc/activity/participation/cancel", params); // 取消报名活动
const deleteParticipationActivity = (params) => postAction("/tc/activity/participation/delete", params); // 删除参加人员
const saveAttachments = (params) => postAction("/tc/activity/attachments/save", params); // 添加活动资料
const getActivityUserList = (params) => getAction("/tc/activity/participation/userList", params).then(v => v.result); // 参加人员
const updateActivityParticipation = (params) => postAction("/tc/activity/participation/update", params); // 确认人员
const saveActivityExperience = (params) => postAction("/tc/activity/experience/save", params); // 添加活动心得
const deleteActivityExperience = (params) => postAction("/tc/activity/experience/delete", params); // 删除活动心得
// 评分管理
const scoreSaveOrUpdate = (params) => postAction("/tc/score/detail/saveOrUpdate", params); // 评分
const additionalScoreSaveOrUpdate = (params) => postAction("/tc/user/additional/score/info/score", params); // 附加评分
const scoreQueryAll = (params) => getAction("/tc/score/detail/query", params); // 评分
const getUserActivities = (params) => getAction("/tc/activity/getUserActivities", params).then(v => v.result); // 查看活动

// 二级部门管理
const queryDepartPermission = (params) => getAction("/sys/permission/queryDepartPermission", params);
const saveDepartPermission = (params) => postAction("/sys/permission/saveDepartPermission", params);
const queryTreeListForDeptRole = (params) => getAction("/sys/sysDepartPermission/queryTreeListForDeptRole", params);
const queryDeptRolePermission = (params) => getAction("/sys/sysDepartPermission/queryDeptRolePermission", params);
const saveDeptRolePermission = (params) => postAction("/sys/sysDepartPermission/saveDeptRolePermission", params);
const queryMyDepartTreeList = (params) => getAction("/sys/sysDepart/queryMyDeptTreeList", params);

// 单位签章
const addSignatureInfo = (params) => postAction("/common/seal/save", params); // 增加单位签章项

// 检查问题分类
const addProblemClassify = (params) => postAction("/common/issuecategory/save", params); // 增加问题分类
// ---------------新添加方法结束----------------
export {
  // imgView,
  // doMian,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  getRecentList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changPassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryAuditorDeptTree,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  queryUserBydept,
  queryUserRoleMap,
  duplicateCheck,
  queryTreeListForRole,
  getSystemMenuList,
  getSystemSubmenu,
  loadCategoryData,
  getTreeAllDataByCode,
  getTreeByCodeNew,
  // -----------新增方法-----
  getMessageList,
  getIntegralList,
  getUserOhterInfo,
  editUserOhterInfo,
  getSigsInfo,
  getAdditionalInfo,
  getAddressList,
  saveAddressList,
  editAddressList,
  saveActivity,
  editAdditionalFile,
  addAdditionalFile,
  getUserNames,
  getActivityById,
  saveParticipationActivity,
  deleteParticipationActivity,
  cancelParticipationActivity,
  changeGroup,
  leaveGroup,
  saveAttachments,
  getActivityUserList,
  updateActivityParticipation,
  saveActivityExperience,
  deleteActivityExperience,
  scoreSaveOrUpdate,
  getScoreRole,
  scoreQueryAll,
  getUserActivities,
  additionalScoreSaveOrUpdate,
  revokeApplication,
  queryDepartPermission,
  saveDepartPermission,
  queryTreeListForDeptRole,
  queryDeptRolePermission,
  saveDeptRolePermission,
  queryMyDepartTreeList,
  addSignatureInfo,
  addProblemClassify
};
