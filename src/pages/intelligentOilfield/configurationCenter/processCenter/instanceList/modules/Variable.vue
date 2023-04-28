<template>
  <common-dialog
    v-model="visible"
    label
    :view-only="true"
    :fullscreen="false"
    v-bind="$attrs"
    dialog-title="流程变量列表"
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
            v-hasPermi="['process:example:addVariable']"
            type="primary"
            @click="variableView('add')"
          >
            添加变量
          </el-button>
        </div>
      </el-form>
      <div class="footer-box container-box--background">
        <el-table
          height="calc(100% - 130px)"
          :data="dataSource"
        >
          <el-table-column label="id" prop="id" :show-overflow-tooltip="true" />
          <el-table-column label="名称" prop="name" :show-overflow-tooltip="true" />
          <el-table-column label="类型" prop="type" :show-overflow-tooltip="true" />
          <el-table-column label="值" prop="value" :show-overflow-tooltip="true" />
          <el-table-column
            v-if="!Boolean(taskInfo.endDate)"
            label="操作"
            align="center"
            width="220"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="variableView('edit', scope.row)">
                修改
              </el-button>
              <el-button type="text" @click="deleteVariable(scope.row.id)">
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
    <handle-variable
      v-model="variableData"
      :visible.sync="addVariableVisible"
      :is-edit="isEdit"
      @submit="handleVariable"
    />
  </common-dialog>
</template>

<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import HandleVariable from "./HandleVariable.vue";

import { getById, getByVariableList, addVariable, deleteVariable, editVariable } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/instanceList.js";
import { ProcessListMixin } from "@/pages/intelligentOilfield/configurationCenter/processCenter/indexMixin.js";

export default {
  components: {
    CommonDialog, HandleVariable
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
        list: data => getByVariableList(data, this.taskInfo.processInstanceId)
      },
      queryParamsOther: {
        order: "desc"
      },
      queryParams: {
        sort: "createTime"
      },
      defaultLoad: false,
      addVariableVisible: false,
      variableData: null,
      isEdit: false
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
    /**
     * 打开变量信息弹框
     */
    variableView(type, row) {
      if (type === "add") {
        this.variableData = {
          name: null,
          value: null,
          type: "string"
        };
        this.isEdit = false;
      } else {
        this.variableData = {
          ...row
        };
        this.isEdit = true;
      }
      this.addVariableVisible = true;
    },
    /**
     * 新增或修改变量信息
     */
    handleVariable(val) {
      if (this.isEdit) {
        editVariable(val, this.variableData.id)
          .then(() => {
            this.$message.success("修改成功！");
            this.getData();
          }).catch(() => {
            this.$message.error("修改失败！");
          });
      } else {
        addVariable(val, this.id)
          .then(() => {
            this.$message.success("添加成功！");
            this.getData();
          }).catch(() => {
            this.$message.error("添加失败！");
          });
      }
    },
    /**
     * 删除变量
     */
    deleteVariable(id) {
      deleteVariable(id)
        .then(() => {
          this.$message.success("删除成功！");
          this.getData();
        }).catch(() => {
          this.$message.error("删除失败！");
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

  /deep/ .pagination-container {
    position: relative !important;
    padding: 10px 0 !important;
  }
}
</style>