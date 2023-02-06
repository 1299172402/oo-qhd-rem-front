<!-- 后台——首页详情 -->
<!-- 后台——消息中心管理 -->
<template>
  <div style="height: calc(100% - 70px);">
    <div class="marquee-fa" style="margin-bottom: 20px;">
      <div class="marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px" />
        <p style="margin-left: 10px; width: 70px">通知公告：</p>
      </div>
      <Marquee>{{ val }}</Marquee>
    </div>
    <div
      class="footerBox footerBox_content"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
    >
      <div class="headerStyle">统计数据</div>
      <div style="width: 100%; margin-top: 20px">
        
      </div>
    </div>
    <div
      class="footerBox footerBox_content"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
    >
      <div class="headerStyle">已授权应用</div>
      <div style="width: 100%; margin-top: 20px">
        
      </div>
    </div>
    <div
      class="footerBox footerBox_content"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
    >
      <div class="headerStyle">已授权看板</div>
      <div style="width: 100%; margin-top: 20px">
        
      </div>
    </div>
    <div
      class="footerBox footerBox_content"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
    >
      <div class="headerStyle">已授权业务</div>
      <div style="width: 100%; margin-top: 20px">
        
      </div>
    </div>
  </div>
</template>
<script>
import marquee from '@/components/intelligentOilfield/marquee-window/index.vue';

export default {
  components: {
    marquee,
  },
  data() {
    return {
      val: '安全生产创效益，违规操作酿祸端',
    };
  },
  methods:{
   
  }
};
</script>

<style lang="less" scoped>
.footerBox_content {
  height: 256px !important;
}
</style>


  