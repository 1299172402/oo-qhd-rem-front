<template>
  <page-panel header-title="生产环境发布申请单填写" style="height: calc(100% - 40px);">
    <edit-model
      :is-audit="isAudit"
      @cancel="handleReturn"
      @save="handleOk('save')"
      @submit="handleOk('submit')"
    >
      <div>
        <span>项目信息</span>
        <hr>
      </div>
      <el-form
        :ref="refName"
        :inline="true"
        class="form-layout"
        :rules="rules"
        :model="model"
      >
        <el-form-item label="客户单位:" prop="customName" class="form-layout__item-col2">
          <el-input v-model="model.customName" type="text" placeholder="请输入客户单位" />
        </el-form-item>
        <el-form-item label="项目名称:" prop="projectName" class="form-layout__item-col2">
          <el-input v-model="model.projectName" type="text" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="发布提出人:" prop="publishUserName" class="form-layout__item-col2">
          <el-input v-model="model.publishUserName" placeholder="发布提出人" />
        </el-form-item>
        <el-form-item label="发布执行时间:" prop="publishDate" class="form-layout__item-col2">
          <el-date-picker v-model="model.publishDate" type="date" placeholder="请选择上传日期" />
        </el-form-item>
        <el-form-item label="服务名称:" prop="serviceName" class="form-layout__item-col2">
          <el-input v-model="model.serviceName" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="升级版本号(原版本号):" prop="publishVersion" class="form-layout__item-col2">
          <el-input v-model="model.publishVersion" :disabled="true">
            <template slot="prepend">
              V
            </template>
          </el-input>
        </el-form-item>
        <div style="width: 100%;">
          <div>申请表信息</div>
          <hr>
        </div>
        <el-form-item label="申请类型" prop="applyType" class="form-layout__item-col2">
          <el-radio-group v-model="model.applyType">
            <el-radio v-for="item in dict.type.prod_env_apply_type" :key="item.value" :label="item.value">
              {{
                item.label
              }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布原因" prop="applyReasonType" class="form-layout__item-col2">
          <el-radio-group v-model="model.applyReasonType">
            <el-radio v-for="item in dict.type.prod_env_apply_reason" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布内容:" prop="publishContent" class="form-layout__item-col1">
          <el-input
            v-model="model.publishContent"
            type="textarea"
            :rows="2"
            placeholder="请输入发布内容"
          />
        </el-form-item>
        <el-form-item label="风险评估及控制措施:" prop="assessControl" class="form-layout__item-col1">
          <el-input
            v-model="model.assessControl"
            type="textarea"
            :rows="2"
            placeholder="请输入风险评估及控制措施"
          />
        </el-form-item>
        <el-form-item label="附件审批" prop="attachType" class="form-layout__item-col1">
          <el-checkbox-group v-model="model.attachType" @change="handleCheckBoxChange">
            <el-checkbox v-for="item in dict.type.prod_env_apply_attach_type" :key="item.value" :label="item.value">
              {{
                item.label
              }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-for="item in model.attachType"
          :key="`fileType_${item}`"
          :label="`${dictMap[item]}附件`"
          :prop="`fileType_${item}`"
          class="form-layout__item-col1"
        >
          <file-upload
            v-model="model[`fileType_${item}`]"
            :limit="1"
            :file-type="fileType"
            :is-show-tip="false"
            upload-type="local"
            @change="changeFileList($event, item)"
          />
        </el-form-item>
        <el-form-item
          v-if="!isAudit"
          label="选择下一节点审批人"
          prop="nextAuditUser"
          class="form-layout__item-col1"
        >
          <select-audit :api-fn="fn.auditFn" :show-dept="false" :page-model="model" />
        </el-form-item>
      </el-form>
    </edit-model>
  </page-panel>
</template>

<script>
import { ModelTemplate } from "../modules/model";
import { cloneDeep } from "lodash";
import EditMixin from "../../../../components/mixins/EditMixin";
import EditModel from "@/components/intelligentOilfield/pageLayout/EditModel.vue";
import { simpleRequired } from "../../../../utils/validate";
import { queryById, save, submit, startProcess } from "../../api/productionEnvironmentReleaseApi";
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import SelectAudit from "@/components/audit/nextAudit/SelectAudit";

export default {
  name: "ProdEnvironmentReleaseEdit",
  dicts: ["prod_env_apply_reason", "prod_env_apply_type", "prod_env_apply_attach_type"],
  components: {
    EditModel,
    FileUpload,
    SelectAudit
  },
  mixins: [EditMixin],
  data() {
    const rules = {};
    Object.keys(ModelTemplate).forEach(key => {
      rules[key] = simpleRequired;
    });
    return {
      fileType: ["doc", "docx", "xls", "xlsx", "pdf", "png", "jpg", "zip", "ppt"],
      textarea: "",
      model: cloneDeep(ModelTemplate),
      rules,
      fn: {
        save: (data, type) => {
          if (type !== "submit") {
            return save(data);
          }
          return submit(data);
        },
        findById: id => queryById(id).then(v => v.data.data),
        auditFn: () => startProcess()
      },
      fileMap: {},
      fileTypeMap: new Map(),
      dictMap: {},
      returnName: "ProdEnvironmentReleaseList"
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    "dict.type.prod_env_apply_attach_type": function(val) {
      val.forEach(item => {
        this.dictMap[item.value] = item.label;
        if (!this.model[`fileType_${item.value}`]) this.$set(this.model, `fileType_${item.value}`, "");
        this.rules[`fileType_${item.value}`] = simpleRequired;
      });
    }
  },
  methods: {
    beforeGetModel() {
      this.model.attachList = [];
      this.model.attachType = [];
    },
    modelOk() {
      if (this.isAdd) return;
      this.model.attachType = [];
      this.model.attachList.forEach(item => {
        const { fileType, filePath, fileName } = item;
        // 解析出attachType
        this.model.attachType.push(fileType);
        // 存入对应的上传文件内容
        this.$set(this.model, `fileType_${fileType}`, filePath);
        this.fileTypeMap.set(item.fileType, [{ name: fileName, url: filePath }]);
      });
      this.model.attachList = [];
    },
    getSaveModel() {
      if (!this.fileTypeMap) {
        return this.model;
      }
      const attachList = [];
      // 使用字典类型开始遍历
      this.dict.type.prod_env_apply_attach_type.forEach(dict => {
        const code = dict.value;
        // 从fileTypeMap中获取数组 遍历
        this.fileTypeMap.get(code)?.forEach(file => {
          const { name, url } = file;
          attachList.push({
            fileName: name,
            filePath: url,
            fileType: code
          });
        });
      });
      this.model.attachList = attachList;
      return this.model;
    },
    handleCheckBoxChange(val) {
      this.dict.type.prod_env_apply_attach_type.forEach(item => {
        const code = item.value;
        if (!val.includes(code)) {
          this.model[`fileType_${code}`] = "";
          this.fileTypeMap.delete(code);
          this.trimAttachList(code);
        }
      });
    },
    changeFileList(fileList, fileType) {
      if (!fileList || fileList.length === 0) {
        this.model[`fileType_${fileType}`] = "";
        if (this.model.attachList) {
          // 过滤掉该fileType的数据
          this.trimAttachList(fileType);
        }
      }
      // 将改文件存到fileTypeMap中，可以保证fileTypeMap中不会存入重复类型的文件
      this.fileTypeMap.set(fileType, fileList);
    },
    trimAttachList(code) {
      // 因为每个类型文件只能上传一个，所以我们这边可以直接把对应code的内容过滤掉
      this.model.attachList = this.model.attachList.filter(item => item.fileType !== code);
    }
  }
};
</script>

<style scoped lang="less">
@import "@/assets/styles/less/form.less";

.form-layout {
  .form-layout(200px);
}

/deep/ .el-upload {
  width: auto !important;
}
</style>