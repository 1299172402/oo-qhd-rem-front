<template>
  <div class="app-container">
    <!--        <headerSearch  height="auto">-->
    <div>
      <header-search class="g-w100 g-h100" style="height: auto; align-items: center">
        <el-form label-width="60px" style="">
          <el-row style="display: flex; margin-top: 25px">
            <el-form-item label="油田：">
              <el-select v-model="queryData.ogfId">
                <el-option
                  v-for="item in oilList"
                  :key="item.oilFieldId"
                  :label="item.oilFieldName"
                  :value="item.oilFieldId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="区块：">
              <el-select v-model="queryData.blockId" @change="changeBlock">
                <el-option
                  v-for="item in blockList"
                  :key="item.fieldId"
                  :label="item.name"
                  :value="item.fieldId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井别：">
              <el-select v-model="queryData.wellCategory" filterable @change="changeWell">
                <el-option
                  v-for="item in wellCategoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井号：">
              <el-select v-model="queryData.wellId" filterable clearable>
                <el-option v-for="item in wellList" :key="item.wellId" :label="item.wellName" :value="item.wellId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="时间：">
              <el-date-picker
                v-model="queryData.value"
                type="daterange"
                style="width: 250px"
                placeholder="请选择"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="createChange"
              ></el-date-picker>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="doSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" class="commonBtn" @click="resettingQuery">重置</el-button>
          </el-row>
        </el-form>
      </header-search>
    </div>
    <!--        </headerSearch>-->
    <pagePanel headerTitle="产量劈分" style="height: 100%" class="g-w100" :show-btn="true">
      <el-row>
        <el-col :span="22">
          <el-button type="primary" style="margin-left: 20px" @click="splitSection('splitSection')">劈分剖面</el-button>
          <el-button type="primary" style="margin-left: 20px" @click="splitSection('DividingCoefficient')"
            >劈分系数</el-button
          >
        </el-col>
        <el-col :span="1">
          <el-button class="commonBtn" type="primary" @click="doExportFile" icon="el-icon-download">下载</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        v-if="queryData.wellCategory == '01'"
        row-key="id"
        id="clpf"
        highlight
        height="600px"
        style="width: 100%; margin-top: 10px"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="井号/层段" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="airPermeability" align="center" label="渗透率（mD）" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.airPermeability }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="thicknessEffe" align="center" label="有效厚度（m）" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.thicknessEffe }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="oilSplitData" label="产油量（m³）" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.oilSplitData }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="oilRatio" label="产油量占比（%）" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.oilRatio }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="waterSplitData" label="产水量（m³）" align="center" min-width="100">
          <!-- <template slot-scope="scope">
                    <span>{{ Math.round(scope.row.waterSplitData / 100) }}</span>
                  </template> -->
        </el-table-column>

        <el-table-column prop="waterRatio" label="产水量占比（%）" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.waterRatio }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="tableData"
        v-else
        row-key="id"
        id="clpf"
        highlight
        height="calc(100% - 80px)"
        style="width: 100%; margin-top: 10px"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="井号/层段" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="airPermeability" align="center" label="渗透率(mD)" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.airPermeability }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="thicknessEffe" align="center" label="有效厚度（m）" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.thicknessEffe }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="waterRatio" label="注水量（m³）" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ Math.round(scope.row.waterRatio) }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="waterSplitData" label="注水占比（%）" align="center" min-width="100">
          <!-- <template slot-scope="scope">
                    <span>{{ Number(scope.row.waterSplitData / 100).toFixed(1) }}</span>
                  </template> -->
        </el-table-column>

        <!-- <el-table-column prop="waterRatio" label="产水量占比(%)" align="center" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.waterRatio }}</span>
                </template>
                </el-table-column>-->

        <el-table-column prop="remark" label="备注" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>
<script>
import {
  getProductionSplit,
  getOgfInfo,
  getblockData,
  getWellData,
  exportProductionSplit,
} from "@/api/rem/injection.js";
import { fetchProductionWells, fetchInjectionWells } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { getOilFieldList, queryLayerList } from "@/api/rem/workcompanydesignate";
import { fetchFields } from "@/api/rem/primaryinfoqhdrem";
import FileSaver from "file-saver";
let timeNew = new Date();
timeNew.setMonth(timeNew.getMonth() - 1);
timeNew.setDate(1);
let lastDay = new Date(timeNew.getFullYear(), timeNew.getMonth() + 1, 0);
let stopTime = new Date("2020-1-1");
let filterTime = new Date();
export default {
  name: "app",
  //   components: {
  //   },
  data() {
    return {
      queryData: {
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F", //油田
        blockId: "6CD7342CA6DD418183A4B3BC38584F7C", //区块
        wellCategory: "01", //井别
        wellId: "DA0269628E74490ABDE198E7D1DBF3EA", //井号
        value: [timeNew.format("YYYY-MM-DD"), lastDay.format("YYYY-MM-DD")],
        // ['2022-10-24', '2022-11-24']
        startTime: "",
        endTime: "",
      },
      fixedTime: [],
      //油田下拉框
      oilList: [],
      datePickOptions: {
        disabledDate: (time) => {
          if (time.getTime() > filterTime.getTime()) {
            return true;
          } else if (time.getTime() < stopTime.getTime()) {
            return true;
          } else {
            return false;
          }
        },
      },
      //区块下拉
      blockList: [],
      //井别下拉
      wellCategoryList: [
        { id: "01", name: "油井" },
        { id: "02", name: "水井" },
      ],
      //井号下拉
      wellList: [],
      //table表格数据
      tableData: [],
      //已完成条数
      finishNum: 0,
    };
  },
  created() {
    const params = JSON.parse(localStorage.getItem("PRODUCTION_SPLIT"));
    if (params && params.blockId) {
      console.log(params);
      this.queryData.ogfId = params.ogfId;
      this.queryData.blockId = params.blockId;
      this.queryData.wellCategory = params.wellCategory;
      this.queryData.value = params.value;
      this.queryData.wellId = params.wellId[0].wellId;
      localStorage.removeItem("PRODUCTION_SPLIT");
    } else {
      this.queryData.wellCategory = "01";
    }
    this.queryOilFeild();
    this.queryBlockFeild();
    this.queryWellData();
    this.createChange(this.queryData.value);
    this.queryProductionSplit();
  },
  //方法
  methods: {
    createChange(dates) {
      if (dates && dates.length == 2) {
        this.queryData.startTime = dates[0];
        this.queryData.endTime = dates[1];
      } else {
        this.queryData.startTime = "";
        this.queryData.endTime = "";
      }
    },
    /**
     * 获取油田
     */
    queryOilFeild() {
      getOilFieldList({ orgId: "715AD1CD60484BB59E737CD18A9DE44A" }).then((res) => {
        this.oilList = res.data.data;
      });
    },
    /**
     * 获取区块
     */
    queryBlockFeild() {
      let param = {
        oilFieldId: this.queryData.ogfId,
      };
      fetchFields(param).then((res) => {
        this.blockList = res.data.data.fields;
      });
    },
    /**
     * 改变区块
     */
    changeBlock(e) {
      console.log(e);
      this.queryData.wellId = [];
      if (this.queryData.wellCategory) {
        this.queryWellData();
      }
    },
    /**
     * 改变井别
     */
    changeWell() {
      if (this.queryData.blockId) {
        this.queryData.wellId = [];
        this.tableData = [];
        this.queryWellData();
      }
    },
    /**
     * 井号下拉
     */
    queryWellData() {
      // { id: "01", name: "油井" },
      //   { id: "02", name: "水井" },
      if (this.queryData.wellCategory == "01") {
        let paraPlatForm = {
          oilFieldId: this.queryData.ogfId,
        };
        fetchProductionWells(paraPlatForm).then((res) => {
          //判断联通状态
          if (res.data.code == 200) {
            let wellList = res.data.data.productionWells;
            this.wellList = wellList.filter((el) => el.wellName);
            this.queryProductionSplit();
          }
        });
      } else {
        let paraPlatForm = {
          oilFieldId: this.queryData.ogfId,
        };
        fetchInjectionWells(paraPlatForm).then((res) => {
          //判断联通状态
          if (res.data.code == 200) {
            // let wellList = res.data.data.productionWells;
            // this.wellList = wellList.filter((el) => el.wellName);
            this.wellList = res.data.data.injectionWell;
            this.queryData.wellId = this.wellList[0].wellId;
            this.queryProductionSplit();
          }
        });
      }
    },
    /**
     * 获取表格数据
     */
    queryProductionSplit() {
      let params = {
        endTime: this.queryData.endTime,
        startTime: this.queryData.startTime,
        wellIdList: this.queryData.wellId,
        wellType: this.queryData.wellCategory,
        blockId: this.queryData.blockId,
      };
      if (this.queryData.wellId.length == 0 || this.queryData.value.length == 0) {
        this.tableData = [];
        this.$message({
          message: "井号，时间未选择",
          type: "error",
          duration: 1500,
        });
        return;
      }
      getProductionSplit(params).then((res) => {
        res.data.data.forEach((item) => {
          item.name = item.wellNo;
          item.id = item.wellId;
          item.airPermeability = Math.floor(item.airPermeability);
          item.oilSplitData = Math.floor(item.oilSplitData);
          // item.waterSplitData = item.waterSplitData * 100;
          item.oilRatio = Number(item.oilRatio).toFixed(1);
          item.waterRatio = Number(item.waterRatio).toFixed(1);
          item.thicknessEffe = Number(item.thicknessEffe).toFixed(1);
          if (item.intervaData) {
            item.children = item.intervaData;
            item.intervaData.forEach((inter) => {
              inter.name = inter.intervNo;
              inter.id = inter.intervId;
              inter.airPermeability = Math.floor(inter.airPermeability);
              inter.oilSplitData = Math.floor(inter.oilSplitData);
              inter.thicknessEffe = Number(inter.thicknessEffe).toFixed(1);
              inter.oilRatio = Number(inter.oilRatio).toFixed(1);
              // inter.waterSplitData = inter.waterSplitData * 100
              inter.waterRatio = Number(inter.waterRatio).toFixed(1);
              if (inter.layerData && inter.layerData.length > 0) {
                inter.layerData.map((layer) => {
                  layer.name = layer.layerNo;
                  layer.id = layer.layerId;
                  layer.airPermeability = Math.floor(layer.airPermeability);
                  layer.oilSplitData = Math.floor(layer.oilSplitData);
                  layer.thicknessEffe = Number(layer.thicknessEffe).toFixed(1);
                  layer.oilRatio = Number(layer.oilRatio).toFixed(1);
                  // layer.waterSplitData = layer.waterSplitData * 100
                  layer.waterRatio = Number(layer.waterRatio).toFixed(1);
                  return layer;
                });
                inter.children = inter.layerData;
              }
            });
          }
        });
        console.log(res);
        this.tableData = res.data.data;
      });
    },
    /**
     * 下载
     */
    doExportFile() {
      // exportExcel("#clpf", "产量劈分");
      exportProductionSplit({
        endTime: this.queryData.endTime,
        startTime: this.queryData.startTime,
        wellIdList: this.queryData.wellId.join(","),
        wellType: this.queryData.wellCategory,
      }).then((res) => {
        const aBlob = new Blob([res]);
        FileSaver.saveAs(aBlob, `产量劈分.xls`);
      });
    },
    /**
     * 搜索
     */
    doSearch() {
      this.queryProductionSplit();
    },

    /**
     * 劈分剖面
     */
    splitSection(str) {
      if (this.queryData.wellId) {
        let arr = [];
        this.queryData.wellId;
        this.wellList.forEach((data) => {
          if (this.queryData.wellId == data.wellId) {
            let obj = {
              wellName: data.wellName,
              wellId: data.wellId,
            };
            arr.push(obj);
          }
        });
        let crr = {
          ogfId: this.queryData.ogfId, //油田
          blockId: this.queryData.blockId, //区块
          wellCategory: this.queryData.wellCategory, //井别
          wellId: arr, //井号
          value: this.queryData.value,
        };
        localStorage.setItem("PRODUCTION_SPLIT", JSON.stringify(crr));
        this.$router.push({
          name: str,
          params: crr,
        });
      } else {
        this.$message.error("请填写完毕");
      }
    },
    //重置
    resettingQuery() {
      this.queryData.blockId = this.blockList[0].fieldId;
      this.queryData.wellCategory = this.wellCategoryList[0].id;
      let paraPlatForm = {
        oilFieldId: this.queryData.ogfId,
      };
      fetchProductionWells(paraPlatForm).then((res) => {
        //判断联通状态
        if (res.data.code == 200) {
          let wellList = res.data.data.productionWells;
          this.wellList = wellList.filter((el) => el.wellName);

          this.queryData.wellId = "DA0269628E74490ABDE198E7D1DBF3EA";
        }
      });
      this.queryData.value = [timeNew.format("YYYY-MM-DD"), lastDay.format("YYYY-MM-DD")];
      this.queryProductionSplit();
    },
    /**
     * 劈分系数
     */
    // splitCoefficient () {
    //   if (this.queryData.wellId.length > 0) {
    //     let arr = []
    //     this.queryData.wellId.forEach(item => {
    //       this.wellList.forEach(data => {
    //         if (item == data.wellId) {
    //           let obj = {
    //             wellName: data.wellName,
    //             wellId: data.wellId
    //           }
    //           arr.push(obj)
    //         }
    //       })
    //     })
    //     this.$router.push({
    //       name: "DividingCoefficient",
    //       params: {
    //         ogfId: {
    //           value: this.queryData.ogfId.value,
    //           label: this.queryData.ogfId.label,
    //         }, //油田
    //         blockId: {
    //           value: this.queryData.blockId.value,
    //           label: this.queryData.blockId.label,
    //         }, //区块
    //         wellCategory: this.queryData.wellCategory, //井别
    //         wellId: arr, //井号
    //         value: this.queryData.value,
    //       }
    //     });
    //   } else {
    //     this.$message.error("请填写完毕")
    //   }
    // },
  },
};
</script>
<style scoped lang="scss"></style>
