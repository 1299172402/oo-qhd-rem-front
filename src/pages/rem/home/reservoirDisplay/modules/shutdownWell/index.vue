<template>
  <div class="app-container" style="height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="关停井统计"
          :is-show-max-btn="true"
      >
          <el-button class="buttonActive_primary detailLinkBtn"  type="primary" @click="linkroute('ShutdownDetection')">详情</el-button>
          <el-button class="buttonActive_primary detailLinkBtn"  type="primary"  style="right:110px"  @click="downEcharts">下载</el-button>
          <Echart ref="echartChart" :chart-data="histogram" width="100%" height="100%"></Echart>
      </info-window>
  </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import { LineChart } from "echarts/charts";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import {queryShutDownWellStatisCharts} from "@/api/rem/reservoirbillboards";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      histogram: {
        grid: {
          top: "10%",
          left: "5%",
          right: "6%",
          bottom: "8%",
          containLabel: true,
        },
          dataZoom: {
              start: 0,
              type: "inside",
          },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
          formatter(params) {
            var data = "";
            for (var i = 0; i < params.length; i++) {
              if (params[i].seriesName == "关停井数") {
                data += params[i].seriesName + ":  " + params[i].value + "口";
              } else {
                data += params[i].seriesName + ":  " + params[i].value + "<br/>";
              }
            }
            return data;
          },
        },
        legend: {
          data: ["关停影响产量", "关停井数"],
          bottom: "bottom",
          textStyle: {
            color: "#a9a8a8",
          },
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(143,164,204,.5)'
            }
          },
            axisTick: {
                show:true,
                inside: true
            },
          axisLabel: {
            show: true,
              showMinLabel: true,
              showMaxLabel: true,
            textStyle: {
              color: "#a9a8a8", //X轴文字颜色
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "关停影响产量(m³)",
            nameTextStyle: {
              color: "#a9a8a8",
            },
            splitLine: {
              show: false,
              lineStyle: {
                  color: "#a9a8a8",
              },
            },
              axisTick: {
                  show:true,
                  inside: true
              },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(143,164,204,.5)'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a9a8a8",
              },
            },
          },
          {
            type: "value",
            name: "关停井数(口)",
            nameTextStyle: {
              color: "#a9a8a8",
            },
            splitLine: {
              show: false,
            },
              axisTick: {
                  show:true,
                  inside: true
              },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(143,164,204,.5)'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a9a8a8",
              },
            },
          },
          {
            type: "value",
            gridIndex: 0,
            splitNumber: 8,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
              },
            },
          },
        ],
        series: [
          {
            name: "关停影响产量",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                          offset: 0,
                          color: "rgb(250,198,87)",
                      },
                      {
                          offset: 1,
                          color: "rgb(255,111,53)",
                      },
                  ]),
              },
            },
            data: [],
          },
          {
            name: "关停井数",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 4, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                borderWidth: "2",
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(36,222,255)",
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
    };
  },
  mounted() {
      let data = {
          // endTime:'2022-12-01',
          // startTime:'2020-12-01'
          ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'
      }
      queryShutDownWellStatisCharts(data).then((res)=>{
          // this.histogram.yAxis[0].min = null
          // this.histogram.yAxis[0].max = null
          // this.histogram.yAxis[1].min = null
          // this.histogram.yAxis[1].max = Number(res.data.data.data.wellNum.sort((a, b) => b.lastedSort - a.lastedSort)[0]) * 1.2
          const now = new Date(); // 获取当前时间
          const currentMonth = now.getMonth() + 1; // 获取当前月份
          const months = []; // 定义存放月份的数组
          for (let i = 1; i <= currentMonth; i++) {
              let m = `${i}`;
              if (m.length < 2) {
                  m = '0' + m;
              }
              let monthString = now.getFullYear() + '-' + m;
              months.push(monthString);
          }
          this.histogram.xAxis.data = months
          res.data.data.data.clyx.forEach((n)=>{
              this.histogram.series[0].data.push(n)
          })
          res.data.data.data.wellNum.forEach((n)=>{
              this.histogram.series[1].data.push(n)
          })
      })
  },
  methods: {
      linkroute(rname) {
          this.$router.push({name: rname});
      },
      downEcharts(){
          this.$refs.echartChart.chartDownLoad( '关停井统计');
      },
  },
  computed: {
    getGlobeTheme(val) {
      return this.$store.state.setting.mode;
    },
  },
  watch: {
    getGlobeTheme: {
      immediate: true,
      handler(Nval) {
        if (Nval == "dark") {
          this.histogram.legend.textStyle.color = "#ffffff";
        } else {
          this.histogram.legend.textStyle.color = "#000000";
        }
      },
      deep: true,
        
    },
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

.detailLinkBtn {
position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 20px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>
