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
          @change="selectUploadType"
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
          minio桶:
        </span>
        <el-input v-model="model.bucketName" :title="model.bucketName" placeholder="请输入minio桶" />
      </el-form-item>
      <el-form-item
        v-if="model.uploadType === 'minio'"
        label="桶类型："
        prop="bucketType"
        class="form-layout__item-col2"
      >
        <el-select
          v-model="model.bucketType"
          :disabled="isEdit ? true : false"
          placeholder="请选择桶类型"
          style="width: 100%;"
          :class="isView ? 'noBorder' : 'hasBorder'"
          @change="selectBucketType"
        >
          <el-option
            v-for="dict in dict.type.sys_minio_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="model.uploadType === 'minio' && model.appId !== '$system$'"
        label="所属租户："
        prop="tenantCode"
        class="form-layout__item-col2"
      >
        <el-select
          v-model="model.tenantCode"
          placeholder="请选择所属租户"
          :disabled="isEdit ? true : false"
          style="width: 100%;"
          @change="selectTenant"
        >
          <el-option
            v-for="item in tenantOptions"
            :key="item.tenantId"
            :label="item.tenantName"
            :value="item.tenantCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="allowFileExtensions" class="form-layout__item-col2">
        <span slot="label">
          <el-tooltip content="请用英文逗号进行分隔" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>
          扩展名：
        </span>
        <el-input
          v-model="model.allowFileExtensions"
          :disabled="model.uploadType === 'minio'"
          :title="model.allowFileExtensions"
          placeholder="请输入扩展名"
        />
      </el-form-item>
      <el-form-item prop="maxSize" class="form-layout__item-col2">
        <span slot="label">
          <el-tooltip content="单位为MB" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>
          允许文件的最大大小：
        </span>
        <el-input-number
          v-model="model.maxSize"
          :min="0"
          :title="model.maxSize"
          placeholder="请输入允许文件的最大大小"
        />
      </el-form-item>
      <el-form-item label="允许图片的宽度：" prop="imageWidth" class="form-layout__item-col2">
        <el-input-number
          v-model="model.imageWidth"
          :min="0"
          :title="model.imageWidth"
          placeholder="请输入允许图片的宽度"
        />
      </el-form-item>
      <el-form-item label="允许图片的高度：" prop="imageHeight" class="form-layout__item-col2">
        <el-input-number
          v-model="model.imageHeight"
          :min="0"
          :title="model.imageHeight"
          placeholder="请输入允许图片的高度"
        />
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
import { getTenantsByUserId } from "@/api/intelligentOilfield/system/dept";

export default {
  dicts: ["sys_file_upload_type", "sys_file_config_status", "sys_minio_type"],
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
        status: "0",
        bucketType: undefined,
        tenantCode: undefined,
        tenantName: undefined
      },
      fn: {
        save: data => save({
          ...data,
          maxSize: data.maxSize === undefined ? null : data.maxSize,
          imageWidth: data.imageWidth === undefined ? null : data.imageWidth,
          imageHeight: data.imageHeight === undefined ? null : data.imageHeight
        }),
        findById
      },
      rules: {
        appId: [{ required: true, message: "请选择应用", trigger: "change" }],
        bizPath: [{ required: true, message: "请输入存储路径", trigger: "change" }],
        uploadType: [{ required: true, message: "请选择上传类型", trigger: "change" }],
        bucketName: [{ required: true, message: "请输入minio桶", trigger: "change" }],
        allowFileExtensions: [{ required: true, message: "请输入扩展名", trigger: "change" }],
        maxSize: [{ required: true, message: "请输入允许文件的最大大小", trigger: "change" }],
        bucketType: [{ required: true, message: "请选择桶类型", trigger: "change" }],
        tenantCode: [{ required: true, message: "请选择所属租户", trigger: "change" }]
      },
      tenantOptions: []
    };
  },
  computed: {
    // 是否查看
    isView() {
      return this.$route.query.action === "View";
    }
  },
  watch: {
    "model.uploadType": {
      handler(val) {
        this.rules.allowFileExtensions[0].required = val !== "minio";
      }
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
    this.getInitDeptds();
  },
  methods: {
    /**
     * 选择应用带出信息
     */
    handleSelectApp(data) {
      this.model.appId = data.appId;
      this.model.bizName = data.appName;
      if (data.appId === "$system$") {
        this.model.tenantName = undefined;
        this.model.tenantCode = undefined;
      }
    },
    selectBucketType(val) {
      if (val && this.dict?.type?.sys_minio_type) {
        this.model.allowFileExtensions = this.dict.type.sys_minio_type.find(item => item.value === val).raw.remark;
      }
    },
    selectTenant(val) {
      this.model.tenantName = this.tenantOptions.find(item => item.tenantCode === val).tenantName;
    },
    getInitDeptds() {
      getTenantsByUserId(this.$store.getters["user/userDetail"].user.userId).then(response => {
        this.tenantOptions = response.data.data;
      });
    },
    selectUploadType(val) {
      if (val !== "minio") {
        this.model.tenantName = undefined;
        this.model.tenantCode = undefined;
        this.model.bucketName = undefined;
        this.model.bucketType = undefined;
        this.model.allowFileExtensions = undefined;
      }
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