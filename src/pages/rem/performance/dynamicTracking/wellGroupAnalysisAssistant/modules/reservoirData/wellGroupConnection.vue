<!--井组连通图-->
<template>
  <el-container class="mt-2">
    <el-main>
      <div>
        <el-row>
          <el-col :span="16" style="overflow: auto;">
            <el-image :src="image">
              <div slot="error">
              </div>
            </el-image>
          </el-col>
          <el-col :span="8">
            <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="600">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="proWell" label="井名" align="center"></el-table-column>
              <el-table-column prop="wellType" label="井别" align="center"></el-table-column>
              <!--<el-table-column prop="layerThickness" label="油层厚度"></el-table-column>
              <el-table-column prop="injWell" label="注水井"></el-table-column>
              <el-table-column prop="injLayer" label="水井层位"></el-table-column>
              <el-table-column prop="injLayerThickness" label="水井层位厚度"></el-table-column>-->
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import {conectionPlot} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
import {exportExcel} from "@/lib/exportExcel.js";
export default {
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //层系id
    layerId: {},
    //井组id
    wellGroupId: {}
  },
  data() {
    return {
      image: '',
      tableData: [],
    };
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 调用图片
     */
    doSearch() {
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
      };
      conectionPlot(request).then((res) => {
        if (res.data.code == 0) {
          let imgData = res.data.data.data;
          let type = res.data.data.type;
          let firstParty='data:'+type+';base64,';
          if(imgData){
            this.image=firstParty+imgData;
          } else{
            this.image = '';
          }
          this.tableData = res.data.data.wellGroupConnections;
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '井组连通图';
      if(this.wellGroupName){
        fileName = this.wellGroupName + fileName;
      }
      downFile(this.image,fileName);
      exportExcel('#tableData',fileName);
    }

  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>