<template>
  <div class="app-container" style="height: 100%">
    <div style="display: flex;flex-direction: row; height: 100%;">
      <div style="display: flex;flex-direction: column;  height:100%;margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
        <headerSearch>
          <el-form :model="queryParams" :inline="true" style="margin-top: 18px;text-align: left;">
            <el-form-item label="油田：">
              <el-select v-model="queryParams.oil_field" placeholder="请选择油田" clearable size="small" style="width: 240px">
                <el-option v-for="(item, index) in oil_field_list" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台：">
              <el-select v-model="queryParams.platform" placeholder="请选择平台" clearable size="small" style="width: 240px">
                <el-option v-for="(item, index) in platform_list" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井号：">
              <el-select v-model="queryParams.well_num" placeholder="请选择井号" clearable size="small" style="width: 240px">
                <el-option v-for="(item, index) in well_num_list" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="searchForOilField">查询</el-button>
          </el-form>
        </headerSearch>
        <div style="overflow-y:scroll;overflow-x: hidden;padding-bottom: 1%;">
          <page-panel headerTitle="水平井沿程渗透率分布" :show-btn="true">
            <el-button icon="el-icon-download" type="primary" @click="downEchartdown">下载</el-button>
            <el-row>
              <Echart ref="perm" :chart-data="permShow" height="350px"></Echart>
            </el-row>
          </page-panel>
          <page-panel headerTitle="水平井分舱设计表" style="height:50vh" :show-btn="true">
            <el-row justify="center" style="margin-bottom: 20px">
              <el-col :span="24" style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    ">
                <span style="margin-right: 10px">分舱段数：</span>
                <el-input v-model="sectionCount" placeholder="" style="width: 50px"></el-input>
                <el-button @click="confirmCompartments" type="primary" style="margin-left: 5vw;">确认</el-button>
                <el-button style="float: right" type="primary" icon="el-icon-download" @click="doDownExcel()">下载</el-button>
              </el-col>
            </el-row>
            <el-row justify="center">
              <el-col :span="24" style="display: flex; justify-content: center">
                <el-table id="spjfcsjb" :data="tableData" style="width: 100%" max-height="240px">
                  <el-table-column prop="section" label="分舱段">
                    <template slot-scope="scope">
                      <span class="white-text">{{
                        scope.row.section
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depth" label="测深/m">
                    <template slot-scope="scope">
                      <span class="white-text">{{ scope.row.depth }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="permeabilityCoefficient" label="渗透率变异系数">
                    <template slot-scope="scope">
                      <span class="white-text">{{
                        scope.row.permeabilityCoefficient
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="averagePermeability" label="段平均渗透率/mD">
                    <template slot-scope="scope">
                      <span class="white-text">{{
                        scope.row.averagePermeability
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="averagePorosity" label="段平均孔隙度/%">
                    <template slot-scope="scope">
                      <span class="white-text">{{
                        scope.row.averagePorosity
                      }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </page-panel>
          <page-panel headerTitle="分舱结果显示" style="height: 30vh;" :show-btn="true">
            <el-button icon="el-icon-download" type="primary" @click="downEchart">下载</el-button>
            <el-row justify="center">
              <Echart ref="resEchart" :chart-data="resCabiEchart" height="100px"></Echart>
            </el-row>
          </page-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cabinDiv } from "@/api/horizontalWell/horizontalWell.js";
import Echart from "@/components/tools/Echarts/index.vue";
import {exportExcel} from "@/lib/exportExcel";
export default {
  data() {
    return {
      oil_field_list: [{
        value: '选项1',
        label: '秦皇岛32-6'
      }, {
        value: '选项2',
        label: '秦皇岛32-7'
      }, {
        value: '选项3',
        label: '秦皇岛32-8'
      }],

      platform_list: [{
        value: '选项1',
        label: '平台1'
      }, {
        value: '选项2',
        label: '平台2'
      }, {
        value: '选项3',
        label: '平台3'
      }],

      well_num_list: [{
        value: '选项1',
        label: '井1'
      }, {
        value: '选项2',
        label: '井2'
      }, {
        value: '选项3',
        label: '井3'
      }],

      queryParams: {
        oil_field: '',
        platform: '',
        well_num: '',
      },
      sectionCount: "3",
      permShow: {
        title: {
          text: '渗透率分布',
          left: '45%',
          textStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'normal',
          },
        },
        color: ["#00f2f1", "#ed3f35", "#9f35ff", "#00EC00", "#FFD306", "#FFD306"],
        tooltip: {
          trigger: "axis",
        },

        legend: {
          top: "0%",
          textStyle: {
            color: "#4c9bfd"
          },
          right: "10%"
        },
        xAxis: {
          name: '测深/m',
          nameTextStyle: {
            color: "#4c9bfd",
            padding: [0, 0, 0, 0],
            lineHeight: 30,
          },
          type: "category",
          boundaryGap: false,
          data: [],
          axisTick: {
            show: true
          },
          axisLabel: {
            color: "#4c9bfd"
          },
          axisLine: {
            show: false
          }
        },
        grid: { width: "80%", height: "70%" },
        yAxis: {
          min: function (value) {
            return value.min.toFixed(3);
          },
          name: "渗透率/mD",
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: "#4c9bfd",
            verticalAlign: 'top',
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#4c9bfd"
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#012f4a"
            }
          },
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: [],
          },
        ],
      },
      resCabiEchart: {
        title: {
          text: "测深(m)",
          left: "left",
          bottom: 0,
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          min: 0,
          max: 0,
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: [
          {
            type: 'category'
          }
        ],
        series: [],
      },
      tableData: [],
    };
  },
  components: {
    Echart,
  },
  methods: {
    searchForOilField() {
      let queryParams = {
        well_name: "I18H",
        n: this.sectionCount
      }
      cabinDiv(queryParams).then((res) => {
        this.permShow.series[0].data = res.perm.map(function (item) {
          return item.toFixed(1)
        })
        this.permShow.xAxis.data = res.MD.map(function (item) {
          return item.toFixed(1)
        })
        // console.log('后端传来的值为：', res)
      })
    },
    confirmCompartments() {
      this.tableData = []
      this.resCabiEchart.series = []
      let queryParams = {
        well_name: "I18H",
        n: this.sectionCount
      }
      cabinDiv(queryParams).then((res) => {
        for (let i = 0; i < res.avePermlist.length; i++) {
          let valueCabin = {
            section: "",
            depth: "",
            permeabilityCoefficient: "",
            averagePermeability: "",
            averagePorosity: "",
          }
          valueCabin.section = res.section[i]
          valueCabin.depth = res.horSection[i][0] + '-' + res.horSection[i][1]
          valueCabin.permeabilityCoefficient = res.permCvlist[i]
          valueCabin.averagePermeability = res.avePermlist[i]
          valueCabin.averagePorosity = res.avePorlist[i]
          this.tableData.push(valueCabin)

          let seriesCell = {
            type: 'bar',
            stack: 'Ad',
            data: []
          }
          if (i === 0) {
            seriesCell.data.push(res.horSection[0][1])
          } else {
            seriesCell.data.push(res.horSection[i][1] - res.horSection[i][0])
          }
          this.resCabiEchart.series.push(seriesCell)
        }

        this.resCabiEchart.xAxis.min = res.horSection[0][0]
        this.resCabiEchart.xAxis.max = res.horSection[res.avePermlist.length - 1][1]
        console.log(this.resCabiEchart)

      })
    },
    downEchartdown() {
      this.$refs.perm.chartDownLoad('水平井沿程渗透率分布');
    },
    downEchart() {
      this.$refs.resEchart.chartDownLoad('分舱结果显示');
    },
    doDownExcel() {
      exportExcel("#spjfcsjb", "水平井分舱设计表");
    },
  },
};
</script>
