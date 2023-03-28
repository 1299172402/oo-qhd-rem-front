<!-- 后台——跳转内部链接页面 -->
<template>
    <iframe :src="$store.getters['permission/routerLink']" frameborder="0" style="width:100%;height:100%"></iframe>
</template>

<script>

export default {
  data() {
    return {
      linkURL: sessionStorage.getItem('routerLink')
    }
  },
  watch: {
    '$store.state.permission.routerLink': {
      handler(newValue) {
        console.log('link链接', newValue);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {}
};
</script>

<style scoped>

</style>
