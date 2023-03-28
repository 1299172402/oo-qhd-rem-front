<template>
  <div>
    <template v-for="item in list">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item
          :key="item.path"
          v-if="getHref(item)"
          :href="getHref(item)?.[0]"
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
        >
          <template #icon>
            <svg-icon class="svgIconClass" v-if="typeof item.icon === 'string' && item.icon" :icon-class="item.icon" />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" /> -->
            <renderFnIcon :item="item" />
          </template>
        </t-menu-item>
        <!-- 通过link判断路由外链跳转 -->
        <!-- 
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
          :href="item.meta.link"
          -->
        <t-menu-item
          v-else-if="item.meta.link"
          :key="item.path"
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
          :to="item.path"
          @click="changeMenu1(item)"
        >
          <template #icon>
            <!-- 只要不是一级路由就占位儿 -->
            <span style="color: transparent">{{ item.meta.single ? '' : '####' }}</span>
            <svg-icon class="svgIconClass" v-if="typeof item.icon === 'string' && item.icon" :icon-class="item.icon" />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" /> -->
            <renderFnIcon :item="item" />
          </template>
          {{ item.title }}
        </t-menu-item>
        <t-menu-item
          @click="changeMenu(item)"
          :key="item.path"
          v-else
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
          :to="item.path"
        >
          <template #icon>
            <!-- 只要不是一级路由就占位儿 -->
            <span style="color: transparent">{{ item.meta.single ? '' : '##' }}</span>
            <!-- 三级路由最后一项占位儿 -->
            <span style="color: transparent" v-if="item.isThirdRouter">##</span>
            <svg-icon
              class="svgIconClass"
              v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
              :icon-class="item.icon"
            />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon&&item.icon!=='#'" :name="item.icon" /> -->
            <!-- 选中带圆点未完 -->
            <!-- <div style="width:6px;height:6px;border-radius:4px;background:var(--lightBlueColor);margin-right:7px"></div> -->
            <renderFnIcon :item="item" />
          </template>
          {{ item.title }}
        </t-menu-item>
      </template>
      <t-submenu
        v-else
        :name="item.path"
        :value="item.path"
        :title="item.title"
        :key="item.path"
        @mouseover.native="onmouseoverRight"
      >
        <template #icon>
          <svg-icon
            class="svgIconClass"
            v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
            :icon-class="item.icon"
          />
          <!-- 二级路由且不带图标占位儿 -->
          <span v-else style="color: transparent">##</span>
          <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon&&item.icon!=='#'" :name="item.icon" /> -->
          <renderFnIcon :item="item" />
        </template>
        <!-- :style="{'margin-left':item.icon==='#'? '0px' : item.icon==='icon' ? '0px': '10px'}"  -->
        <menu-content v-if="item.children" :nav-data="item.children" />
      </t-submenu>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { prefix } from '@/config/global';
import { MenuRoute } from '@/interface';

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  return list
    .map((item) => {
      let path;
      path = basePath ? `${basePath}/${item.path}` : item.path;
      if (path.indexOf('//') !== -1) {
        // 解决三级菜单
        path = `/${path.split('//')[1]}`;
      }
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        name: item?.name,
        isThirdRouter: item?.isThirdRouter,
        redirect: item.redirect,
        hidden: item.hidden,
      };
    })
    .filter((item) => item.meta && item.hidden !== true);
};

Vue.component('renderFnIcon', {
  props: {
    item: {
      type: Object as PropType<MenuRoute>,
      required: true,
    },
  },
  // 遵循最小改动的原则，这里仍然使用 createElement
  render(createElement) {
    if (typeof this.item.icon === 'function' || (this.item.icon && typeof this.item.icon.render === 'function')) {
      return createElement(this.item.icon, {
        class: 't-icon',
      });
    }
    return undefined;
  },
});

export default Vue.extend({
  name: 'MenuContent',
  props: {
    navData: Array,
  },
  data() {
    return {
      prefix,
    };
  },
  computed: {
    list(): Array<MenuRoute> {
      return getMenuList(this.navData);
    },
  },
  methods: {
    onmouseoverRight(e) {
      if (this.$store.state.setting.layout == 'top') {
        if (e.target.tagName == 'DIV') {
          e.srcElement.parentNode.lastElementChild.style.left = e.target.getBoundingClientRect().left + 'px';
          let b = Number(e.target.getBoundingClientRect().left) + 160;
          if (e.target.className == 't-menu__item' && e.target.parentNode.className != 't-submenu') {
            console.log(e.target,'sss')
            // TODO: Maybe change back
            // e.srcElement.parentNode.lastElementChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.top = e.target.getBoundingClientRect().top + 'px';
            e.target.nextSibling.style.top = e.target.getBoundingClientRect().top + 'px';
            // TODO: Maybe change back
            // e.srcElement.parentNode.lastElementChild.lastElementChild.style.top = e.target.getBoundingClientRect().top + 'px';
            e.target.nextSibling.style.left = b + 'px';
          }
        }
      }
    },
    changeMenu(value: MenuRoute) {
      // 一级菜单接口链接
      if (value.meta.single) {
        this.$store.commit('permission/setRouterLink', value.children[0].meta?.link);
      }
    },
    // 二级菜单/三级菜单接口链接
    changeMenu1(value: MenuRoute) {
      this.$store.commit('permission/setRouterLink', value.meta?.link);
    },
    getHref(item: MenuRoute) {
      return item.path.match(/(http|https):\/\/([\w.]+\/?)\S*/);
    },
  },
});
</script>
<style scoped>
.svgIconClass {
  width: 2.5em !important;
  height: 1.3em !important;
}
</style>