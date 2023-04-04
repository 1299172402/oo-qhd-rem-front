<!-- 后台——流程模拟清单 -->
<template>
  <div style="width: 100%; height: 100%;">
    <list
      ref="list"
      :is-simulation="true"
      :query-params-other="params"
      :refresh="refresh"
    >
      <template slot="buttonExtend">
        <start-dialog
          style="display: inline; margin-left: 10px;"
          label="启动"
          :body-scroll="true"
          @ok="refresh = !refresh"
        />
      </template>
      <template slot="action" slot-scope="scope" fixed="right">
        <el-button
          v-if="!Boolean(scope.row.endDate)"
          type="text"
          @click="viewResults(scope.row.id)"
        >
          查看执行结果
        </el-button>
      </template>
    </list>
  </div>
</template>

<script>

import { viewResults } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/instanceList.js";

import List from "@/pages/intelligentOilfield/configurationCenter/processCenter/instanceList/index.vue";
import StartDialog from "./modules/StartDialog.vue";

export default {
  name: "InstanceList",
  components: {
    List, StartDialog
  },
  data() {
    return {
      params: {
        isTest: "1",
        order: "desc"
      },
      refresh: false
    };
  },
  methods: {
    /**
     * 查看结果
     */
    viewResults(id) {
      viewResults(id)
        .then(() => {
          this.$message.success("获取结果成功！");
        }).catch(() => {
          this.$message.error("获取结果失败！");
        });
    }
  }
};
</script>

<style>
</style>