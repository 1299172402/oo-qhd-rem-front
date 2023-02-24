<template>
  <div style="height: calc(100% - 70px);">
    <div class="marquee-fa" style="margin-bottom: 20px;">
      <div class="marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px" />
        <p style="margin-left: 10px; width: 70px">通知公告：</p>
      </div>
      <Marquee style="white-space:pre-wrap;">{{ val }}</Marquee>
    </div>
    <pagePanel headerTitle="作业区概览" style="height: calc(100% - 10px)">
      <div style="width: 100%; height: calc(100% - 10px); overflow: scroll;overflow-x: hidden;" class="el_row_wrap">
        <el-row :gutter="0">
          <el-col :span="8" v-for="(item, index) in listNumData" :key="index">
            <div class="boxCard cardStyle">
              <div class="boxCard_left">
                <p style="color: var(--lightBlueColor);font-size:16px">{{ item.depName }}</p>
                <p class="divStyle">租户授权app数量：<span>{{ item.appNum }}</span></p>
                <p>租户授权看板数量：<span>{{ item.boardNum }}</span></p>
                <p>租户授权大屏数量：<span>{{ item.indexNum }}</span></p>
                <p>租户下属用户数量：<span>{{ item.userNum }}</span></p>
              </div>
              <div class="boxCard_middle">
                <p style="margin-bottom: 15px;">今日活跃用户统计</p>
                <el-progress type="circle" :stroke-width="10" :width="60"
                  :format="() => (item.userNum ? item.userLonginNum + '/' + item.userNum : '0/0')"
                  :percentage="item.userNum ? item.userLonginNum / item.userNum : 0"></el-progress>
              </div>
              <div class="boxCard_right" @click="handleAuth(item.depId)">
                <span>查 看</span>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="8"> <div class="boxCard cardStyle">1-2</div> </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">1-3</div> </el-col> -->
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <div class="boxCard cardStyle">2-1</div>
          </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">2-2</div> </el-col>
          <el-col :span="8"> <div class="boxCard cardStyle">2-3</div> </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="boxCard cardStyle">3-1</div></el-col>
          <el-col :span="12"><div class="boxCard cardStyle">3-2</div></el-col>
        </el-row> -->
      </div>

    </pagePanel>
  </div>
</template>
<script>
import { listNum, noticeList } from '@/api/intelligentOilfield/system/home';
import marquee from '@/components/intelligentOilfield/marquee-window/index.vue';

export default {
  components: {
    marquee,
  },
  data() {
    return {
      val: '',
      listNumData: []
    };
  },
  created() {
    this.listNum();
    this.noticeList()
  },
  methods: {
    listNum() {
      listNum(this.$store.getters['user/userDetail'].user.dept.deptId).then((response) => {
        // listNum(100).then((response) => {
        this.listNumData = response
      });
    },
    handleAuth(depId) {
      console.log('aa')
      //   this.$router.push({ name: `homeDetail`, query: { id } });
      this.$router.push({ name: `homeDetail`, query: { depId } });
    },
    noticeList() {
      noticeList().then(response => {
        response.data.data.forEach(item => {
          this.val += `${item.noticeContent}                                                                                                    `
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
.cardStyle {
  height: 250px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
}

.cardStyle>div {
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

.boxCard_left {
  padding-top: 15px;
  padding-left: 15px;

  p {
    height: 35px;
    font-size: 14px;

    span {
      //   margin-left: 5px;
      color: var(--lightBlueColor);
    }
  }
}

.boxCard_middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.boxCard_right {
  width: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
</style>
