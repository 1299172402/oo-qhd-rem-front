<!--自定义顶部搜索栏-->
<template>
  <div
    class="commonHeader searchHeader g-w100 g-h100"
    :class="$store.state.setting.mode === 'dark' ? 'searchHeader-dark':'searchHeader-light'"
    :style="{ background: $store.state.setting.mode === 'dark' ? 'transparent' : '#FFFFFF' }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.commonHeader {
  height: 80px;
  border: 1px solid;
  padding: 0 20px;
  background-image: var(--logo-bg) !important;
  background-size: 100% 100% !important;

}

.searchHeader-light {
  border: unset;
  padding-top: 2px;
  box-shadow: 0 0 10px 0 rgba(144,147,153,0.3);
}

.searchHeader-dark {
  border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
}
</style>