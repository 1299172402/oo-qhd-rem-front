<!--油藏剖面图-->
<template>
  <NormalCard class="mt-2">
    <el-row style="height: 600px;overflow: auto;">
      <el-image  :src="image">
        <div slot="error">
        </div>
      </el-image>
    </el-row>
  </NormalCard>
</template>

<script>
import {reservoirDataReservoirProfile} from "@/api/rem-01/fielddynamicanalysis";
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
      radio: 1,
      src: '../../static/img/blockAnalysisAided/reservoirData/reservoirProfile.png',
      selectPosition: '',
      //层位所选择内容信息
      position: [],
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
      await reservoirDataReservoirProfile(request).then((res)=>{
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
      reservoirDataReservoirProfile(request).then((res)=>{
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
      let fileName = '油藏剖面图';
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