<template>
  <common-dialog
    v-model="visible"
    :loading="loading"
    label
    :view-only="true"
    :fullscreen="true"
    v-bind="$attrs"
    append-to-body
    dialog-title="流程任务候选人列表"
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
          <el-button v-if="!Boolean(taskInfo.endDate)" type="primary" @click="handleCandidate">
            添加候选人
          </el-button>
        </div>
      </el-form>
      <div class="footer-box container-box--background">
        <el-table
          height="calc(100% - 130px)"
          :data="dataSource"
        >
          <el-table-column
            label="候选人"
            prop="userId"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="操作"
            align="center"
            width="220"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                v-if="!Boolean(scope.row.endDate)"
                type="text"
                @click="deleteCandidate(scope.row.id)"
              >
                删除
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
      v-model="user"
      title="候选人"
      :visible.sync="userSelectVisible"
      :url="userSelectUrl"
      label-prop="name"
      value-prop="id"
      data-path="data.data"
      @submit="addCandidate"
    />
  </common-dialog>
</template>

<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import SelectDialog from "./SelectDialog.vue";

import { getById, getByCandidateList, deleteCandidate, addCandidate } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/instanceList.js";
import { ProcessListMixin } from "@/pages/intelligentOilfield/configurationCenter/processCenter/indexMixin.js";

export default {
  components: {
    CommonDialog, SelectDialog
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
    },
    taskId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      fn: {
        list: data => getByCandidateList(data, this.id)
      },
      queryParamsOther: {
        order: "desc"
      },
      queryParams: {
        sort: "id"
      },
      defaultLoad: false,
      taskInfo: {
        processInstanceId: undefined,
        businessKey: undefined,
        startUserRealName: undefined
      },
      user: "",
      userSelectVisible: false,
      userSelectUrl: ""
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
     * 获取实例信息，候选人列表
     */
    getData() {
      this.loadData();
      getById(this.taskId)
        .then(res => {
          this.taskInfo = res.data;
          this.taskInfo.processInstanceId = this.id;
        }).catch(() => {
          this.visible = false;
          this.$message.error("信息获取失败！");
        });
    },
    /**
     * 删除指定候选人
     */
    deleteCandidate(id) {
      deleteCandidate(id)
        .then(() => {
          this.$message.success("删除成功！");
          this.getData();
        })
        .catch(err => {
          this.$message.error(err.response.data.errorInfo.message);
        });
    },
    handleCandidate() {
      this.userSelectUrl = "/app/rest/act-ruler/user-selections";
      this.userSelectVisible = true;
    },
    /**
     * 添加候选人
     */
    addCandidate(val, node) {
      const data = {
        ...node,
        userId: node.id,
        userName: node.name
      };
      addCandidate(this.id, data)
        .then(() => {
          this.$message.success("添加成功！");
          this.getData();
        })
        .catch(err => {
          this.$message.error(err.response.data.errorInfo.message);
        });
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
}
</style>