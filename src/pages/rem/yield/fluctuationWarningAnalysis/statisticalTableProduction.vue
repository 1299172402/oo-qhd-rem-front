<!-- 产量波动统计表 -->
<template>
  <div class="app-container">
    <headerSearch
      class="g-w100 g-h100"
      style="height: auto; padding-top: 18px; padding-bottom: 8px; margin-bottom: 20px"
    >
      <div style="display: flex; align-items: center; flex-wrap: wrap">
        <div style="margin-right: 15px; margin-bottom: 10px">
          <span>油田：</span>
          <el-select v-model="searchForm.ogfId" @change="onFieldChange" style="width: 165px">
            <el-option
              v-for="(item, index) in oilFields"
              :key="item.ogfId"
              :label="item.ogfName"
              :value="item.ogfId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-right: 15px; margin-bottom: 10px">
          <span>平台：</span>
          <el-select v-model="searchForm.platId" clearable @change="onPlatfromChange" style="width: 220px">
            <el-option
              v-for="(item, index) in platforms"
              :key="item.platformId"
              :label="item.platformCode"
              :value="item.platformId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-right: 15px; margin-bottom: 10px">
          <span>井号：</span>
          <el-select v-model="searchForm.wellId" filterable style="width: 170px">
            <el-option
              v-for="(item, index) in wells"
              :key="item.wellId"
              :label="item.wellName"
              :value="item.wellId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-right: 15px; margin-bottom: 10px">
          <span>对比日期：</span>
          <el-date-picker
            v-model="searchForm.prodDateCompare"
            :clearable="false"
            style="width: 160px"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div style="margin-right: 15px; margin-bottom: 10px">
          <span>对比基准日期：</span>
          <el-date-picker
            v-model="searchForm.prodDate"
            :clearable="false"
            style="width: 160px"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div style="margin-right: 15px; margin-bottom: 10px">
          <span>影响因素：</span>
          <el-select v-model="searchForm.influenceFactor" style="width: 170px">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item" :value="item" v-for="(item, index) in measures" :key="index"></el-option>
          </el-select>
        </div>
        <div style="margin-right: 15px; margin-bottom: 10px">
          <el-button type="primary" icon="el-icon-search" @click="getWellOutputWaveTable(true)">搜索</el-button>
          <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
        </div>
      </div>
    </headerSearch>
    <div class="z-container">
      <pagePanelNew style="height: 100%; margin-top: 0">
        <div
          class="pageHeader"
          style="
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            margin-left: 0;
          "
        >
          <span>{{ searchForm.ogfName }}单井产量变化</span>
          <div>
            <el-button type="primary" style="height: 30px" @click="doDownIndex">下载</el-button>
            <el-button type="primary" style="height: 30px" @click="goBack">返回</el-button>
          </div>
        </div>
        <div class="tableBox" id="tableBox" style="height: calc(100% - 75px)">
          <el-table
            id="tableData"
            :data="tableData"
            border
            :row-style="{ height: '0px' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width: 100%; margin: 20px 0"
            height="100%"
            :default-sort="{ prop: 'comparisonOilProduction', order: 'ascending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
          >
            <el-table-column type="index" label="序号" align="center" width="80px" fixed="left"></el-table-column>
            <el-table-column prop="wellNo" label="井号" width="150" fixed />
            <el-table-column :label="searchForm.prodDate">
              <el-table-column
                sortable
                prop="fluidProdDaily"
                :label="`日产液\n(m³)`"
                width="90"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'fluidProdDaily');
                  }
                "
              />
              <el-table-column
                sortable
                prop="oilProdDaily"
                :label="`日产油\n(m³)`"
                width="90"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'oilProdDaily');
                  }
                "
              />
              <el-table-column
                sortable
                prop="waterRatio"
                :label="`含水\n(%)`"
                width="90"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'waterRatio');
                  }
                "
              />
              <el-table-column
                sortable
                prop="dhFlowingPress"
                :label="`井底流压\n(MPa)`"
                width="100"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'dhFlowingPress');
                  }
                "
              />
              <el-table-column
                sortable
                prop="pumpFrequency"
                :label="`泵频率\n(Hz)`"
                width="90"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'pumpFrequency');
                  }
                "
              />
            </el-table-column>
            <el-table-column :label="searchForm.prodDateCompare">
              <el-table-column
                sortable
                prop="fluidProdDailyCompare"
                :label="`日产液\n(m³)`"
                width="90"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'fluidProdDailyCompare');
                  }
                "
              />
              <el-table-column
                sortable
                prop="oilProdDailyCompare"
                :label="`日产油\n(m³)`"
                width="90"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'oilProdDailyCompare');
                  }
                "
              />
              <el-table-column
                sortable
                prop="waterRatioCompare"
                :label="`含水\n(%)`"
                width="90"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'waterRatioCompare');
                  }
                "
              />
              <el-table-column
                sortable
                prop="dhFlowingPressCompare"
                :label="`井底流压\n(MPa)`"
                width="100"
                :formatter="formatter"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'dhFlowingPressCompare');
                  }
                "
              />
              <el-table-column
                sortable
                prop="pumpFrequencyCompare"
                :label="`泵频率\n(Hz)`"
                width="90"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'pumpFrequencyCompare');
                  }
                "
              />
            </el-table-column>
            <el-table-column label="变化量">
              <el-table-column
                sortable
                prop="fluidProdDaily"
                :label="`产液对比\n(m³/d)`"
                width="120"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort1(
                      numReduce(a.fluidProdDailyCompare, a.fluidProdDaily),
                      numReduce(b.fluidProdDailyCompare, b.fluidProdDaily),
                    );
                  }
                "
              >
                <template slot-scope="{ row }">
                  <span style="display: flex; align-items: center; justify-content: center">
                    {{
                      row.fluidProdDaily !== null
                        ? numReduce(row.fluidProdDailyCompare, row.fluidProdDaily).toFixed(2)
                        : "-"
                    }}
                    <img
                      src="@/assets/rem/yieId/upTriangle.png"
                      alt=""
                      v-if="row.fluidProdDaily !== null && numReduce(row.fluidProdDailyCompare, row.fluidProdDaily) > 0"
                      style="width: 20px; height: 20px"
                    />
                    <span
                      v-if="
                        row.fluidProdDaily !== null && numReduce(row.fluidProdDailyCompare, row.fluidProdDaily) === 0
                      "
                      style="width: 12px; height: 3px; background-color: #ffe706; margin-left: 8px"
                    ></span>
                    <img
                      src="@/assets/rem/yieId/downTriangle.png"
                      alt=""
                      v-if="row.fluidProdDaily !== null && numReduce(row.fluidProdDailyCompare, row.fluidProdDaily) < 0"
                      style="width: 20px; height: 20px"
                    />
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="comparisonOilProduction"
                :label="`产油对比\n(m³/d)`"
                width="160"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort(a, b, 'comparisonOilProduction');
                  }
                "
              >
                <template slot-scope="{ row, $index }">
                  <span style="display: flex; align-items: center; justify-content: center">
                    <span style="width: 60px; text-align: right; margin-right: 10px">{{
                      row.oilProdDaily !== null ? parseFloat(row.comparisonOilProduction).toFixed(2) : "-"
                    }}</span>
                    <span style="width: 30px; display: flex; justify-content: flex-end">
                      <span
                        style="height: 13px; display: flex"
                        v-if="row.comparisonOilWidth !== 0 && row.comparisonOilProduction < 0"
                      >
                        <span
                          v-if="row.oilProdDaily !== null"
                          :style="{ width: row.comparisonOilWidth + 'px', height: '13px', backgroundColor: 'red' }"
                        ></span>
                      </span>
                    </span>
                    <span
                      style="width: 1px; height: 40px; background: #8fa4cc"
                      v-if="row.comparisonOilWidth !== 0"
                    ></span>
                    <span
                      style="width: 30px; height: 13px; display: flex"
                      v-if="row.comparisonOilWidth !== 0 && row.comparisonOilProduction > 0"
                    >
                      <span
                        v-if="row.oilProdDaily !== null"
                        :style="{ width: row.comparisonOilWidth + 'px', height: '13px', backgroundColor: 'green' }"
                      ></span>
                    </span>
                    <span style="width: 30px; height: 13px; display: flex" v-else></span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="waterRatio"
                :label="`含水对比\n(%)`"
                width="120"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort1(
                      numReduce(a.waterRatioCompare, a.waterRatio),
                      numReduce(b.waterRatioCompare, b.waterRatio),
                    );
                  }
                "
              >
                <template slot-scope="{ row }">
                  <span style="display: flex; align-items: center; justify-content: center">
                    {{ row.waterRatio !== null ? numReduce(row.waterRatioCompare, row.waterRatio).toFixed(2) : "-" }}
                    <img
                      src="@/assets/rem/yieId/UP.png"
                      alt=""
                      v-if="row.waterRatio !== null && numReduce(row.waterRatioCompare, row.waterRatio) > 0"
                      style="width: 20px; height: 20px"
                    />
                    <img
                      src="@/assets/rem/yieId/equation.png"
                      alt=""
                      v-if="row.waterRatio !== null && numReduce(row.waterRatioCompare, row.waterRatio) == 0"
                      style="width: 20px; height: 20px; margin-left: 8px"
                    />
                    <img
                      src="@/assets/rem/yieId/DOWN.png"
                      alt=""
                      v-if="row.waterRatio !== null && numReduce(row.waterRatioCompare, row.waterRatio) < 0"
                      style="width: 20px; height: 20px"
                    />
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="dhFlowingPress"
                :label="`井底流压对比\n(MPa)`"
                width="130"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort1(
                      numReduce(a.dhFlowingPressCompare, a.dhFlowingPress),
                      numReduce(b.dhFlowingPressCompare, b.dhFlowingPress),
                    );
                  }
                "
              >
                <template slot-scope="scope">
                  {{
                    scope.row.dhFlowingPress !== null
                      ? numReduce(scope.row.dhFlowingPressCompare, scope.row.dhFlowingPress).toFixed(2)
                      : "-"
                  }}
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="pumpFrequency"
                :label="`泵频率对比\n(Hz)`"
                width="120"
                :sort-method="
                  (a, b) => {
                    return borepipeNoSort1(
                      numReduce(a.pumpFrequencyCompare, a.pumpFrequency),
                      numReduce(b.pumpFrequencyCompare, b.pumpFrequency),
                    );
                  }
                "
              >
                <template slot-scope="{ row }">
                  <span style="display: flex; align-items: center; justify-content: center">
                    {{
                      row.pumpFrequency !== null
                        ? numReduce(row.pumpFrequencyCompare, row.pumpFrequency).toFixed(2)
                        : "-"
                    }}
                    <img
                      src="@/assets/rem/yieId/UP.png"
                      alt=""
                      v-if="row.pumpFrequency !== null && numReduce(row.pumpFrequencyCompare, row.pumpFrequency) > 0"
                      style="width: 20px; height: 20px"
                    />
                    <img
                      src="@/assets/rem/yieId/equation.png"
                      alt=""
                      v-if="row.pumpFrequency !== null && numReduce(row.pumpFrequencyCompare, row.pumpFrequency) == 0"
                      style="width: 20px; height: 20px; margin-left: 8px"
                    />
                    <img
                      src="@/assets/rem/yieId/DOWN.png"
                      alt=""
                      v-if="row.pumpFrequency !== null && numReduce(row.pumpFrequencyCompare, row.pumpFrequency) < 0"
                      style="width: 20px; height: 20px"
                    />
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="250" />
          </el-table>
        </div>
      </pagePanelNew>
    </div>
  </div>
</template>

<script>
import { QueryOgfDetail, QueryPlatformDetail, QueryWellDetail, userListByUserNames } from "@/api/rem/marster.js";
import { getWellOutputWaveTable, getWellOutputWaveTableDate } from "@/api/oilDeposit/rem-04/yieId.js";
import { exportExcel } from "@/lib/exportExcel.js";
import * as D3 from "d3";
export default {
  name: "statisticalTableProduction",
  data() {
    return {
      //油田下拉框
      oilFields: [],
      //平台下拉框
      platforms: [],
      //井号下拉框
      wells: [],
      //影响因素
      measures: [
        "弃井&转注",
        "新井",
        "水井&弃井",
        "关停",
        "启井",
        "阶段关井",
        "提频扩油嘴",
        "提频缩油嘴",
        "降频扩油嘴",
        "降频缩油嘴",
        "扩油嘴",
        "缩油嘴",
        "提频",
        "降频",
        "产液上升",
        "含水上升",
        "含水下降",
        "产液下降",
      ],
      //参数
      searchForm: {
        companyId: "",
        ogfId: "",
        ogfName: "",
        platId: "",
        wellId: "",
        wellIds: [], //井标识集合
        prodDate: new Date().addDays(-2).format("yyyy-MM-dd"), //对比基准日期
        prodDateCompare: new Date().addDays(-1).format("yyyy-MM-dd"), //对比日期
        influenceFactor: "", //影响因素
      },
      //表格数据
      tableData: [],
      //产油对比-实际值
      min: 0,
      max: 0,
      //产油对比-宽度
      min2: 10,
      max2: 30,
    };
  },
  watch: {
    async "$route.query"() {
      if (Object.keys(this.$route.query).length) {
        if (this.$route.query.wellIds) {
          let wellIds = JSON.parse(this.$route.query.wellIds);
          if (wellIds.length) {
            this.searchForm.wellIds = wellIds.map((el) => el.borepipeId);
          }
        }
      }
      //获取对比基准日期和对比日期
      if (this.$route.query.prodDate) {
        this.searchForm.prodDate = this.$route.query.prodDate;
        this.searchForm.prodDateCompare = this.$route.query.prodDateCompare;
      } else {
        await getWellOutputWaveTableDate().then((res) => {
          if (res.data.code == 200) {
            this.searchForm.prodDateCompare = res.data.data;
            this.searchForm.prodDate = new Date(res.data.data).addDays(-1).format("yyyy-MM-dd");

          }
        });
      }
      await this.initData();
    },
  },
  async mounted() {
    if (Object.keys(this.$route.query).length) {
      if (this.$route.query.wellIds) {
        let wellIds = JSON.parse(this.$route.query.wellIds);
        if (wellIds.length) {
          this.searchForm.wellIds = wellIds.map((el) => el.borepipeId);
        }
      }
    }
    //获取对比基准日期和对比日期
    if (this.$route.query.prodDate) {
      this.searchForm.prodDate = this.$route.query.prodDate;
      this.searchForm.prodDateCompare = this.$route.query.prodDateCompare;
    } else {
      await getWellOutputWaveTableDate().then((res) => {
        if (res.data.code == 200) {
          this.searchForm.prodDateCompare = res.data.data;
          this.searchForm.prodDate = new Date(res.data.data).addDays(-1).format("yyyy-MM-dd");

        }
      });
    }
    await this.initData();
  },
  methods: {
    //重置
    resetting() {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data());
        //初始化时间段
        // this.selectDate = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().addDays(-1).format("yyyy-MM-dd")];
        //初始化筛选设置
        // this.setParaValue = "2";
        this.initData();
      });
    },
    //页面初始化信息
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.searchForm.companyId = res.data.data[0]?.currentTenantBindOrgId
            ? res.data.data[0].currentTenantBindOrgId
            : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.searchForm.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilFields = data.data.data;
          if (this.searchForm.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.searchForm.ogfId = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.searchForm.ogfId = this.oilFields[0].ogfId ? this.oilFields[0].ogfId : undefined;
          }
        }
      });
      //平台
      await QueryPlatformDetail({ ogfId: this.searchForm.ogfId }).then((res) => {
        if (res.data.code == 200) {
          let platforms = res.data.data;
          // this.searchForm.platId = platforms[0].platformId;
          this.platforms = platforms;
        }
      });
      //井号
      await QueryWellDetail({
        ogfId: this.searchForm.ogfId,
      }).then((res) => {
        if (res.data.code == 200) {
          this.wells = res.data.data;
          this.wells.unshift({ wellId: "", wellName: "全部" });
        }
      });
      this.getWellOutputWaveTable();
    },
    //油田下拉-change
    onFieldChange(val) {
      QueryPlatformDetail({ ogfId: val }).then((res) => {
        if (res.data.code == 200) {
          this.platforms = res.data.data;
        }
      });
    },
    //平台下拉-change
    onPlatfromChange(val) {
      this.wells = [];
      QueryWellDetail({
        ogfId: this.searchForm.ogfId,
        platformId: this.searchForm.platId || undefined,
      }).then((res) => {
        if (res.data.code == 200) {
          this.wells = res.data.data;
        }
      });
      this.wells.unshift({ wellId: "", wellName: "全部" });
      this.searchForm.wellId = "";
    },
    //产量波动统计表
    getWellOutputWaveTable(isWellIdsNull) {
      this.searchForm.ogfName = this.oilFields.filter((item) => item.ogfId === this.searchForm.ogfId)[0].ogfName || "";
      if (this.searchForm.wellId || isWellIdsNull) {
        this.searchForm.wellIds = [];
      }
      getWellOutputWaveTable(this.searchForm).then((res) => {
        if (res.data.code == 200) {
          let tableData = res.data.data;
          let minMax = [];
          if (tableData.length) {
            tableData.forEach((el, i) => {
              if (el.oilProdDaily !== null) {
                //产油对比
                let comparisonOilProduction = this.numReduce(
                  el.oilProdDailyCompare ? el.oilProdDailyCompare : "0.0",
                  el.oilProdDaily,
                );
                tableData[i].comparisonOilProduction = comparisonOilProduction;
                minMax.push(Math.abs(comparisonOilProduction));
              }
            });
            this.min = Math.min(...minMax);
            this.max = Math.max(...minMax);
            let numScale = D3.scaleLinear();
            let linearScale = numScale.domain([this.min, this.max]).range([this.min2, this.max2]);
            tableData.forEach((el, i) => {
              if (el.oilProdDaily !== null) {
                //产油对比
                tableData[i].comparisonOilWidth = linearScale(Math.abs(el.comparisonOilProduction));
              }
            });
            console.log("table数据", tableData);
            this.tableData = tableData;
          } else {
            this.tableData = [];
          }
        }
      });
    },
    //两数相减
    numReduce(num1, num2) {
      if (!num1) {
        num1 = "0";
      }
      if (!num2) {
        num2 = "0";
      }
      const num1Digits = (num1.toString().split(".")[1] || "").length;
      const num2Digits = (num2.toString().split(".")[1] || "").length;
      const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
      const num = (num1 * baseNum - num2 * baseNum) / baseNum;
      const rnum = num.toFixed(2);
      return Number(rnum);
    },
    //保留两位小数
    formatter(row, column, cellValue, index) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(2)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
    //返回
    goBack() {
      if (this.$route.query.page) {
        this.$router.push({
          path: "/" + this.$route.query.page,
        });
      } else if (this.$route.query.name) {
        this.$router.push({
          name: this.$route.query.name,
        });
      } else {
        this.$router.push({
          path: "/yield/fluctuationWarningAnalysis",
        });
      }
    },
    //下载导出csv文件
    doDownIndex() {
      exportExcel("#tableData", `${this.searchForm.ogfName}单井产量变化`);
    },
    //自定义井号排序
    borepipeNoSort(oa, ob, code) {
      let wellA = oa[code];
      let wellB = ob[code];
      return Number(oa[code]) - Number(ob[code]);
    },
    borepipeNoSort1(oa, ob) {
      return Number(oa) - Number(ob);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .z-container {
    flex: 1;
    height: 0;
  }
  #tableData {
    ::v-deep .el-table__fixed-header-wrapper,
    ::v-deep .el-table__header-wrapper {
      .el-table__header {
        thead {
          tr:last-child {
            .cell {
              height: auto;
              line-height: 18px;
              white-space: pre;
              display: flex;
              justify-content: center;
            }
          }
        }
      }
    }
    ::v-deep .cell:empty {
      &::before {
        content: "-";
      }
    }
  }
}
</style>
