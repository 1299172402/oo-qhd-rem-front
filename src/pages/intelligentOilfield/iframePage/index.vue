<!-- 后台——跳转内部链接页面 -->
<template>
  <iframe class="iframe-view" :src="$store.getters['permission/routerLink']" frameborder="0" />
</template>

<script>

export default {
  data() {
    return {
      linkURL: sessionStorage.getItem("routerLink")
    };
  },
  watch: {
    "$store.state.permission.routerLink": {
      handler() {},
      deep: true,
      immediate: true
    }
  },
  methods: {}
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