<!-- 后台——消息配置列表 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100 colon">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="消息主题名称" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入消息主题名称"
            clearable
            style="width: 240px;"
          />
        </el-form-item>
        <el-form-item label="触达类型" prop="triggerType">
          <el-select
            v-model="queryParams.triggerType"
            style="width: 240px;"
            placeholder="请选择触达类型"
            clearable
            @change="handleType"
          >
            <el-option
              v-for="item in triggerTypes"
              :key="item.type"
              :label="item.text"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="queryParams.triggerType === 'USER'" label="消息类型">
          <el-select
            v-model="queryParams.messageType"
            style="width: 240px;"
            placeholder="请选择消息类型"
            clearable
          >
            <el-option
              v-for="item in messageTypes"
              :key="item.type"
              :label="item.text"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="buttonArea">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>

    <page-panel-new header-title="消息主题">
      <el-row class="mbBottom">
        <el-col class="height-placeholder" :span="20">
          <el-button
            v-hasPermi="['messageConfig:add']"
            type="primary"
            @click="handleDatil(null, 'Add')"
          >
            新增
          </el-button>
        </el-col>
        <el-col :span="4" style="text-align: right;">
          <el-button
            v-hasPermi="['messageConfig:export']"
            style="margin-right: 4px;"
            type="primary"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="data"
        height="calc(100% - 113px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          label="序号"
          type="index"
          width="55"
          align="center"
        />
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          :label="item.label"
          :prop="item.props"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="item.props === 'active'">
              <el-tag :type="scope.row.active ? 'primary' : 'danger'">{{ dict.type.sys_active_type?.find((dict) => dict.value == scope.row.active)?.label }}</el-tag>
            </span>
            <span v-else>{{ columnsFormatter(scope.row, item.props) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-hasPermi="['messageConfig:view']" type="text" @click="handleDatil(scope.row.id, 'View')">
              查看
            </el-button>
            <el-button v-hasPermi="['messageConfig:edit']" type="text" @click="handleDatil(scope.row.id, 'Edit')">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </page-panel-new>
    <config-form ref="configForm" @ok="getList" />
  </div>
</template>

<script>
import { get } from "lodash";

import { listConfig } from "@/api/intelligentOilfield/messaging";
import { filterObj } from "@/utils/objectOperate";

import ConfigForm from "../configForm/index.vue";
import exportFile from "@/utils/exportFile.js";

const columns = [
  { props: "title", label: "消息主题名称" },
  { props: "triggerType", label: "触达类型" },
  { props: "messageType", label: "消息类型" },
  { props: "grantedTenants", label: "消息接口租户授权" },
  { props: "createdTime", label: "创建日期" },
  { props: "active", label: "状态" }
];
export default {
  name: "MessageSubject",
  dicts: ["sys_active_type", "sys_message_type"],
  components: {
    ConfigForm
  },
  data() {
    return {
      data: [],
      columns,
      showSearch: true,
      messageTypes: [
        /* { type: "SMS", text: "短信" }, */
        { type: "MAIL", text: "邮件" },
        /* { type: "PUSH", text: "移动云推送" }, */
        { type: "LETTER", text: "站内信" }
      ],
      messageTypelabel: {},
      triggerTypes: [
        { type: "USER", text: "用户触达" },
        { type: "SERVICE", text: "服务触达" }
      ],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  created() {
    this.getList();
    this.$on("dictReady", () => {
      this.messageTypelabel = this.dict.label.sys_message_type;
    });
  },
  activated() {
    this.getList();
  },
  methods: {
    /** 返回按钮 */
    handleBack() {
      this.$router.push({ name: "MessageLog" });
    },
    /** 加载列表信息 */
    getList() {
      filterObj(this.queryParams);
      return listConfig(this.queryParams).then(response => {
        this.data = response.records;
        this.total = response.total;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNo: 1, pageSize: 10 };
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    /** 根据触达类型切换不同的消息状态 */
    handleType() {
      delete this.queryParams.messageType;
    },
    /** * 表格展示特殊格式化 */
    columnsFormatter(row, prop) {
      let re = get(row, prop);
      switch (prop) {
        case "triggerType":
          re = re && re === "USER" ? "用户触达" : "服务触达";
          break;
        case "messageType":
          re = this.messageTypelabel[re] || re || "";
          break;
        case "grantedTenants":
          re = re && re.map(item => item.tenantName).join(",");
          break;
        default: break;
      }
      return re;
    },
    handleDatil(id, action) {
      this.$refs.configForm.handleOpen(id, action);
    },
    handleExport() {
      exportFile("/message-service/management/binding/export", this.queryParams);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  .el-table {
    overflow: scroll;
  }
}
</style>