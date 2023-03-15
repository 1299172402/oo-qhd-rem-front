import { message } from 'tdesign-vue'
import Cookies from "js-cookie";
import { TOKEN_NAME } from '@/config/global';
import { login, getInfo, logout, getCodeImg} from '@/api/intelligentOilfield/login'
import { encrypt, encryptlogin } from '@/utils/jsencrypt';
import store from '@/store';
import router from '@/router'
import proxy from "@/config/host";
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth'
const env = import.meta.env.MODE || "development";

const InitUserInfo = {
  roles: [],
};

// 定义的state初始值
const state = {
  token: localStorage.getItem(TOKEN_NAME),
  // token: getToken(),
  userInfo: InitUserInfo,
  projectionMode: false, // 投影模式
  currentRoles: [], // 新增当前角色
  permissions: [],
  name: '',
  avatar: '',
  userRoles: [],
  loginBack:false, // true:后台管理+门户,false:门户
  logout: '0', // '0':门户,'1'：后台
  // isGroupLogin: false,// 门户模式/后台模式，false：后台模式，体现在控制左侧菜单，多tab标签
  isGroupLogin: localStorage.getItem('isGroupLogin')?localStorage.getItem('isGroupLogin')==='true':false,
  userDetail:'',  
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN_NAME, token);
    state.token = token;
  },
  SET_EXPIRES_IN: (state, time) => {
    state.expires_in = time
  },
  removeToken(state) {
    localStorage.removeItem(TOKEN_NAME);
    state.token = '';
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setProjectionMode(state, projectionMode) {
    state.projectionMode = projectionMode;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_ROLES: (state, userRoles) => {
    state.userRoles = userRoles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_LOGINBACK: (state, loginBack) =>{
    state.loginBack = loginBack
  },
  SETLOGOUT: (state, logout) =>{
    state.logout = logout
  },
  SETISGROUPLOGIN: (state, isGroupLogin) =>{
    localStorage.setItem('isGroupLogin', isGroupLogin);
    state.isGroupLogin = isGroupLogin
  },
  SETUSERDETAILS: (state, userDetail) =>{
    state.userDetail = userDetail
  },
};

const getters = {
  token: (state) => state.token,
  roles: (state) => state.userInfo?.roles,
  getProjectionMode: (state) => state.projectionMode,
  permissions: state => state.permissions,
  avatar: state => state.avatar,
  name: state => state.name,
  userRoles: (state) => state.userRoles,
  loginBack: (state) => state.loginBack,
  logout: (state) => state.logout,
  isGroupLogin: (state) => state.isGroupLogin,
  userDetail: (state) => state.userDetail,
};

const actions = {
//   async login({ commit }, userInfo) {
  //     // 登录接口获取token
  //     const params = {
  //       code: userInfo.code,
  //       uuid: userInfo.uuid,
  //       username: userInfo.username,
  //       password: userInfo.password,
  //     };
  //     await login(params).then((res) => {
  //       if (res.data.code === 200) {
  //         if (userInfo.rememberMe) {
  //           Cookies.set("username", userInfo.username, { expires: 30 });
  //           Cookies.set("password", encrypt(userInfo.password), { expires: 30 });
  //           Cookies.set('rememberMe', userInfo.rememberMe, { expires: 30 });
  //         } else {
  //           Cookies.remove("username");
  //           Cookies.remove("password");
  //           Cookies.remove('rememberMe');
  //         }
  //         commit('setToken', res.data.data.access_token);
  //       } else {
  //         message.error(res.data.msg);
  //       }
  //     })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   },
  getCodeImg() {
    return new Promise((resolve, reject) => {
      getCodeImg()
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  login({ commit,dispatch }, userInfo) {
    // 登录接口获取token
    let query = {};
    if (userInfo.srid) {
      query = { srid: userInfo.srid };
    }
    return new Promise((resolve, reject) => {
      dispatch('getCodeImg').then(res => {
        const {publicKey} = res.data.publicKey
        const params = {
          code: userInfo.code,
          uuid: userInfo.uuid,
          username: userInfo.username,
          password: encryptlogin(userInfo.password, publicKey),
        };
        login(params, query).then(res => {
          if (res.data.code === 200) {
            if (userInfo.srid && res.data.data.redirectUrl) {
              // 参数携带srid需要直接进行跳转
              let baseURL = "";
              if (env === "development") {
                baseURL = `${window.location.origin}/${proxy[env].API}`;
              } else {
                baseURL = proxy[env].API;
              }
              baseURL = `${baseURL}/auth${res.data.data.redirectUrl}`;
              window.location.href = baseURL;
            } else {
              if (userInfo.rememberMe) {
                Cookies.set("username", userInfo.username, { expires: 30 });
                Cookies.set("password", encrypt(userInfo.password), { expires: 30 });
                Cookies.set('rememberMe', userInfo.rememberMe, { expires: 30 });
              } else {
                Cookies.remove("username");
                Cookies.remove("password");
                Cookies.remove('rememberMe');
              }
              // setToken(res.data.data.access_token)
              commit('setToken', res.data.data.access_token);
              //   commit('setToken', res.data.data.access_token)
              //   setExpiresIn(res.data.data.expires_in)
              //   commit('SET_EXPIRES_IN', res.data.data.expires_in)
              dispatch("getUserInfo", 'firstLogin');
            }
          } else {
            message.error(res.data.msg);
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    })
  },
  
  //   async getUserInfo({ commit }) {
  //     await getInfo().then(res => {
  //       if (res.data.code === 200) {
  //         console.log('获取用户角色====', res.data)
  //         const {user} = res.data
  //         // const avatar = user.avatar === "" ? require("@/assets/images/profile.jpg") : user.avatar;
  //           // 判断登录门户/后台管理系统
  //           commit('SET_LOGINBACK', res.data.loginBack)
  //         const avatar = user.avatar === "" ? '' : user.avatar;
  //         if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
  //           commit('SET_ROLES', res.data.roles)
  //           commit('SET_PERMISSIONS', res.data.permissions)
  //         } else {
  //           commit('SET_ROLES', ['ROLE_DEFAULT'])
  //         }
  //         commit('SET_NAME', user.userName)
  //         commit('SET_AVATAR', avatar)
  //       }
  //     }).catch(error => {
  //       console.log(error);
  //     })
  //     const mockRemoteUserInfo = async () =>
  //       ({
  //         name: 'td_dev',
  //         roles: ['ALL_ROUTERS'],
  //       });

  //     // 登录拿到的用户角色，目的给用户配置路由
  //     const res = await mockRemoteUserInfo();
  //     commit('setUserInfo', res);
  //   },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (res.data.code === 200) {
          console.log('获取用户角色====', res.data)
          const {user} = res.data
          // const avatar = user.avatar === "" ? require("@/assets/images/profile.jpg") : user.avatar;
          const avatar = user?.avatar === "" ? '' : user?.avatar;
          // 判断登录门户/后台管理系统
          commit('SET_LOGINBACK', res.data?.loginBack)
          commit('SETLOGOUT', res.data.user?.logout)
          commit('SETUSERDETAILS', res.data)

          commit('SETISGROUPLOGIN', false)
          router.push('/homePage/index');
          
          if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.data.roles)
            commit('SET_PERMISSIONS', res.data.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
        } 
              
        commit('setUserInfo', {
          name: 'td_dev',
          roles: ['ALL_ROUTERS'],
        });
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
    
  },
  async logout({ commit }) {
    await logout().then(res => {
    //   if(res?.data?.code === 200) {
      // 解决重新登录系统标签页未关闭的问题
      store.commit('tabRouter/removeTabRouterList');
      localStorage.removeItem('tabRouterList')
      // removeToken();
      commit('removeToken');
      // commit('setUserInfo', InitUserInfo);
      commit('setUserInfo', {
        roles: [],
      });

    //   }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
