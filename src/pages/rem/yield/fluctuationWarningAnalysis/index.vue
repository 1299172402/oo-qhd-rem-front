<!-- 产量波动预警分析 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: 80px; margin-bottom: 20px">
      <div style="height: 100%; display: flex; align-items: center; flex-wrap: wrap">
        <span>油田：</span>
        <el-select v-model="selectOilField" placeholder="请选择" style="margin-right: 15px">
          <el-option v-for="item in oilField" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
        </el-select>
        <span>区块：</span>
        <el-select v-model="selectBlock" placeholder="请选择" style="margin-right: 15px">
          <el-option
            v-for="item in block"
            :key="item.reservoirAnalyseUnitId"
            :label="item.reservoirAnalyseUnitName"
            :value="item.reservoirAnalyseUnitId"
          ></el-option>
        </el-select>
        <span>预警分析日期设置：</span>
        <el-date-picker
          v-model="selectDate"
          :clearable="false"
          unlink-panels
          type="daterange"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM-dd"
          style="margin-right: 15px"
        >
        </el-date-picker>
        <span>产量单位选择：</span>
        <el-select v-model="selectUnitOfProduction" placeholder="请选择" style="width: 100px; margin-right: 15px">
          <el-option
            v-for="item in unitOfProduction"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button icon="el-icon-search" type="primary" @click="searchThing">搜索</el-button>
        <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
      </div>
    </headerSearch>
    <div class="z-container">
      <pagePanelNew class="pagePanelNew">
        <div class="pagePane-container">
          <!-- <div class="pagepanel-btns" style="height:30px;margin-bottom:10px;display: flex;justify-content: flex-end;margin-right:20px;">
                        <el-button icon="el-icon-s-promotion" type="primary" style="height:30px;" @click="showOutputTracking">作业公司产量跟踪</el-button>
                    </div> -->
          <div class="rowBox" style="margin-bottom: 20px">
            <div class="row" style="margin-right: 20px">
              <pagePanel :headerTitle="oilFieldName + '产量跟踪预警分析'" style="height: 456px; margin-top: 0" show-btn>
                <div style="position: absolute; z-index: 10">
                  <el-button type="primary" @click="openDetailedChick('红色预警')">红色预警</el-button>
                  <el-button type="primary" @click="openDetailedChick('蓝色预警')">蓝色预警</el-button>
                  <el-button type="primary" @click="openDetailedChick('黄色预警')">黄色预警</el-button>
                </div>
                <Echart
                  :chart-data="echartOption"
                  height="400px"
                  :events="['click', 'legendselectchanged']"
                  @click="clickCall"
                ></Echart>
              </pagePanel>
            </div>
          </div>
          <div style="margin-right: 20px; margin-bottom: 20px">
            <div
              class="pageHeader"
              style="width: 100%; display: flex; align-items: center; justify-content: space-between"
              v-if="!isShowTable"
            >
              <span class="title">{{ oilFieldName }}产量跟踪分析 {{ currentDate }}</span>
              <el-button type="primary" size="medium" style="height: 30px" @click="switchUpPage"
                >产量运行分析报告下载</el-button
              >
            </div>
            <div class="pageHeader" style="width: 100%; display: flex; align-items: center" v-if="isShowTable">
              <span class="title">{{ currentDate }}产量异常智能归因分析</span>
              <el-button type="primary" size="medium" style="margin-left: auto; height: 30px" @click="switchUpPage"
                >产量运行分析报告</el-button
              >
              <el-button
                type="primary"
                size="medium"
                style="margin-left: 10px !important; height: 30px"
                @click="switchDownPage"
                >产量异常归因分析报告</el-button
              >
            </div>
          </div>
          <div class="rowBox" style="margin-bottom: 20px" v-if="!isShowTable">
            <div class="row" style="margin-right: 20px">
              <pagePanel headerTitle="产量跟踪分析" style="height: 400px; margin-top: 0" show-btn>
                <div class="row-container">
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
                        <el-card class="cardLeft" shadow="always"> 计划产量(分公司奋斗) </el-card>
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
                        <el-card class="cardLeft" shadow="always"> 剩余水平(分公司奋斗) </el-card>
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
                        <el-card class="cardLeft" shadow="always">
                          滚动预测产量({{ new Date().getMonth() }}+{{ 12 - new Date().getMonth() }})
                        </el-card>
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
              </pagePanel>
            </div>
            <div class="row" style="margin-right: 20px">
              <pagePanel headerTitle="平台产量组成" style="height: 400px; margin-top: 0" show-btn>
                <div class="row-container">
                  <Echart :chart-data="pieEchart" height="100%"></Echart>
                </div>
              </pagePanel>
            </div>
          </div>
          <div class="rowBox" v-if="!isShowTable">
            <div class="row" style="margin-right: 20px">
              <pagePanel headerTitle="单井产量波动分析" style="height: 400px; margin-top: 0" show-btn>
                <!-- <div class="row-container"> -->
                <div style="position: absolute; top: 52px; right: 100px; width: calc(100% - 120px); z-index: 99">
                  <span style="margin-right: 10px; font-size: 14px">产量变化总井数：{{ wellAllNum }}口</span>
                  <el-input
                    placeholder="产油波动值设置"
                    style="width: 135px; margin-right: 10px"
                    size="medium"
                    :readonly="true"
                  ></el-input>
                  <el-input
                    v-model="setParaValue"
                    style="width: 80px; margin-right: 10px"
                    type="text"
                    size="medium"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                  ></el-input>
                  <el-input
                    v-model="unitValue"
                    style="width: 50px; margin-right: 10px"
                    size="medium"
                    :readonly="true"
                  ></el-input>
                  <el-button type="primary" @click="searchWellOutputWave">搜索</el-button>
                  <el-button type="primary" style="margin-left: 10px !important" @click="jumpMore">更多</el-button>
                </div>
                <!-- <div class="echartBox"> -->
                <Echart :chart-data="barChart" height="100%"></Echart>
                <!-- </div> -->
                <!-- </div> -->
              </pagePanel>
            </div>
            <div class="row" style="margin-right: 20px">
              <pagePanel
                :headerTitle="`当日关键事件 ${eventData[0] ? eventData[0].startDate : ''}`"
                style="height: 400px; margin-top: 0"
                show-btn
              >
                <div class="row-container">
                  <div style="display: flex; justify-content: flex-end">
                    <el-button
                      icon="el-icon-download"
                      type="primary"
                      style="margin-bottom: 20px"
                      @click="doDownExcel('#table1', '当日关键事件')"
                      >下载</el-button
                    >
                  </div>
                  <el-table
                    id="table1"
                    highlight
                    border
                    :data="eventData"
                    style="width: 100%"
                    height="100%"
                    empty-text="当日无大事件"
                  >
                    <el-table-column
                      prop="eventType"
                      label="事件类型"
                      header-align="center"
                      align="left"
                      width="180"
                    ></el-table-column>
                    <el-table-column prop="content" label="井号" header-align="center" align="left"></el-table-column>
                  </el-table>
                </div>
              </pagePanel>
            </div>
          </div>
          <div class="rowBox" v-if="isShowTable">
            <div class="row" style="margin-right: 20px">
              <pagePanel
                :headerTitle="`当日关键事件 ${reasonAnalysises[0] ? reasonAnalysises[0].startTime : ''}`"
                style="height: 400px; margin-top: 0"
                show-btn
              >
                <div class="row-container">
                  <el-table
                    class="z-table"
                    highlight
                    :data="reasonAnalysises"
                    border
                    :span-method="objectSpanMethod"
                    style="width: 100%; align: center"
                    height="100%"
                  >
                    <el-table-column
                      prop="platformName"
                      label="各平台产量下降情况"
                      align="center"
                      width="250"
                    ></el-table-column>
                    <el-table-column prop="evalDim" label="原因分类情况" align="center" width="250"></el-table-column>
                    <el-table-column prop="content" label="异常井情况" align="center"></el-table-column>
                  </el-table>
                </div>
              </pagePanel>
            </div>
          </div>
        </div>
      </pagePanelNew>
    </div>
    <el-dialog title="单井产量波动分析——详情" :visible.sync="dialogVisible" width="30%" height="60%">
      <el-table highlight :data="productAnaysisTable" height="500px">
        <el-table-column type="index" label="序号" width="60" header-align="center" align="center"></el-table-column>
        <el-table-column
          prop="borepipeNo"
          label="井号"
          width="150"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="oilProdDaily"
          :label="this.unitValue == 't' ? '产油变化量(t)' : '产油变化量(m³)'"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.oilProdDaily | numberToTwo }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="作业公司产量跟踪" :visible.sync="outputTracking" width="90%">
      <div class="elDialog-search">
        <span class="f1">日期：</span>
        <el-date-picker
          v-model="outputTrackingForm.queryDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span class="f1" style="margin-left: 15px">产量单位选择：</span>
        <el-select
          v-model="outputTrackingForm.selectUnitOfProduction"
          placeholder="请选择"
          style="width: 100px"
          class="f1"
        >
          <el-option
            v-for="item in outputTrackingForm.unitOfProduction"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 15px" @click="queryOutputTrackingTableData"
          >搜索</el-button
        >
        <el-button type="primary" @click="downloadOutputTracking">下载</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-table :data="outputTrackingTableData" highlight style="width: 100%" height="500px">
          <el-table-column
            fixed
            prop="type"
            :label="outputTrackingTableDate"
            align="center"
            width="300"
          ></el-table-column>
          <el-table-column label="作业公司" align="center">
            <el-table-column prop="zygsjc" label="基础" align="center" width="100"> </el-table-column>
            <el-table-column prop="zygscs" label="措施" align="center" width="100"> </el-table-column>
            <el-table-column prop="zygstz" label="调整井" align="center" width="100"> </el-table-column>
            <el-table-column prop="zygskf" label="开发井" align="center" width="100"> </el-table-column>
            <el-table-column prop="zygshj" label="合计" align="center" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="QHD32-6" align="center">
            <el-table-column prop="seljc" label="基础" align="center" width="100"> </el-table-column>
            <el-table-column prop="selcs" label="措施" align="center" width="100"> </el-table-column>
            <el-table-column prop="seltz" label="调整井" align="center" width="100"> </el-table-column>
            <el-table-column prop="selhj" label="合计" align="center" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="BZ25-1" align="center">
            <el-table-column prop="ewyjc" label="基础" align="center" width="100"> </el-table-column>
            <el-table-column prop="ewycs" label="措施" align="center" width="100"> </el-table-column>
            <el-table-column prop="ewytz" label="调整井" align="center" width="100"> </el-table-column>
            <el-table-column prop="ewyhj" label="合计" align="center" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="BZ25-1S" align="center">
            <el-table-column prop="ewysjc" label="基础" align="center" width="100"> </el-table-column>
            <el-table-column prop="ewyscs" label="措施" align="center" width="100"> </el-table-column>
            <el-table-column prop="ewystz" label="调整井" align="center" width="100"> </el-table-column>
            <el-table-column prop="ewyshj" label="合计" align="center" width="100"> </el-table-column>
          </el-table-column>
          <el-table-column label="BZ19-4" align="center">
            <el-table-column prop="yjsjc" label="基础" align="center" width="100"> </el-table-column>
            <el-table-column prop="yjscs" label="措施" align="center" width="100"> </el-table-column>
            <el-table-column prop="yjstz" label="调整井" align="center" width="100"> </el-table-column>
            <el-table-column prop="yjskf" label="开发井" align="center" width="100"> </el-table-column>
            <el-table-column prop="yjshj" label="合计" align="center" width="100"> </el-table-column>
            <el-table-column prop="bzhj" label="BZ合计" align="center" width="100"> </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="预警模型条件" :visible.sync="openDetailedDialog" width="80%">
      <el-table :data="detailedTable" highlight class="z-table" style="width: 100%" height="500px" border>
        <el-table-column type="index" label="序号" align="center" width="80"> </el-table-column>
        <el-table-column prop="detailed" label="预警条件" align="left" header-align="center"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import {
  outputTracingAnalysis,
  reasonAnalysis,
  outputTracing,
  platformOutputContributeAnalysis,
  dailyMainEvent,
  wellOutputWaveAnalysis,
} from "@/api/oilDeposit/rem-02/outputmanagement.js";
import { getReportFroms } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { getWellOutputWaveAnalysisNum } from "@/api/oilDeposit/rem-04/yieId.js";
import { exportComplexHeaderExcelFromJson } from "@/lib/exportExcel.js";
import { exportExcel } from "@/lib/exportExcel.js";

export default {
  name: "fluctuationWarningAnalysis",
  components: {
    Echart,
  },
  filters: {
    numberToTwo(val) {
      if (val) {
        return parseFloat(Number(val).toFixed(2));
      } else {
        return "-";
      }
    },
  },
  data() {
    return {
      wellAllNum: "",
      //油田
      oilField: [],
      companyId: "",
      //油田名字
      oilFieldName: "秦皇岛32-6油田",
      //油田选中值
      selectOilField: "3FC9A818F5BC43B88270DB80BBB3018F",
      //区块
      block: [{ fieldId: "", name: "" }],
      //区块选中值
      selectBlock: "",
      //预警分析日期
      selectDate: [],
      //产量单位
      unitOfProduction: [
        { label: "m³", value: "m" },
        { label: "t", value: "t" },
      ],
      //产量单位选择值
      selectUnitOfProduction: "m",
      //异常分析原因
      reasonAnalysises: [],
      //合并行数组
      reasonAnalysisSpan: [],
      //切换变量
      isShowTable: false,
      //动态波动值
      setParaValue: "",
      //单井动态分析单位
      unitValue: "t",
      //油田产量跟踪折线图
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
          x: 150,
          y: 70,
          x2: 80,
          y2: 100,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "产量跟踪预警分析",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        backgroundColor: "transparent",
        color: ["#69b146", "#72818B", "#9A72FF", "#00BC9C"],
        legend: {
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
          x: "center",
          bottom: 30,
        },
        xAxis: {
          name: "日期 (日)",
          // nameTextStyle: {
          //     color: "#8FA4CC",
          //     fontSize: 14,
          // },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            padding: [10, 0, 0, 0],
            fontSize: 14,
            showMinLabel: true,
            showMaxLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          axisTick: {
            show: true,
            inside: true,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "产油量(m³/d)",
          nameLocation: "middle",
          nameGap: 100,
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          scale: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          axisTick: {
            show: true,
            inside: true,
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
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "平台产量动态分析",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
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
            formatter: function (param) {
              let res = "";
              let name = (param.name ? param.name : "") + " ";
              let value = " " + param.value ? param.value : 0;
              let percent = " " + (param.percent ? param.percent : 0) + "%";
              res = name + value + percent;
              return res;
            },
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
      barChart: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          x: 50,
          y: 100,
          x2: 50,
          y2: 80,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "单井产量波动分析",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        xAxis: {
          name: "井",
          nameGap: 20,
          type: "category",
          data: [],
          axisLabel: {
            rotate: 25,
            color: "#8FA4CC",
            fontSize: 14,
            margin: 20,
            showMinLabel: true,
            showMaxLabel: true,
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: "#8FA4CC",
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
          // scale: true,
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        series: {
          type: "bar",
          label: {
            show: true,
          },
          markLine: {
            lineStyle: {
              type: "solid",
              color: "#8FA4CC",
            },
            symbol: "none",
            animation: false,
            silent: true,
            data: [
              {
                yAxis: 0,
                name: "",
                label: {
                  show: false,
                },
              },
            ],
          },
          barWidth: 22,
          data: [],
        },
      },
      //异常数据信息
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
      //当前日期
      currentDate: "",
      //合并单元格计算多行
      spanArr: [],
      //折线最小值
      lineMin: 0,
      //单井产量波动分析
      dialogVisible: false,
      // 预警详细信息弹窗
      openDetailedDialog: false,
      detailedTable: [],
      //产量分析数据内容
      productAnaysisTable: [],
      //缓存权限数据
      myWidget: [],
      userInfo: {},
      //按钮权限组
      //添加记录
      canAddInfo: false,
      //修改数据
      canUpdateInfo: false,
      //发布数据
      canSendInfo: false,
      //删除数据
      canDeleteInfo: false,
      //下载数据
      canDownload: false,
      //上传数据
      canUpload: false,
      //产量跟踪dialog显示
      outputTrackingForm: {
        //跟踪查询日期
        queryDate: "",
        //产量单位选择值
        selectUnitOfProduction: "m³",
        //产量跟踪分页信息
        page: 1,
        pageSize: 10,
        total: 0,
        //产量单位
        unitOfProduction: [
          {
            label: "m³",
            value: "m",
          },
          {
            label: "t",
            value: "t",
          },
        ],
      },
      outputTracking: false,
      outputTrackingTableData: [],
      allOutputTrackingTableData: [
        {
          type: "报表产量/",
          code: "baoBiao",
        },
        {
          type: "前一日报表产量/",
          code: "baoBiaoYesterday",
        },
        {
          type: "滚动预测/",
          code: "yuCe",
        },
        // {"type": '滚动预测(奋斗)/', code: '滚动预测(奋斗)/'},
        {
          type: "分公司奋斗/",
          code: "fenDou",
        },
        {
          type: "分公司考核/",
          code: "kaoHe",
        },
        {
          type: "报表产量-滚动预测产量",
          code: "baoBiaoYuCeDiff",
        },
        {
          type: "当日-前一日产量",
          code: "当日-前一日产量",
        },
        {
          type: "下舱产量/",
          code: "下舱产量/",
        },
        {
          type: "前一日下舱产量/",
          code: "前一日下舱产量/",
        },
        {
          type: "下舱产量-滚动预测(/",
          code: "下舱产量-滚动预测(/",
        },
        {
          type: "下舱产量-滚动预测奋斗(/",
          code: "下舱产量-滚动预测奋斗(/",
        },
        {
          type: "下舱产量-分公司奋斗",
          code: "下舱产量-分公司奋斗",
        },
        {
          type: "下舱产量-分公司考核",
          code: "下舱产量-分公司考核",
        },
      ],
      outputTrackingTableDate: "",
    };
  },
  watch: {
    //监听选择油田 油田改变 区块数组进行改变
    selectOilField(val) {
      this.block = [];
      this.selectBlock = "";
      //查询区块信息
      this.getFieldsData(val);
    },
  },
  created() {
    //初始化时间段
    this.selectDate = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().addDays(-1).format("yyyy-MM-dd")];
    //初始化筛选设置
    this.setParaValue = "2";
  },
  mounted() {
    this.initData();
  },
  methods: {
    //重置
    resetting() {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data());
        //初始化时间段
        this.selectDate = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().addDays(-1).format("yyyy-MM-dd")];
        //初始化筛选设置
        this.setParaValue = "2";
        this.initData();
      });
    },
    //表格合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    //通过颜色判断是否切换（临时） 切换下图中异常信息
    clickCall(item) {
      //当前时间
      let theDate = item.name;
      //选中的油田
      let oilFieldId = this.selectOilField;
      //选中的区块
      let fieldId = this.selectBlock;
      //选中单位
      let unitType = this.selectUnitOfProduction;
      if (item.seriesName == "实际产量") {
        if (item.color == "#FF5844" || item.color == "#1379F7" || item.color == "#F5BE43") {
          //这里是点击切换回去普通和归因分析进行
          if (this.isShowTable == false) {
            //归因分析事件
            this.getReasonAnalysis(fieldId, oilFieldId, theDate, unitType);
            //当前时间
            this.currentDate = theDate;
            //切换窗口
            this.isShowTable = true;
          } else {
            //产量跟踪分析
            this.getOutputTracing(fieldId, oilFieldId, theDate, unitType);
            //平台产量动态分析
            this.getContributeAnalysis(fieldId, oilFieldId, theDate, unitType, false);
            //单井产量波动分析
            this.getWellOutputWave(fieldId, oilFieldId, theDate, unitType, this.setParaValue);
            //当日关键事件
            this.getDailyMainEvent(fieldId, oilFieldId, theDate, unitType);
            //当前时间
            this.currentDate = theDate;
            //切换窗口
            this.isShowTable = false;
          }
        } else {
          //产量跟踪分析
          this.getOutputTracing(fieldId, oilFieldId, theDate, unitType);
          //平台产量动态分析
          this.getContributeAnalysis(fieldId, oilFieldId, theDate, unitType, false);
          //单井产量波动分析
          this.getWellOutputWave(fieldId, oilFieldId, theDate, unitType, this.setParaValue);
          //当日关键事件
          this.getDailyMainEvent(fieldId, oilFieldId, theDate, unitType);
          this.currentDate = theDate;
          this.isShowTable = false;
        }
      }
    },

    //初始化页面数据
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.companyId = res.data.data[0]?.currentTenantBindOrgId
            ? res.data.data[0].currentTenantBindOrgId
            : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilField = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.selectOilField = this.oilField[0].ogfId ? this.oilField[0].ogfId : undefined;
          }
        }
      });
      await QueryReservoirAnalyseUnit({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data;
          this.block.unshift({
            reservoirAnalyseUnitId: this.selectOilField,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.selectBlock = this.selectOilField;
        }
      });
      //开始日期
      let startDate = this.selectDate[0];
      //结束日期
      let endDate = this.selectDate[1];
      //当前时间需要修改样式
      this.currentDate = this.selectDate[1];
      //产量跟踪分析(开始日期，结束日期，选择区块，单位选择，油田)
      await this.getOutputTracinAnalysis(
        startDate,
        endDate,
        this.selectBlock,
        this.selectUnitOfProduction,
        this.selectOilField,
      );
      //产量跟踪分析（区块，油田，当前日期，单位）
      this.getOutputTracing(this.selectBlock, this.selectOilField, this.currentDate, this.selectUnitOfProduction);
      //平台产量动态分析（区块，油田，当前日期，单位）
      this.getContributeAnalysis(
        this.selectBlock,
        this.selectOilField,
        this.currentDate,
        this.selectUnitOfProduction,
        false,
      );
      //单井产量波动分析（区块，油田，当前日期，单位，波动值）
      this.getWellOutputWave(
        this.selectBlock,
        this.selectOilField,
        this.currentDate,
        this.selectUnitOfProduction,
        this.setParaValue,
      );
      //当日关键事件（区块，油田，当前日期，单位）
      this.getDailyMainEvent(this.selectBlock, this.selectOilField, this.currentDate, this.selectUnitOfProduction);
    },
    //跳转产量运行分析报告
    switchUpPage() {
      this.$router.push({
        path: "/yield/productionOperationAnalysisReport",
        query: {
          oilFieldName: this.oilFieldName, //油田名称
          oilField: this.selectOilField,
          block: this.selectBlock,
          theDate: this.currentDate, //当前时间
          unitType: this.selectUnitOfProduction, //单元名称
          selectDate: this.selectDate.join(","),
          unitValue: this.setParaValue, //波动值
          wellIds: JSON.stringify(this.productAnaysisTable),
        },
      });
    },
    //跳转产量异常归因分析报告
    switchDownPage() {
      //当前时间
      let theDate = this.currentDate;
      //区块
      let block = this.selectBlock;
      //油田id
      let oilField = this.selectOilField;
      //单元名称
      let unitType = this.selectUnitOfProduction;
      //油田名称
      let oilFieldName = this.oilFieldName;
      this.$router.push({
        path: "/yield/analysisAbnormal",
        query: {
          block: block,
          oilField: oilField,
          theDate: theDate,
          unitType: unitType,
          oilFieldName: oilFieldName,
          canDownload: this.canDownload,
        },
      });
    },
    //跳转更多
    jumpMore() {
      this.$router.push({
        path: "/yield/statisticalTableProduction",
        query: {
          wellIds: JSON.stringify(this.productAnaysisTable),
        },
      });
    },
    //获取油田信息
    getOilFields() {
      let _this = this;
      QueryOgfDetail({}).then((res) => {
        _this.oilField = res.data.data;
        //选择油田默认选秦皇岛32-6油田
        if (_this.oilField.length == 0) {
          _this.selectOilField = "";
        } else {
          _this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
        }
      });
    },
    //获得区块信息
    getFieldsData(oilFieldId) {
      QueryReservoirAnalyseUnit({ ogfId: oilFieldId }).then((res) => {
        this.block = res.data.data;
        this.block.unshift({
          reservoirAnalyseUnitId: this.selectOilField,
          reservoirAnalyseUnitName: "全部",
          reservoirAnalyseUnitNo: "全部",
        });
        this.selectBlock = this.selectOilField;
      });
    },
    //油田产量跟踪预警分析
    async getOutputTracinAnalysis(beginDate, endDate, fieldId, outputUnit, wellId) {
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
      await outputTracingAnalysis(request).then((res) => {
        //获得图表数据
        let data = res.data.data.chart;
        //获取图例数据
        let legendData = [];
        //获取折线图数据
        let series = [];
        //x轴数组 用于对x轴刻度进行判定
        //let xAxisData = []; 暂时不用
        this.lineMin = undefined;
        let xSet = new Set();
        if (data) {
          //折线图数组
          //请求结果
          let lineChartArray = data.linearDataSets || [];
          //遍历数组数据
          for (let i = 0; i < lineChartArray.length; i++) {
            legendData.push({
              name: lineChartArray[i].label,
              icon: "rect",
              itemWidth: 12,
              itemHeight: 6,
              itemGap: 14,
              textStyle: {
                color: "#8FA4CC",
                fontSize: 14,
              },
            });
            series.push(_this.getEchartsLineSeries(lineChartArray[i], xSet));
          }

          legendData.push({
            name: "红色预警",
            icon: "circle",
            itemGap: 14,
            itemStyle: {
              color: "#FF5844",
            },
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
          });
          legendData.push({
            name: "蓝色预警",
            icon: "circle",
            itemGap: 14,
            itemStyle: {
              color: "#1379F7",
            },
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
          });
          legendData.push({
            name: "黄色预警",
            icon: "circle",
            itemGap: 14,
            itemStyle: {
              color: "#F5BE43",
            },
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
          });
          series.push({ name: "蓝色预警", data: [], type: "line" });
          series.push({ name: "红色预警", data: [], type: "line" });
          series.push({ name: "黄色预警", data: [], type: "line" });
        }
        _this.echartOption.legend.data = legendData;
        _this.echartOption.series = series;
        console.log("_this.echartOption", _this.echartOption);
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
          _this.echartOption.yAxis.name = "产油量(t/d)";
        } else if (outputUnit == "m") {
          _this.echartOption.yAxis.name = "产油量(m³/d)";
        }
      });
    },

    //获得折线图数据series
    getEchartsLineSeries(lineData, xSet) {
      //数据拼接
      let seriesData = {};
      seriesData.name = lineData.label;
      seriesData.type = "line";
      //其他标点消失
      seriesData.symbol = "none";
      //标签名称
      let labelName = lineData.label;
      //所有数据集合
      let allData = [];
      let linearData = lineData.linearData;
      if (this.lineMin == undefined) {
        this.lineMin = linearData[0].value;
      }
      if (labelName == "实际产量") {
        this.currentDate = linearData[linearData.length - 1].label;
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

    //获取归因分析表信息(需要进行修改)
    getReasonAnalysis(fieldId, oilFieldId, theDate, outputUnit) {
      let request = {
        fieldId: fieldId,
        oilFieldId: oilFieldId,
        theDate: theDate,
        outputUnit: outputUnit,
      };
      reasonAnalysis(request).then((res) => {
        //获取归因数据
        let data = res.data.data;
        //数组赋值于变量
        this.reasonAnalysises = data.reasonAnalysises;
        this.getSpanArr(this.reasonAnalysises);
      });
    },
    //判断表格数据中 技术指标的重复进行合并 获得合并的行信息
    getSpanArr(data) {
      this.spanArr = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[i].platformName === data[i - 1].platformName) {
            //platformName可以根据你要合并的列更改
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
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
        if (data == null) {
          _this.realOutput = "";
          _this.realOutputFlag = "";
          _this.planOutput = "";
          _this.remainingLevel = "";
          _this.rollingPrediction = "";
        } else {
          //实际产量
          _this.realOutput = Number(data.realOutput).toFixed(2);
          _this.realOutputFlag = Number(data.realOutputFlag);
          _this.planOutput = Number(data.planOutput).toFixed(2);
          _this.remainingLevel = Number(data.remainingLevel).toFixed(2);
          _this.rollingPrediction = Number(data.rollingPrediction).toFixed(2);
        }

        if (unitType == "m") {
          _this.realOutput = _this.realOutput.length != 0 ? _this.realOutput + "(m³/d)" : "";
          _this.planOutput = _this.planOutput.length != 0 ? _this.planOutput + "(m³/d)" : "";
          _this.remainingLevel = _this.remainingLevel.length != 0 ? _this.remainingLevel + "(m³/d)" : "";
          _this.rollingPrediction = _this.rollingPrediction.length != 0 ? _this.rollingPrediction + "(m³/d)" : "";
        } else if (unitType == "t") {
          _this.realOutput = _this.realOutput.length != 0 ? _this.realOutput + "(t/d)" : "";
          _this.planOutput = _this.planOutput.length != 0 ? _this.planOutput + "(t/d)" : "";
          _this.remainingLevel = _this.remainingLevel.length != 0 ? _this.remainingLevel + "(t/d)" : "";
          _this.rollingPrediction = _this.rollingPrediction.length != 0 ? _this.rollingPrediction + "(t/d)" : "";
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
        let data = null;
        //请求数据为为空的情况下所做处理
        if (res.data.data.chart != null) {
          data = res.data.data.chart.pieDataSet[0];
        }
        //获取图例数据
        let legendData = [];
        //获取折线图数据
        let seriesData = [];
        //饼图数据
        if (data.pieDatas != null) {
          let pieData = data.pieDatas;
          for (let i = 0; i < pieData.length; i++) {
            let detail = {};
            detail.value = pieData[i].value.toFixed(2);
            detail.name = pieData[i].label;
            seriesData.push(detail);
            legendData.push(pieData[i].label);
          }
        }
        legendData.sort();
        _this.pieEchart.legend.data = legendData;
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
      this.productAnaysisTable = [];
      wellOutputWaveAnalysis(request).then((res) => {
        let xAxisData = [];
        let seriesData = [];
        if (res.data.code == 200) {
          this.productAnaysisTable = res.data.data.wellAllocDailiesAll;
          //获取产油数据项
          let data = res.data.data.oilChart;
          if (res.data.data.oilChart != null) {
            let barDate = data.barDataSets[0].barDatas;
            for (let i = 0; i < barDate.length; i++) {
              xAxisData.push(barDate[i].label);
            }
            seriesData = _this.getBarChartSeries(barDate);
          }
        }
        _this.barChart.xAxis.data = xAxisData;
        _this.barChart.series.data = seriesData;
        //单位切换
        if (unitType == "t") {
          _this.barChart.yAxis.name = "产油量变化(t)";
          _this.unitValue = "t";
        } else if (unitType == "m") {
          _this.barChart.yAxis.name = "产油量变化(m³)";
          _this.unitValue = "m³";
        }

        getWellOutputWaveAnalysisNum().then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let data = res.data.data;
            this.wellAllNum = data;
          }
        });
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
        if (data == null) {
          _this.eventData = [];
        } else {
          _this.eventData = data.dailyMainEvents;
        }
      });
    },

    //显示作业
    showOutputTracking() {
      this.outputTracking = true;
      this.outputTrackingForm.queryDate = new Date().addDays(-1).format("yyyy-MM-dd");
      this.outputTrackingForm.selectUnitOfProduction = "t";
      this.queryOutputTrackingTableData();
    },

    //查询作业公司产量跟踪表格数据
    queryOutputTrackingTableData() {
      let queryParams = {
        date: this.outputTrackingForm.queryDate,
        unitType: this.outputTrackingForm.selectUnitOfProduction,
      };
      getReportFroms(queryParams).then((data) => {
        if (data.data.msg == "success") {
          this.outputTrackingTableData = this.dealOutputTrackingData(data.data.data);
          this.outputTrackingTableDate = this.outputTrackingForm.queryDate;
        } else {
          this.$message({
            showClose: true,
            message: "作业公司产量跟踪数据获取失败！",
            type: "error",
          });
        }
        //this.outputTrackingTableDate = outputTrackingForm.queryDate
        //this.outputTrackingTableDate = data.data.data;
      });
    },
    dealOutputTrackingData(objData) {
      var reList = [];
      var keys = Object.keys(objData);
      /*for (var i = 0; i < keys.length; i++) {
                    var item = keys[i];
                }*/
      if (keys == null || keys.length == 0) {
        return reList;
      }
      keys.forEach((item, index) => {
        var lineTitle = this.dealLineTitle(item);
        if (lineTitle != null && lineTitle != "") {
          var lineObj = {
            type: lineTitle,
            code: item,
            zygsjc:
              objData[item]["QHD32-6"]["jiChu"] == null &&
              objData[item]["BZ25-1"]["jiChu"] == null &&
              objData[item]["BZ25-1S"]["jiChu"] == null &&
              objData[item]["BZ19-4"]["jiChu"] == null
                ? ""
                : (
                    (objData[item]["QHD32-6"]["jiChu"] ? parseFloat(objData[item]["QHD32-6"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1"]["jiChu"] ? parseFloat(objData[item]["BZ25-1"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1S"]["jiChu"] ? parseFloat(objData[item]["BZ25-1S"]["jiChu"]) : 0) +
                    (objData[item]["BZ19-4"]["jiChu"] ? parseFloat(objData[item]["BZ19-4"]["jiChu"]) : 0)
                  ).toFixed(2),
            zygscs:
              objData[item]["QHD32-6"]["cuoShi"] == null &&
              objData[item]["BZ25-1"]["cuoShi"] == null &&
              objData[item]["BZ25-1S"]["cuoShi"] == null &&
              objData[item]["BZ19-4"]["cuoShi"] == null
                ? ""
                : (
                    (objData[item]["QHD32-6"]["cuoShi"] ? parseFloat(objData[item]["QHD32-6"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1S"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1S"]["cuoShi"]) : 0) +
                    (objData[item]["BZ19-4"]["cuoShi"] ? parseFloat(objData[item]["BZ19-4"]["cuoShi"]) : 0)
                  ).toFixed(2),
            zygstz:
              objData[item]["QHD32-6"]["tiaoZheng"] == null &&
              objData[item]["BZ25-1"]["tiaoZheng"] == null &&
              objData[item]["BZ25-1S"]["tiaoZheng"] == null &&
              objData[item]["BZ19-4"]["tiaoZheng"] == null
                ? ""
                : (
                    (objData[item]["QHD32-6"]["tiaoZheng"] ? parseFloat(objData[item]["QHD32-6"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ25-1"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ25-1S"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1S"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ19-4"]["tiaoZheng"] ? parseFloat(objData[item]["BZ19-4"]["tiaoZheng"]) : 0)
                  ).toFixed(2),
            zygskf: objData[item]["BZ19-4"]["kaiFa"] ? parseFloat(objData[item]["BZ19-4"]["kaiFa"].toFixed(2)) : "",
            zygshj:
              objData[item]["QHD32-6"]["jiChu"] == null &&
              objData[item]["BZ25-1"]["jiChu"] == null &&
              objData[item]["BZ25-1S"]["jiChu"] == null &&
              objData[item]["BZ19-4"]["jiChu"] == null &&
              objData[item]["QHD32-6"]["cuoShi"] == null &&
              objData[item]["BZ25-1"]["cuoShi"] == null &&
              objData[item]["BZ25-1S"]["cuoShi"] == null &&
              objData[item]["BZ19-4"]["cuoShi"] == null &&
              objData[item]["QHD32-6"]["tiaoZheng"] == null &&
              objData[item]["BZ25-1"]["tiaoZheng"] == null &&
              objData[item]["BZ25-1S"]["tiaoZheng"] == null &&
              objData[item]["BZ19-4"]["tiaoZheng"] == null &&
              objData[item]["BZ19-4"]["kaiFa"] == null
                ? ""
                : (
                    (objData[item]["QHD32-6"]["jiChu"] ? parseFloat(objData[item]["QHD32-6"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1"]["jiChu"] ? parseFloat(objData[item]["BZ25-1"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1S"]["jiChu"] ? parseFloat(objData[item]["BZ25-1S"]["jiChu"]) : 0) +
                    (objData[item]["BZ19-4"]["jiChu"] ? parseFloat(objData[item]["BZ19-4"]["jiChu"]) : 0) +
                    (objData[item]["QHD32-6"]["cuoShi"] ? parseFloat(objData[item]["QHD32-6"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1S"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1S"]["cuoShi"]) : 0) +
                    (objData[item]["BZ19-4"]["cuoShi"] ? parseFloat(objData[item]["BZ19-4"]["cuoShi"]) : 0) +
                    (objData[item]["QHD32-6"]["tiaoZheng"] ? parseFloat(objData[item]["QHD32-6"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ25-1"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ25-1S"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1S"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ19-4"]["tiaoZheng"] ? parseFloat(objData[item]["BZ19-4"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ19-4"]["kaiFa"] ? parseFloat(objData[item]["BZ19-4"]["kaiFa"]) : 0)
                  ).toFixed(2),
            seljc: objData[item]["QHD32-6"]["jiChu"] ? parseFloat(objData[item]["QHD32-6"]["jiChu"].toFixed(2)) : "",
            selcs: objData[item]["QHD32-6"]["cuoShi"] ? parseFloat(objData[item]["QHD32-6"]["cuoShi"].toFixed(2)) : "",
            seltz: objData[item]["QHD32-6"]["tiaoZheng"]
              ? parseFloat(objData[item]["QHD32-6"]["tiaoZheng"].toFixed(2))
              : "",
            selhj:
              objData[item]["QHD32-6"]["jiChu"] == null &&
              objData[item]["QHD32-6"]["cuoShi"] == null &&
              objData[item]["QHD32-6"]["tiaoZheng"] == null
                ? ""
                : (
                    (objData[item]["QHD32-6"]["jiChu"] ? parseFloat(objData[item]["QHD32-6"]["jiChu"]) : 0) +
                    (objData[item]["QHD32-6"]["cuoShi"] ? parseFloat(objData[item]["QHD32-6"]["cuoShi"]) : 0) +
                    (objData[item]["QHD32-6"]["tiaoZheng"] ? parseFloat(objData[item]["QHD32-6"]["tiaoZheng"]) : 0)
                  ).toFixed(2),
            ewyjc: objData[item]["BZ25-1"]["jiChu"] ? parseFloat(objData[item]["BZ25-1"]["jiChu"].toFixed(2)) : "",
            ewycs: objData[item]["BZ25-1"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1"]["cuoShi"].toFixed(2)) : "",
            ewytz: objData[item]["BZ25-1"]["tiaoZheng"]
              ? parseFloat(objData[item]["BZ25-1"]["tiaoZheng"].toFixed(2))
              : "",
            ewyhj:
              objData[item]["BZ25-1"]["jiChu"] == null &&
              objData[item]["BZ25-1"]["cuoShi"] == null &&
              objData[item]["BZ25-1"]["tiaoZheng"] == null
                ? ""
                : (
                    (objData[item]["BZ25-1"]["jiChu"] ? parseFloat(objData[item]["BZ25-1"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1"]["tiaoZheng"]) : 0)
                  ).toFixed(2),
            ewysjc: objData[item]["BZ25-1S"]["jiChu"] ? parseFloat(objData[item]["BZ25-1S"]["jiChu"].toFixed(2)) : "",
            ewyscs: objData[item]["BZ25-1S"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1S"]["cuoShi"].toFixed(2)) : "",
            ewystz: objData[item]["BZ25-1S"]["tiaoZheng"]
              ? parseFloat(objData[item]["BZ25-1S"]["tiaoZheng"].toFixed(2))
              : "",
            ewyshj:
              objData[item]["BZ25-1S"]["jiChu"] == null &&
              objData[item]["BZ25-1S"]["cuoShi"] == null &&
              objData[item]["BZ25-1S"]["tiaoZheng"] == null
                ? ""
                : (
                    (objData[item]["BZ25-1S"]["jiChu"] ? parseFloat(objData[item]["BZ25-1S"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1S"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1S"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1S"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1S"]["tiaoZheng"]) : 0)
                  ).toFixed(2),
            yjsjc: objData[item]["BZ19-4"]["jiChu"] ? parseFloat(objData[item]["BZ19-4"]["jiChu"].toFixed(2)) : "",
            yjscs: objData[item]["BZ19-4"]["cuoShi"] ? parseFloat(objData[item]["BZ19-4"]["cuoShi"].toFixed(2)) : "",
            yjstz: objData[item]["BZ19-4"]["tiaoZheng"]
              ? parseFloat(objData[item]["BZ19-4"]["tiaoZheng"].toFixed(2))
              : "",
            yjskf: objData[item]["BZ19-4"]["kaiFa"] ? parseFloat(objData[item]["BZ19-4"]["kaiFa"].toFixed(2)) : "",
            yjshj:
              objData[item]["BZ19-4"]["jiChu"] == null &&
              objData[item]["BZ19-4"]["cuoShi"] == null &&
              objData[item]["BZ19-4"]["tiaoZheng"] == null &&
              objData[item]["BZ19-4"]["kaiFa"] == null
                ? ""
                : (
                    (objData[item]["BZ19-4"]["jiChu"] ? parseFloat(objData[item]["BZ19-4"]["jiChu"]) : 0) +
                    (objData[item]["BZ19-4"]["cuoShi"] ? parseFloat(objData[item]["BZ19-4"]["cuoShi"]) : 0) +
                    (objData[item]["BZ19-4"]["tiaoZheng"] ? parseFloat(objData[item]["BZ19-4"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ19-4"]["kaiFa"] ? parseFloat(objData[item]["BZ19-4"]["kaiFa"]) : 0)
                  ).toFixed(2),
            bzhj:
              objData[item]["BZ25-1"]["jiChu"] == null &&
              objData[item]["BZ25-1S"]["jiChu"] == null &&
              objData[item]["BZ19-4"]["jiChu"] == null &&
              objData[item]["BZ25-1"]["cuoShi"] == null &&
              objData[item]["BZ25-1S"]["cuoShi"] == null &&
              objData[item]["BZ19-4"]["cuoShi"] == null &&
              objData[item]["BZ25-1"]["tiaoZheng"] == null &&
              objData[item]["BZ25-1S"]["tiaoZheng"] == null &&
              objData[item]["BZ19-4"]["tiaoZheng"] == null &&
              objData[item]["BZ19-4"]["kaiFa"] == null
                ? ""
                : (
                    (objData[item]["BZ25-1"]["jiChu"] ? parseFloat(objData[item]["BZ25-1"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1S"]["jiChu"] ? parseFloat(objData[item]["BZ25-1S"]["jiChu"]) : 0) +
                    (objData[item]["BZ19-4"]["jiChu"] ? parseFloat(objData[item]["BZ19-4"]["jiChu"]) : 0) +
                    (objData[item]["BZ25-1"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1S"]["cuoShi"] ? parseFloat(objData[item]["BZ25-1S"]["cuoShi"]) : 0) +
                    (objData[item]["BZ19-4"]["cuoShi"] ? parseFloat(objData[item]["BZ19-4"]["cuoShi"]) : 0) +
                    (objData[item]["BZ25-1"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ25-1S"]["tiaoZheng"] ? parseFloat(objData[item]["BZ25-1S"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ19-4"]["tiaoZheng"] ? parseFloat(objData[item]["BZ19-4"]["tiaoZheng"]) : 0) +
                    (objData[item]["BZ19-4"]["kaiFa"] ? parseFloat(objData[item]["BZ19-4"]["kaiFa"]) : 0)
                  ).toFixed(2),
          };
          reList.push(lineObj);
        }
      });
      let today = reList.find((item) => {
        return item.code == "baoBiao";
      });
      let yesterday = reList.find((item) => {
        return item.code == "baoBiaoYesterday";
      });
      console.log(today, yesterday);
      var obj = {
        type: "当日-前一日产量",
        zygsjc:
          today["zygsjc"] == "" && yesterday["zygsjc"] == "" ? "" : (today["zygsjc"] - yesterday["zygsjc"]).toFixed(2),
        zygscs:
          today["zygscs"] == "" && yesterday["zygscs"] == "" ? "" : (today["zygscs"] - yesterday["zygscs"]).toFixed(2),
        zygstz:
          today["zygstz"] == "" && yesterday["zygstz"] == "" ? "" : (today["zygstz"] - yesterday["zygstz"]).toFixed(2),
        zygskf:
          today["zygskf"] == "" && yesterday["zygskf"] == "" ? "" : (today["zygskf"] - yesterday["zygskf"]).toFixed(2),
        zygshj:
          today["zygshj"] == "" && yesterday["zygshj"] == "" ? "" : (today["zygshj"] - yesterday["zygshj"]).toFixed(2),
        seljc: today["seljc"] == "" && yesterday["seljc"] == "" ? "" : (today["seljc"] - yesterday["seljc"]).toFixed(2),
        selcs: today["selcs"] == "" && yesterday["selcs"] == "" ? "" : (today["selcs"] - yesterday["selcs"]).toFixed(2),
        seltz: today["seltz"] == "" && yesterday["seltz"] == "" ? "" : (today["seltz"] - yesterday["seltz"]).toFixed(2),
        selhj: today["selhj"] == "" && yesterday["selhj"] == "" ? "" : (today["selhj"] - yesterday["selhj"]).toFixed(2),
        ewyjc: today["ewyjc"] == "" && yesterday["ewyjc"] == "" ? "" : (today["ewyjc"] - yesterday["ewyjc"]).toFixed(2),
        ewycs: today["ewycs"] == "" && yesterday["ewycs"] == "" ? "" : (today["ewycs"] - yesterday["ewycs"]).toFixed(2),
        ewytz: today["ewytz"] == "" && yesterday["ewytz"] == "" ? "" : (today["ewytz"] - yesterday["ewytz"]).toFixed(2),
        ewyhj: today["ewyhj"] == "" && yesterday["ewyhj"] == "" ? "" : (today["ewyhj"] - yesterday["ewyhj"]).toFixed(2),
        ewysjc:
          today["ewysjc"] == "" && yesterday["ewysjc"] == "" ? "" : (today["ewysjc"] - yesterday["ewysjc"]).toFixed(2),
        ewyscs:
          today["ewyscs"] == "" && yesterday["ewyscs"] == "" ? "" : (today["ewyscs"] - yesterday["ewyscs"]).toFixed(2),
        ewystz:
          today["ewystz"] == "" && yesterday["ewystz"] == "" ? "" : (today["ewystz"] - yesterday["ewystz"]).toFixed(2),
        ewyshj:
          today["ewyshj"] == "" && yesterday["ewyshj"] == "" ? "" : (today["ewyshj"] - yesterday["ewyshj"]).toFixed(2),
        yjsjc: today["yjsjc"] == "" && yesterday["yjsjc"] == "" ? "" : (today["yjsjc"] - yesterday["yjsjc"]).toFixed(2),
        yjscs: today["yjscs"] == "" && yesterday["yjscs"] == "" ? "" : (today["yjscs"] - yesterday["yjscs"]).toFixed(2),
        yjstz: today["yjstz"] == "" && yesterday["yjstz"] == "" ? "" : (today["yjstz"] - yesterday["yjstz"]).toFixed(2),
        yjskf: today["yjskf"] == "" && yesterday["yjskf"] == "" ? "" : (today["yjskf"] - yesterday["yjskf"]).toFixed(2),
        yjshj: today["yjshj"] == "" && yesterday["yjshj"] == "" ? "" : (today["yjshj"] - yesterday["yjshj"]).toFixed(2),
        bzhj: today["bzhj"] == "" && yesterday["bzhj"] == "" ? "" : (today["bzhj"] - yesterday["bzhj"]).toFixed(2),
      };
      reList.push(obj);
      var finalList = [];
      this.allOutputTrackingTableData.forEach((item, index) => {
        var lineTitle = this.dealLineTitle(item.code);
        console.log(lineTitle, item.code);
        var obj = reList.find((item1) => {
          return item1.type == lineTitle;
        });
        if (obj == null) {
          obj = {
            type: lineTitle,
            zygsjc: "",
            zygscs: "",
            zygstz: "",
            zygskf: "",
            zygshj: "",
            seljc: "",
            selcs: "",
            seltz: "",
            selhj: "",
            ewyjc: "",
            ewycs: "",
            ewytz: "",
            ewyhj: "",
            ewysjc: "",
            ewyscs: "",
            ewystz: "",
            ewyshj: "",
            yjsjc: "",
            yjscs: "",
            yjstz: "",
            yjskf: "",
            yjshj: "",
            bzhj: "",
          };
        }
        finalList.push(obj);
      });
      return finalList;
    },
    dealLineTitle(value) {
      var unit1 = "",
        unit2 = "";
      switch (this.outputTrackingForm.selectUnitOfProduction) {
        case "t":
          unit1 = "吨";
          unit2 = "吨";
          break;
        case "m":
          unit1 = "m³";
          //unit2 = '10<sup style="font-size: 5px">4</sup>m³';
          unit2 = "m³";
          break;
      }
      var lineTitle = "";
      switch (value) {
        case "baoBiao":
          lineTitle = "报表产量/" + unit1;
          break;
        case "下舱产量/":
          lineTitle = "下舱产量/" + unit1;
          break;
        case "baoBiaoYesterday":
          lineTitle = "前一日报表产量/" + unit1;
          break;
        case "前一日下舱产量/":
          lineTitle = "前一日下舱产量/" + unit1;
          break;
        case "yuCe":
          lineTitle = "滚动预测/" + unit2;
          break;
        // case "滚动预测(奋斗)/":
        //     lineTitle = '滚动预测(奋斗)/' + unit2;
        //     break;
        case "fenDou":
          lineTitle = "分公司奋斗/" + unit2;
          break;
        case "kaoHe":
          lineTitle = "分公司考核/" + unit2;
          break;
        case "当日-前一日产量":
          lineTitle = "当日-前一日产量";
          break;
        case "下舱产量-滚动预测(/":
          lineTitle = "下舱产量-滚动预测(/" + unit2 + ")";
          break;
        case "下舱产量-滚动预测奋斗(/":
          lineTitle = "下舱产量-滚动预测奋斗(/" + unit2 + ")";
          break;
        case "下舱产量-分公司奋斗":
          lineTitle = "下舱产量-分公司奋斗";
          break;
        case "下舱产量-分公司考核":
          lineTitle = "下舱产量-分公司考核";
          break;
        case "baoBiaoYuCeDiff":
          lineTitle = "报表产量-滚动预测产量";
          break;
      }
      return lineTitle;
    },
    //导出作业公司产量跟踪表格数据
    downloadOutputTracking() {
      let queryParams = {
        date: this.outputTrackingForm.queryDate,
        unitType: this.outputTrackingForm.selectUnitOfProduction,
      };
      getReportFroms(queryParams).then((data) => {
        let header = {
          A1: {
            v: this.outputTrackingTableDate,
          },
          B1: {
            v: "作业公司",
          },
          B2: {
            v: "基础",
          },
          C2: {
            v: "措施",
          },
          D2: {
            v: "调整井",
          },
          E2: {
            v: "开发井",
          },
          F2: {
            v: "合计",
          },
          G1: {
            v: "QHD32-6",
          },
          G2: {
            v: "基础",
          },
          H2: {
            v: "措施",
          },
          I2: {
            v: "调整井",
          },
          J2: {
            v: "合计",
          },
          K1: {
            v: "BZ25-1",
          },
          K2: {
            v: "基础",
          },
          L2: {
            v: "措施",
          },
          M2: {
            v: "调整井",
          },
          N2: {
            v: "合计",
          },
          O1: {
            v: "BZ25-1S",
          },
          O2: {
            v: "基础",
          },
          P2: {
            v: "措施",
          },
          Q2: {
            v: "调整井",
          },
          R2: {
            v: "合计",
          },
          S1: {
            v: "BZ19-4",
          },
          S2: {
            v: "基础",
          },
          T2: {
            v: "措施",
          },
          U2: {
            v: "调整井",
          },
          V2: {
            v: "开发井",
          },
          W2: {
            v: "合计",
          },
          X2: {
            v: "BZ合计",
          },
        };
        var merges = [
          //{s开始位置: {c:横坐标，r:纵坐标}, e结束位置: {c:横坐标，r:纵坐标}}
          {
            s: {
              c: 0,
              r: 0,
            },
            e: {
              c: 0,
              r: 1,
            },
          }, //日期 A1 A2合并
          {
            s: {
              c: 1,
              r: 0,
            },
            e: {
              c: 5,
              r: 0,
            },
          }, //作业公司 B1-H1合并
          {
            s: {
              c: 6,
              r: 0,
            },
            e: {
              c: 9,
              r: 0,
            },
          }, //QHD32-6 G1-J1合并
          {
            s: {
              c: 10,
              r: 0,
            },
            e: {
              c: 13,
              r: 0,
            },
          }, //BZ25-1 K1-N1合并
          {
            s: {
              c: 14,
              r: 0,
            },
            e: {
              c: 17,
              r: 0,
            },
          }, //BZ25-1S O1-R1合并
          {
            s: {
              c: 18,
              r: 0,
            },
            e: {
              c: 23,
              r: 0,
            },
          }, //BZ19-4 S1-W1合并
        ];
        //需要进行一次查询
        let listData = this.dealOutputTrackingData(data.data.data);
        var resData = {};
        listData.forEach((item, index) => {
          var cellIndex = parseInt(index) + 3;
          resData["A" + cellIndex] = {
            v: item.type,
          };
          resData["B" + cellIndex] = {
            v: item.zygsjc,
          };
          resData["C" + cellIndex] = {
            v: item.zygscs,
          };
          resData["D" + cellIndex] = {
            v: item.zygstz,
          };
          resData["E" + cellIndex] = {
            v: item.zygskf,
          };
          resData["F" + cellIndex] = {
            v: item.zygshj,
          };
          resData["G" + cellIndex] = {
            v: item.seljc,
          };
          resData["H" + cellIndex] = {
            v: item.selcs,
          };
          resData["I" + cellIndex] = {
            v: item.seltz,
          };
          resData["J" + cellIndex] = {
            v: item.selhj,
          };
          resData["K" + cellIndex] = {
            v: item.ewyjc,
          };
          resData["L" + cellIndex] = {
            v: item.ewycs,
          };
          resData["M" + cellIndex] = {
            v: item.ewytz,
          };
          resData["N" + cellIndex] = {
            v: item.ewyhj,
          };
          resData["O" + cellIndex] = {
            v: item.ewysjc,
          };
          resData["P" + cellIndex] = {
            v: item.ewyscs,
          };
          resData["Q" + cellIndex] = {
            v: item.ewystz,
          };
          resData["R" + cellIndex] = {
            v: item.ewyshj,
          };
          resData["S" + cellIndex] = {
            v: item.yjsjc,
          };
          resData["T" + cellIndex] = {
            v: item.yjscs,
          };
          resData["U" + cellIndex] = {
            v: item.yjstz,
          };
          resData["V" + cellIndex] = {
            v: item.yjskf,
          };
          resData["W" + cellIndex] = {
            v: item.yjshj,
          };
          resData["X" + cellIndex] = {
            v: item.bzhj,
          };
        });
        exportComplexHeaderExcelFromJson(header, merges, resData, this.outputTrackingTableDate + "作业公司产量跟踪");
      });
    },
    //下载导出文件 tableId tableName
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
    //根据查询条件进行
    searchThing() {
      //选中区块值
      let fieldId = this.selectBlock;
      //选中油田值
      let oilFieldId = this.selectOilField;
      //开始日期
      let startDate = this.selectDate[0];
      //结束日期
      let endDate = this.selectDate[1];
      //当前日期
      let currentDate = this.selectDate[1];
      //选择单位类型
      let unitType = this.selectUnitOfProduction;
      //对应id的油田名称
      let fieldContent = this.oilField.find((item) => item.ogfId == oilFieldId);
      //存在油田名称
      this.oilFieldName = fieldContent.ogfName;
      //当前日期
      this.currentDate = currentDate;
      //产量跟踪分析
      this.getOutputTracinAnalysis(startDate, endDate, fieldId, unitType, oilFieldId);
      //产量跟踪分析（区块，油田，当前日期，单位）
      this.getOutputTracing(fieldId, oilFieldId, currentDate, unitType);
      //平台产量动态分析（区块，油田，当前日期，单位）
      this.getContributeAnalysis(fieldId, oilFieldId, currentDate, unitType, false);
      //单井产量波动分析（区块，油田，当前日期，单位，波动值）
      this.getWellOutputWave(fieldId, oilFieldId, currentDate, unitType, this.setParaValue);
      //当日关键事件（区块，油田，当前日期，单位）
      this.getDailyMainEvent(fieldId, oilFieldId, currentDate, unitType);
    },
    //根据波动值来进行查询，单井波动数据查询
    searchWellOutputWave() {
      //选中区块值
      let fieldId = this.selectBlock;
      //选中油田值
      let oilFieldId = this.selectOilField;
      //当前时间
      let currentDate = this.currentDate || this.selectDate[1];
      //选择单位类型
      let unitType = this.selectUnitOfProduction;
      //获得单井产量波动分析
      this.getWellOutputWave(fieldId, oilFieldId, currentDate, unitType, this.setParaValue);
    },
    //下载echarts 隐藏 显示
    downPower(flag) {
      this.echartOption.toolbox.show = flag;
      this.pieEchart.toolbox.show = flag;
      this.barChart.toolbox.show = flag;
    },
    openDialogWindow() {
      this.dialogVisible = true;
    },
    openDetailedChick(name) {
      this.openDetailedDialog = true;
      if (name == "红色预警") {
        this.detailedTable = [
          {
            detailed:
              "日产油水平低于月滚动预测剩余日产油水平比例 大于 红色预警下界（YUYGDT5）%，即条件>YUYGDT5并且 条件<YUYGDT6为红色预警	",
          },
          {
            detailed:
              "日产油水平低于月滚动预测剩余日产油水平比例 小于 红色预警上界（YUYGDT6）%，即条件>YUYGDT5并且 条件<YUYGDT6为红色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（日）日产油水平比例 大于 红色预警下界（YUQQRT5）%，即YUQQRT3<条件<YUQQRT4为红色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（日）日产油水平比例 小于 红色预警上界（YUQQRT6）%，即YUQQRT3<条件<YUQQRT4为红色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（月）日产油水平比例 大于 红色预警下界（YUQQYT5）%，即YUQQYT5<条件<YUQQYT6为红色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（月）日产油水平比例 小于 红色预警上界（YUQQYT6）%，即YUQQYT5<条件<YUQQYT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于年剩余日注水水平的比例 大于 红色预警下界（ZSNSYT5）%，即ZSNSYT5<条件<ZSNSYT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于年剩余日注水水平的比例 小于 红色预警上界（ZSNSYT6）%，即ZSNSYT5<条件<ZSNSYT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于月滚动预测剩余日注水水平比例 大于 红色预警下界（ZSYGDT5）%，即ZSYGDT5<条件<ZSYGDT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于月滚动预测剩余日注水水平比例 小于 红色预警上界（ZSYGDT6）%，即ZSYGDT5<条件<ZSYGDT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（日）日注水水平比例 大于 红色预警下界（ZSQQRT5）%，即ZSQQRT5<条件<ZSQQRT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（日）日注水水平比例 小于 红色预警上界（ZSQQRT6）%，即ZSQQRT5<条件<ZSQQRT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（月）日注水水平比例 大于 红色预警下界（ZSQQYT5）%，即ZSQQYT5<条件<ZSQQYT6为红色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（月）日注水水平比例 小于 红色预警上界（ZSQQYT6）%，即ZSQQYT5<条件<ZSQQYT6为红色预警	",
          },
          {
            detailed:
              "日产油水平低于年剩余日产油水平比例 大于 红色预警下界（YUNSYT5）%，即条件>YUNSYT5 并且 条件<YUNSYT6为红色预警	",
          },
          {
            detailed:
              "日产油水平低于年剩余日产油水平比例 小于 红色预警上界（YUNSYT6）%，即条件>YUNSYT5 并且 条件<YUNSYT6为红色预警	",
          },
        ];
      } else if (name == "蓝色预警") {
        this.detailedTable = [
          {
            detailed:
              "日产油水平低于年剩余日产油水平比例 小于 蓝色预警上界（YUNSYT2）%，即条件>YUNSYT1 并且 条件<YUNSYT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于年剩余日产油水平比例 大于 蓝色预警下界（YUNSYT1）%，即条件>YUNSYT1 并且 条件<YUNSYT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于月滚动预测剩余日产油水平比例 大于 蓝色预警下界（YUYGDT1）%，即条件>YUYGDT1 并且 条件<YUYGDT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于月滚动预测剩余日产油水平比例 小于 蓝色预警上界（YUYGDT2）%，即条件>YUYGDT1 并且 条件<YUYGDT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（日）日产油水平比例 大于 蓝色预警下界（YUQQRT1）%，即条件>YUQQRT1 并且 条件<YUQQRT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（日）日产油水平比例 小于 蓝色预警上界（YUQQRT2）%，即条件>YUQQRT1 并且 条件<YUQQRT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于年剩余日注水水平的比例 大于 蓝色预警下界（ZSNSYT1）%，即ZSNSYT1<条件<ZSNSYT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于年剩余日注水水平的比例 小于 蓝色预警上界（ZSNSYT2）%，即ZSNSYT1<条件<ZSNSYT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于月滚动预测剩余日注水水平比例 大于 蓝色预警下界（ZSYGDT1）%，即ZSYGDT1<条件<ZSYGDT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于月滚动预测剩余日注水水平比例 小于 蓝色预警上界（ZSYGDT2）%，即ZSYGDT1<条件<ZSYGDT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（日）日注水水平比例 大于 蓝色预警下界（ZSQQRT1）%，即ZSQQRT1<条件<ZSQQRT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（日）日注水水平比例 小于 蓝色预警上界（ZSQQRT2）%，即ZSQQRT1<条件<ZSQQRT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（月）日注水水平比例 大于 蓝色预警下界（ZSQQYT1）%，即ZSQQYT1<条件<ZSQQYT2为蓝色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（月）日注水水平比例 小于 蓝色预警上界（ZSQQYT2）%，即ZSQQYT1<条件<ZSQQYT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（月）日产油水平比例 大于 蓝色预警下界（YUQQYT1）%，即YUQQYT1<条件<YUQQYT2为蓝色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（月）日产油水平比例 小于 蓝色预警上界（YUQQYT2）%，即YUQQYT1<条件<YUQQYT2为蓝色预警	",
          },
        ];
      } else if (name == "黄色预警") {
        this.detailedTable = [
          {
            detailed:
              "日产油水平低于年剩余日产油水平比例 大于 黄色预警下界（YUNSYT3）%，即条件>YUNSYT3 并且 条件<YUNSYT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于年剩余日产油水平比例 小于 黄色预警上界（YUNSYT4）%，即条件>YUNSYT3 并且 条件<YUNSYT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于月滚动预测剩余日产油水平比例 大于 黄色预警下界（YUYGDT3）%，即条件>YUYGDT3并且 条件<YUYGDT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于月滚动预测剩余日产油水平比例 小于 黄色预警上界（YUYGDT4）%，即条件>YUYGDT3并且 条件<YUYGDT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（日）日产油水平比例 大于 黄色预警下界（YUQQRT3）%，即条件>YUQQRT3 并且 条件<YUQQRT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（日）日产油水平比例 小于 黄色预警上界（YUQQRT4）%，即条件>YUQQRT3 并且 条件<YUQQRT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（月）日产油水平比例 小于 黄色预警上界（YUQQYT4）%，即YUQQYT3<条件<YUQQYT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于年剩余日注水水平的比例 大于 黄色预警下界（ZSNSYT3）%，即ZSNSYT3<条件<ZSNSYT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于年剩余日注水水平的比例 小于 黄色预警上界（ZSNSYT4）%，即ZSNSYT3<条件<ZSNSYT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于月滚动预测剩余日注水水平比例 大于 黄色预警下界（ZSYGDT3）%，即ZSYGDT3<条件<ZSYGDT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于月滚动预测剩余日注水水平比例 小于 黄色预警上界（ZSYGDT4）%，即ZSYGDT3<条件<ZSYGDT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（日）日注水水平比例 大于 黄色预警下界（ZSQQRT3）%，即ZSQQRT3<条件<ZSQQRT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（日）日注水水平比例 小于 黄色预警上界（ZSQQRT4）%，即ZSQQRT3<条件<ZSQQRT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（月）日注水水平比例 大于 黄色预警下界（ZSQQYT3）%，即ZSQQYT3<条件<ZSQQYTT4为黄色预警	",
          },
          {
            detailed:
              "日注水水平低于前期（月）日注水水平比例 小于 黄色预警上界（ZSQQYT4）%，即ZSQQYT3<条件<ZSQQYTT4为黄色预警	",
          },
          {
            detailed:
              "日产油水平低于前期（月）日产油水平比例 大于 黄色预警下界（YUQQYT3）%，即YUQQYT3<条件<YUQQYT4为黄色预警	",
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .z-container {
    flex: 1;
    height: 0;
    .pagePanelNew {
      height: 100%;
      margin-top: 0;
      .pagePane-container {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .rowBox {
          display: flex;
          align-items: center;
          .row {
            flex: 1;
            width: 0;
            .row-container {
              display: flex;
              flex-direction: column;
              height: 100%;
              .searchBox {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                // justify-content: flex-end;
              }
              .echartBox {
                flex: 1;
                height: 0;
              }
              // .z-table {
              //   ::v-deep .cell {
              // height: 60px;
              // line-height: inherit;
              // }
              // }
            }
          }
        }
      }
    }
  }
}

.bt2 {
  float: right;
  margin: 2px 14px;
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
</style>
