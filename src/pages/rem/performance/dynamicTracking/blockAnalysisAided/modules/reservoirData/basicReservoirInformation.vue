<!--油藏基础信息-->
<template>
  <NormalCard class="mt-2">
    <el-row  :gutter="20" style="height: 600px;overflow: auto;">
      <!--临时写死-->
      <el-row>
        <el-col :span="5" style="align:center">
          油藏类型：<!--{{resultData.reservoirsType}}-->岩性构造边/底水油藏
        </el-col>
        <el-col :span="5">
          含油层系：<!--{{resultData.oilLayer}}-->明下段（埋深-1000～-1300m）
        </el-col>
        <el-col :span="5">
          构造特征：<!--{{resultData.constructureFeature}}-->构造平缓（幅度小于20m）
        </el-col>
        <el-col :span="5">
          储层物性：<!--{{resultData.physicalPropertyClass}}-->高孔(35%）、高渗（3000mD）
        </el-col>
        <el-col :span="4">
          非均质性：<!--{{resultData.heterogeneity}}-->横纵向变化快
        </el-col>
      </el-row>
      <el-row style="margin-top:50px">
        <el-col :span="5" style="align:center">
          沉积微相：<!--{{resultData.sediFaceName}}-->曲流河沉积
        </el-col>
        <el-col :span="5">
          流体性质：<!--{{resultData.filuidQuality}}-->粘度74/28mPa•s,溶解气油比19（Nm0,Ⅰ,Ⅱ）/25（NmⅢ,Ⅳ,Ⅴ）m3/m3，地饱压差3.2 （Nm0,Ⅰ,Ⅱ） /1.4（NmⅢ,Ⅳ,Ⅴ） MPa
        </el-col>
        <el-col :span="5">
          水体能量：<!--{{resultData.waterEnergy}}-->5倍水体
        </el-col>
        <el-col :span="5">
          地质储量：<!--{{resultData.reserves}}-->22090.62万方
        </el-col>
        <el-col :span="4">
          开发方式：<!--{{resultData.devMethod}}-->天然能量+人工注水
        </el-col>
      </el-row>
    </el-row>
    <table v-show="false" id="tableData">
      <tr>
        <td>油藏类型：</td><td>岩性构造边/底水油藏</td>
        <td>含油层系：</td><td>明下段（埋深-1000～-1300m）</td>
        <td>构造特征：</td><td>构造平缓（幅度小于20m）</td>
        <td>储层物性：</td><td>高孔(35%）、高渗（3000mD）</td>
        <td>非均质性：</td><td>横纵向变化快</td>
      </tr>
      <tr>
        <td>沉积微相：</td><td>曲流河沉积</td>
        <td>流体性质：</td><td>粘度74/28mPa•s,溶解气油比19（Nm0,Ⅰ,Ⅱ）/25（NmⅢ,Ⅳ,Ⅴ）m3/m3，地饱压差3.2 （Nm0,Ⅰ,Ⅱ） /1.4（NmⅢ,Ⅳ,Ⅴ） MPa</td>
        <td>水体能量：</td><td>5倍水体</td>
        <td>地质储量：</td><td>22090.62万方</td>
        <td>开发方式：</td><td>天然能量+人工注水</td>
      </tr>
    </table>
  </NormalCard>
</template>

<script>
import {reservoirDataBasicReservoirData} from '@/api/rem-01/fielddynamicanalysis.js';
import NormalCard from '@/components/tools/NormalCard';
import {exportExcel} from "@/lib/exportExcel";

export default {
  components: {
    NormalCard,
  },
  props: {
    oilFieldId: {

    },
    blockId: {

    }
  },
  data() {
    return {
      radio: 1,
      src: '../../static/img/blockAnalysisAided/reservoirData/reservoirProfile.png',
      resultData: '',
    };
  },
  mounted() {
      this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 查询
     */
    doSearch(){
      this.$emit('childPara','');
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      };
      reservoirDataBasicReservoirData(request).then((res)=>{
        if(res.data.code==0){
           this.resultData=res.data.data.reservoirsInfoList[0];
        } else{
          this.resultData=[];
        }
      });

    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '油藏基础信息';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      exportExcel('#tableData',fileName);
    }
  }
}
</script>