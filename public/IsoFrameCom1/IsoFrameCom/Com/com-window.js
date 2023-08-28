define(['WGAD/Scripts/WGADPlatConfig/WGADPlatConfig',
    'WGAD/Scripts/WGADPlatGMEngine',
    'WGAD/Scripts/WGADPlatGMEngineTools',
    'WGAD/Scripts/WGADPlatGraph2D',
    'WGAD/Scripts/WGADPlatGraph2DFrame',
    'WGAD/Scripts/WGADPlatSystemTools'
], function(WGADPlatConfig, WGADPlatGMEngine, WGADPlatGMEngineTools,WGADPlatGraph2D, WGADPlatGraph2DFrame,WGADPlatSystemTools) {
    var windowJs = {};
    windowJs.windowJs = function (fView) {
        this.View=fView.View;


    }

    return windowJs;
});