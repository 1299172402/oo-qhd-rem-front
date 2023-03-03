<!-- 新的页面通用面板 -->
<template>
    <div
      class="footerBox"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
    >
      <div style="padding: 20px;height:calc(100%);" class="g-w100">
         <slot></slot>
      </div>
    </div>
</template>
<script>

export default {
  props: {
    headerTitle: {
      type: String,
      default: '默认header'
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>

</style>