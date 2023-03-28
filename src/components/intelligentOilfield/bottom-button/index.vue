<!--自定义底部滑过按钮-->
<template>
  <div style="height: 20%;" class="g-w100 bottomBtnBg" :style="{background: !sliderBtn?'linear-gradient(to bottom, transparent, rgba(36, 222, 255, 0.8), transparent)':'transparent'}" @mouseleave="sliderBtn = true">
  <!-- <transition name="slider">
    <i class="el-icon-arrow-up" @mouseenter="sliderBtn=false" style="font-size:45px;color:var(--lightBlueColor)" v-show="sliderBtn"/>
    </transition>
    <transition name="mybox">
      <div class="box" v-show="boxshow"></div>
      </transition> -->
    <div @mouseenter="sliderBtn = false" style="color:transparent;width: 100%;height: 10px;position:absolute;bottom:0">
      <!-- 未完 -->
    </div>
    <transition name="fade">
      <!-- <div class="textScreen" @mouseleave="sliderBtn=true" v-show="!sliderBtn" @click="bigScreenMode">退出大屏模式</div> -->
      <div class="textScreen"  v-if="!sliderBtn" @click="bigScreenMode">退出大屏模式</div>
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
  /* align-items: center; */
  /* background: linear-gradient(to bottom, transparent, rgba(36, 222, 255, 0.8), transparent); */
}
.textScreen {
  transition: all .6s ease-in-out;
  width: 200px;
  border-radius: 25px;
  height: 50px;
  border: 2px solid var(--whiteColor);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--whiteColor);
  position: absolute;
  bottom: 50%;
  transform: translate(0,50%);
  cursor: pointer;
}

/* 显示和隐藏的过滤效果  opacity属性持续2秒*/
.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 1s; */
  bottom: 50%;
}

/*隐藏时候的样式*/
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* transition: opacity 2s; */
  bottom: 0;
}

.slider-enter-active,
.slider-leave-active {
  opacity: 0;
}

.slider-leave-to {
  transition: opacity 1s;
}</style>