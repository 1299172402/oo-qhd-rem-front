<!--构造图-->
<template>
  <div class="mt-2">
    <el-row>
      <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable  clearable >
        <el-option
            v-for="(item,index) in position"
            :key="index"
            :label="item.layerName"
            :value="item.fieldLayerId"
        >
        </el-option>
      </el-select>
    </el-row>
    <el-row class="mt-2" style="height:100%" :gutter="10">
      <el-col :span="12" style="height: 600px;overflow: auto;">
        <el-image :src="image">
          <div slot="error">
          </div>
        </el-image>
      </el-col>
      <el-col :span="12" style="height:100%">
        <div style="height:93%" title="地层划分表">
          <el-table id="tableData" highlight :data="tableData" height="600">
            <el-table-column label="序号" type="index" align="center" width="100"></el-table-column>
            <!--<el-table-column label="油气田" prop="ogfName" align="center" width="120"></el-table-column>-->
           <!-- <el-table-column label="区域" prop="area" align="center" width="140"></el-table-column>
            <el-table-column label="来源活动" prop="source" align="center" width="140"></el-table-column>-->
            <el-table-column label="层位" prop="layer" align="center" width="140"></el-table-column>
            <el-table-column label="井筒" prop="wellbore" align="center" width="140"></el-table-column>
            <!--<el-table-column label="父级地层" prop="parentLayer" align="center"></el-table-column>-->
            <el-table-column label="顶界斜深(m)" prop="topMd" align="center"></el-table-column>
            <el-table-column label="底界斜深(m)" prop="bottomMd" align="center"></el-table-column>
            <el-table-column label="斜厚" prop="mdThickness" align="center"></el-table-column>
            <el-table-column label="顶界垂深(m)" prop="topTvd" align="center"></el-table-column>
            <el-table-column label="底界垂深(m)" prop="bottomTvd" align="center"></el-table-column>
            <el-table-column label="垂厚" prop="verticalThickness" align="center"></el-table-column>
            <el-table-column label="反射时长(m)" prop="reflectionDuration" align="center"></el-table-column>
            <el-table-column label="分层日期" prop="divDate" align="center" min-width="140"></el-table-column>
            <el-table-column label="层位描述" prop="layerDesc" align="center" min-width="240"></el-table-column>
            <el-table-column label="接触关系" prop="contectRelationCode" align="center" min-width="200"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {reservoirDataComprehensiveGeologicalMap} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
import {exportExcel} from "@/lib/exportExcel.js";

export default {
  props: {
    oilFieldId: {

    },
    blockId: {

    }
  },
  data() {
    return {
      radio: 1,
      selectPosition: '',
      //层位所选择内容信息
      position: [],
      src: '../../static/img/blockAnalysisAided/reservoirData/geologicalMap.png',
      tableData: [],
      image: '',
    };
  },
  watch: {
    //监听层位信息，给其动态传值
     selectPosition(val){
       this.$emit('childPara',this.selectPosition);
       this.OnChangeImage();
     }
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch(){
      //this.$emit('childPara','');
      //初始化获取层段关系
      await fieldOilLayers({
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        wellId: '',
      }).then((res)=>{
        if(res.data.code==0){
          //层段数据
          if(res.data.data) {
            this.position = res.data.data.fieldLayers;
            if (!this.selectPosition && this.position[0]){
              if(this.blockId == '6CD7342CA6DD418183A4B3BC38584F7C'||this.blockId=='B440B47EE4D64C6CB56100AFE868DCA3'){
                if (this.position.find((item)=>{
                  return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
                })){
                  this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                }
                else{
                  this.selectPosition = this.position[0].fieldLayerId;
                }
              }
              else if(this.blockId == 'F35E226D47CE4B09B497B852D774D122'){
                if (this.position.find((item)=>{
                  return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C'
                })){
                  this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                }
                else if(this.position.find((item)=>{
                  return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487'
                })){
                  this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                }
                else{
                  this.selectPosition = this.position[0].fieldLayerId;
                }
              }
              else{
                this.selectPosition = this.position[0].fieldLayerId;
              }
              this.$emit('childPara',this.selectPosition);
            }
          } else{
            this.position = [];
          }
        }
      });
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       * @type {{ogfId: *, platformId: *, wellId: *}}
       */
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await reservoirDataComprehensiveGeologicalMap(request).then((res)=>{
        if(res.data.code==0){
          let imageData = res.data.data;
          let type = imageData.type;
          this.image='data:'+type+';base64,'+imageData.data;
          this.tableData=res.data.data.comGeoFormaDivisions;
        }
      });
    },
    /**
     * hwh
     * 切换图片
     * @constructor
     */
    OnChangeImage(){
      this.image='';
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
      }
      reservoirDataComprehensiveGeologicalMap(request).then((res)=>{
        if(res.data.code==0){
          let imageData = res.data.data;
          let type = imageData.type;
          this.image='data:'+type+';base64,'+imageData.data;
          this.tableData=res.data.data.comGeoFormaDivisions;
        }
      });
    },
    changeRadio(){
      this.$emit('childPara',this.selectPosition);
      this.OnChangeImage();
    },
    /**
     * hwh
     * 下载功能
     */
    doDownLoad(){
      let fileName = '综合地质图';
      let layerMess = this.position.find((item)=>item.fieldLayerId==this.selectPosition);
      if(layerMess){
        fileName = (layerMess.layerName? layerMess.layerName : '' )+ fileName;
      }
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      downFile(this.image,fileName);
      exportExcel('#tableData',fileName+'-地层划分表');
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>