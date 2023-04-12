<template>
  <info-window
    class="info-window"
    info-width="373px"
    info-height="230px"
    header-align="center"
    :header-title="applicationInfo.appName"
  >
    <div class="app-info">
      <p>
        应用类型：
        <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`" style="display: inline-block;">
          <dict-tag :options="dictText" :value="applicationInfo.appType" />
        </span>
      </p>
      <p>
        支持终端：
        <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> {{ applicationInfo.isPc === 1 ? "网页端" : "" }} </span>
        <span v-if="applicationInfo.isPc === 1 && applicationInfo.isMobile === 1" :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> / </span>
        <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> {{ applicationInfo.isMobile === 1 ? "PDA端" : "" }} </span>
      </p>
      <div class="info-user">
        <p>授权租户：</p>
        <p :class="`user-info ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`" :title="applicationInfo.tenants">
          {{ applicationInfo.tenants }}
        </p>
      </div>
      <p>
        运行状态：<el-tag :type="applicationInfo.appStatus === '1' ? 'success' : 'danger' ">
          {{ applicationInfo.appStatus === '1' ? "正常" : "离线" }}
        </el-tag>
      </p>
    </div>
    <div class="app-button">
      <div
        v-for="(item, index) in systemInfo"
        :key="index"
        v-hasPermi="[item.permission]"
        @click=" item.icon !=='delete' ? (item.icon !== 'power' ? handleChange(item.path, item.pathaction) : handleAuthorize()) : handleDelete()"
      >
        <el-tooltip
          :content="item.label"
          placement="bottom"
        >
          <svg-icon
            :class="['svg-icon-class',item.className]"
            :icon-class="item.icon"
          />
        </el-tooltip>
      </div>
    </div>
  </info-window>
</template>

<script>
import { delApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";
import infoWindow from "@/components/intelligentOilfield/info-window/index.vue";

export default {
  name: "ApplicationCard",
  components: {
    infoWindow
  },
  props: {
    applicationInfo: {
      type: Object,
      default: () => ({})
    },
    dictText: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      loading: false,
      routeInfo: {
        edit: ""
      },
      systemInfo: [
        {
          label: "菜单管理",
          icon: "menu",
          path: "ApplicationMenu/:id",
          permission: "system:menu:list",
          appName: this.applicationInfo.appName
        },
        {
          label: "角色管理",
          icon: "role",
          path: "ApplicationRole/:id",
          permission: "system:role:list"
        },
        {
          label: "编辑应用",
          icon: "edit1",
          path: "ApplicationForm/:id?",
          permission: "system:meta:edit",
          pathaction: "edit"
        },
        {
          label: "应用授权",
          icon: "power",
          path: "handleAuthorize/:id",
          permission: "system:authorize:add"
        },
        {
          label: "删除",
          icon: "delete",
          className: "delete",
          permission: "system:meta:remove"
        }
      ]
    };
  },
  methods: {
    /**
     * 跳转到授权/编辑/菜单/角色页面
     */
    handleChange(pathName, pathaction) {
      if (pathaction) {
        this.$router.push({ name: pathName, query: { action: pathaction }, params: { id: this.applicationInfo.appId }});
      } else {
        this.$router.push({ name: pathName, params: { id: this.applicationInfo.appId }});
      }
    },
    handleAuthorize() {
      this.$router.push({ name: "ApplicationAuth/:id", params: { id: this.applicationInfo.appId }});
    },
    /**
     * 删除
     */
    handleDelete() {
      this.$modal
        .confirm(`是否确认删除应用名称为"${this.applicationInfo.appName}"的数据项？`)
        .then(() => {
          this.deleteApp();
        }).catch(() => {
          this.$message.warning("已取消");
        });
    },
    deleteApp() {
      this.loading = true;
      delApp(this.applicationInfo.appId).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功！");
          this.$emit("deleteOk");
        }
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped lang="less">
div.info-window {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);

  div.app-info {
    display: flex;
    padding: 10px 0 5px 20px;
    flex-direction: column;
    color: rgba(52, 144, 211, 1);
    font-size: 14px;

    p {
      line-height: 2.2;
    }

    .dark-color {
      color: #fff !important;
    }

    .info-span__deep {
      color: rgba(0, 96, 166, 1);
      font-weight: 700;
    }

    div.info-user {
      display: flex;
      align-items: center;

      p {
        display: inline-block;

        &.user-info {
          width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          text-indent: 4px;
          white-space: nowrap;
          cursor: default;
          color: rgba(0, 96, 166, 1);
          font-weight: 700;
        }
      }
    }
  }

  div.app-button {
    cursor: pointer;
    height: 50px;
    background-color: rgba(52, 144, 211, 0.10);
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .svg-icon-class {
      font-size: 24px;
      color: rgba(52, 144, 211, 1);

      &:not(.delete):hover {
        color: var(--light-blue-color);
      }

      &.delete {
        color: red;
      }
    }
  }
}
</style>