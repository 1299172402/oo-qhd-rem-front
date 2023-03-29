<!--井网图完善-->
<template>
  <NormalCard class="mt-2">
    <el-row style="margin-top:10px;height:600px;overflow: auto;">
      <!--<img style="height: 100%" :src="src">-->
      <el-image :src="image">
        <div slot="error">
          <el-image :src="baseUrl+'static/img/remImageError.jpg'"></el-image>
        </div>
      </el-image>
    </el-row>
  </NormalCard>
</template>

<script>
import {developmentDataWellPatternImprovementChart} from "@/api/rem-01/fielddynamicanalysis";
import NormalCard from "@/components/tools/NormalCard";
import {downFile} from "@/lib/remBase64Download";
import config from "@/config";
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
      src: '../../static/img/blockAnalysisAided/reservoirData/wellPatternImprovementChart.png',
      image: '',
      baseUrl:
          process.env.NODE_ENV === "production"
              ? config.publicRootPath
              : config.devRootPath,
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
    //this.initData();
    this.doSearch();

  },
  methods: {
    async doSearch(){
      this.$emit('childPara','');
      //初始化获取层段关系
      /* await fieldOilLayers({
         oilFieldId: this.oilFieldId,
         fieldId:this.blockId,
         wellId:'',
       }).then((res)=>{
         if(res.data.code==0){
           //层段数据
           this.position=res.data.data.fieldLayers;
           this.selectPosition=this.position[0].fieldLayerId;
         }
       });*/
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       * @type {{ogfId: *, platformId: *, wellId: *}}
       */
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        //layerId:this.selectPosition,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await developmentDataWellPatternImprovementChart(request).then((res)=>{
        if(res.data.code==0){
          let imgData = res.data.data.data;
          let type = res.data.data.type;
          let firstParty='data:'+type+';base64,';
          if(imgData){
            this.image=firstParty+imgData;
          } else{
            this.image = '';
          }
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
        //layerId:this.selectPosition,
      }
      developmentDataWellPatternImprovementChart(request).then((res)=>{
        if(res.data.code==0){
          let imgData = res.data.data.data;
          let type = res.data.data.type;
          let firstParty='data:'+type+';base64,';
          if(imgData){
            this.image=firstParty+imgData;
          } else{
            this.image = '';
          }
        }
      });
    },
    /**
     * hwh
     * 单选按钮选中改变事件
     */
    changeRadio(){
      this.$emit('childPara',this.selectPosition);
      this.OnChangeImage();
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '井网完善图';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      downFile(this.image,fileName);
    }
  }
}
</script>