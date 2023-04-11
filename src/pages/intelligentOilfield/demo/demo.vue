<!-- 示例组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="示例组件"
      :is-show-max-btn="true"
    >
      <div class="g-w100 g-h100 g-row-flex" style="padding: 20px">
        <div>我是示例组件</div>
      </div>
    </info-window>
  </div>
</template>
<script>

export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped>

</style>