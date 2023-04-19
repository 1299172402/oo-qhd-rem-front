<!-- 产量管理-归因分析-正常 -->
<template >
  <div>
    <headerSearch class="g-w100 g-h100" style="padding: 0px">
      <el-main id="cs" style="height: 1987px; padding: 0px" class="bgContent">
        <el-row>
          <el-col>
            <div>
              <span style="float: right; color: #02a7f0; margin: 10px">时间：{{ theDate }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true" title="产量跟踪预警分析">
                <div style="position: absolute; top: 3%; left: 12%">
                  <div style="display: inline-block; margin: 10px">
                    <div
                      style="
                        border-radius: 50%;
                        height: 8px;
                        width: 7.4px;
                        background-color: #ff5844;
                        display: inline-block;
                      "
                    ></div>
                    <span style="font-size: 14px; color: #8fa4cc">红色预警</span>
                  </div>
                  <div style="display: inline-block; margin: 10px">
                    <div
                      style="
                        border-radius: 50%;
                        height: 8px;
                        width: 7.4px;
                        background-color: #1379f7;
                        display: inline-block;
                      "
                    ></div>
                    <span style="font-size: 14px; color: #8fa4cc">蓝色预警</span>
                  </div>
                  <div style="display: inline-block; margin: 10px">
                    <div
                      style="
                        border-radius: 50%;
                        height: 8px;
                        width: 7.4px;
                        background-color: #f5be43;
                        display: inline-block;
                      "
                    ></div>
                    <span style="font-size: 14px; color: #8fa4cc">黄色预警</span>
                  </div>
                </div>
                <Echart :chart-data="echartOption" height="400px"></Echart>
              </page-panel-new>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <div style="height: 300px">
                  <el-row style="height: 25%">
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always"> 实际产量 </el-card>
                      </div>
                    </el-col>
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always">
                          {{ realOutput }}
                          <span>
                            <svg-icon
                              v-if="realOutputFlag == 'UP'"
                              icon-class="0-down-arrow"
                              class-name="up-arrow"
                            ></svg-icon>
                            <svg-icon
                              v-if="realOutputFlag == 'DOWN'"
                              icon-class="0-down-arrow"
                              class-name="down-arrow"
                            ></svg-icon>
                          </span>
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="height: 25%">
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always"> 计划产量 </el-card>
                      </div>
                    </el-col>
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always">
                          {{ planOutput }}
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="height: 25%">
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always"> 剩余水平 </el-card>
                      </div>
                    </el-col>
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always">
                          {{ remainingLevel }}
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="height: 25%">
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always"> 滚动预测产量 </el-card>
                      </div>
                    </el-col>
                    <el-col :span="12" style="height: 100%">
                      <div
                        align="center"
                        style="height: 100%; display: flex; align-items: center; justify-content: center"
                      >
                        <el-card class="cardLeft" shadow="always">
                          {{ rollingPrediction }}
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </page-panel-new>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <Echart :chart-data="pieEchart" height="300px"></Echart>
              </page-panel-new>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <el-table :data="tableDataPtOne" highlight style="width: 100%; height: 300px">
                  <el-table-column prop="platformName" label="平台" align="center" min-width="20%"></el-table-column>
                  <el-table-column
                    prop="dayOutput"
                    :label="'当日' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.dayOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.dayState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.dayState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="yesterdayOutput"
                    :label="'前日' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.yesterdayOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.yesterdayState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.yesterdayState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="tenDaysOutput"
                    :label="'上旬' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.tenDaysOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.tenDaysState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.tenDaysState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="lastMonthOutput"
                    :label="'上月' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.lastMonthOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.lastMonthState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.lastMonthState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column> </el-table
              ></page-panel-new>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <el-table :data="tableDataPtTwo" highlight style="width: 100%; height: 300px">
                  <el-table-column prop="platformName" label="平台" align="center" min-width="20%"> </el-table-column>
                  <el-table-column
                    prop="dayOutput"
                    :label="'当日' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.dayOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.dayState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.dayState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="yesterdayOutput"
                    :label="'前日' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.yesterdayOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.yesterdayState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.yesterdayState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="tenDaysOutput"
                    :label="'上旬' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.tenDaysOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.tenDaysState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.tenDaysState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="lastMonthOutput"
                    :label="'上月' + (unitType == 'm' ? '(m³)' : '(t)')"
                    align="center"
                    min-width="20%"
                  >
                    <template slot-scope="{ row }">
                      {{ row.lastMonthOutput | getFixNumberTwo }}
                      <span>
                        <svg-icon
                          v-if="row.lastMonthState == 'UP'"
                          icon-class="0-down-arrow"
                          class-name="up-arrow"
                        ></svg-icon>
                        <svg-icon
                          v-if="row.lastMonthState == 'DOWN'"
                          icon-class="0-down-arrow"
                          class-name="down-arrow"
                        ></svg-icon>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </page-panel-new>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <Echart :chart-data="productOilBarChart" height="300px"></Echart>
              </page-panel-new>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <Echart :chart-data="productYeildBarChart" height="300px"></Echart>
              </page-panel-new>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <Echart :chart-data="waterBarChart" height="300px"></Echart>
              </page-panel-new>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="f1">
              <page-panel-new style="height: 100%" :show-btn="true">
                <el-table :data="eventData" highlight style="width: 100%" height="400" empty-text="当日无大事件">
                  <el-table-column prop="eventType" label="事件类型" align="center" width="180"> </el-table-column>
                  <el-table-column prop="wellNum" label="井数" align="center" width="160"> </el-table-column>
                  <el-table-column prop="content" align="center" label="井名"> </el-table-column>
                </el-table>
              </page-panel-new>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </headerSearch>
  </div>
</template>
  <script>
// import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import {
  outputTracingAnalysis,
  outputTracing,
  platformOutputContributeAnalysis,
  dailyMainEvent,
  wellOutputWaveAnalysis,
} from "@/api/oilDeposit/rem-02/outputmanagement.js";
export default {
  components: {
    Echart,
  },
  filters: {
    //小数保留两位小数
    getFixNumberTwo(val) {
      return val.toFixed(2);
    },
  },
  data() {
    return {
      //区块id
      block: "",
      //油田id
      oilField: "",
      //当前时间
      theDate: "",
      //单位类型
      unitType: "",
      //油田名称
      oilFieldName: "",
      //波动值
      unitValue: "",
      //平台表格数据
      tableDataPtOne: [],
      //平台表格数据
      tableDataPtTwo: [],

      //折线图
      echartOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        dataZoom: {
          start: 0,
          type: "inside",
        },
        grid: {
          //bottom: 130,
        },
        backgroundColor: "transparent",
        //color: ["#1379F7", "#8FA4CC", "#E9D456", "#00BC9C", "#FF7135"],
        color: ["#2ACAFF", "#72818B", "#9A72FF", "#00BC9C"],
        legend: [
          {
            data: ["实际产量", "剩余水平", "计划产量", "滚动预测", "趋势预测"],
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            icon: "rect",
            itemWidth: 12,
            itemHeight: 6,
            itemGap: 14,
            x: "right",
          },
        ],
        xAxis: {
          name: "时间/天",
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 14,
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisLine: {
            lineStyle: {
              color: "#979797",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          //min: 6200,
          name: "产油量/(t/d)",
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 14,
          },
          scale: true,
          axisLine: {
            lineStyle: {
              color: "#979797",
            },
          },
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          splitLine: {
            show: false,
          },
        },
        series: [],
      },
      //饼图
      pieEchart: {
        tooltip: {},
        grid: {},
        color: [
          "#72818B",
          "#F5BE43",
          "#2ACAFF",
          "#FF7135",
          "#3BEC7A",
          "#E9D456",
          "#9A72FF",
          "#FF30AD",
          "#F5FFA3",
          "#00BC9C",
          "#DA835E",
          "#5FCC37",
          "#FF5844",
          "#1379F7",
        ],
        legend: {
          show: false,
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 12,
          },
          icon: "circle",
          y: "bottom",
          itemWidth: 8,
          itemGrap: 14,
        },
        series: {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          width: "90%",
          height: "90%",
          label: {
            show: true,
            position: "outside",
            fontSize: 12,
            color: "#8FA4CC",
            formatter: "{d}%\n{c}t/d",
          },
          labelLine: {
            show: true,
            lineStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0F65EA",
                },
                {
                  offset: 0.25,
                  color: "#0A8DEA",
                },
                {
                  offset: 0.75,
                  color: "#02CAEA",
                },
                {
                  offset: 1,
                  color: "#00D9EA",
                },
              ]),
            },
          },
          itemStyle: {},
          data: [],
        },
      },
      //柱状图
      productOilBarChart: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 50,
          left: 90,
          bottom: 80,
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            rotate: 30,
            color: "#8FA4CC",
            fontSize: 14,
            margin: 20,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "产油量变化/t",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
            lineHeight: 40,
          },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: {
          type: "bar",
          label: {
            show: true,
          },
          barWidth: 22,
          data: [],
        },
      },
      //柱状图
      productYeildBarChart: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 50,
          left: 90,
          bottom: 80,
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            rotate: 30,
            color: "#8FA4CC",
            fontSize: 14,
            margin: 20,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "产液量变化/m³",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
            lineHeight: 40,
          },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: {
          type: "bar",
          label: {
            show: true,
          },
          barWidth: 22,
          data: [],
        },
      },
      //柱状图
      waterBarChart: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 50,
          left: 90,
          bottom: 80,
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            rotate: 30,
            color: "#8FA4CC",
            fontSize: 14,
            margin: 20,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "含水率变化/%",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
            lineHeight: 40,
          },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: {
          type: "bar",
          label: {
            show: true,
          },
          barWidth: 22,
          data: [],
        },
      },
      //表格数据，问题事件
      eventData: [],
      //实际产量
      realOutput: "",
      //实际产量状态
      realOutputFlag: "",
      //计划产量
      planOutput: "",
      //剩余水平
      remainingLevel: "",
      //滚动预测产量
      rollingPrediction: "",
      //折线最小值
      lineMin: 0,
      //下载限制
      canDownload: false,
    };
  },
  mounted() {
    this.block = this.$route.query.block;
    this.oilField = this.$route.query.oilField;
    this.theDate = this.$route.query.theDate;
    this.unitType = this.$route.query.unitType;
    this.oilFieldName = this.$route.query.oilFieldName;
    this.selectDate = this.$route.query.selectDate;
    this.unitValue = this.$route.query.unitValue;
    this.canDownload = this.$route.query.canDownload;
    //console.log(this.block,this.oilField,this.theDate,this.unitType,this.oilField);
    //产量跟踪预警分析
    this.getOutputTracinAnalysis(this.selectDate[0], this.selectDate[1], this.block, this.unitType, this.oilField);

    //产量跟踪分析
    this.getOutputTracing(this.block, this.oilField, this.theDate, this.unitType);
    //平台产量贡献分析
    this.getContributeAnalysis(this.block, this.oilField, this.theDate, this.unitType, false);
    //平台产量贡献分析
    this.getContributeAnalysis(this.block, this.oilField, this.theDate, this.unitType, true);
    //单井产量波动分析
    this.getWellOutputWave(this.block, this.oilField, this.theDate, this.unitType, this.unitValue);
    //单当日关键事件
    this.getDailyMainEvent(this.block, this.oilField, this.theDate, this.unitType);
  },
  methods: {
    //油田产量跟踪预警分析
    getOutputTracinAnalysis(beginDate, endDate, fieldId, outputUnit, wellId) {
      //获取请求参数
      let request = {
        beginDate: beginDate,
        endDate: endDate,
        fieldId: fieldId,
        outputUnit: outputUnit,
        wellId: wellId,
      };
      //获取上层变量
      let _this = this;
      //请求获取油田产量跟踪预警分析
      outputTracingAnalysis(request).then((res) => {
        //获得图表数据
        let data = res.data.data.chart;
        //获取图例数据
        let legendData = [];
        //获取折线图数据
        let series = [];

        //let xAxisData = [];
        this.lineMin = undefined;
        let xSet = new Set();
        if (data) {
          //请求结果
          //折线图数组
          let lineChartArray = data.linearDataSets || [];
          //遍历数组数据
          for (let i = 0; i < lineChartArray.length; i++) {
            legendData.push(lineChartArray[i].label);
            series.push(_this.getEchartsLineSeries(lineChartArray[i], xSet));
          }
        }
        //向Echarts中添加参数
        _this.echartOption.legend.data = legendData;
        _this.echartOption.series = series;
        if (this.lineMin) {
          if (this.lineMin > 1000) {
            this.lineMin = this.lineMin - 50;
            this.lineMin = Math.floor(this.lineMin / 100) * 100;
            //this.lineMin=Math.floor(this.lineMin);
          } else {
            this.lineMin = this.lineMin - 5;
            this.lineMin = Math.floor(this.lineMin / 10) * 10;
            //this.lineMin=Math.floor(this.lineMin);
          }
        }
        let xData = Array.from(xSet).sort();
        _this.echartOption.xAxis.data = xData;
        //_this.echartOption.yAxis.min=this.lineMin;

        //判断单位修改单位名称
        if (outputUnit == "t") {
          _this.echartOption.yAxis.name = "产油量/(t/d)";
        } else if (outputUnit == "m") {
          _this.echartOption.yAxis.name = "产油量/(m³/d)";
        }
      });
    },

    //获得折线图数据series
    getEchartsLineSeries(lineData, xSet) {
      //数据拼接
      let seriesData = {};
      seriesData.name = lineData.label;
      seriesData.type = "line";
      seriesData.symbol = "none";
      //标签名称
      let labelName = lineData.label;
      //所有数据集合
      let allData = [];
      //
      let linearData = lineData.linearData;
      if (this.lineMin == undefined) {
        this.lineMin = linearData[0].value;
      }
      if (labelName == "实际产量") {
        seriesData.symbol = "circle";
        seriesData.symbolSize = 5;
        seriesData.showAllSymbol = true;
        seriesData.z = 10;
        for (let i = 0; i < linearData.length; i++) {
          if (
            linearData[i].description === null ||
            linearData[i].description === undefined ||
            linearData[i].description === ""
          ) {
            let point = [];
            point.push(linearData[i].label);
            xSet.add(linearData[i].label);
            point.push(linearData[i].value.toFixed(2));
            if (this.lineMin > linearData[i].value) {
              this.lineMin = linearData[i].value;
            }
            allData.push(point);
          } else {
            let point = {};
            point.value = [linearData[i].label, linearData[i].value.toFixed(2)];
            if (this.lineMin > linearData[i].value) {
              this.lineMin = linearData[i].value;
            }
            point.symbol = "circle";
            point.symbolSize = 10;
            //红色
            let itemStyleR = {
              normal: {
                color: "#FF5844",
              },
            };
            //蓝色
            let itemStyleO = {
              normal: {
                color: "#1379F7",
              },
            };
            //黄色
            let itemStyleY = {
              normal: {
                color: "#F5BE43",
              },
            };
            //判断预警等级
            if (linearData[i].description == "红色预警") {
              point.itemStyle = itemStyleR;
            } else if (linearData[i].description == "蓝色预警") {
              point.itemStyle = itemStyleO;
            } else if (linearData[i].description == "黄色预警") {
              point.itemStyle = itemStyleY;
            }
            allData.push(point);
          }
        }
      } else {
        for (let i = 0; i < linearData.length; i++) {
          let point = [];
          point.push(linearData[i].label);
          xSet.add(linearData[i].label);
          point.push(linearData[i].value.toFixed(2));
          if (this.lineMin > linearData[i].value) {
            this.lineMin = linearData[i].value;
          }
          allData.push(point);
        }
      }
      seriesData.data = allData;
      return seriesData;
    },

    //获取产量跟踪分析信息
    getOutputTracing(fieldId, oilFieldId, theDate, unitType) {
      let request = {
        fieldId: fieldId,
        oilFieldId: oilFieldId,
        theDate: theDate,
        unitType: unitType,
      };
      let _this = this;
      outputTracing(request).then((res) => {
        //获取产量跟踪分析数据
        let data = res.data.data.outputTraceAnalysis;
        //实际产量
        if (data == null) {
          _this.realOutput = "";
          _this.realOutputFlag = "";
          _this.planOutput = "";
          _this.remainingLevel = "";
          _this.rollingPrediction = "";
        } else {
          //实际产量
          _this.realOutput = data.realOutput;
          _this.realOutputFlag = data.realOutputFlag;
          _this.planOutput = data.planOutput;
          _this.remainingLevel = data.remainingLevel;
          _this.rollingPrediction = data.rollingPrediction;
        }
        if (unitType == "m") {
          _this.realOutput = _this.realOutput.length != 0 ? _this.realOutput + "m³" : "";
          _this.planOutput = _this.planOutput.length != 0 ? _this.planOutput + "m³" : "";
          _this.remainingLevel = _this.remainingLevel.length != 0 ? _this.remainingLevel + "m³" : "";
          _this.rollingPrediction = _this.rollingPrediction.length != 0 ? _this.rollingPrediction + "m³" : "";
        } else if (unitType == "t") {
          _this.realOutput = _this.realOutput.length != 0 ? _this.realOutput + "t" : "";
          _this.planOutput = _this.planOutput.length != 0 ? _this.planOutput + "t" : "";
          _this.remainingLevel = _this.remainingLevel.length != 0 ? _this.remainingLevel + "t" : "";
          _this.rollingPrediction = _this.rollingPrediction.length != 0 ? _this.rollingPrediction + "t" : "";
        }
      });
    },

    //获取平台产量贡献分析信息
    getContributeAnalysis(fieldId, oilFieldId, theDate, unitType, platformDetail) {
      let request = {
        fieldId: fieldId,
        oilFieldId: oilFieldId,
        theDate: theDate,
        unitType: unitType,
        platformDetail: platformDetail,
      };
      let _this = this;
      platformOutputContributeAnalysis(request).then((res) => {
        if (platformDetail == false) {
          let data = res.data.data.chart.pieDataSet[0];
          //获取图例数据
          let legendData = [];
          //获取折线图数据
          let seriesData = [];
          //饼图数据
          let pieData = data.pieDatas;
          if (pieData) {
            for (let i = 0; i < pieData.length; i++) {
              let detail = {};
              detail.value = pieData[i].value.toFixed(2);
              detail.name = pieData[i].label;
              seriesData.push(detail);
              legendData.push(pieData[i].label);
            }
          }
          _this.pieEchart.legend.data = legendData.sort();
          _this.pieEchart.series.data = seriesData;
          if (unitType == "t") {
            _this.pieEchart.series.label.formatter = function (param) {
              let res = "";
              let name = (param.name ? param.name : "") + " ";
              let value = " " + (param.value ? param.value : 0) + "t/d";
              let percent = " " + (param.percent ? param.percent : 0) + "%";
              res = name + value + percent;
              return res;
            };
          } else if (unitType == "m") {
            _this.pieEchart.series.label.formatter = function (param) {
              let res = "";
              let name = (param.name ? param.name : "") + " ";
              let value = " " + (param.value ? param.value : "0") + "m³/d";
              let percent = " " + (param.percent ? param.percent : "0") + "%";
              res = name + value + percent;
              return res;
            };
          }
        } else {
          let tableDate = res.data.data.platformOutputs;
          let tableOne = [];
          let tableTwo = [];
          if (tableDate) {
            tableDate = tableDate.sort(function (a, b) {
              if (a.platformName > b.platformName) {
                return 1;
              } else if (a.platformName < b.platformName) {
                return -1;
              } else {
                return 0;
              }
            });
            for (let i = 0; i < tableDate.length; i++) {
              if (i < tableDate.length / 2) tableOne.push(tableDate[i]);
              else tableTwo.push(tableDate[i]);
            }
          }
          _this.tableDataPtOne = tableOne;
          _this.tableDataPtTwo = tableTwo;
        }
      });
    },

    //获取单井产量波动分析
    getWellOutputWave(fieldId, oilFieldId, theDate, unitType, waveSetting) {
      let request = {
        fieldId: fieldId,
        oilFieldId: oilFieldId,
        theDate: theDate,
        unitType: unitType,
        waveSetting: waveSetting,
      };
      let _this = this;
      wellOutputWaveAnalysis(request).then((res) => {
        //获取产油数据项
        let data = res.data.data.oilChart;
        let xAxisData = [];
        let barDate = data.barDataSets[0].barDatas;

        for (let i = 0; i < barDate.length; i++) {
          xAxisData.push(barDate[i].label);
        }
        _this.productOilBarChart.xAxis.data = xAxisData;
        _this.productOilBarChart.series.data = _this.getBarChartSeries(barDate);
        //单位切换
        if (unitType == "t") {
          _this.productOilBarChart.yAxis.name = "产油量变化/t";
        } else if (unitType == "m") {
          _this.productOilBarChart.yAxis.name = "产油量变化/m³";
        }

        //获取产液量数据项
        let dataY = res.data.data.liquidChart;
        let xAxisDataY = [];
        let barDateY = dataY.barDataSets[0].barDatas;

        for (let i = 0; i < barDateY.length; i++) {
          xAxisDataY.push(barDateY[i].label);
        }
        _this.productYeildBarChart.xAxis.data = xAxisDataY;
        _this.productYeildBarChart.series.data = _this.getBarChartSeries(barDateY);
        //获取含水变化率
        let dataI = res.data.data.waterCutChart;
        let xAxisDataI = [];
        let barDateI = dataI.barDataSets[0].barDatas;

        for (let i = 0; i < barDateI.length; i++) {
          xAxisDataI.push(barDate[i].label);
        }
        _this.waterBarChart.xAxis.data = xAxisDataI;
        _this.waterBarChart.series.data = _this.getBarChartSeries(barDateI);
      });
    },
    //柱状图
    getBarChartSeries(barChart) {
      let seriesData = [];
      for (let i = 0; i < barChart.length; i++) {
        let barData = {};
        //值大于等于0
        if (barChart[i].value >= 0) {
          barData.value = barChart[i].value.toFixed(2);
          barData.name = barChart[i].label;
          barData.label = {
            normal: {
              position: "top",
              color: "#fff",
              fontSize: 14,
            },
          };
          barData.itemStyle = {
            color: "#1379F7",
          };
          seriesData.push(barData);
        } else {
          //值小于0
          barData.value = barChart[i].value.toFixed(2);
          barData.name = barChart[i].label;
          barData.label = {
            normal: {
              position: "bottom",
              color: "#fff",
              fontSize: 14,
            },
          };
          barData.itemStyle = {
            color: "#FF7135",
          };
          seriesData.push(barData);
        }
      }
      return seriesData;
    },

    //获取当日关键事件
    getDailyMainEvent(fieldId, oilFieldId, theDate, unitType) {
      let request = {
        fieldId: fieldId,
        oilFieldId: oilFieldId,
        theDate: theDate,
        unitType: unitType,
      };
      let _this = this;
      dailyMainEvent(request).then((res) => {
        let data = res.data.data;
        _this.eventData = data.dailyMainEvents;
      });
    },
    /**
     * 图片下载
     */
    doPicture() {
      domtoimage.toPng(document.querySelector("#cs")).then((res) => {
        FileSaver.saveAs(res, this.oilFieldName + "产量管理运行分析" + this.theDate);
      });
    },
    /*filterNode(val){
        if(val.className == 'normal-card__content' || val.tagName == 'BUTTON'){
          return false;
        }
        else{
          return true;
        }
      },*/
  },
};
</script>
  <style lang="scss" scoped>
.f1 {
  margin: 10px;
}

.blockBox {
  width: 67px;
  height: 32px;
  border-radius: 5px;
  border-color: #8fa4cc;
  border-width: 2px;
  border-style: solid;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.blockMess {
  width: 90px;
  height: 32px;
  border-radius: 5px;
  border-color: #8fa4cc;
  border-width: 2px;
  border-style: solid;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  margin-bottom: 5px;
}

.el-card {
  border-width: 1px 0;
  border-radius: 0;
  border-image: linear-gradient(90deg, rgba(116, 190, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 190, 243, 0)) 1 1;
  color: #00d6ea;
  font-weight: bold;
  background: rgba(143, 164, 204, 0.16);

  ::v-deep .el-card__body {
    padding: 0;
    line-height: 40px;
  }
}

.cardLeft {
  height: 40px;
  width: 80%;
  margin: 10px auto;
}

.down-arrow {
  color: #d64e18;
}

.up-arrow {
  color: #47da2a;
  transform: rotate(180deg);
}

.bgContent {
  background-color: transparent !important;
  background: url(../../../../static/img/bodybg.png) repeat left top;
}
</style>
  