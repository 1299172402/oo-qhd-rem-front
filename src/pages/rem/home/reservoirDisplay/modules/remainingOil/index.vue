<template>
  <div class="box">
    <video
      id="media"
      class="media"
      height="85%"
      width="93%"
      style="object-fit: fill; position: relative; top: 24px"
      controls
      src="@/pages/rem/home/reservoirDisplay/modules/演示视频.mp4"
    ></video>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;
  background: url("@/pages/rem/home/reservoirDisplay/modules/油藏看板视频底色.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
</style>
