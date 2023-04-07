<!--孔隙度裂缝发育情况-->
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
    <el-row class="mt-2" style="height: 600px;overflow: auto;">
      <!--<img style="height: 100%" :src="src">-->
      <el-image :src="image">
        <div slot="error">
        </div>
      </el-image>
    </el-row>
  </div>
</template>

<script>
import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {reservoirDataPorosityAndFractureDevelopment} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
export default {
  props: {
    oilFieldId: {},
    blockId: {},
  },
  data() {
    return {
      radio: 1,
      src: '../../static/img/blockAnalysisAided/reservoirData/pore.png',
      //选中层位
      selectPosition: '',
      //层位所选择内容信息
      position: [],
      image: '',
    };
  },
  watch: {
    //监听层位信息，给其动态传值
    selectPosition(val) {
      this.$emit('childPara', this.selectPosition);
      this.OnChangeImage();
    }
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch() {
      //this.$emit('childPara', '');
      //初始化获取层段关系
      await fieldOilLayers({
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        wellId: '',
      }).then((res) => {
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
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await reservoirDataPorosityAndFractureDevelopment(request).then((res) => {
        if(res.data.code==0){
          if(res.data.data.layerPics){
            if(res.data.data.layerPics.length>0){
              let imageData = res.data.data.layerPics[0];
              let type = imageData.type;
              this.image='data:'+type+';base64,'+imageData.data;
            } else{
              this.image = '';
            }
          } else{
            this.image = '';
          }
        } else{
          this.image = '';
        }
      });
    },
    /**
     * hwh
     * 切换图片
     * @constructor
     */
    OnChangeImage() {
      this.image = '';
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
      }
      reservoirDataPorosityAndFractureDevelopment(request).then((res) => {
        if(res.data.code==0){
          if(res.data.data.layerPics){
            if(res.data.data.layerPics.length>0){
              let imageData = res.data.data.layerPics[0];
              let type = imageData.type;
              this.image='data:'+type+';base64,'+imageData.data;
            } else{
              this.image = '';
            }
          } else{
            this.image = '';
          }
        } else{
          this.image = '';
        }
      });
    },
    /**
     * hwh
     * 单选按钮选中改变事件
     */
    changeRadio() {
      this.$emit('childPara', this.selectPosition);
      this.OnChangeImage();
    },
    /**
     * hwh
     * 下载功能
     */
    doDownLoad(){
      let fileName = '孔隙度裂缝发育情况';
      let layerMess = this.position.find((item)=>item.fieldLayerId==this.selectPosition);
      if(layerMess){
        fileName = (layerMess.layerName? layerMess.layerName : '' )+ fileName;
      }
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      downFile(this.image,fileName);
    }
  }
}
</script>