<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="采油速度"
        :is-show-max-btn="true"
    >
        <button class="detailLinkBtn" @click="linkroute('/developStatus/developmentEffectEvaluation')">详细</button>
        <button class="detailLinkBtn"  style="right:110px"  @click="downEcharts">下载</button>
        <Echart ref="echartChart" :chart-data="productionSpeed" width="100%" height="100%"></Echart>
    </info-window>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import { outputSpeed, outputDegree, outputDegreeTongChart, injectionProRate, generalPressure, indicatorEveluationResults } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';

export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
        //采油速度
        productionSpeed: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            dataZoom: {
                start: 0,
                type: 'inside'
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         saveAsImage: {
            //             name: '采油速度',
            //             pixelRatio: 15,
            //             //值越大分辨率越高,下载的图片越清晰
            //             backgroundColor: '#698398'
            //         }
            //     }
            // },
            legend: {
                data: [],
                bottom: 0,
                textStyle: {
                    color: ''
                }
            },
            grid:{
                top: "15%",
                right: "15%",
                bottom:"15%",
                left: "15%",
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#698398'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitLine:{
                    show:false,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    }
                }
            },
            color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#FF5844', '#DA835E', '#9A72FF', '#FF30AD', '#2ACAFF'],
            yAxis: [
                {
                    name: '地质储量采油速度(%)',
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#8FA4CC'
                    },
                    max:100,
                    min:0,
                    nameGap: 44,
                    type: 'value',
                    minInterval: 0,
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
                        show: false,
                        lineStyle: {
                            color: 'rgba(143,164,204,.3)'
                        }
                    }
                },
                {
                    name: '可采、剩余可采采油速度(%)',
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#8FA4CC'
                    },
                    max:100,
                    min:0,
                    nameGap: 44,
                    type: 'value',
                    minInterval: 0,
                    axisLabel: {
                        color: '#698398'
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
                        show: false,
                        lineStyle: {
                            color: 'rgba(143,164,204,.3)'
                        }
                    }
                },
            ],
            series: []
        },
    };
  },
  mounted() {
      this.getOutputSpeed()
  },
  methods: {
      linkroute(name) {
          this.$router.push({
              path: name,
              query:{ link:'evaluation',page:'/reservoirDisplay/oilexhibition' }
          });
      },
      //产能类 采油速度
      getOutputSpeed(oilFieldId, fieldId) {
          let request = {
              oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
              fieldId: "3FC9A818F5BC43B88270DB80BBB3018F"
          };
          outputSpeed(request).then((res) => {
              if (res.data.code == 200) {
                  let lineChart = res.data.data.chart.linearDataSets;
                  let legendData = [];
                  let seriesData = [];
                  lineChart.forEach((item, index) => {
                      legendData.push(item.label);
                      seriesData.push(this.outputSpeedLine(item));
                  });
                  this.productionSpeed.yAxis[0].min = null
                  this.productionSpeed.yAxis[0].max = null
                  this.productionSpeed.yAxis[1].min = null
                  this.productionSpeed.yAxis[1].max = null
                  this.productionSpeed.legend.data = legendData;
                  this.productionSpeed.series = seriesData;
              } else {
                  let legendData = [];
                  let seriesData = [];
                  this.productionSpeed.legend.data = legendData;
                  this.productionSpeed.series = seriesData;
              }
          });
      },
      downEcharts(){
          this.$refs.echartChart.chartDownLoad( '采油速度');
      },
      //采出速度 折线解析
      outputSpeedLine(linearChart) {
          let series = {};
          series.type = 'line';
          let seriesName = linearChart.label;
          series.name = seriesName;
          if (seriesName == '实际年采油速度') {
              series.yAxisIndex = 0;
          } else if (seriesName == '可采储量采油速度' || seriesName == '剩余可采储量采油速度') {
              series.yAxisIndex = 1;
          }
          let linearData = linearChart.linearData;
          let seriesData = [];
          linearData.forEach((item, index) => {
              let point = [];
              let label = item.label.split('-');
              point.push(label[0] + '-' + label[1]);
              point.push(item.value);
              seriesData.push(point);
          });
          series.data = seriesData;
          series.symbol = 'none';
          return series;
      },
     
  },
    computed: {
        getGlobeTheme(val) {
            return this.$store.state.setting.mode;
        },
    },
    watch: {
        getGlobeTheme: {
            handler(Nval) {
                if (Nval == "dark") {
                    this.productionSpeed.legend.textStyle.color = "#fff";
                } else {
                    this.productionSpeed.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
            immediate:true
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
