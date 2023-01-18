export default {
  development: {
    // 开发环境接口请求
    API: 'dev-api',
    // API: '',
    // 开发环境 cdn 路径
    CDN: '',
  },
  test: {
    // 测试环境接口地址
    API: '',
    // 测试环境 cdn 路径
    CDN: '',
  },
  release: {
    // 正式环境接口地址
    API: 'http://10.247.207.41:8081/prod-api/',
    // 正式环境 cdn 路径
    CDN: '',
  },
};
