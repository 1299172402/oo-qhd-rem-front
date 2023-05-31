<!--完井完工报告-->
<template>
  <div class="z-main" style="display: flex; justify-content: space-around">
    <!-- <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:100%;"></iframe> -->
    <!-- <el-row> -->
    <div class="imagesBox">
      <img
          style="height: 100%;border: #022743 solid 1px"
        src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"
      />
    </div>
    <div class="imagesBox">
      <img
          style="height: 100%;border: #022743 solid 1px"
        src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"
      />
    </div>
    <!-- </el-row> -->
  </div>
</template>

<script>
import { testWellReport } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
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
    };
  },
  mounted() {
    // this.doSearch();
  },
  methods: {
    //调用图片
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      testWellReport(request).then((res) => {
        if (res.data.code == 200) {
          let imgData = res.data.data.data;
          let type = res.data.data.type;
          let firstParty = "data:" + type + ";base64,";
          if (imgData) {
            this.image = firstParty + imgData;
          } else {
            this.image = "";
          }
        }
      });
    },
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
    border: 1px solid #ddd;
    border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
  }
}
.imagesBox {
  // width: 60%;
  text-align: center;
}
</style>
