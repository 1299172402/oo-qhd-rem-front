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
      cssCodeSplit: false,
      minify: "terser",
      terserOptions: {
        format: {
          comments: false // 禁用注释
        }
      }
    },

    server: {
      host: "0.0.0.0",
      port: 8080,
      open: true,
      proxy: {
        "/dev-api": {
          // 用于开发环境下的转发请求
          // target: "http://192.168.1.18:38085/prod-api", // 测试环境地址
          // target: "http://10.8.8.158:8080", // 后端联调地址
          target: "http://10.77.79.57:8080", // 内网测试地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dev-api/, "")
        }
      }
    }
  };
};
