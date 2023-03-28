<!--自定义顶部搜索栏-->
<template>
  <div
    class="commonHeader searchHeader g-w100 g-h100"
    :class="$store.state.setting.mode === 'dark' ? 'searchHeader-dark':'searchHeader'"
    :style="{ background: $store.state.setting.mode === 'dark' ? 'transparent' : '#FFFFFF' }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.commonHeader {
height: 80px;
  border: 1px solid;
  padding: 0 20px;

}
.searchHeader {
  border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), rgba(0, 96, 166, 1)) 1 1;
}
.searchHeader-dark {
    border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
}
</style>
