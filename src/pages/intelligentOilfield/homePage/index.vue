<template>
  <div style="height: calc(100% - 70px);">
    <div class="marquee-fa" style="margin-bottom: 20px;">
      <div class="marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px" />
        <p style="margin-left: 10px; width: 70px">通知公告：</p>
      </div>
      <Marquee>{{ val }}</Marquee>
    </div>
    <pagePanel headerTitle="作业区概览" style="height: calc(100% - 10px)">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="boxCard cardStyle">
              <div class="boxCard_left">
                <p style="color: var(--lightBlueColor);">秦皇岛326作业区</p>
                <p>租户授权app数量:<span>12</span></p>
                <p>租户授权看板数量:<span>6</span></p>
                <p>租户授权大屏数量:<span>4</span></p>
                <p>租户下属用户数量:<span>19</span></p>
              </div>
              <div class="boxCard_middle">
                <p style="margin-bottom: 15px;">今日活跃用户统计</p>
                <el-progress type="circle" :stroke-width="10" :width="60" :percentage="68"></el-progress>
              </div>
              <div class="boxCard_right" @click="handleAuth(id)">查看</div>
            </div>
          </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">1-2</div> </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">1-3</div> </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="boxCard cardStyle">2-1</div>
          </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">2-2</div> </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">2-3</div> </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="boxCard cardStyle">3-1</div></el-col>
          <el-col :span="12"><div class="boxCard cardStyle">3-2</div></el-col>
        </el-row>
    </pagePanel>
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
    handleAuth(id) {
      console.log('aa')
      this.$router.push({ name: `homeDetail`, query: { id } });
    },
  }
};
</script>

<style lang="less" scoped>
.footerBox_content {
  margin: 0 !important;
  height: 100% !important;
  overflow: scroll;
}
.cardStyle {
  height: 250px;
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
}
.cardStyle>div{
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.boxCard_left{
  padding-top: 15px;
  padding-left: 15px;
  p{
    height: 40px;
    span{
      margin-left: 5px;
      color: var(--lightBlueColor);
    }
  }
}

.boxCard_middle{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.boxCard_right{
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  font-size: 18px;
  color: #fff;
}
</style>
