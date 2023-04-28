import Layout from "@/layouts/index.vue";
const env = import.meta.env.MODE;
export default [
    {
        hidden: env == "development" ? false : true,
        path: "/recoveryEfficiency",
        name:'recoveryEfficiency',
        component: Layout,
        redirect:'/recoveryEfficiency/index',
        meta: { title: "采收率及可采储量预测", icon: "client", single: true },
        children: [
            {
                path: "index",
                name: "index",
                component: () => import("@/pages/rem/recoveryEfficiency/index.vue"),
                meta: { title: "采收率及可采储量预测"},
            },
        ],
    },
];
