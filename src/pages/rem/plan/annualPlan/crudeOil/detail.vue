<!-- 原油产量-详情 二期需求变更，此文件代码不展示 -->
<template>
  <el-container class="layout">
    <el-main>
      <el-row>
        <el-col>
          <div style="float: right">
            <el-button style="margin-left: 10px" @click="switchToBack">返回</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <info-window infoWidth="100%" infoHeight="300px" headerTitle="基础产量" :isShowMaxBtn="true">
            <Echart :chart-data="OldLineChart" height="100%"></Echart>
          </info-window>
        </el-col>
        <el-col :span="12">
          <info-window infoWidth="100%" infoHeight="300px" headerTitle="措施产量" :isShowMaxBtn="true">
            <Echart :chart-data="productLineChart" height="100%"></Echart>
          </info-window>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <info-window infoWidth="100%" infoHeight="300px" headerTitle="调整井产量" :isShowMaxBtn="true">
            <Echart :chart-data="resetProLineChart" height="100%"></Echart>
          </info-window>
        </el-col>
        <el-col :span="12">
          <info-window infoWidth="100%" infoHeight="300px" headerTitle="上年老井本年产量" :isShowMaxBtn="true">
            <Echart :chart-data="lastYearProLineChart" height="100%"></Echart>
          </info-window>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <info-window infoWidth="100%" infoHeight="300px" headerTitle="上年投产新井产量" :isShowMaxBtn="true">
            <Echart :chart-data="lastYearUseLineChart" height="100%"></Echart>
          </info-window>
        </el-col>
        <el-col :span="12">
          <info-window infoWidth="100%" infoHeight="300px" headerTitle="开发井产量" :isShowMaxBtn="true">
            <Echart :chart-data="devWellLineChart" height="100%"></Echart>
          </info-window>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {
  adjustWellChart,
  oldWellChart,
  oldLastYearChart,
  newLastYearChart,
  measureChart,
  devWellChart,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";

export default {
  components: {
    Echart,
  },
  data() {
    return {
      //油田id
      oilFieldId: "",
      //油田名
      oilFeildName: "",
      //选择单位
      unitType: "",
      //年份
      selectYear: new Date().format("yyyy"),
      //措施产量 井口次
      productWellCount: 0,
      //措施产量 产油量
      productionOilCount: 0,
      //开发井产量 井 口次
      devWellCount: 0,
      //开发井产量 增加产油量
      devOilCount: 0,
      //老井产量折线图
      OldLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "基础产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: [
          {
            name: "日期 (日)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
              align: "center",
            },
            nameLocation: "center",
            nameGap: 30,
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 10,
              interval: function (index, val) {
                if (val.substr(-2) == "01") {
                  return true;
                } else {
                  return false;
                }
              },
              rotate: 20,
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "产油量/t",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
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
                color: "rgba(151,151,151,.16)",
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
      //措施产量折线图
      productLineChart: {
        grid: {
          top: "8%",
          left: "10%",
          width: "80%",
          height: "70%",
        },
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "措施产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (日)",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
          },
          nameLocation: "center",
          nameGap: 30,
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 10,
            interval: function (index, val) {
              if (val.substr(-2) == "01") {
                return true;
              } else {
                return false;
              }
            },
            rotate: 20,
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "产油量(m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            nameLocation: "center",
            nameRotate: 90,
            nameGap: 35,
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
                color: "rgba(151,151,151,.16)",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
          {
            type: "value",
            name: "措施井次(口)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            nameLocation: "center",
            nameRotate: -90,
            nameGap: 25,
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
                color: "rgba(151,151,151,.16)",
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
      //调整井产量折线图
      resetProLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "调整井产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: [
          {
            name: "日期 (日)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
              align: "center",
            },
            nameLocation: "center",
            nameGap: 30,
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 10,
              interval: function (index, val) {
                if (val.substr(-2) == "01") {
                  return true;
                } else {
                  return false;
                }
              },
              rotate: 20,
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产油量(m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            nameLocation: "center",
            nameRotate: 90,
            nameGap: 35,
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
                color: "rgba(151,151,151,.16)",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
          {
            type: "value",
            name: "措施井次(口)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            nameLocation: "center",
            nameRotate: -90,
            nameGap: 25,
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
                color: "rgba(151,151,151,.16)",
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
      //上年老井本年产量折线图
      lastYearProLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "上年老井本年产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: [
          {
            name: "日期 (日)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
              align: "center",
            },
            nameLocation: "center",
            nameGap: 30,
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 10,
              interval: function (index, val) {
                if (val.substr(-2) == "01") {
                  return true;
                } else {
                  return false;
                }
              },
              rotate: 20,
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "产油量/t",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
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
                color: "rgba(151,151,151,.16)",
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
      //上年投产新井产量折线图
      lastYearUseLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "上年投产新井产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: [
          {
            name: "日期 (日)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
              align: "center",
            },
            nameLocation: "center",
            nameGap: 30,
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 10,
              interval: function (index, val) {
                if (val.substr(-2) == "01") {
                  return true;
                } else {
                  return false;
                }
              },
              rotate: 20,
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "产油量/t",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
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
                color: "rgba(151,151,151,.16)",
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
      //开发井产量折线图
      devWellLineChart: {
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#9A72FF", "#DA835E"],
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
              name: "开发井产量",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (日)",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
          },
          nameLocation: "center",
          nameGap: 30,
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 10,
            interval: function (index, val) {
              if (val.substr(-2) == "01") {
                return true;
              } else {
                return false;
              }
            },
            rotate: 20,
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "措施井次(口)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            nameLocation: "center",
            nameRotate: 90,
            nameGap: 25,
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
                color: "rgba(151,151,151,.16)",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
          {
            type: "value",
            name: "注入量(10⁴m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            nameLocation: "center",
            nameRotate: -90,
            nameGap: 35,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(151,151,151,.16)",
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
      canDownload: false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //返回上一页
    switchToBack() {
      this.$router.go(-1);
    },
    //初始化
    async initData() {
      //获得油田id
      this.oilFieldId = this.$route.params.oilFieldId;
      //获得油田名称
      this.oilFeildName = this.$route.params.oilFieldName;
      //获得单位
      this.unitType = this.$route.params.unitType;
      //获得下载权限
      this.canDownload = this.$route.params.canDownload;
      this.selectYear = this.$route.params.selectYear;
      //控制权限内容
      this.downPower(this.canDownload);
      //调整井折线图
      this.getAdjustWellChart(this.oilFieldId, this.unitType);
      //开发井折线图
      this.getDevWellChart(this.oilFieldId, this.unitType);
      //老井产量折线图
      this.getOldWellChart(this.oilFieldId, this.unitType);
      //上年老井本年产量
      this.getOldLastYearChart(this.oilFieldId, this.unitType);
      //上年新井本年产量
      this.getNewLastYearChart(this.oilFieldId, this.unitType);
      //措施井折线图
      this.getMeasureChart(this.oilFieldId, this.unitType);
    },
    //调整井产量 折线图
    getAdjustWellChart(oilFieldId, unitType) {
      //请求参数 油田id 单位类别
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      //请求接口方法 调整井产量
      adjustWellChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];
          //x轴数据 对应x轴数据显示不全的情况
          let xSet = new Set();
          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            let linearChart = chartDataS[i];
            let series = {};
            series.name = linearChart.label;
            series.type = "line";
            series.symbol = "none";
            let name = linearChart.label;
            if (name == "实际措施井次") {
              series.yAxisIndex = 1;
            } else if (name == "计划措施井次") {
              series.yAxisIndex = 1;
            } else if (name == "实际注入量") {
              series.yAxisIndex = 0;
            } else if (name == "计划注入量") {
              series.yAxisIndex = 0;
            } else if (name == "滚动预测") {
              series.yAxisIndex = 0;
            }
            let seriesDataD = [];
            let linearData = linearChart.linearData;
            for (let i = 0; i < linearData.length; i++) {
              let point = [];
              //获得x坐标点,去重
              xSet.add(linearData[i].label.substring(0, 10));
              //拼写每个坐标点的数据
              point.push(linearData[i].label.substring(0, 10));
              point.push(linearData[i].value);
              seriesDataD.push(point);
            }
            //放入数据集合
            series.data = seriesDataD;
            //放入series集合中
            seriesData.push(series);
          }
          //set 集合转数组
          let xData = Array.from(xSet).sort();
          this.resetProLineChart.xAxis.data = xData;
          if (unitType == "t") {
            this.resetProLineChart.yAxis[0].name = "产油量(t)";
          } else if (unitType == "m") {
            this.resetProLineChart.yAxis[0].name = "产油量(m³)";
          }
          //图例数据
          this.resetProLineChart.legend.data = legendData;
          this.resetProLineChart.series = seriesData;
        }
      });
    },
    //调整井折线数据解析
    getLinearSeries(linear, type) {
      let series = {};
      series.type = "line";
      series.name = linear.label;
      series.symbol = "none";
      let seriesData = [];
      //折线数据数组
      let chartLine = linear.linearData;
      if (chartLine.length == 1) {
        series.symbol = "circle";
        series.size = 3;
      }
      for (let i = 0; i < chartLine.length; i++) {
        let point = [];
        if (type === "1") {
          point.push(chartLine[i].label.substring(0, 10));
        } else {
          point.push(chartLine[i].label);
        }
        point.push(chartLine[i].value);
        seriesData.push(point);
      }
      series.data = seriesData;
      return series;
    },
    //老井产量 现改为 基础产量
    getOldWellChart(oilFieldId, unitType) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      oldWellChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];

          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            //调用生成相关折线图数据
            seriesData.push(this.getLinearSeries(chartDataS[i], "1"));
          }
          if (unitType == "t") {
            this.OldLineChart.yAxis[0].name = "产油量(t)";
          } else if (unitType == "m") {
            this.OldLineChart.yAxis[0].name = "产油量(m³)";
          }
          //图例数据
          this.OldLineChart.legend.data = legendData;
          this.OldLineChart.series = seriesData;
        }
      });
    },
    //上年老井本年产量
    getOldLastYearChart(oilFieldId, unitType) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      oldLastYearChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];

          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label.substring(0, 10));
            //调用生成相关折线图数据
            seriesData.push(this.getLinearSeries(chartDataS[i], "1"));
          }
          if (unitType == "t") {
            this.lastYearProLineChart.yAxis[0].name = "产油量(t)";
          } else if (unitType == "m") {
            this.lastYearProLineChart.yAxis[0].name = "产油量(m³)";
          }
          //图例数据
          this.lastYearProLineChart.legend.data = legendData;
          this.lastYearProLineChart.series = seriesData;
        }
      });
    },
    //上年投产新井产量
    getNewLastYearChart(oilFieldId, unitType) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      newLastYearChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];

          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            //调用生成相关折线图数据
            seriesData.push(this.getLinearSeries(chartDataS[i], "1"));
          }
          if (unitType == "t") {
            this.lastYearUseLineChart.yAxis[0].name = "产油量(t)";
          } else if (unitType == "m") {
            this.lastYearUseLineChart.yAxis[0].name = "产油量(m³)";
          }
          //图例数据
          this.lastYearUseLineChart.legend.data = legendData;
          this.lastYearUseLineChart.series = seriesData;
        }
      });
    },
    //措施井产量
    getMeasureChart(oilFieldId, unitType) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      measureChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];
          //x轴数据 对应x轴数据显示不全的情况
          let xSet = new Set();
          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            let linearChart = chartDataS[i];
            let series = {};
            series.name = linearChart.label;
            series.type = "line";
            series.symbol = "none";
            let name = linearChart.label;
            if (name == "实际措施井次") {
              series.yAxisIndex = 1;
            } else if (name == "计划措施井次") {
              series.yAxisIndex = 1;
            } else if (name == "实际注入量") {
              series.yAxisIndex = 0;
            } else if (name == "计划注入量") {
              series.yAxisIndex = 0;
            } else if (name == "滚动预测") {
              series.yAxisIndex = 0;
            }
            let seriesDataD = [];
            let linearData = linearChart.linearData;
            for (let i = 0; i < linearData.length; i++) {
              let point = [];
              //获得x坐标点,去重
              xSet.add(linearData[i].label.substring(0, 10));
              //拼写每个坐标点的数据
              point.push(linearData[i].label.substring(0, 10));
              point.push(linearData[i].value);
              seriesDataD.push(point);
            }
            //放入数据集合
            series.data = seriesDataD;
            //放入series集合中
            seriesData.push(series);
          }
          //set 集合转数组
          let xData = Array.from(xSet).sort();
          this.productLineChart.xAxis.data = xData;
          //console.log(xData);
          if (unitType == "t") {
            this.productLineChart.yAxis[0].name = "产油量(t)";
          } else if (unitType == "m") {
            this.productLineChart.yAxis[0].name = "产油量(m³)";
          }
          //图例数据
          this.productLineChart.legend.data = legendData;
          this.productLineChart.series = seriesData;
          //井口次
          this.productWellCount = res.data.data.times;
          //增油量
          this.productionOilCount = res.data.data.injection;
        }
      });
    },
    //措施井产量
    getDevWellChart(oilFieldId, unitType) {
      let request = {
        oilFieldId: oilFieldId,
        unitType: unitType,
        year: this.selectYear,
      };
      devWellChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];

          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            //调用生成相关折线图数据
            seriesData.push(this.getLinearSeriesDoubleIndex(chartDataS[i]));
          }
          if (unitType == "t") {
            this.devWellLineChart.yAxis[1].name = "注入量(10⁴t)";
          } else if (unitType == "m") {
            this.devWellLineChart.yAxis[1].name = "注入量(10⁴m³)";
          }
          //图例数据
          this.devWellLineChart.legend.data = legendData;
          this.devWellLineChart.series = seriesData;

          //井口次
          this.devWellCount = res.data.data.times;
          //增油量
          this.devOilCount = res.data.data.injection;
        }
      });
    },
    //下载echarts 隐藏 显示
    downPower(flag) {
      this.OldLineChart.toolbox.show = flag;
      this.productLineChart.toolbox.show = flag;
      this.resetProLineChart.toolbox.show = flag;
      this.lastYearProLineChart.toolbox.show = flag;
      this.lastYearUseLineChart.toolbox.show = flag;
      this.devWellLineChart.toolbox.show = flag;
    },
  },
};
</script>

<style scoped>
::v-deep .el-button {
  color: #00def0;
  background-color: #031527;
  border: 1px solid #00def0;
}
</style>
