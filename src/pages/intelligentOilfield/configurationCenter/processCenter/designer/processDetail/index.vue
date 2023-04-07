
<template>
  <form-section submit-text="" save-text="" cancel-text="">
    <div class="display-flex process-detail-main">
      <form-auto-create
        :ref="refName"
        style="width: 300px; min-width: 300px; flex-wrap: nowrap; overflow-y: scroll;"
        :view-only="true"
        :model="model"
        :items="items"
        form-class="form-layout--140 column"
        @ok="handleOk('save')"
      />
      <div v-show="showImg" class="flex-1">
        <p class="tip">
          注：
          <br>1. 只有可视化编辑器页面中的修改需要发布流程才能生效，其它页面的修改即刻生效。
          <br>2. 此界面的导出功能仅导出流程图，即可视化在线编辑器中的内容，本界面导出的文件在流程列表页进行导入。
          <br>3. 节点设计器中的数据请在节点设计器界面执行导出/导入操作。
        </p>
        <div class="img-container">
          <img
            v-if="modelId"
            :src="`${imgSrc}`"
          >
        </div>
      </div>
      <node-setting
        v-if="!showImg"
        class="flex-1"
        :model-id="modelId"
        :model-key="model.key"
        :app-id="model.appId"
        @cancel="showImg = true"
      />
    </div>
    <common-dialog
      v-model="copyVisible"
      label
      dialog-title="复制模型"
      append-to-body
      @ok="validate('formAutoCreateCopy')"
    >
      <form-auto-create
        ref="formAutoCreateCopy"
        :model="copyModel"
        :items="copyItems"
        form-class="form-layout--140 column"
        @ok="handleCopyOk"
      />
    </common-dialog>
    <process-info
      label=""
      :body-scroll="true"
      :model-id="editModelId"
      :process-center-info="{tenantCode: model.tenantId}"
      @ok="getModel(modelId)"
      @closed="editModelId = undefined"
    />
    <div v-show="showImg" slot="btn" class="gap-container text-right ">
      <el-button :disabled="loading" icon="el-icon-back" @click="handleBack">
        取消
      </el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        :disabled="loading"
        @click="handleDelete"
      >
        删除
      </el-button>
      <el-button :disabled="loading" icon="el-icon-edit" @click="editModelId = modelId">
        修改
      </el-button>
      <el-button :disabled="loading" icon="el-icon-copy-document" @click="handleCopy">
        复制
      </el-button>
      <el-button :disabled="loading" icon="el-icon-files" @click="handlePublish">
        发布
      </el-button>
      <el-button :disabled="loading" icon="el-icon-download" @click="handleExport(modelId)">
        导出
      </el-button>
      <el-button
        :disabled="loading"
        icon="el-icon-edit"
        type="primary"
        @click="showImg = false;"
      >
        节点设计器
      </el-button>
      <node-editor
        :btn="{
          type: 'primary',
          icon: 'el-icon-edit',
          disabled: loading
        }"
        :model-id="modelId"
        :tenant-id="model.tenantId"
        @refresh="getModel(modelId); $emit('ok')"
      />
    </div>
  </form-section>
</template>
<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import FormAutoCreate from "@/components/intelligentOilfield/form-auto-create/FormAutoCreate.vue";
import NodeEditor from "../modules/NodeEditor.vue";
import NodeSetting from "../modules/NodeSetting.vue";
import ProcessInfo from "../modules/ProcessInfo.vue";
import FormSection from "@/components/intelligentOilfield/FormSection.vue";
import { FormMixins } from "@/components/audit/mixins/FormMixins.js";
import { processCenterPrefixApiMixin } from "../../indexMixin";

import { findById, deleteById, copyInfo, publish, exportInfo } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/designer";

import { download } from "@/components/upload/utils/api.ts";
import { requiredLengthLE20 } from "@/utils/validate.js";

export default {
  name: "ProcessDetail",
  components: {
    CommonDialog,
    FormAutoCreate,
    NodeEditor,
    NodeSetting,
    ProcessInfo,
    FormSection
  },
  mixins: [FormMixins, processCenterPrefixApiMixin],
  data() {
    return {
      // true 时显示流程图，否则显示流程节点配置
      showImg: true,
      copyVisible: false,
      editModelId: undefined,
      copyModel: {},
      copyItems: [
        {
          label: "模型名称",
          prop: "name",
          required: true
        },
        {
          label: "模型key",
          prop: "key",
          required: true,
          rules: requiredLengthLE20
        },
        {
          label: "描述",
          prop: "description",
          type: "textarea"
        }
      ],
      model: {},
      items: [
        {
          label: "模型名称",
          prop: "name"
        },
        {
          label: "模型key",
          prop: "key"
        },
        {
          label: "版本",
          prop: "version"
        },
        {
          label: "最后修改人",
          prop: "lastUpdatedBy"
        },
        {
          label: "修改时间",
          prop: "lastUpdated",
          translate: this.$options.filters.moment
        },
        {
          label: "标签",
          prop: "tags",
          translate: val => val?.join("，") || ""
        },
        {
          label: "完成是否回调",
          prop: "processCompleteCallback",
          translate: val => (val === "false" ? "否" : "是")
        },
        {
          label: "流程结束回调处理类",
          prop: "processCompleteCallbackClass"
        },
        {
          label: "节点默认视图组件",
          prop: "defaultActViewComponent"
        },
        {
          label: "租户id",
          prop: "tenantId"
        },
        {
          label: "描述",
          prop: "description"
        }
      ],
      fn: {
        findById,
        publish,
        exportInfo
      },
      returnName: "Designer",
      imgSrc: undefined
    };
  },
  methods: {
    /**
     * 获取数据处理
     */
    getFindModel(re) {
      this.updateImg();
      if (!this.$route.query.identify) {
        this.$router.push({
          query: { identify: re.tenantId }
        });
      }

      return re;
    },
    /**
     * 更新图片
     */
    updateImg() {
      const random = Math.ceil(Math.random() * 100000);
      this.imgSrc = `${this.prefixApi}/app/rest/models/${this.modelId}/thumbnail/nocheck?${random}`;
    },
    /**
     * 删除流程
     */
    handleDelete() {
      this.$confirm("此操作将永久删除该模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteById(this.modelId).then(() => {
            this.handleSuccess("删除成功");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    /**
     * 发布流程
     */
    handlePublish() {
      this.$confirm("确定发布该流程？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fn.publish(this.modelId).then(() => {
            this.$message.success("发布成功！");
          });
        })
        .catch(() => {
          this.$message.info("已取消发布!");
        });
    },
    /**
     * 复制流程
     */
    handleCopy() {
      this.copyModel = {
        description: this.model.description,
        id: this.model.id,
        key: this.model.key,
        modelType: this.model.modelType,
        name: this.model.name
      };
      this.copyVisible = true;
    },
    /**
     * 执行复制
     */
    handleCopyOk() {
      if (this.copyModel.key === this.model.key) {
        return this.$message.warning(`流程key${this.model.key}不能与被复制的相同，请修改！`);
      }
      copyInfo(this.copyModel)
        .then(() => {
          this.handleSuccess("复制成功！");
          this.copyVisible = false;
        });
    },
    handleSuccess(message) {
      this.$message.success(message);
      this.$emit("ok");
      this.handleBack();
    },
    /**
     * 导出流程
     */
    handleExport(id) {
      if (id) {
        this.fn.exportInfo(id)
          .then(res => {
            if (res.status === 200 && res.data) {
              download(res.data, decodeURI(res.headers["content-disposition"].split("filename*=UTF-8''")[1]), "application/xml");
              this.$message.success("导出成功！");
            }
          });
      }
    }
  }
};
</script>
<style scoped lang="less">
.display-flex {
  display: flex;

  .flex-1 {
    flex: 1;
  }
}

.gap-container {
  > button,
  > div {
    margin-left: 10px;
  }

  padding: 0 10px;
}

.text-right {
  text-align: right;
}

.process-detail-main {
  height: 100%;

  > div:last-child {
    border-left: 1px solid #ddd;
    display: flex;
    flex-direction: column;

    .tip {
      padding: 20px;
    }

    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      img {
        min-width: 600px;
      }
    }
  }
}

::v-deep .el-form-item__content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>