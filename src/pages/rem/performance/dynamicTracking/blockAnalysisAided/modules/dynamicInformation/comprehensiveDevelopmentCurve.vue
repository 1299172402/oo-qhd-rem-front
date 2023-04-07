<!--综合开发曲线-->
<template>
  <div class="gradientBoxLeft">
      <template slot="header">
        <div style="float: right; line-height: 30px; padding-right: 20px">
          <el-button size="mini" @click="dialogVisible = true">选择指标信息</el-button>
        </div>
      </template>
      <Echart ref="echartDown" :chart-data="option" style="height: 600px"></Echart>
    <el-dialog
        title="选择查看指标信息"
        :visible.sync="dialogVisible"
        width="15%"
    >
      <el-checkbox-group v-model="selectIndexList" style="display: flex;flex-direction: column">
        <el-checkbox v-for="(item,index) in indexList" :key="index"  :label="item.label" :value="item.value" style="margin-left: 10px;"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeIndex">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {dynamicDataComprehensiveDevelopmentCurve} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import * as echarts from "echarts";
import FileSaver from 'file-saver';
export default {
  components: {
    Echart
  },
  props: {
    oilFieldId: {},
    blockId: {}
  },
  data() {
    return {
      radio: 1,
      option: {
        grid: [
          {x: '160', y: '1%', width: '88%', height: '7%'},
          {x: '160', y: '10%', width: '88%', height: '8%'},
          {x: '160', y: '20%', width: '88%', height: '8%'},
          {x: '160', y: '30%', width: '88%', height: '8%'},
          {x: '160', y: '40%', width: '88%', height: '8%'},
          {x: '160', y: '50%', width: '88%', height: '8%'},
          {x: '160', y: '60%', width: '88%', height: '8%'},
          {x: '160', y: '70%', width: '88%', height: '8%'},
          {x: '160', y: '80%', width: '88%', height: '8%'},
          {x: '160', y: '90%', width: '88%', height: '7%'},
        ],
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: [{
          show: false,
          gridIndex: 0,
          type: 'category',
          data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
          axisLabel: {
            show: false,
            color: '#FFFFF'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#FFFFFF',
            }
          }
        }, {
          show: false,
          gridIndex: 1,
          data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
          type: 'category',
          axisLabel: {
            show: false,
            color: '#8FA4CC'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.16)',
            }
          }
        }, {
          show: false,
          gridIndex: 2,
          data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
          axisLabel: {
            show: false,
            color: '#8FA4CC'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.16)',
            }
          }
        }, {
          show: false,
          gridIndex: 3,
          data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
          axisLabel: {
            show: false,
            color: '#8FA4CC'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.16)',
            }
          }
        }, {
          gridIndex: 4,
          data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
          axisLabel: {
            show: false,
            color: '#8FA4CC'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.16)',
            }
          }
        },
          {
            gridIndex: 5,
            data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
              , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
            axisLabel: {
              show: false,
              color: '#8FA4CC'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {
            gridIndex: 6,
            data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
              , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
            axisLabel: {
              show: false,
              color: '#8FA4CC'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {
            gridIndex: 7,
            data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
              , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
            axisLabel: {
              show: false,
              color: '#8FA4CC'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {
            gridIndex: 8,
            data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
              , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
            axisLabel: {
              show: false,
              color: '#8FA4CC'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {
            gridIndex: 9,
            data: [/*"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
              , "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"*/],
            axisLabel: {
              color: '#FFFFFF'
            },
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF',
              }
            }
          },
        ],
        yAxis: [
          {name: '油井总井数/(口)\n\n油井开井数/(口)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 0,
            /*min: '250',
            max: '350',
            interval: '100',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            minorTick: {
              splitNumber: '1',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {name: '水井总井数/(口)\n\n水井开井数/(口)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 1,
            /*min: '50',
            max: '150',
            interval: '100',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {name: '油田日产液/(m³/d)\n\n油田日产油/(m³/d)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 2,
            /*min: '50',
            max: '5050',
            interval: '5000',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          {name: '平均单井日产液/(m³/d)\n\n平均单井日产油/(m³/d)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 3,
            /*min: '0',
            max: '50',
            interval: '50',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          { name: '含水率/（%）',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 4,
            /*min: '0',
            max: '50',
            interval: '50',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          { name: '气油比',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 5,
           /* min: '0',
            max: '0.2',
            interval: '0.2',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          { name: '油田平均日注水/(m³/d)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 6,
            /*min: '0',
            max: '5000',
            interval: '5000',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          { name: '地层压降/(MPa)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 7,
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            /*min: '0',
            max: '2',
            interval: '2',*/
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          { name: '月注采比',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 8,
            /*min: '0',
            max: '2',
            interval: '2',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
          { name: '年产油/(10⁴m³)',
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            gridIndex: 9,
            /*min: '0',
            max: '2000',
            interval: '2000',*/
            scale: true,
            interval: 100000000,
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              showMinLabel: true,
              showMaxLabel: true,
            },
            axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.16)',
              }
            }
          },
        ],
        series: [{
          type: 'line',
          name: '油井总井数/（口）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              borderColor: 'rgba(241, 86, 47, 1)',
            }
          },
          data: [/*270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270*/],
        }, {
          type: 'line',
          name: '油井开井数/（口）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              borderColor: 'rgba(58, 74, 194, 1)'
            }
          },
          data: [/*300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300*/],
        }, {
          type: 'line',
          name: '水井总井数/（口）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              borderColor: 'rgba(47, 241, 176, 1)'
            }
          },
          data: [/*100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100*/],
        }, {
          type: 'line',
          name: '水井开井数/（口）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              borderColor: 'rgba(209, 241, 47, 1)'
            }
          },
          data: [/*90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90*/],
        }, {
          type: 'line',
          name: '油田日产液/（m³/d）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 2,
          yAxisIndex: 2,
          itemStyle: {
            normal: {
              borderColor: 'rgba(241, 186, 47, 1)'
            }
          },
          data: [/*2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500*/],
        }, {
          type: 'line',
          name: '油田日产油/（m³/d）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 2,
          yAxisIndex: 2,
          itemStyle: {
            normal: {
              borderColor: 'rgba(47, 235, 241, 1)'
            }
          },
          data: [/*2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000*/],
        }, {
          type: 'line',
          name: '平均单井日产液/（m³/d）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 3,
          yAxisIndex: 3,
          itemStyle: {
            normal: {
              borderColor: 'rgba(47, 89, 241, 1)'
            }
          },
          data: [/*30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30*/],
        }, {
          type: 'line',
          name: '平均单井日产油/（m³/d）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 3,
          yAxisIndex: 3,
          itemStyle: {
            normal: {
              borderColor: 'rgba(241, 47, 238, 1)'
            }
          },
          data: [/*20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20*/],
        }, {
          type: 'line',
          name: '含水率/（%）',
          /*symbol: "circle",
          symbolSize: 4,*/
          symbol: 'none',
          xAxisIndex: 4,
          yAxisIndex: 4,
          itemStyle: {
            normal: {
              borderColor: 'rgba(241, 47, 105, 1)'
            }
          },
          data: [/*20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20*/],
        },
          {
            type: 'line',
            name: '气油比',
           /* symbol: "circle",
            symbolSize: 4,*/
            symbol: 'none',
            xAxisIndex: 5,
            yAxisIndex: 5,
            itemStyle: {
              normal: {
                borderColor: 'rgba(47, 241, 115, 1)'
              }
            },
            data: [/*0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08*/],
          }, {
            type: 'line',
            name: '油田平均日注水/（m³/d）',
            /*symbol: "circle",
            symbolSize: 4,*/
            symbol: 'none',
            xAxisIndex: 6,
            yAxisIndex: 6,
            itemStyle: {
              normal: {
                borderColor: 'rgba(35, 108, 39, 1)'
              }
            },
            data: [/*2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000*/],
          }, {
            type: 'line',
            name: '地层压降/MPa',
            /*symbol: "circle",
            symbolSize: 4,*/
            symbol: 'none',
            xAxisIndex: 7,
            yAxisIndex: 7,
            itemStyle: {
              normal: {
                borderColor: 'rgba(138, 238, 50, 1)'
              }
            },
            data: [/*0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8*/],
          }, {
            type: 'line',
            name: '月注采比',
            /*symbol: "circle",
            symbolSize: 4,*/
            symbol: 'none',
            xAxisIndex: 8,
            yAxisIndex: 8,
            itemStyle: {
              normal: {
                borderColor: 'rgba(53, 120, 2, 1)'
              }
            },
            data: [/*0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8*/],
          }, {
            type: 'bar',
            name: '年产油/（10⁴m³）',
            barWidth: 22,
            /*symbol: "circle",
            symbolSize: 4,*/
            xAxisIndex: 9,
            yAxisIndex: 9,
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
            data: [/*900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900*/],
          },
        ]
      },
      //选中指标列表
      selectIndexList:[],
      //指标数据
      indexList:[
        {
          value:0,
          label:'油井数量',
        },
        {
          value:1,
          label:'水井数量',
        },
        {
          value:2,
          label:'油田日产',
        },
        {
          value:3,
          label:'平均单井日产'
        },
        {
          value:4,
          label:'含水率',
        },
        {
          value:5,
          label:'气油比',
        },
        {
          value:6,
          label:'平均日注水',
        },
        {
          value:7,
          label:'地层压降',
        },
        {
          value:8,
          label:'月注采比',
        },
        {
          value:9,
          label:'年产油',
        }
      ],
      //指标参数选择
      dialogVisible:false,
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch() {
      this.$emit('childPara', '');
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       */
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      }
      dynamicDataComprehensiveDevelopmentCurve(request).then((res) => {
        if (res.data.code == 0) {
          //油井总井数和油井开井数
          let proWellCountChart = res.data.data.proWellCountChart;
          if (proWellCountChart!=null){
            this.getProWellCountChart(proWellCountChart);
          }
          //水井总井数和水井开井数
          let injWellCountChart = res.data.data.injWellCountChart;
          if (injWellCountChart!=null){
            this.getInjWellCountChart(injWellCountChart);
          }
          //单元日产液和单元日产油
          let proUnitLiquidAndOilChart = res.data.data.proUnitLiquidAndOilChart;
          if (proUnitLiquidAndOilChart!=null){
            this.getProUnitLiquidAndOilChart(proUnitLiquidAndOilChart);
          }
          //平均单井日产液和平均单井日产油
          let singleProUnitLiquidAndOilChart = res.data.data.singleProUnitLiquidAndOilChart;
          if (singleProUnitLiquidAndOilChart!=null){
            this.getSingleProUnitLiquidAndOilChart(singleProUnitLiquidAndOilChart);
          }
          //含水率
          let waterCutChart = res.data.data.waterCutChart;
          if (waterCutChart!=null){
            this.getWaterCutChart(waterCutChart);
          }
          //气油比
          let gasOilRateChart = res.data.data.gasOilRateChart;
          if (gasOilRateChart!=null){
            this.getGasOilRateChart(gasOilRateChart);
          }
          //日注水
          let injectionDailyChart = res.data.data.injectionDailyChart;
          if (injectionDailyChart!=null){
            this.getInjectionDailyChart(injectionDailyChart);
          }
          //地层压降
          let layerPressureChart = res.data.data.layerPressureChart;
          if (layerPressureChart!=null){
            this.getLayerPressureChart(layerPressureChart);
          }
          //月注采比
          let proInjectMonthChart = res.data.data.proInjectMonthChart;
          if (proInjectMonthChart!=null){
            this.getProInjectMonthChart(proInjectMonthChart);
          }
          //年产油
          let oilYearChart = res.data.data.oilYearChart;
          if (oilYearChart!=null){
            this.getOilYearChart(oilYearChart);
          }

        }
      });
    },
    /**
     *  hwh
     *  油井总井数和油井开井数
     * @param chart
     */
    getProWellCountChart(chart) {
      let xData = [];
      let seriesDataAll = [];
      let seriesDataOpen = [];
      let linearSet = chart.linearDataSets;
      let linearDataAll = linearSet[0].linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      let linearDataOpen = linearSet[1].linearData;
      linearDataOpen.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataOpen.push(point);
      });
      xData = Array.from(xSet).sort();
      this.option.xAxis[0].data = xData;
      this.option.series[0].data = seriesDataAll;
      this.option.series[1].data = seriesDataOpen;
    },
    /**
     * hwh
     * 水井总井数和水井开井数
     * @param chart
     */
    getInjWellCountChart(chart) {
      let xData = [];
      let seriesDataAll = [];
      let seriesDataOpen = [];
      let linearSet = chart.linearDataSets;
      let linearDataAll = linearSet[0].linearData;
      let xSet = new Set();
      linearDataAll.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataAll.push(point);
      });
      let linearDataOpen = linearSet[1].linearData;
      linearDataOpen.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataOpen.push(point);
      });
      xData=Array.from(xSet).sort();
      this.option.xAxis[1].data=xData;
      this.option.series[2].data=seriesDataAll;
      this.option.series[3].data=seriesDataOpen;
    },
    /**
     * hwh
     * 单元日产液和单元日产油
     * @param chart
     */
    getProUnitLiquidAndOilChart(chart){
      let xData = [];
      let seriesDataLiq = [];
      let seriesDataOil = [];
      let linearSet = chart.linearDataSets;
      let linearDataLiq = linearSet[0].linearData;
      let xSet = new Set();
      linearDataLiq.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataLiq.push(point);
      });
      let linearDataOil = linearSet[1].linearData;
      linearDataOil.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataOil.push(point);
      });
      xData=Array.from(xSet).sort();
      this.option.xAxis[2].data=xData;
      this.option.series[4].data=seriesDataLiq;
      this.option.series[5].data=seriesDataOil;
    },
    /**
     * hwh
     * 平均单井日产液和平均单井日产油
     * @param chart
     */
    getSingleProUnitLiquidAndOilChart(chart){
      let xData = [];
      let seriesDataLiq = [];
      let seriesDataOil = [];
      let linearSet = chart.linearDataSets;
      let linearDataLiq = linearSet[0].linearData;
      let xSet = new Set();
      linearDataLiq.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataLiq.push(point);
      });
      let linearDataOil = linearSet[1].linearData;
      linearDataOil.forEach((item, index) => {
        let point = [];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        xSet.add(label[0]+'-'+label[1]);
        point.push(item.value);
        seriesDataOil.push(point);
      });
      xData=Array.from(xSet).sort();
      this.option.xAxis[3].data=xData;
      this.option.series[6].data=seriesDataLiq;
      this.option.series[7].data=seriesDataOil;
    },
    /**
     * hwh
     * 含水率
     * @param chart
     */
    getWaterCutChart(chart){
      let xData = [];
      let seriesData=[];
      let linearData = chart.linearDataSets[0].linearData;
      linearData.forEach((item,index)=>{
        let point=[];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        point.push(item.value);
        xData.push(label[0]+'-'+label[1]);
        seriesData.push(point);
      });
      this.option.xAxis[4].data=xData;
      this.option.series[8].data=seriesData;
    },
    /**
     * hwh
     * 气油比
     * @param chart
     */
    getGasOilRateChart(chart){
      let xData = [];
      let seriesData=[];
      let linearData = chart.linearDataSets[0].linearData;
      linearData.forEach((item,index)=>{
        let point=[];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        point.push(item.value);
        xData.push(label[0]+'-'+label[1]);
        seriesData.push(point);
      });
      this.option.xAxis[5].data=xData;
      this.option.series[9].data=seriesData;
    },
    /**
     * hwh
     * 日注水
     * @param chart
     */
    getInjectionDailyChart(chart){
      let xData = [];
      let seriesData=[];
      let linearData = chart.linearDataSets[0].linearData;
      linearData.forEach((item,index)=>{
        let point=[];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        point.push(item.value);
        xData.push(label[0]+'-'+label[1]);
        seriesData.push(point);
      });
      this.option.xAxis[6].data=xData;
      this.option.series[10].data=seriesData;
    },
    /**
     * hwh
     * 地层压降
     * @param chart
     */
    getLayerPressureChart(chart){
      let xData = [];
      let seriesData=[];
      let linearData = chart.linearDataSets[0].linearData;
      linearData.forEach((item,index)=>{
        let point=[];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        point.push(item.value);
        xData.push(label[0]+'-'+label[1]);
        seriesData.push(point);
      });
      this.option.xAxis[7].data=xData;
      this.option.series[11].data=seriesData;
    },
    /**
     * hwh
     * 月注采比
     * @param chart
     */
    getProInjectMonthChart(chart){
      let xData = [];
      let seriesData=[];
      let linearData = chart.linearDataSets[0].linearData;
      linearData.forEach((item,index)=>{
        let point=[];
        let label = item.label.split('-');
        point.push(label[0]+'-'+label[1]);
        point.push(item.value);
        xData.push(label[0]+'-'+label[1]);
        seriesData.push(point);
      });
      this.option.xAxis[8].data=xData;
      this.option.series[12].data=seriesData;
    },
    /**
     * hwh
     * 年产油
     * @param chart
     */
    getOilYearChart(chart){
      let xData = [];
      let seriesData=[];
      let linearData = chart.linearDataSets[0].linearData;
      linearData.forEach((item,index)=>{
        let point=[];
        let label = item.label.split('-');
        point.push(label[0]);
        point.push(item.value);
        xData.push(label[0]);
        seriesData.push(point);
      });
      this.option.xAxis[9].data=xData;
      this.option.series[13].data=seriesData;
    },
    /**
     * hwh
     * 下载echarts
     */
    doDownLoad(){
      let  res = this.$refs['echartDown'].chart.getDataURL(
          {
            type: 'png',
            pixelRatio: 14,
            backgroundColor: '#022644'
          }
      )
      let fileName = '综合开发曲线';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      FileSaver.saveAs(res,fileName);
    },
    /**
     * hwh
     * 根据查看的指标来生成grid 来改变 显示图内容
     */
    changeIndex(){
      //grid 结果
      let grid = [];
      let iList = this.selectIndexList;
      let height = 0;
      let yValue = 1;
      let num = iList.length;
      if(num){
        let hInterval = parseInt( Math.floor(100/num));
        let xhY = 1;
        let xhHeight = hInterval-4;
        let yInterval = hInterval;
        let max = 0;
        //做了一个布局隐藏效果
        this.indexList.forEach((item,index)=>{
          let gridDetail = {x: '160', y: '-10%', width: '88%', height: '2%'};

          if(iList.includes(item.label)){
            gridDetail.y = xhY+"%";
            gridDetail.height = xhHeight+"%";
            xhY = xhY + yInterval;
            if(max < item.value){
              max = item.value;
            }
          }
          grid.push(gridDetail);
          this.option.xAxis[index].axisLine.lineStyle={
            color: 'rgba(255,255,255,.16)',
          };
          this.option.xAxis[index].axisLabel.show=false;
          this.option.xAxis[index].axisLabel.color='#fff';
        })
        this.option.xAxis[max].axisLine.lineStyle= {
          color: '#fff',
        };
        this.option.xAxis[max].axisLabel.show=true;
      }
      else{
        this.indexList.forEach((item,index)=>{
          let gridDetail = {x: '160', y: '-10%', width: '88%', height: '2%'};
          grid.push(gridDetail);
        })
      }
      this.option.grid = grid;
      this.dialogVisible = false;
    },

  },


}
</script>