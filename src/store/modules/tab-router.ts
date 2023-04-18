export type TRouterInfo = {
  path: string;
  routeIdx: number;
  title: string;
  name?: string;
  isAlive?: boolean;
  isHome?: boolean;
  query?: any
};

export type TTabRouterType = {
  isRefreshing: boolean;
  tabRouterList: Array<TRouterInfo>;
  homeRoute: Array<TRouterInfo>;
};

const state: TTabRouterType = {
  tabRouterList: [],
  isRefreshing: false,
  homeRoute: []
};

// 不需要做多标签tabs页缓存的列表 值为每个页面对应的name 如 DashboardDetail
// const ignoreCacheRoutes = ['DashboardDetail'];
const ignoreCacheRoutes = ['wellMonitoring'];

const mutations = {
  // 处理刷新
  toggleTabRouterAlive(state: TTabRouterType, routeIdx: number) {
    state.isRefreshing = !state.isRefreshing;
    state.tabRouterList[routeIdx].isAlive = !state.tabRouterList[routeIdx].isAlive;
  },
  // 处理新增
  appendTabRouterList(state: TTabRouterType, newRoute: TRouterInfo) {
    const needAlive = !ignoreCacheRoutes.includes(newRoute.name);
    if (!state.tabRouterList.find((route: TRouterInfo) => route.path === newRoute.path)) { state.tabRouterList = state.tabRouterList.concat({ ...newRoute, isAlive: needAlive }); }
  },
  // 处理关闭当前
  subtractCurrentTabRouter(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = state.tabRouterList.slice(0, routeIdx).concat(state.tabRouterList.slice(routeIdx + 1));
  },
  // 处理关闭右侧
  subtractTabRouterBehind(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = state.tabRouterList.slice(0, routeIdx + 1);
  },
  // 处理关闭左侧
  subtractTabRouterAhead(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = state.homeRoute.concat(state.tabRouterList.slice(routeIdx));
  },
  // 处理关闭其他
  subtractTabRouterOther(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    // 解决右键home图标关闭其他标签出现多个home图标
    if (state.homeRoute[0].path !== state.tabRouterList?.[routeIdx].path) {
      state.tabRouterList = state.homeRoute.concat([state.tabRouterList?.[routeIdx]]);
    } else {
      state.tabRouterList = state.homeRoute;
    }
  },
  // 只显示默认路由
  removeTabRouterList() {
    state.tabRouterList = state.homeRoute;
  },
  initTabRouterList(state: TTabRouterType, newRoute: TRouterInfo[]) {
    state.tabRouterList = newRoute;
  },
  initHomeRoute(state: TTabRouterType, route: TRouterInfo) {
    state.homeRoute[0] = route;
  }
};

const getters = {
  tabRouterList: (state: TTabRouterType) => state.tabRouterList,
  isRefreshing: (state: TTabRouterType) => state.isRefreshing
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};