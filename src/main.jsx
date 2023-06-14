import Vue from "vue";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";
import TDesign from "tdesign-vue";
import App from "./App.vue";
import router from "./router";
import zhConfig from "tdesign-vue/es/locale/zh_CN";
import "./permission";
import store from "./store";
import * as echarts from "echarts";
import proxy from "@/config/host.ts";

import "tdesign-vue/es/style/index.css";
import "@/style/index.less";
import "./style/tdesgin-global.less";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/common-style.less";

import VueClipboard from "vue-clipboard2";
import axiosInstance, { download } from "@/utils/request";
import plugins from "./plugins"; // plugins
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/commonSettings.js";
import { getDicts } from "@/api/intelligentOilfield/system/dict/data";
import { getConfigKey } from "@/api/intelligentOilfield/system/config";
import DictTag from "@/components/intelligentOilfield/dict-tag/index.vue";
import DictData from "@/components/intelligentOilfield/dict-data/index.js";
import Pagination from "@/components/intelligentOilfield/customize-pagination/index.vue";
import directive from "./directive";
import "virtual:svg-icons-register";
import SvgIcon from "@/components/intelligentOilfield/svg-icon/index.vue";
import pagePanel from "@/components/intelligentOilfield/page-panel/index.vue";
import infoWindow from "@/components/intelligentOilfield/info-window/index.vue";
import pagePanelNew from "@/components/intelligentOilfield/page-panel-new/index.vue";
import headerSearch from "@/components/intelligentOilfield/header-search/index.vue";

import "@/utils/filter";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import config from "../package.json";

const env = import.meta.env.MODE;

// 全局组件挂载
Vue.component("SvgIcon", SvgIcon);
Vue.component("Pagination", Pagination);
Vue.component("DictTag", DictTag);
Vue.component("t-page-header");
Vue.component("PagePanel", pagePanel);
Vue.component("InfoWindow", infoWindow);
Vue.component("PagePanelNew", pagePanelNew);
Vue.component("HeaderSearch", headerSearch);
// 全局方法挂载
Vue.prototype.getDicts = getDicts;
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.handleTree = handleTree;
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.download = download;
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = axiosInstance;
Vue.prototype.$bus = new Vue();

localStorage.setItem("contextRoot", proxy[env].processAPI);

document.title = proxy[env].WEB_TAG_NAME; // 修改网页标签名称
Vue.use(VXETable);
Vue.use(directive);
Vue.use(plugins);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(TDesign);
Vue.use(VueClipboard);
DictData.install();

// 控制台打印当前系统版本号
window.console.log("当前系统版本：", config.version);
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err);
};

const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch(err => err);
};

Vue.config.productionTip = false;
sync(store, router);
new Vue({
  router,
  store,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: h => (
    <div>
      {/* 可以通过config-provider提供全局（多语言、全局属性）配置，如
      <t-config-provider globalConfig={enConfig}> */}
      <t-config-provider globalConfig={zhConfig}>
        <App />
      </t-config-provider>
    </div>
  )
}).$mount("#app");