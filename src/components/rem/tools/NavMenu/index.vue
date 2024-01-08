<template>
<!--     :default-active="defaultActiveKey"
    :default-openeds="opends" -->
    <!-- :default-openeds="opendsMenu" -->

  <menu
    v-bind="$props"
    :unique-opened="false"
    :default-active="activeMenu"
    class="nav-menu"
    :router="false"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <submenu
      v-for="(item, index) in menuData"
      :key="item[idLabel] || index"
      :data="item"
      :sub-index="String(item[idLabel] || index)"
      :path-name="pathName"
      :label-name="labelName"
      :icon-class="iconClass"
      :id-label="idLabel"
      :menus="flatMenus"
    ></submenu>
  </menu>
</template>
<script>
import { Menu } from "element-ui";
import store from "@/store/index.js";
import { mapState } from "vuex";
import submenu from "./submenu";
import { factorial, getParentIdArr } from "@/lib/comFun";
import {insertSysLogInfo} from '@/lib/menuDeal'
import VSAuth from "@vsui/lib-vueauth4vseaf";

const loginuserid = store.getters["APP/getLoginUserId"];
const businessType = store.getters.getBusinessType;

export default {
  name: "NavMenu",
  describe: "适用于QHD32-6平台",
  components: {
    Menu,
    submenu,
  },
  props: {
    ...Menu.props,
    pathName: {
      type: String,
      default: "path",
    },
    labelName: {
      type: String,
      default: "title",
    },
    iconClass: {
      type: String,
      default: "iconClass",
    },
    menuData: {
      type: Array,
      default: () => [],
    },
    idLabel: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      // menuData:[],
      defaultActiveKey: '',
      ip: '',
    };
  },
  methods: {

    getUserIP(){
      const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      if(RTCPeerConnection) (()=>{
        const rtc = new RTCPeerConnection();
        rtc.createDataChannel("");// 创建通道
        rtc.createOffer( offerDesc=>{// 创建并存储sdp数据
          rtc.setLocalDescription(offerDesc);
        }, e=>{
          // console.log(e);
        });
        rtc.onicecandidate = (evt)=>{// 监听candiDate事件
          if(evt.candidate){
            this.ip = evt.candidate.address;
          }
        }
      })();
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {
      let resId; let path;
      if (key) {
        try {
          const array = key.split('~~');
          resId = array[0];
          path = array[1];
          if (VSAuth.getAuthInfo().isLogined) {
            insertSysLogInfo(resId, this.ip);
          }
          this.$router.push({ path });
        } catch (e) {
        }
      }
      // if (
      //   this.routers.findIndex((item) => {
      //     let path = item.path || item[this.pathName];
      //     return path.replace(/^\//, "") == key.replace(/^\//, "");
      //   }) > -1
      // ) {
      //   // this.$store.commit('SET_BREADCRUMB_SHOW',true);
      //   this.$router.push({ path: key });
      // } else {
      //   const menu = this.flatMenus.find((item) => {
      //     let path = item.path || item[this.pathName];
      //     path.replace(/^\//, "") == key.replace(/^\//, "");
      //   });
      // }
    },
  },
  computed: {
    ...mapState({
      // menuData: state => state.PROJECT.menu,
      routers: (state) => state.breadcrumb.routers,
    }),
    opendsMenu(){
      const menu = Array.isArray(this.menuData)
        ? this.menuData
        : this.menuData.children
          ? this.menuData.children
          : [];
      return menu.map(item => item[this.idLabel])
    },
    opends() {
      const currentMenu = this.flatMenus.find((item) => {
        const path = item.path || item[this.pathName];
        return path.replace(/^\//, "") == this.$route.path.replace(/^\//, "");
      });
      if (!currentMenu || !currentMenu[this.idLabel]) return [];
      const parentArr = getParentIdArr(currentMenu.resId, this.menuData, {
        id: "resId",
        pid: "resPid",
      });
      return parentArr;
    },
    active() {
      const currentMenu = this.flatMenus.find((item) => {
        const path = item.path || item[this.pathName];
        return path.replace(/^\//, "") == this.$route.path.replace(/^\//, "");
      });
      if (!currentMenu || !currentMenu[this.idLabel]) return [];
      // console.log('currentMenu',currentMenu);
      return currentMenu[this.idLabel];
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    flatMenus() {
      return factorial(this.menuData);
    },
  },
  /**
   * 当页面第二次，工程信息已存，进行请求数据
   * */
  mounted() {

    this.getUserIP();
    const currentMenu = this.flatMenus.find((item) => {
      const path = item.path || item[this.pathName];
      return path.replace(/^\//, "") == this.$route.path.replace(/^\//, "");
    });
    if (!currentMenu || !currentMenu[this.idLabel]) return [];
    // console.log('currentMenu',currentMenu);
    this.defaultActiveKey =  currentMenu[this.idLabel];
  },
  /**
   * 当页面第一次打开，工程信息未存，请求数据
   */
};
</script>
<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  ::v-deep .el-menu-item{
    padding: 0;
  }
}
</style>
