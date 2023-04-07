<!-- 后台——用户管理-详情可编辑 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <info-window
          info-width="100%"
          info-height="100%"
          header-title="查看用户信息"
          :header-style="$store.state.setting.mode === 'dark' ? {} : {color:'#3490D3'}"
        >
          <div style="padding: 10px 20px;overflow: scroll" class="g-w100 g-h100">
            <div class="text-center">
              <user-avatar :user="user" />
              <div style="margin-bottom: 20px">
                {{ user.nickName }}
              </div>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="tree" />所属机构
                </div>
                <div v-if="user.dept" class="pull-right rightDiv">
                  {{ user.dept.deptName }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="peoples" />用户角色
                </div>
                <div class="pull-right rightDiv">
                  {{ roleGroup }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="post" />
                  用户岗位
                </div>
                <div class="pull-right rightDiv">
                  {{ postGroup }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="user" />
                  用户账号
                </div>
                <div class="pull-right rightDiv">
                  {{ user.userName }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="phone" />
                  手机号码
                </div>
                <div class="pull-right rightDiv">
                  {{ user.phonenumber }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="email" />
                  用户邮箱
                </div>
                <div class="pull-right rightDiv">
                  {{ user.email }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="tool" />
                  账号类型
                </div>
                <div class="pull-right rightDiv">
                  {{ user.userType }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="server" />
                  登录IP
                </div>
                <div class="pull-right rightDiv">
                  {{ user.loginIp }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  <svg-icon icon-class="date" />
                  最近登录时间
                </div>
                <div class="pull-right rightDiv">
                  {{ parseTime(user.loginDate) }}
                </div>
              </li>
            </ul>
          </div>
        </info-window>
      </el-col>
      <el-col :span="18" :xs="24">
        <info-window
          info-width="100%"
          info-height="100%"
          header-title="用户信息"
          :header-style="$store.state.setting.mode === 'dark' ? {} : {color:'#3490D3'}"
        >
          <div style="padding: 10px 20px;overflow: scroll" class="g-w100 g-h100">
            <user-info
              :user="allDatas"
              :role-options="roleOptions"
              :post-options="postOptions"
              @updateList="updateList"
            />
          </div>
        </info-window>
        <!-- // TODO: Maybe change back -->
        <!-- <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <user-info
                :user="allDatas"
                :role-options="roleOptions"
                :post-options="postOptions"
                @updateList="updateList"
              />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <reset-pwd :user="user" :user-name="userName" />
            </el-tab-pane>
          </el-tabs> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import { getUser } from "@/api/intelligentOilfield/system/user";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: { userAvatar, userInfo },
  data() {
    return {
      user: {},
      roleGroup: "",
      postGroup: "",
      activeTab: "userinfo",
      roleOptions: {},
      postOptions: {},
      allDatas: {},
      userName: this.$route.query.userName
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    // 更新左侧
    updateList() {
      this.getUser();
    },
    getUser() {
      getUser(this.$route.query.userId).then(response => {
        this.allDatas = response.data;
        this.allDatas.tempPostId = parseInt(response.data.postIds.toLocaleString(), 10);
        this.roleOptions = response.data.roles;
        this.postOptions = response.data.posts;

        this.user = response.data.data;
        this.roleGroup = "";
        this.user.roles.forEach(el => {
          this.roleGroup += `${el.roleName}/`;
        });
        response.data.posts.forEach(el => {
          if (el.postId === parseInt(response.data.postIds.toLocaleString(), 10)) {
            this.postGroup = el.postName;
          }
        });
        this.roleGroup = this.roleGroup.substr(0, this.roleGroup.length - 1);
        // this.roleGroup = response.roleGroup;
        // this.postGroup = response.postGroup;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.marginRight {
  width: 100px;
  margin-right: 4px;
}

.rightDiv {
  width: calc(100% - 106px);
  text-align: right
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
      }
    }
  }
}
</style>