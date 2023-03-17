<template>
  <div :class="layoutCls">
    <t-head-menu
      :class="menuCls"
      :theme="theme"
      expandType="popup"
      :value="active"
      style="background: var(--bottom-light); margin-right: 0px"
    >
      <template #logo>
        <span v-if="showLogo" class="header-logo-container" style="font-size: 20px; width: 226px">
          <logo-full
            class="t-logo"
            style="width: 49px; height: 44px; margin-top: -10px; margin-right: 10px;"
          />
          <span class="headerText">智能油田管理系统</span>
        </span>
        <!-- TODO: Maybe change back -->
        <!-- <div v-if="layout !== 'top' && !$store.getters['user/isGroupLogin']" class="header-operate-left">
          <t-button theme="default" shape="square" variant="text" @click="changeCollapsed" style="background: transparent;border: 0px;">
            <view-list-icon class="collapsed-icon" style="color: var(--whiteColor)" />
          </t-button> -->
          <!-- <search :layout="layout" /> -->
        <!-- </div> -->
         <treeselect
                v-model="valueA"
                :options="tenantOptions"
                :show-count="true"
                placeholder="请选择所属机构"
                class="noBgBorderTree"
                style="width: 150px"
                :clearable="false"
                @select="treeselectSelect"
              />
      </template>
      <menu-content
        v-show="layout !== 'side' && !$store.getters['user/isGroupLogin']"
        class="header-menu"
        :navData="menu"
      />
      <template #operations>
        <div class="operations-container" style="margin-left: 20px">
          <!-- 搜索框 -->
          <!-- <search v-if="layout !== 'side'" :layout="layout" /> -->

          <!-- 全局通知，通告 -->
          <message />
          <!-- 全局通知，通告 -->
          <notice />
          <el-tooltip class="item" effect="dark" content="编辑面板" placement="bottom">
            <svg-icon @clickIcon="editPanel" icon-class="edit-panel" class="panelIconClass" />
          </el-tooltip>
          <!-- <t-button
            theme="default"
            variant="text"
            @click="projectionMode"
            style="color: var(--whiteColor)"
          ><swap-icon style="color: var(--whiteColor);"/>进入大屏模式</t-button> -->

          <t-dropdown :min-column-width="125" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <!-- <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleNav('/user/index')"
                >
                  <user-circle-icon />个人中心
                </t-dropdown-item> -->
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleLogout">
                  <poweroff-icon />退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text">
              <template #icon>
                <user-circle-icon class="header-user-avatar" style="color: var(--whiteColor)" />
              </template>
              <div class="header-user-account" style="color: var(--whiteColor)">
                {{ $store.getters['user/name'] }}
                <chevron-down-icon />
              </div>
            </t-button>
          </t-dropdown>
          <t-tooltip placement="bottom" content="系统设置" style="color: var(--whiteColor)">
            <t-button theme="default" shape="square" variant="text" @click="toggleSettingPanel" style="background: transparent;border: 0px;">
              <setting-icon />
            </t-button>
          </t-tooltip>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  ViewListIcon,
  //   LogoGithubIcon,
  //   HelpCircleIcon,
  UserCircleIcon,
  PoweroffIcon,
  SettingIcon,
  ChevronDownIcon,
  //   EditIcon,
  //   SwapIcon,
} from 'tdesign-icons-vue';
import { prefix } from '@/config/global';
import LogoFull from '@/assets/logo.svg';

import Notice from './Notice.vue';
import Message from './Message.vue';
// import Search from './Search.vue'
import MenuContent from './MenuContent.vue';
import { updateLastLogout } from "@/api/intelligentOilfield/login";
import { updateaccessPage , addAccessinfo } from '@/api/intelligentOilfield/system/user';
import {getTenantsByUserId} from '@/api/intelligentOilfield/system/dept';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { noticeList } from '@/api/intelligentOilfield/system/home';


export default Vue.extend({
  components: {
    MenuContent,
    LogoFull,
    Notice,
    Message,
    // Search,
    ViewListIcon,
    // LogoGithubIcon,
    // HelpCircleIcon,
    UserCircleIcon,
    PoweroffIcon,
    SettingIcon,
    ChevronDownIcon,
    // EditIcon,
    // SwapIcon,
    Treeselect,
  },
  props: {
    theme: String,
    layout: {
      type: String,
      default: 'top',
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    menu: {
      type: Array,
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
    isCompact: {
      type: Boolean,
      default: false,
    },
    maxLevel: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      prefix,
      visibleNotice: false,
      isSearchFocus: false,
      currentMode: '办公模式',
      valueA: this.$store.getters['user/tenantId'],
      tenantOptions: [],
    };
  },
  computed: {
    active() {
      if (!this.$route.path) {
        return '';
      }
      return this.$route.path
        .split('/')
        .filter((item, index) => index <= this.maxLevel && index > 0)
        .map((item) => `/${item}`)
        .join('');
    },
    showMenu() {
      return !(this.layout === 'mix' && this.showLogo === 'side');
    },
    layoutCls() {
      return [`${this.prefix}-header-layout`];
    },
    menuCls() {
      return [
        {
          [`${this.prefix}-header-menu`]: !this.isFixed,
          [`${this.prefix}-header-menu-fixed`]: this.isFixed,
          [`${this.prefix}-header-menu-fixed-side`]: this.layout === 'side' && this.isFixed,
          [`${this.prefix}-header-menu-fixed-side-compact`]: this.layout === 'side' && this.isFixed && this.isCompact,
        },
      ];
    },
    // isGroupLogin() {
    //   return sessionStorage.getItem('isGroupLogin') === 'true';
    // },
  },
  mounted() {
    this.getInitDeptds();
  },
  methods: {
    getInitDeptds() {
      getTenantsByUserId(this.$store.getters['user/userDetail'].user.userId).then((response) => {
        this.tenantOptions = response.data.data.map(item=>({label:item.tenantName,id:item.tenantId}));
        this.valueA = this.tenantOptions[0]?.id;
        this.$store.commit('user/SETTENANTID', this.valueA);
        this.noticeList();
      });
    },
    // 编辑面板
    editPanel() {
      this.$bus.$emit("emitBus");
    },
    // 进入大屏模式
    projectionMode() {
      this.$store.commit('user/setProjectionMode', true);
    },
    toggleSettingPanel() {
      this.$store.commit('setting/toggleSettingPanel', true);
    },
    handleLogout() {
      // logout().then(res => {
      //     this.$confirm('确定注销并退出系统吗？', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       if(res.data.code === 200) {
      //         this.$store.dispatch('user/logout');
      //         this.$store.dispatch('permission/restore');
      //         this.$router.push(`/login?redirect=${this.$router.history.current.fullPath}`);
      //       }
      //     })
      //   });
      //   console.log('当前路由', this.$router.app?.$route?.path);
      let currentSystem = 0; // 0:门户，1：后台管理系统
      if (
        this.$router.app?.$route?.path === '/portal/projectionMode' ||
        this.$router.app?.$route?.path === '/portal/officeMode'
      ) {
        currentSystem = 0;
      } else {
        currentSystem = 1;
      }
      const params = {
        userName: this.$store.getters['user/name'],
        logout: currentSystem,
      };
      updateLastLogout(params).then((res) => {
        if (res.data.code === 200) {
          //   console.log('退出登录结果===', res);
        }
      });

      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 更新访问页面
          const sysUser = { accessPage: this.$store.state.route.meta.title, userName: this.$store.state.user.name };
          updateaccessPage(sysUser).then((res) => {
            console.log(res);
          });
          this.$store.dispatch('user/logout');
          this.$store.dispatch('permission/restore');
          this.$router.push(`/login?redirect=${this.$router.history.current.fullPath}`);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changeCollapsed() {
      this.$store.commit('setting/toggleSidebarCompact');
    },
    handleNav(url) {
      this.$router.push(url);
    },
    treeselectSelect(node){
      this.$store.commit('user/SETTENANTID', node.id);
      this.noticeList();
    },
    noticeList() {
      noticeList(this.$store.getters['user/tenantId']).then(response => {
        let val = ''
        response.data.data.forEach(item => {
          val += `${item.noticeContent}                                                                                                    `
        })
        this.$store.commit('user/SETNOTICE', val);
      })
    }
  },
});
</script>
<style lang="less">
@import '@/style/variables.less';

.header-menu {
  flex: 1 1 1;
  display: inline-flex;
}

.operations-container {
  display: flex;
  align-items: center;
  margin-right: 12px;

  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-button {
    margin: 0 8px;

    &.header-user-btn {
      margin: 0;
      background: transparent;
      border: 0px;
    }
  }

  .t-icon {
    font-size: 20px;

    &.general {
      margin-right: 16px;
    }
  }
}

.header-operate-left {
  display: flex;
  margin-left: -20px;
  align-items: normal;
  line-height: 0;

  .collapsed-icon {
    font-size: 20px;
  }
}

.header-logo-container {
  width: 184px;
  height: 26px;
  display: flex;
  margin-left: 24px;
  //   color: var(--td-text-color-primary);
  color: var(--whiteColor);
.headerText{
    width: 146px;
height: 25px;
font-size: 18px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #FFFFFF;
line-height: 25px;
}
  .t-logo {
    width: 100%;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.header-user-account {
  display: inline-flex;
  align-items: center;
  color: var(--td-text-color-primary);

  .t-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}

.t-head-menu__inner {
  border-bottom: 1px solid var(--td-border-level-1-color);
}

.t-menu--light {
  .header-user-account {
    color: var(--td-text-color-primary);
  }
}

.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
  }

  .header-user-account {
    color: rgba(255, 255, 255, 0.55);
  }

  .t-button {
    --ripple-color: var(--td-gray-color-10) !important;

    &:hover {
      background: var(--td-gray-color-12) !important;
    }
  }
}

.operations-dropdown-container-item {
  width: 100%;
  display: flex;
  align-items: center;

  .t-icon {
    margin-right: 8px;
  }

  .t-dropdown__item {
    .t-dropdown__item__content {
      display: flex;
      justify-content: center;
    }

    .t-dropdown__item__content__text {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }

  .t-dropdown__item {
    width: 100%;
    margin-bottom: 0px;
  }

  &:last-child {
    .t-dropdown__item {
      margin-bottom: 8px;
    }
  }
}
</style>
<style scoped>
.panelIconClass {
  width: 40px !important;
  height: 25px !important;
  cursor: pointer;
  color: #fff;
}
</style>