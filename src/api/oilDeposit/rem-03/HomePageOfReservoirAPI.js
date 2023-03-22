/*
 * @Description: 油藏首页接口
 * @User: ggg
 * @Date: 2021-03-31 11:33:05
 */
import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export default {
  // 措施动态
  measureStatus(data){
    return Axios({
      url: `${baseUrl  }/oilFieldManagePlanController/measureStatus`,
      method: 'post',
      data
    });
  },
  // 动态事件
  dynamicEvent(data){
    return Axios({
      url: `${baseUrl  }/oilFieldManagePlanController/dynamicEvent`,
      method: 'post',
      data
    });
  },
  // 作业动态
  workingStatus(data){
    return Axios({
      url: `${baseUrl  }oilFieldManagePlanController/workingStatus`,
      method: 'post',
      data
    });
  },
  // 产量总计
  outputStat(data){
    return Axios({
      url: `${baseUrl  }/oilFieldManagePlanController/outputStat`,
      method: 'post',
      data
    });
  },
  // 查询措施统计饼图
  measureStatisticsPie(data){
    return Axios({
      url: `${baseUrl  }`,
      method: 'post',
      data
    });
  },
  // 查询年度计划运行折线图数据
  yearPlanRun(data){
    return Axios({
      url: `${baseUrl  }`,
      method: 'post',
      data
    });
  },
  // 

};