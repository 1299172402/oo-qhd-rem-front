export default {
  development: {
    // 流程平台
    BIZ_FLOW_API: "/biz/flow",
    // 文件预览服务
    PREVIEW_FILE_API: "/b/upload",
    // 开发环境接口请求
    API: 'dev-api',
    // API: '',
    // 开发环境 cdn 路径
    CDN: '',
    
  },
  test: {
    // 流程平台
    BIZ_FLOW_API: "/biz/flow",
    // 文件预览服务
    PREVIEW_FILE_API: "文件服务地址",
    // 测试环境接口地址
    API: '',
    // 测试环境 cdn 路径
    CDN: '',
  },
  release: {
    // 流程平台
    BIZ_FLOW_API: "/b/sw",
    // 文件预览服务
    PREVIEW_FILE_API: "文件服务地址",
    // 正式环境接口地址
    API: 'http://10.77.79.177:31995/prod-api/',
    // 正式环境 cdn 路径
    CDN: '',
  },
};
