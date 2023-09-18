// 存放不同环境相同配置
const config = {
  // / 时默认跳转的路由
  // DEFAULT_TO: "/index",
  PROCESS_TENANT_TYPE: "tenant",
  // rsa公钥
  PROCESS_PULBIC_KEY: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKsr9kM6vJHJb8KgWhY6xVaYCkLEr+QKeuYUoZ2uX3+t4lzbxdf1JeJ2jUs26jWWgkpe3W1UHxXUaapyTG9sFbECAwEAAQ==",
  LOGIN_TYPES: ["password", "corp_oauth"],
  // 右上角报警点击“查看跳转”路径
  MESSAGE_URL: "https://amm.tjioms-dev.tjltd.cnooc/#/appCallback?rediect=reportlnformation/source",
  appId: "$system$",
  ALARM_URL: "https://amm.tjioms-dev.tjltd.cnooc/#/reportPolice/source?access_token=",
  WEB_TAG_NAME: "智能油田管理系统", // 网页标签名称
  SYSTEM_NAME: "天津分公司智能油田管理系统", // 系统名称
  IS_TEST_ENVIRONMENT: false
};

export default {
  development: {
    ...config,
    // TODO: Maybe change back
    // 通用模块-报警中心
    // GEM_API: "/gem001b",
    // 文件预览服务
    PREVIEW_FILE_API: "/b/upload",
    // 流程平台
    processAPI: "/dev-api/workflow",
    // 开发环境接口请求
    API: "/dev-api",
    // API: '',
    // 开发环境 cdn 路径
    CDN: ""
  },
  test: {
    ...config,
    // 通用模块-报警中心
    // TODO: Maybe change back
    // GEM_API: "/gem001b",
    // 流程平台
    // 文件预览服务
    PREVIEW_FILE_API: "文件服务地址",
    // 测试环境接口地址
    API: "",
    // 测试环境 cdn 路径
    CDN: ""
  },
  stage: {
    ...config,
    processAPI: "",
    // 正式环境接口地址
    API: "",
    // 正式环境 cdn 路径
    CDN: ""
  },
  release: {
    ...config,
    // 通用模块-报警中心
    // TODO: Maybe change back
    // GEM_API: "/gem001b",
    // 流程平台
    processAPI: "/prod-api/workflow",
    // 文件预览服务
    PREVIEW_FILE_API: "文件服务地址",
    // 正式环境接口地址
    API: "http://10.77.78.250:80/prod-api/",
    // 正式环境 cdn 路径
    CDN: "",
    LOGIN_TYPES: ["corp_oauth", "password"]
  }
};