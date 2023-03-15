<template>
    <search-select
      v-model="appId"
      :fn="appOptionFn"
      prop-name="appName"
      value-prop="appId"
      label-prop="appName"
      placeholder="请选择所属应用"
    />
  </template>
  
<script>
import SearchSelect from "./index.vue";
import { listApp } from '@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js'
  
export default {
  name: "AppSearchSelect",
  components: {
    SearchSelect
  },
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      appOptionFn: listApp
    };
  },
  computed: {
    appId: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>