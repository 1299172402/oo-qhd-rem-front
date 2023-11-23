/**
 * @Author: ddhhh
 * @Params: {{Params}}
 * @Description: Check whether it's full screen
 */
export default {
  methods: {
    getFullscreenElement() {
      return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullScreenElement ||
        document.webkitFullscreenElement || null
      );
    },
    handleFullScreen(refName){
      let element = this.$refs[refName];
      if (this.getFullscreenElement()) {
        if (document.exitFullscreen) {
          try {
            document.exitFullscreen();            
          } catch (error) {
          }
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            // IE11
          element.msRequestFullscreen();
        }
      }
    }
  }
}
