<<<<<<< HEAD
<template>
  <div>
    <!-- eslint-disable -->
    <template v-for="item in list">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item
          v-if="getHref(item)"
          :key="item.path"
          :href="getHref(item)?.[0]"
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
        >
          <template #icon>
            <svg-icon v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'" class="svgIconClass" :icon-class="item.icon" />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" /> -->
            <render-fn-icon :item="item" />
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
            <span style="color: transparent">{{ item.meta.hasOwnProperty("single") ? "" : "##" }}</span>
            <svg-icon v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'" class="svgIconClass" :icon-class="item.icon" />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" /> -->
            <render-fn-icon :item="item" />
          </template>
          {{ item.title }}
        </t-menu-item>
        <t-menu-item
          v-else
          :key="item.path"
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
          :to="item.path"
          @click="changeMenu(item)"
        >
          <template #icon>
            <!-- 只要不是一级路由就占位儿 -->
            <span style="color: transparent">{{ item.meta.hasOwnProperty("single") ? "" : "##" }}</span>
            <!-- 三级路由最后一项占位儿 -->
            <span v-if="item.isThirdRouter" style="color: transparent">##</span>
            <svg-icon
              v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
              class="svgIconClass"
              :icon-class="item.icon"
            />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon&&item.icon!=='#'" :name="item.icon" /> -->
            <!-- 选中带圆点未完 -->
            <!-- <div style="width:6px;height:6px;border-radius:4px;background:var(--light-blue-color);margin-right:7px"></div> -->
            <render-fn-icon :item="item" />
          </template>
          {{ item.title }}
        </t-menu-item>
      </template>
      <t-submenu
        v-else
        :key="item.path"
        :name="item.path"
        :value="item.path"
        :title="$store.state.setting.layout === 'mix' ? item.title : null"
        @mouseover.native="onmouseoverRight"
      >
        <template #icon v-if="$store.state.setting.layout === 'mix'">
          <svg-icon
            v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
            class="svgIconClass"
            :icon-class="item.icon"
          />
          <!-- 二级路由且不带图标占位儿 -->
          <span v-else style="color: transparent">##</span>
          <render-fn-icon :item="item" />
        </template>
        <template #title v-else>
          <svg-icon
            v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
            class="svgIconClass"
            :icon-class="item.icon"
          />
          <!-- 二级路由且不带图标占位儿 -->
          <span v-else style="color: transparent">##</span>
          <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon&&item.icon!=='#'" :name="item.icon" /> -->
          <render-fn-icon :item="item" />
          {{ item.title }}
        </template>
        <!-- :style="{'margin-left':item.icon==='#'? '0px' : item.icon==='icon' ? '0px': '10px'}"  -->
        <menu-content
          v-if="
            item.children && $store.state.setting.isSidebarCompact == false && $store.state.setting.layout === 'mix'
          "
          :nav-data="item.children"
        />
        <div
          class="menuselect"
          v-if="
            (item.children && $store.state.setting.isSidebarCompact == true) ||
            (item.children && $store.state.setting.layout === 'top')
          "
        >
          <div class="secondmenu" v-for="items in item.children">
            <router-link :to="{ path: items.path }">
              <div>{{ items.title }}</div>
            </router-link>
            <div style="display: flex; flex-wrap: wrap;">
                <div class="thirdmenu" v-if="items.children" v-for="itemss in items.children">
                    <router-link :to="{ path: itemss.path }">
                        <div>{{ itemss.title }}</div>
                    </router-link>
                </div>
            </div>
          </div>
        </div>
      </t-submenu>
    </template>
    <!-- eslint-disable -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { prefix } from "@/config/global";
import { MenuRoute } from "@/interface";

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  return list
    .map(item => {
      let path;
      path = basePath ? `${basePath}/${item.path}` : item.path;
      if (path.indexOf("//") !== -1) {
        // 解决三级菜单
        path = `/${path.split("//")[1]}`;
      }
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || "",
        children: getMenuList(item.children, path),
        meta: item.meta,
        name: item?.name,
        isThirdRouter: item?.isThirdRouter,
        redirect: item.redirect,
        hidden: item.hidden
      };
    })
    .filter(item => item.meta && item.hidden !== true);
};
/* eslint-disable */
Vue.component("RenderFnIcon", {
  props: {
    item: {
      type: Object as PropType<MenuRoute>,
      required: true
    },
  },
  // 遵循最小改动的原则，这里仍然使用 createElement
  render(createElement) {
    if (typeof this.item.icon === "function" || (this.item.icon && typeof this.item.icon.render === "function")) {
      return createElement(this.item.icon, {
        class: "t-icon"
      });
    }
    return undefined;
  }
});

/* eslint-disable */

export default Vue.extend({
  name: "MenuContent",
  props: {
    navData: Array
  },
  data() {
    return {
      prefix
    };
  },
  mounted() {
    this.addTip();
  },
  watch: {
    "$store.state.setting.isSidebarCompact": {
      handler() {
        this.addTip();
      }
    }
  },
  computed: {
    list(): Array<MenuRoute> {
      return getMenuList(this.navData);
    }
  },
  methods: {
    onmouseoverRight(e) {
      if (this.$store.state.setting.layout === "top") {
        if (e.target.tagName === "DIV") {
          e.srcElement.parentNode.lastElementChild.style.left = `${e.target.getBoundingClientRect().left - 140}px`;
          const b = Number(e.target.getBoundingClientRect().left) + 146;
          //二级菜单需设置靠左
          if (
            e.target.className.indexOf("t-menu__item") > -1 &&
            e.target.parentNode.parentNode.className !== "header-menu"
          ) {
            // TODO: Maybe change back
            // e.srcElement.parentNode.lastElementChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.top = e.target.getBoundingClientRect().top + 'px';
            e.target.nextSibling.style.top = `${e.target.getBoundingClientRect().top - 7}px`;
            // TODO: Maybe change back
            // e.srcElement.parentNode.lastElementChild.lastElementChild.style.top = e.target.getBoundingClientRect().top + 'px';
            e.target.nextSibling.style.left = `${b}px`;
          }
        }
      }
    },
    changeMenu(value: MenuRoute) {
      // 一级菜单接口链接
      if (value.meta.single) {
        this.$store.commit("permission/setRouterLink", value.children[0].meta?.link);
      }
    },
    // 二级菜单/三级菜单接口链接
    changeMenu1(value: MenuRoute) {
      this.$store.commit("permission/setRouterLink", value.meta?.link);
    },
    getHref(item: MenuRoute) {
      return item.path.match(/(http|https):\/\/([\w.]+\/?)\S*/);
    },
    addTip() {
      if(this.$store.state.setting.isSidebarCompact) {
        return;
      }
      const list = document.querySelectorAll(".t-menu__content");
      list.forEach(item => {
        if(item.scrollWidth > item.offsetWidth) {
          item.setAttribute("title", item.innerText); 
        }
      });
    }
  }
});
</script>
<style lang="less" scoped>
.svgIconClass {
  width: 2.5em !important;
  height: 1.3em !important;
}

.menuselect {
  padding: 0 12px;
}

.secondmenu {
  margin-bottom: 10px;
  padding-bottom: 6px;
}

.menuselect .secondmenu:nth-last-child(1) {
  border: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.secondmenu > a {
  font-weight: 900;
  line-height: 32px;
  margin-bottom: 5px;
}

.thirdmenu {
  width: 32%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 6px;
}

.thirdmenu a {
  width: 100%;
  display: block;
  height: 32px;
  font-size: 12px;
  font-family: PingFangSC-Regular, "PingFang SC";
  font-weight: 400;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 0;
}

.t-button-link,
a {
  height: auto;
  display: inline-block;
}

.header-menu::-webkit-scrollbar {
  display: none;
}

.nolink{
  pointer-events: none;
  cursor: default;
}

/deep/ .t-menu__content {
  max-width: 70%;
}
</style>
=======
<template>
  <div>
    <!-- eslint-disable -->
    <template v-for="item in list">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item
          v-if="getHref(item)"
          :key="item.path"
          :href="getHref(item)?.[0]"
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
        >
          <template #icon>
            <svg-icon v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'" class="svgIconClass" :icon-class="item.icon" />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" /> -->
            <render-fn-icon :item="item" />
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
            <span style="color: transparent">{{ item.meta.hasOwnProperty("single") ? "" : "##" }}</span>
            <svg-icon v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'" class="svgIconClass" :icon-class="item.icon" />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" /> -->
            <render-fn-icon :item="item" />
          </template>
          {{ item.title }}
        </t-menu-item>
        <t-menu-item
          v-else
          :key="item.path"
          :name="item.path"
          :value="item.meta?.single ? item.redirect : item.path"
          :to="item.path"
          @click="changeMenu(item)"
        >
          <template #icon>
            <!-- 只要不是一级路由就占位儿 -->
            <span style="color: transparent">{{ item.meta.hasOwnProperty("single") ? "" : "##" }}</span>
            <!-- 三级路由最后一项占位儿 -->
            <span v-if="item.isThirdRouter" style="color: transparent">##</span>
            <svg-icon
              v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
              class="svgIconClass"
              :icon-class="item.icon"
            />
            <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon&&item.icon!=='#'" :name="item.icon" /> -->
            <!-- 选中带圆点未完 -->
            <!-- <div style="width:6px;height:6px;border-radius:4px;background:var(--light-blue-color);margin-right:7px"></div> -->
            <render-fn-icon :item="item" />
          </template>
          {{ item.title }}
        </t-menu-item>
      </template>
      <t-submenu
        v-else
        :key="item.path"
        :name="item.path"
        :value="item.path"
        :title="$store.state.setting.layout === 'mix' ? item.title : null"
        @mouseover.native="onmouseoverRight"
        @mouseleave.native="onmouseleave"
      >
        <template #icon v-if="$store.state.setting.layout === 'mix'">
          <svg-icon
            v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
            class="svgIconClass"
            :icon-class="item.icon"
          />
          <!-- 二级路由且不带图标占位儿 -->
          <span v-else style="color: transparent">##</span>
          <render-fn-icon :item="item" />
        </template>
        <template #title v-else>
          <svg-icon
            v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
            class="svgIconClass"
            :icon-class="item.icon"
          />
          <!-- 二级路由且不带图标占位儿 -->
          <span v-else style="color: transparent">##</span>
          <!-- <t-icon v-if="typeof item.icon === 'string' && item.icon&&item.icon!=='#'" :name="item.icon" /> -->
          <render-fn-icon :item="item" />
          {{ item.title }}
        </template>
        <!-- :style="{'margin-left':item.icon==='#'? '0px' : item.icon==='icon' ? '0px': '10px'}"  -->
        <!-- TODO: Maybe change back -->
        <!-- <menu-content
          v-if="
            item.children && $store.state.setting.isSidebarCompact == false && $store.state.setting.layout === 'mix'
          "
          :nav-data="item.children"
        /> -->
        <div class="menuselect">
          <div class="menuTitle">
            <svg-icon
              v-if="typeof item.icon === 'string' && item.icon && item.icon !== '#'"
              class="svgIconClass svgIconTitle"
              :icon-class="item.icon"
            />
            <span>{{ item.title }}</span>
          </div>
          <div class="secondmenu" v-for="items in item.children">
            <div :class="{ secondTitle: true, secondDefault: items.children.length > 0 }" @click="secondMenu(items)">
              {{ items.title }}
            </div>
            <div style="display: flex; flex-wrap: wrap">
              <template v-if="items.children">
                <div class="thirdmenu" v-for="itemss in items.children">
                  <router-link :to="{ path: itemss.path }">
                    <div>{{ itemss.title }}</div>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </t-submenu>
    </template>
    <!-- eslint-disable -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { prefix } from "@/config/global";
import { MenuRoute } from "@/interface";

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  return list
    .map(item => {
      let path;
      path = basePath ? `${basePath}/${item.path}` : item.path;
      if (path.indexOf("//") !== -1) {
        // 解决三级菜单
        path = `/${path.split("//")[1]}`;
      }
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || "",
        children: getMenuList(item.children, path),
        meta: item.meta,
        name: item?.name,
        isThirdRouter: item?.isThirdRouter,
        redirect: item.redirect,
        hidden: item.hidden
      };
    })
    .filter(item => item.meta && item.hidden !== true);
};
/* eslint-disable */
Vue.component("RenderFnIcon", {
  props: {
    item: {
      type: Object as PropType<MenuRoute>,
      required: true
    },
  },
  // 遵循最小改动的原则，这里仍然使用 createElement
  render(createElement) {
    if (typeof this.item.icon === "function" || (this.item.icon && typeof this.item.icon.render === "function")) {
      return createElement(this.item.icon, {
        class: "t-icon"
      });
    }
    return undefined;
  }
});

/* eslint-disable */

export default Vue.extend({
  name: "MenuContent",
  props: {
    navData: Array
  },
  data() {
    return {
      prefix
    };
  },
  mounted() {
    this.addTip();
  },
  watch: {
    "$store.state.setting.isSidebarCompact": {
      handler() {
        this.addTip();
      }
    }
  },
  computed: {
    list(): Array<MenuRoute> {
      return getMenuList(this.navData);
    }
  },
  methods: {
    onmouseoverRight(e) {
      const circle = document.getElementsByClassName("el-carousel__arrow");
      for(let i = 0; i < circle.length; i++){
          circle[i].style.zIndex = "0"
      }
      if (e.target.className === "t-menu__item t-is-opened" || e.target.className === "t-menu__item") {
        if (this.$store.state.setting.layout === "top" && e.target.tagName !== "LI") {
          if (e.target.tagName === "DIV") {
            e.srcElement.parentNode.lastElementChild.style.left = `${e.target.getBoundingClientRect().left - 140}px`;
            const b = Number(e.target.getBoundingClientRect().left) + 146;
            //二级菜单需设置靠左
            if (
              e.target.className.indexOf("t-menu__item") > -1 &&
              e.target.parentNode.parentNode.className !== "header-menu"
            ) {
              // TODO: Maybe change back
              // e.srcElement.parentNode.lastElementChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.top = e.target.getBoundingClientRect().top + 'px';
              e.target.nextSibling.style.top = `${e.target.getBoundingClientRect().top - 7}px`;
              // TODO: Maybe change back
              // e.srcElement.parentNode.lastElementChild.lastElementChild.style.top = e.target.getBoundingClientRect().top + 'px';
              e.target.nextSibling.style.left = `${b}px`;
            }
          }
        }
      }
    },
    onmouseleave(){
      const circle = document.getElementsByClassName("el-carousel__arrow");
      for(let i = 0; i < circle.length; i++){
          circle[i].style.zIndex = ""
      }
    },
    changeMenu(value: MenuRoute) {
      // 一级菜单接口链接
      if (value.meta.single) {
        this.$store.commit("permission/setRouterLink", value.children[0].meta?.link);
      }
    },
    // 二级菜单/三级菜单接口链接
    changeMenu1(value: MenuRoute) {
      this.$store.commit("permission/setRouterLink", value.meta?.link);
    },
    getHref(item: MenuRoute) {
      return item.path.match(/(http|https):\/\/([\w.]+\/?)\S*/);
    },
    addTip() {
      if(this.$store.state.setting.isSidebarCompact) {
        return;
      }
      const list = document.querySelectorAll(".t-menu__content");
      list.forEach(item => {
        if(item.scrollWidth > item.offsetWidth) {
          item.setAttribute("title", item.innerText); 
        }
      });
    },
    secondMenu(item) {
      if (item.children.length === 0) {
        this.$router.push({ path: item.path });
      }
    },
  },
});
</script>
<style lang="less" scoped>
.svgIconClass {
  width: 2.5em !important;
  height: 1.3em !important;
}

.menuselect {
  padding: 0 12px;
}

.secondmenu {
  margin-bottom: 10px;
  padding-bottom: 6px;
}

.menuselect .secondTitle:nth-last-child(1) {
  border: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.secondmenu > .secondTitle {
  font-weight: 900;
  line-height: 32px;
  margin-bottom: 5px;
  cursor: pointer;
}

.secondDefault {
  cursor: default !important;
}

.thirdmenu {
  width: 30%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 6px;
}

.thirdmenu a {
  width: 100%;
  display: block;
  height: 32px;
  font-size: 12px;
  font-family: PingFangSC-Regular, "PingFang SC";
  font-weight: 400;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 0;
}

.t-button-link,
a {
  height: auto;
  display: inline-block;
}

.header-menu::-webkit-scrollbar {
  display: none;
}

/deep/ .t-menu__content {
  max-width: 70%;
}

.menuTitle {
  margin: 10px 0;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}

.svgIconTitle {
  margin-left: -10px;
}
</style>
>>>>>>> kjSystem
