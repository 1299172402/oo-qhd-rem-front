define([    'WGAD/Scripts/WGADPlatGMEngine',
    'WGAD/Scripts/WGADPlatGMEngineTools',
    'WGAD/Scripts/WGADPlatGraph2D',
    'WGAD/Scripts/WGADPlatGraph2DFrame',
    'WGAD/Scripts/WGADPlatSystemTools'
], function(WGADPlatGMEngine,WGADPlatGMEngineTools,WGADPlatGraph2D,WGADPlatGraph2DFrame,WGADPlatSystemTools) {
    var ComMapOperationFunc = {};
    ComMapOperationFunc.commonJs = function (view) {
        this.View = view;
        this.GetOnlyEditLayer = function (mapView) {
            var onlyEditLayerID = "";
            var onlyEditLayer = null;

            if (onlyEditLayerID != "") {
                onlyEditLayer = GFrameMapOperationFunc.GetSomeIDLayer(mapView.MapData, onlyEditLayerID);
            }


            return onlyEditLayer;
        }
    }

    return ComMapOperationFunc;
});