<!-- eslint-disable vue/no-unused-components -->
<!-- 后台——应用中心管理 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        style="margin-top: 18px"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="queryParams.appName" placeholder="请输入应用名称" clearable />
        </el-form-item>
        <el-form-item label="授权用户" prop="tenantName">
          <el-input v-model="queryParams.tenantName" placeholder="请输入授权用户名称" clearable />
        </el-form-item>
        <el-form-item label="运行状态" prop="appStatus">
          <el-select v-model="queryParams.appStatus" placeholder="请选择运行状态" clearable>
            <el-option
              v-for="dict in dict.type.sys_app_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>
    <page-panel-new header-title="用户管理" style="height: calc(100% - 100px);">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:role:add']"
            style="margin-bottom: 20px"
            type="primary"
            plain
            size="mini"
            @click="handleToPage('add')"
          >
            新增
          </el-button>
        </el-col>
      </el-row>
      <div
        class="footer-box"
        :style="{ background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff' }"
      >
        <div v-if="dataSource.length > 0" class="body-style">
          <div v-for="(item, index) in dataSource" :key="index">
            <application-card :application-info="item" :dict-text="dict.type.sys_app_category" @deleteOk="deleteOk" />
          </div>
        </div>
        <el-empty v-else :image-size="250" style="margin-top: 80px;" />
      </div>
      <pagination
        v-if="dataSource.length > 0"
        v-show="total > 0"
        class="pagination-div"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        :page-sizes="[12, 24, 36, 48, 60, 120]"
        @pagination="getList"
      />
    </page-panel-new>
  </div>
</template>
<script>
import ApplicationCard from "./modules/ApplicationCard.vue";

import { listApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";

export default {
  name: "ApplicationList",
  dicts: ["sys_app_status", "sys_app_category"],
  components: {
    ApplicationCard
  },
  data() {
    return {
      // 显示搜索条件
      showSearch: true,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 12
      },
      dataSource: []
    };
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.$nextTick(() => {
        this.getList();
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listApp(this.queryParams).then(response => {
        this.dataSource = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /**
     * 删除成功重新加载数据
     */
    deleteOk() {
      this.getList();
    },
    /**
     * 路由跳转进行新增
     */
    handleToPage(action) {
      this.$router.push({ name: "ApplicationForm/:id?", query: { action }});
    }
  }
};
</script>
<style scoped lang="less">
.app-container {
  height: 100%;
}

.page-box {
  color: var(--form-text);
  position: relative;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
}

div.add {
  display: flex;
  justify-content: flex-start;
}

.footer-box {
  border: 1px solid var(--light-blue-color);
  width: 100%;
  position: relative;
  height: calc(100% - 114px) !important;
  overflow-y: auto;
  padding: 20px;
}

.body-style {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100% - 60px);
  position: relative;
  box-sizing: border-box;
  gap: 20px;
}
</style>