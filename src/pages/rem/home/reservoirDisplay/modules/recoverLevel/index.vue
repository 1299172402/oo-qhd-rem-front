<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="采出程度与含水率关系图"
        :is-show-max-btn="true"
    >
        <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>
        <Echart :chart-data="relationship" width="100%" height="100%"></Echart>
    </info-window>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import { outputDegree, outputDegreeTongChart } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';

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
        relationship: {
            grid:{
                top: "5%",
                right: "5%",
                bottom:"25%",
                left: "12%",
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                confine: true
            },
            legend: {
                bottom: 0,
                textStyle: {
                    color: '#24DEFF'
                },
                data: [

                ],
                itemGap: 5
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         saveAsImage: {
            //             name: '采出程度与含水率关系',
            //             pixelRatio: 15,
            //             //值越大分辨率越高,下载的图片越清晰
            //             backgroundColor: '#022644'
            //         }
            //     }
            // },
            xAxis: {
                name: '地质储量采出程度(%)',
                nameLocation: 'center',
                nameTextStyle: {
                    color: '#8FA4CC'
                },
                nameGap: 30,
                type: 'value',
                axisLabel: {
                    color: '#8FA4CC'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                }
            },
            yAxis: {
                name: '综合含水率(%)',
                nameLocation: 'center',
                nameTextStyle: {
                    color: '#8FA4CC'
                },
                nameGap: 30,
                type: 'value',
                axisLabel: {
                    color: '#8FA4CC'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                }
            },
            color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
            series: []
        },

    };
  },
  mounted() {
      this.getOutputDegreeTongChart()
  },
  methods: {
      //采出程度与含水率关系图
      getOutputDegreeTongChart(oilFieldId, fieldId) {
          let request = {
              oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
              fieldId: "3FC9A818F5BC43B88270DB80BBB3018F"
          };
          let legendData = [];
          let seriesData = [];
          outputDegree(request).then((res) => {
              if (res.data.code == 200) {
                  let lineChart = res.data.data.chart.lineChartDataSets;
                  lineChart.forEach((item, index) => {
                      legendData.push(item.label);
                      seriesData.push(this.outputDegreeLine(item));
                  });
              } else {
                  legendData = [];
                  seriesData = [];
              }
          });

          outputDegreeTongChart(request).then((res) => {
              if (res.data.code == 200) {
                  let lineChart = res.data.data.chart.lineChartDataSets;
                  lineChart.forEach((item, index) => {
                      legendData.push('Rm=' + item.label);
                      seriesData.push(this.outputDegreeTongChart(item));
                  });
              } else {
                  legendData = [];
                  seriesData = [];
              }
          });
          this.relationship.legend.data = legendData;
          this.relationship.series = seriesData;
      },
      //采出程度童氏图折线解析
      outputDegreeTongChart(lineChart) {
          let series = {};
          series.name = 'Rm=' + lineChart.label;
          series.type = 'line';
          series.symbol = 'none';
          /* series.symbolSize=3;*/
          series.smooth = true;
          let seriesData = [];
          let lineData = lineChart.numberPoints;
          lineData.forEach((item, index) => {
              let point = [];
              point.push(item.x);
              point.push(item.y);
              seriesData.push(point);
          });
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
