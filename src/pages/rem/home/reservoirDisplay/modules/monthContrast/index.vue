<template>
    <div class="app-container" style="width: 100%; height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="秦皇岛32-6油田月度产量对比图"
          :is-show-max-btn="true"
      >
          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>
          <Echart :chart-data="histogram" style="height: 100%"></Echart>
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
import {monthlyProductionComparison} from "@/api/rem/reservoirbillboards";
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
          top: 30,
          left: '7%',
          right: 10,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月","5月", "6月", "7月", "8月","9月", "10月", "11月", "12月"],
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
            name: "月产油(10⁴m³)",
            nameTextStyle: {
              padding: [0, 0, 30, 0], // 上、右、下、左
            },
              min:0,
              max:100,
            nameLocation: "center",
            axisLabel: {
              color: "#a9a8a8",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#a9a8a8",
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
        monthlyProductionComparison({}).then(res=>{
            //计划
            this.histogram.series[0].data = res.data.data.monthlyActualOutputVoList.map(item=>{
                return item.checkedProdMonthly
            })
            let monthlyPlannedOutputVoArr = []
            for(let key in res.data.data.monthlyPlannedOutputVo){
                monthlyPlannedOutputVoArr.push(res.data.data.monthlyPlannedOutputVo[key])
            }
            //实际
            this.histogram.series[1].data = monthlyPlannedOutputVoArr
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
