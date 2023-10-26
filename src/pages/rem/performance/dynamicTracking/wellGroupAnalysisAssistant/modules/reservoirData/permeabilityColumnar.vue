<!--渗透率柱状图-->
<template>
  <el-container class="z-main">
    <el-main>
      <div>
        <el-row style="height: 600px;overflow: auto;">
          <el-image :src="image">
            <div slot="error">
              <!-- <el-image :src="baseUrl+'static/img/remImageError.jpg'"></el-image> -->
            </div>
          </el-image>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {permeabilityBarCharts} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
export default {
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //层系id
    layerId: {},
    //井组id
    wellGroupId: {}
  },
  data() {
    return {
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
     * 调用图片
     */
    doSearch(){
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
      };
      permeabilityBarCharts(request).then((res)=>{
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
     * 下载
     */
    doDownLoad(){
      let fileName = '渗透率柱状图';
      if(this.wellGroupName){
        fileName = this.wellGroupName + fileName;
      }
      downFile(this.image,fileName);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>