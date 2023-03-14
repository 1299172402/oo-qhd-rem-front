<!--自定义info信息窗-->
<template>
  <div :style="{width: infoWidth,height:infoHeight}" class="g-w100">
    <div class="infoHeader" :style="{background: $store.state.setting.mode==='dark'?'linear-gradient(to right, rgba(0, 202, 255, 0.4), var(--opacityBlueBg2))':'linear-gradient(to right, var(--onlyLightBlueColor), rgba(0, 96, 166, 0.2))',color:$store.state.setting.mode==='dark'?'var(--lightBlueColor)':'var(--whiteColor)'}">
        <div style="width: 100%">{{headerTitle}}</div>
        <div class="titleStyle">
            <slot name="titleContent"></slot>
        </div>
    </div>
    <div class="infoBody" :class="$store.state.setting.mode==='dark'?'infoBody-dark':'infoBody'" :style="{background: $store.state.setting.mode==='dark'?'var(--opacityBlueBg2)':'var(--whiteColor)'}">
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
    /* height: 32px;
    line-height: 32px; */
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 18px;
    /* border: 1px solid var(--lightBlueColor); */
    display: flex;
    width: 100%;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;

    /* border: 1px solid #ddd; */
    border-image: linear-gradient(to left, rgba(116, 190, 243, 0), rgba(0, 180, 255, 0.6)) 1 1
}
.infoBody {
    height: calc(100% - 40px);
    font-size: 16px;
    /* border-bottom: 1px solid var(--lightBlueColor);
    border-left: 1px solid var(--lightBlueColor);
    border-right: 1px solid var(--lightBlueColor); */
    border: 1px solid #ddd;
    border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
}
.infoBody-dark {
    height: calc(100% - 40px);
    font-size: 16px;
    border: 1px solid #ddd;
    border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
}
.titleStyle {
    font-size: 14px;
    color: white;
    margin-left: 10px;
    width: 83%;
}
</style>