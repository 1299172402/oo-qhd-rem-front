<template>
  <div v-loading="loading" />
</template>
<script>
import router from "@/router";

import { getAppRedirectUrl } from "@/api/intelligentOilfield/getAppRedirectUrl.js";

import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";

export default {
  data() {
    return {
      loading: false
    };
  },
  created() {
    // 清空token等用户信息
    this.$store.commit("tabRouter/removeTabRouterList");
    this.$store.commit("user/removeToken");
    this.$store.commit("user/setUserInfo", { roles: [] });
    // 获取地址栏参数信息
    const { query } = this.$route;
    if (query.access_token) {
      // 参数存在access_token进行跳转
      this.$store.commit("user/setToken", query.access_token);
      if (query.redirect) {
        router.push(query.redirect);
      } else {
        this.$store.dispatch("user/getUserInfo")
          .then(() => {
            this.$store.dispatch("permission/initRoutes", this.$store.getters["user/roles"])
              .then(() => {
                const firstMenu = this.$store.getters["user/userDetail"]?.firstMenu;
                const firstRoputer = firstMenu ? `${firstMenu.path}/${firstMenu.children?.[0]?.path}` : "/pageInfo/error";
                router.push(firstRoputer);
              });
          });
      }
    } else {
      // 参数不存在access_token根据appId进行重定向后获取access_token
      const params = {
        appId: proxy[env].appId,
        redirect: window.location.href
      };
      this.loading = true;
      getAppRedirectUrl(params)
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            window.location.href = res.data.data;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>