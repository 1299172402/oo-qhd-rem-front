<!--井网图-->
<template>
    <el-row style="margin-top:10px;height: 600px;overflow: auto;">
      <el-image :src="image">
        <div slot="error"></div>
      </el-image>
    </el-row>
</template>

<script>
import {developmentDataWellPattern} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
export default {
  props: {
    oilFieldId: {},
    blockId: {}
  },
  data() {
    return {
      radio: 1,
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
      await developmentDataWellPattern(request).then((res)=>{
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
      developmentDataWellPattern(request).then((res)=>{
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
      let fileName = '井网图';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      downFile(this.image,fileName);
    }
  }
}
</script>