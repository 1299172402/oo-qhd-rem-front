<template>
  <div style="height: calc(100% - 70px)">
    <div class="home-marquee-fa" style="margin-bottom: 20px">
      <div class="home-marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px">
        <p style="margin-left: 10px; width: 70px">
          通知公告：
        </p>
      </div>
      <marquee style="white-space: pre-wrap;">
        {{ $store.getters['user/notice'] }}
      </marquee>
    </div>
    <div style="width: 100%; height: 100%; overflow: scroll; overflow-x: hidden;padding: 10px" class="el_row_wrap home-main">
      <el-row :gutter="0">
        <el-col v-for="(item, index) in listNumData" :key="index" :span="8">
          <!-- TODO: Maybe change back -->
          <!-- <div class="boxCard cardStyle">
              <div class="boxCard_left">
                <p style="color: var(--light-blue-color);font-size:16px">{{ item.tenantName }}</p>
                <p class="divStyle">租户授权app数量：<span>{{ item.appNum }}</span></p>
                <p>租户授权看板数量：<span>{{ item.boardNum }}</span></p>
                <p>租户授权大屏数量：<span>{{ item.businessNum }}</span></p>
                <p>租户下属用户数量：<span>{{ item.userNum }}</span></p>
              </div>
              <div class="boxCard_middle">
                <p style="margin-bottom: 15px;">今日活跃用户统计</p>
                <el-progress type="circle" :stroke-width="10" :width="60"
                  :format="() => (item.userNum ? item.userLonginNum + '/' + item.userNum : '0/0')"
                  :percentage="item.userNum ? item.userLonginNum / item.userNum : 0"></el-progress>
              </div>
              <div class="boxCard_right" @click="handleAuth(item.tenantId)">
                <span>查 看</span>
              </div>
            </div> -->
          <div class="home-card cardStyle">
            <div class="depName card-title">
              {{ item.tenantName }}
            </div>
            <div style="width: 100%; display: flex; justify-content: space-around; margin-top: 28px; margin-bottom: 10px;">
              <div class="boxCard_left">
                <p>
                  租户授权app数量：<span>{{ item.appNum }}</span>
                </p>
                <p>
                  租户授权看板数量：<span>{{ item.boardNum }}</span>
                </p>
                <p>
                  租户授权大屏数量：<span>{{ item.businessNum }}</span>
                </p>
                <p>
                  租户下属用户数量：<span>{{ item.userNum }}</span>
                </p>
              </div>
              <div class="boxCard_middle">
                <el-progress
                  type="circle"
                  :stroke-width="10"
                  :width="108"
                  :format="() => (item.userNum ? item.userLonginNum + '/' + item.userNum : '0/0')"
                  :percentage="item.userNum ? item.userLonginNum / item.userNum : 0"
                />
                <p>今日活跃用户统计</p>
              </div>
            </div>
            <div style="text-align: center">
              <el-button
                v-if="$store.state.setting.mode === 'dark'"
                type="primary"
                size="mini"
                style="width: 80px; height: 32px"
                @click="handleAuth(item.tenantId)"
              >
                查看
              </el-button>
              <el-button
                v-else
                size="mini"
                style="width: 80px;height: 32px;color: #fff;background: #3490d3"
                @click="handleAuth(item.tenantId)"
              >
                查看
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { listNum, noticeList } from "@/api/intelligentOilfield/system/home";
import marquee from "@/components/intelligentOilfield/marquee-window/index.vue";

export default {
  name: "Index",
  components: {
    marquee
  },
  data() {
    return {
      val: "",
      listNumData: [
        { depName: "秦皇岛326作业分公司", appNum: 0, boardNum: 2, businessNum: 3, userNum: 5, userLonginNum: 1 }
      ]
    };
  },
  created() {
    this.listNum();
    // TODO: Maybe change back
    // this.noticeList()
  },
  methods: {
    listNum() {
      listNum(this.$store.getters["user/userDetail"].user.userId).then(response => {
        // listNum(100).then((response) => {
        this.listNumData = response;
      });
    },
    handleAuth(tenantId) {
      //   this.$router.push({ name: `homeDetail`, query: { id } });
      this.$router.push({ name: "homeDetail", query: { tenantId }});
    },
    noticeList() {
      noticeList(this.$store.getters["user/tenantId"]).then(response => {
        response?.data?.data?.forEach(item => {
          this.val += `${item.noticeContent}                                                                                                    `;
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cardStyle {
  height: 282px;
  margin: 10px;
  // border-radius: 4px;
}

.depName {
  height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  line-height: 40px;
  padding-left: 20px;
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
  p {
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, "PingFang SC";
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 16px;
    color: #3aa4ed;

    span {
      color: var(--light-blue-color);
    }
  }
}

.boxCard_middle {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  p {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, "PingFang SC";
    font-weight: 500;
    color: #8a9fc7;
    line-height: 20px;
  }
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