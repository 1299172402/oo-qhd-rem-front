<!-- 油田注水详情 -->
<template>
  <el-container class="layout">
    <el-header height="auto"> </el-header>
    <el-main>
      <!-- 放回按钮 -->
      <el-row>
        <el-col>
          <div style="float: right">
            <el-button class="commonBtn" style="margin-left: 10px" @click="switchToBack"> 放回 </el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 图标数据图 -->
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <info-window
            info-width="100%"
            info-height="100"
            :header-title="
              '老井转注 井次：' +
              (oldWellCount ? oldWellCount : 0) +
              '口 注入量：' +
              (oldInjectionCount ? oldInjectionCount : 0) +
              'm³'
            "
            :is-show-max-btn="true"
          >
            <Echart :chart-data="oldWellLineChart" height="400px"></Echart>
          </info-window>
        </el-col>
        <el-col :span="12">
          <info-window
            info-width="100"
            info-height="100"
            :header-title="
              '新井投注 新井：' +
              (newWellCount ? newWellCount : 0) +
              '口 注入量：' +
              (newInjectionCount ? newInjectionCount : 0) +
              'm³'
            "
            :is-show-max-btn="true"
          >
            <Echart :chart-data="newWellLineChart" height="400px"></Echart>
          </info-window>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
  <script>
import Echart from "@/components/tools/Echarts/index.vue";
import { oldToInjectionChart, newToInjectionChart } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
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
      //老井转注 井数
      oldWellCount: 0,
      //老井转注 注入量
      oldInjectionCount: 0,
      //新井转注 井数
      newWellCount: 0,
      //新井转注 注入量
      newInjectionCount: 0,
      //年份
      selectYear: new Date().format("yyyy"),
      //老井转注 折线图1
      oldWellLineChart: {
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
              name: "老井转注",
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
          name: "时间/日期",
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
            show: false,
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
          {
            type: "value",
            name: "注入量(m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
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
      //新井投注 折线图2
      newWellLineChart: {
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
              name: "新井投注",
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
          name: "时间/日期",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
          },
          nameGap: 30,
          nameLocation: "center",
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
            show: false,
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
          {
            type: "value",
            name: "注入量(m³)",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
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
    //返回
    switchToBack() {
      this.$router.go(-1);
    },
    /**
     *  hwh
     *  初始化
     * @returns {Promise<void>}
     */
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
      this.getOldToInjectionChart(this.oilFieldId);
      this.getNewToInjectionChart(this.oilFieldId);
    },
    /**
     *
     * hwh
     * 获得老井转注的折线图
     *
     */
    getOldToInjectionChart(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.selectYear,
      };
      oldToInjectionChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];

          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          if (chartDataS != null) {
            for (let i = 0; i < chartDataS.length; i++) {
              legendData.push(chartDataS[i].label);
              //调用生成相关折线图数据
              seriesData.push(this.getLinearSeriesDoubleIndex(chartDataS[i]));
            }
          }
          //图例数据
          this.oldWellLineChart.legend.data = legendData;
          this.oldWellLineChart.series = seriesData;

          //井口次
          this.oldWellCount = res.data.data.times;
          //增油量
          this.oldInjectionCount = res.data.data.injection;
        }
      });
    },
    /**
     * hwh
     * 获得新井转注数据
     */
    getNewToInjectionChart(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
        year: this.selectYear,
      };
      newToInjectionChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];

          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          if (chartDataS != null) {
            for (let i = 0; i < chartDataS.length; i++) {
              legendData.push(chartDataS[i].label);
              //调用生成相关折线图数据
              seriesData.push(this.getLinearSeriesDoubleIndex(chartDataS[i]));
            }
          }
          //图例数据
          this.newWellLineChart.legend.data = legendData;
          this.newWellLineChart.series = seriesData;

          //井口次
          this.newWellCount = res.data.data.times;
          //增油量
          this.newInjectionCount = res.data.data.injection;
        }
      });
    },
    /**
     *  hwh
     *   特殊双y轴特例拼写 series
     * @param linearChart
     */
    getLinearSeriesDoubleIndex(linearChart) {
      let series = {};
      series.name = linearChart.label;
      series.type = "line";
      series.symbol = "none";
      let name = linearChart.label;
      if (name == "实际措施井次") {
        series.yAxisIndex = 0;
      } else if (name == "计划措施井次") {
        series.yAxisIndex = 0;
      } else if (name == "实际日注入量") {
        series.yAxisIndex = 1;
      } else if (name == "计划注入量") {
        series.yAxisIndex = 1;
      } else if (name == "滚动预测") {
        series.yAxisIndex = 1;
      }
      let seriesData = [];
      let linearData = linearChart.linearData;
      for (let i = 0; i < linearData.length; i++) {
        let point = [];
        point.push(linearData[i].label);
        point.push(linearData[i].value);
        seriesData.push(point);
      }
      series.data = seriesData;
      return series;
    },
    /**
     * 下载echarts 隐藏 显示
     * @param flag
     */
    downPower(flag) {
      this.oldWellLineChart.toolbox.show = flag;
      this.newWellLineChart.toolbox.show = flag;
    },
  },
};
</script>