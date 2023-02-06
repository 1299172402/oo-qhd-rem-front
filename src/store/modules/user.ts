import { message } from 'tdesign-vue'
import Cookies from "js-cookie";
import { TOKEN_NAME } from '@/config/global';
import { login, getInfo, logout} from '@/api/intelligentOilfield/login'
import { encrypt } from '@/utils/jsencrypt';
import store from '@/store';
import router from '@/router'

const InitUserInfo = {
  roles: [],
};

// 定义的state初始值
const state = {
  token: localStorage.getItem(TOKEN_NAME),
  userInfo: InitUserInfo,
  projectionMode: false, // 投影模式
  currentRoles: [], // 新增当前角色
  permissions: [],
  name: '',
  avatar: '',
  userRoles: [],
  loginBack:false, // true:后台管理+门户,false:门户
  logout: '0', // '0':门户,'1'：后台
  isGroupLogin: false,// 门户模式/后台模式，false：后台模式，体现在控制左侧菜单，多tab标签
  userDetail:'',  
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN_NAME, token);
    state.token = token;
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
  login({ commit,dispatch }, userInfo) {
    // 登录接口获取token
    const params = {
      code: userInfo.code,
      uuid: userInfo.uuid,
      username: userInfo.username,
      password: userInfo.password,
    };
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        if (res.data.code === 200) {
          if (userInfo.rememberMe) {
            Cookies.set("username", userInfo.username, { expires: 30 });
            Cookies.set("password", encrypt(userInfo.password), { expires: 30 });
            Cookies.set('rememberMe', userInfo.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          commit('setToken', res.data.data.access_token);
          dispatch("getUserInfo", 'firstLogin');
        } else {
          message.error(res.data.msg);
        }
        resolve(res)
      }).catch(error => {
        reject(error)
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
  getUserInfo({ commit }, firstLogin) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (res.data.code === 200) {
          console.log('获取用户角色====', res.data)
          const {user} = res.data
          // const avatar = user.avatar === "" ? require("@/assets/images/profile.jpg") : user.avatar;
          const avatar = user.avatar === "" ? '' : user.avatar;
          // 判断登录门户/后台管理系统
          commit('SET_LOGINBACK', res.data.loginBack)
          commit('SETLOGOUT', res.data.user.logout)
          commit('SETUSERDETAILS', res.data)
          if(firstLogin === 'firstLogin') {
            if (res.data.user.logout === '0') {
            //   sessionStorage.setItem('isGroupLogin', 'true');
              commit('SETISGROUPLOGIN', true)
              console.log('门户，上次登出的位置');
              router.push('/portal/projectionMode');
            } else if(res.data.user.logout === '1'){
            //   sessionStorage.setItem('isGroupLogin', 'false');
              commit('SETISGROUPLOGIN', false)
              console.log('后台，上次登出的位置');
              router.push('/homePage/index');
            } else if (!res.data.loginBack) {
            //   sessionStorage.setItem('isGroupLogin', 'true');
              commit('SETISGROUPLOGIN', true)
              console.log('门户');
              router.push('/portal/projectionMode');
            } else {
            //   sessionStorage.setItem('isGroupLogin', 'false');
              commit('SETISGROUPLOGIN', false)
              console.log('后台，有门户+后台的权限');
              router.push('/homePage/index');
            }
          }
         
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
      if(res?.data?.code === 200) {
        // 解决重新登录系统标签页未关闭的问题
        store.commit('tabRouter/removeTabRouterList');
        localStorage.removeItem('tabRouterList')
        commit('removeToken');
        // commit('setUserInfo', InitUserInfo);
        commit('setUserInfo', {
          roles: [],
        });

      }
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
