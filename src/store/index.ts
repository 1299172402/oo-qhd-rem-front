import Vue from 'vue';
import Vuex from 'vuex';
// import user from './modules/user';
// import notification from './modules/notification';
// import setting from './modules/setting';
// import permission from './modules/permission';
import tabRouter from './modules/tab-router'; // 多标签管理

Vue.use(Vuex);
// 批量引入@/store/modules下所有ts文件
const myFiles = import.meta.globEager(`./modules/*.ts`);
let myModules = {}
console.log('myFiles',myFiles);
Object.keys(myFiles).forEach(el => {
  const key = el.split('/')[2].split('.')[0]
  console.log('key',key);
  const value = myFiles[el].default
  myModules = {...myModules,[key]:value}
});

const store = new Vuex.Store({
  strict: import.meta.env.MODE === 'release',
  modules: {
    // user,
    // setting,
    // notification,
    // permission,
    tabRouter,
    ...myModules
  },
});

export default store;
