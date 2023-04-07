<!--井网图-->
<template>
  <el-container class="mt-2">
    <pagePanel headerTitle="井网图">
    <el-row style="padding-top: 20px;height:600px;overflow: auto;">
<!--          <el-image style="height: 400px" :src="src"></el-image>-->
<!--          <el-image :src="image">-->
<!--            <div slot="error">-->
<!--            </div>-->
<!--          </el-image>-->
    </el-row>
    </pagePanel>
  </el-container>
</template>
<style lang="scss" scoped>

</style>
<script>
import { wellNetDiagram } from "@/api/oilDeposit/rem-01/welldynamicanalysis.js";
// import {downFile} from "@/lib/remBase64Download";
// import config from "@/config";

export default {
  components: {

  },
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
      src: '../../static/img/oilAuxiliaryAnalysis/productionDynamicData/wellNetworkDiagram.jpg',
      //图片数据
      image: '',
    //   baseUrl:
    //       process.env.NODE_ENV === "production"
    //           ? config.publicRootPath
    //           : config.devRootPath,
    };
  },
  mounted() {
    //初始化调用搜索
    // this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 调用图片
     */
    doSearch(){
      //let wellId = this.wellId;
      let request={
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      wellNetDiagram(request).then((res)=>{
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
      let fileName = '井网图';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      downFile(this.image,fileName);
    }
  },
}
</script>