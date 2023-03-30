/**
 * Created by 123 on 2016/12/1.
 */

define([], function () {
    var conf = {};

    conf.static_root = '../';  //组件库使用的静态资源总路径

    conf.cssPath = conf.static_root + "css/";
    conf.cursorPath = conf.static_root + "Cursor/";
    conf.dataPath = "data/";
    conf.imagesPath = conf.static_root + "images/";
    conf.symbolDataPath = "../data/SymbolData/";
    conf.scriptsPath = "Scripts/";
    conf.targetPic = "log.jpg";
    conf.symCount = 0;
    conf.jqueryPath = "jquery/";
    conf.comPath = "Com/";
    conf.testView = null;
    conf.configPath = conf.static_root + 'Config/';
    conf.propertyDataPath=conf.static_root + 'Scripts/WGADPlatConfig/PropertyData.json';
    conf.rockColorPath = conf.static_root +"data/SymbolData/RockColor.json";
    conf.rockTextUrlPath = conf.static_root +"data/SymbolData/ObjSelectConfig.json";

    conf.module_ref = {
        "WGADPlatGraph2D": "WGAD/Scripts/WGADPlatGraph2D",
        "WGADPlatGraph2DFlowChart": "WGAD/Scripts/WGADPlatGraph2DFlowChart",
        "WGADPlatGMEngine": "WGAD/Scripts/WGADPlatGMEngine",
        "WGADPlatGraph2DLog": "WGAD/Scripts/WGADPlatGraph2DLog",
        "WGADPlatGraph2DFrame": "WGAD/Scripts/WGADPlatGraph2DFrame",
        "WGADPlatSystemTools": "WGAD/Scripts/WGADPlatSystemTools"
    };

    // TODO bring to top
    // 整个组件初始化并配置
    conf.Conf = function (param) {
        //param.static_root
        if (typeof param == 'undefined') {
            console.log("组件初始化，无参数");
            return;
        }
        conf.static_root = param.static_root || '';
        console.log("组件初始化，static_root=", conf.static_root)
    };

    return conf;
});
