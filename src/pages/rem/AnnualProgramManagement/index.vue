<template>
  <el-container class="layout">
    <el-header height="auto"> </el-header>
    <el-main>
      <el-row :gutter="10" class="my-5">
        <el-radio-group v-model="module">
          <el-row>
            <el-radio-button label="schedule1" style="margin-left: 10px">附表1</el-radio-button>
            <el-radio-button label="schedule21" style="margin-left: 10px">附表2-1(在生产)</el-radio-button>
            <el-radio-button label="schedule22" style="margin-left: 10px">附表2-2(在建设+在评价)</el-radio-button>
            <el-radio-button label="schedule3" style="margin-left: 10px">附表3</el-radio-button>
            <el-radio-button label="schedule4" style="margin-left: 10px">附表4</el-radio-button>
            <el-radio-button label="schedule5" style="margin-left: 10px">附表5</el-radio-button>
            <el-radio-button label="schedule6" style="margin-left: 10px">附表6</el-radio-button>
            <el-radio-button label="schedule7" style="margin-left: 10px">附表7</el-radio-button>
            <el-radio-button label="schedule8" style="margin-left: 10px">附表8</el-radio-button>
            <el-radio-button label="schedule9" style="margin-left: 10px">附表9</el-radio-button>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-radio-button label="schedule10" style="margin-left: 10px">附表10</el-radio-button>
            <el-radio-button label="schedule11" style="margin-left: 10px">附表11</el-radio-button>
            <el-radio-button label="schedule12" style="margin-left: 10px">附表12</el-radio-button>
            <el-radio-button label="schedule13" style="margin-left: 10px">附表13</el-radio-button>
            <el-radio-button label="schedule14" style="margin-left: 10px">附表14</el-radio-button>
            <el-radio-button label="schedule15" style="margin-left: 10px">附表15</el-radio-button>
            <el-radio-button label="schedule16" style="margin-left: 10px">附表16</el-radio-button>
            <el-radio-button label="schedule17" style="margin-left: 10px">附表17</el-radio-button>
            <el-radio-button label="schedule18" style="margin-left: 10px">附表18</el-radio-button>
          </el-row>
        </el-radio-group>
      </el-row>
      <el-row>
        <component :is="module"></component>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  components: {
    schedule1: () => import('./modules/schedule1.vue'),
    schedule21: () => import('./modules/schedule2-1.vue'),
    schedule22: () => import('./modules/schedule2-2.vue'),
    schedule3: () => import('./modules/schedule3.vue'),
    schedule4: () => import('./modules/schedule4.vue'),
    schedule5: () => import('./modules/schedule5.vue'),
    schedule6: () => import('./modules/schedule6.vue'),
    schedule7: () => import('./modules/schedule7.vue'),
    schedule8: () => import('./modules/schedule8.vue'),
    schedule9: () => import('./modules/schedule9.vue'),
    schedule10: () => import('./modules/schedule10.vue'),
    schedule11: () => import('./modules/schedule11.vue'),
    schedule12: () => import('./modules/schedule12.vue'),
    schedule13: () => import('./modules/schedule13.vue'),
    schedule14: () => import('./modules/schedule14.vue'),
    schedule15: () => import('./modules/schedule15.vue'),
    schedule16: () => import('./modules/schedule16.vue'),
    schedule17: () => import('./modules/schedule17.vue'),
    schedule18: () => import('./modules/schedule18.vue'),
  },
  data() {
    return {
      title: this.$route.meta.title,
      module: 'schedule1',
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-radio-button--medium .el-radio-button__inner {
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 0;
}

::v-deep .el-radio-button__inner {
  color: #00def0;
  background-color: #031527;
  border: 1px solid #00def0;
}
</style>