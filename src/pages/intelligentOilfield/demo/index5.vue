<!-- 后台——用户管理-详情可编辑 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <info-window
          info-width="100%"
          info-height="100%"
          header-title="用户基础信息"
          :header-style="$store.state.setting.mode === 'dark' ? {} : { color: '#0075E9' }"
        >
          <div style="padding: 10px 20px; overflow: scroll;" class="g-w100 g-h100">
            <div class="text-center">
              <user-avatar :user="user" />
              <div style="margin-bottom: 20px;">
                {{ user.nickName ? user.nickName : '无' }}
              </div>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  所属机构
                </div>
                <div v-if="user.dept" class="pull-right rightDiv">
                  {{ user.dept.deptName }}
                </div>
                <div v-else>
                  无
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  手机号码
                </div>
                <div class="pull-right rightDiv">
                  {{ user.phonenumber ? user.phonenumber : '无' }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  用户邮箱
                </div>
                <div class="pull-right rightDiv">
                  {{ user.email ? user.email : '无' }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  登录IP
                </div>
                <div class="pull-right rightDiv">
                  {{ user.loginIp ? user.loginIp : '无' }}
                </div>
              </li>
              <li class="list-group-item g-flex">
                <div class="marginRight">
                  最近登录时间
                </div>
                <div class="pull-right rightDiv">
                  {{ user.loginDat ? parseTime(user.loginDate) : '无' }}
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
          header-title="用户账号信息"
          :header-style="$store.state.setting.mode === 'dark' ? {} : { color: '#0075E9' }"
        >
          <div style="padding: 10px 20px; overflow: scroll;" class="g-w100 g-h100">
            <el-form
              ref="formRef"
              :model="allDatas"
              label-width="80px"
              class="userInfo"
            >
              <div class="headerinfo" style="margin-bottom: 30px;">
                账号
              </div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="用户姓名" prop="nickName">
                    <el-input
                      v-model="allDatas.nickName"
                      disabled
                      placeholder="暂无数据"
                      maxlength="30"
                      @input="refreshSelect"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="用户账号" prop="userName">
                    <el-input
                      v-model="allDatas.userName"
                      disabled
                      placeholder="暂无数据"
                      maxlength="30"
                      @input="refreshSelect"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号类型" prop="userType">
                    <el-input
                      v-model="allDatas.userType"
                      disabled
                      placeholder="暂无数据"
                      maxlength="11"
                      @input="refreshSelect"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="账号邮箱" prop="email">
                    <el-input
                      v-model="allDatas.email"
                      disabled
                      placeholder="暂无数据"
                      maxlength="50"
                      @input="refreshSelect"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="用户手机" prop="phonenumber">
                    <el-input
                      v-model="allDatas.phonenumber"
                      disabled
                      placeholder="暂无数据"
                      maxlength="11"
                      @input="refreshSelect"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证" prop="idCard">
                    <div>
                      <el-input
                        v-model="allDatas.idCard"
                        placeholder="暂无数据"
                        maxlength="30"
                        disabled
                      />
                      <el-tooltip
                        v-if="allDatas.userId === $store.getters['user/userDetail'].user.userId"
                        class="item"
                        effect="dark"
                        content="点击一下小眼睛显示全部"
                        placement="bottom"
                      >
                        <i class="searchStyle el-icon-view" @click="showOrHidden" />
                      </el-tooltip>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="所属机构" prop="deptId">
                    <el-input
                      v-model="allDatas.deptName"
                      disabled
                      placeholder="暂无数据"
                      maxlength="30"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属租户" prop="deptId">
                    <el-input
                      v-model="allDatas.tenantName"
                      disabled
                      placeholder="暂无数据"
                      maxlength="30"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="headerinfo" style="margin-bottom: 30px;">
                角色与岗位信息
              </div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="用户角色" prop="roleIds">
                    <el-select
                      v-model="allDatas.roleIds"
                      disabled
                      multiple
                      class="customSelect"
                      placeholder="暂无角色"
                    >
                      <el-option
                        v-for="item in roleOptions"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="用户岗位">
                    <el-select
                      v-model="allDatas.postIds"
                      disabled
                      multiple
                      class="customSelect"
                      placeholder="暂无岗位"
                    >
                      <el-option
                        v-for="item in postOptions"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </info-window>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "@/pages/intelligentOilfield/userManagement/components/userAvatar.vue";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: { userAvatar },
  data() {
    return {
      user: {
        userName: "22312312",
        nickName: "张三",
        phonenumber: "15935629635",
        dept: {
          deptName: "总公司"
        },
        email: "123546@qq.com",
        loginIp: "",
        loginDat: ""
      },
      roleOptions: [],
      postOptions: [],
      allDatas: {
        nickName: "张三",
        userName: "22312312",
        userType: "集团账号",
        email: "123546@qq.com",
        phonenumber: "15935629635",
        idCard: "",
        dept: {
          deptName: "总公司"
        },
        deptName: "总公司",
        tenantName: "智能油田门户,作业公司",
        roleIds: ["角色1", "角色2", "角色3"],
        postIds: ["岗位1", "岗位2", "岗位3"]
      }
    };
  },
  methods: {
    // 强制刷新
    refreshSelect() {
      this.$forceUpdate();
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
  text-align: right;
}

.app-container {
  height: 100%;

  .el-row {
    height: 100%;

    .el-col {
      height: 100%;

      .el-card {
        height: 100%;
        overflow: scroll;
      }
    }
  }
}

.el-form {
  /deep/ .el-input.is-disabled .el-input__inner {
    color: var(--td-text-color-primary);
  }
}

/deep/ .customSelect {
  max-height: 96px !important;
  width: 100% !important;
}

/deep/ .customSelect .el-select__tags .el-tag.el-tag--info {
  background: var(--select-tag-info) !important;
  border: unset !important;
  color: #83939b;
}

/deep/ .customSelect .el-select__tags {
  max-width: unset !important;
  padding: 0 5px !important;
  max-height: 86px !important;
  overflow: auto !important;
  align-content: flex-start !important;
}

/deep/ .el-tag {
  color: #6f858f;
}

/deep/ .customSelect .el-input--suffix {
  max-height: 96px !important;
}

/deep/ .el-select .el-input {
  background: rgba(22, 53, 70, 1) !important;
  border: 1px solid var(--select-input-border) !important;
}

/deep/ .el-select .el-input .el-select__caret {
  color: transparent !important;
}

/deep/ .customSelect .el-input.is-disabled .el-input__inner {
  border: unset !important;
}
</style>