<!--自定义info信息窗-->
<template>
  <div :style="{width: infoWidth,height:infoHeight}">
    <div class="infoHeader" :style="{background: $store.state.setting.mode==='dark'?'linear-gradient(to right, rgba(0, 202, 255, 0.4), var(--opacityBlueBg2))':'linear-gradient(to right, rgba(0, 96, 166, 1), rgba(0, 96, 166, 0.2))',color:$store.state.setting==='dark'?'var(--lightBlueColor)':'var(--whiteColor)'}">{{headerTitle}}</div>
    <div class="infoBody" :style="{background: $store.state.setting.mode==='dark'?'var(--opacityBlueBg2)':'var(--whiteColor)'}">
        <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 窗体整体宽度
    infoWidth: {
      type: String,
      default: '680px'
    },
    // 窗体整体高度
    infoHeight: {
      type: String,
      default: '400px'
    },
    // header内容
    headerTitle: {
      type: String,
      default: '生产对象'
    },
  },
  data() {
    return {
           
    }
  }
};
</script>
<style scoped>
.infoHeader {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    /* background: linear-gradient(to right, rgba(0, 202, 255, 0.4), var(--opacityBlueBg2)); */
    /* color: var(--lightBlueColor); */
}
.infoBody {
    height: calc(100% - 40px);
    /* background: var(--opacityBlueBg2); */
}
</style>