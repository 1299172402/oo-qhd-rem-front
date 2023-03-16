<template>
  <!-- <div v-if="!data.hidden"> -->
  <el-submenu
    v-if="!data.hidden && data.children && data.children.length > 0"
    :index="data[idLabel] || String(subIndex)"
    unique-opened="true"
  >
    <template slot="title">
      <i :class="data[iconClass] ? data[iconClass] : ''"></i>
      <el-tooltip
        class="item"
        effect="highlight"
        :disabled="data[labelName].length < 6"
        :content="data[labelName]"
        placement="right"
        :open-delay="1000"
      >
        <span
          v-if="data[pathName]"
          :class="{ hasIcon: data[iconClass] }"
          @click.stop="subMenuClick(data)"
          >{{ data[labelName] }}</span
        >
        <span v-else :class="{ hasIcon: data[iconClass] }">{{
          data[labelName]
        }}</span>
      </el-tooltip>
    </template>
    <template v-if="data.children && data.children.length > 0">
      <SubMenu
        v-for="(sub, index) in data.children"
        :key="sub[idLabel] || subIndex + '-' + index"
        :data="sub"
        :index="sub[idLabel] || subIndex + '-' + index"
        :path-name="pathName"
        :label-name="labelName"
        :icon-class="iconClass"
        :sub-index="sub[idLabel] || subIndex + '-' + index"
        :id-label="idLabel"
        :menus="menus"
      ></SubMenu>
    </template>
  </el-submenu>
  <el-menu-item
    v-else
    :index="data['resId']+'~~'+data[pathName]"
    :class="['el-submenu', 'is-opened']"
    :disabled="!data[pathName]"
  >
    <div slot="title">
      <i :class="data[iconClass] ? data[iconClass] : ''"></i>
      <el-tooltip
        class="item"
        effect="highlight"
        :disabled="data[labelName].length < 6"
        :content="data[labelName]"
        placement="right"
        :open-delay="1000"
      >
        <span :class="{ hasIcon: data[iconClass] }">{{ data[labelName] }}</span>
      </el-tooltip>
    </div>
  </el-menu-item>
  <!-- </div> -->
</template>
<script>
import { mapState } from "vuex";
import store from "@/store/index.js";
import VSAuth from "@vsui/lib-vueauth4vseaf";
import {insertSysLogInfo} from "@/lib/menuDeal";

export default {
  name: "SubMenu",
  computed: {
    ...mapState({
      breadcrumbViews: (state) => state.breadcrumb.breadcrumbViews,
      // routers: (state) => state.breadcrumb.routers,
    }),
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
    subIndex: {
      type: String,
      default: 0,
    },
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
    idLabel: {
      type: String,
      default: "id",
    },
    menus: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ip: '',
    };
  },
  methods: {
    getActiveStatus(data) {
      data.path = data[this.pathName];
      if (
        this.$route.path !== "/iframe" &&
        this.menus.findIndex((item) => {
          let path = item.path || item[this.pathName];
          path.replace(/^\//, "") == data.path.replace(/^\//, "");
        }) > -1
      ) {
        if (
          this.$route.path.replace(/^\//, "") === data.path.replace(/^\//, "")
        ) {
          return "active";
        }
        return "";
      } else if (this.$route.path === "/iframe") {
        if (
          this.breadcrumbViews.path.replace(/^\//, "") ===
          data.path.replace(/^\//, "")
        ) {
          return "active";
        }
        return "";
      }
      return "";
    },
    subMenuClick(item) {
      //调用日志
      if (VSAuth.getAuthInfo().isLogined) {
        insertSysLogInfo(item.resId, this.ip);
      }
      if (item[this.pathName]) {
        console.log('item[this.pathName',item[this.pathName])
        this.$router.push({ path: item[this.pathName] });
      } else {
        return true;
      }
    },
    getUserIP(){
      console.log("getUserIP-->")
      let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      console.log("getUserIP-->RTCPeerConnection",RTCPeerConnection);
      if(RTCPeerConnection) (()=>{
        var rtc = new RTCPeerConnection();
        rtc.createDataChannel("");//创建通道
        rtc.createOffer( offerDesc=>{//创建并存储sdp数据
          rtc.setLocalDescription(offerDesc);
        }, e=>{
          console.log(e);
        });
        console.log("getUserIP-->RTCPeerConnection:trc",rtc);
        rtc.onicecandidate = (evt)=>{//监听candiDate事件
          console.log("rtc.onicecandidate-->",evt);
          if(evt.candidate){
            this.ip = evt.candidate.address;
          }
        }
      })();
    },
  },
};
</script>
<style lang="scss" scoped>
.item{
  display: inline-block;
  width: 100%;
  &.hasIcon {
    width: calc(100% - 26px);
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
}
</style>
