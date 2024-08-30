<template>
  <div class="app-container" style="height: 100%">
    <div style="display: flex;flex-direction: row; height: 100%;">
      <div style="display: flex;flex-direction: column;  height:100%;margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
        <headerSearch>
          <el-form :model="queryParams" :inline="true" style="margin-top: 18px;text-align: left;">
            <el-form-item label="油田：">
              <el-select v-model="queryParams.oil_field" placeholder="请选择油田" clearable size="small" style="width: 240px">
                <el-option v-for="(item, index) in oil_field_list" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台：">
              <el-select v-model="queryParams.platform" placeholder="请选择平台" clearable size="small" style="width: 240px">
                <el-option v-for="(item, index) in platform_list" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井号：">
              <el-select v-model="queryParams.well_num" placeholder="请选择井号" clearable size="small" style="width: 240px">
                <el-option v-for="(item, index) in well_num_list" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="searchForOilField">查询</el-button>
            <el-button @click="drawer = true" type="primary" class="button_last">数据/模型更新</el-button>
            <t-drawer :footer="false" header="数据上传" :visible.sync="drawer" placement="left" :close-btn="true" size="50%">
              <div style="padding: 0 10vh;">
                <file-upload v-model="imageurl" :limit="limit" :fileSize="20" biz-path="rem-front/text" :file-type="fileType" @change="getResData" />
              </div>
            </t-drawer>
          </el-form>
        </headerSearch>
        <div style="overflow-y:scroll;overflow-x: hidden;">
          <page-panel headerTitle="水平井跟端总产量、含水和压力" :show-btn="true" style="overflow-y:scroll">
            <el-row>
              <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px" @click="downEchartup">下载</el-button>
            </el-row>
            <Echart ref="echartChart" :chart-data="lineTable" height="583px"></Echart>
          </page-panel>
          <page-panel headerTitle="产液剖面参数显示" :show-btn="true">
            <el-row>
              <el-col :span="21">
                <el-date-picker v-model="time_qiujie1" type="month" value-format="M" :picker-options="pickerOptions" @change="handleDateChange"></el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-button icon="el-icon-download" type="primary" @click="downEchartdown">下载</el-button>
              </el-col>
            </el-row>
            <el-row>
              <Echart ref="echartChartdown" :chart-data="ParmShow" height="650px"></Echart>
            </el-row>
          </page-panel>
          <page-panel headerTitle="水平井产液剖面预测数据" :show-btn="true" style="height: 60vh;">
            <el-row>
              <el-col :span='20'>
                <el-tabs v-model="activeName_wu" @tab-click="handleClick_wu">
                <el-tab-pane label="产液量" name="liquidSection" style="color: rgb(37, 144, 251);text-align: left;">
                </el-tab-pane>
                <el-tab-pane label="含水率" name="wcutSectionTime" style="color: rgb(37, 144, 251);text-align: left;">
                </el-tab-pane>
                <el-tab-pane label="压力" name="pressurematrix" style="color: rgb(37, 144, 251);text-align: left;">
                </el-tab-pane>
              </el-tabs>
              </el-col>
              <el-col :span="4">
                <el-button style="float: right" type="primary" icon="el-icon-download" @click="doDownExcel()">下载</el-button>
              </el-col>
              
            </el-row>


            <el-table :data="dataPrediction" max-height="400px" id="spjcypmycsj" style="width: 100%" :header-cell-style="{ backgroundColor: 'rgb(0,55,94)', color: 'rgb(54, 201, 234)', fontSize: '14px' }">
              <el-table-column label="井名">
                <template slot-scope="scope">
                  <span>{{ scope.row.jingming }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.time }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.labelPrediction" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalvalue }}</span>
                  <!-- //改 -->
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[0]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[0] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[1]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[1] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[2]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[2] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[3]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[3] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[4]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[4] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[5]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[5] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[6]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[6] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[7]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[7] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[8]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[8] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[9]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[9] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </page-panel>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { queryDensityInfo, queryWellInfo, userListByUserNames } from "@/api/horizontalWell/horizontalWell.js";
import Echart from "@/components/tools/Echarts/index.vue";
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import {exportExcel} from "@/lib/exportExcel";
export default {
  name: "ChuWang",
  data() {
    return {
      imageurl: "",
      limit: 2,
      fileType: ["xlsx", "pth"],
      xAxis: [],
      biao2_prowater: [
        {
          type: 'line',
          smooth: true,
          data: [100, 200, 200, 500, 100, 20, 10, 12, 100, 123, 365, 50],
        },
      ],
      biao2_waterin: [
        {
          type: 'line',
          smooth: true,
          data: [100, 200, 200, 500, 100, 20, 10, 12, 100, 123, 365, 50],
        },
      ],
      biao2_press: [
        {
          type: 'line',
          smooth: true,
          data: [100, 200, 200, 500, 100, 20, 10, 12, 100, 123, 365, 50],
        },
      ],
      listdata: [
        {
          label: "储层-井筒流体流动模型",
          value: "3DC1B33E1B5B431E99FA163BF9E86E6A",
          level: "1",
        },
        {
          label: "井筒产量预警模型",
          value: "3DC1B33E1B5B431E99FA163BF9E86E6A",
          level: "1",
        },
        {
          label: "水平井分仓设计模型",
          value: "3DC1B33E1B5B431E99FA163BF9E86E6A",
          level: "1",
        }
      ], //树形数组
      drawer: false,

      //最上方单选框
      queryParams: {
        oil_field: '',
        platform: '',
        well_num: '',
      },
      oil_field_list: [{
        value: '选项1',
        label: '秦皇岛32-6'
      }, {
        value: '选项2',
        label: '秦皇岛32-7'
      }, {
        value: '选项3',
        label: '秦皇岛32-8'
      }],

      platform_list: [{
        value: '选项1',
        label: '平台1'
      }, {
        value: '选项2',
        label: '平台2'
      }, {
        value: '选项3',
        label: '平台3'
      }],

      well_num_list: [{
        value: '选项1',
        label: '井1'
      }, {
        value: '选项2',
        label: '井2'
      }, {
        value: '选项3',
        label: '井3'
      }],

      pickerOptions: {
        disabledDate(val) {
          const month = new Date(val).getMonth();
          const currentMonth = new Date().getMonth();
          const year = new Date(val).getFullYear();
          const currentYear = new Date().getFullYear();
          const currenTime = new Date().getTime();
          const time = new Date(val).getTime();

          if (
            year > currentYear + 1 ||
            time < currenTime ||
            (year > currentYear && month > currentMonth - 7)
          ) {
            return true;
          }
        }
      },
      time_qiujie1: '',

      activeName_wu: 'liquidSection',
      tabPrediction: {
        labelPrediction: '根节点（总产液量）',
        labelPredictionList: ['根节点（总产液量）', '根节点（总含水率）', '根节点（总压力）'],
        distance: [],
      },
      allPredictionData: {
        liquidSection: [],
        wcutSectionTime: [],
        pressurematrix: [],
        predictionValue: [],
        echartsValue: [],
      },
      dataPrediction: [],

      lineTable: {
        tooltip: {
          trigger: "axis",
        },
        grid: [
          { x: "6%", y: "5%", width: "90%", height: "18%" },
          { x: "6%", y: "40%", width: "90%", height: "18%" },
          { x: "6%", y: "75%", width: "90%", height: "18%" },
        ],
        xAxis: [
          {
            gridIndex: 0,
            nameTextStyle: {
              color: "#4c9bfd",
              // width:'5000px',
              // height:'20px',
              padding: [0, 0, 0, 0],
              // verticalAlign: "bottom",
              lineHeight: 30,
            },
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            axisTick: {
              show: true // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色,x轴刻度标签
            },
            axisLine: {
              show: false // 去除轴线
            }
          },
          {
            gridIndex: 1,
            nameTextStyle: {
              color: "#4c9bfd",
              // width:'5000px',
              // height:'20px',
              padding: [0, 0, 0, 0],
              // verticalAlign: "bottom",
              lineHeight: 30,
            },
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            axisTick: {
              show: true // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色,x轴刻度标签
            },
            axisLine: {
              show: false // 去除轴线
            }
          },
          {
            gridIndex: 2,
            nameTextStyle: {
              color: "#4c9bfd",
              // width:'5000px',
              // height:'20px',
              padding: [0, 0, 0, 0],
              // verticalAlign: "bottom",
              lineHeight: 30,
            },
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            axisTick: {
              show: true // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色,x轴刻度标签
            },
            axisLine: {
              show: false // 去除轴线
            }
          },
        ],

        axisPointer: {
          link: {
            xAxisIndex: "all",
            yAxisIndex: "all",
          },
        },
        yAxis: [{
          gridIndex: 0,
          min: function (value) {
            return value.min;
          },
          name: '产液量/(㎡/d)',
          nameLocation: "center",
          nameRotate: 90,
          nameGap: 52,
          nameTextStyle: {
            color: "#4c9bfd",
            verticalAlign: 'top',
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#4c9bfd"
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#012f4a"
            }
          },
        }, { /* Y轴设置 */
          gridIndex: 1,
          min: function (value) {
            return value.min;
          },
          name: '含水率/%',
          nameLocation: "center",
          nameGap: 52,
          nameRotate: 90,
          nameTextStyle: {
            color: "#4c9bfd",
            verticalAlign: 'top',
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#4c9bfd"
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#012f4a"
            }
          },
        }, {
          gridIndex: 2,
          min: function (value) {
            return value.min;
          },
          name: '压力/MPa',
          nameLocation: "center",
          nameGap: 45,
          nameRotate: 90,
          nameTextStyle: {
            color: "#4c9bfd",
            verticalAlign: 'top',
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#4c9bfd"
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#012f4a"
            }
          },
        },],
        series: [
          {
            name: '产液量',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true,
            data: [],
          },
          {
            name: '含水率',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: true,
            data: [],
          },
          {
            name: '压力',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            smooth: true,
            data: [],
          },
        ],
        color: ["#00f2f1", "#ed3f35", "#9f35ff", "#00EC00", "#FFD306", "#FFD306"],
        visualMap: [{
          gridIndex: 0,
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 12,
            },
            {
              gt: 12,
              lte: 18,
              color: 'red'
            },

          ]
        }, {
          gridIndex: 1,
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 12,
            },
            {
              gt: 12,
              lte: 18,
              color: 'red'
            },

          ]
        }, {
          gridIndex: 2,
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 12,
            },
            {
              gt: 12,
              lte: 18,
              color: 'red'
            },

          ]
        },]
      },

      minWater: 0,
      ParmShow: {
        title: [
          {
            gridIndex: 0,
            text: '产液量显示',
            left: '10%',
            // top:'5%',
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
          {
            gridIndex: 1,
            text: '含水率显示',
            left: '45%',
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
          {
            gridIndex: 2,
            text: '压力显示',
            left: '77%',
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
        ],
        color: ["#00f2f1", "#ed3f35", "#9f35ff", "#00EC00", "#FFD306", "#FFD306"],
        tooltip: {},
        xAxis: [
          {
            gridIndex: 0,
            name: '距水平井根段距离/m',
            nameTextStyle: {
              color: "#4c9bfd",
              padding: [0, 0, 0, 0],
              lineHeight: 30,
            },
            nameLocation: 'center',
            type: "category",
            scale: true,
            boundaryGap: false,
            // data: [],
            axisTick: {
              show: true
            },
            axisLabel: {
              color: "#4c9bfd"
            },
            axisLine: {
              show: false
            }
          },
          {
            gridIndex: 1,
            name: '距水平井根段距离/m',
            nameTextStyle: {
              color: "#4c9bfd",
              padding: [0, 0, 0, 0],
              lineHeight: 30,
            },
            nameLocation: 'center',
            type: "category",
            scale: true,
            boundaryGap: false,
            // data: [],
            axisTick: {
              show: true
            },
            axisLabel: {
              color: "#4c9bfd"
            },
            axisLine: {
              show: false
            }
          },
          {
            gridIndex: 2,
            name: '距水平井根段距离/m',
            nameTextStyle: {
              color: "#4c9bfd",
              padding: [0, 0, 0, 0],
              lineHeight: 30,
            },
            nameLocation: 'center',
            type: "category",
            scale: true,
            boundaryGap: false,
            data: [],
            axisTick: {
              show: true
            },
            axisLabel: {
              color: "#4c9bfd"
            },
            axisLine: {
              show: false
            }
          },
        ],
        grid: [
          { x: "4%", y: "5%", width: "25%", height: "30%" },
          { x: "37%", y: "5%", width: "25%", height: "30%" },
          { x: "70%", y: "5%", width: "25%", height: "30%" },
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: '产液强度/(㎡/(d*m))',
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: {
              color: "#4c9bfd",
              verticalAlign: 'top',
            },
            type: "value",
            axisTick: {
              show: false // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
              show: false // 去除轴线
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#012f4a" // 分割线颜色
              }
            },
          },
          {
            gridIndex: 1,
            min: function (value) {
              return value.min.toFixed(3) - 0.5;
            },
            name: '含水率/%',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
              color: "#4c9bfd",
              verticalAlign: 'top',
            },
            type: "value",
            axisTick: {
              show: false // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
              show: false // 去除轴线
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#012f4a" // 分割线颜色
              }
            },
          },
          {
            gridIndex: 2,
            min: function (value) {
              return value.min.toFixed(3);
            },
            name: '压力/MPa',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
              color: "#4c9bfd",
              verticalAlign: 'top',
            },
            type: "value",
            axisTick: {
              show: false // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
              show: false // 去除轴线
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#012f4a" // 分割线颜色
              }
            },
          },
        ],
        series: [
          {
            gridIndex: 0,
            name: '产液量',
            type: 'custom',
            renderItem: function (params, api) {
              var yValue = api.value(2);
              var start = api.coord([api.value(0), yValue]);
              var size = api.size([api.value(1) - api.value(0), yValue]);
              var style = api.style();
              return {
                type: 'rect',
                shape: {
                  x: start[0],
                  y: start[1],
                  width: size[0],
                  height: size[1]
                },
                style: style
              };
            },
            dimensions: ['from', 'to', 'profit'],
            encode: {
              x: [0, 1],
              y: 2,
              tooltip: [0, 1, 2],
              itemName: 2
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true,
            data: [],
          },
          {
            gridIndex: 1,
            name: '含水率',
            type: 'custom',
            renderItem: (params, api) => {
              let yValue = api.value(2);
              let start = api.coord([api.value(0), yValue]);
              let yDiff = yValue - this.minWater
              let size = api.size([api.value(1) - api.value(0), yDiff]);
              let style = api.style();
              return {
                type: 'rect',
                shape: {
                  x: start[0],
                  y: start[1],
                  width: size[0],
                  height: size[1]
                },
                style: style
              };
            },
            dimensions: ['from', 'to', 'profit'],
            encode: {
              x: [0, 1],
              y: 2,
              tooltip: [0, 1, 2],
              itemName: 2
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: true,
            data: [],
          },
          {
            gridIndex: 2,
            name: '压力',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            smooth: true,
            data: [],
          },
        ],
      },

      monthShow: 0,
      footerDistance: [],
    }
  },
  components: {
    Echart,
    FileUpload,
  },
  mounted() {

    // this.initWellName()
  },
  methods: {
    handleClick_wu(tab) {
      this.tabPrediction.labelPrediction = this.tabPrediction.labelPredictionList[tab._data.index]
      this.dataPrediction = this.allPredictionData[this.activeName_wu]
      // console.log(this.activeName_wu)
      console.log(this.allPredictionData[this.activeName_wu])
    },
    searchForOilField() {
      let queryParams = {
        well_name: "D28H"
      }
      queryDensityInfo(queryParams).then((res) => {
        console.log("第一个函数", res)
        this.liquidChart(res.data.data)
        this.waterpercentChart(res.data.data)
        this.pressChart(res.data.data)
        this.allPredictionData.totalvalue = res.data.data.prediction
      });
      queryWellInfo(queryParams).then((res) => {
        this.allPredictionData.echartsValue = res
        this.footerDistance = res.distancefromb.map(function (item) {
          return item.toFixed(1)
        })
        this.ParmShow.xAxis[2].data = this.footerDistance
        this.showChart(res, this.monthShow, this.footerDistance)
        this.alldataPrediction(res)
        console.log("第二个函数", res)
      })
    },

    async initWellName() {
      let queryParams = {
        well_name: "D28H"
      }
      await userListByUserNames(queryParams).then((res) => {
        console.log(res)
      })
    },
    liquidChart(data) {
      let liquidHistorylist = data.history.liquid.map(function (item) {
        return item.toFixed(1)
      })
      let liquidPrediction = data.prediction.liquid.map(function (item) {
        return item.toFixed(1)
      })
      this.lineTable.series[0].data = liquidHistorylist.concat(liquidPrediction);
      this.lineTable.xAxis[0].data = data.history.date.concat(data.prediction.date);
    },
    waterpercentChart(data) {
      let waterHistorylist = data.history.waterpercent.map(function (item) {
        return (item * 100).toFixed(1)
      })
      let waterPredictionlist = data.prediction.waterpercent.map(function (item) {
        return (item * 100).toFixed(1)
      })
      this.lineTable.series[1].data = waterHistorylist.concat(waterPredictionlist);
      this.lineTable.xAxis[1].data = data.history.date.concat(data.prediction.date);;
    },
    pressChart(data) {
      let pressHistorylist = data.history.press.map(function (item) {
        return item.toFixed(1)
      })
      let pressPredictionlist = data.prediction.press.map(function (item) {
        return item.toFixed(1)
      })
      this.lineTable.series[2].data = pressHistorylist.concat(pressPredictionlist);
      this.lineTable.xAxis[2].data = data.history.date.concat(data.prediction.date);;
    },
    layoutChange() {
      this.$refs.table.doLayout()
    },
    alldataPrediction(data) {
      this.tabPrediction.distance = data.distancefromb.map(function (item) {
        return item.toFixed(1) + 'm'
      })
      // console.log(this.tabPrediction.distance)
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      for (let i = 0; i < 6; i++) {
        let valuePrediction = {
          jingming: 'D32-6H',
          time: '',
          totalvalue: '',
          value: []
        }
        if (Number(month) + i <= 12) {
          valuePrediction.time = year + '-' + (Number(month) + i)
        } else {
          valuePrediction.time = (Number(year) + 1) + '-' + (Number(month) + i - 12)
        }
        valuePrediction.value = data.liquidSection[i]
        valuePrediction.totalvalue = this.allPredictionData.totalvalue.liquid[i]
        this.allPredictionData.liquidSection.push(valuePrediction)

      }
      for (let i = 0; i < 6; i++) {
        let valuePrediction = {
          jingming: 'D32-6H',
          time: '',
          totalvalue: '',
          value: []
        }
        if (Number(month) + i <= 12) {
          valuePrediction.time = year + '-' + (Number(month) + i)
        } else {
          valuePrediction.time = (Number(year) + 1) + '-' + (Number(month) + i - 12)
        }
        valuePrediction.value = data.wcutSectionTime[i].map(function (item) {
          return item * 100
        })
        valuePrediction.totalvalue = this.allPredictionData.totalvalue.waterpercent[i] * 100
        this.allPredictionData.wcutSectionTime.push(valuePrediction)
      }
      for (let i = 0; i < 6; i++) {
        let valuePrediction = {
          jingming: 'D32-6H',
          time: '',
          totalvalue: '',
          value: []
        }
        if (Number(month) + i <= 12) {
          valuePrediction.time = year + '-' + (Number(month) + i)
        } else {
          valuePrediction.time = (Number(year) + 1) + '-' + (Number(month) + i - 12)
        }
        valuePrediction.value = data.pressurematrix[i]
        valuePrediction.totalvalue = this.allPredictionData.totalvalue.press[i]
        this.allPredictionData.pressurematrix.push(valuePrediction)
      }
      this.dataPrediction = this.allPredictionData.liquidSection
      // console.log(this.allPredictionData.liquidSection)
    },
    getResData(data) {
      let params = {
        well_name: "D28H"
      };
      this.uploadFile(params);
    },
    uploadFile(params) {
      this.drawer = false;
      queryDensityInfo(params).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("文件上传成功!");
          this.drawer = false;
          this.imageurl = ""; // 清空已选择的文件
        } else {
          this.$message.error("文件上传失败!");
          this.imageurl = ""; // 清空已选择的文件
        }
      });
    },
    showChart(data, index, xDistance) {
      this.minWater = (Math.min.apply(null, (data.wcutSectionTime[index])) * 100).toFixed(1) - 0.5
      this.ParmShow.series[0].data = []
      for (let i = 0; i < (data.liquidSection[index].length); i++) {
        let value = (xDistance.slice(i, i + 2)).concat(data.liquidSection[index][i].toFixed(1))
        this.ParmShow.series[0].data.push(value)
      }
      this.ParmShow.series[1].data = []
      for (let i = 0; i < (data.wcutSectionTime[index].length); i++) {
        let value1 = (xDistance.slice(i, i + 2)).concat((data.wcutSectionTime[index][i] * 100).toFixed(1))

        this.ParmShow.series[1].data.push(value1)
      }
      this.ParmShow.series[2].data = data.pressurematrix[index].map(function (item) {
        return item.toFixed(1)
      })
    },

    handleDateChange(value) {
      const month = new Date().getMonth() + 1
      let monthDiff = month - Number(value)
      if (monthDiff > 0) {
        monthDiff = 12 - month + Number(value)
      } else if (monthDiff < 0) {
        monthDiff = -monthDiff
      }
      this.monthShow = monthDiff
      this.showChart(this.allPredictionData.echartsValue, monthDiff, this.footerDistance)
    },
    downEchartup() {
      this.$refs.echartChart.chartDownLoad('水平井跟端总产量、含水和压力');
    },
    downEchartdown() {
      this.$refs.echartChartdown.chartDownLoad('产液剖面参数显示');
    },
    doDownExcel() {
      exportExcel("#spjcypmycsj", "水平井产液剖面预测数据");
    },
  }
}
</script>

<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}
</style>

<style>
.el-drawer {
  background-image: url("@/assets/backgroundImg.png");
  color: white;
  font-size: larger;
}
</style>