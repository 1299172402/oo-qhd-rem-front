<template>
  <info-window
    class="info-window"
    info-width="373px"
    info-height="230px"
    header-align="center"
    :header-title="processCenterInfo.tenantName || processCenterInfo.appName"
  >
    <template #headerTag>
      <el-tag v-if="!disable && isShow" effect="plain" size="medium">
        正常
      </el-tag>
      <el-tag v-else-if="disable && isShow" effect="plain" size="medium">
        禁用
      </el-tag>
    </template>
    <div class="card-info">
      <div v-if="processCenterInfo.tenantId">
        <div class="card-info-item">
          租户key：
          <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> {{ processCenterInfo.tenantCode }} </span>
        </div>
      </div>
      <div v-else>
        <div class="card-info-item">
          应用分类：
          <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`" style="display: inline-block;">
            <dict-tag :options="dictText" :value="processCenterInfo.appCategory" />
          </span>
        </div>
        <div class="card-info-item">
          支持终端：
          <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> {{ processCenterInfo.isPc === 1 ? 'PC' : '' }} </span>
          <span v-if="processCenterInfo.isPc === 1 && processCenterInfo.isMobile === 1" :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> / </span>
          <span :class="`info-span__deep ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`"> {{ processCenterInfo.isMobile === 1 ? '移动端' : '' }} </span>
        </div>
        <div class="card-info-item">
          授权租户：
          <span :class="`info-span__deep user-info ${ $store.state.setting.mode === 'dark' ? 'dark-color' : '' }`" :title="processCenterInfo.tenants">
            {{ processCenterInfo.tenants }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-button">
      <el-tooltip content="租户管理配置">
        <el-button
          :disabled="disable"
          class="card-button-item"
          @click="handleTenantInfoClick"
        >
          <svg-icon class="svg-icon-class" icon-class="tenant-manage" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="isShow" content="新建流程">
        <el-button :disabled="disable" class="card-button-item" @click="handleVisible(true)">
          <svg-icon class="svg-icon-class" icon-class="new-process" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="isShow" content="流程设计中心">
        <el-button
          :disabled="disable"
          class="card-button-item"
          @click="
            handleSystemInfoClick('Designer', processCenterInfo.tenantCode || processCenterInfo.appId)
          "
        >
          <svg-icon class="svg-icon-class" icon-class="process-design" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="isShow" content="流程实例清单">
        <el-button
          :disabled="disable"
          class="card-button-item"
          @click="
            handleSystemInfoClick('InstanceList', processCenterInfo.tenantCode || processCenterInfo.appId)
          "
        >
          <svg-icon class="svg-icon-class" icon-class="lnstance-list" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="isShow" :content="!disable ? '禁用' : '启用'">
        <el-button
          class="card-button-item"
          @click="handleDisable(processCenterInfo.tenantCode || processCenterInfo.appId)"
        >
          <svg-icon class="svg-icon-class" :icon-class="!disable ? 'forbidden' : 'rate'" />
        </el-button>
      </el-tooltip>
    </div>
    <process-info
      label=""
      :renovate="renovate"
      :process-center-info="processCenterInfo"
      @input="handleVisible"
    />
    <process-tenant
      ref="tenantConfig"
      :visible="tenantVisible"
      label=""
      :is-edit="isShow"
      :tenant-code="processCenterInfo.tenantCode || processCenterInfo.appId"
      @on-config-close="tenantVisible = false"
      @ok="$emit('renovate')"
    />
  </info-window>
</template>

<script>
import infoWindow from "@/components/intelligentOilfield/info-window/index.vue";
import ProcessInfo from "@/pages/intelligentOilfield/configurationCenter/processCenter/designer/modules/ProcessInfo.vue";
import ProcessTenant from "./ProcessTenant.vue";

import { disable, enable } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/tenant.js";

export default {
  name: "ProcessCenterCard",
  components: {
    infoWindow,
    ProcessInfo,
    ProcessTenant
  },
  props: {
    processCenterInfo: {
      type: Object,
      default: () => ({})
    },
    processTenantList: {
      type: Array,
      default: () => []
    },
    dictText: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      isShow: false,
      renovate: false,
      disable: false,
      tenantVisible: false
    };
  },
  watch: {
    processTenantList() {
      this.getProcessTenantList();
    }
  },
  methods: {
    handleSystemInfoClick(path, id) {
      this.$router.push({ name: path, query: { identify: id }});
    },
    /**
     * 流程租户管理配置
     */
    handleTenantInfoClick() {
      this.tenantVisible = true;
    },
    handleDisable(id) {
      if (!this.disable) {
        // 表示禁用
        this.$modal.confirm("您确定想要禁用吗？").then(() => {
          disable(id).then(() => {
            this.$modal.msgSuccess("禁止成功");
            this.$emit("renovate");
          });
        });
      } else {
        // 表示正常
        this.$modal.confirm("您确定想要启用吗？").then(() => {
          enable(id).then(() => {
            this.$modal.msgSuccess("启用成功");
            this.$emit("renovate");
          });
        });
      }
    },
    // 获取流程平台租户
    getProcessTenantList() {
      const index = this.processTenantList.findIndex(
        item => item.id === this.processCenterInfo.tenantCode || this.processCenterInfo.appId
      );
      if (index !== -1) {
        this.isShow = true;
        if (this.processTenantList[index].delFlag === "0") {
          this.disable = false;
        } else {
          this.disable = true;
        }
      }
    },
    handleVisible(val) {
      this.renovate = val;
    }
  }
};
</script>
<style scoped lang="less">
::v-deep .info-header--color {
  background-color: #fff;
  color: #000;
}

.info-window {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 10%);

  ::v-deep .info-body {
    display: flex;
    flex-direction: column;
  }
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 20px;

  .card-info-item {
    line-height: 2.2;
    color: rgba(0, 96, 166, 1);

    .info-span__deep {
      font-weight: 700;
    }

    .dark-color {
      color: #fff !important;
    }
  }
}

.card-button {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: rgba(52, 144, 211, 0.10);

  .card-button-item {
    border: none;
    background-color: transparent;
    font-size: 18px;
    color: rgba(52, 144, 211, 1);

    &:hover {
      color: var(--light-blue-color);
    }
  }
}
</style>