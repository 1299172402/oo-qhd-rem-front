<template>
  <el-select
    v-model="value"
    class="noBorderBlueBg"
    filterable
    placeholder="请输入菜单名称"
    @change="handlerChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { mapGetters } from "vuex";
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";
const currentAppId = proxy[env].appId;

/**
 * 过滤并返回菜单列表
 */
function getFilteredMenu(menuItems, currentAppId) {
  function traverseMenu(items, appId) {
    return items.reduce((acc, item) => {
      if (item.hidden || (item.appId && item.appId !== appId)) {
        return acc;
      }
      if (item.children?.length) {
        acc.push(...traverseMenu(item.children, appId));
      } else if (item.meta?.title) {
        acc.push({
          value: item.name,
          label: item.meta.title
        });
      }
      return acc;
    }, []);
  }
  return traverseMenu(menuItems, currentAppId);
}

export default {
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapGetters({
      menuRouters: "permission/routers"
    }),
    options() {
      return getFilteredMenu(this.menuRouters, currentAppId);
    }
  },
  methods: {
    handlerChange(name) {
      this.$router.push({ name });
      this.value = "";
    }
  }
};
</script>