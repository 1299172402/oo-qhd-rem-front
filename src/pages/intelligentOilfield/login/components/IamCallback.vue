<template>
  <div v-loading="loading" />
</template>
<script>
import { callBackLogin } from "@/api/intelligentOilfield/login.js";
import router from "@/router";

import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";

export default {
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.loading = true;
    this.$store.commit("tabRouter/removeTabRouterList");
    localStorage.removeItem("tabRouterList");
    this.$store.commit("user/removeToken");
    const urlStr = window.location.hash.split("?")[1];
    if (urlStr) {
      const urlSearchParams = new URLSearchParams(urlStr);
      const result = Object.fromEntries(urlSearchParams.entries());
      if (!Object.hasOwnProperty.call(result, "code") || !Object.hasOwnProperty.call(result, "state")) {
        this.$message.error("参数不全，缺少code或state");
      } else {
        const data = {
          grantType: "corp_au_oauth",
          corpOauthCode: result.code,
          corpOauthState: result.state
        };
        let params = {};
        if (result.srid) {
          params = { srid: result.srid };
        }
        callBackLogin(data, params).then(res => {
          this.$store.commit("user/setToken", res.data.data.access_token);
          if (params.srid && res.data.data.redirectUrl) {
            // 参数携带srid需要直接进行跳转
            let baseURL = "";
            if (env === "development") {
              baseURL = `${window.location.origin}${proxy[env].API}`;
            } else {
              baseURL = proxy[env].API;
            }
            baseURL = `${baseURL}/auth${res.data.data.redirectUrl}`;
            window.location.href = baseURL;
          } else if (result.redirect) {
            router.push(result.redirect);
          } else {
            this.$router.push("/");
          }
        })
          .finally(() => {
            this.loading = false;
          });
      }
    } else {
      this.loading = false;
      this.$message.error("参数不全");
    }
  },
  render(h) {
    return h(); // avoid warning message
  }

};
</script>