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
  height: auto;
  border: 1px solid;
  padding: 0 20px;
  background-image: var(--logo-bg) !important;
  background-size: unset !important;
  background-repeat: no-repeat !important;
  background-position: right top !important;
}

.searchHeader /deep/ .el-form {
  margin-top: 15px;
}

.searchHeader /deep/ .el-form-item {
  margin-bottom: 15px;
}

.searchHeader /deep/ .el-form-item__label {
  line-height: 34px;
  padding: 0;
}

.colon /deep/ .el-form-item__label::after {
  content: '：';
}

.searchHeader-light {
  border: 1px solid transparent;
  padding-top: 2px;
  box-shadow: 0 0 10px 0 rgba(144,147,153,0.3);
}

.searchHeader-dark {
  border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
}
</style>