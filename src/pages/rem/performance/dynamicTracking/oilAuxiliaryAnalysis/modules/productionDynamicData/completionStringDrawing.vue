<!--完井管柱图-->
<template>
  <el-container class="mt-2">
    <el-main>
        <el-row style="height: 600px;overflow: auto;">
            <el-image :src="image">
              <div slot="error">
              </div>
            </el-image>
        </el-row>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>

</style>
<script>
import{wellCompletionDiagram}from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
import {downFile} from "@/lib/remBase64Download.js";
export default {
  props: {
    //选择油田
    oilFeildId: {

    },
    //选择平台
    platform: {

    },
    //选择井号
    wellId: {

    }
  },
  data() {
    return {
      radio: 3,
      //图片数据
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
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      wellCompletionDiagram(request).then((res)=>{
        if(res.data.code==200){
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
      let fileName = '完井管柱图';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      downFile(this.image,fileName);
    }
  },
}
</script>