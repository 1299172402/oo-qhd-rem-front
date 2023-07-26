<template>
  <result title="" tip="当前用户无该模块访问权限" type="404">
    <t-button style="background: #409eff" @click="reBack">
      返回门户
    </t-button>
  </result>
</template>

<script>
import result from "@/components/intelligentOilfield/result/index.vue";
import { updateaccessPage } from "../../../../api/intelligentOilfield/system/user";
import { goNewPage } from "@/api/intelligentOilfield/system/layout.js";

export default {
  name: "Result404",
  components: { result },
  methods: {
    logoutPage() {
      const sysUser = { accessPage: "无权限", userName: this.$store.state.user.name };
      updateaccessPage(sysUser).then(() => {});
      Promise.all([
        this.$store.dispatch("user/logout"),
        this.$store.dispatch("permission/restore")
      ])
        .then(() => {
          this.$router.replace("/login");
        });
    },
    reBack() {
      goNewPage().then(res => {
        if (res.data?.data) {
          window.location.href = res.data.data;
        }
      });
    }
  }
};
</script>