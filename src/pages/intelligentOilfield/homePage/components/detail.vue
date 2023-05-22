<!-- 后台——首页详情 -->
<template>
  <div style="height: 100%;">
    <!-- TODO: Maybe change back -->
    <!-- <div class="home-marquee-fa" style="margin-bottom: 20px">
      <div class="home-marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px">
        <p style="margin-left: 10px; width: 70px;font-weight: 500;color: #0075E9;">
          通知公告：
        </p>
      </div>
      <marquee style="white-space: pre-wrap;">
        {{ $store.getters['user/notice'] }}
      </marquee>
    </div> -->
    <!-- <pagePanel headerTitle="统计数据" style="height: 256px">
      <div style="width: 100%; margin-top: 20px"></div>
    </pagePanel>
    <pagePanel headerTitle="已授权应用" style="height: 185px">
      <div class="authorized_content">
        <div class="authorized">
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
        </div>
      </div>
    </pagePanel>
    <pagePanel headerTitle="已授权看板" style="height: 185px">
      <div class="authorized_content">
        <div class="authorized">
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
        </div>
      </div>
    </pagePanel>
    <pagePanel headerTitle="已授权业务" style="height: 256px">
      <div style="width: 100%; margin-top: 20px"></div>
                                                      </pagePanel> -->
    <div v-for="(item, index) in panelTypeOptions" :key="index">
      <component :is="getContent(item.name)" :list="getList(item.name)" />
    </div>
    <div style="color: transparent">
      占位
    </div>
  </div>
</template>
<script>
// import SvgIcon from '@/assets/homepage/智能安全.svg';
// import dataStatistics from '@/pages/intelligentOilfield/portal/projectionMode/components/dataStatistics.vue';
import applicationCenter from "@/pages/intelligentOilfield/homePage/components/applicationCenter.vue";
import kanbanCenter from "@/pages/intelligentOilfield/homePage/components/kanbanCenter.vue";
import videoAnalysisSystem from "@/pages/intelligentOilfield/homePage/components/videoAnalysisSystem.vue";
import statisticalData from "@/pages/intelligentOilfield/homePage/components/statisticalData.vue";
// import myToDoList from '@/pages/intelligentOilfield/portal/officeMode/components/myToDoList.vue';
// import alarmInformation from '@/pages/intelligentOilfield/portal/officeMode/components/alarmInformation.vue';
// import quickEntry from '@/pages/intelligentOilfield/portal/officeMode/components/quickEntry.vue';
// import alarmCenter from '@/pages/intelligentOilfield/portal/projectionMode/components/alarmCenter.vue'
import { listAll, noticeList } from "@/api/intelligentOilfield/system/home";
import { downFile } from "@/components/upload/utils/file.ts";

export default {
  data() {
    return {
      val: "",
      panelTypeOptions: [
        { typeId: 0, name: "统计数据" },
        { typeId: 3, name: "应用中心" },
        { typeId: 2, name: "看板中心" },
        { typeId: 1, name: "业务中心" }
        // { typeId: 4, name: '快捷入口' },
        // { typeId: 5, name: '我的事项' },
        // { typeId: 6, name: '报警信息' },
        // { typeId: 7, name: '报警中心' },
      ],
      listAllData: {
        appList: [],
        boardList: [],
        businessList: [],
        indexList: []
      }
    };
  },
  created() {
    this.listAll();
    // TODO: Maybe change back
    // this.noticeList()
  },
  methods: {
    listAll() {
      listAll(this.$route.params.tenantId).then(response => {
        // 业务中心
        response.businessList.forEach(item => {
          item.businessImgUrl = "";
          if (item.businessImg) {
            const arr = item.businessImg.split(":");
            if (arr.length > 0) {
              if (arr[0] !== "http") {
                downFile(arr[0]).then(res => {
                  item.businessImgUrl = window.URL.createObjectURL(res);
                });
              }
            }
          }
        });
        // 授权应用
        response.appList.forEach(item => {
          item.imgUrl = "";
          if (item.appImg) {
            const arr = item.appImg.split(":");
            if (arr.length > 0) {
              if (arr[0] !== "http") {
                downFile(arr[0]).then(res => {
                  item.imgUrl = window.URL.createObjectURL(res);
                });
              }
            }
          }
        });
        // 已授权看板
        response.boardList.forEach(item => {
          item.imgUrl = "";
          if (item.boardImg) {
            const arr = item.boardImg.split(":");
            if (arr.length > 0) {
              if (arr[0] !== "http") {
                downFile(arr[0]).then(res => {
                  item.imgUrl = window.URL.createObjectURL(res);
                });
              }
            }
          }
        });
        this.listAllData = response;
      });
    },
    getContent(i) {
      switch (i) {
        case "统计数据":
          return statisticalData;
        case "业务中心":
          return videoAnalysisSystem;
        case "看板中心":
          return kanbanCenter;
        case "应用中心":
          return applicationCenter;
        //   case '快捷入口':
        //     return quickEntry;
        //   case '我的事项':
        //     return myToDoList;
        //   case '报警信息':
        //     return alarmInformation;
        //   case '报警中心':
        //     return alarmCenter;
        default:
          break;
      }
    },
    getList(i) {
      switch (i) {
        case "统计数据":
          return this.listAllData.indexList;
        case "应用中心":
          return this.listAllData.appList;
        case "看板中心":
          return this.listAllData.boardList;
        case "业务中心":
          return this.listAllData.businessList;
        default:
          break;
      }
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