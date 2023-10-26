<template>
  <common-dialog
    v-model="visible"
    label
    :view-only="true"
    :fullscreen="false"
    v-bind="$attrs"
    dialog-title="流程实例任务列表"
    @open="getData"
  >
    <div class="app-container">
      <el-form
        :model="taskInfo"
        class="list-search-form"
      >
        <el-form-item label="流程实例Id">
          <el-input v-model="taskInfo.processInstanceId" placeholder="请输入流程实例Id" readonly />
        </el-form-item>
        <el-form-item label="业务主键">
          <el-input v-model="taskInfo.businessKey" placeholder="请输入业务主键" readonly />
        </el-form-item>
        <el-form-item label="发起人">
          <el-input v-model="taskInfo.startUserRealName" placeholder="请输入业务名称" readonly />
        </el-form-item>
        <div class="search-button">
          <el-button
            v-if="!Boolean(taskInfo.endDate)"
            v-hasPermi="['process:example:JumpNode']"
            type="primary"
            @click="jumpNode"
          >
            指定节点跳转
          </el-button>
        </div>
      </el-form>
      <div class="footer-box container-box--background">
        <el-table
          height="calc(100% - 130px)"
          :data="dataSource"
          style="min-height: 300px;"
        >
          <el-table-column label="id" prop="id" :show-overflow-tooltip="true" />
          <el-table-column label="名称" prop="name" :show-overflow-tooltip="true" />
          <el-table-column label="分配人" prop="assigneeName" :show-overflow-tooltip="true" />
          <el-table-column label="所有者" prop="owner" :show-overflow-tooltip="true" />
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
            label="操作"
            align="center"
            width="220"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="candidateView(scope.row.id)">
                查看候选人
              </el-button>
              <el-button
                v-if="!Boolean(scope.row.endDate)"
                type="text"
                @click="handleAppoint(scope.row.id)"
              >
                手动指派
              </el-button>
              <el-button
                v-if="!Boolean(scope.row.endDate)"
                type="text"
                @click="completeTask(scope.row.id)"
              >
                完成任务
              </el-button>
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
      </div>
    </div>
    <select-dialog
      v-model="node"
      title="节点"
      :visible.sync="nodeSelectVisible"
      :url="nodeSelectUrl"
      label-prop="actName"
      value-prop="actId"
      @submit="appointNode"
    />
    <select-dialog
      v-model="user"
      title="手动指派人"
      :visible.sync="userSelectVisible"
      :url="userSelectUrl"
      label-prop="name"
      value-prop="id"
      @submit="appointUser"
    />
    <candidate :id="candidateId" v-model="candidateVisible" :task-id="id" />
  </common-dialog>
</template>

<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import SelectDialog from "./SelectDialog.vue";
import Candidate from "./Candidate.vue";

import { getById, getByTaskList, appointNode, appointUser, completeTask } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/instanceList.js";
import { ProcessListMixin } from "@/pages/intelligentOilfield/configurationCenter/processCenter/indexMixin.js";

export default {
  components: {
    CommonDialog, SelectDialog, Candidate
  },
  mixins: [ProcessListMixin],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      taskInfo: {
        processInstanceId: undefined,
        businessKey: undefined,
        startUserRealName: undefined
      },
      fn: {
        list: data => getByTaskList(data, this.id)
      },
      queryParamsOther: {
        order: "desc"
      },
      queryParams: {
        sort: "startTime"
      },
      defaultLoad: false,
      node: "",
      nodeSelectVisible: false,
      nodeSelectUrl: "",
      user: "",
      userSelectVisible: false,
      userSelectUrl: "",
      assigneeId: "",
      candidateVisible: false,
      candidateId: ""
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    /**
     * 获取实例信息，节点选项
     */
    getData() {
      this.nodeSelectUrl = `app/rest/flow-admin/procinst/${this.id}/actDefs`;
      this.loadData();
      getById(this.id)
        .then(res => {
          this.taskInfo = res;
          this.taskInfo.processInstanceId = res.id;
        }).catch(() => {
          this.visible = false;
          this.$message.error("信息获取失败！");
        });
    },
    jumpNode() {
      this.nodeSelectVisible = true;
    },
    /**
     * 指定节点跳转
     */
    appointNode(val) {
      appointNode(this.id, { jumpToActKey: val })
        .then(() => {
          this.$message.success("跳转成功！");
          this.loadData();
        }).catch(() => {
          this.$message.error("跳转失败！");
        });
    },
    /**
     * 打开手动指派弹窗
     */
    handleAppoint(id) {
      this.userSelectUrl = "/app/rest/act-ruler/user-selections";
      this.assigneeId = id;
      this.userSelectVisible = true;
    },
    /**
     * 手动指派人员
     */
    appointUser(val, node) {
      appointUser(this.assigneeId, { assignee: node.id, assigneeName: node.name })
        .then(() => {
          this.$message.success("指派成功！");
          this.getData();
        })
        .catch(err => {
          this.$message.error(err.response.data.errorInfo.message);
        });
    },
    /**
     *完成任务
     */
    completeTask(id) {
      completeTask(id)
        .then(() => {
          this.$message.success("完成成功！");
          this.getData();
        })
        .catch(err => {
          this.$message.error(err.response.data.errorInfo.message);
        });
    },
    candidateView(id) {
      this.candidateId = id;
      this.candidateVisible = true;
    }
  }
};
</script>

<style scoped lang="less">
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }

  /deep/ .pagination-container {
    position: relative !important;
    padding: 10px 0 !important;
  }
}
</style>