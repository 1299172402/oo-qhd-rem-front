/*
 * @Description:
 * @User: ggg
 * @Date: 2021-01-21 16:16:14
 */
module.exports = {
    apiFilePath: "../src/api/rem",
    modelFilePath: "models",
    apiFileType: "js",
    templatePath: "template",
    modules: [
        {
            name: "",
            // 0代表读取json文件，1代表从url中读取json
            generatorType: 1,
            // generatorSource: "./json/temp.json",
            // generatorSource: "http://10.137.207.31:8104/v2/api-docs",
            // generatorSource: "http://10.137.206.14:17072/v2/api-docs",
            generatorSource: "http://10.178.118.203:9229/v2/api-docs",
            //
            // 过滤字段为黑名单模式，判断方法较为简单，暂不支持正则匹配，不能为空字符串，否则都会过滤掉
            filterWords: [" "],
            baseUrl:'/rem/api',//正式环境api
            devBaseUrl:'/rem/api',//测试环境api
        },
    ],
};
