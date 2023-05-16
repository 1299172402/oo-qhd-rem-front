<template>
  <div class="app-container" style="height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="产能波动"
          :is-show-max-btn="true"
      >
          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>
          <Echart :chart-data="histogram" height="100%"></Echart>
      </info-window>
  </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {getYieldFluctuation} from "@/api/rem/reservoirbillboards.js"
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import { LineChart } from "echarts/charts";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      histogram: {
        textStyle: {
          fontSize: 10,
        },
          tooltip: {
              trigger: "axis",
              axisPointer: {
                  type: "shadow",
              },
          },
        xAxis: {
          nameTextStyle: {
            color: "#a9a8a8",
            padding: [0, 0, -10, 0],
            fontSize: 14,
          },
          axisLabel: {
            color: "#a9a8a8",
            fontWeight: 400,
            fontSize: 16,
          },
          axisTick: {
            lineStyle: {
              color: "#a9a8a8",
              width: 1,
            },
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#a9a8a8",
              width: 1,
              type: "dashed",
            },
            show: true,
          },
          data: [],
          type: "category",
        },
        yAxis: {
          name: "变化量(口)",
          type: "value",
          nameLocation: "center",
          nameTextStyle: {
            color: "#a9a8a8",
            padding: [0, 0, 30, 0],
            fontSize: 16,
          },
          axisLabel: {
            margin: 20,
            color: "#a9a8a8",
            fontSize: 16,
          },
          axisTick: {
            lineStyle: {
               color: "#a9a8a8",
              width: 1,
            },
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "line",
            },
            show: false,
          },
        },
        series: [
          {
            data: [],
            type: "bar",
            barMaxWidth: "auto",
            barWidth: 28,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(0,243,199)",
                  },
                  {
                    offset: 1,
                     color: "rgb(7,121,64)",
                  },
                ],
              },
            },
            // label: {
            //   show: true,
            //   position: "top",
            //   distance: 10,
            //   color: "#fff",
            //   position: [30, 10],
            // },
          },
        ],
      },
    };
  },
  mounted() {
      this.getinfo()
  },
  methods: {
      getinfo(){
          let params = {
              date:'2022-10-11',
              dateComp:'2022-10-12',
              ogfId:'3FC9A818F5BC43B88270DB80BBB3018F'
          }
          getYieldFluctuation(params).then((res)=>{
              res.data.data.data.ydata.forEach((item) => {
                  this.histogram.xAxis.data.push(item)
              });
              res.data.data.data.xdata.forEach((item) => {
                  this.histogram.series[0].data.push(item)
              });
          })
      }
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
