<!--压力测试-->
<template>
  <NormalCard class="mt-2">
    <el-row>
      <span class="tableTitle"> 压力数据</span>
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
            prop="borepipeName"
            label="井管"
            align="center"
            width="140"
        >
        </el-table-column>
        <el-table-column
            prop="wellInterceptType"
            label="试井项目解析类型"
            width="140"
            align="center"
        >
        </el-table-column>
        <!--<el-table-column
            prop="layerName"
            label="油气组"
            align="center"
        >
        </el-table-column>-->
        <el-table-column
            prop="reducePressure"
            :render-header="renderHeader"
            label="折算压力梯度 (MPa/100m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="reduceTemperature"
            :render-header="renderHeader"
            label="折算温度梯度 (℃/100m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="midMD"
            :render-header="renderHeader"
            label="油层中部斜深 (m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="midTVD"
            :render-header="renderHeader"
            label="油层中部垂深 (m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="midTemperature"
            :render-header="renderHeader"
            label="油层中部温度 (℃)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="midFlowPressure"
            :render-header="renderHeader"
            label="油层中部流压 (MPa)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="midStaticPressure"
            :render-header="renderHeader"
            label="油层中部静压 (MPa)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="baseLevelTVD"
            :render-header="renderHeader"
            label="基准面垂深 (m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="baseLevelTemperature"
            :render-header="renderHeader"
            label="基准面温度 (℃)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="baseStaticPressure"
            :render-header="renderHeader"
            label="基准面静压 (MPa)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="baseFlowPressure"
            :render-header="renderHeader"
            label="基准面流压 (MPa)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="owTVD"
            :render-header="renderHeader"
            label="油水界面垂深 (m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="goTVD"
            :render-header="renderHeader"
            label="气油界面垂深 (m)"
            width="140"
            align="center"

        >
        </el-table-column>
        <el-table-column
            prop="gwTVD"
            :render-header="renderHeader"
            label="气水界面垂深 (m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="baseLevelAltitude"
            :render-header="renderHeader"
            label="基准面海拔 (m)"
            width="140"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="remark"
            width="200"
            label="备注">
        </el-table-column>
      </el-table>
    </el-row>
  </NormalCard>
</template>
<style lang="scss" scoped>
.tableTitle {
  font-size: 1.5em;
  text-align: center;
  display: block;
}
</style>
<script>
import NormalCard from '@/components/tools/NormalCard';
import {pressure} from "@/api/rem-01/dynamicAnalysis";
import {exportExcel} from "@/lib/exportExcel";

export default {
  components: {
    NormalCard,
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
     * 根据父组件传递过来的参数进行查询
     */
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      pressure(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.pressureTest;
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '压力测试';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
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
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>