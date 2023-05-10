<template>
  <div class="app-container" style="height: 100%">
    <Echart :chart-data="histogram" style="height: 100%"></Echart>
  </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
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
        tooltip: {
          show: true,
        },
        legend: {
          bottom: "bottom",
          padding: [5, 100],
          icon: "rect",
          itemWidth: 12,
          itemHeight: 10,
          itemGap: 40,
          data: ["月度计划产量", "月度实际产量"],
          textStyle: {
            color: "#a9a8a8",
            fontSize: 14,
          },
        },
        grid: {
          top: 10,
          left: 60,
          right: 10,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月"],
            axisLabel: {
              color: "#a9a8a8",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            label: {
              interval: 0,
              rotate: 40,
            },
            axisLine: {
              lineStyle: {
                //color: '#979797'
                color: "#a9a8a8",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "月产油(m⁴m³)",
            nameTextStyle: {
              padding: [0, 0, 20, 0], // 上、右、下、左
            },
            nameLocation: "center",
            axisLabel: {
              color: "#a9a8a8",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#a9a8a8",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        series: [
          {
            name: "月度计划产量",
            type: "bar",
            barWidth: "12",
            data: [4, 3, 5, 4],
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
            /*showBackground: true,
          backgroundStyle: {
            color: 'rgba(143,164,204,0.2)',
          },*/
          },
          {
            name: "月度实际产量",
            type: "bar",
            barWidth: "12",
            data: [4, 3, 4, 5],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#F5BE43",
                },
                {
                  offset: 1,
                  color: "#FF7135",
                },
              ]),
            },
            /*showBackground: true,
          backgroundStyle: {
            color: 'rgba(143,164,204,0.2)',
          },*/
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
//       this.histogram.timeTicket = setInterval(function() {
//    axisData =  ["1月", "2月", "3月", "4月"],data_series = [123, 224, 523, 222, 341, 231, 112];
//     var data0 = option.series[0].data;
//     var p2 = data0.shift();
//     data0.push(p2);
//     var kl =  this.histogram.xAxis[0].data.shift();
//      this.histogram.xAxis[0].data.push(kl);
//     myChart.setOption( this.histogram);
// }, 3000);
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
</style>
