<!-- 后台——流程实例清单 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        style="margin-top: 18px"
        :model="queryParams"
        :inline="true"
        @keyup.enter.native="searchQuery"
        @submit.native.prevent
      >
        <el-form-item label="流程实例Id">
          <el-input v-model="queryParams.processInstanceId" placeholder="请输入流程实例Id" clearable />
        </el-form-item>
        <el-form-item label="业务主键">
          <el-input v-model="queryParams.businessKey" placeholder="请输入业务主键" clearable />
        </el-form-item>
        <el-form-item label="业务名称">
          <el-input v-model="queryParams.businessName" placeholder="请输入业务名称" clearable />
        </el-form-item>
        <el-form-item label="流程定义">
          <el-input v-model="queryParams.processDefinitionName" placeholder="请输入流程定义" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuery">
            查询
          </el-button>
          <el-button class="commonBtn" @click="searchReset">
            重置
          </el-button>
          <slot name="buttonExtend" />
        </el-form-item>
      </el-form>
    </header-search>

    <div class="footer-box table-box container-box--background" style="height: calc(100% - 100px)">
      <page-panel-new header-title="流程实例清单" style="height: 100%">
        <el-table
          height="calc(100% - 46px)"
          :data="dataSource"
        >
          <el-table-column
            :width="50"
            label="业务主键"
            prop="businessKey"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="业务名称" prop="businessName" :show-overflow-tooltip="true" />
          <el-table-column label="流程定义" prop="definitionName" :show-overflow-tooltip="true" />
          <el-table-column label="开始时间" prop="startDate" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.startDate | moment }}
            </template>
          </el-table-column>
          <el-table-column label="结束时间" prop="endDate" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.endDate | moment }}
            </template>
          </el-table-column>
          <el-table-column
            :width="50"
            label="租户"
            prop="tenantId"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            :width="50"
            label="流程版本"
            prop="version"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="操作"
            align="center"
            width="220"
            fixed="right"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="showView(scope.row.id, 'task')">
                查看任务
              </el-button>
              <el-button type="text" @click="showView(scope.row.id, 'variable')">
                查看变量
              </el-button>
              <el-button type="text" @click="flowInstView(scope.row.id)">
                查看流程图
              </el-button>
              <el-button
                v-if="!Boolean(scope.row.endDate)"
                type="text"
                @click="stopProcess(scope.row.id)"
              >
                终止流程
              </el-button>
              <el-button
                v-if="!Boolean(scope.row.endDate)"
                type="text"
                @click="upVersion(scope.row.id)"
              >
                升级版本
              </el-button>
              <slot :row="scope.row" name="action" />
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="ipagination.total > 0"
          :total="ipagination.total"
          :page.sync="ipagination.current"
          :limit.sync="ipagination.pageSize"
          @pagination="loadData"
        />
      </page-panel-new>
    </div>
    <task :id="taskId" v-model="visible" />
    <variable :id="taskId" v-model="variableVisible" />
  </div>
</template>

<script>
import { processCenterPrefixApiMixin, ProcessListMixin } from "../indexMixin";

import { list, upVersion, stopProcess } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/instanceList.js";

import Task from "./modules/Task.vue";
import Variable from "./modules/Variable.vue";

export default {
  name: "InstanceList",
  components: {
    Task, Variable
  },
  mixins: [ProcessListMixin, processCenterPrefixApiMixin],
  props: {
    isSimulation: {
      type: Boolean,
      default: false
    },
    queryParamsOther: {
      type: Object,
      default: () => ({
        order: "desc"
      })
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fn: {
        list
      },
      queryParams: {
        sort: "startDate"
      },
      visible: false,
      taskId: "",
      variableVisible: false
    };
  },
  watch: {
    refresh: {
      handler() {
        this.searchQuery();
      }
    }
  },
  methods: {
    /**
     * searchReset 重载，默认按照修改时间查询
     */
    searchReset() {
      this.queryParams = {
        sort: "startDate"
      };
      this.loadData();
    },
    /**
     * 升级版本
     */
    upVersion(id) {
      this.$confirm("将此流程实例升级到最新版本?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          upVersion(id).then(() => {
            this.$message.success("升级成功！");
            this.loadData();
          }).catch(err => {
            this.$message.error(err.response.data.errorInfo.message);
          });
        }).catch(() => {
          this.$message.info("已取消");
        });
    },
    /**
     * 中止流程
     */
    stopProcess(id) {
      this.$prompt("请输入终止(删除)流程原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.+$/,
        inputErrorMessage: "请输入终止(删除)流程原因"
      })
        .then(({ value }) => {
          stopProcess(id, { reason: value }).then(() => {
            this.$message.success("终止成功！");
            this.loadData();
          }).catch(err => {
            this.$message.error(err.response.data.errorInfo.message);
          });
        }).catch(() => {
          this.$message.info("已取消");
        });
    },
    /**
     * 预览流程示例图
     */
    flowInstView(id) {
      const imgPath = `${this.prefixApi}/app/rest/flow-admin/procinst/${id}/diagram/nocheck`;
      this.$alert(`<img src='${imgPath}' />`, "流程实例图", {
        dangerouslyUseHTMLString: true,
        customClass: "flow-inst"
      });
    },
    showView(id, type) {
      this.taskId = id;
      if (type === "task") {
        this.visible = true;
      } else {
        this.variableVisible = true;
      }
    }
  }
};
</script>

<style>
.flow-inst {
  max-width: 1000px;
  min-width: 650px;
  width: 100%;
}
</style>
<style scoped lang="less">
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.table-box {
  height: calc(100% - 140px);
}
</style>