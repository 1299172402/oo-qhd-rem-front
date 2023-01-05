<template>
  <div
    style="font-size: 20px; padding: 10px; background: rgba(173, 255, 47, 0.5); width: 100%; height: 100%"
    id="fullScreen_panorama"
  >
    <t-button theme="default" @click="fullExit">退出投影模式</t-button>
    左下的面板
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  watch: {
    '$store.state.user.projectionMode': {
      handler(newValue) {
        // console.log('哈哈哈哈', newValue);
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

<style scoped></style>
