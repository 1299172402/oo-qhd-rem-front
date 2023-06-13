<template>
  <el-form
    ref="form"
    :model="model"
    style="width: 800px;"
    :rules="rules"
    label-width="180px"
    class="demo-ruleForm"
    :disabled="onlyRead"
  >
    <el-form-item label="应用名称" prop="appName">
      <el-input v-model="model.appName" placeholder="请输入应用名称" clearable />
    </el-form-item>
    <el-form-item label="应用描述" prop="appDesc">
      <el-input
        v-model="model.appDesc"
        type="textarea"
        :autosize="{ minRows: 3 }"
        placeholder="请输入应用描述"
      />
    </el-form-item>
    <!-- <el-form-item label="应用分类" prop="appCategory" class="app-classify">
      <el-select
        v-model="model.appCategory"
        placeholder="请选择应用分类"
        style="width: 100%;"
        clearable
      >
        <el-option
          v-for="dict in dict.type.sys_app_category"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        />
      </el-select>
    </el-form-item> -->
    <el-form-item label="应用类型" prop="appType" class="app-classify">
      <el-select
        v-model="model.appType"
        placeholder="请选择应用类型"
        style="width: 100%;"
        clearable
      >
        <el-option
          v-for="dict in dict.type.sys_app_type"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="应用分类" prop="apply">
      <el-select v-model="model.apply">
        <el-option
          v-for="item in dict.type.sys_app_applyCenter"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="应用图标" prop="appImg">
      <file-upload
        v-model="model.appImg"
        :limit="1"
        :is-picture-card="true"
        :file-type="fileType"
        :is-show-tip="false"
        :view-only="onlyRead"
        biz-path="portal/oo-csc-upp-system-atom"
        bucket-name="picture-qhd326"
      />
    </el-form-item>

    <el-form-item label="应用状态" prop="appStatus">
      <el-radio-group v-model="model.appStatus">
        <el-radio v-for="item in dict.type.sys_app_status" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="支持终端" prop="mobile">
      <el-radio-group v-model="model.mobile" @change="handleMobile">
        <el-radio v-for="item in dict.type.sys_app_teminal" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="isPC" label="网页端入口链接" prop="appPcAccessUrl">
      <el-input v-model="model.appPcAccessUrl" placeholder="请输入网页端入口链接" clearable />
    </el-form-item>
    <el-form-item v-if="isMobile" label="选择移动端" prop="accessType">
      <el-radio-group v-model="model.accessType">
        <el-radio v-for="item in dict.type.sys_app_mobile" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="isMobile && model.accessType === '0'">
      <el-form-item label="iOS应用Scheme" prop="appIosSchema">
        <el-input v-model="model.appIosSchema" placeholder="请输入iOS应用Scheme" clearable />
      </el-form-item>
      <el-form-item label="Android应用Scheme" prop="appAndriodSchema">
        <el-input v-model="model.appAndriodSchema" placeholder="请输入Android应用Scheme" clearable />
      </el-form-item>
    </template>
    <el-form-item v-else-if="isMobile && model.accessType === '1'" label="移动端入口链接" prop="appMobileAccessUrl">
      <el-input v-model="model.appMobileAccessUrl" placeholder="请输入移动端入口链接" clearable />
    </el-form-item>
  </el-form>
</template>

<script>
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";

export default {
  name: "ApplicationForm",
  dicts: ["sys_app_category", "sys_app_status", "sys_app_type", "sys_app_mobile", "sys_app_applyCenter", "sys_app_teminal"],
  components: {
    FileUpload
  },
  props: {
    formModel: {
      type: Object,
      default: () => ({})
    },
    onlyRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileType: ["jpg", "png"],
      form: {},
      rules: {
        appName: [{ required: true, message: "请输入应用名称", trigger: ["change", "blur"] }],
        appDesc: [{ required: true, message: "请输入应用描述", trigger: ["change", "blur"] }],
        appType: [{ required: true, message: "请选择应用类型", trigger: ["change", "blur"] }],
        apply: [{ required: true, message: "请选择应用中心", trigger: ["change", "blur"] }],
        appCategory: [{ required: true, message: "请选择应用分类", trigger: ["change", "blur"] }],
        appImg: [{ required: false, message: "请上传应用图标", trigger: ["change", "blur"] }],
        appStatus: [{ required: true, message: "请选择应用状态", trigger: ["change", "blur"] }],
        mobile: [{ required: true, message: "请选择支持终端", trigger: ["change", "blur"] }],
        appPcAccessUrl: [{ required: true, message: "请输入网页端入口链接", trigger: ["change", "blur"] }],
        accessType: [{ required: true, message: "请选择移动端", trigger: ["change", "blur"] }],
        appIosSchema: [{ required: true, message: "请输入iOS应用Scheme", trigger: ["change", "blur"] }],
        appAndriodSchema: [{ required: true, message: "请输入Android应用Scheme", trigger: ["change", "blur"] }],
        appMobileAccessUrl: [{ required: true, message: "请输入移动端入口链接", trigger: ["change", "blur"] }]
      }
    };
  },
  computed: {
    /**
     * 终端包含移动端
     */
    isMobile() {
      return this.formModel.mobile?.includes("1");
    },
    /**
     * 终端包含PC端
     */
    isPC() {
      return this.formModel.mobile?.includes("0");
    },
    model: {
      get() {
        return this.formModel;
      },
      set(val) {
        this.$emit("update:model", val);
      }
    }
  },
  methods: {
    /**
     * 选择终端
     */
    handleMobile(val) {
      this.$set(this.model, "isPc", +val ? 0 : 1);
      this.$set(this.model, "isMobile", +val ? 1 : 0);
    }
  }
};
</script>
<style scoped lang="scss">
</style>