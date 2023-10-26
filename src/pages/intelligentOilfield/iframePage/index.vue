<!-- 后台——跳转内部链接页面 -->
<template>
  <iframe
    v-postTheme="$store.state.setting.mode"
    class="iframe-view"
    :src="linkURL"
    frameborder="0"
  />
</template>

<script>

export default {
  computed: {
    linkURL: function() {
      try {
        const link = this.$route.meta?.link || "";
        // 如果有参数 access_token 则替换为实际 token，比如 http://xxx?access_token=$replaceToken$&type=3
        const { access_token: replaceToken } = Object.fromEntries(new URLSearchParams(link.split("?")[1]).entries());
        return replaceToken && link.replace(replaceToken, this.$store.getters["user/token"]) || link;
      } catch (error) {
        console.error(error);
        return "";
      }
    }
  }
};
</script>

<style scoped>
.iframe-view {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
}
</style>