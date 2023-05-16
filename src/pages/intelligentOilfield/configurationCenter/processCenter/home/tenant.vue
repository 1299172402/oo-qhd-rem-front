<!-- 流程平台首页——租户查询 -->
<template>
  <div class="Process-container">
    <!-- 查询 -->
    <header-search class="g-w100 g-h100 colon">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="租户名称">
          <el-input v-model="queryParams.tenantName" placeholder="请输入租户名称" clearable />
        </el-form-item>
        <el-form-item class="buttonArea">
          <el-button type="primary" icon="el-icon-search" @click="getList">
            搜索
          </el-button>
          <el-button class="commonBtn" icon="el-icon-refresh" @click="searchReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>
    <!-- 租户卡片 -->
    <page-panel-new header-title="租户管理">
      <div
        class="footer-box container-box--background"
        :style="{ background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff' }"
      >
        <div>
          <div v-if="dataSource.length > 0" class="body-style list-height">
            <div v-for="(item, index) in dataSource" :key="index">
              <process-center-card
                :process-center-info="item"
                :process-tenant-list="processTenantList"
                @renovate="getList"
              />
            </div>
          </div>
          <el-empty v-else :image-size="250" style="margin-top: 80px;" />
        </div>
      </div>
    </page-panel-new>
  </div>
</template>
<script>
import ProcessCenterCard from "@/pages/intelligentOilfield/configurationCenter/processCenter/modules/ProcessCenterCard.vue";

import { newListTenant } from "@/api/intelligentOilfield/system/app.js";
import { processTenantList } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/tenant.js";

export default {
  name: "ProcessCenterTenant",
  components: {
    ProcessCenterCard
  },
  data() {
    return {
      dataSource: [],
      // 显示搜索条件
      showSearch: true,
      // 所有租户的Keys
      ids: [],
      processTenantList: [],
      queryParams: {}
    };
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    getList() {
      newListTenant(this.queryParams).then(res => {
        this.dataSource = res.data.rows;
        this.ids = this.dataSource.map(item => item.tenantCode);
        processTenantList({ tenantIds: this.ids }).then(res => {
          this.processTenantList = res;
        });
      });
    },
    searchReset() {
      this.queryParams = {};
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.Process-container {
  height: 100%;
}

.body-style {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100% - 60px);
  box-sizing: border-box;
  position: relative;
  gap: 20px;
}
</style>