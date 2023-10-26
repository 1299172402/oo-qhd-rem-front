<!-- 技术指标管理 -->
<template>
  <div class="app-container">
    <header-search style="height: auto; padding: 10px 20px 12px">
      <div class="g-row-flex-V" style="justify-content: space-between">
        <div class="g-row-flex-V g-w100 g-h100" style="flex-wrap: wrap">
          <div style="margin: 10px 20px 10px 0px">
            <span>油田：</span>
            <el-select v-model="selectOilFieldId" @change="initAllData">
              <el-option
                v-for="item in oilFieldList"
                :key="item.ogfId"
                :label="item.ogfName"
                :value="item.ogfId"
              ></el-option>
            </el-select>
          </div>
          <!-- <div style="margin: 10px 20px 10px 0px">
                    年度：
                    <el-date-picker v-model="year" type="year" placeholder="选择年" value-format="yyyy-12-31"></el-date-picker>
                </div> -->
          <div style="margin: 10px 20px 10px 0px">
            <el-button icon="el-icon-search" type="primary" @click="doSearch()">搜索</el-button>
          </div>
        </div>
        <div class="g-row-flex-V" style="flex-wrap: wrap">
          <el-button
            class="commonBtn"
            v-if="$route.query.page || $route.query.name"
            style="position: absolute; right: 2%"
            @click="$router.push($route.query.page || $route.query.name)"
            >返回</el-button
          >
        </div>
      </div>
    </header-search>

    <page-panel-new class="app-content">
      <el-row style="height: 380px" :gutter="20">
        <el-col v-for="(item, index) in zbData" :key="index" :span="6" :class="{ active: currentIndex == index }">
          <pagePanel
            v-if="item.title == '技术指标总览'"
            class="fl"
            style="height: 156px !important"
            :headerTitle="item.title"
            @click.native="cardClick(item, index)"
          >
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center">
              <span style="font-size: 30px; vertical-align: middle; color: rgb(143, 164, 204)">
                {{ item.title }}
              </span>
            </div>
          </pagePanel>
          <pagePanel v-else class="fl" style="height: 160px" :headerTitle="item.title">
            <el-button
              style="
                position: absolute;
                z-index: 9;
                right: 10px;
                top: 0;
                height: 26px;
                margin-top: 3px;
                padding: 0 16px;
              "
              type="primary"
              @click.native="cardClick(item, index)"
              >详情</el-button
            >
            <div style="display: flex; margin-left: 10px; height: 82px">
              <div style="width: 50%">
                <span style="vertical-align: middle">
                  <span style="font-size: 26px; margin-right: 6px">{{ item.sz | numberFormat }}</span>
                  <sub style="color: #8fa4cc; font-size: 15px">{{ item.dw }}</sub>
                </span>
                <div style="margin-top: 10px">
                  <el-row v-if="item.title == '年产油量'" :gutter="6" style="line-height: 20px; text-align: center">
                    <el-col :span="13" style="color: #8fa4cc"> 环比上年 </el-col>
                    <el-col :span="11">
                      <span v-if="item.tbTag == 'up'" style="color: #00c39f">{{ item.tb | numberFormat }}% ↑ </span>
                      <span v-if="item.tbTag == 'down'" style="color: #cd3d00">{{ item.tb | numberFormat }}% ↓ </span>
                    </el-col>
                  </el-row>
                  <el-row
                    v-if="
                      item.title == '采油速度' ||
                      item.title == '综合递减率' ||
                      item.title == '含水上升率' ||
                      item.title == '生产时率' ||
                      item.title == '油井利用率' ||
                      item.title == '自然递减率'
                    "
                    :gutter="6"
                    style="line-height: 20px; text-align: center"
                  >
                    <el-col :span="13" style="color: #8fa4cc"> 环比上月 </el-col>
                    <el-col :span="11">
                      <span v-if="item.hbTag == 'up'" style="color: #00c39f"> {{ item.hb | numberFormat }}% ↑ </span>
                      <span v-if="item.hbTag == 'down'" style="color: #cd3d00"> {{ item.hb | numberFormat }}% ↓ </span>
                    </el-col>
                  </el-row>
                  <el-row
                    v-if="
                      item.title == '采油速度' ||
                      item.title == '综合递减率' ||
                      item.title == '含水上升率' ||
                      item.title == '生产时率' ||
                      item.title == '油井利用率' ||
                      item.title == '自然递减率'
                    "
                    :gutter="6"
                    style="line-height: 20px; text-align: center"
                  >
                    <el-col :span="13" style="color: #8fa4cc"> 同比去年 </el-col>
                    <el-col :span="11">
                      <span v-if="item.tbTag == 'up'" style="color: #00c39f"> {{ item.tb | numberFormat }}%↑ </span>
                      <span v-if="item.tbTag == 'down'" style="color: #cd3d00"> {{ item.tb | numberFormat }}% ↓ </span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div style="width: 50%; line-height: 100%">
                <Echart :chart-data="option" height="100%"></Echart>
              </div>
            </div>
          </pagePanel>
        </el-col>
      </el-row>
      <pagePanel v-if="currentIndex == 0" headerTitle="技术指标管理" show-btn style="height: 500px; margin-top: 0">
        <div style="display: flex; align-items: center; height: 40px; padding-top: 10px">
          <span>对标油田：</span>
          <el-select v-model="selectTargetOilFieldId" disabled>
            <el-option
              v-for="item in oilFieldList"
              :key="item.ogfId"
              :label="item.ogfName"
              :value="item.ogfId"
            ></el-option>
          </el-select>
          <span style="margin-left: 15px">开发阶段：</span>
          <el-select v-model="developmentPhase" clearable>
            <el-option
              v-for="item in developmentPhaseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
          <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
          <el-button icon="el-icon-download" type="primary" style="margin-left: auto !important" @click="doDownIndex"
            >下载</el-button
          >
        </div>
        <div style="margin-top: 10px; height: calc(100% - 50px)">
          <el-table id="indexscv" :data="tableData" border highlight height="100%">
            <el-table-column prop="name" label="指标" align="center"></el-table-column>
            <el-table-column prop="real" label="实际值" align="center" :formatter="toPrecise2"></el-table-column>
            <el-table-column
              prop="compareOilField"
              label="对标油田"
              align="center"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="realCompareOilField"
              label="实际值与对标差值"
              align="center"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table>
        </div>
      </pagePanel>
      <pagePanel v-if="currentIndex == 1" headerTitle="年产油量" show-btn style="height: 500px; margin-top: 0">
        <Echart :chart-data="inOilProduction" style="height: 100%"></Echart>
      </pagePanel>
      <pagePanel v-if="currentIndex == 2" headerTitle="采油速度" show-btn style="height: 500px; margin-top: 0">
        <Echart :chart-data="productionSpeed" style="height: 100%"></Echart>
      </pagePanel>
      <pagePanel v-if="currentIndex == 3" headerTitle="综合递减率" show-btn style="height: 500px; margin-top: 0">
        <div style="height: 100%">
          <div style="display: flex; align-items: center; height: 40px; padding-top: 10px">
            <span>油藏分析单元：</span>
            <el-select v-model="selectDecreaseBlock">
              <el-option
                v-for="item in blockList"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              确定
            </el-button>
          </div>
          <Echart :chart-data="comprehensiveDeclineRate" style="height: calc(100% - 50px)"></Echart>
        </div>
      </pagePanel>
      <pagePanel v-if="currentIndex == 4" headerTitle="含水上升率" show-btn style="height: 500px; margin-top: 0">
        <div style="height: 100%">
          <div style="display: flex; align-items: center; height: 40px; padding-top: 10px">
            <span>油藏分析单元：</span>
            <el-select v-model="selectDecreaseBlock">
              <el-option
                v-for="item in blockList"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              ></el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              确定
            </el-button>
          </div>
          <Echart :chart-data="rateOfWaterCutRise" style="height: calc(100% - 50px)"></Echart>
        </div>
      </pagePanel>
      <pagePanel v-if="currentIndex == 5" headerTitle="生产时率" show-btn style="height: 500px; margin-top: 0">
        <Echart :chart-data="whenTheProductionRate" style="height: 100%"></Echart>
      </pagePanel>
      <pagePanel v-if="currentIndex == 6" headerTitle="油井利用率" show-btn style="height: 500px; margin-top: 0">
        <Echart :chart-data="wellUtilization" style="height: 100%"></Echart>
      </pagePanel>
      <pagePanel v-if="currentIndex == 7" headerTitle="自然递减率" show-btn style="height: 500px; margin-top: 0">
        <div style="height: 100%">
          <div style="display: flex; align-items: center; height: 40px; padding-top: 10px">
            <span>油藏分析单元：</span>
            <el-select v-model="selectDecreaseBlock">
              <el-option
                v-for="item in blockList"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              确定
            </el-button>
          </div>
          <Echart :chart-data="naturalDeclineRate" style="height: calc(100% - 50px)"></Echart>
        </div>
      </pagePanel>
    </page-panel-new>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import { exportExcel } from "@/lib/exportExcel.js";
import { fetchPlatforms } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import {
  oilYear,
  compositeDeclineRate,
  proTimeRate,
  proWellUsageRate,
  natureDeclineRateForTech,
  waterCutRaiseRate,
  proSpeed,
  techIndicatorStat,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { searchOilProductionChart } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import dayjs from "dayjs";

export default {
  name: "technicalIndexManagement",
  components: {
    Echart,
  },
  filters: {
    //过滤规则 保留两位小数
    numberFormat(val) {
      if (val) {
        return parseFloat(val).toFixed(2);
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      currentIndex: 0,
      //查询参数
      queryParams: {},
      companyId: "",
      //选中油田
      selectOilFieldId: "",
      // 年度
      year: dayjs().format("YYYY-12-31"),
      //选中对标油田
      selectTargetOilFieldId: "",
      page: 1,
      pageSize: 10,
      //指标数据
      zbData: [
        {
          title: "技术指标总览",
        },
        {
          title: "年产油量",
          sz: "",
          hb: "",
          tb: "",
          dw: "10⁴m³",
        },
        {
          title: "采油速度",
          sz: "",
          hb: "",
          tb: "",
          dw: "%",
        },
        {
          title: "综合递减率",
          sz: "",
          hb: "",
          tb: "",
          dw: "%",
        },
        {
          title: "含水上升率",
          sz: "",
          hb: "",
          tb: "",
          dw: "%",
        },
        {
          title: "生产时率",
          sz: "",
          hb: "",
          tb: "",
          dw: "%",
        },
        {
          title: "油井利用率",
          sz: "",
          hb: "",
          tb: "",
          dw: "%",
        },
        {
          title: "自然递减率",
          sz: "",
          hb: "",
          tb: "",
          dw: "%",
        },
      ],
      //油田列表
      oilFieldList: [],
      //区块列表
      blockList: [],
      //综合递减率 区块选择
      selectDecreaseBlock: "",
      //含水上升率 平台选择
      selectIncreasingRatePlatform: "",
      //自然递减率 平台选择
      selectNaturalDeclinePlatform: "",
      //开发阶段列表
      developmentPhaseList: [
        {
          value: "001",
          label: "建产阶段",
        },
        {
          value: "002",
          label: "综合治理阶段",
        },
        {
          value: "003",
          label: "综合调整阶段",
        },
        {
          value: "004",
          label: "挖潜稳产阶段",
        },
        {
          value: "005",
          label: "产量递减阶段",
        },
      ],
      developmentPhase: "",
      //默认曲线
      option: {
        xAxis: {
          type: "category",
          data: [
            "2020/01",
            "2020/02",
            "2020/03",
            "2020/04",
            "2020/05",
            "2020/06",
            "2020/07",
            "2020/08",
            "2020/09",
            "2020/10",
          ],
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#3375EC",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#23529F",
                },
                {
                  offset: 1,
                  color: "#012D4F",
                },
              ]),
            },
          },
        ],
      },
      //年产油量
      inOilProduction2: {
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
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "年产油量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        grid: {
          x: 120,
          y: 20,
          x2: 120,
          y2: 60,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 0,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            interval: function (index, val) {
              //判断是否是一号
              if (val.substr(-2) == "01") {
                return true;
              } else {
                return false;
              }
            },
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
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
        yAxis: [
          {
            name: "日产m³/d",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
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
          {
            name: "年产10⁴m³",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            scale: true,
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                //color: '#979797'
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
        ],
        series: [],
      },
      inOilProduction: {
        //原油产量折线图
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        color: ["#1379F7", "#FF5844", "#69b146", "#00BC9C", "#9A72FF", "#DA835E"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "年产油量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: [
          {
            name: "日期 (日)",
            nameGap: 30,
            nameTextStyle: { color: "#8FA4CC" },
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
              padding: [10, 0, 0, 0],
              interval: function (index, val) {
                if (val.substr(-2) == "01") {
                  return true;
                } else {
                  return false;
                }
              },
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              lineStyle: {
                color: "#8FA4CC",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "日产m³/d",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            scale: true,
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
          {
            name: "年产10⁴m³",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            scale: true,
            type: "value",
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
        ],
        series: [],
      },
      //采油速度
      productionSpeed: {
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
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "采油速度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        grid: {
          x: 120,
          y: 20,
          x2: 120,
          y2: 80,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
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
        yAxis: [
          {
            name: "可采储量采油速度(%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            scale: true,
            axisLabel: {
              color: "#8FA4CC",
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                //color: '#979797'
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
        ],
        series: [],
      },
      //综合递减率
      comprehensiveDeclineRate: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "综合递减率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 10,
          left: "center",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "综合递减率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            // formatter: function (val) {
            //   return Number(val) + "月";
            // },
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
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "综合递减率(%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            minInterval: 1,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
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
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        series: [],
      },
      //含水上升率
      rateOfWaterCutRise: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "含水上升率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 10,
          left: "center",
        },
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "含水上升率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            // formatter: function (val) {
            //   return Number(val) + "月";
            // },
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
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "含水上升率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            minInterval: 1,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
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
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        series: [],
      },
      //生产时率
      whenTheProductionRate: {
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
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "生产时率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 20,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
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
        yAxis: [
          {
            name: "生产时率(%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
            },
            //scale: true,
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                //color: '#979797'
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
        ],
      },
      //油井利用率
      wellUtilization: {
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
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "油井利用率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        legend: {
          data: ["去年实际值", "今年实际值"],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 20,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
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
          data: [
            "2020/01",
            "2020/02",
            "2020/03",
            "2020/04",
            "2020/05",
            "2020/06",
            "2020/07",
            "2020/08",
            "2020/09",
            "2020/10",
            "2020/11",
            "2020/12",
          ],
        },
        yAxis: [
          {
            name: "油井利用率(%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                //color: '#979797'
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
        ],
        series: [
          {
            data: [5.5, 5.3, 5.1, 4.8, 5.4, 5.2, 5.6, 5.3, 5, 5.3, 5.2, 5.5],
            type: "bar",
            barWidth: "32",
            name: "去年实际值",
            label: {
              show: true,
              position: "top",
            },
          },
          {
            data: [5.2, 5.5, 5.7, 5.8, 6.0, 5.5, 5.3, 5.1, 4.8, 5.4, 5.2, 5.5],

            type: "bar",
            barWidth: "32",
            name: "今年实际值",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      },
      //自然递减率
      naturalDeclineRate: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "自然递减率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 10,
          left: "center",
        },
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "自然递减率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            // formatter: function (val) {
            //   return Number(val) + "月";
            // },
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
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "自然递减率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
            },
            type: "value",
            minInterval: 1,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
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
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        series: [],
      },
      //技术指标管理
      tableData: [],
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
    };
  },
  watch: {
    selectOilFieldId(val) {
      this.getFetchFields(val);
      this.getFetchPlatforms(val);
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    //重置
    resetting() {
      Object.assign(this.$data, this.$options.data());
      this.initData();
    },
    //card点击事件 切换页面
    cardClick(item, index) {
      this.currentIndex = index;
    },
    //页面初始化操作
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.companyId =
            res.data.data[0]?.currentTenantBindOrgId
              ? res.data.data[0].currentTenantBindOrgId
              : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilFieldList = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.selectOilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.selectOilFieldId = this.oilFieldList[0].ogfId ? this.oilFieldList[0].ogfId : undefined;
          }
        }
      });
      //默认qhd3-26油田
      // this.selectOilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
      //对标油田默认qhd3-26油田
      // this.selectTargetOilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
      let requestField = {
        oilFieldId: this.selectOilFieldId,
      };
      QueryReservoirAnalyseUnit({ ogfId: this.selectOilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.blockList = res.data.data;
          this.blockList.unshift({
            reservoirAnalyseUnitId: this.selectOilFieldId,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.selectDecreaseBlock = this.selectOilFieldId;
        }
      });
      this.initAllData();
    },
    initAllData() {
      QueryReservoirAnalyseUnit({ ogfId: this.selectOilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.blockList = res.data.data;
          this.blockList.unshift({
            reservoirAnalyseUnitId: this.selectOilFieldId,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.selectDecreaseBlock = this.selectOilFieldId;
        }
      });

      //以下接口平台 区块 参数默认为全部 全部默认为油田id
      this.getTechIndicatorStat(this.selectOilFieldId, this.selectTargetOilFieldId, "", "", this.developmentPhase);
      this.doOilYear2(this.selectOilFieldId);
      this.doOilYear(this.selectOilFieldId);
      this.doProSpeed(this.selectOilFieldId);
      this.doCompositeDeclineRate(this.selectOilFieldId, this.selectOilFieldId);
      this.doWaterCutRaiseRate(this.selectOilFieldId, this.selectOilFieldId);
      this.doNatureDeclineRateForTech(this.selectOilFieldId, this.selectOilFieldId);
      this.doProTimeRate(this.selectOilFieldId);
      this.doProWellUsageRate(this.selectOilFieldId);
    },
    //获得区块类型
    getFetchFields(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
      };
      QueryReservoirAnalyseUnit({ ogfId: oilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.blockList = res.data.data;
          _this.blockList.unshift({
            reservoirAnalyseUnitId: oilFieldId,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.selectDecreaseBlock = oilFieldId;
        }
      });
    },
    //每一个子标签调用接口
    doSearch() {
      let oilFieldId = this.selectOilFieldId;
      //技术指标管理
      if (this.currentIndex == 0) {
        let targetOilFieldId = this.selectTargetOilFieldId;
        let outputDegreeCode = "";
        let reservoirsTypeCode = "";
        let devPhaseCode = this.developmentPhase;
        this.getTechIndicatorStat(oilFieldId, targetOilFieldId, outputDegreeCode, reservoirsTypeCode, devPhaseCode);
      } else if (this.currentIndex == 1) {
        //年产油量
        // this.doOilYear2(oilFieldId);
        this.doOilYear(oilFieldId);
      } else if (this.currentIndex == 2) {
        //采油速度
        this.doProSpeed(oilFieldId);
      } else if (this.currentIndex == 3) {
        //综合递减率
        let blockId = this.selectDecreaseBlock;
        this.doCompositeDeclineRate(oilFieldId, blockId);
      } else if (this.currentIndex == 4) {
        //含水上升率
        // let platformId = this.selectIncreasingRatePlatform;
        let blockId = this.selectDecreaseBlock;
        this.doWaterCutRaiseRate(oilFieldId, blockId);
      } else if (this.currentIndex == 5) {
        //生产时率
        this.doProTimeRate(oilFieldId);
      } else if (this.currentIndex == 6) {
        //油井利用率
        this.doProWellUsageRate(oilFieldId);
      } else if (this.currentIndex == 7) {
        //自然递减率
        // let platformId = this.selectNaturalDeclinePlatform;
        let blockId = this.selectDecreaseBlock;
        this.doNatureDeclineRateForTech(oilFieldId, blockId);
      }
    },
    //技术指标管理-技术指标统计列表 首页
    getTechIndicatorStat(oilFieldId, targetOilFieldId, outputDegreeCode, reservoirsTypeCode, devPhaseCode = "") {
      let request = {
        oilFieldId: oilFieldId,
        targetOilFieldId: targetOilFieldId,
        outputDegreeCode: outputDegreeCode,
        reservoirsTypeCode: reservoirsTypeCode,
        devPhaseCode: devPhaseCode,
        year: this.year,
      };
      this.tableData = [];
      techIndicatorStat(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.techIndicatorManagements;
        }
      });
    },
    //技术指标管理-年产油量
    doOilYear2(oilFieldId) {
      //原来用的是这个
      let request = {
        oilFieldId: oilFieldId,
        year: this.year,
      };
      oilYear(request).then((res) => {
        //图表数据
        // let legendData = [];
        //数据数组
        // let seriesData = [];
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "年产油量";
          });
          //指标详情
          zb.sz = detail.detail;
          //同比标量
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;
          // TODO lv 页面没有使用，代码检查错误先注释
          // return false;
          // //获取折线图信息
          // let charDataS = res.data.data.chart.linearDataSets;
          // for (let i = 0; i < charDataS.length; i++) {
          //     //获得每一个折线数据
          //     let linearChart = charDataS[i];
          //     //向图例中添加 折线名称
          //     if (linearChart.label != '实际年产' && linearChart.label != '计划年产') {
          //         legendData.push(linearChart.label);
          //     } else if (linearChart.label == '实际年产') {
          //         legendData.push('实际年累产');
          //     } else if (linearChart.label == '计划年产') {
          //         legendData.push('计划年累产');
          //     }
          //     //向数据数组中添加 所有折线的信息
          //     seriesData.push(this.getLinearChartSeriesOilProduct(linearChart));
          // }
          // //图例数据
          // this.inOilProduction.legend.data = legendData;
          // //各线的数据
          // this.inOilProduction.series = seriesData;
        } else {
          // //图例数据
          // this.inOilProduction.legend.data = legendData;
          // //各线的数据
          // this.inOilProduction.series = seriesData;
        }
      });
    },
    doOilYear(oilFieldId) {
      //现在用的是这个
      let request = {
        beginDate: "2023-01-01",
        endDate: "2023-12-31",
        oilFieldId,
        planTypeCode: "002003",
        rollForecastVersion: "202301",
        unitType: "m",
        year: this.year,
      };
      searchOilProductionChart(request).then((res) => {
        //图表数据
        let legendData = [];
        //数据数组
        let seriesData = [];
        //判断当前请求是否成功
        if (res.data.code == 200) {
          let charDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < charDataS.length; i++) {
            //获得每一个折线数据
            let linearChart = charDataS[i];
            //向图例中添加 折线名称
            if (linearChart.label != "实际年产" && linearChart.label != "计划年产") {
              legendData.push(linearChart.label);
            } else if (linearChart.label == "实际年产") {
              legendData.push("实际年累产");
            } else if (linearChart.label == "计划年产") {
              legendData.push("计划年累产");
            }
            //向数据数组中添加 所有折线的信息
            seriesData.push(this.getLinearChartSeriesOilProduct(linearChart));
          }
          //图例数据
          this.inOilProduction.legend.data = legendData;
          //各线的数据
          this.inOilProduction.series = seriesData;
          if (this.searchForm.selectUnitOfProduction == "m") {
            this.inOilProduction.yAxis[0].name = "日产m³/d";
            this.inOilProduction.yAxis[1].name = "年产10⁴m³";
          } else if (this.searchForm.selectUnitOfProduction == "t") {
            this.inOilProduction.yAxis[0].name = "日产t/d";
            this.inOilProduction.yAxis[1].name = "年产10⁴t";
          }
        } else {
          //图例数据
          this.inOilProduction.legend.data = legendData;
          //各线的数据
          this.inOilProduction.series = seriesData;
          if (this.searchForm.selectUnitOfProduction == "m") {
            this.inOilProduction.yAxis[0].name = "日产m³/d";
            this.inOilProduction.yAxis[1].name = "年产10⁴m³";
          } else if (this.searchForm.selectUnitOfProduction == "t") {
            this.inOilProduction.yAxis[0].name = "日产t/d";
            this.inOilProduction.yAxis[1].name = "年产10⁴t";
          }
        }
      });
    },
    //年产油量
    getLinearChartSeriesOilProduct(linearChart) {
      // 单折线数据结构
      let series = {};
      series.name = linearChart.label;
      series.type = "line";
      series.symbol = "none";
      let label = linearChart.label;
      if (label == "实际日产") {
        series.yAxisIndex = 0;
      } else if (label == "考核日产") {
        series.yAxisIndex = 0;
      } else if (label == "滚动预测") {
        series.yAxisIndex = 0;
      } else if (label == "实际年产") {
        series.yAxisIndex = 1;
        series.name = "实际年累产";
      } else if (label == "计划年产") {
        series.yAxisIndex = 1;
        series.name = "计划年累产";
      } else if (label == "剩余水平") {
        series.yAxisIndex = 0;
      }
      let seriesData = [];
      let chartData = linearChart.linearData;
      for (let i = 0; i < chartData.length; i++) {
        let point = [];
        //放入带入点
        point.push(chartData[i].label);
        point.push(chartData[i].value);
        seriesData.push(point);
      }
      series.data = seriesData;
      return series;
    },
    //采油速度
    doProSpeed(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.year,
      };
      proSpeed(request).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "采油速度";
          });
          //获得指标数据
          zb.sz = detail.detail;
          //环比数据
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比数据
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;

          let legendData = [];
          let series = {};
          let seriesData = [];
          let chartDatas = res.data.data.chart.linearDataSets[0].linearData;
          legendData.push(res.data.data.chart.linearDataSets[0].label);
          series.name = res.data.data.chart.linearDataSets[0].label;
          series.type = "line";
          chartDatas.forEach((item, index) => {
            let point = [];
            point.push(item.label.substring(0, 7));
            point.push(item.value);
            seriesData.push(point);
          });
          series.data = seriesData;
          this.productionSpeed.legend.data = legendData;
          this.productionSpeed.series.push(series);
        } else {
          this.productionSpeed.legend.data = [];
          this.productionSpeed.series = [];
        }
      });
    },
    //技术指标管理-综合递减率
    doCompositeDeclineRate(oilFieldId, blockId) {
      let request = {
        oilFieldId: oilFieldId,
        fileId: blockId,
        year: this.year,
      };
      compositeDeclineRate(request).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "综合递减率";
          });
          //获得指标数据
          zb.sz = detail.detail;
          //环比数据
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比数据
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let linearCharts = res.data.data.chart.linearDataSets;
          linearCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            if (item.label == "去年实际值") {
              series.itemStyle = {
                normal: {
                  lineStyle: {
                    width: 5,
                    type: "dotted",
                  },
                },
              };
            }
            series.type = "line";
            let lineData = item.linearData;
            let seriesMess = [];
            lineData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(5, 7));
              xSet.add(dot.label.substring(5, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.comprehensiveDeclineRate.xAxis.data = xData;
          this.comprehensiveDeclineRate.legend.data = legendData;
          this.comprehensiveDeclineRate.series = seriesData;
        } else {
          this.comprehensiveDeclineRate.legend.data = [];
          this.comprehensiveDeclineRate.series = [];
        }
      });
    },
    //含水上升率
    doWaterCutRaiseRate(oilFieldId, blockId) {
      let request = {
        oilFieldId: oilFieldId,
        fileId: blockId,
        year: this.year,
      };
      waterCutRaiseRate(request).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "含水上升率";
          });
          //获得指标数据
          zb.sz = detail.detail;
          //环比数据
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比数据
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let linearCharts = res.data.data.chart.linearDataSets;
          linearCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            if (item.label == "去年实际值") {
              series.itemStyle = {
                normal: {
                  lineStyle: {
                    width: 5,
                    type: "dotted",
                  },
                },
              };
            }
            series.type = "line";
            let lineData = item.linearData;
            let seriesMess = [];
            lineData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(5, 7));
              xSet.add(dot.label.substring(5, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.rateOfWaterCutRise.xAxis.data = xData;
          this.rateOfWaterCutRise.legend.data = legendData;
          this.rateOfWaterCutRise.series = seriesData;
        }
      });
    },
    //自然递减率
    doNatureDeclineRateForTech(oilFieldId, blockId) {
      let request = {
        oilFieldId: oilFieldId,
        fileId: blockId,
        year: this.year,
      };
      natureDeclineRateForTech(request).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "自然递减率";
          });
          //获得指标数据
          zb.sz = detail.detail;
          //环比数据
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比数据
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let linearCharts = res.data.data.chart.linearDataSets;
          linearCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            if (item.label == "去年实际值") {
              series.itemStyle = {
                normal: {
                  lineStyle: {
                    width: 5,
                    type: "dotted",
                  },
                },
              };
            }
            series.type = "line";
            let lineData = item.linearData;
            let seriesMess = [];
            lineData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(5, 7));
              xSet.add(dot.label.substring(5, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.naturalDeclineRate.xAxis.data = xData;
          this.naturalDeclineRate.legend.data = legendData;
          this.naturalDeclineRate.series = seriesData;
        }
      });
    },
    //生产时率
    doProTimeRate(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.year,
      };
      proTimeRate(request).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "生产时率";
          });
          //获得指标数据
          zb.sz = detail.detail;
          //环比数据
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比数据
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let barCharts = res.data.data.chart.linearDataSets;

          barCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            series.type = "bar";
            series.barWidth = "22";
            series.label = {
              show: true,
              position: "top",
              color: "#8fa4cc",
            };
            let barData = item.linearData;
            let seriesMess = [];
            barData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(0, 7));
              xSet.add(dot.label.substring(0, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.whenTheProductionRate.xAxis.data = xData;
          this.whenTheProductionRate.legend.data = legendData;
          this.whenTheProductionRate.series = seriesData;
        }
      });
    },
    //油井利用率
    doProWellUsageRate(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.year,
      };
      proWellUsageRate(request).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "油井利用率";
          });
          //获得指标数据
          zb.sz = detail.detail;
          //环比数据
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比数据
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let barCharts = res.data.data.chart.linearDataSets;

          barCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            series.type = "bar";
            series.barWidth = "22";
            series.label = {
              show: true,
              position: "top",
              color: "#8fa4cc",
            };
            let barData = item.linearData;
            let seriesMess = [];
            barData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(0, 7));
              xSet.add(dot.label.substring(0, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.wellUtilization.xAxis.data = xData;
          this.wellUtilization.legend.data = legendData;
          this.wellUtilization.series = seriesData;
        }
      });
    },
    //导出excel表
    doDownIndex() {
      exportExcel("#indexscv", "技术指标总览");
    },
    // 表格格式化方法 - 数值只保留两位小数
    toPrecise2(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(2)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
}
::v-deep .app-content {
  height: calc(100% - 100px) !important;
  overflow-y: scroll;
  .g-w100:first-child {
    padding-top: 0 !important;
    // height:auto!important;
  }
}
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}

.basicTable {
  height: auto;
  // padding-bottom: 10px;
}

.el-card {
  border-width: 1px 0;
  border-radius: 0;
  border-image: linear-gradient(90deg, rgba(116, 240, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 240, 243, 0)) 1 1;
  color: #fff;
  font-weight: bold;
  background: rgba(143, 164, 204, 0);

  ::v-deep .el-card__body {
    padding: 0;
  }
}

@keyframes mymove {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.active {
  // animation: mymove 3s infinite;
}

::v-deep .el-table .cell:empty::before {
  content: "-";
}
</style>
