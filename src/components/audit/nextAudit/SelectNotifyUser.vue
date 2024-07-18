<template>
  <div class="select-notify-user">
    <select-auditor-by-dept
      :query-params="notifyUserSetting"
      :value="auditIdString"
      :select-users="selectUsers"
      :multi="true"
      @change="selectAuditorOk"
    />
  </div>
</template>
<script>
import Vue from "vue";
import SelectAuditorByDept from "./SelectAuditorByDept";

export default Vue.extend({
  name: "SelectNotifyUser",
  components: {
    SelectAuditorByDept
  },
  props: {
    // 通知用户配置规则
    notifyUserSetting: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 已选用户id字符串集合
      auditIdString: "",
      // 已选用户集合
      nextUserArray: []
    };
  },
  computed: {
    /**
     * 选中的审批人名称
     */
    selectUsers() {
      return this.nextUserArray.map(item => item.userRealName).join("，");
    }
  },
  methods: {
    /**
     * 选择用户后处理
     */
    selectAuditorOk(userArray, actId, idStr) {
      if (userArray.length === 0) {
        this.auditIdString = "";
        this.nextUserArray = [];
        this.auditorDataReduction();
      } else {
        this.nextUserArray = userArray.map(item => {
          const { userName, nickName, email, phonenumber } = item;
          return { id: userName, userId: userName, userRealName: nickName, name: nickName, email, phone: phonenumber };
        });
        this.auditIdString = idStr;
        this.auditorDataReduction();
      }
    },
    auditorDataReduction() {
      this.$emit("ok", this.nextUserArray);
    }
  }
});
</script>
<style scoped lang="less">
.select-notify-user {
  flex: 1;
}
</style>