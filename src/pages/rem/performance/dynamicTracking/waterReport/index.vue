<!-- 水井分析报告 -->
<template>
  <div class="app-container">
<!--      单井基本信息表-->
      <el-row :gutter="20">
          <individualWellBasicInformationSheet :queryData="queryData"></individualWellBasicInformationSheet>
      </el-row>
<!--      生产简史-->
      <el-row :gutter="20">
          <homeworkWellHistory :queryData="queryData"></homeworkWellHistory>
      </el-row>
<!--      分层调配-->
      <el-row :gutter="20">
          <stratificationTesting :queryData="queryData"></stratificationTesting>
      </el-row>
<!--      生产指标-->
      <el-row :gutter="20">
          <productionData :queryData="queryData"></productionData>
      </el-row>
<!--      吸水剖面-->
      <el-row :gutter="20">
          <fluidProducingProfile :queryData="queryData"></fluidProducingProfile>
      </el-row>
<!--      预测-->
      <el-row :gutter="20">
          <predict :queryData="queryData"></predict>
      </el-row>
<!--      基础数据-->
<!--      <el-row :gutter="20">-->
<!--          <fundamentalData :queryData="queryData"></fundamentalData>-->
<!--      </el-row>-->
<!--      临井数据-->
      <el-row :gutter="20">
          <nearWell :queryData="queryData"></nearWell>
      </el-row>
<!--      示踪剂-->
      <el-row :gutter="20">
          <tracer :queryData="queryData"></tracer>
      </el-row>
<!--      井斜数据-->
      <el-row :gutter="20">
          <driftData :queryData="queryData"></driftData>
      </el-row>
<!--      射孔数据-->
      <el-row :gutter="20">
          <perforationData :queryData="queryData"></perforationData>
      </el-row>
<!--      测井解释成果-->
      <el-row :gutter="20">
          <loggingInterpretationResult :queryData="queryData"></loggingInterpretationResult>
      </el-row>
<!--      井网图-->
      <el-row :gutter="20">
          <wellNetworkDiagram :queryData="queryData"></wellNetworkDiagram>
      </el-row>
  </div>
</template>

<script>
import {
  fetchOilFields,
  fetchPlatforms,
  fetchProductionWells,
  fetchInjectionWells,
  fetchInjectionWellsByPlatform,
  uploadFile,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
const moduleFiles = import.meta.globEager(`./modules/*/index.vue`);
const moduleName = Object.entries(moduleFiles).reduce(
  (t, i) =>
    Object.assign(t, {
      [i[0].replace(/\.\/modules\/(\S+)\/index.vue/, "$1")]: i[1].default,
    }),
  {},
);
export default {
  components: {
    ...moduleName,
  },
    props: {
        //选择油田
        oilFeildId: {},
        //选择平台
        platform: {},
        //选择井号
        wellId: {}
    },
    computed:{
        getoilFeildId(){
            return this.oilFeildId
        },
        getPlatform(){
            return this.platform
        },
        getWellId(){
            return this.wellId
        }
    },
    // watch:{
    //     oilFeildId:{
    //         handler(Nval){
    //             this.queryData.ogfId = Nval
    //             console.log(Nval);
    //         },
    //         deep:true
    //     },
    //     platform:{
    //         handler(Nval){
    //             this.queryData.platform = Nval
    //             console.log(Nval);
    //         },
    //         deep:true
    //     },
    //     wellId:{
    //         handler(Nval){
    //             this.queryData.selectWellId = Nval
    //             console.log(Nval);
    //         },
    //         deep:true
    //     }
    // },
  data() {
    return {
      oilField: "",
      wellData: [],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // 油田下拉框
      oilFields: [],
      platforms: [],
      deptSelect: [
        {
          deptId: "715AD1CD60484BB59E737CD18A9DE44A  ",
          deptName: "秦皇岛32-6渤中作业公司",
        },
      ], //作业公司
      noticeList: [], // 表格数据
      datalist: [], //下方表格数据
      // 显示搜索条件
      queryData: {
        assetCode: "",
        ogfId: "",
        orgId: "",
        selectWellId: "",
      },
    };
  },
  created() {
    // this.getList();
      this.queryAll()
  },
  methods: {
      queryAll(){
          this.queryData = {
              ogfId : this.oilFeildId,
              platform : this.platform,
              selectWellId : this.wellId
          }
      },
    getList() {
      fetchOilFields().then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data.oilFields;
          if (this.oilFields.length == 0) {
            this.oilField = "";
          } else {
            this.oilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          }
          this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          const requestPlat = {
            oilFieldId: this.selectOilField,
          };
          fetchPlatforms(requestPlat).then((res) => {
            if (res.data.code == 200) {
              this.platforms = res.data.data.platform;
              this.queryData.assetCode = "3FC9A818F5BC43B88270DB80BBB3018F";
            }
          });
        }
      });
      let request = {
        oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
      };
      fetchProductionWells(request).then((res) => {
        if (res.data.code == 200) {
          let wellData = res.data.data.productionWells;
          this.wellData = wellData.filter((el) => el.wellName);
          this.queryData.selectWellId = "09D30C16BD1D4F759D53F74941701307";
        }
      });
    },
    getData() {
      for (let i = 0, j = 11; i <= j; i++) {
        const child = this.$refs[`toolchild${i}`];
        child.passValue(this.queryData);
      }
    },
    getFetchProductionWellsByPlatform(platformId) {
      let request = { platformId };
      fetchInjectionWellsByPlatform(request).then((res) => {
        if (res.data.code == 200) {
          this.wellData = res.data.data.injectionWell;
        }
      });
    },
    //查询油井信息
    getFetchProductionWells(oilFieldId) {
      let request = { oilFieldId: oilFieldId };
      fetchInjectionWells(request).then((res) => {
        if (res.data.code == 200) {
          this.wellData = res.data.data.injectionWell;
        }
      });
    },
    doChangePT(val) {
      this.queryData.selectWellId = "";
      if (this.queryData.ogfId == val) {
        this.getFetchProductionWells(val);
      } else {
        this.getFetchProductionWellsByPlatform(val);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  //.el-table {
  //  overflow: scroll;
  //}
}

//::v-deep .el-table__header-wrapper {
//  .cell {
//    height: auto !important;
//  }
//}


::v-deep .el-table__body-wrapper {
  height: calc(100% - 70px) !important;
}
</style>
