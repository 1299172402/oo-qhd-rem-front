<!-- 分注井测试率 -->
<template>
  <div class="app-container">
    <header-search style="width: 100%; height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <div style="margin: 10px 20px 10px 0px">
          油田：
          <el-select v-model="queryParams.oilFieldId" @change="getFetchPlatforms">
            <el-option
              v-for="item in oilFieldList"
              :key="item.ogfId"
              :label="item.ogfName"
              :value="item.ogfId"
              @change="changeOgf"
            ></el-option>
          </el-select>
        </div>
        <div style="margin: 10px 20px 10px 0px">
          年度：
          <el-date-picker
            v-model="queryParams.beginDate"
            type="year"
            placeholder="年份"
            style="width: 100px"
            value-format="yyyy"
            @change="createChange1"
          >
          </el-date-picker>
          <span> 至 </span>
          <el-date-picker
            v-model="queryParams.endDate"
            type="year"
            placeholder="年份"
            style="width: 100px"
            value-format="yyyy"
            @change="createChange2"
          >
          </el-date-picker>
        </div>
        <div style="margin: 10px 20px 10px 0px">
          <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" class="commonBtn" @click="resetting">重置</el-button>
        </div>
        <div style="margin-left: auto">
          <el-button type="warning" plain class="commonBtn" @click="close">返回</el-button>
        </div>
      </div>
    </header-search>

    <page-panel-new class="app-content">
      <pagePanel headerTitle="分注井测试率" style="height: 500px" show-btn>
        <div class="g-row-flex-V" style="margin-bottom: 20px">
          <div style="margin-right: 20px">
            平台：
            <el-select v-model="queryParams.platFormId" clearable="" style="width: 220px">
              <el-option
                v-for="item in platformList"
                :key="item.platformId"
                :label="item.platformCode"
                :value="item.platformId"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" type="primary" @click="doSearch">确定</el-button>
          </div>
        </div>
        <Echart :chart-data="separateInjectionWellTestRate" height="calc(100% - 55px)"></Echart>
      </pagePanel>

      <pagePanel :headerTitle="`${oilFieldName || ''}分注井测试明细`" style="height: 550px" show-btn>
        <div style="display: flex; justify-content: space-between">
          <div>
            日期：
            <el-date-picker
              v-model="queryParams.year"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              style="width: 160px"
              @change="createChange3"
            >
            </el-date-picker>
          </div>
          <el-button style="margin-bottom: 20px" icon="el-icon-download" type="primary" @click="downloadFile">
            下载
          </el-button>
        </div>
        <el-table id="fzjcsmx" :data="tableData" border highlight height="calc(100% - 130px)">
          <!-- :index="formatIndex"  -->
          <el-table-column
            label="序号"
            header-align="center"
            align="center"
            type="index"
            width="80"
            :index="formatIndex"
          ></el-table-column>
          <el-table-column prop="ogfName" label="油田" align="center"></el-table-column>
          <el-table-column prop="wellNo" label="注水井号" align="center"></el-table-column>
          <el-table-column prop="injSeparateTypeName" label="分注类型" align="center"></el-table-column>
          <el-table-column
            prop="prodDate"
            :label="`调配日期\n(yyyy-mm-dd)`"
            :formatter="formatTime"
            align="center"
          ></el-table-column>
        </el-table>
        <pagination
          :total="total"
          :page.sync="queryParams.page"
          :limit.sync="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :pager-count="5"
          layout="prev, pager, next, sizes, total"
          @pagination="handleTableChange"
        />
      </pagePanel>
    </page-panel-new>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { dividingTestRate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { QueryOgfDetail, QueryPlatformDetail, userListByUserNames } from "@/api/rem/marster.js";
import { fetchPlatforms } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { exportExcel, exportExcelFromJson } from "@/lib/exportExcel.js";
import dayjs from "dayjs";
export default {
  // name: "splitWellTest",
  components: {
    Echart,
  },
  data() {
    return {
      queryParams: {
        companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
        oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
        platFormId: "", // 平台
        // dates: [dayjs().subtract(7, "day").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")], // 时间范围集合
        beginDate: dayjs().subtract(5, "year").format("YYYY-01-01"), // 开始时间
        endDate: dayjs().format("YYYY-MM-DD"), // 结束时间
        year: dayjs().subtract(1, "day").format("YYYY-MM-DD"), // 开始时间
        page: 1,
        pageSize: 10,
        isDesc: 1,
      },
      total: 0, //  表格分页总数
      // 日期选择禁选配置
      pickerOptions: {
        disabledDate: (time) => {
          if (time.getTime() < dayjs().subtract(1, "day").valueOf()) {
            return false;
          } else {
            return true;
          }
        },
      },
      // 油田名称
      oilFieldName: "",
      //油田列表
      oilFieldList: [],
      //平台列表
      platformList: [],
      //分注井测试率
      separateInjectionWellTestRate: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "分注井测试率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 0,
          left: "center",
        },
        grid: {
          x: 120,
          y: 80,
          x2: 100,
          y2: 60,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "分注井测试率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 0,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (年)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            // formatter: function (val) {
            //   return val + "年";
            // },
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "分注井测试率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#8FA4CC",
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
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        series: [],
      },
      // 表格数据
      tableData: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //重置
    resetting() {
      Object.assign(this.$data, this.$options.data());
      this.initData();
    },
    //表格序号
    formatIndex(index) {
      return (this.queryParams.page - 1) * this.queryParams.pageSize + index + 1;
    },
    //返回按钮
    close() {
      const obj = {
        name: "WaterInjectionIndexManagement",
      };
      this.$tab.closeOpenPage(obj);
    },
    //初始化页面
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.queryParams.companyId = res.data.data[0]?.currentTenantBindOrgId
            ? res.data.data[0].currentTenantBindOrgId
            : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.queryParams.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilFieldList = data.data.data;
          if (this.queryParams.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.queryParams.oilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.queryParams.oilFieldId = this.oilFieldList[0].ogfId ? this.oilFieldList[0].ogfId : undefined;
          }
        }
      });
      // 获取平台信息
      this.getFetchPlatforms();
      // 分注井测试率图表数据
      this.doDividingTestRate();
    },
    //获得平台数据
    getFetchPlatforms() {
      this.queryParams.platFormId = "";
      QueryPlatformDetail({ ogfId: this.queryParams.oilFieldId }).then((res) => {
        //判断联通状态
        if (res.data.code == 200) {
          this.platformList = res.data.data;
          // this.queryParams.platFormId = res.data.data[0].platformId;
        }
      });
    },

    //油田切换
    changeOgf() {
      this.getFetchPlatforms();
    },
    /**
     *  监听表格分页变化
     * @param pagination 分页数据对象
     */
    handleTableChange(pagination) {
      this.queryParams.page = pagination.page;
      this.queryParams.pageSize = pagination.limit;
      this.doDividingTestRate();
    },
    // 时间范围切换
    createChange1(data) {
      this.queryParams.beginDate = dayjs(data).format("YYYY-01-01");
    },
    createChange2(data) {
      this.queryParams.endDate = dayjs(data).format("YYYY-MM-DD");
      if (data == dayjs().format("YYYY")) {
        this.queryParams.year = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      } else {
        this.queryParams.year = dayjs(data).endOf("year").format("YYYY-MM-DD");
      }
    },
    createChange3() {
      this.doDividingTestRate();
    },
    //查询
    doSearch() {
      //分注井测试率
      this.doDividingTestRate();
    },
    //分注井测试率
    doDividingTestRate() {
      this.oilFieldName =
        this.oilFieldList.filter((item) => item.ogfId === this.queryParams.oilFieldId)[0].ogfName || "";
      dividingTestRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let resData = res.data.data;
          this.tableData = resData.tableList ? resData.tableList[0][0]?.rows : [];
          this.total = resData.tableList ? resData.tableList[0][0]?.total : 0;
          if (resData.chart) {
            let barCharts = resData.chart.linearDataSets;

            barCharts.forEach((item, index) => {
              legendData.push(item.label);
              let series = {};
              series.name = item.label;
              series.type = "bar";
              series.barWidth = "22";
              series.label = {
                show: true,
                position: "top",
                color: "#8FA4CC",
              };
              series.itemStyle = {
                normal: {
                  borderRadius: [7, 7, 0, 0],
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   {
                  //     // 四个数字分别对应 数组中颜色的开始位置，分别为 右，下，左，上。例如（1,0,0,0 ）代表从右边开始渐
                  //     // 变。offset取值为0~1，0代表开始时的颜色，1代表结束时的颜色，柱子表现为这两种颜色的渐变。
                  //     offset: 0,
                  //     color: "#16c8ed",
                  //   },
                  //   {
                  //     offset: 1,
                  //     color: "#0f66ea",
                  //   },
                  // ]),
                },
              };
              let barData = item.linearData;
              let seriesMess = [];
              barData.forEach((dot, index) => {
                let point = [];
                point.push(dot.label);
                xSet.add(dot.label);
                point.push(dot.value);
                seriesMess.push(point);
              });
              series.data = seriesMess;
              seriesData.push(series);
            });
          }
          xData = Array.from(xSet).sort();
          this.separateInjectionWellTestRate.xAxis.data = xData;
          this.separateInjectionWellTestRate.legend.data = legendData;
          this.separateInjectionWellTestRate.series = seriesData;
          this.separateInjectionWellTestRate.title.text = `${this.oilFieldName || ""}分注井测试率`;
        }
      });
    },
    //表格id 表格名称
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
    /**
     * hwh
     * 下载表格信息
     */
    downloadFile() {
      let request = {};
      Object.assign(request, this.queryParams);
      request.page = 1;
      request.pageSize = 99999;
      dividingTestRate(request).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          let fileName = `${this.oilFieldName || ""}分注井测试明细`;
          let list = data.data.data?.tableList[0][0].rows || [];
          let headTitle = this.$refs.table1.$children.length ? this.$refs.table1.$children : null;
          exportExcelFromJson(headTitle, list, fileName);
        }
      });
    },
    //表格时间格式化方法
    formatTime(row, column) {
      return dayjs(row[column.property]) ? dayjs(row[column.property]).format("YYYY-MM-DD") : row[column.property];
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0 7px;
  height: 100%;
}
::v-deep .app-content {
  height: calc(100% - 100px) !important;
  overflow-y: scroll;
  .g-w100:first-child {
    padding-top: 0 !important;
  }
}

::v-deep .el-main {
  padding: 0px 0px 20px;
  overflow: hidden;
}

.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}

.basicTable {
  height: auto;
  // padding-bottom: 10px;
}

.el-col-4 {
  width: 20%;
}

::v-deep .el-table .cell:empty::before {
  content: "-";
}

::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
    line-height: 1.5 !important;
    white-space: pre;
  }
}
</style>
