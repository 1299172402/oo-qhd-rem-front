<template>
  <el-form
    ref="form"
    :model="user"
    :rules="rules"
    label-width="80px"
  >
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        placeholder="请输入新密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">
        保存
      </el-button>
      <!-- <el-button type="danger" size="mini" @click="close" class="cancelBtn">关闭</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwdByUserName } from "@/api/intelligentOilfield/system/user";
import returnPaterPage from "@/utils/returnPaterPage";
import { getCodeImg } from "@/api/intelligentOilfield/login";
import { encryptlogin } from "@/utils/jsencrypt";

export default {
  props: {
    userName: {
      type: String,
      default: ""
    }
  },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      tempUserName: this.userName,
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [{ required: true, message: "请输入旧密码" }],
        newPassword: [
          { required: true, message: "请输入新密码" },
          //   { min: 6, max: 20, message: '长度在 6 到 20 个字符'},
          {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F])[\da-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{12,20}$/,
            message: "必须包含大小写字母，数字和特殊字符，且字符在12到20之间"
          }
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码" },
          { required: true, validator: equalToPassword }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // updateUserPwdByUserName(this.tempUserName,this.user.oldPassword, this.user.newPassword).then((response) => {
          //   if (response ? response.data.code === 200 : false) {
          //     this.$modal.msgSuccess('修改成功');
          //   }
          // });
          getCodeImg().then(res => {
            const { publicKey } = res.data.publicKey;
            updateUserPwdByUserName(
              this.tempUserName,
              encryptlogin(this.user.oldPassword, publicKey),
              encryptlogin(this.user.newPassword, publicKey)
            ).then(response => {
              if (response ? response.data.code === 200 : false) {
                this.$modal.msgSuccess("修改成功");
                returnPaterPage(this.$route.path, "User");
              }
            });
          });
        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>