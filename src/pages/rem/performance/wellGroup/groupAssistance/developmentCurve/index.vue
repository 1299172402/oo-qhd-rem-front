<template>
  <div>
    <div style="line-height: 24px; text-align: center; font-size: 20px; font-weight: 400; color: #02eeff">
      秦皇岛32-6油田年度计划运行曲线
    </div>
    <div style="height: 600px; padding-top: 20px">
      <chartsComponents
        :chart-data-options="dataOptionLine"
        echartsType="line1"
        style="width: 100%; height: 100%"
      ></chartsComponents>
    </div>
  </div>
</template>

<script>
import chartsComponents from '@/components/intelligentOilfield/echarts-com/index.vue';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
  components: {
    chartsComponents,
  },
  data() {
    return {
      dataOptionLine: {
        // 你的代码
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          x: '36%',
          top: '5%',
          textStyle: {
            color: 'gray',
            fontSize: 12,
          },
          data: ['考核日产', '计划年累产', '实际日产', '实际年累产', '剩余水平', '滚动预测'],
        },
        grid: {
          top: '25%',
          left: '12%',
          right: '3%',
          bottom: '10%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: false,
              color: '#A582EA',
            },

            axisLabel: {
              color: 'gray',
              width: 100,
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: [
              '0',
              '2022-01-01',
              '2022-02-01',
              '2022-03-01',
              '2022-04-01',
              '2022-05-01',
              '2022-06-01',
              '2022-07-01',
              '2022-08-01',
              '2022-09-01',
              '2022-10-01',
              '2022-11-01',
              '2022-12-01',
            ], // this.$moment(data.times).format("HH-mm") ,
          },
        ],

        yAxis: [
          {
            name: '日产m³/d',
            nameTextStyle: {
              color: 'gray',
              fontSize: 12,
            },
            type: 'value',
            min: 0,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'gray',
                opacity: 0.23,
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: 'gray',
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            name: '年产10⁴m³',
            nameTextStyle: {
              color: 'gray',
              fontSize: 12,
            },
            type: 'value',
            min: 0,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'gray',
                opacity: 0.23,
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: 'gray',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '考核日产',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: '#2CABE3',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#2CABE3',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: '#2CABE3',
              borderColor: '',
              borderWidth: 0,
            },

            data: [7840.08, 8436.97, 7142.37, 6135.04, 3159.28, 5157.08, 2466.14, 6149.27, 4186.26, 7845, 4596, 6170.3], // data.values
          },
          {
            name: '计划年累产',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'orange',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'orange',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: 'orange',
              borderColor: 'orange',
              borderWidth: 0,
            },

            data: [
              280.08, 1116.97, 1132.37, 4115.04, 2129.28, 5147.08, 2126.14, 3119.27, 5186.26, 2186.26, 4520, 1720.3, 1111.31, 5234.86, 1519.06,
            ], // data.values
          },
          {
            name: '实际日产',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'yellow',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'yellow',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: 'yellow',
              borderColor: 'yellow',
              borderWidth: 0,
            },

            data: [
              6126.08, 4124.97, 12332.37, 2125.04, 2229.28, 1417.08, 2216.14, 1219.27, 1436.26, 1122, 2235, 1220.3, 1341.31, 1224.86,
              1129.06,
            ], // data.values
          },
          {
            name: '实际年累产',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'green',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'green',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: 'green',
              borderColor: 'green',
              borderWidth: 0,
            },

            data: [
              1830.08, 1116.97, 2332.37, 1245.04, 2219.28, 4237.08, 2126.14, 1129.27, 1186.26, 1212, 4512, 7230.3, 7121.31, 1154.86, 1219.06,
            ], // data.values
          },
          {
            name: '剩余水平',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'pink',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'pink',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: 'pink',
              borderColor: 'pink',
              borderWidth: 0,
            },

            data: [
              1810.08, 1116.97, 1322.37, 1455.04, 4129.28, 3147.08, 3126.14, 3119.27, 2186.26, 4112, 2145, 3170.3, 2171.31, 3154.86,
              4319.06,
            ], // data.values
          },
          {
            name: '滚动预测',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'red',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: 'red',
              borderColor: 'red',
              borderWidth: 0,
            },

            data: [
              1180.08, 2236.97, 1122.37, 4215.04, 2119.28, 1127.08, 2261.14, 1129.27, 1816.26, 1212, 4125, 1370.3, 1221.31, 1234.86,
              1139.06,
            ], // data.values
          },
        ],
      },
    };
  },
};
</script>

<style></style>
