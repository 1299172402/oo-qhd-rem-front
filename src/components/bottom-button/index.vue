<!--自定义底部滑过按钮-->
<template>
  <div style="height: 20%;" class="g-w100 bottomBtnBg">
    <transition name="slider">
    <i class="el-icon-arrow-up" @mouseenter="sliderBtn=false" style="font-size:45px;color:var(--lightBlueColor)" v-show="sliderBtn"/>
    </transition>
    <transition name="fade">
    <div class="textScreen" @mouseleave="sliderBtn=true" v-show="!sliderBtn" @click="bigScreenMode">进入大屏模式</div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    
  },
  data() {
    return {
      sliderBtn: true,  
    }
  },
  methods: {
    bigScreenMode() {
      this.$emit('bigScreenMode')
    }
  }
};
</script>
<style scoped>
.bottomBtnBg {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to bottom, transparent,rgba(36, 222, 255, 0.45), transparent);
}
.textScreen {
     transition: all .6s ease-in-out;
    width: 200px;
    border-radius: 25px;
    height: 50px;
    border: 2px solid var(--lightBlueColor);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--lightBlueColor);
}
/* 显示和隐藏的过滤效果  opacity属性持续2秒*/
.fade-enter-active, .fade-leave-active{
  transition: opacity 2s;
}
/*隐藏时候的样式*/
.fade-enter, .fade-leave-to {
  opacity: 0;
  /* transition: opacity 2s; */
}
.slider-enter-active, .slider-leave-active {
    opacity: 0;
}
.slider-leave-to {
   transition: opacity 2s;
}
</style>