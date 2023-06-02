<template>
  <iframe
    v-postTheme="$store.state.setting.mode"
    class="iframe-view"
    :src="src"
    frameborder="0"
  />
</template>
<script>
import { addTokenToUrl } from "@/utils/jumpSupApp.js";

export default {
  name: "AppIframeView",
  computed: {
    src: function() {
      return addTokenToUrl(this.$route.query.src);
    }
  }
};
</script>
<style scoped lang="less">
.iframe-view {
  width: 100vw;
  height: 100vh;
  border: none;
  padding: 0;
  display: block;
}
</style>