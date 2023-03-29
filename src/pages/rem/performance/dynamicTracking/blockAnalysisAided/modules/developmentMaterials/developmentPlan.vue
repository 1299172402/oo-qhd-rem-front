<!--开发方案-->
<template>
  <NormalCard class="mt-2" style="height: 100%;">
    <el-row style="margin-top:10px;height: 100%;">
      <iframe style="width: 100%;height: 100%;border: none;" :src="image?(image+'#toolbar=0'):''" ></iframe>
    </el-row>
  </NormalCard>
</template>

<script>
import {developmentDataDevelopmentPlan} from "@/api/rem-01/fielddynamicanalysis.js";
import NormalCard from "@/components/tools/NormalCard";
import {downFile} from "@/lib/remBase64Download";
export default {
  components: {
    NormalCard,
  },
  props: {
    oilFieldId: {},
    blockId: {}
  },
  data() {
    return {
      radio: 1,//所选择的层位
      selectPosition: '',
      //层位所选择内容信息
      position: [],
      src: '../../static/img/blockAnalysisAided/reservoirData/structuralMap.jpg',
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
    //this.initData();
    this.doSearch();

  },
  methods: {
    async doSearch() {
      this.$emit('childPara', '');
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       * @type {{ogfId: *, platformId: *, wellId: *}}
       */
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        //layerId:this.selectPosition,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await developmentDataDevelopmentPlan(request).then((res) => {
        if (res.data.code == 0) {
          let imageData = res.data.data;
          let type = imageData.type;
          if(imageData.data&&type){
            this.image = 'data:'+type+';base64,' + imageData.data;
          } else{
            this.image = '';
          }
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '开发方案';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      downFile(this.image,fileName);
    }
  }

}
</script>