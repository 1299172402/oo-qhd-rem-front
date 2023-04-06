<!--井网图-->
<template>
  <pagePanel headerTitle="井网图">
    <div class="image-content">
      <el-image :src="image">
        <div slot="error"></div>
      </el-image>
    </div>
  </pagePanel>
</template>

<script>
import { wellNetDiagram } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
export default {
  data() {
    return {
      image: "",
      oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
      platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
      wellId: "09D30C16BD1D4F759D53F74941701307",
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    passValue(val) {
      this.oilFeildId = val.ogfId;
      this.platform = val.assetCode;
      this.wellId = val.selectWellId;
      this.doSearch();
    },
    //调用图片
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      wellNetDiagram(request).then((res) => {
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
      let fileName = "井网图";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      downFile(this.image, fileName);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-content {
  width: 100%;
  height: calc(100% - 101px);
  overflow-y: scroll;
}
</style>
