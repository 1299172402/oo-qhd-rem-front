<!-- 智能视频分析系统组件 -->
<template>
  <div style="font-size: 20px;position:relative;" class="g-w100 g-h100">
    <bottomButton class="bottomBtn" @bigScreenMode="fullScreen"></bottomButton>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="智能视频分析系统">
      <div class="g-w100 g-h100" style="font-size: 20px;" id="fullScreen_panorama">
        <!-- <t-button theme="default" @click="fullExit">退出投影模式</t-button> -->
        <iframe src="https://www.isqqw.com/#/homepage" frameborder="0" class="g-w100 g-h100"></iframe>
      </div>
    </info-window>
  </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';
import bottomButton from '@/components/bottom-button/index.vue';

export default {
  components: {
    infoWindow,
    bottomButton,
  },
  data() {
    return {};
  },
  watch: {
    '$store.state.user.projectionMode': {
      handler(newValue) {
        if (newValue) {
          this.fullScreen();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    fullScreen() {
      // var element= document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById('fullScreen_panorama');
      // IE 10及以下ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
        // 写全屏后的执行函数
      }
      // HTML W3C 提议
      else if (element.requestFXullScreen) {
        element.requestFullScreen();
        // 写全屏后的执行函数
      }
      // IE11
      else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        // 写全屏后的执行函数
      }
      // Webkit (works in Safari5.1 and Chrome 15)
      else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        // 写全屏后的执行函数
      }
      // Firefox (works in nightly)
      else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        // 写全屏后的执行函数
      }
    },
    fullExit() {
      this.$store.commit('user/setProjectionMode', false);
      // var element= document.documentElement;//若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById('fullScreen_panorama');
      // IE ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
        // 写退出全屏后的执行函数
      }
      // HTML5 W3C 提议
      else if (element.requestFullScreen) {
        document.exitFullscreen();
        // 写退出全屏后的执行函数
      }
      // IE 11
      else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
        // 写退出全屏后的执行函数
      }
      // Webkit (works in Safari5.1 and Chrome 15)
      else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
        // 写退出全屏后的执行函数
      }
      // Firefox (works in nightly)
      else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
        // 写退出全屏后的执行函数
      }
    },
  },
};
</script>

<style scoped>
.bottomBtn {
    position: absolute;
    bottom: 0;
}
</style>
