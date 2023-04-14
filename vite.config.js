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
        "@": path.resolve(__dirname, "./src")
      }
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {}
        },
        scss: {
          charset: false
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: atRule => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },

    plugins: [
      createVuePlugin({
        jsx: true
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: true
      }),
      createSvgPlugin(),
      // svg 图标
      createSvgIconsPlugin({
        iconDirs: [path.resolve(CWD, "src/assets/icons/svg")], // svg存放路径
        symbolId: "icon-[dir]-[name]"
      })
    ],

    build: {
      cssCodeSplit: false
    },

    server: {
      host: "0.0.0.0",
      port: 8080,
      open: true,
      proxy: {
        "/dev-api": {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          // target: 'http://114.116.211.6:8080', // 旧地址
          target: "http://114.115.233.247:38085/prod-api", //
          // target: "http://10.77.79.57:8080", // 新地址
          // target: "https://tjioms-dev.tjltd.cnooc", // 新地址
          // target: "https://3196n899m4.zicp.fun", // zhangbin地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dev-api/, "")
        }
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
      }
    }
  };
};