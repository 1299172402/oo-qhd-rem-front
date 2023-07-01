<template>
  <div class="app-container" style="height: 100%">
      <info-window
          info-width="100%"
          info-height="100%"
          header-title="分层注入量"
          :is-show-max-btn="true"
      >
          <button class="detailLinkBtn" @click="linkroute('/intelligence1/index')">详细</button>
          <Echart :chart-data="option" width="100%" height="100%"></Echart>
      </info-window>
  </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { LineChart } from "echarts/charts";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
import {
    getStratifiedInjectionDetails,
} from "@/api/rem/r-intelligentIPA.js";
export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
        option : {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                textStyle: {
                    color: "#66ffff"
                },
                bottom: "bottom",
            },
            grid: {
                left: '10%',
                right: '10%',
                top: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 1],
                axisLabel: {
                    color: '#a9a8a8'
                },
            },
            yAxis: {
                type: 'category',
                data: '',
                axisLabel: {
                    color: '#a9a8a8'
                }
            },
            series: [
                {
                    name: '月注水量(10⁴m³)',
                    type: 'bar',
                    color: 'rgb(9,141,234)',
                    data: '',
                },
                {
                    name: '月配注量(10⁴m³)',
                    type: 'bar',
                    color: 'rgb(4,182,131)',
                    data: ''
                },
                {
                    name: '月产液量(10⁴m³)',
                    type: 'bar',
                    color: 'rgb(255,156,70)',
                    data: ''
                }
            ]
        }
        
    };
  },
  mounted() {
      this.queryStratifiedInjectionDetails()
  },
  methods: {
      linkroute(rname) {
          this.$router.push({path: rname,query: {link:'remHome'}});
      },
      //分层注采量
      queryStratifiedInjectionDetails() {
          let params = {
              blockId: 'YCFXDY8B643EDC9007F96F570600457D',
              // startTime: new Date().format('YYYY-MM'),
              startTime: '2023-05',
              timeStatus: '1',
              type: 1
          }
          getStratifiedInjectionDetails(params).then((res) => {
              let productionIntervalNo=[],inj=[],injAlloc=[],fluidProd=[]
              res.forEach((item) => {
                  if(item.productionIntervalNo){
                      productionIntervalNo.push(String(item.productionIntervalNo))
                      inj.push(Number(item.inj).toFixed(2))
                      injAlloc.push(Number(item.injAlloc).toFixed(2))
                      fluidProd.push(Number(item.fluidProd).toFixed(2))
                  }
              })
              this.option.yAxis.data = productionIntervalNo
              this.option.series[0].data = inj
              this.option.series[1].data = injAlloc
              this.option.series[2].data = fluidProd
          })
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
