<!--试井报告-->
<template>
  <el-container class="mt-2">
    <el-main>
        <el-row>
          <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:600px;"></iframe>
        </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {testWellReport} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
// import {downFile} from "@/lib/remBase64Download";

export default {
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
      testWellReport(request).then((res)=>{
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
      let fileName = '试井报告';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      // downFile(this.image,fileName);
    }
  },
}
</script>