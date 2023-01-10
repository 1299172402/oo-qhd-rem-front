<!-- 个人中心组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="个人中心">
      <div class="g-h100 g-row-flex" style="padding: 20px 20px 0 20px">
        <div style="width: 30%" class="">
          <div class="imageInfo"></div>
          <div class="text-center nameText">{{ $store.getters['user/name'] }}</div>
        </div>
        <div class="personInfo g-column-flex">
          <div>职位：{{userInfo.title}}</div>
          <div>登录IP：{{userInfo.loginIp}}</div>
          <div>最近登录：{{ parseTime(userInfo.loginDate) }}</div>
        </div>
      </div>
      <!-- <template #titleContent>
        <div>最近登录：2022.11.15 14:21:34</div>
      </template>
      <div style="padding: 20px" class="g-h100 g-row-flex-HV">
        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
        <div style="font-size: 18px; margin: 0 15px">{{ $store.getters['user/name'] }}</div>
        <div>-</div>
        <div></div>
        <div>-</div>
        <div>职能经理</div>
        <div>-</div>
        <div></div> 
      </div>-->
    </info-window>
  </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';

export default {
  components: {
    infoWindow,
  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      userInfo:{
        loginIp:'',
        loginDate:'',
        title:''  
      }
    };
  },
  created() {
    const roles = this.$store.getters['user/userDetail'].roles.join(',')
    this.userInfo.loginIp = this.$store.getters['user/userDetail'].user.loginIp
    this.userInfo.loginDate = this.$store.getters['user/userDetail'].user.loginDate
    this.userInfo.title = this.$store.getters['user/userDetail'].user.dept.deptName +  roles 
  }
};
</script>

<style scoped>
.imageInfo {
  background-image: url('@/assets/person.png');
  width: 80%;
  height: 80%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  /* margin: 5px 0 0 40px; */
}
.personInfo {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0060a6;
  margin: 0 0 30px 10px;
  justify-content: space-around;
}
.nameText {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}
</style>
