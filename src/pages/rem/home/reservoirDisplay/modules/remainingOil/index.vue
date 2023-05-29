<template>
<!--    <div class="box">-->
<!--        <img :src="require('./oil.gif')" alt="" style="width: 100%;height: 100%">-->
<!--    </div>-->
  <video
    id="my-video"
    class="box"
    height="100%"
    width="100%"
    autoplay
    src="./剩余油.mp4"
  >
    <div class="progress-bar"></div>
    <div class="progress"></div>
  </video>
</template>

<script>
export default {
  mounted() {
    this.video();
  },
  methods: {
    video() {
      const video = document.getElementById("my-video");
      const progressBar = document.querySelector(".progress-bar");
      const progress = document.querySelector(".progress");
      video.onresize = () => {
        const videoWidth = video.offsetWidth;
        const barWidth = progressBar.offsetWidth;
        const newWidth = Math.floor((videoWidth / barWidth) * 100);
        progress.style.width = `${newWidth}%`;
      };
    },
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;
  background: url("@/pages/rem/home/reservoirDisplay/modules/油藏看板视频底色.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
  padding: 4% 0 4% 0;
  overflow: hidden;
}
.progress-bar {
  width: 100%; /* 进度条容器的初始宽度 */
  height: 10px;
  background-color: #ccc;
}

.progress {
  width: 0%; /* 进度条的初始宽度为 0 */
  height: 100%;
  background-color: #f00;
}
</style>
