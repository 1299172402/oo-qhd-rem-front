<!-- 开发历程 -->
<template>
  <div class="app-container">
    <headerSearch style="height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <span>油田：</span>
        <el-select v-model="oilfield" @change="onFieldChange" style="margin-right: 20px">
          <el-option v-for="item in oiloptions" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
        </el-select>
        <span>区块：</span>
        <el-select v-model="block" style="margin-right: 20px">
          <el-option
            v-for="item in blockoptions"
            :key="item.reservoirAnalyseUnitId"
            :label="item.reservoirAnalyseUnitName"
            :value="item.reservoirAnalyseUnitId"
          ></el-option>
        </el-select>
        <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
        <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
      </div>
    </headerSearch>
    <pagePanelNew style="height: calc(100% - 100px)" class="z-main">
      <div class="pagepanel-btns" style="padding-top: 20px; height: 40px; display: flex; justify-content: flex-end">
        <el-button type="primary" @click="development(oilfield, block)">开发现状表</el-button>
        <el-button type="primary" @click="dialogVisible = true">选择指标信息</el-button>
      </div>

      <pagePanel headerTitle="油田综合开发曲线" style="height: 750px; margin-bottom: 20px; position: relative" show-btn>
        <div style="display: flex; justify-content: flex-end">
          <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px" @click="downEchart"
            >下载</el-button
          >
        </div>
        <div style="height: calc(100% - 55px)">
          <Echart ref="echartChart" :chart-data="option" style="height: 100%"></Echart>
        </div>
      </pagePanel>

      <pagePanel headerTitle="油田综合开发历程表" style="height: 350px; position: relative" show-btn>
        <div style="display: flex; justify-content: flex-end">
          <el-button
            icon="el-icon-download"
            type="primary"
            style="margin-bottom: 20px"
            @click="doDownExcel('#tableData', '油田综合开发历程')"
            v-show="canDownload"
            >下载</el-button
          >
        </div>
        <div style="padding-bottom: 5px; height: calc(100% - 55px)">
          <el-table id="tableData" :data="tableData" highlight height="100%">
            <el-table-column
              prop="phase"
              label="开发阶段"
              align="center"
              width="180px"
              show-overflow-tooltip
              fixed
            ></el-table-column>
            <el-table-column
              prop="beginDate"
              :label="`阶段开始时间\n (yyyy/mm)`"
              align="center"
              width="140"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="endDate"
              :label="`阶段结束时间\n (yyyy/mm)`"
              align="center"
              width="140"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="interval"
              :label="`阶段历程时间\n (d)`"
              align="center"
              width="160px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="pwellsTotal"
              :label="`阶段末油井总井数\n (口)`"
              align="center"
              width="180px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="pwellsOpen"
              :label="`阶段末油井开井数\n (口)`"
              align="center"
              width="190px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="liquidDaily"
              :label="`阶段末日产液\n (m³)`"
              align="center"
              width="180px"
              show-overflow-tooltip
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="oilDaily"
              :label="`阶段末日产油量\n (m³)`"
              align="center"
              width="190px"
              show-overflow-tooltip
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="waterCut"
              :label="`阶段末综合含水\n (%)`"
              align="center"
              width="170px"
              show-overflow-tooltip
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="injectionTotal"
              :label="`阶段末水井总井数\n (口)`"
              align="center"
              width="180px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="injectionOpen"
              :label="`阶段末水井开井数\n (口)`"
              align="center"
              width="190px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="injection"
              :label="`阶段末注水量\n (10⁴m³)`"
              align="center"
              min-width="200px"
              show-overflow-tooltip
              :formatter="toPrecise4"
            ></el-table-column>
            <el-table-column
              prop="proInjectionRate"
              label="阶段末注采比"
              align="center"
              width="180px"
              show-overflow-tooltip
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="proInjectionRateSum"
              label="累计注采比"
              align="center"
              width="140px"
              show-overflow-tooltip
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="produceDegress"
              :label="`阶段采出程度\n (%)`"
              align="center"
              width="160px"
              show-overflow-tooltip
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="oilSum"
              :label="`阶段累计产油\n (10⁴m³)`"
              align="center"
              min-width="200px"
              show-overflow-tooltip
              :formatter="toPrecise4"
            ></el-table-column>
            <el-table-column
              prop="liquidSum"
              :label="`阶段累计产液\n (10⁴m³)`"
              align="center"
              min-width="200px"
              show-overflow-tooltip
              :formatter="toPrecise4"
            ></el-table-column>
            <el-table-column
              prop="waterSum"
              :label="`阶段累注水\n (10⁴m³)`"
              align="center"
              min-width="170px"
              show-overflow-tooltip
              :formatter="toPrecise4"
            ></el-table-column>
          </el-table>
        </div>
      </pagePanel>

      <!-- 参数配置 -->
      <el-dialog
        title="参数配置"
        :visible="dialogCsVisible"
        top="20vh"
        width="400px"
        class="dialogClass"
        :close-on-click-modal="false"
        @close="[(dialogCsVisible = false)]"
      >
        <el-checkbox-group v-model="checkList" style="margin-bottom: 10px">
          <el-row>
            <el-col :span="12">
              <el-checkbox label="油井总井数（口)" color="#fff"></el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox label="含水率（%)"></el-checkbox>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              <el-checkbox label="油井开井数（口)"></el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox label="气油比"></el-checkbox>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              <el-checkbox label="水井总井数（口)"></el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox label="日注水（m³)"></el-checkbox>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              <el-checkbox label="水井开井数（口)"></el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox label="地层压降(MPa)"></el-checkbox>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              <el-checkbox label="单元日产液（m³)"></el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox label="月注采比"></el-checkbox>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              <el-checkbox label="单元日产油（m³)"></el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox label="年产油（m³)"></el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
        <el-row>
          <el-button icon="el-icon-search" size="mini" style="margin-left: 130px" type="primary">搜索</el-button>
        </el-row>
      </el-dialog>
      <!-- 开发现状表 -->
      <el-dialog
        title="开发现状表"
        :visible="dialogDeveVisible"
        top="4vh"
        width="1200px"
        :close-on-click-modal="false"
        @close="[(dialogDeveVisible = false)]"
      >
        <div style="margin-bottom: 20px; display: flex; align-item: center; justify-content: space-between">
          <div class="fl">
            <span style="color: #fff">油田：</span>
            <el-select v-model="oilfield1" style="margin-right: 15px">
              <el-option
                v-for="item in oiloptions"
                :key="item.ogfId"
                :label="item.ogfName"
                :value="item.ogfId"
              ></el-option>
            </el-select>
            <span style="color: #fff">日期：</span>
            <el-date-picker v-model="dateFirst" type="month" value-format="yyyy-MM"></el-date-picker>
            <!-- <span>~</span> -->
            <!-- <el-date-picker v-model="dateSecond" type="month" placeholder="对比时间2" value-format="yyyy-MM"></el-date-picker> -->
            <el-button icon="el-icon-search" style="margin-left: 15px" type="primary" @click="doSearchDialog"
              >搜索</el-button
            >
          </div>
          <div class="fr" style="margin-borttom: 10px">
            <el-button type="primary" class="qhuan" @click="doSwitchUnit">
              单位切换{{ currentUnit == "m" ? "t" : "m³" }}</el-button
            >
            <el-button
              style="margin-right: 10px"
              icon="el-icon-download"
              type="primary"
              @click="doDownExcel('#kfxz', '开发现状')"
              v-show="canDownload"
              >下载</el-button
            >
          </div>
        </div>
        <el-table id="kfxz" :data="tableData2" highlight height="400px">
          <el-table-column
            prop="date"
            :label="`时间\n(yyyy/mm/dd)`"
            align="center"
            show-overflow-tooltip
            min-width="200"
            fixed="left"
          >
            <template slot-scope="scope">
              {{ scope.row.date | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="ogfName"
            label="区块"
            align="center"
            show-overflow-tooltip
            min-width="180"
            fixed="left"
          ></el-table-column>
          <el-table-column label="油井（口)" align="center">
            <el-table-column
              prop="proWellCount"
              label="总井"
              align="center"
              show-overflow-tooltip
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="proWellOpen"
              label="开井"
              align="center"
              show-overflow-tooltip
              min-width="120"
            ></el-table-column>
          </el-table-column>
          <el-table-column :label="'月均日产水平' + (currentUnit == 'm' ? '（m³)' : '（t)')" align="center">
            <el-table-column
              prop="liquidDailySum"
              label="液量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="oilDailySum"
              label="油量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column :label="'平均单井日产' + (currentUnit == 'm' ? '（m³)' : '（t)')" align="center">
            <el-table-column
              prop="liquidDailyAvg"
              label="液量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="oilDailyAvg"
              label="油量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="注水井（口)" align="center">
            <el-table-column
              prop="injectionWellCount"
              label="总井"
              align="center"
              show-overflow-tooltip
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="injectionWellOpen"
              label="开井"
              align="center"
              show-overflow-tooltip
              min-width="120"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="日注水（m³)" align="center">
            <el-table-column
              prop="injectionDailySum"
              label="合计"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="injectionDailyAvg"
              label="平均单井"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            prop="compressiveWaterCut"
            label="综合含水(%)"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cumOilProdYearly"
            :label="'截止当月年产油' + (currentUnit == 'm' ? '（m³)' : '（t)')"
            align="center"
            min-width="140"
            show-overflow-tooltip
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column label="注采比" align="center">
            <el-table-column
              prop="injectionProduceRateMonth"
              label="月"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="injectionProduceRateSum"
              label="累计"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="采油速度（%)" align="center">
            <el-table-column
              prop="reservoirsProduceSpeed"
              label="地质储量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="reservoirsProduceSpeedAvaliable"
              label="可采储量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column :label="'累计产量' + (currentUnit == 'm' ? '（×10⁴m³)' : '（×10⁴t)')" align="center">
            <el-table-column
              prop="oilSum"
              label="油量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise4"
            ></el-table-column>
            <el-table-column
              prop="waterSum"
              label="水量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise4"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="采出程度（%)" align="center">
            <el-table-column
              prop="reservoirsProduceDegree"
              label="地质储量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="reservoirsProduceDegreeAvaliable"
              label="可采储量"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="递减率（%)" align="center">
            <el-table-column
              prop="natureDeclineRate"
              label="自然递减率"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
            <el-table-column
              prop="compressveDeclineRate"
              label="综合递减率"
              align="center"
              show-overflow-tooltip
              min-width="120"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            prop="waterContainRaiseRate"
            :label="`含水上升率\n(%)`"
            align="center"
            show-overflow-tooltip
            min-width="120"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column
            prop="waterOilRateSum"
            label="累计水油比"
            align="center"
            show-overflow-tooltip
            min-width="120"
            :formatter="toPrecise2"
          ></el-table-column>
        </el-table>
      </el-dialog>

      <!-- 选择查看指标 -->
      <el-dialog title="选择查看指标信息" :visible.sync="dialogVisible" width="400px">
        <el-checkbox-group v-model="selectIndexList" style="display: flex; flex-direction: column">
          <el-checkbox
            v-for="(item, index) in indexList"
            :key="index"
            :label="item.label"
            :value="item.value"
            style="margin-left: 10px"
          ></el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeIndex">确 定</el-button>
        </span>
      </el-dialog>
    </pagePanelNew>
  </div>
</template>

<script>
import moment from "dayjs";
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import { exportExcel } from "@/lib/exportExcel.js";
import {
  chart,
  devPhaseInfos,
  devStatusInfos,
  devStatusInfosDate,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
export default {
  name: "developmenthistory",
  components: {
    Echart,
  },
  filters: {
    dateFormat(val) {
      if (val) {
        return new Date(val).format("yyyy-MM");
      } else {
        return val;
      }
    },
  },
  data() {
    return {
      //指标参数选择
      dialogVisible: false,
      //选中指标列表
      selectIndexList: [],
      //指标数据
      indexList: [
        {
          value: 0,
          label: "油井数量",
        },
        {
          value: 1,
          label: "水井数量",
        },
        {
          value: 2,
          label: "油田日产",
        },
        {
          value: 3,
          label: "平均单井日产",
        },
        {
          value: 4,
          label: "含水率",
        },
        {
          value: 5,
          label: "气油比",
        },
        {
          value: 6,
          label: "平均日注水",
        },
        {
          value: 7,
          label: "地层压降",
        },
        {
          value: 8,
          label: "月注采比",
        },
        {
          value: 9,
          label: "年产油",
        },
      ],
      companyId: "",
      //油田
      oilfield: "",
      //区块
      block: "",
      //油田
      oilfield1: "",
      //区块
      block1: "",
      //日期
      rq: [],
      dateFirst: "",
      dateSecond: "",
      //屏显切换计数
      sum: 1,
      //屏显切换符
      qh: "1",
      //参数配置
      dialogCsVisible: false,
      //开发现状表
      dialogDeveVisible: false,
      //选择列表
      checkList: [],
      page: 1,
      pageSize: 10,
      pageTotal: 0,
      //油田选项
      oiloptions: [],
      //区块选项
      blockoptions: [],
      blockoptions1: [],
      //油田综合开发历程表
      tableData: [],
      tableData1: [],
      //开发现状表
      tableData2: [],
      //开发曲线
      option: {
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              name: "油田综合开发曲线",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            start: 0, //滚动条开始位置（共100等份)
            end: 100, //滚动条结束位置
          },
        ],
        grid: [
          {
            x: "160",
            y: "1%",
            width: "85%",
            height: "7%",
          },
          {
            x: "160",
            y: "10%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "20%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "30%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "40%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "50%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "60%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "70%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "80%",
            width: "85%",
            height: "8%",
          },
          {
            x: "160",
            y: "90%",
            width: "85%",
            height: "7%",
          },
        ],
        tooltip: {
          show: true,
          trigger: "axis",
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "category",
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 1,
            data: [],
            type: "category",
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 2,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 3,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 4,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 5,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 6,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 7,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            gridIndex: 8,
            data: [],
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          {
            name: "日期 (年)",
            gridIndex: 9,
            data: [],
            axisLabel: {
              color: "#8FA4CC",
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
        // Y轴
        yAxis: [
          {
            name: "油井总井数(口)\n\n油井开井数(口)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 0,

            scale: true,
            interval: 10000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true,
            },
            minorTick: {
              splitNumber: "1",
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
            name: "水井总井数(口)\n\n水井开井数(口)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 1,

            interval: 100000000,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "油田日产液(m³)\n\n油田日产油(m³)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 2,

            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "平均单井日产液(m³)\n\n平均单井日产油(m³)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            scale: true,
            gridIndex: 3,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "含水率(%)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 4,
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "气油比",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 5,
            scale: true,

            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "油田平均日注水(m³)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 6,
            scale: true,

            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "地层压降(MPa)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 7,
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "月注采比",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 8,
            scale: true,

            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
            name: "年产油(10⁴m³)",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 9,
            scale: true,

            interval: 100000000,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
              showMinLabel: true,
              showMaxLabel: true,
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
        series: [
          {
            type: "line",
            name: "油井总井数(口)",

            symbol: "none",
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              color: "#030303",
            },
            data: [],
          },
          {
            type: "line",
            name: "油井开井数(口)",

            symbol: "none",
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              color: "#bf282c",
            },
            data: [],
          },
          {
            type: "line",
            name: "水井总井数(口)",
            symbol: "none",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "#294f96",
            },
            data: [],
          },
          {
            type: "line",
            name: "水井开井数(口)",
            symbol: "none",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "#9b5497",
            },
            data: [],
          },
          {
            type: "line",
            name: "油田日产液(m³)",
            symbol: "none",
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              color: "rgb(250,0,251)",
            },
            data: [],
          },
          {
            type: "line",
            name: "油田日产油(m³)",

            symbol: "none",
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              color: "#69b146",
            },
            data: [],
          },
          {
            type: "line",
            name: "平均单井日产液(m³)",

            symbol: "none",
            xAxisIndex: 3,
            yAxisIndex: 3,
            itemStyle: {
              color: "rgb(250,0,251)",
            },
            data: [],
          },
          {
            type: "line",
            name: "平均单井日产油(m³)",

            symbol: "none",
            xAxisIndex: 3,
            yAxisIndex: 3,
            itemStyle: {
              color: "#69b146",
            },
            data: [],
          },
          {
            type: "line",
            name: "含水率(%)",

            symbol: "none",
            xAxisIndex: 4,
            yAxisIndex: 4,
            itemStyle: {
              color: "rgb(0,0,255)",
            },
            data: [],
          },
          {
            type: "line",
            name: "气油比",

            symbol: "none",
            xAxisIndex: 5,
            yAxisIndex: 5,
            itemStyle: {
              color: "#da2c28",
            },
            data: [],
          },
          {
            type: "line",
            name: "油田平均日注水(m³)",

            symbol: "none",
            xAxisIndex: 6,
            yAxisIndex: 6,
            itemStyle: {
              color: "#61bcc3",
            },
            data: [],
          },
          {
            type: "bar",
            name: "地层压降(MPa)",
            barWidth: 22,
            xAxisIndex: 7,
            yAxisIndex: 7,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
            data: [],
          },
          {
            type: "line",
            name: "月注采比",
            symbol: "none",
            xAxisIndex: 8,
            yAxisIndex: 8,
            itemStyle: {
              color: "#FF5844",
            },
            data: [],
          },
          {
            type: "bar",
            name: "年产油(10⁴m³)",
            barWidth: 22,

            xAxisIndex: 9,
            yAxisIndex: 9,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
            data: [],
          },
        ],
      },
      currentUnit: "t",
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
      canDownload: true,
      //上传数据
      canUpload: false,
    };
  },
  async created() {
    this.rq = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
    // this.dateFirst = moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD');
    // this.dateSecond = moment().startOf('months').format('YYYY-MM-DD');
    await this.devStatusInfosDateApi();
  },
  mounted() {
    this.initData();
  },
  methods: {
    //重置
    async resetting() {
      Object.assign(this.$data, this.$options.data());
      this.rq = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
      // this.dateFirst = moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD');
      // this.dateSecond = moment().startOf('months').format('YYYY-MM-DD');
      await this.devStatusInfosDateApi();
      this.initData();
    },
    configuration() {
      this.dialogCsVisible = true;
    },
    async development(oilFieldId, blockId) {
      this.oilfield1 = oilFieldId;
      this.doSearchDialog();
      this.dialogDeveVisible = true;
    },
    switchs() {
      this.sum += 1;
      this.qh = this.sum % 2;
      let oilFieldId = this.oilfield;
      let fieldId = this.fieldId;
      let type = this.qh;
      this.getDevPhaseInfos(oilFieldId, fieldId, type);
    },
    async devStatusInfosDateApi() {
      await devStatusInfosDate().then((res) => {
        if (res.data.code == 200) {
          this.dateFirst = res.data.data;
        }
      });
    },
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
          this.oiloptions = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.oilfield = "3FC9A818F5BC43B88270DB80BBB3018F";
            this.oilfield1 = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.oilfield = this.oiloptions[0].ogfId ? this.oiloptions[0].ogfId : undefined;
            this.oilfield1 = this.oiloptions[0].ogfId ? this.oiloptions[0].ogfId : undefined;
          }
        }
      });
      //区块
      await QueryReservoirAnalyseUnit({ ogfId: this.oilfield }).then((res) => {
        if (res.data.code == 200) {
          this.blockoptions = res.data.data;
          this.blockoptions.unshift({
            reservoirAnalyseUnitId: this.oilfield,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.block = this.oilfield;
        }
      });
      this.doSearch();
    },
    //获取区块
    getFetchFields(oilFieldId) {
      QueryReservoirAnalyseUnit({ ogfId: oilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.blockoptions = res.data.data;
          this.blockoptions.unshift({
            reservoirAnalyseUnitId: this.oilfield,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.block = this.oilfield;
        }
      });
    },
    //弹框下拉框 获取区块信息
    getFetchFields1(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
      };
      QueryReservoirAnalyseUnit({ ogfId: oilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.blockoptions1 = res.data.data;
          this.blockoptions1.unshift({
            reservoirAnalyseUnitId: oilFieldId,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.block1 = oilFieldId;
        }
      });
    },
    //开发现状表 oilFieldId-油田id fieldId-区块id beginDate-对比时间1 endDate-对比时间2
    getDevStatusInfos(oilFieldId, fieldId, beginDate, endDate, unit) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
        beginDate: beginDate,
        endDate: "",
        unit: unit,
      };
      devStatusInfos(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData2 = res.data.data.developStatus;
        }
      });
    },
    //弹框中搜索操作
    doSearchDialog() {
      let oilFieldId = this.oilfield1;
      let fieldId = this.block1;
      let beginDate = this.dateFirst;
      let endDate = this.dateSecond;
      let unit = this.currentUnit;
      this.getDevStatusInfos(oilFieldId, fieldId, beginDate, endDate, unit);
    },
    doSwitchUnit() {
      if (this.currentUnit == "m") {
        this.currentUnit = "t";
      } else {
        this.currentUnit = "m";
      }
      this.doSearchDialog();
    },
    //油田开发历程表 oilFieldId-油田id fieldId-区块id type-类型id 0为开发阶段 1为含水率
    getDevPhaseInfos(oilFieldId, fieldId, type) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
        type: type,
      };
      devPhaseInfos(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.devPhaseInfos;
        } else {
          this.tableData = [];
        }
      });
    },
    //搜索-油田综合开发曲线-综合开发历程表
    doSearch() {
      let oilFieldId = this.oilfield;
      let fieldId = this.block;
      let type = this.qh;
      this.getDevPhaseInfos(oilFieldId, fieldId, type);
      this.getChart(oilFieldId, fieldId);
    },
    //油田综合开发曲线
    getChart(oilFieldId, fieldId) {
      let request = { oilFieldId, fieldId };
      chart(request)
        .then((res) => {
          console.log("chartsData", res.data);
          if (res.data.code == 200) {
            //油井总井数和油井开井数
            let proWellCountChart = res.data.data.proWellCountChart;
            this.getProWellCountChart(proWellCountChart);
            //水井总井数和水井开井数
            let injWellCountChart = res.data.data.injWellCountChart;
            //if (injWellCountChart!=null)
            this.getInjWellCountChart(injWellCountChart);
            //单元日产液和单元日产油
            let proUnitLiquidAndOilChart = res.data.data.proUnitLiquidAndOilChart;
            //if (proUnitLiquidAndOilChart!=null)
            this.getProUnitLiquidAndOilChart(proUnitLiquidAndOilChart);
            //平均单井日产液和平均单井日产油
            let singleProUnitLiquidAndOilChart = res.data.data.singleProUnitLiquidAndOilChart;
            //if (singleProUnitLiquidAndOilChart!=null)
            this.getSingleProUnitLiquidAndOilChart(singleProUnitLiquidAndOilChart);
            //含水率
            let waterCutChart = res.data.data.waterCutChart;
            //if (waterCutChart!=null)
            this.getWaterCutChart(waterCutChart);
            //气油比
            let gasOilRateChart = res.data.data.gasOilRateChart;
            //if (gasOilRateChart!=null)
            this.getGasOilRateChart(gasOilRateChart);
            //日注水
            let injectionDailyChart = res.data.data.injectionDailyChart;
            //if (injectionDailyChart!=null)
            this.getInjectionDailyChart(injectionDailyChart);
            //地层压降
            let layerPressureChart = res.data.data.layerPressureChart;
            //if (layerPressureChart!=null)
            this.getLayerPressureChart(layerPressureChart);
            //月注采比
            let proInjectMonthChart = res.data.data.proInjectMonthChart;
            //if (proInjectMonthChart!=null)
            this.getProInjectMonthChart(proInjectMonthChart);
            //年产油
            let oilYearChart = res.data.data.oilYearChart;
            //if (oilYearChart!=null)
            this.getOilYearChart(oilYearChart);
            console.log("图表格式化数据", this.option);
          } else {
            this.emptyChart();
          }
        })
        .catch((err) => {
          this.emptyChart();
        });
    },
    //油井总井数和油井开井数-chart
    getProWellCountChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesDataAll = [];
      let seriesDataOpen = [];
      let linearSet = chart.linearDataSets;
      let linearDataAll = linearSet[0].linearData;
      let xSet = new Set();
      if (chart) {
        linearDataAll.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataAll.push(point);
        });
        let linearDataOpen = linearSet[1].linearData;
        linearDataOpen.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataOpen.push(point);
        });
        xData = Array.from(xSet).sort();
      }
      this.option.xAxis[0].data = xData;
      this.option.series[0].data = seriesDataAll;
      this.option.series[1].data = seriesDataOpen;
    },
    //水井总井数和水井开井数-chart
    getInjWellCountChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesDataAll = [];
      let seriesDataOpen = [];
      let linearSet = chart.linearDataSets;
      let linearDataAll = linearSet[0].linearData;
      let xSet = new Set();
      if (chart) {
        linearDataAll.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataAll.push(point);
        });
        let linearDataOpen = linearSet[1].linearData;
        linearDataOpen.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataOpen.push(point);
        });
        xData = Array.from(xSet).sort();
      }
      this.option.xAxis[1].data = xData;
      this.option.series[2].data = seriesDataAll;
      this.option.series[3].data = seriesDataOpen;
    },
    //单元日产液和单元日产油-chart
    getProUnitLiquidAndOilChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesDataLiq = [];
      let seriesDataOil = [];
      let linearSet = chart.linearDataSets;
      let linearDataLiq = linearSet[0].linearData;
      let xSet = new Set();
      if (chart) {
        linearDataLiq.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataLiq.push(point);
        });
        let linearDataOil = linearSet[1].linearData;
        linearDataOil.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataOil.push(point);
        });
        xData = Array.from(xSet).sort();
      }
      this.option.xAxis[2].data = xData;
      this.option.series[4].data = seriesDataLiq;
      this.option.series[5].data = seriesDataOil;
    },
    //平均单井日产液和平均单井日产油-chart
    getSingleProUnitLiquidAndOilChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesDataLiq = [];
      let seriesDataOil = [];
      let linearSet = chart.linearDataSets;
      let linearDataLiq = linearSet[0].linearData;
      let xSet = new Set();
      if (chart) {
        linearDataLiq.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataLiq.push(point);
        });
        let linearDataOil = linearSet[1].linearData;
        linearDataOil.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          xSet.add(label[0] + "-" + label[1]);
          point.push(item.value);
          seriesDataOil.push(point);
        });
        xData = Array.from(xSet).sort();
      }
      this.option.xAxis[3].data = xData;
      this.option.series[6].data = seriesDataLiq;
      this.option.series[7].data = seriesDataOil;
    },
    //含水率-chart
    getWaterCutChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesData = [];
      if (chart) {
        let linearData = chart.linearDataSets[0].linearData;
        linearData.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          point.push(item.value);
          xData.push(label[0] + "-" + label[1]);
          seriesData.push(point);
        });
      }
      this.option.xAxis[4].data = xData;
      this.option.series[8].data = seriesData;
    },
    //气油比-chart
    getGasOilRateChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesData = [];
      if (chart) {
        let linearData = chart.linearDataSets[0].linearData;
        linearData.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          point.push(item.value);
          xData.push(label[0] + "-" + label[1]);
          seriesData.push(point);
        });
      }
      this.option.xAxis[5].data = xData;
      this.option.series[9].data = seriesData;
    },
    //日注水-chart
    getInjectionDailyChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesData = [];
      if (chart) {
        let linearData = chart.linearDataSets[0].linearData;
        linearData.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          point.push(item.value);
          xData.push(label[0] + "-" + label[1]);
          seriesData.push(point);
        });
      }
      this.option.xAxis[6].data = xData;
      this.option.series[10].data = seriesData;
    },
    //hwh-地层压降
    getLayerPressureChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesData = [];
      if (chart) {
        let linearData = chart.linearDataSets[0].linearData;
        linearData.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0]);
          point.push(item.value);
          xData.push(label[0] + "-" + label[1]);
          seriesData.push(point);
        });
      }
      this.option.xAxis[7].data = xData;
      this.option.series[11].data = seriesData;
    },
    //月注采比-chart
    getProInjectMonthChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesData = [];
      if (chart) {
        let linearData = chart.linearDataSets[0].linearData;
        linearData.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0] + "-" + label[1]);
          point.push(item.value);
          xData.push(label[0] + "-" + label[1]);
          seriesData.push(point);
        });
      }
      this.option.xAxis[8].data = xData;
      this.option.series[12].data = seriesData;
    },
    //年产油-chart
    getOilYearChart(chart) {
      // 如果没有曲线数据直接返回
      if (!chart?.linearDataSets) return;
      let xData = [];
      let seriesData = [];
      if (chart) {
        let linearData = chart.linearDataSets[0].linearData;
        linearData.forEach((item, index) => {
          let point = [];
          let label = item.label.split("-");
          point.push(label[0]);
          point.push(item.value);
          xData.push(label[0]);
          seriesData.push(point);
        });
      }
      this.option.xAxis[9].data = xData;
      this.option.xAxis[7].data = xData;
      this.option.series[13].data = seriesData;
    },
    //清空图表内容
    emptyChart() {
      this.option.xAxis[0].data = [];
      this.option.xAxis[1].data = [];
      this.option.xAxis[2].data = [];
      this.option.xAxis[3].data = [];
      this.option.xAxis[4].data = [];
      this.option.xAxis[5].data = [];
      this.option.xAxis[6].data = [];
      this.option.xAxis[7].data = [];
      this.option.xAxis[8].data = [];
      this.option.xAxis[9].data = [];
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      this.option.series[2].data = [];
      this.option.series[3].data = [];
      this.option.series[4].data = [];
      this.option.series[5].data = [];
      this.option.series[6].data = [];
      this.option.series[7].data = [];
      this.option.series[8].data = [];
      this.option.series[9].data = [];
      this.option.series[10].data = [];
      this.option.series[11].data = [];
      this.option.series[12].data = [];
      this.option.series[13].data = [];
    },
    //下载导出文件 tableId tableName
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
    //下载echarts
    downEchart() {
      this.$refs.echartChart.chartDownLoad();
    },
    //油田改变操作 val
    onFieldChange(val) {
      this.getFetchFields(val);
    },
    //根据查看的指标来生成grid 来改变 显示图内容
    changeIndex() {
      //grid 结果
      let grid = [];
      let iList = this.selectIndexList;
      let height = 0;
      let yValue = 1;
      let num = iList.length;
      if (num) {
        let hInterval = parseInt(Math.floor(100 / num));
        let xhY = 1;
        let xhHeight = hInterval - 4;
        let yInterval = hInterval;
        let max = 0;
        //做了一个布局隐藏效果
        this.indexList.forEach((item, index) => {
          let gridDetail = {
            x: "160",
            y: "-10%",
            width: "88%",
            height: "2%",
          };

          if (iList.includes(item.label)) {
            gridDetail.y = xhY + "%";
            gridDetail.height = xhHeight + "%";
            xhY = xhY + yInterval;
            if (max < item.value) {
              max = item.value;
            }
          }
          grid.push(gridDetail);
          this.option.xAxis[index].axisLine.lineStyle = {
            color: "rgba(255,255,255,.16)",
          };
          this.option.xAxis[index].axisLabel.show = false;
          this.option.xAxis[index].axisLabel.color = "#fff";
        });
        this.option.xAxis[max].axisLine.lineStyle = {
          color: "#fff",
        };
        this.option.xAxis[max].axisLabel.show = true;
      } else {
        this.indexList.forEach((item, index) => {
          let gridDetail = {
            x: "160",
            y: "-10%",
            width: "88%",
            height: "2%",
          };
          grid.push(gridDetail);
        });
      }
      this.option.grid = grid;
      this.dialogVisible = false;
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
    // 表格格式化方法 - 数值只保留四位小数
    toPrecise4(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(4)
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
::v-deep .z-main .g-w100:first-child {
  padding-top: 0 !important;
  overflow-y: scroll;
}
#tableData {
  ::v-deep .el-table__header-wrapper .cell {
    height: auto;
    line-height: 18px;
    white-space: pre;
  }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
