<!-- 后台——首页详情 -->
<!-- 后台——消息中心管理 -->
<template>
  <div style="height: calc(100% - 70px)">
    <div class="marquee-fa" style="margin-bottom: 20px">
      <div class="marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px" />
        <p style="margin-left: 10px; width: 70px">通知公告：</p>
      </div>
      <Marquee>{{ val }}</Marquee>
    </div>
    <pagePanel headerTitle="统计数据" style="height: 256px">
      <div style="width: 100%; margin-top: 20px"></div>
    </pagePanel>
    <pagePanel headerTitle="已授权应用" style="height: 185px">
      <div class="authorized_content">
        <!-- <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">智能安全</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">船体管理</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">油藏管理</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">设备设施</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">注采管理</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">生产优化</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">远程监控</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">报表管理</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">调度管理</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">能耗管理</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">移动模块</p>
        </div> -->
      </div>
    </pagePanel>
    <pagePanel headerTitle="已授权看板" style="height: 185px">
      <div class="authorized_content">
        <!-- <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">注水看板</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">操纵看板</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">设备看板</p>
        </div>
        <div class="authorized">
          <svg-icon icon-class="SvgIcon" class="icon" />
          <p class="authorized_title">报警看板</p>
        </div> -->
      </div>
    </pagePanel>
    <pagePanel headerTitle="已授权业务" style="height: 256px">
      <div style="width: 100%; margin-top: 20px"></div>
    </pagePanel>
  </div>
</template>
<script>
import marquee from '@/components/intelligentOilfield/marquee-window/index.vue';
// import SvgIcon from '@/assets/homepage/智能安全.svg';

export default {
  components: {
    marquee,
    // SvgIcon,
  },
  data() {
    return {
      val: '安全生产创效益，违规操作酿祸端',
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.authorized_content {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  .authorized {
    width: 80px;
    font-size: 14px;
    text-align: center;
    margin-right: 20px;

    .authorized_title {
      margin-top: 10px;
    }

    .icon {
      width: 48px;
      height: 48px;
    }
  }
}
</style>


  