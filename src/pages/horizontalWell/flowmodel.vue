<template>
  <div class="app-container" style="height: 100%">
    <div style="display: flex;flex-direction: row; height: 100%;">
      <div style="display: flex;flex-direction: column;  height:100%;margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
        <headerSearch>
          <el-form :inline="true" style="margin-top: 18px;text-align: left;">
            <el-form-item label="油田：">
              <el-select v-model="queryData.ogfId" @change="choicepla">
                <el-option :label="oilFields[0].ogfName" :value="oilFields[0].ogfId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台：" prop="pt">
              <el-select v-model="queryData.pt" @change="onPlatfromChange">
                <el-option v-for="item in platforms" :key="item.platformId" :label="item.platformCode" :value="item.platformId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井号：">
              <el-select v-model="queryData.wellId">
                <el-option v-for="(item, index) in wells" :key="item.wellName" :label="item.wellName" :value="item.wellName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchForOilField()" icon="el-icon-search">搜索
              </el-button>
              <el-button @click="drawer = true" type="primary" class="button_last">数据/模型更新</el-button>
            </el-form-item>

            <t-drawer :footer="false" header="数据上传" :visible.sync="drawer" placement="left" :close-btn="true" size="50%">
              <el-row type="flex" justify="center">
                <el-col :span="7">
                  <el-upload drag action="http://10.77.79.57:9474/api/v1/minio_upload/upload_perm_excel/" :on-error="handleUploadError" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload" :accept="accept" :limit="limit" :disabled="false" :show-file-list="false" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <template>
                    <i class="el-icon-upload" />
                    <div :class="$store.getters['setting/mode'] === 'dark' ? 'dark-hover-style' : 'light-hover-style'">
                      拖拽或者点击上传
                    </div>
                    <div slot="tip" class="el-upload__tip">
                      请上传
                      <template>
                        格式为 <b style="color: #f56c6c;"> xlsx </b>
                      </template>
                      的最新<b style="color: #f56c6c;"> 动态数据 </b>数据文件
                    </div>
                  </template>
                </el-upload>
                </el-col>
                <el-col :span="7">
                  <el-upload drag action="http://10.77.79.57:9474/api/v1/minio_upload/upload_static_excel/" :on-error="handleUploadError" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload" :accept="accept" :limit="limit" :disabled="false" :show-file-list="false" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <template>
                    <i class="el-icon-upload" />
                    <div :class="$store.getters['setting/mode'] === 'dark' ? 'dark-hover-style' : 'light-hover-style'">
                      拖拽或者点击上传
                    </div>
                    <div slot="tip" class="el-upload__tip">
                      请上传
                      <template>
                        格式为 <b style="color: #f56c6c;"> xlsx </b>
                      </template>
                      的最新<b style="color: #f56c6c;"> 静态数据 </b>文件
                    </div>
                  </template>
                </el-upload>
                </el-col>
                <el-col :span="7">
                  <el-upload drag action="http://10.77.79.57:9474/api/v1/minio_upload/upload_model/" :on-error="handleUploadError" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload" :accept="accept" :limit="limit" :disabled="false" :show-file-list="false" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <template>
                    <i class="el-icon-upload" />
                    <div :class="$store.getters['setting/mode'] === 'dark' ? 'dark-hover-style' : 'light-hover-style'">
                      拖拽或者点击上传
                    </div>
                    <div slot="tip" class="el-upload__tip">
                      请上传
                      <template>
                        格式为 <b style="color: #f56c6c;"> pth </b>
                      </template>
                      的最新<b style="color: #f56c6c;"> 模型 </b>文件
                    </div>
                  </template>
                </el-upload>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5% ;">
                <el-button type="primary"  icon="el-icon-search" @click="dataDownloadClick()">下载现场动态数据集</el-button>
              </el-row>
            </t-drawer>
          </el-form>
        </headerSearch>
        <div style="overflow-y:scroll;overflow-x: hidden;">
          <page-panel headerTitle="水平井跟端总产量、含水和压力" :show-btn="true" style="overflow-y:scroll">
            <el-row>
              <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px" @click="downEchartup">下载</el-button>
            </el-row>
            <Echart ref="echartChart" :chart-data="lineTable" height="583px"></Echart>
          </page-panel>
          <page-panel headerTitle="产液剖面参数显示" :show-btn="true">
            <el-row>
              <el-col :span="21">
                <el-date-picker v-model="time_qiujie1" type="month" value-format="M" :picker-options="pickerOptions" @change="handleDateChange"></el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-button icon="el-icon-download" type="primary" @click="downEchartdown">下载</el-button>
              </el-col>
            </el-row>
            <el-row >
              <Echart ref="echartChartdown" :chart-data="ParmShow" height="300px"></Echart>
            </el-row>
          </page-panel>
          <page-panel headerTitle="水平井产液剖面预测数据" :show-btn="true">
            <el-row>
              <el-col :span='20'>
                <el-tabs v-model="activeName_wu" @tab-click="handleClick_wu">
                  <el-tab-pane label="产液量" name="liquidSection" style="color: rgb(37, 144, 251);text-align: left;">
                  </el-tab-pane>
                  <el-tab-pane label="含水率" name="wcutSectionTime" style="color: rgb(37, 144, 251);text-align: left;">
                  </el-tab-pane>
                  <el-tab-pane label="压力" name="pressurematrix" style="color: rgb(37, 144, 251);text-align: left;">
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="4">
                <el-button style="float: right" type="primary" icon="el-icon-download" @click="doDownExcel()">下载</el-button>
              </el-col>
            </el-row>
            <el-table :data="dataPrediction" max-height="400px" id="spjcypmycsj" style="width: 100%" :header-cell-style="{ backgroundColor: 'rgb(0,55,94)', color: 'rgb(54, 201, 234)', fontSize: '14px' }">
              <el-table-column label="井名">
                <template slot-scope="scope">
                  <span>{{ scope.row.jingming }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.time }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.labelPrediction" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalvalue }}</span>
                  <!-- //改 -->
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[0]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[0] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[1]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[1] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[2]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[2] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[3]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[3] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[4]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[4] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[5]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[5] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[6]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[6] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[7]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[7] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[8]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[8] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="this.tabPrediction.distance[9]">
                <template slot-scope="scope">
                  <span>{{ scope.row.value[9] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </page-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDensityInfo, queryWellInfo, dataDownload} from "@/api/horizontalWell/horizontalWell.js";
import Echart from "@/components/tools/Echarts/index.vue";
// import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import { exportExcel } from "@/lib/exportExcel";
import {
  QueryOgfDetail,
  QueryPlatformDetail,
  QueryWellDetail, userListByUserNames
} from "@/api/basic/master";
export default {
  name: "flowmodel",
  data() {
    return {
      accept: ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "pdf"].map(item => `.${item}`).join(","),
      imageurl: "",
      limit: 1,
      fileType: ["xlsx", "pth"],
      drawer: false,

      //最上方单选框
      queryData: {
        assetCode: "",
        month: new Date().format("yyyy-MM"),
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
        // wellId: "09D30C16BD1D4F759D53F74941701307",
        wellId: "D28H",
        orgId: "715AD1CD60484BB59E737CD18A9DE44A",
        pt: "",
      },
      wells: [],
      platforms: [],
      oilFields: [{ogfName:''}],

      pickerOptions: {
        disabledDate(val) {
          const month = new Date(val).getMonth();
          const currentMonth = new Date().getMonth();
          const year = new Date(val).getFullYear();
          const currentYear = new Date().getFullYear();
          const currenTime = new Date().getTime();
          const time = new Date(val).getTime();

          if (
            year > currentYear + 1 ||
            month < currentMonth ||
            (year > currentYear && month > currentMonth - 7)
          ) {
            return true;
          }
        }
      },
      time_qiujie1: '',

      activeName_wu: 'liquidSection',
      tabPrediction: {
        labelPrediction: '根节点（总产液量）/m³',
        labelPredictionList: ['根节点（总产液量）/m³', '根节点（总含水率）/%', '根节点（总压力）/MPa'],
        distance: [],
      },
      allPredictionData: {
        well_name:'',
        liquidSection: [],
        wcutSectionTime: [],
        pressurematrix: [],
        predictionValue: [],
        echartsValue: [],
      },
      dataPrediction: [],

      lineTable: {
        tooltip: {
          trigger: "axis",
        },
        grid: [
          { x: "6%", y: "5%", width: "90%", height: "18%" },
          { x: "6%", y: "40%", width: "90%", height: "18%" },
          { x: "6%", y: "75%", width: "90%", height: "18%" },
        ],
        xAxis: [
          {
            gridIndex: 0,
            nameTextStyle: {
              color: "#4c9bfd",
              // width:'5000px',
              // height:'20px',
              padding: [0, 0, 0, 0],
              // verticalAlign: "bottom",
              lineHeight: 30,
            },
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            axisTick: {
              show: true // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色,x轴刻度标签
            },
            axisLine: {
              show: false // 去除轴线
            }
          },
          {
            gridIndex: 1,
            nameTextStyle: {
              color: "#4c9bfd",
              // width:'5000px',
              // height:'20px',
              padding: [0, 0, 0, 0],
              // verticalAlign: "bottom",
              lineHeight: 30,
            },
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            axisTick: {
              show: true // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色,x轴刻度标签
            },
            axisLine: {
              show: false // 去除轴线
            }
          },
          {
            gridIndex: 2,
            nameTextStyle: {
              color: "#4c9bfd",
              // width:'5000px',
              // height:'20px',
              padding: [0, 0, 0, 0],
              // verticalAlign: "bottom",
              lineHeight: 30,
            },
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            axisTick: {
              show: true // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色,x轴刻度标签
            },
            axisLine: {
              show: false // 去除轴线
            }
          },
        ],

        axisPointer: {
          link: {
            xAxisIndex: "all",
            yAxisIndex: "all",
          },
        },
        yAxis: [{
          gridIndex: 0,
          min: function (value) {
            return (Number(value.min) * 0.8) >> 0;
          },
          name: '产液量/(㎡/d)',
          nameLocation: "center",
          nameRotate: 90,
          nameGap: 52,
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
        }, { /* Y轴设置 */
          gridIndex: 1,
          min: function (value) {
            return (Number(value.min) * 0.8) >> 0;
          },
          name: '含水率/%',
          nameLocation: "center",
          nameGap: 52,
          nameRotate: 90,
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
        }, {
          gridIndex: 2,
          min: function (value) {
            return (Number(value.min) * 0.8) >> 0;
          },
          name: '压力/MPa',
          nameLocation: "center",
          nameGap: 45,
          nameRotate: 90,
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
        },],
        series: [
          {
            name: '产液量',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true,
            data: [],
          },
          {
            name: '含水率',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: true,
            data: [],
          },
          {
            name: '压力',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            smooth: true,
            data: [],
          },
        ],
        color: ["#00f2f1", "#ed3f35", "#9f35ff", "#00EC00", "#FFD306", "#FFD306"],
        visualMap: [{
          gridIndex: 0,
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 12,
            },
            {
              gt: 12,
              lte: 18,
              color: 'red'
            },

          ]
        }, {
          gridIndex: 1,
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 12,
            },
            {
              gt: 12,
              lte: 18,
              color: 'red'
            },

          ]
        }, {
          gridIndex: 2,
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 12,
            },
            {
              gt: 12,
              lte: 18,
              color: 'red'
            },
          ]
        },]
      },
      // minWater: 0,
      ParmShow: {
        title: [
          {
            gridIndex: 0,
            text: '产液量显示',
            left: '10%',
            top:'5%',
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
          {
            gridIndex: 1,
            text: '含水率显示',
            left: '45%',
            top:'5%',
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
          {
            gridIndex: 2,
            text: '压力显示',
            left: '77%',
            top:'5%',
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
        ],
        color: ["#00f2f1", "#ed3f35", "#9f35ff", "#00EC00", "#FFD306", "#FFD306"],
        tooltip: {},
        xAxis: [
          {
            gridIndex: 0,
            name: '距水平井根段距离/m',
            nameTextStyle: {
              color: "#4c9bfd",
              padding: [0, 0, 0, 0],
              lineHeight: 30,
            },
            nameLocation: 'center',
            type: "category",
            scale: true,
            boundaryGap: false,
            // data: [],
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
          {
            gridIndex: 1,
            name: '距水平井根段距离/m',
            nameTextStyle: {
              color: "#4c9bfd",
              padding: [0, 0, 0, 0],
              lineHeight: 30,
            },
            nameLocation: 'center',
            type: "category",
            scale: true,
            boundaryGap: false,
            // data: [],
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
          {
            gridIndex: 2,
            name: '距水平井根段距离/m',
            nameTextStyle: {
              color: "#4c9bfd",
              padding: [0, 0, 0, 0],
              lineHeight: 30,
            },
            nameLocation: 'center',
            type: "category",
            scale: true,
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
        ],
        grid: [
          { x: "4%", y: "20%", width: "25%", height: "60%" },
          { x: "37%", y: "20%", width: "25%", height: "60%" },
          { x: "70%", y: "20%", width: "25%", height: "60%" },
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: '产液强度/(㎡/(d*m))',
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: {
              color: "#4c9bfd",
              verticalAlign: 'top',
            },
            type: "value",
            axisTick: {
              show: false // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
              show: false // 去除轴线
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#012f4a" // 分割线颜色
              }
            },
          },
          {
            gridIndex: 1,
            name: '含水率/%',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
              color: "#4c9bfd",
              verticalAlign: 'top',
            },
            type: "value",
            axisTick: {
              show: false // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
              show: false // 去除轴线
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#012f4a" // 分割线颜色
              }
            },
          },
          {
            gridIndex: 2,
            name: '压力/MPa',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
              color: "#4c9bfd",
              verticalAlign: 'top',
            },
            type: "value",
            axisTick: {
              show: false // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
              show: false // 去除轴线
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#012f4a" // 分割线颜色
              }
            },
          },
        ],
        series: [
          {
            gridIndex: 0,
            name: '产液量',
            type: 'custom',
            renderItem: function (params, api) {
              var yValue = api.value(2);
              var start = api.coord([api.value(0), yValue]);
              var size = api.size([api.value(1) - api.value(0), yValue]);
              var style = api.style();
              return {
                type: 'rect',
                shape: {
                  x: start[0],
                  y: start[1],
                  width: size[0],
                  height: size[1]
                },
                style: style
              };
            },
            dimensions: ['from', 'to', 'profit'],
            encode: {
              x: [0, 1],
              y: 2,
              tooltip: [0, 1, 2],
              itemName: 2
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true,
            data: [],
          },
          {
            gridIndex: 1,
            name: '含水率',
            type: 'custom',
            renderItem: (params, api) => {
              let yValue = api.value(2);
              let start = api.coord([api.value(0), yValue]);
              let yDiff = yValue
              let size = api.size([api.value(1) - api.value(0), yDiff]);
              let style = api.style();
              return {
                type: 'rect',
                shape: {
                  x: start[0],
                  y: start[1],
                  width: size[0],
                  height: size[1]
                },
                style: style
              };
            },
            dimensions: ['from', 'to', 'profit'],
            encode: {
              x: [0, 1],
              y: 2,
              tooltip: [0, 1, 2],
              itemName: 2
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: true,
            data: [],
          },
          {
            gridIndex: 2,
            name: '压力',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            smooth: true,
            data: [],
          },
        ],
      },

      monthShow: 0,
      footerDistance: [],
    }
  },
  components: {
    Echart,
  },
  watch: {
    queryData: {
      handler(val) {
        let obj = {};
        obj = this.wells.find((item) => {
          return item.wellId === val.wellId;
        });
        this.wellName = obj?.wellName
      },
      deep: true,
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleClick_wu(tab) {
      this.tabPrediction.labelPrediction = this.tabPrediction.labelPredictionList[tab._data.index]
      this.dataPrediction = this.allPredictionData[this.activeName_wu]
      // console.log(this.activeName_wu)
      // console.log(this.allPredictionData[this.activeName_wu])
    },
    searchForOilField() {
      let queryParams = {
        well_name: this.queryData.wellId.replace('QHD32-6-','')
        // well_name:'H15H'
      }
      queryDensityInfo(queryParams).then((res) => {
        // console.log("第一个函数", res)
        this.liquidChart(res.data.data)
        this.waterpercentChart(res.data.data)
        this.pressChart(res.data.data)
        this.allPredictionData.totalvalue = res.data.data.prediction
        this.allPredictionData.well_name = res.data.well_name
      });
      queryWellInfo(queryParams).then((res) => {
        this.allPredictionData.echartsValue = res
        this.footerDistance = res.distancefromb.map(function (item) {
          return item.toFixed(1)
        })
        this.ParmShow.xAxis[2].data = this.footerDistance
        this.showChart(res, this.monthShow, this.footerDistance)
        this.alldataPrediction(res)
        // console.log("第二个函数", res)
      })
    },

    dataDownloadClick(){
      dataDownload(`http://10.77.79.57:9474/api/v1/dl_data/data/`)
    },

    liquidChart(data) {
      let liquidHistorylist = data.history.liquid.map(function (item) {
        return item.toFixed(1)
      })
      let liquidPrediction = data.prediction.liquid.map(function (item) {
        return item.toFixed(1)
      })
      this.lineTable.series[0].data = liquidHistorylist.concat(liquidPrediction);
      this.lineTable.xAxis[0].data = data.history.date.concat(data.prediction.date);
    },
    waterpercentChart(data) {
      let waterHistorylist = data.history.waterpercent.map(function (item) {
        return (item * 100).toFixed(1)
      })
      let waterPredictionlist = data.prediction.waterpercent.map(function (item) {
        return (item * 100).toFixed(1)
      })
      this.lineTable.series[1].data = waterHistorylist.concat(waterPredictionlist);
      this.lineTable.xAxis[1].data = data.history.date.concat(data.prediction.date);;
    },
    pressChart(data) {
      let pressHistorylist = data.history.press.map(function (item) {
        return item.toFixed(1)
      })
      let pressPredictionlist = data.prediction.press.map(function (item) {
        return item.toFixed(1)
      })
      this.lineTable.series[2].data = pressHistorylist.concat(pressPredictionlist);
      this.lineTable.xAxis[2].data = data.history.date.concat(data.prediction.date);;
    },
    layoutChange() {
      this.$refs.table.doLayout()
    },
    alldataPrediction(data) {
      let arr = data.distancefromb
      for (let i = 0;i<10;i++){
        arr[i] = (data.distancefromb[i+1] - data.distancefromb[i])/2 + data.distancefromb[i]
      }
      this.tabPrediction.distance = arr.map(function (item) {
        return item.toFixed(1) + 'm'
      })
      this.allPredictionData.liquidSection = []
      this.allPredictionData.wcutSectionTime = []
      this.allPredictionData.pressurematrix = []
      // console.log(this.tabPrediction.distance)
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      for (let i = 0; i < 6; i++) {
        let valuePrediction = {
          jingming: '',
          time: '',
          totalvalue: '',
          value: []
        }
        if (Number(month) + i <= 12) {
          valuePrediction.time = year + '-' + (Number(month) + i)
        } else {
          valuePrediction.time = (Number(year) + 1) + '-' + (Number(month) + i - 12)
        }
        valuePrediction.value = data.liquidSection[i].map(function(item){
          return item.toFixed(2)
        })
        valuePrediction.totalvalue = (this.allPredictionData.totalvalue.liquid[i]).toFixed(2)
        valuePrediction.jingming = this.allPredictionData.well_name
        this.allPredictionData.liquidSection.push(valuePrediction)

      }
      for (let i = 0; i < 6; i++) {
        let valuePrediction = {
          jingming: '',
          time: '',
          totalvalue: '',
          value: []
        }
        if (Number(month) + i <= 12) {
          valuePrediction.time = year + '-' + (Number(month) + i)
        } else {
          valuePrediction.time = (Number(year) + 1) + '-' + (Number(month) + i - 12)
        }
        valuePrediction.value = data.wcutSectionTime[i].map(function (item) {
          return (item * 100).toFixed(2)
        })
        valuePrediction.totalvalue = (this.allPredictionData.totalvalue.waterpercent[i] * 100).toFixed(2)
        valuePrediction.jingming = this.allPredictionData.well_name
        this.allPredictionData.wcutSectionTime.push(valuePrediction)
      }
      for (let i = 0; i < 6; i++) {
        let valuePrediction = {
          jingming: '',
          time: '',
          totalvalue: '',
          value: []
        }
        if (Number(month) + i <= 12) {
          valuePrediction.time = year + '-' + (Number(month) + i)
        } else {
          valuePrediction.time = (Number(year) + 1) + '-' + (Number(month) + i - 12)
        }
        valuePrediction.value = data.pressurematrix[i].map(function (item) {
          return item.toFixed(2)
        })
        valuePrediction.totalvalue = (this.allPredictionData.totalvalue.press[i]).toFixed(2)
        valuePrediction.jingming = this.allPredictionData.well_name
        this.allPredictionData.pressurematrix.push(valuePrediction)
      }
      this.dataPrediction = this.allPredictionData.liquidSection
      // console.log(this.allPredictionData.liquidSection)
    },
    getResData(data) {
      let params = {
        well_name: "D28H"
      };
      this.uploadFile(params);
    },
    uploadFile(params) {
      this.drawer = false;
      queryDensityInfo(params).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("文件上传成功!");
          this.drawer = false;
          this.imageurl = ""; // 清空已选择的文件
        } else {
          this.$message.error("文件上传失败!");
          this.imageurl = ""; // 清空已选择的文件
        }
      });
    },
    showChart(data, index, xDistance) {
      // this.minWater = (Math.min.apply(null, (data.wcutSectionTime[index])) * 100).toFixed(1) - 0.5
      this.ParmShow.series[0].data = []
      for (let i = 0; i < (data.liquidSection[index].length); i++) {
        let value = (xDistance.slice(i, i + 2)).concat(data.liquidSection[index][i].toFixed(1))
        this.ParmShow.series[0].data.push(value)
      }
      this.ParmShow.series[1].data = []
      for (let i = 0; i < (data.wcutSectionTime[index].length); i++) {
        let value1 = (xDistance.slice(i, i + 2)).concat((data.wcutSectionTime[index][i] * 100).toFixed(1))

        this.ParmShow.series[1].data.push(value1)
      }
      this.ParmShow.series[2].data = data.pressurematrix[index].map(function (item) {
        return item.toFixed(1)
      })
    },

    handleDateChange(value) {
      const month = new Date().getMonth() + 1
      let monthDiff = month - Number(value)
      if (monthDiff > 0) {
        monthDiff = 12 - month + Number(value)
      } else if (monthDiff < 0) {
        monthDiff = -monthDiff
      }
      this.monthShow = monthDiff
      this.showChart(this.allPredictionData.echartsValue, monthDiff, this.footerDistance)
    },
    downEchartup() {
      this.$refs.echartChart.chartDownLoad('水平井跟端总产量、含水和压力');
    },
    downEchartdown() {
      this.$refs.echartChartdown.chartDownLoad('产液剖面参数显示');
    },
    doDownExcel() {
      exportExcel("#spjcypmycsj", "水平井产液剖面预测数据");
    },

    getList() {
      //获取作业公司
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      }
      userListByUserNames(params).then((res) => {
        this.queryData.orgId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
      })
      //根据作业公司查询油田
      QueryOgfDetail({ operationZoneId: this.queryData.orgId }).then(res => {
        this.oilFields = res.data.data
      })
      //根据油田查询平台列表
      QueryPlatformDetail({ ogfId: this.queryData.ogfId }).then(res => {
        this.platforms = res.data.data
        this.queryData.pt = this.platforms[0].platformId;
        QueryWellDetail({ platformId: this.queryData.pt }).then((res) => {
          this.wells = res.data.data
          if (this.wells.length == 0) {
            this.queryData.wellId = this.wells[0].wellName;
          }
          if (this.wells.length > 0) {
            this.queryData.wellId = this.wells[1].wellName;
          }
        })
      })
    },

    choicepla(val) {
      QueryPlatformDetail({ ogfId: val }).then(res => {
        this.platforms = res.data.data
        this.queryData.pt = this.platforms[0].platformId;
        QueryWellDetail({ platformId: this.queryData.pt }).then((res) => {
          this.wells = res.data.data
          this.queryData.wellId = this.wells[0].wellName
        })
      })
    },

    async onPlatfromChange(val) {
      await QueryWellDetail({ platformId: val, ogfId: this.queryData.ogfId }).then((res) => {
        this.wells = res.data.data
        this.queryData.wellId = this.wells[0]?.wellName
      })
    },

    handleBeforeUpload(file) {
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) {
            return true;
          }
          if (fileExtension && fileExtension.indexOf(type) > -1) {
            return true;
          }
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      this.$modal.loading("正在上传文件，请稍候...");
      return true;
    },
    handleUploadError() {
      this.$message.error("上传文件失败，请重试");
      this.$modal.closeLoading();
    },

    async handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.$message.success("文件上传成功!");
        this.$modal.closeLoading();
      } else {
        this.$message.error("文件上传失败!");
      }
    },
  }
}
</script>

<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}
</style>

<style>
.el-drawer {
  background-image: url("@/assets/backgroundImg.png");
  color: white;
  font-size: larger;
}
</style>
