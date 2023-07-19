<!--钻完井报告-->
<template>
<!-- <div class="z-main" style="display: flex; justify-content: space-around">-->
<!--    &lt;!&ndash; <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:100%;"></iframe> &ndash;&gt;-->
<!--    &lt;!&ndash; <el-row> &ndash;&gt;-->
<!--    <img-->
<!--      style="height: 100%;border: #022743 solid 1px"-->
<!--      src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"-->
<!--    />-->
<!--    <img-->
<!--        style="height: 100%;border: #022743 solid 1px"-->
<!--      src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"-->
<!--    />-->
<!--    &lt;!&ndash; </el-row> &ndash;&gt;-->
<!--  </div>-->
    <page-panel-new style="height: 86%;width: 100%;margin-top: 0;" show-btn>
      <iframe style="height: 100%;width: 100%" :src="url"></iframe>
    </page-panel-new>
</template>

<script>
import { testWellReport } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
import {filePreview} from "@/components/upload/utils/file";
export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  data() {
      return {
          image: "",
          url:'',
          id:'',
          fileName:'',
      };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
      doSearch() {
          let params ={
              operationId:this.wellId,
              operationType:'YJZWJBG',
              readOne:'one'
          }
          queryRemUploadFileMinio(params).then((res) => {
              if (res.data.code == 200 ) {
                  if(Array.isArray(res.data.data) && res.data.data.length){
                      let data =res.data.data[0].fileId
                      this.id = res.data.data[0].fileId
                      this.fileName = res.data.data[0].filestrId
                      filePreview(data).then((res)=>{
                          this.url = res.data.data
                      })
                  }else{
                      // debugger
                      this.url =''
                  }
              }else {
                  this.$message.error("文件查询接口异常!");
              }
              // if (res.data.code == 200) {
              //     let data =res.data.data[0].fileId
              //     this.id = res.data.data[0].fileId
              //     this.fileName = res.data.data[0].filestrId
              //     filePreview(data).then((res)=>{
              //         this.url = res.data.data
              //     })
              // }else {
              //     this.$message.error("文件查询接口异常!");
              // }
          });

      },
    //调用图片
    // doSearch() {
    //   let request = {
    //     ogfId: this.oilFeildId,
    //     platformId: this.platform,
    //     wellId: this.wellId,
    //   };
    //   testWellReport(request).then((res) => {
    //     if (res.data.code == 200) {
    //       let imgData = res.data.data.data;
    //       let type = res.data.data.type;
    //       let firstParty = "data:" + type + ";base64,";
    //       if (imgData) {
    //         this.image = firstParty + imgData;
    //       } else {
    //         this.image = "";
    //       }
    //     }
    //   });
    // },
    //下载
    doDownLoad() {
      let fileName = "试井报告";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      downFile(this.image, fileName);
    },
  },
};
</script>

<style scoped lang="scss">
.z-main {
  width: 100%;
  height: calc(100% - 101px);
  iframe {
    // border: 1px solid #ddd;
    border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
  }
}
</style>
