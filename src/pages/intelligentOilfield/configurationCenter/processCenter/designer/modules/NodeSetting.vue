<template>
  <div class="node-setting">
    <el-form
      :model="queryParams"
      class="list-search-form"
      @keyup.enter.native="searchQuery"
      @submit.native.prevent
    >
      <el-form-item label="节点名称">
        <el-input v-model="queryParams.actName" placeholder="请输入节点名称" clearable />
      </el-form-item>
      <el-form-item label="节点key">
        <el-input v-model="queryParams.actKey" placeholder="请输入节点key" clearable />
      </el-form-item>
      <div class="search-button">
        <el-button type="primary" icon="el-icon-search" @click="searchQuery">
          查询
        </el-button>
        <el-button icon="el-icon-refresh" class="commonBtn" @click="searchReset">
          重置
        </el-button>
      </div>
      <import-file
        :base-url="prefixApi"
        :upload-url="`/app/rest/act-ruler/model/${modelId}/import-custom`"
        btn-text="导入"
        class="gap--left"
        accept
        @ok="searchQuery"
      />
      <el-button
        class="gap--left commonBtn"
        @click="handleExport(modelId)"
      >
        导出
      </el-button>
    </el-form>
    <el-collapse v-model="activeNames" class="coll">
      <el-collapse-item v-for="item in dataSource" :key="item.actKey" :name="item.actKey">
        <template slot="title">
          {{ item.actName }} 【{{ item.actKey }}】
          <div class="title--extra-info">
            {{ item.published ? "已发布" : "未发布" }} |
            {{ item.inModel ? "在模型数据" : "不在模型数据" }} |
            顺序：{{ item.sort }}
          </div>
          <question-info tip="flow_node_designer_node_list_header" style="margin-left: 5px;" />
        </template>
        <div class="gap-container">
          <el-button @click="actKey = item.actKey; showDetail = true;">
            添加规则
          </el-button>
          <el-button @click="handleEditSort(item)">
            编辑顺序
            <question-info tip="flow_node_designer_sequence" />
          </el-button>
        </div>
        <el-table
          :data="item.activityRules"
          border
          height="200px"
        >
          <el-table-column prop="priority" label="优先级" :show-overflow-tooltip="true" />
          <el-table-column prop="name" label="规则名称" :show-overflow-tooltip="true" />
          <el-table-column
            prop="applyScopes"
            label="适用范围"
            :show-overflow-tooltip="true"
            :formatter="formatter"
          />
          <el-table-column
            prop="hasAssignRule"
            label="指派定义"
            :show-overflow-tooltip="true"
            :formatter="formatter"
          />
          <el-table-column
            prop="hasRejectRule"
            label="退回定义"
            :show-overflow-tooltip="true"
            :formatter="formatter"
          />
          <el-table-column
            prop="hasEditableFieldRule"
            label="表单项定义"
            :show-overflow-tooltip="true"
            :formatter="formatter"
          />
          <el-table-column prop="action" label="操作">
            <template slot-scope="{row}">
              <el-button type="text" @click="currentRuleId = row.id">
                编辑
              </el-button>
              <el-button type="text" @click="handleDelete(row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <pagination
      :page-sizes="ipagination.pageSizes"
      :total="ipagination.total"
      :limit="ipagination.pageSize"
      :page="ipagination.current"
      @pagination="handlePage"
    />

    <common-dialog
      v-model="sortVisible"
      width="300px"
      label
      dialog-title="设置节点排序号"
      append-to-body
      @ok="handleSaveSort"
    >
      <el-input-number
        v-model="sortModel.sort"
        controls-position="right"
        :min="0"
        class="width-100per"
        :precision="0"
        placeholder="请输入排序号"
      />
    </common-dialog>
    <node-setting-detail
      :model-key="modelKey"
      :app-id="appId"
      :act-key="actKey"
      :model-id="currentRuleId"
      :show-dialog="showDetail"
      @closed="currentRuleId = ''; showDetail = false"
      @ok="loadData()"
    />
  </div>
</template>
<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import ImportFile from "@/components/intelligentOilfield/FileUpload/ImportFile.vue";
import Pagination from "@/components/intelligentOilfield/Pagination/index.vue";
import NodeSettingDetail from "./NodeSettingDetail.vue";
import QuestionInfo from "./QuestionInfo.vue";
import { processCenterPrefixApiMixin, ProcessListMixin } from "../../indexMixin";

import { ruleList, exportRule, deleteRuleById, ruleSort } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/designer";

import { download } from "@/components/upload/utils/api.ts";

export default {
  name: "NodeEditor",
  components: {
    CommonDialog,
    ImportFile,
    Pagination,
    NodeSettingDetail,
    QuestionInfo
  },
  mixins: [processCenterPrefixApiMixin, ProcessListMixin],
  props: {
    modelId: {
      type: String,
      default: undefined
    },
    modelKey: {
      type: String,
      default: undefined
    },
    appId: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      showDetail: false,
      currentRuleId: undefined,
      actKey: undefined,
      sortVisible: false,
      sortModel: {
        actKey: undefined,
        processKey: undefined,
        sort: 0
      },
      visible: false,
      fn: {
        list: data => ruleList(this.modelId, data),
        exportRule,
        delete: deleteRuleById
      },
      activeNames: []
    };
  },
  methods: {
    formatter(row, column) {
      switch (column.property) {
        case "applyScopes":
          return row.applyScopes.map(v => v.applyScopeName).join("，");
        case "hasAssignRule":
        case "hasRejectRule":
        case "hasEditableFieldRule":
          return row[column.property] ? "是" : "否";
        default:
          break;
      }
      return "未指定";
    },
    /**
     * 弹窗编辑排序号
     */
    handleEditSort(item) {
      this.sortModel = {
        actKey: item.actKey,
        processKey: this.modelKey,
        sort: item.sort
      };
      this.sortVisible = true;
    },
    /**
     * 保存排序
     */
    handleSaveSort() {
      ruleSort(this.sortModel)
        .then(() => {
          this.$message.success("排序更新成功！");
          this.loadData();
          this.sortVisible = false;
        });
    },
    /**
     * 导出JSON文件
     */
    handleExport(id) {
      if (id) {
        this.fn.exportRule(id)
          .then(res => {
            if (res.status === 200 && res.data) {
              download(JSON.stringify(res.data), decodeURI(res.headers["content-disposition"]).split("filename=")[1], "application/json");
              this.$message.success("导出成功！");
            }
          });
      }
    }
  }
};
</script>
<style scoped lang="less">
.gap--left {
  ::v-deep .el-upload,.el-upload--text {
    margin-right: 20px;
    border: none;
  }
}

.list-search-form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .el-form-item {
    min-width: 200px;
    margin-right: 10px;
    display: flex;

    ::v-deep .el-form-item__label {
      line-height: 36px;

      &::after {
        content: "：";
      }
    }
  }

  .search-button {
    margin: 0 10px;
  }
}

.node-setting {
  padding: 20px;

  .title--extra-info {
    font-size: smaller;
    color: burlywood;
    margin-left: 20px;
  }
}

::v-deep .el-collapse-item__header {
  background-color: transparent;
}

::v-deep .el-collapse-item__wrap {
  background-color: transparent;

}

.gap-container {
  > button,
  > div {
    margin-right: 10px;
  }

  padding: 10px 0;
}
</style>