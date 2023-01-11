import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import TDesign from 'tdesign-vue';
import App from './App.vue';
import router from './router';
import zhConfig from 'tdesign-vue/es/locale/zh_CN';
import './permission';
import store from './store';
import * as echarts from 'echarts';

import 'tdesign-vue/es/style/index.css';
import '@/style/index.less';
import './style/tdesgin-global.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/common-style.less';


import VueClipboard from 'vue-clipboard2';
import axiosInstance, { download } from '@/utils/request';
import plugins from './plugins' // plugins
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/commonSettings.js";
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import DictTag from '@/components/dict-tag/index.vue';
import DictData from '@/components/dict-data/index.js'
import Pagination from "@/components/customize-pagination/index.vue";
import directive from './directive'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/svg-icon/index.vue'

// 全局组件挂载
Vue.component('svg-icon', SvgIcon)
Vue.component('Pagination', Pagination)
Vue.component('DictTag', DictTag)
Vue.component('t-page-header');

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.download = download
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = axiosInstance;


Vue.use(directive)
Vue.use(plugins)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(TDesign);
Vue.use(VueClipboard);
DictData.install()



const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};

const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch((err) => err);
};

Vue.config.productionTip = false;
sync(store, router);
new Vue({
  router,
  store,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (h) => (
    <div>
      {/* 可以通过config-provider提供全局（多语言、全局属性）配置，如 
      <t-config-provider globalConfig={enConfig}> */}
      <t-config-provider globalConfig={zhConfig}>
        <App />
      </t-config-provider>
    </div>
  ),
}).$mount('#app');
