import Vue from "vue";
import Vuex from "vuex";
// import user from './modules/user';
// import notification from './modules/notification';
// import setting from './modules/setting';
// import permission from './modules/permission';
// import createPersistedState from "vuex-persistedstate";
import tabRouter from "./modules/tab-router";// 多标签管理

// 多标签管理
Vue.use(Vuex);
// 批量引入@/store/modules下所有ts文件
const myFiles = import.meta.globEager("./modules/*.ts");
let myModules = {};
Object.keys(myFiles).forEach(el => {
  const key = el.split("/")[2].split(".")[0];
  const value = myFiles[el].default;
  myModules = { ...myModules, [key]: value };
});

const store = new Vuex.Store({
  strict: false,
  modules: {
    // user,
    // setting,
    // notification,
    // permission,
    tabRouter,
    ...myModules
  }
//   plugins: [createPersistedState({
//     storage: sessionStorage,
//     // paths: ["user"],
//     // reducer(val) {
//     //   return { // 只储存state中的user
//     //     isGroupLogin:val.user.isGroupLogin
//     //   }
//     // }
//   })]
});

export default store;