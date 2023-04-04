<!-- 业务中心组件 -->
<template>
  <div class="g-w100 g-h100">
    <!-- <bottomButton class="bottomBtn" @bigScreenMode="fullScreen"></bottomButton> -->
    <el-dialog
      title="内容设置-业务中心"
      :visible.sync="openDialog"
      width="65%"
      append-to-body
      :close-on-click-modal="false"
      custom-class="import-dialog"
      @close="cancel"
    >
      <div style="height: 100%;">
        <data-transfer
          search-name="业务筛选"
          :search-option="dict.type.sys_business_module"
          :all-list="allList"
          :selected-list="selectedList"
          :header-name-list="headerNameList"
          @submitForm="submitForm"
          @cancel="cancel"
          @changeData="changeData"
          @changeSource="changeSource"
        />
      </div>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel" class="cancelBtn">取 消</el-button>
                  </div> -->
    </el-dialog>
    <div id="fullScreen_panorama">
      <bottom-button v-if="linkUrl !== ''" class="bottomBtn" @bigScreenMode="fullExit" />
      <iframe
        v-if="linkUrl !== ''"
        :src="linkUrl"
        frameborder="0"
        class="g-w100 g-h100"
      />
    </div>
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="已授权业务"
      :header-style="$store.state.setting.mode === 'dark'?{}:{color:'#3490D3'}"
    >
      <div class="g-w100 g-h100" style="padding: 20px 20px 10px;overflow-y: scroll">
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in list"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <div class="g-w100" style="font-size: 16px; cursor: pointer;display: flex;flex-direction: column" @click="toClick(item.businessUrl)">
              <img :src="item.businessImg" alt="" class="g-w100">
              <div style="text-align: center;line-height: 32px">
                {{ item.businessName }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </info-window>
  </div>
</template>
<script>
import dataTransfer from "@/components/intelligentOilfield/data-transfer/index.vue";
import bottomButton from "@/components/intelligentOilfield/bottom-button/index.vue";
import { getListBusiness } from "@/api/intelligentOilfield/system/business";

export default {
  dicts: ["sys_business_module"],
  components: {
    dataTransfer,
    bottomButton
  },
  props: {
    componentItem: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openDialog: false,
      searchOption: [],
      allList: [],
      selectedList: [],
      storeSelectedList: [],
      screenList: [],
      linkUrl: "",
      headerNameList: [
        { id: 0, name: "已选业务", isSelected: true },
        { id: 1, name: "未选业务", isSelected: false }
      ]
    };
  },
  watch: {
    "$store.state.user.projectionMode": {
      handler(newValue) {
        if (newValue) {
          this.fullScreen();
        }
      },
      deep: true,
      immediate: true
    },
    "componentItem.contentSetting": {
      handler(newVal) {
        if (newVal) {
          this.openDialog = newVal;
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.getDataList('');
  },
  methods: {
    toClick(url) {
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", url);
      a.click();
      a.remove();
    },
    // 修改数据来源
    changeSource(item) {
      this.getDataList(item);
    },
    // 全屏展示链接, 未完不能全屏跳转！！！
    linkPage(item) {
      this.linkUrl = `${item.businessUrl}?token=${this.$store.getters["user/token"]}`;
      this.$nextTick(() => {
        this.fullScreen();
      });
    },
    // 获取所有数据来源
    getDataList(item) {
      this.allList = [];
      this.selectedList = [];
      let queryParams = {};
      if (item !== "") {
        queryParams = {
          businessModule: item
        };
      }
      // 调取接口
      getListBusiness(queryParams).then(response => {
        response.data.data.forEach(item => {
          item.businessModule = String(item.businessModule.toLocaleString());
          if (item.isSelected === "1") {
            this.selectedList.push({ name: item.businessName, ...item });
          }
          this.allList.push({ name: item.businessName, ...item });
        });
      });
      // 未选中
      //   this.allList = [
      //     // { id: 0, img: new URL(`../../../../../assets/intelligentOilfield/yewu1.png`, import.meta.url).href, name: '安全管理', url: 'https://www.isqqw.com/#/homepage' },
      //     // { id: 1, img: new URL(`../../../../../assets/intelligentOilfield/yewu2.png`, import.meta.url).href, name: '设备设施', url: 'https://element.eleme.cn/#/zh-CN/component/installation' },
      //     // { id: 2, img: new URL(`../../../../../assets/intelligentOilfield/yewu3.png`, import.meta.url).href, name: '生产管理', url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol' },
      //     // { id: 3, img: new URL(`../../../../../assets/intelligentOilfield/yewu4.png`, import.meta.url).href, name: '油藏管理', url: 'https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2' },
      //     // { id: 4, img: new URL(`../../../../../assets/intelligentOilfield/yewu5.png`, import.meta.url).href, name: '其它应用', url: 'https://ant.design/components/overview-cn' },
      //     // { id: 5, img: new URL(`../../../../../assets/intelligentOilfield/yewu6.png`, import.meta.url).href, name: '船体管理', url: 'https://www.isqqw.com/#/homepage' },
      //     {
      //       id: 6,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu1.png`, import.meta.url).href,
      //       name: '施工总览',
      //       url: 'https://element.eleme.cn/#/zh-CN/component/installation',
      //     },
      //     {
      //       id: 7,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu2.png`, import.meta.url).href,
      //       name: '痕迹管理',
      //       url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol',
      //     },
      //     {
      //       id: 8,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu3.png`, import.meta.url).href,
      //       name: '注采联动',
      //       url: 'https://www.isqqw.com/#/homepage',
      //     },
      //   ];
      //   // 选中
      //   this.selectedList = [
      //     {
      //       id: 0,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu1.png`, import.meta.url).href,
      //       name: '安全管理',
      //       url: 'https://www.isqqw.com/#/homepage',
      //     },
      //     {
      //       id: 1,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu2.png`, import.meta.url).href,
      //       name: '设备设施',
      //       url: 'https://element.eleme.cn/#/zh-CN/component/installation',
      //     },
      //     {
      //       id: 2,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu3.png`, import.meta.url).href,
      //       name: '生产管理',
      //       url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol',
      //     },
      //     {
      //       id: 3,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu4.png`, import.meta.url).href,
      //       name: '油藏管理',
      //       url: 'https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2',
      //     },
      //     {
      //       id: 4,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu5.png`, import.meta.url).href,
      //       name: '其它应用',
      //       url: 'https://ant.design/components/overview-cn',
      //     },
      //     {
      //       id: 5,
      //       img: new URL(`../../../../../assets/intelligentOilfield/yewu6.png`, import.meta.url).href,
      //       name: '船体管理',
      //       url: 'https://www.isqqw.com/#/homepage',
      //     },
      //   ];
      // 大屏list
      this.screenList = JSON.parse(JSON.stringify(this.selectedList));
    },
    submitForm() {
      // 将已选应用存储起来
      this.screenList = JSON.parse(JSON.stringify(this.storeSelectedList));
      // 调取接口
      this.cancel();
    },
    cancel() {
      // 将数据置为初始状态
      //   this.getDataList();
      this.openDialog = false;
      this.$emit("change-content-setting", false);
    },
    // 改变数据
    // eslint-disable-next-line
    changeData(selectedList, currentItem) {
      // 更新接口
      //     updateApp(currentItem).then((response) => {
      //   });
      //   this.storeSelectedList = JSON.parse(JSON.stringify(selectedList));
    },
    fullScreen() {
      // var element= document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById("fullScreen_panorama");
      // IE 10及以下ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
        // 写全屏后的执行函数
      } else if (element.requestFXullScreen) {
        element.requestFullScreen();
        // 写全屏后的执行函数
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        // 写全屏后的执行函数
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        // 写全屏后的执行函数
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        // 写全屏后的执行函数
      }
    },
    fullExit() {
      this.linkUrl = "";
      this.$store.commit("user/setProjectionMode", false);
      // var element= document.documentElement;//若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById("fullScreen_panorama");
      // IE ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
        // 写退出全屏后的执行函数
      } else if (element.requestFullScreen) {
        document.exitFullscreen();
        // 写退出全屏后的执行函数
      } else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
        // 写退出全屏后的执行函数
      } else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
        // 写退出全屏后的执行函数
      } else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
        // 写退出全屏后的执行函数
      }
    }
  }
};
</script>

<style scoped>
.bottomBtn {
  position: absolute;
  bottom: 0;
}

.divBox::after {
  content: "";
  width: 32%;
}
</style>