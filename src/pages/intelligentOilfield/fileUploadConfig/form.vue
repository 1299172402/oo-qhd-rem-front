<!-- 后台——文件上传配置表单页 -->
<template>
  <form-section
    submit-text=""
    save-text="保存"
    cancel-text="取消"
    :return-name="returnName"
    @save="handleOk"
  >
    <el-form
      ref="Form"
      :model="model"
      :rules="rules"
      :disabled="isView"
      class="form-layout"
      label-width="200px"
    >
      <el-form-item label="应用名称：" prop="appId" class="form-layout__item-col2">
        <div style="display: flex;">
          <el-input v-model="model.bizName" :title="model.bizName" placeholder="请选择应用名称" />
          <application-choose :multiple="false" @on-select-app="handleSelectApp" />
        </div>
      </el-form-item>
      <el-form-item label="存储路径：" prop="bizPath" class="form-layout__item-col2">
        <el-input v-model="model.bizPath" :title="model.bizPath" placeholder="请输入存储路径" />
      </el-form-item>
      <el-form-item label="上传类型：" prop="uploadType" class="form-layout__item-col2">
        <el-select
          v-model="model.uploadType"
          :disabled="isEdit ? true : false"
          placeholder="请选择上传类型"
          style="width: 100%;"
          :class="isView ? 'noBorder' : 'hasBorder'"
        >
          <el-option
            v-for="dict in dict.type.sys_file_upload_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="model.uploadType === 'minio'"
        prop="bucketName"
        class="form-layout__item-col2"
      >
        <span slot="label">
          <el-tooltip content="请用英文逗号进行分隔" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>
          minio桶：
        </span>
        <el-input v-model="model.bucketName" :title="model.bucketName" placeholder="请输入minio桶" />
      </el-form-item>
      <el-form-item prop="allowFileExtensions" class="form-layout__item-col2">
        <span slot="label">
          <el-tooltip content="请用英文逗号进行分隔" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>
          扩展名：
        </span>
        <el-input v-model="model.allowFileExtensions" :title="model.allowFileExtensions" placeholder="请输入扩展名" />
      </el-form-item>
      <el-form-item label="允许文件的最大大小：" prop="maxSize" class="form-layout__item-col2">
        <el-input-number v-model="model.maxSize" :title="model.maxSize" placeholder="请输入允许文件的最大大小" />
      </el-form-item>
      <el-form-item label="允许图片的宽度：" prop="imageWidth" class="form-layout__item-col2">
        <el-input-number v-model="model.imageWidth" :title="model.imageWidth" placeholder="请输入允许图片的宽度" />
      </el-form-item>
      <el-form-item label="允许图片的高度：" prop="imageHeight" class="form-layout__item-col2">
        <el-input-number v-model="model.imageHeight" :title="model.imageHeight" placeholder="请输入允许图片的高度" />
      </el-form-item>
      <el-form-item label="状态：" class="form-layout__item-col2">
        <el-radio-group v-model="model.status">
          <el-radio v-for="item in dict.type.sys_file_config_status" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </form-section>
</template>

<script>
import FormSection from "@/components/intelligentOilfield/FormSection.vue";
import ApplicationChoose from "@/components/intelligentOilfield/ChooseApps/index.vue";
import { save, findById } from "./fileConfig";
import { FormMixins } from "@/components/mixins/BytzFormMixins";

export default {
  dicts: ["sys_file_upload_type", "sys_file_config_status"],
  components: {
    FormSection,
    ApplicationChoose
  },
  mixins: [FormMixins],
  data() {
    return {
      returnName: "FileUploadConfig",
      isEdit: false,
      model: {
        appId: undefined,
        bizName: undefined,
        uploadType: undefined,
        bucketName: undefined,
        allowFileExtensions: undefined,
        maxSize: undefined,
        imageWidth: undefined,
        imageHeight: undefined,
        status: "0"
      },
      fn: {
        save,
        findById
      },
      rules: {
        appId: [{ required: true, message: "请选择应用", trigger: "change" }],
        bizPath: [{ required: true, message: "请输入存储路径", trigger: "change" }],
        uploadType: [{ required: true, message: "请选择上传类型", trigger: "change" }],
        bucketName: [{ required: true, message: "请输入minio桶", trigger: "change" }],
        allowFileExtensions: [{ required: true, message: "请输入扩展名", trigger: "change" }],
        maxSize: [{ required: true, message: "请输入允许图片的最大大小", trigger: "change" }]
      }
    };
  },
  computed: {
    // 是否查看
    isView() {
      return this.$route.query.action === "View";
    }
  },
  mounted() {
    if (this.$route.params.id) {
      const id = this.$route.params.id;
      findById(id).then(res => {
        if (!res.data.data.imageWidth) {
          res.data.data.imageWidth = undefined;
        }
        if (!res.data.data.imageHeight) {
          res.data.data.imageHeight = undefined;
        }
        this.model = res.data.data;
        this.isEdit = true;
      });
    }
  },
  methods: {
    /**
     * 选择应用带出信息
     */
    handleSelectApp(data) {
      this.model.appId = data.appId;
      this.model.bizName = data.appName;
    }
  }
};
</script>

<style lang="less" scoped>
.form-layout__item-col2 {
  width: 50%;
}

::v-deep .el-input-number {
  width: 272px;
}

.noBorder {
  ::v-deep .el-input {
    border: none;
  }
}
</style>