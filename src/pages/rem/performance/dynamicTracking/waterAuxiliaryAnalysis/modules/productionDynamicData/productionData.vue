<!-- 生产数据 -->
<template>
  <div class="z-main">
    <div class="z-search">
      <span>日期：</span>
      <el-date-picker
        v-model="selectData"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        style="margin-right: 15px"
      ></el-date-picker>
      <el-select
        v-model="selectPosition"
        placeholder="请选择"
        filterable
        clearable
        style="width: 220px; margin-right: 15px"
      >
        <el-option
          v-for="item in position"
          :key="item.fieldLayerId"
          :label="item.layerName"
          :value="item.fieldLayerId"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
    </div>
    <page-panel-new :style="{ height: height + 'px', marginTop: 0 }" show-btn>
      <Echarts ref="echartDown" :chart-data="option" style="height: 100%"></Echarts>
    </page-panel-new>
    <div class="develop">
      <span :class="[isDevelop ? 'top-span' : 'active-span']" @click="tapDevelop"></span>
    </div>
    <page-panel headerTitle="单井动态分析" v-show="isDevelop" style="height: 500px" show-btn>
      <el-table
        id="tableData"
        :data="tableData"
        border
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width: 100%"
        height="100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      >
        <el-table-column prop="injDuration" label="注入时间"></el-table-column>
        <el-table-column prop="injDaily" :label="`日注水量\n (m³)`"></el-table-column>
        <el-table-column prop="csgPress" :label="`套压\n (MPa)`"></el-table-column>
        <el-table-column prop="whInjPress" :label="`井口压力\n (MPa)`"></el-table-column>
        <el-table-column prop="injDailySum" :label="`水聚总量\n (m³)`"></el-table-column>
        <el-table-column prop="injMonthly" :label="`日配注量\n (m³)`"></el-table-column>
      </el-table>
    </page-panel>
  </div>
</template>

<script>
import { fieldLayers } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { produceData } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import Echarts from "@/components/tools/Echarts/index.vue";
import FileSaver from "file-saver";
export default {
  components: {
    Echarts,
  },
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  data() {
    return {
      height: "",
      selectData: [],
      position: [],
      selectPosition: "",
      option: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
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
        grid: [
          { left: "14%", top: "4%", width: "74%", height: "38%" },
          { left: "14%", top: "48%", width: "74%", height: "38%" },
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
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
                //color: '#979797'
                color: "#8FA4CC",
              },
            },
          },
          {
            name: "日期 (日)",
            nameGap: 30,
            gridIndex: 1,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              //show: false,
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
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: "注\n入\n时\n间\n︵\nh\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#ff631f",
              fontSize: 14,
            },
            max: 24,
            min: 0,
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
          {
            gridIndex: 0,
            name: "井\n口\n压\n力\n︵\nM\nP\na\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#c8b71a",
              fontSize: 14,
            },
            position: "right",
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
          {
            gridIndex: 0,
            name: "套\n压\n︵\nM\nP\na\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "rgb(186,85,211)",
              fontSize: 14,
            },
            position: "right",
            offset: 80,
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
          {
            gridIndex: 1,
            name: "水\n聚\n总\n量\n︵\nm³\n︶",
            nameLocation: "center",
            nameGap: 50,
            nameRotate: 0,
            nameTextStyle: {
              color: "#00ffff",
              fontSize: 14,
            },
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
          {
            gridIndex: 1,
            name: "日\n配\n注\n量\n︵\nm³\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#be5028",
              fontSize: 14,
            },
            position: "left",
            offset: 80,
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
          {
            gridIndex: 1,
            name: "日\n注\n聚\n量\n︵\nm³\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#ff69b4",
              fontSize: 14,
            },
            position: "right",
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
          {
            gridIndex: 1,
            name: "日\n注\n水\n量\n︵\nm³\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#61bcc3",
              fontSize: 14,
            },
            position: "right",
            offset: 80,
            // scale: true,
            axisLabel: {
              show: true,
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
            },
          },
        ],
        series: [],
      },
      isDevelop: false,
      tableData: [],
    };
  },
  mounted() {
    this.height = document.getElementsByClassName("z-main")[0].offsetHeight - 40 - 60 - 10;
    let year = new Date().getFullYear();
    this.selectData = [new Date(year + "-01-01").format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
    this.fieldLayersApi();
  },
  methods: {
    async fieldLayersApi() {
      await fieldLayers({ oilFieldId: this.oilFeildId, wellId: this.wellId }).then((res) => {
        if (res.data.code == 200 && res.data.data && res.data.data.fieldLayers && res.data.data.fieldLayers.length) {
          this.position = res.data.data.fieldLayers;
          this.doSearch();
        }
      });
    },
    async doSearch() {
      let startDate = this.selectData[0];
      let endDate = this.selectData[1];
      let request = {
        beginDate: startDate,
        endDate: endDate,
        ogfId: this.oilFeildId,
        platformId: this.platformId,
        wellId: this.wellId,
        layerId: this.selectPosition,
      };
      produceData(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.proDatas ? res.data.data.proDatas : [];
          if (res.data.data.charts) {
            let seriesData = [];
            // let legendData = [];
            //获取x轴数据信息
            let xSet = new Set();
            let chartDataS = res.data.data.charts;
            for (let i = 0; i < chartDataS.length; i++) {
              if (chartDataS[i].linearDataSets == null || chartDataS[i].linearDataSets == undefined) {
                continue;
              }
              let chartData = chartDataS[i].linearDataSets[0];
              let chartDatalabel = chartData.label;
              let series = {};
              let lineName = chartData.label;
              series.type = "line";
              series.name = lineName;
              // legendData.push(series.name);
              //数据所属图像
              if (chartDatalabel == "套压") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 2;
                series.itemStyle = { color: "rgb(186,85,211)" };
              } else if (chartDatalabel == "日注水量") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 5;
                series.itemStyle = { color: "#61bcc3" };
              } else if (chartDatalabel == "井口压力") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 1;
                series.itemStyle = { color: "#c8b71a" };
              } else if (chartDatalabel == "注入时间") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 0;
                series.itemStyle = { color: "#ff631f" };
              } else if (chartDatalabel == "日配注量") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 3;
                series.itemStyle = { color: "#be5028" };
              } else if (chartDatalabel == "水聚总量") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 3;
                series.itemStyle = { color: "#00ffff" };
              } else if (chartDatalabel == "日注聚量") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 5;
                series.itemStyle = { color: "#ff69b4" };
              } else {
                continue;
              }
              //折线数据
              let lineData = chartData.linearData;
              let pointData = [];
              for (let i = 0; i < lineData.length; i++) {
                let point = [];
                point.push(lineData[i].label);
                xSet.add(lineData[i].label);
                point.push(lineData[i].value);
                pointData.push(point);
              }
              series.data = pointData;
              series.showSymbol = false;
              seriesData.push(series);
            }
            let xData = Array.from(xSet).sort();
            this.option.xAxis[0].data = xData;
            this.option.xAxis[1].data = xData;
            this.option.series = seriesData;
          } else {
            this.option.xAxis[0].data = [];
            this.option.xAxis[1].data = [];
            this.option.series = [];
          }
        }
      });
    },
    //干线压力
    getArterialPressureLine(linearChart) {
      let xData = [];
      let yData = [];
      let lineData = linearChart.linearData;
      lineData.forEach((item, index) => {
        xData.push(item.label);
        yData.push(item.value);
      });
      this.option.xAxis[0].data = xData;
      this.option.series[0].data = yData;
      this.option.series[0].name = "泵出口压力";
    },
    //套压
    getCasingPressureLine(linearChart) {
      let xData = [];
      let yData = [];
      let lineData = linearChart.linearData;
      lineData.forEach((item, index) => {
        xData.push(item.label);
        yData.push(item.value);
      });
      this.option.xAxis[1].data = xData;
      this.option.series[1].data = yData;
      this.option.series[1].name = "套压";
    },
    //油压
    getOilPressureLine(linearChart) {
      let xData = [];
      let yData = [];
      let lineData = linearChart.linearData;
      lineData.forEach((item, index) => {
        xData.push(item.label);
        yData.push(item.value);
      });
      this.option.xAxis[2].data = xData;
      this.option.series[2].data = yData;
      this.option.series[2].name = "油压";
    },
    //日注入量
    getInjectionRateLine(linearChart) {
      let xData = [];
      let yData = [];
      let lineData = linearChart.linearData;
      lineData.forEach((item, index) => {
        xData.push(item.label);
        yData.push(item.value);
      });
      this.option.xAxis[3].data = xData;
      this.option.series[3].data = yData;
      this.option.series[3].name = "日注入量";
    },
    //展示|收缩
    tapDevelop() {
      this.isDevelop = !this.isDevelop;
      this.$nextTick(() => {
        this.$refs.echartDown.chart.resize();
      });
      if (this.isDevelop) {
        this.$nextTick(() => {
          let parentDom = document.getElementsByClassName("z-main")[0];
          parentDom.scrollBy({ top: 10000, behavior: "smooth" });
        });
      }
    },
    //下载echarts
    doDownLoad() {
      let res = this.$refs["echartDown"].chart.getDataURL({
        type: "png",
        pixelRatio: 14,
        backgroundColor: "#022644",
      });
      let fileName = "生产数据";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      FileSaver.saveAs(res, fileName);
    },
  },
};
</script>

<style lang="scss" scoped>
.z-main {
  width: 100%;
  height: calc(100% - 101px);
  overflow-y: scroll;
  overflow-x: hidden;
  .z-search {
    height: 60px;
    display: flex;
    align-items: center;
  }
  .z-echarts {
    width: 100%;
    height: 500px;
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
}
</style>
