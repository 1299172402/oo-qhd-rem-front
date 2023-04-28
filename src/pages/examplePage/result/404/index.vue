<template>
  <result title="" tip="当前用户无该模块访问权限" type="404">
    <t-button style="background: #409eff" @click="logoutPage">
      返回登录页
    </t-button>
  </result>
</template>

<script>
import result from "@/components/intelligentOilfield/result/index.vue";

export default {
  name: "Result404",
  components: { result },
  methods: {
    logoutPage() {
      Promise.all([
        this.$store.dispatch("user/logout"),
        this.$store.dispatch("permission/restore")
      ])
        .then(() => {
          this.$router.replace("/login");
        });
    }
  }
};
</script>