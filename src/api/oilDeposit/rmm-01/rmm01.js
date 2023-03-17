import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/rmm-01/api" : "/rmm-01/api"

export function getWidgetByAreaUser(params) {
  return Axios({
    url: `${baseUrl}/ws/rest/getWidgetByAreaUser`,
    method: "get",
    params,
  });
}
export function getPubAlarm(params) {
  return Axios({
    url: `${baseUrl}/alarm/getPubAlarm`,
    method: "get",
    params
  });
}
export function getPubAlarmByParam(params) {
  return Axios({
    url: `${baseUrl}/alarm/selectPubAlarmByParam`,
    method: "post",
    data: params
  });
}
export function addCameraInformation(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/addCameraInformation`,
    method: "post",
    data: cameraInformation,
  });
}
export function addCustomGroup(cameraUser) {
  return Axios({
    url: `${baseUrl}/rmm01/addCustomGroup`,
    method: "post",
    data: cameraUser,
  });
}
export function addRelationshipCameraMonitoringPoint(cameraMonitoring) {
  return Axios({
    url: `${baseUrl}/rmm01/addRelationshipCameraMonitoringPoint`,
    method: "post",
    data: cameraMonitoring,
  });
}
export function deleteCameraInformation(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteCameraInformation`,
    method: "post",
    data: cameraInformation,
  });
}
export function deleteCustomGroup(cameraUser) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteCustomGroup`,
    method: "post",
    data: cameraUser,
  });
}
export function deleteCustomGroupOne(cameraUser) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteCustomGroupOne`,
    method: "post",
    data: cameraUser,
  });
}
export function deleteRelationshipCameraMonitoringPoint(cameraMonitoring) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteRelationshipCameraMonitoringPoint`,
    method: "post",
    data: cameraMonitoring,
  });
}
export function distinctQueryIterm() {
  return Axios({
    url: `${baseUrl}/rmm01/distinctQueryIterm`,
    method: "post",
  });
}
export function editRelationshipCameraMonitoringPoint(cameraMonitoring) {
  return Axios({
    url: `${baseUrl}/rmm01/editRelationshipCameraMonitoringPoint`,
    method: "post",
    data: cameraMonitoring,
  });
}
export function getAlarmInformationByParam(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/getAlarmInformationByParam`,
    method: "post",
    data: alarmInformation,
  });
}
export function getAlarmInformationGroupStatus(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/getAlarmInformationGroupStatus`,
    method: "post",
    data: alarmInformation,
  });
}
export function getAlarmType(alarmType) {
  return Axios({
    url: `${baseUrl}/rmm01/getAlarmType`,
    method: "post",
    data: alarmType,
  });
}

export function getAlarmInformation(alarmInformationQurry) {
  return Axios({
    url: `${baseUrl}/rmm01/getAlarmInformation`,
    method: "post",
    data: alarmInformationQurry,
  });
}


export function getAlarmTypeList(alarmType) {
  return Axios({
    url: `${baseUrl}/rmm01/getAlarmTypeList`,
    method: "post",
    data: alarmType,
  });
}
export function getHikPreviewUrl(params) {
  return Axios({
    url: `${baseUrl}/rmm01/getHikPreviewUrl`,
    method: "get",
    params
  });
}
export function getHikPreviewUrlFlv(params) {
  return Axios({
    url: `${baseUrl}/rmm01/getHikPreviewUrlFlv`,
    method: "get",
    params
  });
}
export function getIntelligentDispensing(intelligentDispensing) {
  return Axios({
    url: `${baseUrl}/rmm01/getIntelligentDispensing`,
    method: "post",
    data: intelligentDispensing,
  });
}
export function getRealTimeInfoByParam(realtimeInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/getRealTimeInfoByParam`,
    method: "post",
    data: realtimeInfo,
  });
}
export function modifyCameraInformation(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/modifyCameraInformation`,
    method: "post",
    data: cameraInformation,
  });
}
export function queryAIAlarmModel(aiAlarmModel) {
  return Axios({
    url: `${baseUrl}/rmm01/queryAIAlarmModel`,
    method: "post",
    data: aiAlarmModel,
  });
}
export function queryAlarmInformation(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/queryAlarmInformation`,
    method: "post",
    data: alarmInformation,
  });
}
export function queryBasicDroneInformation(droneBaseinfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryBasicDroneInformation`,
    method: "post",
    data: droneBaseinfo,
  });
}
export function queryBasicRobotInformation(robotBaseInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryBasicRobotInformation`,
    method: "post",
    data: robotBaseInfo,
  });
}
// 获取智能识别新进报警
export function getNewAlarmOfAI(startDateStr) {
  return Axios({
    url: `${baseUrl}/alarm/getNewAlarmOfAI?startDateStr=${startDateStr}`,
    method: "get"
  });
}
export function queryBasicVideoAlarmInformation(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/queryBasicVideoAlarmInformation`,
    method: "post",
    data: alarmInformation,
  });
}
export function queryCameraInformation(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/queryCameraInformation`,
    method: "post",
    data: cameraInformation,
  });
}
export function queryCameraTree(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/queryCameraTree`,
    method: "post",
    data: cameraInformation,
  });
}
export function queryCustomGroup(cameraUser) {
  return Axios({
    url: `${baseUrl}/rmm01/queryCustomGroup`,
    method: "post",
    data: cameraUser,
  });
}
export function queryDroneParameterInformation(droneParameters) {
  return Axios({
    url: `${baseUrl}/rmm01/queryDroneParameterInformation`,
    method: "post",
    data: droneParameters,
  });
}
export function queryFlightRouteInformation(droneRoutes) {
  return Axios({
    url: `${baseUrl}/rmm01/queryFlightRouteInformation`,
    method: "post",
    data: droneRoutes,
  });
}
export function queryHandlingOfVideoAlarms(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/queryHandlingOfVideoAlarms`,
    method: "post",
    data: alarmInformation,
  });
}
export function queryPersonnelLocation(personnelPositionRecord) {
  return Axios({
    url: `${baseUrl}/rmm01/queryPersonnelLocation`,
    method: "post",
    data: personnelPositionRecord,
  });
}
export function queryRealTimeDeviceIndicators(realtimeInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRealTimeDeviceIndicators`,
    method: "post",
    data: realtimeInfo,
  });
}
export function queryRealTimeDynamicsOfDrones(droneRealtimeData) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRealTimeDynamicsOfDrones`,
    method: "post",
    data: droneRealtimeData,
  });
}
export function queryRealTimeIndicatorThreshold(alarmThreshold) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRealTimeIndicatorThreshold`,
    method: "post",
    data: alarmThreshold,
  });
}
export function queryRealTimeLayeredWaterInjection(injWellLayer) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRealTimeLayeredWaterInjection`,
    method: "post",
    data: injWellLayer,
  });
}
export function queryRelationshipCameraMonitoringPoint(cameraMonitoring) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRelationshipCameraMonitoringPoint`,
    method: "post",
    data: cameraMonitoring,
  });
}
export function queryRobotParameters(robotParameters) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRobotParameters`,
    method: "post",
    data: robotParameters,
  });
}
export function querySmartDispensingInformation(intelligentDispensing) {
  return Axios({
    url: `${baseUrl}/rmm01/querySmartDispensingInformation`,
    method: "post",
    data: intelligentDispensing,
  });
}
export function registerSmartDispensingInformation(intelligentDispensing) {
  return Axios({
    url: `${baseUrl}/rmm01/registerSmartDispensingInformation`,
    method: "post",
    data: intelligentDispensing,
  });
}
export function registerVideoAlarmHandlingInformation(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/registerVideoAlarmHandlingInformation`,
    method: "post",
    data: alarmInformation,
  });
}
export function updateAIAlarmModel(aiAlarmModel) {
  return Axios({
    url: `${baseUrl}/rmm01/updateAIAlarmModel`,
    method: "post",
    data: aiAlarmModel,
  });
}
export function updateAlarmInformation(alarmInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/updateAlarmInformation`,
    method: "post",
    data: alarmInformation,
  });
}
export function updateAlarmStatus(params) {
  return Axios({
    url: `${baseUrl}/rmm01/updateAlarmStatus`,
    method: "get",
    params,
  });
}
export function getCameraInformationByParams(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/getCameraInformationByParams`,
    method: "post",
    data: cameraInformation,
  });
}
export function showImage(fileBean) {
  return Axios({
    url: `${baseUrl}/showImage`,
    method: "post",
    data: fileBean,
  });
}

export function getDistinctMonitoringTarget(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/getDistinctMonitoringTarget`,
    method: "post",
    data: cameraInformation,
  });
}
export function getDistinctStatus(cameraInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/getDistinctStatus`,
    method: "post",
    data: cameraInformation,
  });
}
export function getDistinctCameraUser(cameraUser) {
  return Axios({
    url: `${baseUrl}/rmm01/getDistinctCameraUser`,
    method: "post",
    data: cameraUser,
  });
}
export function updateInitialAIAlarmModel(aiAlarmModel) {
  return Axios({
    url: `${baseUrl}/pc/updateInitialAIAlarmModel`,
    method: "post",
    data: aiAlarmModel,
  });
}
export function queryMonitorInformationTree(monitorInformation) {
  return Axios({
    url: `${baseUrl}/rmm01/queryMonitorInformationTree`,
    method: "post",
    data: monitorInformation,
  });
}
export function getequipmentCodeByCam(data) {
  return Axios({
    url: `${baseUrl}/rmm01/queryMonitorInformationTree`,
    method: "post",
    data,
  });
}
export function rcSeparateLayerInject(data) {
  return Axios({
    url: `${baseUrl}/rmm01/rcSeparateLayerInject`,
    method: "post",
    data,
  });
}

export function getMonitorInfomation(data) {
  return Axios({
    url: `${baseUrl}/rmm01/getMonitorInfomationByParam`,
    method: "post",
    data,
  });
}

export function getMonitorInfomationByParamAll(data) {
  return Axios({
    url: `${baseUrl}/rmm01/getMonitorInfomationByParamAll`,
    method: "post",
    data,
  });
}

export function getDcsProdWellValueByPlatform(data) {
  return Axios({
    url: `${baseUrl}/rmm01/getDcsProdWellValue`,
    method: "post",
    data,
  });
}


export function getTagValues(data) {
  return Axios({
    url: `${baseUrl}/rmm01/getTagValues`,
    method: "post",
    data,
  });
}
export function getDataValues(data) {
  return Axios({
    url: `${baseUrl}/rmm01/getDataValues`,
    method: "post",
    data,
  });
}

export function upload(data) {
  return Axios({
    url: `${baseUrl}/upload`,
    method: "post",
    data,
  });
}
export function download(data) {
  return Axios({
    url: `${baseUrl}/download`,
    method: "post",
    data,
    responseType: 'blob'
  });
}

/**
 * hwh
 * 根据平台标识，查询流程图树状列表
 * @param platformId 平台id
 * @returns {AxiosPromise}
 */
export function queryFlowChartTreeList(platformId){
  return Axios({
    url: `${baseUrl}/rmm01/queryFlowChartTreeList?platformId=${platformId}`,
    method: "get"
  });
}
export function cameraTaskReStart(platformId) {
  return Axios({
    url: `${baseUrl}/rmm01/cameraTaskReStart?platformId=${platformId}`,
    method: "get"
  });
}
export function queryDroneOperatorInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryDroneOperatorInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function editDroneOperatorInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/editDroneOperatorInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function addDroneOperatorInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/addDroneOperatorInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function deleteDroneOperatorInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteDroneOperatorInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function queryDroneOperatorTaskInformation(droneOperatorTaskInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryDroneOperatorTaskInformation`,
    method: "post",
    data: droneOperatorTaskInfo,
  });
}
export function editDroneOperatorTaskInformation(droneOperatorTaskInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/editDroneOperatorTaskInformation`,
    method: "post",
    data: droneOperatorTaskInfo,
  });
}
export function addDroneOperatorTaskInformation(droneOperatorTaskInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/addDroneOperatorTaskInformation`,
    method: "post",
    data: droneOperatorTaskInfo,
  });
}
export function queryDroneInformationInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryDroneInformationInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function editDroneInformationInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/editDroneInformationInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function addDroneInformationInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/addDroneInformationInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function deleteDroneInformationInformation(droneOperatorInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteDroneInformationInformation`,
    method: "post",
    data: droneOperatorInfo,
  });
}
export function queryDetailedDroneInformation(droneId) {
  return Axios({
    url: `${baseUrl}/rmm01/queryDetailedDroneInformation?droneId=${droneId}`,
    method: "get",
  });
}
export function editDetailedDroneInformation(droneDetailedInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/editDetailedDroneInformation`,
    method: "post",
    data: droneDetailedInfo,
  });
}
export function addDetailedDroneInformation(droneDetailedInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/addDetailedDroneInformation`,
    method: "post",
    data: droneDetailedInfo,
  });
}
export function deleteDetailedDroneInformation(droneDetailedInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteDetailedDroneInformation`,
    method: "post",
    data: droneDetailedInfo,
  });
}
export function deleteDetailedDroneInformationAll(droneDetailedInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteDetailedDroneInformationAll`,
    method: "post",
    data: droneDetailedInfo,
  });
}

/**
 * 获取实时数据点位信息
 * @param alarmPointTag
 * @returns {json}
 */
export function getAlarmPointTagByParams(alarmPointTag) {
  return Axios({
    url: `${baseUrl}/rmm01/getAlarmPointTagByParams`,
    method: "post",
    data: alarmPointTag,
  });
}

/**
 * 获取实时数据对应设备信息
 * @param alarmPointTag
 * @returns {json}
 */
export function getEquipmentByParams(alarmPointTag) {
  return Axios({
    url: `${baseUrl}/rmm01/getEquipmentByParams`,
    method: "post",
    data: alarmPointTag,
  });
}

/**
 * 获取实时数据对应设备信息
 * @param alarmPointTag
 * @returns {json}
 */
export function queryRealTimeIndicatorThresholdEquipmentByParams(alarmThresholdEquitment) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRealTimeIndicatorThresholdEquipmentByParams`,
    method: "post",
    data: alarmThresholdEquitment,
  });
}
/**
 * 获取实时数据对应设备清单信息
 * @param alarmPointTag
 * @returns {json}
 */
export function queryRealTimeIndicatorThresholdEquipment(alarmThresholdEquitment) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRealTimeIndicatorThresholdEquipment`,
    method: "post",
    data: alarmThresholdEquitment,
  });
}
/**
 * @author: ddhhh
 * @param {*} params
 * @return {*}
 * @description: 获取base64文件
 * @Date: 2021-08-10 18:46:58
 */
export function getFileOfMinio(params) {
  return Axios({
    url: `${baseUrl}/rmm01/getFileOfMinio`,
    method: "post",
    params,
    responseType:'blob'
  });
}
/**
 * @author: ddhhh
 * @param {*} params
 * @return {*}
 * @description: 获取base64文件
 * @Date: 2021-08-10 18:46:58
 */
export function getImageOfMinio(params) {
  return Axios({
    url: `${baseUrl}/rmm01/getImageOfMinio`,
    method: "post",
    params
  });
}
/**
 * 获取摄像头区域列表
 * @param alarmPointTag
 * @returns {json}
 */
export function selectCameraAreaInformationTreeList(data) {
  return Axios({
    url: `${baseUrl}/rmm01/selectCameraAreaInformationTreeList?platformId=${data}`,
    method: "get",
  });
}
/**
* 查询机器人信息
* @param droneInformationRequestParamInfo 参数
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function queryRobotInformation(droneInformationRequestParamInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/queryRobotInformation`,
    method: "post",
    data: droneInformationRequestParamInfo,
  });
}
/**
* 编辑机器人信息
* @param robotBaseInfo 机器人实体类
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function editRobotInformation(robotBaseInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/editRobotInformation`,
    method: "post",
    data: robotBaseInfo,
  });
}
/**
* 新增机器人信息
* @param robotBaseInfo 机器人实体类
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function addRobotInformation(robotBaseInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/addRobotInformation`,
    method: "post",
    data: robotBaseInfo,
  });
}
/**
* 删除机器人
* @param robotBaseInfo 机器人实体类
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function deleteRobotInformation(robotBaseInfo) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteRobotInformation`,
    method: "post",
    data: robotBaseInfo,
  });
}
/**
* 查询机器人详细信息
* @param robotId 机器人限制
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function queryDetailedRobotInformation(robotId) {
  return Axios({
    url: `${baseUrl}/rmm01/queryDetailedRobotInformation?robotId=${robotId}`,
    method: "get",
  });
}
/**
* 编辑机器人详细信息
* @param robotParameters 机器人参数表
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function editDetailedRobotInformation(robotParameters) {
  return Axios({
    url: `${baseUrl}/rmm01/editDetailedRobotInformation`,
    method: "post",
    data: robotParameters,
  });
}
/**
* 新增机器人详细信息
* @param robotParameters 机器人参数表
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function addDetailedRobotInformation(robotParameters) {
  return Axios({
    url: `${baseUrl}/rmm01/addDetailedRobotInformation`,
    method: "post",
    data: robotParameters,
  });
}
/**
* 删除机器人详细信息（ONE）
* @param  robotParameters
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function deleteDetailedRobotInformation(robotParameters) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteDetailedRobotInformation`,
    method: "post",
    data: robotParameters,
  });
}
/**
* 删除机器人详细信息参数（ALL）
* @param robotParameters
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/25
*/
export function deleteDetailedRobotInformationAll(robotParameters) {
  return Axios({
    url: `${baseUrl}/rmm01/deleteDetailedRobotInformationAll`,
    method: "post",
    data: robotParameters,
  });
}
/**
* 查询摄像头树
* @return 返回数据为已封装好的集合数据
* @Author Mr.Cao
* @Date 2021/8/30
*/
export function selectCameraTypeTreeList() {
  return Axios({
    url: `${baseUrl}/rmm01/selectCameraTypeTreeList`,
    method: "get",
  });
}
// 记录操作日志-记录菜单点击
export function insertMenuOperationSysLog(robotParameters) {
  return Axios({
    url: `${baseUrl}/pc/insertSysLog`,
    method: "post",
    data: robotParameters,
  });
}
// 发送新AI报警到报警中心
export function sendAIAlarmToALC(dataList) {
  return Axios({
    url: `${baseUrl}/rmm01/sendAIAlarmToALC`,
    method: "post",
    data: dataList,
  });
}
// 发送AI报警处置结果到报警中心
export function sendResultAIAlarmToALC(dataList) {
  return Axios({
    url: `${baseUrl}/rmm01/sendResultAIAlarmToALC`,
    method: "post",
    data: dataList,
  });
}

export function queryCwInfoByWellId(params) {
  return Axios({
    url: `${baseUrl}/rmm01/queryCwInfoByWellId`,
    method: "get",
    params,
  });
}

export function queryWellInfoByPlatInfo(params) {
  return Axios({
    url: `${baseUrl}/rmm01/queryWellInfoByPlatInfo`,
    method: "get",
    params,
  });
}

export function queryStateInfo(params) {
  return Axios({
    url: `${baseUrl}/rmm01/queryStateInfo`,
    method: "get",
    params,
  });
}

export function queryZnfzInfo(params) {
  return Axios({
    url: `${baseUrl}/rmm01/queryZnfzInfo`,
    method: "get",
    params,
  });
}