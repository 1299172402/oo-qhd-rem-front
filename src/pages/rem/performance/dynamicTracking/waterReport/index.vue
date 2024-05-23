<!-- 水井分析报告 -->
<template>
  <div class="app-container" style="overflow-y: scroll">
<!--      单井基本信息表-->
      <el-row :gutter="20">
          <individualWellBasicInformationSheet ref="toolchild0"></individualWellBasicInformationSheet>
      </el-row>
<!--      生产简史-->
      <el-row :gutter="20">
          <homeworkWellHistory ref="toolchild1" ></homeworkWellHistory>
      </el-row>
<!--      分层调配-->
      <el-row :gutter="20">
          <stratificationTesting ref="toolchild2"></stratificationTesting>
      </el-row>
<!--      生产指标-->
      <el-row :gutter="20">
          <productionData ref="toolchild3" ></productionData>
      </el-row>
<!--      吸水剖面-->
      <el-row :gutter="20">
          <fluidProducingProfile ref="toolchild4" ></fluidProducingProfile>
      </el-row>
<!--      临井数据-->
      <el-row :gutter="20">
          <nearWell ref="toolchild5" ></nearWell>
      </el-row>
<!--      示踪剂-->
      <el-row :gutter="20">
          <tracer ref="toolchild6" ></tracer>
      </el-row>
<!--      井斜数据-->
      <el-row :gutter="20">
          <driftData ref="toolchild7" ></driftData>
      </el-row>
<!--      射孔数据-->
      <el-row :gutter="20">
          <perforationData ref="toolchild8" ></perforationData>
      </el-row>
<!--      测井解释成果-->
      <el-row :gutter="20">
          <loggingInterpretationResult ref="toolchild9" ></loggingInterpretationResult>
      </el-row>
<!--      井网图-->
      <el-row :gutter="20">
          <wellNetworkDiagram ref="toolchild10" ></wellNetworkDiagram>
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
        wellId: {},
    },
    watch:{
        wellId:{
            handler(Nval){
                this.queryData.selectWellId = Nval
            },
            deep:true
        }
    },
  data() {
    return {
        queryData:{},
    };
  },
    mounted() {
        this.getinfo()
    },
  methods: {
      getinfo() {
          (this.queryData.ogfId = this.oilFeildId),
              (this.queryData.assetCode = this.platform),
              (this.queryData.selectWellId = this.wellId);
          for (let i = 0, j = 10; i <= j; i++) {
              const child = this.$refs[`toolchild${i}`];
              child.passValue(this.queryData);
          }
      },
      changewell(val){
          this.$refs.toolchild3.changeWellid(val)
      },
      queryAll(val){
          (this.queryData.ogfId = val.oilFeildId),
              (this.queryData.assetCode = val.platform),
              (this.queryData.selectWellId = val.wellId);
          for (let i = 0, j = 10; i <= j; i++) {
              const child = this.$refs[`toolchild${i}`];
              child.passValue(this.queryData);
          }
      },
  },
};
</script>
<style lang="less" scoped>
</style>
