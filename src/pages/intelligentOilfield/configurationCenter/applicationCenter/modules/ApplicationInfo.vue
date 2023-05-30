<template>
  <el-form
    ref="form"
    :model="appInfo"
    :rules="rules"
    style="width: 800px;"
    label-width="180px"
    class="demo-ruleForm"
    :disabled="onlyRead"
  >
    <el-form-item label="AppID">
      {{ appInfo.appId || "自动生成" }}
    </el-form-item>
    <el-form-item label="AppSecret">
      <aside style="display: flex; justify-content: space-between;">
        <span v-if="!newAppSecret">******************</span>
        <span v-else>{{ appInfo.appSecret || "自动生成" }}</span>
        <el-button type="text" @click="handleRebuild">
          重新生成
        </el-button>
      </aside>
    </el-form-item>
    <el-form-item label="应用API根路径" prop="appOauthApiUrl">
      <el-input
        v-model="appInfo.appOauthApiUrl"
        :title="appInfo.appOauthApiUrl"
        placeholder="请输入应用API根路径"
        clearable
        @input="handleInput"
      />
    </el-form-item>
    <el-form-item label="应用OauthAPI登出地址" prop="oauthLogoutApiUrl">
      <el-input
        v-model="appInfo.oauthLogoutApiUrl"
        :title="appInfo.oauthLogoutApiUrl"
        placeholder="请输入应用OauthAPI登出地址"
        clearable
      />
    </el-form-item>
    <el-form-item label="应用OauthAPI回调地址" prop="oauthCallbackApiUrl">
      <el-input
        v-model="appInfo.oauthCallbackApiUrl"
        :title="appInfo.oauthCallbackApiUrl"
        placeholder="请输入应用OauthAPI回调地址"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { looselyValidURL } from "@/utils/validate.js";
import { autoAppSecret } from "@/api/intelligentOilfield/system/app.js";

export default {
  name: "ApplicationInfo",
  props: {
    applicationInfo: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: String,
      default: ""
    },
    onlyRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newAppSecret: false,
      rules: {
        appOauthApiUrl: [
          { required: true, message: "请输入正确的应用API根路径", trigger: ["change", "blur"] },
          { validator: this.validateBaseUrl, trigger: ["change", "blur"] }
        ],
        oauthLogoutApiUrl: [{ required: true, message: "请输入应用OauthAPI登出地址", trigger: ["change", "blur"] }],
        oauthCallbackApiUrl: [{ required: true, message: "请输入应用OauthAPI回调地址", trigger: ["change", "blur"] }]
      }
    };
  },
  computed: {
    appInfo: {
      get() {
        return this.applicationInfo;
      },
      set(val) {
        this.$emit("update:appInfo", val);
      }
    }
  },
  watch: {
    action: {
      handler(val) {
        if (val && val === "add") {
          this.initApi(val);
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 输入根路径时自动生成相关api
     */
    handleInput(val) {
      if (val) {
        if (val.slice(-1) === "/") {
          val = val.slice(0, val.length - 1);
        }
        const app = {
          oauthLogoutApiUrl: "/auth/logout",
          oauthCallbackApiUrl: "/auth/callback"
        };
        Object.keys(app).forEach(item => {
          this.$set(this.appInfo, item, `${val}${app[item]}`);
        });
      }
    },
    /**
     * 校验根路径格式是否正确
     */
    validateBaseUrl(rule, value, callback) {
      if (!looselyValidURL(value)) {
        callback(new Error("请输入正确的应用API根路径"));
      }
      callback();
    },
    /**
     * 初始化AppID和AppSecret
     */
    initApi() {
      this.loading = true;
      return Promise.all([this.getAppSecret()])
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 生成AppSecret
     */
    getAppSecret() {
      return autoAppSecret().then(res => {
        if (res.data.code === 200) {
          this.$set(this.appInfo, "appSecret", res.data.data);
        }
      });
    },
    /**
     * 重新生成appSecret
     */
    handleRebuild() {
      this.loading = true;
      this.getAppSecret()
        .finally(() => {
          if (!this.newAppSecret) {
            this.newAppSecret = true;
          }
          this.loading = false;
        });
    }
  }
};
</script>
<style scoped lang="less">
table.el-table {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  border: 1px solid #ebeef5;
  border-bottom: none;
  border-right: none;

  tr {
    td {
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      line-height: 40px;
      padding: 5px 10px;

      ::v-deep .el-form-item {
        margin: 5px 0 15px;
      }

      &.header {
        text-align: right;
        padding-right: 10px;
        width: 140px;
        box-sizing: border-box;
      }
    }

    &:hover {
      td {
        background-color: #f5f7fa;

        &.app-api {
          background: none;
        }
      }
    }
  }
}
</style>