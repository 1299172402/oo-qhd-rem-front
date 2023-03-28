<!-- 后台——用户管理-详情可编辑 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>查看用户信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
              <div style="margin-bottom: 20px">{{ user.nickName }}</div>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="tree" class="marginRight" />所属机构
                <div class="pull-right" v-if="user.dept">{{ user.dept.deptName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" class="marginRight" />
                用户角色
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="post" class="marginRight" />
                用户岗位
                <div class="pull-right">{{ postGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" class="marginRight" />
                用户账号
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" class="marginRight" />
                手机号码
                <div class="pull-right">{{ user.phonenumber }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" class="marginRight" />
                用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tool" class="marginRight" />
                账号类型
                <div class="pull-right">{{ user.userType }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="server" class="marginRight" />
                登录IP
                <div class="pull-right">{{ user.loginIp }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" class="marginRight" />
                最近登录时间
                <div class="pull-right">{{ parseTime(user.loginDate) }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>编辑用户信息</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo
                @updateList="updateList"
                :user="allDatas"
                :roleOptions="roleOptions"
                :postOptions="postOptions"
              />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" :userName="userName" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from './userAvatar.vue';
import userInfo from './userInfo.vue';
import resetPwd from './resetPwd.vue';
import { getUser } from '@/api/intelligentOilfield/system/user';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: '',
      postGroup: '',
      activeTab: 'userinfo',
      roleOptions: {},
      postOptions: {},
      allDatas: {},
      userName: this.$route.query.userName,
    };
  },
  created() {
    console.log('获取详情===', this.$route.query);
    this.getUser();
  },
  methods: {
    // 更新左侧
    updateList() {
      this.getUser();
    },
    getUser() {
      getUser(this.$route.query.userId).then((response) => {
        this.allDatas = response.data;
        this.allDatas.tempPostId = parseInt(response.data.postIds.toLocaleString(), 10);
        this.roleOptions = response.data.roles;
        this.postOptions = response.data.posts;

        this.user = response.data.data;
        this.roleGroup = '';
        this.user.roles.forEach((el) => {
          this.roleGroup += `${el.roleName}/`;
        });
        response.data.posts.forEach((el) => {
          if (el.postId === parseInt(response.data.postIds.toLocaleString(), 10)) {
            this.postGroup = el.postName;
          }
        });
        this.roleGroup = this.roleGroup.substr(0, this.roleGroup.length - 1);
        // this.roleGroup = response.roleGroup;
        // this.postGroup = response.postGroup;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.marginRight {
  margin-right: 4px;
}
.app-container {
  height: 100%;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      .el-card{
        height: 100%;
        overflow: scroll;
        .el-card__body{
          
        }
      }
    }
  }
}
</style>