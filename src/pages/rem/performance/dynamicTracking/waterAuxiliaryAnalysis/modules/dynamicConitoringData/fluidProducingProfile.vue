<!--产液剖面-->
<template>
        <el-row style="height: 600px;" :gutter="10">
          <el-col :span="12" style="overflow: auto;">
            <!--<el-image :src="src"></el-image>-->
            <el-image :src="image">
              <div slot="error">
              </div>
            </el-image>
          </el-col>
          <el-col :span="12">
            <span class="tableTitle"> 吸水剖面测井结果</span>
            <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="600">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="borepipeName" label="井名称" align="center" width="140"></el-table-column>
              <el-table-column prop="wellTestProjectInterpId" label="试井项目解释标识" width="140" align="center">
              </el-table-column>
              <el-table-column prop="layerName" label="解释层位" width="140" align="center">
              </el-table-column>
              <el-table-column prop="topDepth" :render-header="renderHeader" label="顶界深度 (m)" width="120" align="center">
              </el-table-column>
              <el-table-column prop="bottomDepth" :render-header="renderHeader" label="底界深度 (m)" align="center" width="120"></el-table-column>
              <el-table-column prop="startPress" :render-header="renderHeader" label="启动压力 (MPa)" align="center" width="120">
              </el-table-column>
              <el-table-column prop="apparentInjectivityIndex" :render-header="renderHeader" label="视吸水指数 (m³/(MPa·d))" align="center" width="140">
              </el-table-column>
              <el-table-column prop="waterInjectivityIndex" :render-header="renderHeader" label="吸水指数 (m³/(MPa·d))" align="center" width="140">
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center" min-width="180">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
</template>
<style lang="scss" scoped>
.tableTitle {
  font-size: 1.5em;
  text-align: center;
  display: block;
}
</style>
<script>
import {outProfileLoggingInterpretation} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
import {exportExcel} from "@/lib/exportExcel.js";
export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {}
  },
  data() {
    return {
      radio: 3,
      src:
          "../../static/img/oilAuxiliaryAnalysis/productionDynamicData/fluidProducingProfile.jpg",
      tableData: [],
      image: '',
    };
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 根据父组件传递过来的参数进行查询
     */
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      outProfileLoggingInterpretation(request).then((res) => {
        if (res.data.code == 0) {
          let imgData = res.data.data.data;
          let type = res.data.data.fileType;
          let firstParty='data:'+type+';base64,';
          if(imgData){
            this.image=firstParty+imgData;
          } else{
            this.image = '';
          }
          //注意这里返回有水井和油井的区别
          this.tableData = res.data.data.injectivityIndexs;
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '产液剖面';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      if(this.image)
        downFile(this.image,fileName);
      exportExcel('#tableData',fileName);
    },
    /**
     * hwh el table 表格头 标题单位样式
     * @param h
     * @param column
     * @returns {*[]}
     */
    renderHeader (h, {column}) {
      let header = column.label.split(' ');
      return [h('p', [
        h('p', {}, header[0]),
        h('span', {}, header[1])
      ])];
    }
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>