<!-- 后台——消息配置列表 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100">
    <el-form
     style="margin-top:18px"
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
    >
      <el-form-item label="消息主题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入消息主题"
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
      <el-form-item label="消息类型">
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
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleQuery"
        >
          查询
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
    </headerSearch>
   
     <pagePanelNew headerTitle="消息主题"  style="height: calc(100% - 100px)">
         <el-row :gutter="10" class="mb8" style="margin-bottom:20px">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['messageConfig:export']"
          type="primary"
          plain
          @click="handleExport"
        >
          导出
        </el-button>
        <el-button
          v-hasPermi="['messageConfig:add']"
          type="primary"
          plain
          @click="handleDatil(null, 'Add')"
        >
          新增
        </el-button>
        <el-button
          type="warning"
          plain
          class="commonBtn"
          @click="handleBack"
        >
          返回
        </el-button>
      </el-col>
      <!-- <right-toolbar :show-search.sync="showSearch" @queryTable="getList" /> -->
    </el-row>
        <el-table :data="data" height="calc(100% - 113px)" :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }" style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }">
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
                <el-tag :type="scope.row.active ? 'success' : 'info'">{{ scope.row.active ? "正常" : "离线" }}</el-tag>
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
              <el-button type="text" @click="handleDatil(scope.row.id, 'View')">
                查看
              </el-button>
              <el-button type="text" @click="handleDatil(scope.row.id,  'Edit')">
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
    </pagePanelNew>
    <config-form ref="configForm" @ok="getList" />
  </div>
</template>

<script>
import { get } from "lodash";

import { listConfig } from "@/api/intelligentOilfield/messaging";
import { filterObj } from "@/utils/objectOperate";

import ConfigForm from "../configForm/index.vue";
import  exportFile  from '@/utils/exportFile.js'

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
  components: {
    ConfigForm
  },
  data() {
    return {
      data: [],
      columns,
      showSearch: true,
      messageTypes: [],
      totalMessageTypes: [
        { type: "SMS", text: "短信" },
        { type: "MAIL", text: "邮件" },
        { type: "PUSH", text: "移动云推送" },
        { type: "LETTER", text: "站内信" },
        { type: "EQUIPMENT", text: "设备状态" },
        { type: "FORWARDING", text: "服务转发" }
      ],
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
  },
  methods: {
    /** 返回按钮 */
    handleBack() {
      this.$router.push({ name: "MessageLog" });
    },
    /** 加载列表信息 */
    getList() {
      filterObj(this.queryParams);
      return listConfig(this.queryParams).then((response) => {
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
      })
      this.messageTypes = this.totalMessageTypes;
    },
    /** 根据触达类型切换不同的消息状态 */
    handleType() {
      delete this.queryParams.messageType;
      this.messageTypes =
        this.queryParams.triggerType === "USER"
          ? [
            { type: "SMS", text: "短信" },
            { type: "MAIL", text: "邮件" },
            { type: "PUSH", text: "移动云推送" },
            { type: "LETTER", text: "站内信" }
          ]
          : [
            { type: "EQUIPMENT", text: "设备状态" },
            { type: "FORWARDING", text: "服务转发" }
          ];
    },
    /** * 表格展示特殊格式化 */
    columnsFormatter(row, prop) {
      let re = get(row, prop);
      switch (prop) {
      case "triggerType":
        re = re && re === "USER" ? "用户触达" : "服务触达";
        break;
      case "messageType":
        switch (re) {
        case "MAIL": re = "邮件"; break;
        case "SMS": re = "短信"; break;
        case "PUSH": re = "移动云推送"; break;
        case "LETTER": re = "站内信"; break;
        case "EQUIPMENT": re = "设备状态"; break;
        case "FORWARDING": re = "服务转发"; break;
        default: break;
        }
        break;
      case "grantedTenants":
        re = re && re.map((item) => item.tenantName).join(",");
        break;
      default: break;
      }
      return re;
    },
    handleDatil(id, action) {
      this.$refs.configForm.handleOpen(id, action)
    },
    handleExport() {
      exportFile('/message-service/management/binding/export', this.queryParams)
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