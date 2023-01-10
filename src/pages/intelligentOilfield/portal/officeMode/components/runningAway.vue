<!-- 跑马灯组件 -->
<template>
    <div class="marquee-fa">
      <div class="marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px" />
        <p style="margin-left: 10px; width: 70px">通知公告：</p>
      </div>
      <Marquee>
        <p>安全生产创效益，违规操作酿祸端</p>
      </Marquee>
    </div>
</template>
<script>
// import infoWindow from '@/components/info-window/index.vue';
import marquee from '@/components/marquee-window/index.vue';

export default {
  components: {
    marquee,
    // infoWindow,
    // circularPanel,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
