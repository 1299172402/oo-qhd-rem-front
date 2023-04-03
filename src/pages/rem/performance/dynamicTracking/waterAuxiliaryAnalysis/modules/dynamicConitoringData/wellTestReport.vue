<!--试井报告-->
<template>
  <el-container class="mt-2">
    <el-main>
      <NormalCard>
        <el-row>
          <!--<el-image style="height: 600px" :src="src"></el-image>-->
          <!-- <el-image style="height: 600px" :src="Image"></el-image>-->
          <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:600px;">

          </iframe>
        </el-row>
      </NormalCard>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>

</style>
<script>
import NormalCard from '@/components/tools/NormalCard';
import {testWellReport} from "@/api/rem-01/dynamicAnalysis";
import {downFile} from "@/lib/remBase64Download";

export default {
  components: {
    NormalCard,
  },
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {}
  },
  data() {
    return {
      radio: 3,
      src: '../../static/img/oilAuxiliaryAnalysis/productionDynamicData/wellTestReport.jpg',
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
      //let wellId = this.wellId;
      let request={
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      testWellReport(request).then((res)=>{
        if(res.data.code==0){
          /*let firstParty='data:application/pdf;base64,';
          let imgData = res.data.data.data;
          if(imgData==null){
            this.image='';
          }
          else{
            this.image=firstParty+imgData;
          }*/
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
      let fileName = '试井报告';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      downFile(this.image,fileName);
    }
  },
}
</script>