<template>
    <div style="font-size: 20px" class="g-w100 g-h100">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="含水上升"
            :is-show-max-btn="true"
        >
            <button class="detailLinkBtn" @click="linkroute('/developStatus/developmentEffectEvaluation')">详细</button>
            <button class="detailLinkBtn"  style="right:110px"  @click="downEcharts">下载</button>
            <Echart ref="echartChart" :chart-data="rateOfWaterCutRise" width="100%" height="100%"></Echart>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import { waterContainRaiseChart } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";

//前端细节区分
var tip = {
  tofiexd: 2, //y轴刻度保留2位数小数
  unit: "%", //y轴刻度单位
};
var type = "line_auto_up_down";
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      currentModel: this.$store.state.setting.mode,
        rateOfWaterCutRise: {
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
            // toolbox: {
            //     show: true,
            //     feature: {
            //         saveAsImage: {
            //             name: "含水上升率",
            //             pixelRatio: 15,
            //             //值越大分辨率越高,下载的图片越清晰
            //             backgroundColor: "#022644",
            //         },
            //     },
            // },
                grid: {
                    top: "5%",
                    left: "8%",
                    right: "5%",
                    bottom: "12%",
                    containLabel: true,
                },
                legend: {
                    data: [],
                    bottom: "bottom",
                    textStyle: {
                        color: "#a9a8a8",
                    },
                },
            xAxis: {
                name: "含水率(%)",
                nameLocation: "center",
                nameTextStyle: {
                    color: "#8FA4CC",
                },
                nameGap: 25,
                //min:90,
                type: "value",
                axisLabel: {
                    color: "#8FA4CC",
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    },
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    },
                },
            },
            yAxis: {
                name: "含水上升率(%)",
                nameLocation: "center",
                nameTextStyle: {
                    color: "#a9a8a8",
                    // padding: [0, 0, 0, 0], // 上、右、下、左
                },
                max:100,
                min:0,
                nameGap: 35,
                type: "value",
                axisLabel: {
                    color: "#8FA4CC",
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    },
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    },
                },
            },
            color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
            series: [],
        },

    };
  },
  mounted() {
      this.getWaterContainRaiseChart()
  },
  methods: {
      linkroute(name) {
          this.$router.push({
              path: name,
              query:{ link:'water',page:'/reservoirDisplay/oilexhibition' }
          });
      },
      downEcharts(){
          this.$refs.echartChart.chartDownLoad( '含水上升');
      },
      //含水上升率
      getWaterContainRaiseChart(oilFieldId, fieldId) {
          let request = {
              oilFieldId: '3FC9A818F5BC43B88270DB80BBB3018F',
              fieldId: '3FC9A818F5BC43B88270DB80BBB3018F',
          };
          waterContainRaiseChart(request).then((res) => {
              if (res.data.code == 200) {
                  let legendData = [];
                  let seriesData = [];
                  let lineCharts = res.data.data.chart.lineChartDataSets;
                  lineCharts.forEach((item, index) => {
                      legendData.push(item.label);
                      seriesData.push(this.waterContainRaiseLine(item));
                  });
                  this.rateOfWaterCutRise.yAxis.min = null;
                  this.rateOfWaterCutRise.yAxis.max = null;
                  this.rateOfWaterCutRise.legend.data = legendData;
                  this.rateOfWaterCutRise.series = seriesData;
              }
          });
      },
      waterContainRaiseLine(lineChart) {
          let series = {};
          series.type = "line";
          series.smooth = true;
          series.name = lineChart.label;
          series.symbol = "none";
          if (lineChart.label == "含水上升率") {
              series.type = "scatter";
              series.symbol = "circle";
              series.symbolSize = 8;
          }
          let seriesData = [];
          let lineData = lineChart.numberPoints;
          lineData.forEach((item, index) => {
              let point = [];
              point.push(item.x);
              point.push(item.y);
              seriesData.push(point);
          });
          //seriesData.sort();
          series.data = seriesData;
          return series;
      },

  },
};
</script>
<style lang="scss" scoped>
.detailLinkBtn {
    position: absolute;
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>
