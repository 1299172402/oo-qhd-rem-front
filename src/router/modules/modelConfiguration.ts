import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
  {
    hidden: env == "development" ? false : true,
    path: "/modelConfiguration",
    name: "modelConfiguration",
    component: Layout,
    meta: { title: "模型配置", icon: "client", single: false },
    children: [
      {
        path: "modelconfig",
        name: "modelconfig",
        meta: { title: "模型配置列表" },
        component: () => import("@/pages/rem/modelConfiguration/modelconfig.vue"),
      },
    ],
  },
];
