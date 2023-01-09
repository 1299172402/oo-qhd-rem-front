import { resetRouter, asyncRouterList } from '@/router';
import axios from '@/utils/request';
import Layout from '@/layouts/index.vue';
import ParentView from '@/layouts/blank.vue';
import router from '@/router/index';
// import GenerateRouter from '@/utils/routerMapping/routerPermission'; // 路由映射文件
import InnerLink from '@/pages/intelligentOilfield/iframePage/index.vue'

// function filterPermissionsRouters(routes, roles) {
//   const res = [];
//   routes.forEach((route) => {
//     let children = [];
//     route.children?.forEach((childRouter) => {
//       const roleCode = childRouter.meta?.roleCode || childRouter.name;
//       if (roles.indexOf(roleCode) !== -1) {
//         children.push(childRouter);
//       }
//       // 三级菜单角色权限
//       childRouter.children?.forEach((threeChild) => {
//         const threeChildRoleCode = threeChild.meta?.roleCode || threeChild.name;
//         if (roles.indexOf(threeChildRoleCode) !== -1) {
//           children.push(childRouter);
//           // 二级数组去重
//           children = children.filter(
//             (item, index, selfArr) => selfArr.findIndex((x) => x.path === item.path) === index,
//           );

//           childRouter.children?.forEach((sonChild) => {
//             const sonChildRoleCode = sonChild.meta?.roleCode || sonChild.name;
//             if (roles.indexOf(sonChildRoleCode) === -1) {
//               // 三级菜单检索
//               children.forEach((el, index3) => {
//                 el.children.forEach((element, index4) => {
//                   if (element.name === sonChild.name) {
//                     delete children[index3].children[index4];
//                   }
//                 });
//               });
//             }
//           });
//         }
//       });
//     });
//     if (children.length > 0) {
//       route.children = children;
//       res.push(route);
//     }
//   });
//   return res;
// }

// function filterChildren(childrenMap, lastRouter = false) {
//   let children = []
//   childrenMap.forEach((el) => {
//     if (el.children && el.children.length) {
//       if (el.component === 'ParentView' && !lastRouter) {
//         el.children.forEach(c => {
//           c.path = `${el.path}/${c.path}`
//           if (c.children && c.children.length) {
//             children = children.concat(filterChildren(c.children, c))
//             return
//           }
//           children.push(c)
//         })
//         return
//       }
//     }
//     // if (lastRouter) {
//     //   el.path = `${lastRouter.path}/${el.path}`
//     // }
//     children = children.concat(el)
//   })
//   return children
// }
const state = {
  whiteListRouters: ['/login'],
  routers: [],
  routerLink: '', // 增加路由链接
};
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, type = false) {
  return asyncRouterMap.filter(route => {
    // if (type && route.children) {
    //   route.children = filterChildren(route.children)
    // }

    // 批量引入@/utils/routerMapping下所有js文件
    const myFiles = import.meta.globEager(`../../utils/routerMapping/*.js`);
    let modules = {}
    Object.keys(myFiles).forEach(el => {
      modules={...modules, ...myFiles[el].default}
    });

    if (route.component) {
      //   Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } 
      else {
        route.component = modules[route.name]
        // route.component = GenerateRouter[route.name]
      }
      // 链接走这里
      if(route.meta.link) {
        route.component = InnerLink
        state.routerLink = route.meta?.link
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, type)
    } else {
      delete route.children
      delete route.redirect
    }
    return true
  })
}

const mutations = {
  setRouters: (state, routers) => {
    state.routers = routers;
  },
  setRouterLink: (state, routerLink) => {
    state.routerLink = routerLink;
  },
};

const getters = {
  routers: (state) => state.routers,
  whiteListRouters: (state) => state.whiteListRouters,
  routerLink: (state) => state.routerLink,
};
const actions = {
  async initRoutes({ commit }) {
    // let accessedRouters;
    // // special token
    // if (roles.includes('ALL_ROUTERS')) {
    //   // 最大角色权限：可看所有路由
    // accessedRouters = asyncRouterList;
    // } else {
    //   // 可见部分筛选路由
    //   accessedRouters = filterPermissionsRouters(asyncRouterList, roles);
    // }
    
    // commit('setRouters', asyncRouterList);
    await axios
      .get('system/menu/getRouters').then(res => {
        if (res.data.code === 200) {
          const sidebarRoutes = filterAsyncRouter(res.data.data)

          console.log('获取菜单路由 ===', sidebarRoutes)
          // single:true代表只有一级路由；分割菜单的时候需要redirect到菜单默认项
          const mapList = sidebarRoutes.map(item => ({
            ...item,
            meta: {
              ...item.meta,
              single: item.children ? (item.children[0].meta.title === item.meta.title) : false
            },
            redirect: item.children ? `${item.path  }/${  item.children[0].path}` : 'noRedirect'
          }))
          // 本地路由+动态路由整合
          const concatRouters = asyncRouterList.concat(mapList)
          commit('setRouters', concatRouters);
          console.log('整合路由结果======', concatRouters);

          router.addRoutes(concatRouters);
        }
      }).catch(error => {
        console.log(error);
      })
  },
  async restore({ commit }) {
    // remove routers
    resetRouter();
    commit('setRouters', []);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
