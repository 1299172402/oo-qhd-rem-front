<!--饱和度测井-->
<template>
      <!-- <NormalCard class="mt-2"> -->
        <el-row :gutter="10">
          <el-col :span="12">
            <!--<el-image :src="src"></el-image>-->
            <el-image :src="image">
              <div slot="error">
              </div>
            </el-image>
          </el-col>
          <el-col :span="12" style="text-align: center">
            <span class="tableTitle"> 饱和度测井数据：</span>
            <el-table
                id="tableData"
                highlight
                :data="tableData"
                style="width: 100%"
                height="600"
            >
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
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  prop="beginDate"
                  label="解释开始时间"
                  width="120"
                  align="center"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.beginDate | dateTimeFormat}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="endDate"
                  label="解释完成时间"
                  width="120"
                  align="center"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.endDate | dateTimeFormat}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="layerName"
                  label="解释层位"
                  align="center"
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  prop="topDepth"
                  :render-header="renderHeader"
                  label="顶界深度 （m）"
                  align="center"
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  prop="bottomDepth"
                  :render-header="renderHeader"
                  label="底界深度 （m）"
                  align="center"
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  prop="originalWaterSaturation"
                  :render-header="renderHeader"
                  label="含水饱和度 （%）"
                  align="center"
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  prop="waterSaturation"
                  :render-header="renderHeader"
                  label="含油饱和度 （%）"
                  align="center"
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  prop="waterVeriation"
                  :render-header="renderHeader"
                  label="含气饱和度 （%）"
                  width="140"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="conclusion"
                  label="解释结论"
                  align="center"
                  min-width="180"
              >
              </el-table-column>
              <el-table-column
                  prop="remark"
                  label="备注"
                  min-width="180"
                  align="center"
              >
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      <!-- </NormalCard> -->
</template>
<style lang="scss" scoped>
.tableTitle {
  font-size: 1.5em;
  text-align: center;
  display: block;
}
</style>
<script>
// import NormalCard from '@/components/tools/NormalCard';
import {saturationLoggingInterpretation} from "@/api/oilDeposit/rem-01/dynamicAnalysis";
// import {downFile} from "@/lib/remBase64Download";
// import {exportExcel} from "@/lib/exportExcel";
export default {
  components: {
    // NormalCard,
  },
  filters: {
    /**
     * hwh
     * 处理事件格式
     * @param val
     * @returns {string|*}
     */
    dateTimeFormat(val){
      if(val){
        return   new Date(val).format('yyyy-MM-dd');
      } else{
        return '';
      }
    }
  },
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
        if (res.data.code == 200) {
          let imgData = res.data.data.data;
          let type = res.data.data.type;
          let firstParty='data:'+type+';base64,';
          if(imgData){
            this.image=firstParty+imgData;
          } else{
            this.image = '';
          }
          this.tableData = res.data.data.saturationLoggingInterpretations;
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '饱和度测井';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      if(this.image){
        // downFile(this.image,fileName);
        // exportExcel('#tableData',fileName);
      }
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
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>