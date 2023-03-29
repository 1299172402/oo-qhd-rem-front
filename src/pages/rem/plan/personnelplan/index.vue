<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">
        <el-form-item label="作业公司：">
          <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date" placeholder="年/月/日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="油田：">
          <el-select v-model="selectOilField" disabled>
            <el-option v-for="item in oilFields" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
            </el-option>
          </el-select>
        </el-form-item>
        <span class="f1">平台：</span>
        <el-select v-model="selectPlatform">
          <el-option v-for="item in platforms" :key="item.platFormId" :label="item.platName" :value="item.platFormId">
          </el-option>
        </el-select>
        <el-button size="medium" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="doSearch"
          >检索</el-button
        >
      </el-form> -->
    </headerSearch>
    <el-row :gutter="20">
      <el-col :span="12">
        <pagePanel headerTitle="平台人数对比" style="height: 200px">
           <Echart :chart-data="histogram"  height="100%"></Echart>
        </pagePanel>
      </el-col>
      <!-- <el-col :span="12">
        <pagePanel headerTitle="项目人数分布" style="height: calc(100% - 100px)">
          <Echart :chart-data="option" :events="events" height="100%"></Echart>
        </pagePanel>
      </el-col> -->
    </el-row>
    <pagePanel headerTitle="人员类型概况" style="height: calc(100% - 100px)">
      <el-table highlight :data="peoplelist" style="width: 100%" :summary-method="getSummaries" show-summary>
        <el-table-column prop="prodPlatFormName" label="平台" min-width="200px" align="center"> </el-table-column>
        <el-table-column prop="newsPapering" label="报务" min-width="80px" align="center"> </el-table-column>
        <el-table-column prop="mineStaff" min-width="120px" label="定员" align="center"> </el-table-column>
        <el-table-column prop="routineMaintenance" min-width="180px" label="常规维修" align="center"> </el-table-column>
        <el-table-column
          prop="conventionalOilAndGasWellOperation"
          min-width="180px"
          label="常规油水井作业"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="largeScaleEngineeringAndOperation"
          min-width="180px"
          label="大型工程及作业"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="logistics" min-width="80px" label="后勤" align="center"> </el-table-column>
        <el-table-column prop="others" min-width="80px" label="其他" align="center"> </el-table-column>
        <el-table-column
          prop="maintenanceAndRenovationOfFacilities"
          min-width="180px"
          label="设施维修改造"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="medicalMatters" min-width="80px" label="医务" align="center"> </el-table-column>
        <el-table-column prop="operationOfStimulationMeasures" label="增产措施作业" min-width="120px" align="center">
        </el-table-column>
        <el-table-column prop="littleSum" min-width="80px" label="小计" align="center"> </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>
<script>
// import echarts from 'echarts';
import Echart from '@/components/tools/Echarts/index.vue';
// import Echart from '@/components/tools/Echarts';
// import {
//   queryPlatformPob,
//   // queryPlatformPobCharts,
//   queryPOBProjectPeople,
// } from '@/api/prm-01/pipelinetransportationperformance.js';
// import { dailyList, getReloadOperating } from '@/api/pim-01/pim01.js';
/*import {
  getChemicals, getPlanType, getPlatforms,
} from "@/api/prm-01/commonmethod.js";*/
// import div from '@/components/tools/div';
// import { fetchOilFields, fetchPlatforms } from '@/api/rem-02/primaryinfo';
// echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
import { queryPlatformPob } from '@/api/prm/rc';
export default {
  components: {
    Echart,
  },
  data() {
    return {
      //单选下拉框 油田
      oilFields: [],
      //单选下拉框 平台
      platforms: [],
      //初始化选择平台
      selectPlatform: '',
      //初始化选择油田
      selectOilField: '',
      //时间段选择
      currentTime: [new Date().addDays(-30).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')],
      //时间选择
      endTime: new Date().addDays(-1).format('yyyy-MM-dd'),
      //分页
      page: 1,
      pageSize: 10,
      total: 0,
      events: [{ name: 'click' }],
      // ecahrts 高度
      chartHeight: '150px',
      // table高度
      tableHeight: 280,
      option: {},
      tableData1: [],
      peoplelist: [],
      tableData2: [
        {
          platform: 'CEPI',
          address: '-',
        },
        {
          platform: 'CEPJ',
          address: '-',
        },
        {
          platform: '合计',
          address: '-',
        },
      ],
      histogram: {
        tooltip: {
          show: true
        },
        legend: {
          left: 'left',
          padding: [5, 100],
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 10,
          itemGap: 40,
          data: ['定员人数', 'POB'],
          textStyle: {
            color: '#FFFFFF',
            fontSize: 14,
          }
        },
        grid: {
          top: 30,
          left: 40,
          right: 10,
          bottom: 30
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#8FA4CC',
              fontSize: 14,
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                //color: '#979797'
                color: 'rgba(255,255,255,.16)',
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#8FA4CC',
              fontSize: 14,
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#979797'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          }
        ],
        series: [{
          name: '定员人数',
          type: 'bar',
          barWidth: '12',
          data: [],
          itemStyle: {
          },
          /*showBackground: true,
          backgroundStyle: {
            color: 'rgba(143,164,204,0.2)',
          },*/
        }, {
          name: 'POB',
          type: 'bar',
          barWidth: '12',
          data: [],
          /*showBackground: true,
          backgroundStyle: {
            color: 'rgba(143,164,204,0.2)',
          },*/
        },
        ]
      },
    };
  },
  mounted() {
    //初始化下拉框数据
    // this.initData();
    // this.ageEchartData();
    this.getinfo();
  },
  methods: {
    getinfo() {
      let data = {
        endTime: '2023-03-27',
        oilFieldId: '3FC9A818F5BC43B88270DB80BBB3018F',
        pageNum: 1,
        pageSize: 10,
        platformId: '3FC9A818F5BC43B88270DB80BBB3018F',
      };
      queryPlatformPob(data).then((data) => {
        this.peoplelist = data.data;
        let list;
        list = data.data;
        let x = [];
        let y = [];
        let y1 = [];
        for (let i in list) {
          if (list.hasOwnProperty(i)) {
            if (list[i].prodPlatFormName === '渤海世纪') {
              //折线图
              x.push('FPSO');
              y.push(list[i].mineStaff); //waterTimeRate
              y1.push(list[i].littleSum);
            } else {
              //折线图
              x.push(list[i].prodPlatFormName)
              y.push(list[i].mineStaff); //waterqueryParamsTimeRate
              y1.push(list[i].littleSum);
            }
          }
        }

        //柱图
        this.histogram.series[0].data = y;
        this.histogram.series[1].data = y1;
        this.histogram.xAxis[0].data = x;
      });
    },
  
    
 
    
    //查询POB施工项目情况
    selectPOBProjectPeopleOthers(queryParams) {
      dailyList(queryParams).then((data) => {
        data = data.data.data.records;
        let list = data;
        this.tableData1 = data;
        // this.total=data.total;
        //查询图形
        let x = [];
        let y = [];
        // let y1=[];
        for (let i in list) {
          if (list.hasOwnProperty(i)) {
            //折线图
            x.push(list[i].prodPlatform);
            y.push(list[i].projectUser.slice(0, 1)); //waterTimeRate
          }
        }
        //柱图
        this.histogram2.series[0].data = y;
        this.histogram2.xAxis.data = x;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              console.log(prev + curr);
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = Number(sums[index]);
          sums[index];
        } else {
          sums[index] = '';
        }
      });
      return sums;
    },
    /**
     * hwh
     * 查看施工日报
     * @param platformId 平台id
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    doGetReloadOperating(platformId, startTime, endTime) {
      //如果平台id等于油田id为空
      if (platformId == '3FC9A818F5BC43B88270DB80BBB3018F') {
        platformId = '';
      }
      getReloadOperating(platformId, startTime, endTime).then((res) => {
        if (res.data.code == 0) {
          this.tableData1 = res.data.data;
          this.changeEchartsOption(this.tableData1);
        } else {
          this.tableData1 = [];
        }
      });
    },
    /**
     * hwh
     * 根据当日施工日报表格内容信息 画图
     * @param tableData
     */
    // changeEchartsOption(tableData) {
    //   if (tableData && tableData.length >= 0) {
    //     let xData = [];
    //     let seriesData = [];
    //     //遍历图表信息
    //     for (let i = 0; i < tableData.length; i++) {
    //       let point = [];
    //       xData.push(tableData[i].projectName);
    //       point.push(tableData[i].projectName);
    //       point.push(isNaN(Number(tableData[i].projectUser)) ? 0 : Number(tableData[i].projectUser));
    //       seriesData.push(point);
    //     }
    //     this.histogram2.xAxis.data = xData;
    //     this.histogram2.series[0].data = seriesData;
    //   } else {
    //     this.histogram2.xAxis.data = [];
    //     this.histogram2.series[0].data = [];
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
// .f1 {
//   margin: 10px;
// }
.cont {
  & > div {
    margin-top: 20px;
  }
}
.m1 {
  margin-top: 10px;
}
.f1 {
  margin-left: 10px;
}
</style>
