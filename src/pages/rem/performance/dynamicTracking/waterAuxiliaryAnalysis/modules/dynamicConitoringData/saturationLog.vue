<!--饱和度测井-->
<template>
  <el-container>
    <el-main>
        <el-row style="padding-top:20px ">
          <el-col :span="5">
          <!--  <el-image :src="src"></el-image>-->
            <el-image :src="image"></el-image>
          </el-col>
          <el-col :span="16" style="text-align: center">
            <span class="tableTitle"> 饱和度测井数据：</span>
            <el-table
                highlight
                :data="tableData"
                style="width: 100%">
              <el-table-column
                  type="index"
                  label="序号"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="wellBore"
                  label="井筒"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="beginDate"
                  label="解释开始时间"
                  width="100"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="endDate"
                  label="解释完成时间"
                  width="100"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="layerName"
                  label="解释层位"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="topDepth"
                  label="顶界深度（m）"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="bottomDepth"
                  label="底界深度（m）"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="originalWaterSaturation"
                  label="含水饱和度（%）"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="waterSaturation"
                  label="含油饱和度（%）"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="waterVeriation"
                  label="含气饱和度（%）">
              </el-table-column>
              <el-table-column
                  prop="conclusion"
                  label="解释结论">
              </el-table-column>
              <el-table-column
                  prop="remark"
                  label="备注">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
 
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.tableTitle {
  font-size: 1.5em;
  text-align: center;
  display: block;
}
</style>
<script>
import {saturationLoggingInterpretation} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";

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
      src: '../../static/img/oilAuxiliaryAnalysis/productionDynamicData/fluidProducingProfile.jpg',
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
      saturationLoggingInterpretation(request).then((res) => {
        if (res.data.code == 0) {
          this.image = 'data:;base64,'+res.data.data.data;
          this.tableData = res.data.data.saturationLoggingInterpretations;
        }
      })
    }
  },
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>