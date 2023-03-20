import NormalCard from "./NormalCard/index.vue";
import Echarts from "./Echarts/index.vue";

export default {
  install(Vue) {
    Vue.component("NormalCard", NormalCard);
    Vue.component("Echarts", Echarts);
  },
};
