import { loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import { createVuePlugin } from "vite-plugin-vue2";
import { createSvgPlugin } from "vite-plugin-vue2-svg";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

const CWD = process.cwd();

export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src"),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
        },
        scss: {
          charset: false,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },

    plugins: [
      createVuePlugin({
        jsx: true,
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: true,
      }),
      createSvgPlugin(),
      // svg 图标
      createSvgIconsPlugin({
        iconDirs: [path.resolve(CWD, "src/assets/icons/svg")], // svg存放路径
        symbolId: "icon-[dir]-[name]",
      }),
    ],

    build: {
      cssCodeSplit: false,
    },

    server: {
      host: "0.0.0.0",
      port: 8080,
      open: true,
      proxy: {
        "/dev-api/rem/api": {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          // target: 'http://10.247.187.28:8080/dev-api/',
          // target: 'http://10.178.118.181:9220',
          target: 'http://localhost:8081',
          // target: "http://10.77.78.250:9213",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api\/rem\/api/, "/rem/api"),
        },
        "/dev-api/ipm/api": {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          // target: 'http://10.247.187.28:8080/dev-api/',
          // target: 'http://10.178.118.181:9220',
          target: 'http://192.168.2.242:22033',
          // target: "http://10.77.78.250:9213",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api\/ipm\/api/, "/"),
        },
        // "/dev-api/masterService/api": {
        //   // 主服务转发请求
        //   // 接口网关地址：http://10.77.79.57:8080
        //   // 接口微服务地址：http://10.77.78.243:8003
        //   // 接口微服务名称：oo-csc-csc-masterdata-atom
        //   target: "http://10.77.79.57:8080",
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/dev-api\/masterService\/api/, "/omc003d"),
        // },
        "/dev-api": {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          // target: 'http://10.77.79.57:8080/dev-api/',
          target: "http://10.77.78.250",
          // target: "http://192.168.1.20:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, "/prod-api"),
          // rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
        // "/GEM_API": {
        //   // 用于开发环境下的转发请求
        //   // 更多请参考：https://vitejs.dev/config/#server-proxy
        //   // target: 'http://114.116.211.6:8080', // 旧地址
        //   target: "http://114.116.211.6:8080", // 新地址
        //   // target: 'http://aselinceaa.natapp1.cc', // zhangbin地址
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/GEM_API/, "")
        // }
        // 流程平台地址-有可供测试的流程平台时放开
        // '/biz/flow': {
        //   // 用于开发环境下的转发请求
        //   // 更多请参考：https://vitejs.dev/config/#server-proxy
        //   target: '',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/biz\/flow/, ''),
        // },
        // 文件服务地址-有可供测试的文件服务时放开
        // '/b/upload': {
        //   // 用于开发环境下的转发请求
        //   // 更多请参考：https://vitejs.dev/config/#server-proxy
        //   target: '',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/b\/upload/, ''),
        // },
      },
    },
  };
};
