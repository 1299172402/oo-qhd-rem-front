<!--原油粘度-->
<template>
  <NormalCard class="mt-2">
    <el-row>
      <el-table
          id="tableData"
          highlight
          :data="tableData"
          style="width: 100%;"
          height="600"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="80"
        ></el-table-column>
        <el-table-column
            prop="borepipeNo"
            label="井号"
            align="center"
            width="180"
        ></el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            align="center"
            min-width="140"
        ></el-table-column>
        <el-table-column
            prop="sampleId"
            label="流体样品类型"
            align="center"
            min-width="100"
        ></el-table-column>
        <el-table-column
            prop="den"
            :render-header="renderHeader"
            label="原油密度 (g/cm³)"
            align="center"
            width="140"
        >
        </el-table-column>
        <el-table-column
            prop=""
            :render-header="renderHeader"
            label="粘度 (mPa.s)"
            align="center"
            width="140"
        >
        </el-table-column>
        <el-table-column
            prop="api60F"
            label="API_60F"
            align="center"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="waterContent"
            :render-header="renderHeader"
            label="含水 (%)"
            align="center"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="scontent"
            :render-header="renderHeader"
            label="含硫量 (%)"
            align="center"
            width="140"
        >
        </el-table-column>
        <el-table-column
            prop="freezePoint"
            :render-header="renderHeader"
            label="凝固点 (℃)"
            align="center"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="waxContent"
            :render-header="renderHeader"
            label="蜡量 (%)"
            align="center"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="bitumen"
            :render-header="renderHeader"
            label="沥青质 (%)"
            align="center"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="resin"
            :render-header="renderHeader"
            label="胶质 (%)"
            align="center"
            width="100"
        >
        </el-table-column>
      </el-table>
    </el-row>
  </NormalCard>
</template>

<script>
import {streamingMediaDataCrudeOilViscosity} from "@/api/rem-01/fielddynamicanalysis";
import NormalCard from "@/components/tools/NormalCard";
import {exportExcel} from "@/lib/exportExcel";
export default {
  components: {
    NormalCard,
  },
  props: {
    oilFieldId: {},
    blockId: {},
  },
  data() {
    return {
      radio: 1,
      src: '../../static/img/blockAnalysisAided/reservoirData/pore.png',
      tableData: []
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch(){
      //置空子组件参数
      this.$emit('childPara', '');
      //获得查询参数
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      }
      //调用接口方法
      await streamingMediaDataCrudeOilViscosity(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData=res.data.data.oilResults;
        } else{
          this.tableData=[];
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '原油粘度';
      if(this.blockName){
        fileName = this.blockName + fileName;
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
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>