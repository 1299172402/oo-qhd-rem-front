import { message } from "tdesign-vue";
import Cookies from "js-cookie";
import { TOKEN_NAME, USER_NAME } from "@/config/global";
import { login, getInfoByAppId, logout, getCodeImg } from "@/api/intelligentOilfield/login";
import { encrypt, encryptlogin } from "@/utils/jsencrypt";
import store from "@/store";
import router from "@/router";
import proxy from "@/config/host";
import STYLE_CONFIG from "@/config/style";
import { LIGHT_CHART_COLORS, DARK_CHART_COLORS } from "@/config/color";
import path from "path-browserify";
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth'
const env = import.meta.env.MODE || "development";

const InitUserInfo = {
    roles: []
};

function handlerFirstMenuPath(obj, paths = []) {
    if (obj.path) {
        paths.push(obj.path);
    }
    if (obj.children?.length) {
        handlerFirstMenuPath(obj.children[0], paths);
    }
    return paths;
}

// 定义的state初始值
const state = {
    token: localStorage.getItem(TOKEN_NAME),
    // token: getToken(),
    userInfo: InitUserInfo,
    projectionMode: false, // 投影模式
    currentRoles: [], // 新增当前角色
    permissions: [],
    name: "",
    avatar: "",
    userRoles: [],
    loginBack: false, // true:后台管理+门户,false:门户
    logout: "0", // '0':门户,'1'：后台
    // isGroupLogin: false,// 门户模式/后台模式，false：后台模式，体现在控制左侧菜单，多tab标签
    isGroupLogin: localStorage.getItem("isGroupLogin") ? localStorage.getItem("isGroupLogin") === "true" : false,
    userDetail: "",
    isMax: false, // 是否最大化
    tenantId: localStorage.getItem("TENANTID_NAME"),
    tenantName: "", // 租户名称
    notice: "",
    tenantCode: {
        value: "",
        state: false
    }
};

const mutations = {
    setToken(state, token) {
        if (!token) {
            localStorage.removeItem(TOKEN_NAME);
        } else {
            localStorage.setItem(TOKEN_NAME, token);
        }
        state.token = token;
    },
    SETISMAX: (state, isMax) => {
        state.isMax = isMax;
    },
    SET_EXPIRES_IN: (state, time) => {
        state.expires_in = time;
    },
    removeToken(state) {
        localStorage.removeItem(TOKEN_NAME);
        state.token = "";
    },
    setUserInfo(state, userInfo = {}) {
        localStorage.setItem(USER_NAME, userInfo?.userName);
        state.userInfo = JSON.parse(JSON.stringify(userInfo));
    },
    setProjectionMode(state, projectionMode) {
        state.projectionMode = projectionMode;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = JSON.parse(JSON.stringify(permissions));
    },
    SET_ROLES: (state, userRoles) => {
        state.userRoles = JSON.parse(JSON.stringify(userRoles));
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_LOGINBACK: (state, loginBack) => {
        state.loginBack = loginBack;
    },
    SETLOGOUT: (state, logout) => {
        state.logout = logout;
    },
    SETISGROUPLOGIN: (state, isGroupLogin) => {
        localStorage.setItem("isGroupLogin", isGroupLogin);
        state.isGroupLogin = isGroupLogin;
    },
    SETUSERDETAILS: (state, userDetail) => {
        state.userDetail = JSON.parse(JSON.stringify(userDetail));
    },
    SETTENANTID: (state, tenantId) => {
        localStorage.setItem("TENANTID_NAME", tenantId);
        state.tenantId = tenantId;
    },
    SETTENANTName: (state, tenantName) => {
        state.tenantName = tenantName;
    },
    SETNOTICE: (state, notice) => {
        state.notice = notice;
    },
    SETTENANTCODE: (state, tenantCode) => {
        state.tenantCode = JSON.parse(JSON.stringify(tenantCode));
    }
};

const getters = {
    userInfo: state => state.userInfo,
    token: state => state.token,
    roles: state => state.userInfo?.roles,
    getProjectionMode: state => state.projectionMode,
    permissions: state => state.permissions,
    avatar: state => state.avatar,
    name: state => state.name,
    userRoles: state => state.userRoles,
    loginBack: state => state.loginBack,
    logout: state => state.logout,
    isGroupLogin: state => state.isGroupLogin,
    userDetail: state => state.userDetail,
    getIsMax: state => state.isMax,
    tenantId: state => state.tenantId,
    tenantName: state => state.tenantName,
    notice: state => state.notice,
    tenantCode: state => state.tenantCode
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
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    login({ commit, dispatch }, userInfo) {
        // 登录接口获取token
        let query = {};
        if (userInfo.srid) {
            query = { srid: userInfo.srid };
        }
        return new Promise((resolve, reject) => {
            dispatch("getCodeImg").then(res => {
                const { publicKey } = res.data.publicKey;
                const params = {
                    code: userInfo.code,
                    uuid: userInfo.uuid,
                    username: userInfo.username,
                    password: encryptlogin(userInfo.password, publicKey)
                };
                login(params, query).then(async res => {
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
                                Cookies.set("rememberMe", userInfo.rememberMe, { expires: 30 });
                            } else {
                                Cookies.remove("username");
                                Cookies.remove("password");
                                Cookies.remove("rememberMe");
                            }
                            // setToken(res.data.data.access_token)
                            commit("setToken", res.data.data.access_token);
                            //   commit('setToken', res.data.data.access_token)
                            //   setExpiresIn(res.data.data.expires_in)
                            //   commit('SET_EXPIRES_IN', res.data.data.expires_in)
                            if (res.data.data.tenant_role_key) {
                                await store.dispatch("permission/initRoutes", store.getters["user/roles"]);
                                dispatch("getUserInfo", "firstLogin", true);
                            } else {
                                message.error("该用户未分配租户，请联系管理员进行租户分配!");
                            }
                        }
                    } else {
                        message.error(res.data.msg);
                    }
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        });
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
        const { appId } = proxy[env];
        return new Promise((resolve, reject) => {
            getInfoByAppId(appId || "").then(res => {
                if (res.data.code === 200) {
                    if (res.data.pageConfigs !== null) {
                        Object.assign(STYLE_CONFIG, res.data.pageConfigs);
                        const theme = STYLE_CONFIG.mode;
                        store.commit("setting/update", STYLE_CONFIG);
                        store.commit("setting/changeChartColor", theme === "dark" ? DARK_CHART_COLORS : LIGHT_CHART_COLORS);
                        store.dispatch("setting/changeTheme", STYLE_CONFIG);
                    }
                    const firstMenu = res.data.firstMenu;
                    // 如果有菜单走菜单【菜单为本用户第一个可跳转的菜单】,没有则走404页面
                    const firstRoputer = firstMenu ? path.join(...handlerFirstMenuPath(firstMenu)) : "/pageInfo/error";
                    store.commit("permission/setDefaultTo", firstRoputer);
                    if (firstRoputer !== "/pageInfo/error") {
                        const route = {
                            path: firstRoputer,
                            routeIdx: 0,
                            title: firstMenu.meta.title,
                            isHome: true
                        };
                        store.commit("tabRouter/initHomeRoute", route);
                    }
                    const { user } = res.data;
                    // const avatar = user.avatar === "" ? require("@/assets/images/profile.jpg") : user.avatar;
                    const avatar = user?.avatar === "" ? "" : user?.avatar;
                    // 判断登录门户/后台管理系统
                    commit("SET_LOGINBACK", res.data?.loginBack);
                    commit("SETLOGOUT", res.data.user?.logout);
                    commit("SETUSERDETAILS", res.data);

                    commit("SETISGROUPLOGIN", false);
                    if (firstLogin === "firstLogin") {
                        if (proxy[env].appId === "$system$" || env === "development") {
                            router.push("/");
                        }
                    }
                    if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit("SET_ROLES", res.data.roles);
                        commit("SET_PERMISSIONS", res.data.permissions);
                    } else {
                        commit("SET_ROLES", ["ROLE_DEFAULT"]);
                    }
                    commit("SET_NAME", user.userName);
                    commit("SET_AVATAR", avatar);
                    commit("setUserInfo", {
                        ...user,
                        name: "td_dev",
                        roles: user.roles.length > 0 ? user.roles : ["ALL_ROUTERS"]
                    });
                    resolve(res);
                }
            }).catch(error => {
                reject(error);
            });
        });
    },
    async logout({ commit }) {
        await logout().then(() => {
            //   if(res?.data?.code === 200) {
            // 解决重新登录系统标签页未关闭的问题
            store.commit("tabRouter/removeTabRouterList");
            localStorage.removeItem("tabRouterList");
            commit("SETTENANTCODE", { value: "", state: false });
            // removeToken();
            commit("removeToken");
            // commit('setUserInfo', InitUserInfo);
            commit("setUserInfo", {
                roles: []
            });
        });
    },
    exchangeTenant({ commit }, info) {
        commit("SETTENANTID", info.tenantId);
        commit("SETTENANTName", info.tenantName);
        commit("setToken", info.token);
        window.location.reload();
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};