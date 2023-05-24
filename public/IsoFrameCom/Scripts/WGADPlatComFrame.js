/**
 * Created by LMP on 2017/5/8.
 */
define([
    "WGAD/Scripts/WGADPlatConfig/WGADPlatConfig",
    "WGAD/Scripts/WGADPlatGMEngine",
    "WGAD/Scripts/WGADPlatGMEngineTools",
    "WGAD/Scripts/WGADPlatGraph2D",
    "WGAD/Scripts/WGADPlatGraph2DFrame",
    "WGAD/Scripts/WGADPlatSystemTools"
], function (
    WGADPlatConfig,
    WGADPlatGMEngine,
    WGADPlatGMEngineTools,
    WGADPlatGraph2D,
    WGADPlatGraph2DFrame,
    WGADPlatSystemTools
) {
    var Com = {};

    Com.WGADPlatComFrame = function (viewSetting, contentWindow) {
        this.lineSymbolData = [];
        var comSelf = this;
        this.PropertyPanel = new WGADPlatSystemTools.WGPropteryPanel();

        this.LayerList = new WGADPlatSystemTools.WGLayerList();
        this.OperationMode = 0; //0 原始状态  1 切线状态  2 主动交互状态 3 被动交互状态
        this.View = new WGADPlatGraph2DFrame.WGFrameView(viewSetting);
        //初始化map
        this.View.MapData = new WGADPlatGraph2DFrame.WGFrameMap({});
        this.View.MapData.SetEarthArea(20574320, 4145751.0, 20580200, 4139278.0);
        this.View.MapData.SetMapToEarthScale(10000, 10000);
        this.View.MapData.SetPageMargin(10, 10, 10, 0);
        this.View.MapData.ViewScale = 1.0;
        this.View.MapData.SelectSignSize = 2;
        this.View.MapData.IsCenterShowX = true;
        this.View.MapData.IsCenterShowY = true;
        this.View.MapData.UpdateTransform();
        this.OuntEarthBound = new WGADPlatGMEngine.WGRect();
        var xmin = 1000000000,
            ymin = 1000000000,
            xmax = 0,
            ymax = 0;
        this.SelectedObj = null;
        this.View.MapData.ViewScaleMinValue = 0.5;
        this.View.MapData.ViewScaleMaxValue = 10.0;
        //报警颜色列表，默认10种
        this.WarningColorLst = [
            { "A": 255, "R": 0, "G": 125, "B": 255 },
            { "A": 255, "R": 255, "G": 125, "B": 0 },
            { "A": 255, "R": 0, "G": 255, "B": 0 },
            { "A": 255, "R": 255, "G": 0, "B": 255 },
            { "A": 255, "R": 0, "G": 255, "B": 255 },
            { "A": 255, "R": 255, "G": 0, "B": 0 },
            { "A": 255, "R": 255, "G": 255, "B": 0 },
            { "A": 255, "R": 0, "G": 125, "B": 0 },
            { "A": 255, "R": 255, "G": 225, "B": 255 },
            { "A": 255, "R": 125, "G": 0, "B": 255 }
        ];
        //预警半径大小
        this.WarningWellSize = 6;
        //true,井环不固定大小，随着比例尺变化而变化;
        //false井环不固定大小，设置最大和最小比例；当最大最小都是1时相当于固定大小
        this.WarningWellSizeFixed = true;
        this.WarningWellSizeFixedMinScale = 1;
        this.WarningWellSizeFixedMaxScale = 1;
        var symbolData = {};
        this.rangeSegY = null;
        this.SelectSeismicLine = null;
        $(document).bind("contextmenu", function (e) {
            return false;
        });
        //获取属性窗体要绑定的数据
        $.ajax({
            url: WGADPlatConfig.propertyDataPath,
            dataType: "json",
            contentType: "utf-8",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    WGADPlatSystemTools.PropertyDataList.put(data[i].key, data[i].value);
                }
            }
        });
        this.EventMidWinOk = function (e) {};
        //底图和线 data：数据，支持底图加线，或者只底图或者只线；zoom：全图，不赋值时默认全图；deleteObj：删除图中已有图元，不赋值时默认不删除
        this.RefreshData = function (data, zoom, deleteObj) {
            if (data) {
                this.View.RUManager.RecordCommond = false;
                if (deleteObj) {
                    //清除图层上图元
                    this.ClearView();
                }
                //接收数据成图
                this.SetFrameData(data);
                if (zoom == undefined || zoom) {
                    //全图
                    this.ZoomPicture();
                }
                this.View.MapData.SetChanged(true);
                this.View.Repaint();
                this.View.RUManager.RecordCommond = true;
            }
        };
        this.AddBaseMap = function (data) {
            if (
                data.PicMinXMap != undefined &&
                data.PicMaxXMap != undefined &&
                data.PicMaxYMap != undefined &&
                data.PicMinYMap != undefined
            ) {
                this.View.MapData.PicEarthLeft = data.PicMinXMap;
                this.View.MapData.PicEarthRight = data.PicMaxXMap;
                this.View.MapData.PicEarthTop = data.PicMaxYMap;
                this.View.MapData.PicEarthBottom = data.PicMinYMap;
            }
            if (data.PicturePath) {
                this.View.MapData.PicturePath = data.PicturePath;
            }
            if (data.PictureBase64) {
                this.View.MapData.PicturePathOld = "";
                this.View.MapData.PicturePath = "";
                this.View.MapData.IsLoad = true;
                this.View.MapData.Image.src = data.PictureBase64;
            }
            if (data.IsShowPicture != undefined) {
                this.View.MapData.IsShowPicture = data.IsShowPicture;
            }
            this.View.MapData.UpdateTransform();
            this.View.MapData.SetChanged(true);
            this.View.Repaint();
        };

        this.ShowBaseMap = function (show) {
            this.View.MapData.IsShowPicture = show;
            this.View.MapData.UpdateTransform();
            this.View.MapData.SetChanged(true);
            this.View.Repaint();
        };
        //增加新数据到图中(data:数据,activeOne:处于编辑激活状态的图层最多只有一个)
        //新图层为激活编辑时,activeOne=true时已经存在的图层都设置为非激活编辑状态;false或者不赋值时不处理
        //新图层为非激活编辑时,activeOne是true和false均不处理
        this.SetFrameData = function (data, activeOne) {
            if (
                data.MinXMap != undefined &&
                data.MaxYMap != undefined &&
                data.MaxXMap != undefined &&
                data.MinYMap != undefined
            ) {
                this.View.MapData.SetEarthArea(data.MinXMap, data.MaxYMap, data.MaxXMap, data.MinYMap);
                this.View.MapData.SetMapToEarthScale(10000, 10000);
                this.View.MapData.SetPageMargin(0, 0, 0, 0);
                //this.View.MapData.ViewScale = 1.0;
                this.View.ScrollView(this.View.HScrollValue, this.View.VScrollValue);
                this.View.MapData.IsCenterShowX = true;
                this.View.MapData.IsCenterShowY = true;
            }
            if (
                data.PicMinXMap != undefined &&
                data.PicMaxXMap != undefined &&
                data.PicMaxYMap != undefined &&
                data.PicMinYMap != undefined
            ) {
                this.View.MapData.PicEarthLeft = data.PicMinXMap;
                this.View.MapData.PicEarthRight = data.PicMaxXMap;
                this.View.MapData.PicEarthTop = data.PicMaxYMap;
                this.View.MapData.PicEarthBottom = data.PicMinYMap;
            }
            if (data.PicturePath) {
                this.View.MapData.PicturePath = data.PicturePath;
            }
            if (data.PictureBase64) {
                this.View.MapData.PicturePathOld = "";
                this.View.MapData.PicturePath = "";
                this.View.MapData.IsLoad = true;
                this.View.MapData.Image.src = data.PictureBase64;
            }
            if (data.IsShowPicture != undefined) {
                this.View.MapData.IsShowPicture = data.IsShowPicture;
            }

            this.View.MapData.UpdateTransform();
            this.View.Repaint();
            if (data.Layers) {
                data.Layers.sort(layersort);
                var wellTemplate = null;
                if (data.Template) {
                    wellTemplate = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonObjReturnObject(data.Template);
                }
                for (var i = 0; i < data.Layers.length; i++) {
                    //判断是否已经存在同名图层，有同名的就不再新建
                    var layer = this.View.MapData.GetLayerByName(data.Layers[i].LayerName);
                    if (!layer) {
                        layer = new WGADPlatGraph2DFrame.WGFrameLayer({});
                        layer.LayerName = data.Layers[i].LayerName;
                        layer.LayerType = data.Layers[i].LayerType;
                        layer.Actived = data.Layers[i].Active;
                        this.View.MapData.AddLayer(layer);
                        layer.LayerIndex = data.Layers[i].LayerIndex;
                        if (data.Layers[i].Display != undefined) {
                            layer.Display = data.Layers[i].Display;
                            layer.Hidden = !layer.Display;
                        }
                    } else {
                        layer.Actived = data.Layers[i].Active;
                        if (data.Layers[i].Display != undefined) {
                            layer.Display = data.Layers[i].Display;
                            layer.Hidden = !layer.Display;
                        }
                        //根据图层中的属性是否删除已有图元，来删除图层中原有的图元；属性没有则默认不删除
                        if (data.Layers[i].ClearLayer) {
                            //删除图层上面的图元
                            layer.RemoveAllChildrens();
                        }
                    }
                    //处理图层的编辑状态
                    if (activeOne && layer.Actived) {
                        this.View.MapData.SetActivateLayer(layer, layer.Actived);
                    }
                    if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWellLog) {
                        var curvePropertyDic = {};
                        var noCurvePropertyDic = {};
                        var tubePropertyDic = {};
                        var layerData = data.Layers[i];
                        //获取颜色信息
                        if (layerData.CurveInfo && layerData.CurveInfo.length > 0) {
                            //信息存在，根据name获取曲线的颜色等属性
                            for (var index = 0; index < layerData.CurveInfo.length; index++) {
                                var colorInfo = layerData.CurveInfo[index];
                                if (colorInfo.CurveName) {
                                    var property = {};
                                    if (colorInfo.ViewPen) {
                                        //画笔
                                        var viewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                            colorInfo.ViewPen
                                        );
                                        property.ViewPen = viewPen;
                                    }
                                    if (colorInfo.ViewBrush) {
                                        var viewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                                            colorInfo,
                                            "ViewBrush"
                                        );
                                        property.ViewBrush = viewBrush;
                                    }
                                    if (colorInfo.Width != undefined) {
                                        property.Width = colorInfo.Width;
                                    }
                                    if (colorInfo.Height != undefined) {
                                        property.Height = colorInfo.Height;
                                    }
                                    if (colorInfo.TextFont) {
                                        var font = {};
                                        if (colorInfo.TextFont.FontName) {
                                            font.FontName = colorInfo.TextFont.FontName;
                                        }
                                        if (colorInfo.TextFont.FontSize) {
                                            font.FontSize = colorInfo.TextFont.FontSize;
                                        }
                                        if (colorInfo.TextFont.Color) {
                                            var fColor = colorInfo.TextFont.Color;
                                            font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                                fColor[0],
                                                fColor[1],
                                                fColor[2],
                                                fColor[3]
                                            );
                                        }
                                        property.TextFont = font;
                                    }
                                    if (colorInfo.ValueFont) {
                                        var font = {};
                                        if (colorInfo.ValueFont.FontName) {
                                            font.FontName = colorInfo.ValueFont.FontName;
                                        }
                                        if (colorInfo.ValueFont.FontSize) {
                                            font.FontSize = colorInfo.ValueFont.FontSize;
                                        }
                                        if (colorInfo.ValueFont.Color) {
                                            var fColor = colorInfo.ValueFont.Color;
                                            font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                                fColor[0],
                                                fColor[1],
                                                fColor[2],
                                                fColor[3]
                                            );
                                        }
                                        property.ValueFont = font;
                                    }
                                    if (colorInfo.IsShowName != undefined) {
                                        property.IsShowName = colorInfo.IsShowName;
                                    }
                                    if (colorInfo.IntervalNum != undefined) {
                                        property.IntervalNum = colorInfo.IntervalNum;
                                    }
                                    if (colorInfo.IsFillByLine != undefined) {
                                        property.IsFillByLine = colorInfo.IsFillByLine;
                                    }
                                    if (colorInfo.IsFillLeft != undefined) {
                                        property.IsFillLeft = colorInfo.IsFillLeft;
                                    }
                                    if (colorInfo.IsFillRight != undefined) {
                                        property.IsFillRight = colorInfo.IsFillRight;
                                    }
                                    curvePropertyDic[colorInfo.CurveName] = property;
                                }
                            }
                        }
                        //获取非曲线道的信息
                        if (layerData.NoCurveInfo && layerData.NoCurveInfo.length > 0) {
                            //信息存在
                            for (var index = 0; index < layerData.NoCurveInfo.length; index++) {
                                var info = layerData.NoCurveInfo[index];
                                if (info.type) {
                                    //同类型，例如文字道，再根据code来区分多个文字道
                                    var code = "";
                                    if (info.Code) {
                                        code = info.Code;
                                    }
                                    var property = {};
                                    if (info.IsShowName != undefined) {
                                        property.IsShowName = info.IsShowName;
                                    }
                                    if (info.IntervalNum != undefined) {
                                        property.IntervalNum = info.IntervalNum;
                                    }
                                    if (info.Width != undefined) {
                                        property.Width = info.Width;
                                    }
                                    if (info.Height != undefined) {
                                        property.Height = info.Height;
                                    }
                                    noCurvePropertyDic[info.type + code] = property;
                                }
                            }
                        }
                        //获取颜色信息
                        if (layerData.TubeInfo) {
                            //信息存在，根据name获取曲线的颜色等属性
                            if (layerData.TubeInfo.ViewPen) {
                                //画笔
                                tubePropertyDic.ViewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                    layerData.TubeInfo.ViewPen
                                );
                            }
                            if (layerData.TubeInfo.TextFont) {
                                var font = {};
                                if (layerData.TubeInfo.TextFont.FontName) {
                                    font.FontName = layerData.TubeInfo.TextFont.FontName;
                                }
                                if (layerData.TubeInfo.TextFont.FontSize) {
                                    font.FontSize = layerData.TubeInfo.TextFont.FontSize;
                                }
                                if (layerData.TubeInfo.TextFont.Color) {
                                    var fColor = layerData.TubeInfo.TextFont.Color;
                                    font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                        fColor[0],
                                        fColor[1],
                                        fColor[2],
                                        fColor[3]
                                    );
                                }
                                tubePropertyDic.TextFont = font;
                            }
                            if (layerData.TubeInfo.Width != undefined) {
                                tubePropertyDic.Width = layerData.TubeInfo.Width;
                            }
                            if (layerData.TubeInfo.IsDrawBottomLine != undefined) {
                                tubePropertyDic.IsDrawBottomLine = layerData.TubeInfo.IsDrawBottomLine;
                            }
                            if (layerData.TubeInfo.IsDrawDirectLine != undefined) {
                                tubePropertyDic.IsDrawDirectLine = layerData.TubeInfo.IsDrawDirectLine;
                            }
                            if (layerData.TubeInfo.ShowLineLength != undefined) {
                                tubePropertyDic.ShowLineLength = layerData.TubeInfo.ShowLineLength;
                            }
                            if (layerData.TubeInfo.CurveValueShowType != undefined) {
                                tubePropertyDic.CurveValueShowType = layerData.TubeInfo.CurveValueShowType;
                            }
                            if (layerData.TubeInfo.IsShowWellName != undefined) {
                                tubePropertyDic.IsShowWellName = layerData.TubeInfo.IsShowWellName;
                            }
                        }
                    } else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                        var wellDotPenDic = {};
                        var wellDotBrushDic = {};
                        var wellSizeDic = {};
                        var wellDrawSymbolDic = {};
                        var wellSymbolNameDic = {};
                        var wellLabelDic = {};
                        //获取井圈信息
                        if (data.Layers[i].WellDotInfo && data.Layers[i].WellDotInfo.length > 0) {
                            //井点信息存在，根据code获取井圈的颜色等属性
                            for (var index = 0; index < data.Layers[i].WellDotInfo.length; index++) {
                                var wellDotInfo = data.Layers[i].WellDotInfo[index];
                                if (wellDotInfo.ViewPen && wellDotInfo.WellDotTypeCode != undefined) {
                                    //画笔
                                    var viewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                        wellDotInfo.ViewPen
                                    );
                                    wellDotPenDic[wellDotInfo.WellDotTypeCode] = viewPen;
                                }
                                if (wellDotInfo.ViewBrush && wellDotInfo.WellDotTypeCode != undefined) {
                                    var ViewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                                        wellDotInfo,
                                        "ViewBrush"
                                    );
                                    wellDotBrushDic[wellDotInfo.WellDotTypeCode] = ViewBrush;
                                }
                                if (wellDotInfo.WellSize && wellDotInfo.WellDotTypeCode != undefined) {
                                    wellSizeDic[wellDotInfo.WellDotTypeCode] = wellDotInfo.WellSize;
                                }
                                if (wellDotInfo.IsDrawSymbol && wellDotInfo.WellDotTypeCode != undefined) {
                                    wellDrawSymbolDic[wellDotInfo.WellDotTypeCode] = wellDotInfo.IsDrawSymbol;
                                }
                                if (wellDotInfo.SymbolName && wellDotInfo.WellDotTypeCode != undefined) {
                                    wellSymbolNameDic[wellDotInfo.WellDotTypeCode] = wellDotInfo.SymbolName;
                                }
                                if (wellDotInfo.Label && wellDotInfo.Label.length > 0 && wellDotInfo.WellDotTypeCode != undefined) {
                                    //分别读取viewpen brush 和font
                                    var labelDics = [];
                                    for (var labelIndex = 0; labelIndex < wellDotInfo.Label.length; labelIndex++){
                                        var labelDic = {};
                                        var label = wellDotInfo.Label[labelIndex];
                                        if (labelIndex >= wellTemplate.Childrens.length) {
                                            break;
                                        }
                                        if (label.ViewPen) {
                                            var viewPen = label.ViewPen;
                                            labelDic["ViewPen"] = wellTemplate.Childrens[labelIndex].ViewPen.Clone();
                                            if (viewPen.PenWidth > 0) {
                                                labelDic["ViewPen"].PenWidth = viewPen.PenWidth;
                                            }
                                            if (viewPen.PenColorA != undefined && viewPen.PenColorR != undefined
                                                && viewPen.PenColorG != undefined && viewPen.PenColorB != undefined) {
                                                labelDic["ViewPen"].PenColor = WGADPlatGMEngine.WGColor.FromARGB(viewPen.PenColorA,viewPen.PenColorR, viewPen.PenColorG, viewPen.PenColorB);
                                            }
                                            if (viewPen.PenDashStyle != undefined) {
                                                labelDic["ViewPen"].PenDashStyle = viewPen.PenDashStyle;
                                            }
                                        }
                                        if (label.ViewBrush) {
                                            var viewBrush = label.ViewBrush;
                                            labelDic["ViewBrush"] = wellTemplate.Childrens[labelIndex].ViewBrush.Clone();
                                            if (viewBrush.BrushColorA != undefined && viewBrush.BrushColorR != undefined
                                                && viewBrush.BrushColorG != undefined && viewBrush.BrushColorB != undefined) {
                                                labelDic["ViewBrush"].Color = WGADPlatGMEngine.WGColor.FromARGB(viewBrush.BrushColorA,viewBrush.BrushColorR, viewBrush.BrushColorG, viewBrush.BrushColorB);
                                            }
                                            if (viewBrush.FillStyle != undefined) {
                                                labelDic["ViewBrush"].FillStyle = viewBrush.FillStyle;
                                            }
                                        }
                                        if (label.Font) {
                                            var font = label.Font;
                                            labelDic["Font"] = wellTemplate.Childrens[labelIndex].Font.Clone();
                                            if (font.FontName != undefined) {
                                                labelDic["Font"].FontName = font.FontName;
                                            }
                                            if (font.FontSize > 0) {
                                                labelDic["Font"].FontSize = font.FontSize;
                                            }
                                            if (font.Weight != undefined) {
                                                labelDic["Font"].Weight = font.Weight;
                                            }
                                            if (font.Color) {
                                                var color = font.Color;
                                                if (color.ColorA != undefined && color.ColorR != undefined
                                                    && color.ColorG != undefined && color.ColorB != undefined) {
                                                    labelDic["Font"].Color = WGADPlatGMEngine.WGColor.FromARGB(color.ColorA, color.ColorR, color.ColorG, color.ColorB);
                                                }
                                            }
                                        }
                                        labelDics.push(labelDic);
                                    }
                                    
                                    wellLabelDic[wellDotInfo.WellDotTypeCode] = labelDics;
                                }
                            }
                        }
                    } else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWellGroup) {
                        var warningPenDic = {};
                        var warningSizeDic = {};
                        var warningTypeDic = {};
                        //获取预警信息
                        if (data.Layers[i].WarningInfo && data.Layers[i].WarningInfo.length > 0) {
                            //预警信息存在，根据code获取预警的颜色等属性
                            for (var index = 0; index < data.Layers[i].WarningInfo.length; index++) {
                                var warningInfo = data.Layers[i].WarningInfo[index];
                                if (warningInfo.ViewPen && warningInfo.WarningTypeCode != undefined) {
                                    //画笔
                                    var viewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                        warningInfo.ViewPen
                                    );
                                    warningPenDic[warningInfo.WarningTypeCode] = viewPen;
                                }
                                if (warningInfo.WarningType && warningInfo.WarningTypeCode != undefined) {
                                    warningTypeDic[warningInfo.WarningTypeCode] = warningInfo.WarningType;
                                }
                                if (warningInfo.WellSize && warningInfo.WarningTypeCode != undefined) {
                                    warningSizeDic[warningInfo.WarningTypeCode] = warningInfo.WellSize;
                                }
                            }
                        }
                    } else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltBreakLine) {
                        var breakPropertyDic = {};
                        if (data.Layers[i].ViewPen) {
                            breakPropertyDic.ViewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                data.Layers[i].ViewPen
                            );
                        }
                    } else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline) {
                        var isolinePropertyDic = {};
                        if (data.Layers[i].ViewPen) {
                            isolinePropertyDic.ViewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                data.Layers[i].ViewPen
                            );
                        }

                        isolinePropertyDic.LableShowCheck = false;
                        isolinePropertyDic.LabelShowNum = 0;
                        isolinePropertyDic.BoldCheck = false;
                        isolinePropertyDic.BoldNum = 0;
                        isolinePropertyDic.BoldWidth = 1;
                        if (isolinePropertyDic.ViewPen) {
                            isolinePropertyDic.BoldWidth = isolinePropertyDic.ViewPen.PenWidth;
                        }

                        if (data.Layers[i].LableShowCheck != undefined) {
                            isolinePropertyDic.LableShowCheck = data.Layers[i].LableShowCheck;
                        }
                        if (data.Layers[i].LabelShowNum) {
                            isolinePropertyDic.LabelShowNum = data.Layers[i].LabelShowNum;
                        }
                        if (data.Layers[i].BoldCheck) {
                            isolinePropertyDic.BoldCheck = data.Layers[i].BoldCheck;
                        }
                        if (data.Layers[i].BoldNum) {
                            isolinePropertyDic.BoldNum = data.Layers[i].BoldNum;
                        }
                        if (data.Layers[i].BoldWidth) {
                            isolinePropertyDic.BoldWidth = data.Layers[i].BoldWidth;
                        }
                    }
                    for (var j = 0; j < data.Layers[i].Objects.length; j++) {
                        var itemObject = data.Layers[i].Objects[j];
                        switch (itemObject.ObjType) {
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLegend:
                                var isolegend = new WGADPlatGraph2DFrame.WGFrameIsoLegend({});
                                isolegend.PositionX = itemObject.PositionX;
                                isolegend.PositionY = itemObject.PositionY;
                                isolegend.Width = itemObject.Width;
                                isolegend.Height = itemObject.Height;
                                isolegend.Text = itemObject.Text;
                                isolegend.ColorList = itemObject.ColorList;
                                if (itemObject.ShowMode != undefined) {
                                    isolegend.ShowMode = itemObject.ShowMode;
                                    if (itemObject.ShowMode == 1) {
                                        isolegend.ColorList = itemObject.ColorList2;
                                    }
                                }
                                isolegend.IsoValueType = 0; //0 正常 1 反向
                                isolegend.StartFromMin = false; //从最小刻度开始显示
                                isolegend.MaxValue = itemObject.MaxValue;
                                isolegend.MinValue = itemObject.MinValue;
                                isolegend.Pace = itemObject.Pace;
                                if (itemObject.IsoValueType != undefined) {
                                    isolegend.IsoValueType = itemObject.IsoValueType;
                                }
                                if (itemObject.StartFromMin != undefined) {
                                    isolegend.StartFromMin = itemObject.StartFromMin;
                                }
                                if (itemObject.IsLeftShowText != undefined) {
                                    isolegend.IsLeftShowText = itemObject.IsLeftShowText;
                                }

                                isolegend.IsShowGradient = true;
                                layer.AddChildren(isolegend);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameWell:
                                var well = new WGADPlatGraph2DFrame.WGFrameWell({});
                                var welltext = new WGADPlatGraph2DFrame.WGFrameWellLabelText({});
                                welltext.Label = itemObject.WellName;
                                welltext.OffX = 1.5;
                                welltext.OffY = 1;
                                well.AddChildren(welltext);
                                if (wellTemplate) {
                                    well.RemoveAllChildrens();
                                    well.CopyFromTemplet(wellTemplate);
                                }

                                well.WellName = itemObject.WellName;
                                well.CoordX = itemObject.CoordX;
                                well.CoordY = itemObject.CoordY;
                                well.BXHB = itemObject.BXHB;
                                well.IsUsed = itemObject.Used;
                                well.WellJsjg = itemObject.JSJG;
                                well.WellType = itemObject.WellType;
                                well.WellData = itemObject.Data;
                                var wellDotType = itemObject.WellDotType;
                                var setViewBrush = false;
                                var setWellSize = false;
                                if (wellDotType != undefined) {
                                    //井点信息存在，根据code获取井圈的颜色等属性
                                    if (wellDotPenDic[wellDotType]) {
                                        well.ViewPen = wellDotPenDic[wellDotType].Clone();
                                    }

                                    //井点信息存在，根据code获取井圈的颜色等属性
                                    if (wellDotBrushDic[wellDotType]) {
                                        well.ViewBrush = wellDotBrushDic[wellDotType].Clone();
                                        setViewBrush = true;
                                    }

                                    if (wellSizeDic[wellDotType]) {
                                        well.WellSize = wellSizeDic[wellDotType];
                                        setWellSize = true;
                                    }
                                    if (wellDrawSymbolDic[wellDotType]) {
                                        well.IsDrawSymbol = wellDrawSymbolDic[wellDotType];
                                    }
                                    if (wellSymbolNameDic[wellDotType]) {
                                        var symbolName = wellSymbolNameDic[wellDotType];
                                        var url = WGADPlatConfig.symbolDataPath + "104/" + symbolName + ".json";
                                        GetSymbol(well, "Symbol", symbolName, url, symbolData);
                                    }
                                    if (wellLabelDic[wellDotType]) {
                                        //井标签的设置(可能会有多个标签)
                                        var labels = wellLabelDic[wellDotType];
                                        for (var labelIndex = 0; labelIndex < labels.length; labelIndex++) {
                                            var label = well.Childrens[labelIndex];
                                            if (label && label instanceof WGADPlatGraph2DFrame.WGFrameWellLabelText) {
                                                if (labels[labelIndex].ViewPen) {
                                                    label.ViewPen = labels[labelIndex].ViewPen.Clone();
                                                }
                                                if (labels[labelIndex].ViewBrush) {
                                                    label.ViewBrush = labels[labelIndex].ViewBrush.Clone();
                                                }
                                                if (labels[labelIndex].Font) {
                                                    label.Font = labels[labelIndex].Font.Clone();
                                                }
                                            }
                                        }
                                    }
                                }
                                if (itemObject.WellSize) {
                                    well.WellSize = itemObject.WellSize;
                                    setWellSize = true;
                                }
                                if (!setViewBrush) {
                                    well.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(255, 255, 0, 0);
                                    well.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
                                }
                                if (!setWellSize && !wellTemplate) {
                                    well.WellSize = 1;
                                }

                                if (xmin > itemObject.CoordX) if (ymax < itemObject.CoordY) ymax = itemObject.CoordY;
                                if (itemObject.IsDrawSymbol != undefined) {
                                    well.IsDrawSymbol = itemObject.IsDrawSymbol;
                                }

                                if (itemObject.SymbolName) {
                                    var symbolName = itemObject.SymbolName;
                                    var url = WGADPlatConfig.symbolDataPath + "104/" + symbolName + ".json";
                                    GetSymbol(well, "Symbol", symbolName, url, symbolData);
                                }
                                if (itemObject.data) {
                                    for (var m = 0; m < itemObject.data.length; m++) {
                                        var code = itemObject.data[m].code;
                                        var name = itemObject.data[m].name;
                                        var value = itemObject.data[m].value;
                                        well.AddWellData(code, name, value);
                                    }
                                }
                                // var rightLabel = new WGADPlatGraph2DFrame.WGFrameWellLabelText({});
                                // rightLabel.OffX = 3.78;
                                // rightLabel.OffY = -1;
                                // rightLabel.IsFixedOff=true;
                                // rightLabel.HintText = itemObject.WellName;
                                // rightLabel.IsRightLabel = true;
                                // rightLabel.IsFixed=false;
                                // rightLabel.FixMinScale=0.5;
                                // rightLabel.FixMaxScale=10;
                                // // rightLabel.Visible = true;
                                // // rightLabel.Hidden = false;
                                // well.AddChildren(rightLabel);
                                var leftLabel = new WGADPlatGraph2DFrame.WGFrameWellLabelText({});
                                leftLabel.OffX = -20;
                                leftLabel.OffY = -1;
                                leftLabel.HintText = itemObject.WellName;
                                leftLabel.IsFixed = false;
                                leftLabel.FixMinScale = 0.8;
                                leftLabel.FixMaxScale = 10;
                                //well.AddChildren(leftLabel);
                                // var topLabel = new WGADPlatGraph2DFrame.WGFrameWellLabelText({});
                                // topLabel.OffX = -5.07;
                                // topLabel.OffY = -8;
                                // topLabel.IsFixed=false;
                                // topLabel.FixMinScale=0.5;
                                // topLabel.FixMaxScale=10;
                                // // topLabel.Visible = false;
                                // // topLabel.Hidden = true;
                                // topLabel.HintText = itemObject.WellName;
                                // well.AddChildren(topLabel);
                                // var downLabel = new WGADPlatGraph2DFrame.WGFrameWellLabelText({});
                                // downLabel.OffX = -5.28;
                                // downLabel.OffY = 10;
                                // downLabel.HintText = itemObject.WellName;
                                // downLabel.IsFixed=false;
                                // downLabel.FixMinScale=0.5;
                                // downLabel.FixMaxScale=10;
                                // // downLabel.Hidden = true;
                                // // downLabel.Visible = false;
                                // well.AddChildren(downLabel);
                                // var perLabel = new WGADPlatGraph2DFrame.WGFrameWellLabelFraction({});
                                // perLabel.OffX = 11;
                                // perLabel.OffY = 5;
                                // perLabel.HintText = itemObject.WellName;
                                // perLabel.Sign = [""];
                                // // perLabel.Hidden = true;
                                // // perLabel.Visible = false;
                                // well.AddChildren(perLabel);

                                layer.AddChildren(well);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameWellTrace:
                                if (itemObject.wellTrack && itemObject.wellTrack.length > 1) {
                                    for (var m = 0; m < itemObject.wellTrack.length; ++m) {
                                        if (
                                            itemObject.wellTrack[m].FWJHD === "NULL" ||
                                            !itemObject.wellTrack[m].FWJHD
                                        ) {
                                            if (itemObject.wellTrack[m].FWJ != "NULL") {
                                                itemObject.wellTrack[m].FWJHD =
                                                    (itemObject.wellTrack[m].FWJ * 3.14) / 180;
                                            }
                                        }

                                        if (
                                            itemObject.wellTrack[m].JXJHD === "NULL" ||
                                            !itemObject.wellTrack[m].JXJHD
                                        ) {
                                            if (itemObject.wellTrack[m].JXJ != "NULL") {
                                                itemObject.wellTrack[m].JXJHD =
                                                    (itemObject.wellTrack[m].JXJ * 3.14) / 180;
                                            }
                                        }

                                        if (!itemObject.wellTrack[m].CDCS) {
                                            itemObject.wellTrack[m].CDCS = 0;
                                        }

                                        if (!itemObject.wellTrack[m].TYFX) {
                                            itemObject.wellTrack[m].TYFX = 0;
                                        }

                                        if (!itemObject.wellTrack[m].TYWY) {
                                            itemObject.wellTrack[m].TYWY = 0;
                                        }
                                    }
                                    var wellTrack = new WGADPlatGMEngineTools.WGWellTrack();
                                    wellTrack.TrackData = itemObject.wellTrack;
                                    if (itemObject.ClacWellTrack) {
                                        wellTrack.ClacWellTrackDatas();
                                    }
                                    var curveData = MakeXToY(wellTrack.TrackData);

                                    var wellTrace = new WGADPlatGraph2DFrame.WGFrameWellTrace({});
                                    wellTrace.CoordX = itemObject.TopCoordX;
                                    wellTrace.CoordY = itemObject.TopCoordY;
                                    wellTrace.WellName = itemObject.WellName;
                                    // if (symbolData[data[i].Objects[j].Icon] != null) {
                                    //     var symbol = new WGADPlatGraph2D.WGGeoSymbol();
                                    //     symbol.JsonObjLoad(symbolData[data[i].Objects[j].Icon]);
                                    //     wellTrace.Symbol = symbol;
                                    // }
                                    for (var h = 0; h < curveData.CurveData.length; ++h) {
                                        var ex = parseFloat(wellTrace.CoordX) + curveData.CurveData[h].X;
                                        var ey = parseFloat(wellTrace.CoordY) + curveData.CurveData[h].Y;
                                        wellTrace.AddTracePoint(ex, ey);
                                    }
                                    layer.AddChildren(wellTrace);
                                }
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine:
                                var isoline = new WGADPlatGraph2DFrame.WGFrameIsoLine({});
                                isoline.ValueText = itemObject.Value;
                                if (itemObject.IntervalValue != undefined) {
                                    isoline.IntervalValue = itemObject.IntervalValue;
                                }
                                if (itemObject.Closed != undefined) {
                                    isoline.Closed = itemObject.Closed;
                                }
                                if (itemObject.ArrowDir != undefined) {
                                    isoline.ArrowDir = itemObject.ArrowDir;
                                }
                                //isoline.IsSmooth = true;
                                for (var k = 0; k < itemObject.Points.length; k++) {
                                    isoline.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);
                                    if (xmin > itemObject.Points[k].X) xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X) xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y) ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y) ymax = itemObject.Points[k].Y;
                                }
                                var lineSymbolCode = itemObject.LineSymbolCode;
                                if (
                                    lineSymbolCode != undefined &&
                                    lineSymbolCode != "" &&
                                    this.lineSymbolData[lineSymbolCode]
                                ) {
                                    var linesymbol = new WGADPlatGraph2D.WGLineStyle({});
                                    linesymbol.JsonObjLoad(this.lineSymbolData[lineSymbolCode]);
                                    isoline.SetLineStyle(linesymbol);
                                }
                                if (itemObject.ShowDot) {
                                    isoline.ShowDot = true;
                                }
                                if (itemObject.DotType) {
                                    isoline.DotType = itemObject.DotType;
                                }
                                if (itemObject.DotPosition) {
                                    isoline.DotPosition = itemObject.DotPosition;
                                }

                                if (isolinePropertyDic.ViewPen) {
                                    isoline.ViewPen = isolinePropertyDic.ViewPen.Clone();
                                }
                                SetViewPen(isoline.ViewPen, itemObject.ViewPen);
                                SetViewPen(isoline.ViewPenCircle, itemObject.ViewPenCircle);
                                if (itemObject.circleRadius) {
                                    isoline.circleRadius = itemObject.circleRadius;
                                }
                                SetViewBrush(isoline.ViewBrushCircle, itemObject.ViewBrushCircle);
                                layer.AddChildren(isoline);
                                if (itemObject.UseSign == undefined || itemObject.UseSign) {
                                    var sign = new WGADPlatGraph2D.WGGeoLineSignText({});
                                    isoline.InsertChildren(sign, 0);
                                    sign.SymbolPos = WGADPlatGraph2D.EGSymbolPos.wgspDynamics;
                                    sign.Label = itemObject.Value;
                                    isoline.Update();
                                    sign.SetSymbolNum(1);
                                }

                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline:
                                var breakline = new WGADPlatGraph2DFrame.WGFrameBreakLine({});
                                if (itemObject.BreakLineUpDown != undefined) {
                                    breakline.BreakLineUpDown = itemObject.BreakLineUpDown;
                                }
                                if (itemObject.LineTag != undefined) {
                                    breakline.BreakLineTag = itemObject.LineTag;
                                }
                                if (itemObject.DCLineXH != undefined) {
                                    breakline.XH = itemObject.DCLineXH;
                                }
                                if (itemObject.LinePartXH != undefined) {
                                    breakline.LinePartXH = itemObject.LinePartXH;
                                }

                                for (var k = 0; k < itemObject.Points.length; k++) {
                                    breakline.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);

                                    if (xmin > itemObject.Points[k].X) xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X) xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y) ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y) ymax = itemObject.Points[k].Y;
                                }

                                var lineSymbolCode = itemObject.LineSymbolCode;
                                if (
                                    lineSymbolCode != undefined &&
                                    lineSymbolCode != "" &&
                                    this.lineSymbolData[lineSymbolCode]
                                ) {
                                    var linesymbol = new WGADPlatGraph2D.WGLineStyle({});
                                    linesymbol.JsonObjLoad(this.lineSymbolData[lineSymbolCode]);
                                    breakline.SetLineStyle(linesymbol);
                                }
                                if (breakPropertyDic.ViewPen) {
                                    breakline.ViewPen = breakPropertyDic.ViewPen.Clone();
                                }
                                layer.AddChildren(breakline);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameFoulline:
                                //case WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX:
                                var m_foulLineType = 0;
                                if (data.Layers[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine)
                                    m_foulLineType = 203;
                                else if (data.Layers[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX)
                                    m_foulLineType = 204;
                                else {
                                    m_foulLineType = 0;
                                }
                                var foulline = new WGADPlatGraph2DFrame.WGFrameFoulline({});
                                foulline.FoulLineType = m_foulLineType;
                                for (var k = 0; k < itemObject.Points.length; k++) {
                                    foulline.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);

                                    if (xmin > itemObject.Points[k].X) xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X) xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y) ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y) ymax = itemObject.Points[k].Y;
                                }

                                var lineSymbolCode = itemObject.LineSymbolCode;
                                if (
                                    lineSymbolCode != undefined &&
                                    lineSymbolCode != "" &&
                                    this.lineSymbolData[lineSymbolCode]
                                ) {
                                    var linesymbol = new WGADPlatGraph2D.WGLineStyle({});
                                    linesymbol.JsonObjLoad(this.lineSymbolData[lineSymbolCode]);
                                    foulline.SetLineStyle(linesymbol);

                                    foulline.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                                        this.lineSymbolData[lineSymbolCode].PenColorA,
                                        this.lineSymbolData[lineSymbolCode].PenColorR,
                                        this.lineSymbolData[lineSymbolCode].PenColorG,
                                        this.lineSymbolData[lineSymbolCode].PenColorB
                                    );
                                }

                                layer.AddChildren(foulline);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLineFill:
                                var m_isolineFillStyle = 0;
                                if (data.Layers[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill)
                                    m_isolineFillStyle = 3;
                                else if (data.Layers[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ)
                                    m_isolineFillStyle = 0;
                                else if (data.Layers[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ)
                                    m_isolineFillStyle = 1;
                                else if (data.Layers[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltSed)
                                    m_isolineFillStyle = 4;
                                var isoLineFill = new WGADPlatGraph2DFrame.WGFrameIsoLineFill({});
                                isoLineFill.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                    itemObject.FillColor[0],
                                    itemObject.FillColor[1],
                                    itemObject.FillColor[2],
                                    itemObject.FillColor[3]
                                );
                                isoLineFill.ViewBrush.FillStyle = 0;
                                isoLineFill.IsolineFillStyle = m_isolineFillStyle;
                                if (itemObject.IsolineValue != undefined) {
                                    isoLineFill.IsolineValue = itemObject.IsolineValue;
                                }
                                for (var k = 0; k < itemObject.Points.length; k++) {
                                    isoLineFill.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);

                                    if (xmin > itemObject.Points[k].X) xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X) xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y) ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y) ymax = itemObject.Points[k].Y;
                                }
                                layer.AddChildren(isoLineFill);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtPLine: {
                                var polyline = new WGADPlatGraph2D.WGGeoPolyline({});
                                polyline.ViewPen.PenWidth = itemObject.LineWidth;
                                polyline.Visible = itemObject.Visible;
                                polyline.Closed = true;
                                if (itemObject.Closed != undefined) {
                                    polyline.Closed = itemObject.Closed;
                                }
                                polyline.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                                    itemObject.LineColor[0],
                                    itemObject.LineColor[1],
                                    itemObject.LineColor[2],
                                    itemObject.LineColor[3]
                                );
                                for (var k = 0; k < itemObject.Points.length; k++) {
                                    polyline.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);
                                }
                                layer.AddChildren(polyline);
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameExploitation: {
                                var exp = new WGADPlatGraph2DFrame.WGFrameExploitation({});
                                if (itemObject.IsShowHistogram != undefined) {
                                    exp.IsShowHistogram = itemObject.IsShowHistogram;
                                }
                                if (itemObject.IsShowPie != undefined) {
                                    exp.IsShowPie = itemObject.IsShowPie;
                                }
                                if (itemObject.MinPieRadius != undefined) {
                                    exp.MinPieRadius = itemObject.MinPieRadius;
                                }
                                if (itemObject.MaxPieRadius != undefined) {
                                    exp.MaxPieRadius = itemObject.MaxPieRadius;
                                }
                                if (itemObject.MinHeight != undefined) {
                                    exp.MinHeight = itemObject.MinHeight;
                                }
                                if (itemObject.MaxHeight != undefined) {
                                    exp.MaxHeight = itemObject.MaxHeight;
                                }
                                if (itemObject.MinPieValue != undefined) {
                                    exp.MinPieValue = itemObject.MinPieValue;
                                }
                                if (itemObject.MaxPieValue != undefined) {
                                    exp.MaxPieValue = itemObject.MaxPieValue;
                                }
                                if (itemObject.Width != undefined) {
                                    exp.Width = itemObject.Width;
                                }
                                if (itemObject.MaxHisHeight != undefined) {
                                    exp.MaxHisHeight = itemObject.MaxHisHeight;
                                }
                                if (itemObject.MaxHisValue != undefined) {
                                    exp.MaxHisValue = itemObject.MaxHisValue;
                                }
                                if (itemObject.Interval != undefined) {
                                    exp.Interval = itemObject.Interval;
                                }
                                if (itemObject.Radius != undefined) {
                                    exp.Radius = itemObject.Radius;
                                }
                                if (itemObject.IsReversal != undefined) {
                                    exp.IsReversal = itemObject.IsReversal;
                                }
                                if (itemObject.IsLegend != undefined) {
                                    exp.IsLegend = itemObject.IsLegend;
                                }
                                if (itemObject.ShowLineLength != undefined) {
                                    exp.ShowLineLength = itemObject.ShowLineLength;
                                }
                                if (itemObject.ScDate != undefined) {
                                    exp.ScDate = itemObject.ScDate;
                                }
                                exp.ScDate = itemObject.ScDate;
                                if (itemObject.IsDrawDirectLine != undefined) {
                                    exp.IsDrawDirectLine = itemObject.IsDrawDirectLine;
                                }
                                if (itemObject.OffX != undefined) {
                                    exp.OffX1 = itemObject.OffX;
                                }
                                if (itemObject.OffY != undefined) {
                                    exp.OffY1 = itemObject.OffY;
                                }

                                if (itemObject.LayerName != undefined) {
                                    exp.LayerName = itemObject.LayerName;
                                }

                                if (itemObject.WellKCType != undefined) {
                                    exp.WellKCType = itemObject.WellKCType;
                                }
                                if (itemObject.PieCode != undefined) {
                                    exp.PieCode = itemObject.PieCode;
                                }
                                exp.PositionX = itemObject.PositionX;
                                exp.PositionY = itemObject.PositionY;

                                if (itemObject.Histogram != undefined) {
                                    for (var m = 0; m < itemObject.Histogram.length; m++) {
                                        var obj = itemObject.Histogram[m];
                                        var expHis = new WGADPlatGraph2DFrame.WGFrameExploitationHistogram({});
                                        expHis.ParentExploitation = exp;
                                        expHis.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(255, 0, 0, 0);
                                        expHis.ViewPen.PenWidth = 0.3;
                                        expHis.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                            obj.Color[0],
                                            obj.Color[1],
                                            obj.Color[2],
                                            obj.Color[3]
                                        );
                                        expHis.Value = obj.Value;
                                        expHis.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
                                        expHis.Text = obj.Text;
                                        expHis.Code = obj.Code;
                                        if (obj.Height != undefined) {
                                            expHis.Height = obj.Height;
                                        } else {
                                            expHis.Height = (exp.MaxHisHeight * expHis.Value) / exp.MaxHisValue;
                                        }
                                        if (obj.ShowText != undefined && !obj.ShowText) {
                                            expHis.ShowText = false;
                                        } else {
                                            var expText = new WGADPlatGraph2DFrame.WGFrameExpText({});
                                            expText.AbleSelecte = false;
                                            expText.DrawFrame = false;

                                            expHis.AddChildren(expText);
                                        }
                                        exp.AddChildren(expHis);
                                    }
                                }
                                if (itemObject.Pie != undefined) {
                                    for (var m = 0; m < itemObject.Pie.length; m++) {
                                        var obj = itemObject.Pie[m];
                                        var expPie = new WGADPlatGraph2DFrame.WGFrameExploitationPie({});
                                        expPie.ParentExploitation = exp;
                                        expPie.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(255, 0, 0, 0);
                                        expPie.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                            obj.Color[0],
                                            obj.Color[1],
                                            obj.Color[2],
                                            obj.Color[3]
                                        );
                                        expPie.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
                                        expPie.Text = obj.Text;
                                        expPie.Code = obj.Code;
                                        expPie.Value = obj.Value;
                                        exp.AddChildren(expPie);

                                        var expText = new WGADPlatGraph2DFrame.WGFrameExpText({});
                                        expText.AbleSelecte = false;
                                        expText.DrawFrame = false;
                                        expPie.AddChildren(expText);
                                    }
                                }
                                layer.AddChildren(exp);
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube: {
                                var logTube = new WGADPlatGraph2DFrame.WGFrameLogTube({});
                                logTube.SetCoordX(itemObject.CoordX);
                                logTube.SetCoordY(itemObject.CoordY);
                                logTube.OldCoordX = itemObject.CoordX;
                                logTube.OldCoordY = itemObject.CoordY;
                                if (itemObject.ObjName != undefined) {
                                    logTube.ObjName = itemObject.ObjName;
                                }
                                if (itemObject.WellName) {
                                    logTube.WellName = itemObject.WellName;
                                }
                                if (itemObject.JSJG) {
                                    logTube.WellJsjg = itemObject.JSJG;
                                }
                                if (tubePropertyDic.Width != undefined) {
                                    logTube.Width = tubePropertyDic.Width;
                                }
                                if (tubePropertyDic.IsDrawBottomLine != undefined) {
                                    logTube.IsDrawBottomLine = tubePropertyDic.IsDrawBottomLine;
                                }
                                if (tubePropertyDic.IsDrawDirectLine != undefined) {
                                    logTube.IsDrawDirectLine = tubePropertyDic.IsDrawDirectLine;
                                }
                                if (tubePropertyDic.ShowLineLength != undefined) {
                                    logTube.ShowLineLength = tubePropertyDic.ShowLineLength;
                                }
                                if (tubePropertyDic.CurveValueShowType != undefined) {
                                    logTube.CurveValueShowType = tubePropertyDic.CurveValueShowType;
                                }
                                if (tubePropertyDic.IsShowWellName != undefined) {
                                    logTube.IsShowWellName = tubePropertyDic.IsShowWellName;
                                }
                                if (tubePropertyDic.ViewPen) {
                                    logTube.ViewPen = tubePropertyDic.ViewPen.Clone();
                                }
                                if (tubePropertyDic.TextFont) {
                                    if (tubePropertyDic.TextFont.FontName) {
                                        logTube.TextFont.FontName = tubePropertyDic.TextFont.FontName;
                                    }
                                    if (tubePropertyDic.TextFont.FontSize) {
                                        logTube.TextFont.FontSize = tubePropertyDic.TextFont.FontSize;
                                    }
                                    if (tubePropertyDic.TextFont.Color) {
                                        logTube.TextFont.Color = tubePropertyDic.TextFont.Color.Clone();
                                    }
                                }

                                if (itemObject.LineColor != undefined) {
                                    logTube.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                                        itemObject.LineColor[0],
                                        itemObject.LineColor[1],
                                        itemObject.LineColor[2],
                                        itemObject.LineColor[3]
                                    );
                                }

                                if (itemObject.Scale != undefined) {
                                    logTube.Scale = itemObject.Scale;
                                }
                                if (itemObject.Width != undefined) {
                                    logTube.Width = itemObject.Width;
                                }
                                if (itemObject.Tag != undefined) {
                                    logTube.Tag = itemObject.Tag;
                                }
                                var logCurve = itemObject.Curve;
                                if (logCurve == undefined) {
                                    logCurve = itemObject.Childrens;
                                }
                                if (logCurve != undefined) {
                                    for (var m = 0; m < logCurve.length; m++) {
                                        if (logCurve[m].ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWellLog) {
                                            var log = new WGADPlatGraph2DFrame.WGFrameWellLog({});
                                            log.LogName = logCurve[m].LogName;
                                            if (logCurve[m].CurveName) {
                                                log.LogName = logCurve[m].CurveName;
                                            }
                                            if (curvePropertyDic[log.LogName]) {
                                                var curveProperty = curvePropertyDic[log.LogName];
                                                if (curveProperty.ViewPen) {
                                                    log.ViewPen = curveProperty.ViewPen.Clone();
                                                }
                                                if (curveProperty.ViewBrush) {
                                                    log.ViewBrush = curveProperty.ViewBrush.Clone();
                                                }
                                                if (curveProperty.TextFont) {
                                                    if (curveProperty.TextFont.FontName) {
                                                        log.TextFont.FontName = curveProperty.TextFont.FontName;
                                                    }
                                                    if (curveProperty.TextFont.FontSize) {
                                                        log.TextFont.FontSize = curveProperty.TextFont.FontSize;
                                                    }
                                                    if (curveProperty.TextFont.Color) {
                                                        log.TextFont.Color = curveProperty.TextFont.Color.Clone();
                                                    }
                                                }
                                                if (curveProperty.ValueFont) {
                                                    if (curveProperty.ValueFont.FontName) {
                                                        log.ValueFont.FontName = curveProperty.ValueFont.FontName;
                                                    }
                                                    if (curveProperty.ValueFont.FontSize) {
                                                        log.ValueFont.FontSize = curveProperty.ValueFont.FontSize;
                                                    }
                                                    if (curveProperty.ValueFont.Color) {
                                                        log.ValueFont.Color = curveProperty.ValueFont.Color.Clone();
                                                    }
                                                }
                                                if (curveProperty.Width != undefined) {
                                                    log.Width = curveProperty.Width;
                                                }
                                                if (curveProperty.Height != undefined) {
                                                    log.Height = curveProperty.Height;
                                                }
                                                if (curveProperty.IsShowName != undefined) {
                                                    log.IsShowName = curveProperty.IsShowName;
                                                }
                                                if (curveProperty.IntervalNum != undefined) {
                                                    log.IntervalNum = curveProperty.IntervalNum;
                                                }
                                                if (curveProperty.IsFillByLine != undefined) {
                                                    log.IsFillByLine = curveProperty.IsFillByLine;
                                                }
                                                if (curveProperty.IsFillLeft != undefined) {
                                                    log.IsFillLeft = curveProperty.IsFillLeft;
                                                }
                                                if (curveProperty.IsFillRight != undefined) {
                                                    log.IsFillRight = curveProperty.IsFillRight;
                                                }
                                            }
                                            if (logCurve[m].IsFillByLine != undefined) {
                                                log.IsFillByLine = logCurve[m].IsFillByLine;
                                            }
                                            if (logCurve[m].IsFillLeft != undefined) {
                                                log.IsFillLeft = logCurve[m].IsFillLeft;
                                            }
                                            if (logCurve[m].IsFillRight != undefined) {
                                                log.IsFillRight = logCurve[m].IsFillRight;
                                            }
                                            if (logCurve[m].CenterValue != undefined) {
                                                log.CenterValue = logCurve[m].CenterValue;
                                            }
                                            if (itemObject.StartDepth != undefined) {
                                                log.StartDepth = itemObject.StartDepth;
                                            }
                                            if (itemObject.EndDepth != undefined) {
                                                log.EndDepth = itemObject.EndDepth;
                                            }
                                            if (logCurve[m].IsShowName != undefined) {
                                                log.IsShowName = logCurve[m].IsShowName;
                                            }
                                            if (logCurve[m].IntervalNum != undefined) {
                                                log.IntervalNum = logCurve[m].IntervalNum;
                                            }
                                            if (logCurve[m].CurveDataType != undefined) {
                                                log.CurveDataType = logCurve[m].CurveDataType;
                                            }
                                            if (logCurve[m].Width != undefined) {
                                                log.Width = logCurve[m].Width;
                                            }
                                            if (logCurve[m].Height != undefined) {
                                                log.Height = logCurve[m].Height;
                                            }

                                            if (logCurve[m].LayerPly) {
                                                log.LayerPly = logCurve[m].LayerPly;
                                            }

                                            var objCurve = new WGADPlatGMEngineTools.WGDataLogCurveOneExt();
                                            if (itemObject.DepthList) {
                                                objCurve.DepthList = itemObject.DepthList;
                                            }
                                            if (
                                                itemObject.StartIndex != undefined &&
                                                itemObject.EndIndex != undefined &&
                                                itemObject.CurveSampleStep != undefined
                                            ) {
                                                objCurve.DepthList = GetCurveDepthList(
                                                    itemObject.StartIndex,
                                                    itemObject.EndIndex,
                                                    itemObject.CurveSampleStep
                                                );
                                            }
                                            if (logCurve[m].DepthList) {
                                                objCurve.DepthList = logCurve[m].DepthList;
                                            }
                                            if (
                                                logCurve[m].StartIndex != undefined &&
                                                logCurve[m].EndIndex != undefined &&
                                                logCurve[m].CurveSampleStep != undefined
                                            ) {
                                                objCurve.DepthList = GetCurveDepthList(
                                                    logCurve[m].StartIndex,
                                                    logCurve[m].EndIndex,
                                                    logCurve[m].CurveSampleStep
                                                );
                                            }
                                            if (logCurve[m].KZ) {
                                                objCurve.KZ = logCurve[m].KZ;
                                            }
                                            objCurve.ValueList = logCurve[m].ValueList;
                                            if (logCurve[m].ZXZ && logCurve[m].ZDZ) {
                                                objCurve.ZXZ = logCurve[m].ZXZ;
                                                objCurve.ZDZ = logCurve[m].ZDZ;
                                            } else {
                                                objCurve.GetMinMaxValue();
                                            }
                                            //objCurve.GetMinMaxDepth();
                                            log.CurveData = objCurve;
                                            logTube.AddChildren(log);
                                        } else if (
                                            logCurve[m].ObjType ==
                                            WGADPlatGraph2D.EWGObjectType.wgtFrameWellLayerExpTwoS
                                        ) {
                                            //获取代码跟符号名称对应
                                            var rockTextUrl = WGADPlatGMEngineTools.SymbolTextUrl;
                                            if (JSON.stringify(rockTextUrl) === "{}") {
                                                GetRockTextUrl(rockTextUrl);
                                            }
                                            var measureTube = new WGADPlatGraph2DFrame.WGFrameWellLayerExpTwoS({});

                                            var code = "";

                                            if (logCurve[m].ObjCode) {
                                                code = logCurve[m].ObjCode;
                                            }
                                            if (noCurvePropertyDic["Measure" + code]) {
                                                var noCurveProperty = noCurvePropertyDic["Measure" + code];
                                                if (noCurveProperty.Width != undefined) {
                                                    measureTube.Width = noCurveProperty.Width;
                                                }
                                                if (noCurveProperty.Height != undefined) {
                                                    measureTube.Height = noCurveProperty.Height;
                                                }
                                            }
                                            if (logCurve[m].Width != undefined) {
                                                measureTube.Width = logCurve[m].Width;
                                            }
                                            if (logCurve[m].Height != undefined) {
                                                measureTube.Height = logCurve[m].Height;
                                            }
                                            if (itemObject.StartDepth != undefined) {
                                                measureTube.StartDepth = itemObject.StartDepth;
                                            }
                                            if (itemObject.EndDepth != undefined) {
                                                measureTube.EndDepth = itemObject.EndDepth;
                                            }
                                            var measureData = logCurve[m].Childrens;
                                            if (measureData) {
                                                for (var k = 0; k < measureData.length; k++) {
                                                    var measure = new WGADPlatGraph2DFrame.WGFrameWellLayerExpTwo({});
                                                    measure.StartDepth = parseFloat(measureData[k].DINGS);
                                                    measure.EndDepth = parseFloat(measureData[k].DIS);
                                                    if (measureData[k].JSJG && measureData[k].JSJG != "") {
                                                        var symbol = new WGADPlatGraph2D.WGGeoSymbol();
                                                        if (symbolData[measureData[k].JSJG] != null) {
                                                            symbol.JsonObjLoad(symbolData[measureData[k].JSJG]);
                                                            measure.SymbolMeasure = symbol;
                                                        } else {
                                                            //根据text和url对应，获取url
                                                            var url =
                                                                WGADPlatConfig.symbolDataPath +
                                                                "123/" +
                                                                measureData[k].JSJG +
                                                                ".json";
                                                            if (rockTextUrl[measureData[k].JSJG] != null) {
                                                                url = rockTextUrl[measureData[k].JSJG];
                                                                GetSymbol(
                                                                    measure,
                                                                    "SymbolMeasure",
                                                                    measureData[k].JSJG,
                                                                    url,
                                                                    symbolData
                                                                );
                                                            }
                                                        }
                                                    }
                                                    measureTube.AddChildren(measure);
                                                }
                                            }
                                            logTube.AddChildren(measureTube);
                                        }
                                    }
                                }
                                layer.AddChildren(logTube);
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameBubble: {
                                var exp = new WGADPlatGraph2DFrame.WGFrameBubble({});

                                if (itemObject.WellName != undefined) {
                                    exp.WellName = itemObject.WellName;
                                }
                                if (itemObject.Radius != undefined) {
                                    exp.Radius = itemObject.Radius;
                                }
                                if (itemObject.Legend != undefined) {
                                    exp.Legend = itemObject.Legend;
                                }
                                exp.CoordX = itemObject.CoordX;
                                exp.CoordY = itemObject.CoordY;

                                if (itemObject.Pie != undefined) {
                                    var textobj = [];
                                    for (var m = 0; m < itemObject.Pie.length; m++) {
                                        var obj = itemObject.Pie[m];
                                        var expPie = new WGADPlatGraph2DFrame.WGFrameBubblePie({});
                                        expPie.AllowDrag = false;
                                        expPie.AbleSelecte = false;
                                        expPie.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(255, 0, 0, 0);
                                        expPie.ViewPen.PenWidth = 0.3;
                                        if (obj.Color != undefined && obj.Color.length > 3) {
                                            expPie.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                                obj.Color[0],
                                                obj.Color[1],
                                                obj.Color[2],
                                                obj.Color[3]
                                            );
                                        }

                                        expPie.Value = obj.Value;
                                        expPie.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
                                        expPie.Text = obj.Text;
                                        expPie.Code = obj.Code;

                                        var expText = new WGADPlatGraph2DFrame.WGFrameExpText({});
                                        expText.AbleSelecte = false;
                                        expText.DrawFrame = false;
                                        expText.PointX = exp.CoordX;
                                        expText.PointY = exp.CoordY;
                                        expText.ParentObj = expPie;
                                        expText.Text = expPie.Value.toString();
                                        expText.TextFont.FontSize = 12;
                                        expText.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
                                        expText.TextFont.HorizAlign = WGADPlatGMEngine.EGTextVAlign.wghaCENTER;
                                        textobj.push(expText);

                                        if (obj.ShowText != undefined && !obj.ShowText) {
                                            expText.Hidden = true;
                                        } else {
                                            expText.Hidden = false;
                                        }

                                        exp.AddChildren(expPie);
                                    }
                                    for (var index in textobj) {
                                        exp.AddChildren(textobj[index]);
                                    }
                                }
                                layer.AddChildren(exp);
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameSection: {
                                var sec = new WGADPlatGraph2DFrame.WGFrameSection({});
                                sec.Row = itemObject.Row;
                                sec.Col = itemObject.Col;
                                var angle = 0;
                                if (itemObject.MinCoordX) {
                                    sec.MinCoordX = itemObject.MinCoordX;
                                } else {
                                    sec.MinCoordX = itemObject.ZSX;
                                }
                                if (itemObject.MinCoordY) {
                                    sec.MinCoordY = itemObject.MinCoordY;
                                } else {
                                    sec.MinCoordY = itemObject.ZXY;
                                }
                                if (itemObject.MaxCoordX) {
                                    sec.MaxCoordX = itemObject.MaxCoordX;
                                } else {
                                    sec.MaxCoordX = itemObject.YSX;
                                }
                                if (itemObject.MaxCoordY) {
                                    sec.MaxCoordY = itemObject.MaxCoordY;
                                } else {
                                    sec.MaxCoordY = itemObject.YSY;
                                }

                                if (itemObject.ZSX != undefined) {
                                    var x1 = itemObject.ZSX;
                                    var y1 = itemObject.ZSY;
                                    var x2 = itemObject.ZXX;
                                    var y2 = itemObject.ZXY;
                                    if (y2 - y1 != 0) {
                                        angle = Math.atan((x2 - x1) / (y2 - y1)); //弧度值
                                    }
                                }
                                sec.Angle = angle;
                                sec.Data = itemObject.Data;
                                sec.MinValue = itemObject.MinValue;
                                sec.MaxValue = itemObject.MaxValue;
                                sec.ColorList = itemObject.ColorList;
                                sec.IsShowLegend = itemObject.IsShowLegend;
                                sec.LegendPos = 5; //0左上 1 左中 2 左下 3 右上 4 右中 5 右下
                                sec.LegendPicOff = 150;
                                sec.LegendTextFont.AutoSize = true;
                                sec.LegendTextFont.FontSize = 20;
                                if (itemObject.LegendTextFont) {
                                    if (itemObject.LegendTextFont.FontName) {
                                        sec.LegendTextFont.FontName = itemObject.LegendTextFont.FontName;
                                    }
                                    if (itemObject.LegendTextFont.FontSize) {
                                        sec.LegendTextFont.FontSize = itemObject.LegendTextFont.FontSize;
                                    }
                                    if (itemObject.LegendTextFont.Color) {
                                        var lColor = itemObject.LegendTextFont.Color;
                                        sec.LegendTextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                            lColor[0],
                                            lColor[1],
                                            lColor[2],
                                            lColor[3]
                                        );
                                    }
                                }
                                layer.AddChildren(sec);
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameSeismicLine: {
                                if (itemObject.ShowMode && itemObject.ShowMode == 1) {
                                    this.SetSurveyGrid(itemObject, layer);
                                } else {
                                    var seismicLine = new WGADPlatGraph2DFrame.WGFrameSeismicLine({});
                                    seismicLine.Data = itemObject.Data;
                                    seismicLine.IsShowText = itemObject.IsShowText;
                                    if (itemObject.ViewPen) {
                                        //画笔
                                        seismicLine.ViewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                            itemObject.ViewPen
                                        );
                                    }
                                    if (itemObject.TextFont) {
                                        if (itemObject.TextFont.FontName) {
                                            seismicLine.TextFont.FontName = itemObject.TextFont.FontName;
                                        }
                                        if (itemObject.TextFont.FontSize) {
                                            seismicLine.TextFont.FontSize = itemObject.TextFont.FontSize;
                                        }
                                        if (itemObject.TextFont.Color) {
                                            var lColor = itemObject.TextFont.Color;
                                            seismicLine.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                                lColor[0],
                                                lColor[1],
                                                lColor[2],
                                                lColor[3]
                                            );
                                        }
                                    }
                                    layer.AddChildren(seismicLine);
                                }
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameSeismicCrossPLine: {
                                var obj = new WGADPlatGraph2DFrame.WGFrameSeismicCrossPLine({});
                                obj.SetTransform(this.View.MapData.Transform);
                                if (itemObject.LineCross == 0) {
                                    //inline
                                    obj.LineCross = WGADPlatGraph2D.EGInlineCrossLine.gICInline;
                                } else if (itemObject.LineCross == 1) {
                                    obj.LineCross = WGADPlatGraph2D.EGInlineCrossLine.gICCrossLine;
                                } else if (itemObject.LineCross == 2) {
                                    obj.LineCross = WGADPlatGraph2D.EGInlineCrossLine.gICPLine;
                                }
                                obj.DataChanged = false;
                                obj.AllowDrag = false;
                                obj.AllowMove = false;
                                if (itemObject.IsSelectLine) {
                                    comSelf.SelectSeismicLine = obj;
                                    obj.Selected = true;
                                }
                                for (var m = 0; m < itemObject.Points.length; m++) {
                                    // var poly=this.View.TransformData(m_view.MapData.Transform.GetViewToMapMatrix());
                                    var pX = this.View.MapData.Transform.EarthToMap(
                                        itemObject.Points[m][0],
                                        WGADPlatGraph2D.EWGTransStyle.wgtsCoordX
                                    );
                                    var pY = this.View.MapData.Transform.EarthToMap(
                                        itemObject.Points[m][1],
                                        WGADPlatGraph2D.EWGTransStyle.wgtsCoordY
                                    );
                                    obj.AddViewPoint(pX, pY);
                                }

                                layer.AddChildren(obj);

                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameWellWarning: {
                                var item = itemObject;
                                if (item.WellName && item.CoordY && item.CoordX) {
                                    //生成井报警图元
                                    var wellWarning = new WGADPlatGraph2DFrame.WGFrameWellWarning({});
                                    var warningTypeCode = item.WarningTypeCode;
                                    if (item.WarningType) {
                                        wellWarning.WarningType = item.WarningType;
                                    } else if (warningTypeCode != undefined && warningTypeDic[warningTypeCode]) {
                                        wellWarning.WarningType = warningTypeDic[warningTypeCode];
                                    }
                                    if (wellWarning.WarningType == "0") {
                                        //扇形预警方式0
                                        //颜色
                                        if (item.ColorLst) {
                                            wellWarning.ColorLst = item.ColorLst;
                                        } else {
                                            wellWarning.ColorLst = this.WarningColorLst;
                                        }
                                        if (item.WarningNum) {
                                            wellWarning.WarningNum = item.WarningNum;
                                        }
                                    } else if (wellWarning.WarningType == "1") {
                                        if (warningTypeCode != undefined && warningPenDic[warningTypeCode]) {
                                            wellWarning.ViewPen = warningPenDic[warningTypeCode].Clone();
                                        }
                                    }
                                    //坐标
                                    wellWarning.CoordX = item.CoordX;
                                    wellWarning.CoordY = item.CoordY;
                                    //井名
                                    wellWarning.WellName = item.WellName;
                                    //井环半径，默认是2
                                    if (item.WellSize) {
                                        wellWarning.WellSize = item.WellSize;
                                    } else if (warningTypeCode != undefined && warningSizeDic[warningTypeCode]) {
                                        //根据需要设置井环半径大小；map单位
                                        wellWarning.WellSize = warningSizeDic[warningTypeCode];
                                    } else {
                                        wellWarning.WellSize = this.WarningWellSize;
                                    }

                                    //true,井环不固定大小，随着比例尺变化而变化;
                                    //false井环不固定大小，设置最大和最小比例；当最大最小都是1时相当于固定大小
                                    wellWarning.IsFixed = this.WarningWellSizeFixed;
                                    wellWarning.FixMinScale = this.WarningWellSizeFixedMinScale;
                                    wellWarning.FixMaxScale = this.WarningWellSizeFixedMaxScale;

                                    //图元不允许拖拽
                                    wellWarning.AllowDrag = false;
                                    //图元不允许移动
                                    wellWarning.AllowMove = false;
                                    layer.AddChildren(wellWarning);
                                }
                                break;
                            }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameWellGroup:
                                if (itemObject.Wells) {
                                    var groupNode = itemObject;
                                    var group = new WGADPlatGraph2DFrame.WGFrameWellGroup({});
                                    group.GroupName = groupNode.GroupName;
                                    if (groupNode.OilProduction) {
                                        group.OilProduction = groupNode.OilProduction;
                                    }
                                    if (groupNode.GroupText) {
                                        group.GroupText = groupNode.GroupText;
                                    }
                                    group.AlarmLevel = groupNode.AlarmLevel;
                                    group.RQ = groupNode.RQ;
                                    if (groupNode.PenColorA != null) {
                                        group.ViewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(groupNode);
                                    }
                                    if (groupNode["ViewBrush"] != null) {
                                        group.ViewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                                            groupNode,
                                            "ViewBrush"
                                        );
                                    }
                                    for (var m = 0; m < groupNode.Wells.length; m++) {
                                        var wellNode = groupNode.Wells[m];
                                        var wells = {};
                                        wells.CoordX = wellNode.CoordX;
                                        wells.CoordY = wellNode.CoordY;
                                        wells.WellName = wellNode.WellName;
                                        var drawWell = false;
                                        if (wellNode.PenColorA) {
                                            wells.ViewPen =
                                                WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(wellNode);
                                            drawWell = true;
                                        } else {
                                            wells.ViewPen = new WGADPlatGMEngine.WGPen();
                                        }
                                        if (wellNode.ViewBrush) {
                                            drawWell = true;
                                            wells.ViewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                                                wellNode,
                                                "ViewBrush"
                                            );
                                        } else {
                                            wells.ViewBrush = new WGADPlatGMEngine.WGBrush();
                                        }

                                        if (wellNode.WellSize) {
                                            drawWell = true;
                                            wells.WellSize = wellNode.WellSize;
                                        } else {
                                            wells.WellSize = 2;
                                        }

                                        wells.DrawWell = drawWell;
                                        group.AddWell(wells);
                                        group.AddPoint(wellNode.CoordX, wellNode.CoordY);
                                    }
                                    group.IsFixed = false;
                                    group.FixMinScale = 0.5;
                                    group.FixMaxScale = 10;

                                    //图元不允许拖拽
                                    group.AllowDrag = false;
                                    //图元不允许移动
                                    group.AllowMove = false;
                                    layer.AddChildren(group);
                                }
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameWellGroupLegend:
                                if (itemObject.LegendS) {
                                    var legendNode = itemObject;
                                    var legend = new WGADPlatGraph2DFrame.WGFrameWellGroupLegend({});
                                    if (legendNode.Position) {
                                        legend.Position = legendNode.Position;
                                    }
                                    if (legendNode.CoordOffX) {
                                        legend.CoordOffX = legendNode.CoordOffX;
                                    }
                                    if (legendNode.CoordOffY) {
                                        legend.CoordOffY = legendNode.CoordOffY;
                                    }
                                    if (legendNode.SymbolSize) {
                                        legend.SymbolSize = legendNode.SymbolSize;
                                    }
                                    if (legendNode.VDistance) {
                                        legend.VDistance = legendNode.VDistance;
                                    }
                                    if (legendNode.HDistance) {
                                        legend.HDistance = legendNode.HDistance;
                                    }
                                    if (legendNode.ItemWidthFixed != undefined && !legendNode.ItemWidthFixed) {
                                        legend.ItemWidthFixed = legendNode.ItemWidthFixed;
                                    }
                                    if (legendNode.TextOffY) {
                                        legend.TextOffY = legendNode.TextOffY;
                                    }
                                    if (legendNode.Font) {
                                        if (legendNode.Font.FontName) {
                                            legend.Font.FontName = legendNode.Font.FontName;
                                        }
                                        if (legendNode.Font.FontSize) {
                                            legend.Font.FontSize = legendNode.Font.FontSize;
                                        }
                                        if (legendNode.Font.Weight) {
                                            legend.Font.Weight = legendNode.Font.Weight;
                                        }
                                        if (legendNode.Font.Color) {
                                            legend.Font.Color = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToColor(
                                                legendNode.Font,
                                                "Color"
                                            );
                                        }
                                    }
                                    for (var k = 0; k < legendNode.LegendS.length; k++) {
                                        var hLegendSNode = legendNode.LegendS[k];
                                        var hlegendS = [];
                                        for (var m = 0; m < hLegendSNode.length; m++) {
                                            var hLegendNode = hLegendSNode[m];
                                            var hLegend = [];
                                            if (hLegendNode.length < 3) {
                                                hLegend.push("null", null, null, "");
                                                hlegendS.push(hLegend);
                                                continue;
                                            }

                                            var viewPen, viewBrush;
                                            if (hLegendNode[1].PenColorA) {
                                                viewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(
                                                    hLegendNode[1]
                                                );
                                            } else {
                                                viewPen = new WGADPlatGMEngine.WGPen();
                                            }
                                            if (hLegendNode[1].ViewBrush) {
                                                viewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                                                    hLegendNode[1],
                                                    "ViewBrush"
                                                );
                                            } else {
                                                viewBrush = new WGADPlatGMEngine.WGBrush();
                                            }
                                            hLegend.push(hLegendNode[0], viewPen, viewBrush, hLegendNode[2]);
                                            hlegendS.push(hLegend);
                                        }
                                        legend.LegendS.push(hlegendS);
                                    }

                                    legend.IsFixed = false;
                                    legend.FixMinScale = 0.5;
                                    legend.FixMaxScale = 10;

                                    //图元不允许拖拽
                                    legend.AllowDrag = false;
                                    //图元不允许移动
                                    legend.AllowMove = false;
                                    layer.AddChildren(legend);
                                }
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameModel2D:
                                //生成一个数模二维的图元
                                var model2D = new WGADPlatGraph2DFrame.WGFrameModel2D({});
                                model2D.ColorList = itemObject.ColorList;
                                model2D.OneColor = 4; //默认0：一个网格4种颜色；大于0是一个颜色：1，2，3，4对应4个顶点
                                model2D.ShowGridType = 0; //默认0：:只要4个顶点中有1个及以上非空值就显示；1:4个顶点都非空值才显示
                                model2D.MaxLength = 1000;
                                model2D.Off = 2;
                                model2D.ShowGridLine = true;
                                model2D.NullValue = -9999;
                                if (Array.isArray(itemObject.GridXData)) {
                                    model2D.GridXData = itemObject.GridXData;
                                } else {
                                    model2D.GridXData = itemObject.GridXData.split(",");
                                }
                                if (Array.isArray(itemObject.GridYData)) {
                                    model2D.GridYData = itemObject.GridYData;
                                } else {
                                    model2D.GridYData = itemObject.GridYData.split(",");
                                }
                                if (Array.isArray(itemObject.ValueData)) {
                                    model2D.ValueData = itemObject.ValueData;
                                } else {
                                    model2D.ValueData = itemObject.ValueData.split(",");
                                }
                                model2D.MinValue = Number(itemObject.MinValue);
                                model2D.MaxValue = Number(itemObject.MaxValue);
                                model2D.Row = itemObject.NumX;
                                model2D.Col = itemObject.NumY;
                                if (itemObject.CoordXOff != undefined) {
                                    model2D.CoordXOff = itemObject.CoordXOff;
                                }
                                if (itemObject.CoordYOff != undefined) {
                                    model2D.CoordYOff = itemObject.CoordYOff;
                                }
                                model2D.IsShowLegend = itemObject.IsShowLegend;
                                if (itemObject.LegendTextFont) {
                                    if (itemObject.LegendTextFont.FontName) {
                                        model2D.LegendTextFont.FontName = itemObject.LegendTextFont.FontName;
                                    }
                                    if (itemObject.LegendTextFont.FontSize) {
                                        model2D.LegendTextFont.FontSize = itemObject.LegendTextFont.FontSize;
                                    }
                                    if (itemObject.LegendTextFont.Color) {
                                        var lColor = itemObject.LegendTextFont.Color;
                                        model2D.LegendTextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                            lColor[0],
                                            lColor[1],
                                            lColor[2],
                                            lColor[3]
                                        );
                                    }
                                }
                                layer.AddChildren(model2D);
                                break;
                        }
                    }
                    //如果是等值线图层，需要处理一下
                    if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline) {
                        this.DealWithIsoLineInterval(
                            layer,
                            isolinePropertyDic.BoldNum,
                            isolinePropertyDic.LabelShowNum,
                            isolinePropertyDic.BoldWidth,
                            isolinePropertyDic.LableShowCheck,
                            isolinePropertyDic.BoldCheck
                        );
                    }
                }
                if (comSelf.rangeSegY != null) {
                    comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = comSelf.SelectSeismicLine;
                }
            }

            this.OuntEarthBound.initial(data.MinXMap, data.MaxYMap, data.MaxXMap, data.MinYMap);
            this.View.MapData.UpdateTransform();
            this.View.MapData.SetChanged(true);
            this.View.Repaint();
            //增加回调方法,视图加载完之后，图层管理等界面刷新
            if (comSelf.AfterShowView != null) {
                comSelf.AfterShowView();
            }
        };

        //井组或者井位定位
        this.SearchObjByID = function (id) {
            var obj;
            //找通用图层
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                if (this.View.MapData.LayerList[i].Childrens) {
                    for (var j = 0; j < this.View.MapData.LayerList[i].Childrens.length; j++) {
                        var wellGroup = this.View.MapData.LayerList[i].Childrens[j];
                        if (wellGroup != null) {
                            if (wellGroup.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWellGroup) {
                                if (wellGroup.GroupName == id) {
                                    obj = wellGroup;
                                    break;
                                }
                            } else if (wellGroup.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                                if (wellGroup.WellName == id) {
                                    obj = wellGroup;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (obj) {
                    break;
                }
            }

            if (obj) {
                //获取obj的中心点
                var x = 0.5 * (obj.GetBoundRect().Left + obj.GetBoundRect().Right);
                var y = 0.5 * (obj.GetBoundRect().Top + obj.GetBoundRect().Bottom);
                //工作区矩形
                var rect = new WGADPlatGMEngine.WGRect();
                rect.Left = this.View.m_clientRect.Left;
                rect.Top = this.View.m_clientRect.Top;
                rect.Right = this.View.m_clientRect.Right;
                rect.Bottom = this.View.m_clientRect.Bottom;
                //工作区中心
                var dvClientCenterX = 0.5 * (rect.Left + rect.Right);
                var dvClientCenterY = 0.5 * (rect.Top + rect.Bottom);

                var dvCenterX = this.View.MapData.Transform.EarthToView(x, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
                var dvCenterY = this.View.MapData.Transform.EarthToView(y, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
                this.View.ScrollView(dvClientCenterX - dvCenterX, dvClientCenterY - dvCenterY);
                this.View.MapData.UpdateTransform();
                this.View.Repaint();
            }
        };

        //增加指北针
        this.DrawNorth = function (layer) {
            //默认放在视图的中间位置；高度宽度设置为2:3
            var rect = new WGADPlatGMEngine.WGRect();
            var mapRect = this.View.MapData.EarthRect;
            var cx = (mapRect.Left + mapRect.Right) / 2;
            var cy = (mapRect.Top + mapRect.Bottom) / 2;
            var height = 440;
            var width = 320;
            rect.initial(cx - width, cy + height, cx + width, cy - height);
            var obj = new WGADPlatGraph2D.WGGeoLegend(rect);
            layer.AddChildren(obj);
            obj.ObjName = "图例";
            obj.ShowText = false;
            obj.ShowBorder = false;
            url = WGADPlatConfig.symbolDataPath + "130/zbz.json";
            GetSymbol(obj, "Symbol", "zbz", url, symbolData);
            this.View.Repaint();
        };

        //绘制含油面积-地震综合评价：含油面积图层必须处于编辑状态，才能绘制
        this.DrawOilArea = function () {
            var layer = this.View.MapData.GetActivateLayer();
            if (layer && layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ) {
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawIsoLineFill);
                return true;
            } else {
                return false;
            }
        };
        //绘制流线
        this.DrawFlowLine = function () {
            var layer = this.View.MapData.GetActivateLayer();
            if (layer && layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawFlowLine);
                return true;
            } else {
                return false;
            }
        };
        //获取等值线，修改属性
        this.SelectIsoLine = function (value, layerName, pro) {
            //如果不存在此等值线图层，则返回false
            var layer = null;
            var result = false;
            for (var iLayer = 0; iLayer < this.View.MapData.LayerList.length; iLayer++) {
                if (this.View.MapData.LayerList[iLayer].LayerName == layerName) {
                    layer = this.View.MapData.LayerList[iLayer];
                    break;
                }
            }
            if (layer) {
                //遍历所有等值线,赋值
                for (var i = layer.GetChildrenCount() - 1; i > -1; i--) {
                    var line = layer.GetChildrenByIndex(i);
                    if (line != null && line instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                        var curValue = Number(line.ValueText);
                        if (Math.abs(value - curValue) < 1e-6) {
                            SetViewPen(line.ViewPen, {
                                PenColorA: pro.Color[0],
                                PenColorR: pro.Color[1],
                                PenColorG: pro.Color[2],
                                PenColorB: pro.Color[3],
                                PenWidth: pro.LineWidth
                            });
                            result = true;
                        }
                    }
                }
            }

            if (result) {
                this.View.Repaint();
            }
            return result;
        };

        //删除等值线
        this.DelIsoLine = function (value, layer) {
            for (var i = layer.GetChildrenCount() - 1; i > -1; i--) {
                var line = layer.GetChildrenByIndex(i);
                if (line != null && line instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                    var curValue = Number(line.ValueText);
                    if (Math.abs(value - curValue) < 1e-6) {
                        layer.RemoveChildren(line);
                    }
                }
            }
            this.View.Repaint();
        };
        function GetCurveDepthList(start, end, step) {
            var result = [];
            for (var i = 0; i < (end - start) / step + 1; i++) {
                result.push(start + i * step);
            }
            return result;
        }
        //画笔赋值
        function SetViewPen(pen, data) {
            if (data && pen) {
                if (data.PenColorA) {
                    pen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                        data.PenColorA,
                        data.PenColorR,
                        data.PenColorG,
                        data.PenColorB
                    );
                }

                if (data.PenWidth != undefined) {
                    pen.PenWidth = data.PenWidth;
                }
                if (data.PenDashStyle != undefined) {
                    pen.PenDashStyle = data.PenDashStyle;
                }
            }
        }
        //画刷赋值
        function SetViewBrush(brush, data) {
            if (data && brush) {
                if (data.BrushColorA != undefined) {
                    brush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                        data.BrushColorA,
                        data.BrushColorR,
                        data.BrushColorG,
                        data.BrushColorB
                    );
                }
                if (data.FillStyle != undefined) {
                    brush.FillStyle = data.FillStyle;
                }
            }
        }
        this.LoadFrameData = function (data) {
            this.View.MapData.JsonObjLoad(data);
            this.View.MapData.UpdateTransform();
            this.View.Repaint();
            //增加回调方法,视图加载完之后，图层管理等界面刷新
            if (comSelf.AfterLoadFrameData != null) {
                comSelf.AfterLoadFrameData();
            }
        };
        this.ApplyWellTemplate = function (data, type) {
            var wellJson = data;
            if (wellJson != null) {
                var wellObj = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonObjReturnObject(wellJson);
                var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
                if (layer != null && wellObj != null) {
                    for (var i = 0; i < layer.GetChildrenCount(); i++) {
                        var well = layer.GetChildrenByIndex(i);
                        if (type == 0) {
                            //全部井
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                well.RemoveAllChildrens();
                                well.CopyFromTemplet(wellObj);
                            }
                        } else if (type == 1) {
                            //选中井
                            //var wellSelect=this.View.HiteResult.SelectObjs;
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                if (well.Selected) {
                                    well.RemoveAllChildrens();
                                    well.CopyFromTemplet(wellObj);
                                }
                            }
                        } else if (type == 2) {
                            //同种井别
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                if (well.WellType == wellObj.WellType) {
                                    well.RemoveAllChildrens();
                                    well.CopyFromTemplet(wellObj);
                                }
                            }
                        } else if (type == 3) {
                            //同种解释
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                if (well.WellJsjg == wellObj.WellJsjg) {
                                    well.RemoveAllChildrens();
                                    well.CopyFromTemplet(wellObj);
                                }
                            }
                        }
                    }
                    layer.SetDataChanged(true);
                    this.View.Repaint();
                }
            }
        };

        //新增图层-新增后是可见可编辑的(图层名称，图层类别，map中处于编辑激活状态的图层最多只有一个)
        this.AddLayer = function (layerName, layerType, activeOne) {
            //如果activeOne = true，已经存在过的图层都设置为非编辑激活状态
            var layer = new WGADPlatGraph2DFrame.WGFrameLayer({});
            layer.LayerName = layerName;
            layer.LayerType = layerType;
            this.View.MapData.AddLayer(layer);
            if (activeOne) {
                this.View.MapData.SetActivateLayer(layer, true);
            } else {
                layer.Actived = true;
            }
            //增加回调方法,新图层加载完之后，图层管理等界面刷新
            if (comSelf.AfterAddLayer != null) {
                comSelf.AfterAddLayer();
            }
        };

        this.SetViewSetting = function (setting) {
            this.View.CanvasID = setting.CanvasID;
            this.View.CanvasStyle = setting.CanvasStyle;
        };
        //设置图形范围
        this.SetMapArea = function (left, top, right, bottom) {
            this.View.MapData.SetEarthArea(left, top, right, bottom);
        };

        //设置图形比例
        this.SetMapScale = function (scaleX, scaleY) {
            this.View.MapData.SetMapToEarthScale(scaleX, scaleY);
        };

        //图形显示比例
        this.SetViewScale = function (scale) {
            this.View.MapData.ViewScale = scale;
            this.View.MapData.UpdateTransform();
            this.View.Repaint();
        };
        this.SetLayerActive = function (layer, isActive) {
            this.View.MapData.SetActivateLayer(layer, isActive);
        };
        //通过图层Id设置图层激活（图层激活时，其他图层都设为非激活；图层非激活时，其他图层不改变）
        this.SetLayerActiveByID = function (layerId, isActive) {
            if (isActive) {
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    var oLayer = this.View.MapData.LayerList[i];
                    if (oLayer.ObjID == layerId) {
                        oLayer.Actived = isActive;
                    } else {
                        oLayer.Actived = !isActive;
                    }
                }
            } else {
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    var oLayer = this.View.MapData.LayerList[i];
                    if (oLayer.ObjID == layerId) {
                        oLayer.Actived = isActive;
                        break;
                    }
                }
            }
        };
        //通过图层名称设置图层激活（图层激活时，其他图层都设为非激活；图层非激活时，其他图层不改变）
        this.SetLayerActiveByName = function (layerName, isActive) {
            if (isActive) {
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    var oLayer = this.View.MapData.LayerList[i];
                    if (oLayer.LayerName == layerName) {
                        oLayer.Actived = isActive;
                    } else {
                        oLayer.Actived = !isActive;
                    }
                }
            } else {
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    var oLayer = this.View.MapData.LayerList[i];
                    if (oLayer.LayerName == layerName) {
                        oLayer.Actived = isActive;
                        break;
                    }
                }
            }
        };
        //图形列表可点击
        this.SetLayerActiveByLayerId = function (layerId, isActive) {
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.ObjID == layerId) {
                    if (layer.Actived == false && isActive == true) {
                        for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                            this.View.MapData.LayerList[i].Actived = false;
                        }
                        layer.Actived = true;
                        layer["Activeds"] = true; //此处给一个默认值为当前单独激活的哪一个图层。用作绘制等值线 剪灭线等应用
                        break;
                    } else {
                        layer["Activeds"] = true; //此处给一个默认值为当前单独激活的哪一个图层。用作绘制等值线 剪灭线等应用
                    }
                } else {
                    this.View.MapData.LayerList[i].Actived = !this.View.MapData.LayerList[i].Actived;
                    this.View.MapData.LayerList[i]["Activeds"] = false;
                }
            }
            let ActiveCount = 0;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.Actived == true) {
                    ActiveCount = ActiveCount + 1;
                }
            }
            if (ActiveCount > 1) {
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    var layer = this.View.MapData.LayerList[i];
                    layer["Activeds"] = false;
                }
            }
        };
        //返回所有含油面积
        this.GetOilAreaList = function () {
            //按顺序返回所有含油面积图层上面的所有面积图元
            var oilAreaList = [];
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.LayerType == 7) {
                    for (var j = 0; j < layer.GetChildrenCount(); j++) {
                        var fill = layer.GetChildrenByIndex(j);
                        if (fill != null && fill.ObjType == 132) {
                            //点列
                            var strDot = "";
                            for (var k = 0; k < fill.Points.length / 3; k++) {
                                strDot = strDot + fill.Points[k * 3] + ",";
                                strDot = strDot + fill.Points[k * 3 + 1];
                                if (k != fill.Points.length / 3 - 1) {
                                    strDot = strDot + ",";
                                }
                            }
                            oilAreaList.push([
                                layer.ObjID,
                                layer.LayerName,
                                fill.ObjID,
                                fill.IsolineFillName,
                                fill.Area,
                                fill.AreaPly,
                                fill.Volume,
                                strDot
                            ]);
                        }
                    }
                }
            }
            return oilAreaList;
        };

        //通过图层id和含油面积图元id，更新体积和厚度
        this.UpdateOilArea = function (layerId, objId, volume, areaPly) {
            var fill = this.GetOilArea(layerId, objId);
            if (fill) {
                fill.Volume = volume;
                fill.AreaPly = areaPly;
            }
        };
        //通过图层name和含油面积图元id，更新体积和厚度
        this.UpdateOilAreaByLayerName = function (layerName, objId, volume, areaPly) {
            var fill = this.GetOilAreaByLayerName(layerName, objId);
            if (fill) {
                fill.Volume = volume;
                fill.AreaPly = areaPly;
            }
        };

        //通过图层id和含油面积图元id，更新体积
        this.GetOilArea = function (layerId, objId) {
            var fill = null;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.ObjID == layerId) {
                    for (var j = 0; j < layer.GetChildrenCount(); j++) {
                        var obj = layer.GetChildrenByIndex(j);
                        if (obj.ObjID == objId) {
                            fill = obj;
                            break;
                        }
                    }
                }
                if (fill) {
                    break;
                }
            }
            return fill;
        };
        //通过图层name和含油面积图元id，更新体积
        this.GetOilAreaByLayerName = function (layerName, objId) {
            var fill = null;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.LayerName == layerName) {
                    for (var j = 0; j < layer.GetChildrenCount(); j++) {
                        var obj = layer.GetChildrenByIndex(j);
                        if (obj.ObjID == objId) {
                            fill = obj;
                            break;
                        }
                    }
                }
                if (fill) {
                    break;
                }
            }
            return fill;
        };

        //通过图层id和含油面积图元id,删除含含油面积图元
        this.RemoveOilAreaByLayerId = function (layerId, objId) {
            var find = false;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.ObjID == layerId) {
                    for (var j = 0; j < layer.GetChildrenCount(); j++) {
                        var fill = layer.GetChildrenByIndex(j);
                        if (fill.ObjID == objId) {
                            layer.Childrens.splice(j, 1);
                            find = true;
                            break;
                        }
                    }
                }
            }
            if (find) {
                this.View.Repaint();
            }
        };
        //通过图层name和含油面积图元id,删除含含油面积图元
        this.RemoveOilAreaByLayerName = function (layerName, objId) {
            var find = false;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.LayerName == layerName) {
                    for (var j = 0; j < layer.GetChildrenCount(); j++) {
                        var fill = layer.GetChildrenByIndex(j);
                        if (fill.ObjID == objId) {
                            layer.Childrens.splice(j, 1);
                            find = true;
                            break;
                        }
                    }
                }
            }
            if (find) {
                this.View.Repaint();
            }
        };
        //按顺序返回当前视图中的所有图层的id、图层名称、是否激活、是否显示
        this.GetLayerList = function () {
            var layerList = [];
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                layerList.push([layer.ObjID, layer.LayerName, layer.Actived, !layer.Hidden]);
            }
            return layerList;
        };

        //根据图层id，含油面积图元id，获取到含油面积信息

        //返回同样图层类型的图层列表
        this.GetLayerListByLayerType = function (layerType) {
            var layerList = [];
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.LayerType == layerType) {
                    layerList.push([layer.ObjID, layer.LayerName, layer.Actived, !layer.Hidden]);
                }
            }
            return layerList;
        };
        //图形列表 显示 隐藏
        this.handleCheckChange = function (layerId, isActive) {
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                if (this.View.MapData.LayerList[i].ObjID == layerId) {
                    this.View.MapData.LayerList[i].Hidden = !isActive;
                    this.View.MapData.LayerList[i].Display = isActive;
                    this.View.Repaint();
                    break;
                }
            }
        };
        //图层显示隐藏
        this.SetLayerDisplay = function (layer, isDisplay) {
            this.View.MapData.SetDisplayLayer(layer, isDisplay);
        };
        //通过图层id设置图层显示隐藏
        this.SetLayerDisplayByID = function (layerId, isDisplay) {
            this.handleCheckChange(layerId, isDisplay);
        };
        //通过图层名称设置图层显示隐藏
        this.SetLayerDisplayByName = function (layerName, isDisplay) {
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                if (this.View.MapData.LayerList[i].LayerName == layerName) {
                    this.View.MapData.LayerList[i].Hidden = !isDisplay;
                    this.View.MapData.LayerList[i].Display = isDisplay;
                    this.View.Repaint();
                    break;
                }
            }
        };

        //重命名
        this.SetLayerName = function (oldName, newName) {
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                if (this.View.MapData.LayerList[i].LayerName == oldName) {
                    this.View.MapData.LayerList[i].LayerName = newName;
                    this.View.Repaint();
                    break;
                }
            }
        };
        //重命名
        this.SetLayerNameByID = function (layerId, newName) {
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                if (this.View.MapData.LayerList[i].ObjID == layerId) {
                    this.View.MapData.LayerList[i].LayerName = newName;
                    this.View.Repaint();
                    break;
                }
            }
        };
        this.GetSelectObjFromMap = function () {
            this.SelectedObj = this.View.HiteResult.SelectObjs;
            return SelectedObj;
        };
        /// <summary>
        /// 东西走向井斜显示
        /// </summary>
        /// <param name="TrackData"></param>
        /// <param name="MinX"></param>
        /// <param name="MaxX"></param>
        /// <param name="curveData"></param>
        /// <returns></returns>
        var MakeXToY = function (trackData) {
            var MinX = 1e9;
            var MaxX = -1e9;
            var MinY = 1e9;
            var MaxY = -1e9;
            if (trackData == null || trackData.length < 1) {
                return null;
            }

            var curveData = [];

            var iCount = trackData.length;
            var x = 0;
            var y = 0;
            for (var i = 0; i < iCount; i++) {
                x = trackData[i].DXWY;
                y = trackData[i].NBWY;
                if (MinX > x) {
                    MinX = x;
                }

                if (MaxX < x) {
                    MaxX = x;
                }

                if (MinY > y) {
                    MinY = y;
                }

                if (MaxY < y) {
                    MaxY = y;
                }

                var point = {};
                point.X = x;
                point.Y = y;
                curveData.push(point);
            }

            var result = {};
            result.MinX = MinX;
            result.MaxX = MaxX;
            result.MinY = MinY;
            result.MaxY = MaxY;
            result.CurveData = curveData;

            var arc = new WGADPlatGraph2D.WGGeoArc({});
            arc.ArcCenterX = 0;

            return result;
        };
        //全图显示
        this.ZoomAll = function (offx, offy) {
            var width = this.View.MapCanvas.width;
            var height = this.View.MapCanvas.height;
            this.View.MapData.ZoomAll(width, height, offx, offy);
            this.View.Repaint();
            //console.log(this.View.MapData.ViewScale);
        };

        //如果有底图，以底图范围来求缩放系数
        this.ZoomPicture = function () {
            this.View.MapData.ZoomPicture();
            this.View.Repaint();
        };

        //清空view
        this.ClearView = function (i) {
            if (this.View.MapData.GetActivateLayer()) {
                this.View.MapData.GetActivateLayer().RemoveAllChildrens();
                //this.View.ScrollView(this.View.HScrollValue, this.View.VScrollValue);
            }
        };

        //数模二维图中网格线是否显示
        this.SetModel2DShowGridLine = function (showGridLine) {
            var model2DLayer = null;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltModel2D) {
                    model2DLayer = layer;
                    break;
                }
            }
            if (model2DLayer) {
                for (var i = 0; i < model2DLayer.Childrens.length; i++) {
                    model2DLayer.Childrens[i].ShowGridLine = showGridLine;
                }
                this.View.Repaint();
            }
        };
        //记录标签显示情况
        this.GetWellLabelInfoAndHide = function () {
            var infos = [];
            var wells = this.GetWell();
            for (var i = 0; i < wells.length; i++) {
                var well = wells[i];
                var info = [];
                for (var j = 0; j < well.Childrens.length; j++) {
                    var label = well.Childrens[j];
                    if (label instanceof WGADPlatGraph2DFrame.WGFrameWellLabelText) {
                        info.push(label.Hidden);
                        label.Hidden = true;
                    } else {
                        info.push(null);
                    }
                }
                infos.push([well.WellName, info]);
            }
            return infos;
        };

        //恢复标签显示情况
        this.SetWellLabelInfo = function (infos) {
            var wells = this.GetWell();
            for (var i = 0; i < wells.length; i++) {
                var well = wells[i];
                var info = null;
                for (var j = infos.length - 1; j > -1; j--) {
                    if (infos[j][0] == well.WellName) {
                        info = infos[j][1];
                        infos.splice(j, 1);
                        break;
                    }
                }
                if (!info) {
                    continue;
                }
                for (var j = 0; j < well.Childrens.length; j++) {
                    var label = well.Childrens[j];
                    if (info != null && label instanceof WGADPlatGraph2DFrame.WGFrameWellLabelText) {
                        label.Hidden = info[j];
                    }
                }
            }
            this.View.Repaint();
        };
        //隐藏流线/显示/删除流线
        this.HandleFlowLine = function (centerWellName, wellName, operation) {
            var lines = this.GetFlowLine(centerWellName, wellName);
            for (var i = 0; i < lines.length; i++) {
                var obj = lines[i];
                if (operation == "hide") {
                    obj.Hidden = true;
                } else if (operation == "show") {
                    obj.Hidden = false;
                } else if (operation == "delete") {
                    obj.Parent.RemoveChildren(obj);
                }
            }

            if (lines.length > 0) {
                lines[0].Parent.Parent.DealWithFlowLine();
                this.View.Repaint();
            }
        };

        //获取流线
        this.GetFlowLine = function (centerWellName, wellName) {
            var wellLayer = this.GetWellLayer();
            if (!wellLayer) {
                return [];
            }
            var lines = [];
            var wells = this.GetWell(centerWellName);
            for (var i = 0; i < wells.length; i++) {
                //遍历所有流线
                for (var j = wells[i].Childrens.length - 1; j > -1; j--) {
                    var obj = wells[i].Childrens[j];
                    var find = false;
                    if (obj instanceof WGADPlatGraph2DFrame.WGFrameFlowLine) {
                        if (wellName) {
                            if (Array.isArray(wellName)) {
                                if (wellName.indexOf(obj.WellName) > -1) {
                                    find = true;
                                }
                            } else if (obj.WellName == wellName) {
                                find = true;
                            }
                        } else {
                            //如果名称不设置，则不限制这个条件
                            find = true;
                        }
                    }
                    if (find) {
                        lines.push(obj);
                    }
                }
            }
            return lines;
        };
        //显示井
        this.DisplayWell = function (wellName, display) {
            var wells = this.GetWell(wellName);
            for (var i = 0; i < wells.length; i++) {
                wells[i].Hidden = !display;
                wells[i].Display = display;
            }
            this.View.Repaint();
        };
        this.GetWellLayer = function () {
            var wellLayer = null;
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                var layer = this.View.MapData.LayerList[i];
                if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                    wellLayer = layer;
                    break;
                }
            }
            return wellLayer;
        };
        //根据井名获取井
        this.GetWell = function (wellName) {
            var wells = [];
            var wellLayer = this.GetWellLayer();
            if (!wellLayer) {
                return wells;
            }

            for (var i = 0; i < wellLayer.GetChildrenCount(); i++) {
                var obj = wellLayer.GetChildrenByIndex(i);
                if (obj instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                    if (wellName) {
                        if (Array.isArray(wellName)) {
                            if (wellName.indexOf(obj.WellName) > -1) {
                                wells.push(obj);
                            }
                        } else if (obj.WellName == wellName) {
                            wells.push(obj);
                        }
                    } else {
                        //如果名称不设置，则不限制这个条件
                        wells.push(obj);
                    }
                }
            }
            return wells;
        };
        //根据井名获取井
        this.GetAllFlowLine = function (wellName) {
            var infos = [];
            var wells = this.GetWell(wellName);
            for (var i = 0; i < wells.length; i++) {
                var well = wells[i];
                var info = [];
                for (var j = 0; j < well.Childrens.length; j++) {
                    var line = well.Childrens[j];
                    if (line instanceof WGADPlatGraph2DFrame.WGFrameFlowLine) {
                        info.push(line);
                    }
                }
                if (info.length > 0) {
                    infos.push([well.WellName, info]);
                }
            }
            return infos;
        };

        this.ShowLayerList = function () {
            if (this.LayerList.isShow) {
                this.LayerList.Hide();
            } else {
                this.LayerList.Show(this.View);
            }
        };

        //所有图元范围导出
        this.SaveToPng = function () {
            // var p = this.View.toPngDataURL(0, 0);

            var p = this.View.MapData.toPngDataURLFitAll();
            //删除字符串前的提示信息 "data:image/png;base64,"
            var b64 = p.substring(22);
            console.log(b64);
            var filename = new Date().toLocaleDateString() + "." + "png";

            downloadFile(filename, p);
            //return b64;
        };
        //底图范围导出
        this.SaveToPngPicture = function () {
            var p = this.View.MapData.toPngDataURLPicture(0, 0);
            //删除字符串前的提示信息 "data:image/png;base64,"
            var b64 = p.substring(22);
            console.log(b64);
            var filename = new Date().toLocaleDateString() + "." + "png";

            downloadFile(filename, p);
        };
        this.SaveToPngPictureStr = function () {
            var p = this.View.MapData.toPngDataURLPicture(0, 0);
            return p;
        };
        this.SaveToBase = function () {
            var p = this.View.toPngDataURL(0, 0);
            //删除字符串前的提示信息 "data:image/png;base64,"
            var b64 = p.substring(22);
            console.log(b64);
            return b64;
        };

        function downloadFile(fileName, content) {
            var blob = dataURLtoBlob(content);
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                // var imgUri = content.replace("image/png", "image/octet-stream"); // 获取生成的图片的url
                // var saveLink = document.createElement( 'a');
                // saveLink.href =imgUri;
                // saveLink.download = fileName;
                // saveLink.click();

                var aLink = document.createElement("a");
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);
                aLink.click();
            }
        }

        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        }
        this.SaveMap = function () {
            var JsonObj = {};
            this.View.MapData.SaveChangedToJsonObj(JsonObj);
            // var layerList=JSON.parse(JSON.stringify(JsonObj.LayerList));
            // //后台存成json文件
            // delete JsonObj["LayerList"];
            // var  returnJson={};
            // returnJson.LayerList=layerList;
            // str.push(JSON.stringify(JsonObj));
            // str.push(JSON.stringify(returnJson));
            var str = JSON.stringify(JsonObj);
            console.log(str);
            this.View.MapData.IsChanged = false;
            return str;
        };
        this.SaveMapAllStr = function () {
            var JsonObj = {};
            WGADPlatGMEngineTools.WGJsonObjPersistence.ObjectToJsonObj(JsonObj, this.View.MapData);
            var str = JSON.stringify(JsonObj);
            return str;
        };
        this.SetColor = function (e) {
            return WGADPlatGMEngine.WGColor.FromARGB(Number(e[0]), Number(e[1]), Number(e[2]), Number(e[3]));
        };

        this.GetObjProperty = function (obj) {
            return WGADPlatGraph2D.WGObjPropertyFactory.CreateObjProperty(obj, obj.GetObjFullName());
        };
        /// <summary>
        /// 控制点击跟拖动事件
        /// </summary>
        /// <param name="flagClick">是否允许点击</param>
        /// <param name="flagDrag">是否允许拖动</param>
        this.ShowClickDragStatus = function (flagClick, flagDrag) {
            this.View.MapCanvas.style.cursor = WGADPlatGraph2D.WGActionFactory.GetActionCursor(
                WGADPlatGraph2D.EWGMapOpModel.msbMove
            );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbMove);
        };

        WGADPlatGraph2DFrame.WGFrameMap.ImageOnload = function () {
            var keys = Object.keys(WGADPlatGraph2DFrame.WGFrameMap.PictureCount.data);
            for (var i = keys.length - 1; i > -1; i--) {
                var value = WGADPlatGraph2DFrame.WGFrameMap.PictureCount.get(keys[i]);
                if (value[0] == value[1] || value[0] < value[1]) {
                    comSelf.View.RUManager.RecordCommond = false;
                    value[2].Repaint();
                    comSelf.View.RUManager.RecordCommond = true;
                    delete WGADPlatGraph2DFrame.WGFrameMap.PictureCount.data[keys[i]];
                }
            }
        };

        WGADPlatGraph2D.WGGeoPicture.ImageOnload = function () {
            var keys = Object.keys(WGADPlatGraph2D.WGGeoPicture.PictureCount.data);
            for (var i = keys.length - 1; i > -1; i--) {
                var value = WGADPlatGraph2D.WGGeoPicture.PictureCount.get(keys[i]);
                if (value[0] == value[1] || value[0] < value[1]) {
                    comSelf.View.RUManager.RecordCommond = false;
                    value[2].Repaint();
                    comSelf.View.RUManager.RecordCommond = true;
                    delete WGADPlatGraph2D.WGGeoPicture.PictureCount.data[keys[i]];
                }
            }
        };

        WGADPlatGraph2DFrame.WGFrameMap.SectionImageOnload = function () {
            comSelf.View.Repaint();
        };

        //默认的属性界面
        this.ShowPropertyForm = function (obj) {
            //先取minWin中的窗体，如果没有的话，取默认的属性
            if (obj != null) {
                var pro = WGADPlatGraph2D.WGObjPropertyFactory.CreateObjProperty(obj, obj.GetObjFullName());
                if (pro) {
                    //显示图元属性窗口
                    comSelf.PropertyPanel.Show(pro, comSelf.View, "panel");
                }
            }
        };
        this.View.EventObjectDoubleClick = function (event) {
            var obj = event.HiteObj;
            comSelf.SelectedObj = event.HiteObj;
            if (obj != null) {
                event.HiteObj.Selected = true;
                if (WGADPlatConfig.propertyFormStyle == "0") {
                    //如果是图片图元的话，因为涉及到图片的选择，上传，所以调用外面的界面
                    //图元id
                    if (obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtPicture) {
                    } else {
                        comSelf.ShowPropertyForm(obj);
                        return;
                    }
                }

                comSelf.EventMidWinOk = function (e) {
                    var objs = [];
                    if (e.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                        if (e.checkedProperties.length > 0) {
                            if (e.batchSetType == "allWell") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var frameWell = e.Parent.Childrens[j];
                                    if (frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                                        objs.push(frameWell);
                                        setWellProperty(e, frameWell);
                                        frameWell.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "sameWellType") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var frameWell = e.Parent.Childrens[j];
                                    if (
                                        frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell &&
                                        frameWell.WellType == e.WellType
                                    ) {
                                        objs.push(frameWell);
                                        setWellProperty(e, frameWell);
                                        frameWell.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "sameJsjg") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var frameWell = e.Parent.Childrens[j];
                                    if (
                                        frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell &&
                                        frameWell.WellJsjg == e.WellJsjg
                                    ) {
                                        objs.push(frameWell);
                                        setWellProperty(e, frameWell);
                                        frameWell.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "selWell") {
                                if (
                                    comSelf.View.HiteResult.SelectObjs &&
                                    comSelf.View.HiteResult.SelectObjs.length > 0
                                ) {
                                    for (var j = 0; j < comSelf.View.HiteResult.SelectObjs.length; j++) {
                                        var frameWell = comSelf.View.HiteResult.SelectObjs[j];
                                        if (frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                                            objs.push(frameWell);
                                            setWellProperty(e, frameWell);
                                            frameWell.SetDataChanged(true);
                                        }
                                    }
                                } else {
                                    objs.push(e);
                                    e.SetDataChanged(true);
                                }
                            } else {
                                objs.push(e);
                                e.SetDataChanged(true);
                            }
                        } else {
                            objs.push(e);
                            e.SetDataChanged(true);
                        }
                    } else if (e.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline) {
                        if (e.checkedProperties.length > 0) {
                            if (e.batchSetType == "allWell") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var breakLine = e.Parent.Childrens[j];
                                    if (breakLine.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline) {
                                        setBreakLineProperty(e, breakLine);
                                        breakLine.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "sameJsjg") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var breakLine = e.Parent.Childrens[j];
                                    if (
                                        breakLine.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline &&
                                        breakLine.BreakLineUpDown == e.BreakLineUpDown
                                    ) {
                                        setBreakLineProperty(e, breakLine);
                                        breakLine.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "selWell") {
                                if (
                                    comSelf.View.HiteResult.SelectObjs &&
                                    comSelf.View.HiteResult.SelectObjs.length > 0
                                ) {
                                    for (var j = 0; j < comSelf.View.HiteResult.SelectObjs.length; j++) {
                                        var breakLine = comSelf.View.HiteResult.SelectObjs[j];
                                        if (breakLine.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline) {
                                            setBreakLineProperty(e, breakLine);
                                            breakLine.SetDataChanged(true);
                                        }
                                    }
                                } else {
                                    e.SetDataChanged(true);
                                }
                            } else {
                                e.SetDataChanged(true);
                            }
                        } else {
                            e.SetDataChanged(true);
                        }
                    } else if (e.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLineFill) {
                        if (e.checkedProperties.length > 0) {
                            if (e.batchSetType == "allWell") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var fill = e.Parent.Childrens[j];
                                    if (fill.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLineFill) {
                                        objs.push(fill);
                                        setIsoLineFillProperty(e, fill);
                                        fill.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "selWell") {
                                if (
                                    comSelf.View.HiteResult.SelectObjs &&
                                    comSelf.View.HiteResult.SelectObjs.length > 0
                                ) {
                                    for (var j = 0; j < comSelf.View.HiteResult.SelectObjs.length; j++) {
                                        var fill = comSelf.View.HiteResult.SelectObjs[j];
                                        if (fill.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLineFill) {
                                            objs.push(fill);
                                            setIsoLineFillProperty(e, fill);
                                            fill.SetDataChanged(true);
                                        }
                                    }
                                } else {
                                    objs.push(e);
                                    e.SetDataChanged(true);
                                }
                            } else {
                                objs.push(e);
                                e.SetDataChanged(true);
                            }
                        } else {
                            objs.push(e);
                            e.SetDataChanged(true);
                        }
                    } else if (e.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube) {
                        if (e.checkedProperties.length > 0) {
                            if (e.batchSetType == "allWell") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var log = e.Parent.Childrens[j];
                                    if (log.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube) {
                                        setLogProperty(e, log);
                                        log.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "sameJsjg") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var log = e.Parent.Childrens[j];
                                    if (
                                        log.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube &&
                                        log.WellJsjg == e.WellJsjg
                                    ) {
                                        setLogProperty(e, log);
                                        log.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "selWell") {
                                if (
                                    comSelf.View.HiteResult.SelectObjs &&
                                    comSelf.View.HiteResult.SelectObjs.length > 0
                                ) {
                                    for (var j = 0; j < comSelf.View.HiteResult.SelectObjs.length; j++) {
                                        var log = comSelf.View.HiteResult.SelectObjs[j];
                                        if (log.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube) {
                                            setLogProperty(e, log);
                                            log.SetDataChanged(true);
                                        }
                                    }
                                } else {
                                    e.SetDataChanged(true);
                                }
                            } else {
                                e.SetDataChanged(true);
                            }
                        } else {
                            e.SetDataChanged(true);
                        }
                    } else if (e.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameFlowLine) {
                        if (e.checkedProperties.length > 0) {
                            if (e.batchSetType == "allWell") {
                                for (var j = 0; j < e.Parent.Parent.Childrens.length; j++) {
                                    for (var k = 0; k < e.Parent.Parent.Childrens[j].Childrens.length; k++) {
                                        var log = e.Parent.Parent.Childrens[j].Childrens[k];
                                        if (log.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameFlowLine) {
                                            setFlowLineProperty(e, log);
                                            log.SetDataChanged(true);
                                        }
                                    }
                                }
                            } else if (e.batchSetType == "sameWell") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var log = e.Parent.Childrens[j];
                                    if (log.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameFlowLine) {
                                        setFlowLineProperty(e, log);
                                        log.SetDataChanged(true);
                                    }
                                }
                            } else if (e.batchSetType == "selWell") {
                                if (
                                    comSelf.View.HiteResult.SelectObjs &&
                                    comSelf.View.HiteResult.SelectObjs.length > 0
                                ) {
                                    for (var j = 0; j < comSelf.View.HiteResult.SelectObjs.length; j++) {
                                        var log = comSelf.View.HiteResult.SelectObjs[j];
                                        if (log.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameFlowLine) {
                                            setFlowLineProperty(e, log);
                                            log.SetDataChanged(true);
                                        }
                                    }
                                } else {
                                    e.SetDataChanged(true);
                                }
                            } else {
                                e.SetDataChanged(true);
                            }
                        } else {
                            e.SetDataChanged(true);
                        }
                        e.Parent.Parent.DealWithFlowLine();
                    } else {
                        e.SetDataChanged(true);
                    }
                    comSelf.View.Repaint();
                    //属性修改后回调
                    if (comSelf.ModifyProperty != null) {
                        comSelf.ModifyProperty(e.ObjType, objs);
                    }
                };
                switch (obj.ObjType) {
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine: {
                        //趋势线
                        if (obj.Parent.LayerName == "趋势约束图层") {
                            openMidWinObjQSX("midWin", "QSX");
                        } else {
                            //等值线
                            openMidWinObjDZX();
                        }
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLineFill: {
                        //等值线填充
                        openMidWinObjIsoLineFill();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameFoulline: {
                        if (obj.FoulLineType == "203") {
                            //尖灭线
                            openMidWinObj("midWin", "JMX");
                        } else if (obj.FoulLineType == "204") {
                            //含油零线
                            openMidWinObj("midWin", "HYLX");
                        }
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameOutLine: {
                        //轮廓线
                        openMidWinObjLKX();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWellTrace: {
                        //井轨迹属性
                        openMidWinObjJgjsx();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtSText: {
                        //文字弹框
                        openMidWinObjText();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWell: {
                        //趋势点
                        if (obj.Parent.LayerName == "趋势约束图层") {
                            openMidWinObjQSD("midWin", "QSD");
                        } else {
                            //井属性
                            openMidWinObjJsx();
                        }
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWellLabelFraction: {
                        //趋势点
                        if (obj.Parent.LayerName == "趋势约束图层") {
                            openMidWinObjQSD("midWin", "QSD");
                        } else {
                            //井属性
                            openMidWinObjJsx();
                        }
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWellLabelText: {
                        //趋势点
                        if (obj.Parent.ObjName == "手绘趋势点") {
                            openMidWinObjQSD("midWin", "QSD");
                        } else {
                            //井属性
                            openMidWinObjJsx();
                        }
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameExploitation: {
                        //开采现状图
                        openMidWinObjKcxzt();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameBorder: {
                        //图框
                        openMidWinObjBorder();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameBorderText: {
                        //图框
                        openMidWinObjBorder();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameScale: {
                        //图框
                        openMidWinObjBorder();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLegend: {
                        //等值线填充图例
                        openMidWinObjLineFill();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameAlongTrack: {
                        //沿程图
                        openRouteMapImage();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube: {
                        openMidWinObjWellLog();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameFlowLine: {
                        openMidWinObjFlowLine();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline: {
                        openMidWinObjBreakLine();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtPicture: {
                        openMidWinObjPicture(obj);
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameRegionGrid: {
                        openMidWinObjRegionGrid(obj);
                        break;
                    }
                    default: {
                        openMidWinObj("midWin", obj.ObjType);
                        break;
                    }
                }
            }
        };

        function setBreakLineProperty(e, breakLine) {
            for (var i = 0; i < e.checkedProperties.length; i++) {
                var checkedProperty = e.checkedProperties[i];
                if (checkedProperty == "LineWidth") {
                    breakLine.ViewPen.PenWidth = e.ViewPen.PenWidth;
                }
                if (checkedProperty == "LineColor") {
                    breakLine.ViewPen.PenColor = e.ViewPen.PenColor.Clone();
                }
                if (checkedProperty == "Dcxlx") {
                    breakLine.BreakLineUpDown = e.BreakLineUpDown;
                }
            }
        }

        function setWellProperty(e, frameWell) {
            for (var i = 0; i < e.checkedProperties.length; i++) {
                var checkedProperty = e.checkedProperties[i];
                if (checkedProperty == "WellType") {
                    frameWell.WellType = e.WellType;
                }
                if (checkedProperty == "IsDrawSymbol") {
                    frameWell.IsDrawSymbol = e.IsDrawSymbol;
                }
                if (checkedProperty == "WellColor") {
                    frameWell.ViewPen.PenColor = e.ViewPen.PenColor.Clone();
                }
                if (checkedProperty == "WellLineWidth") {
                    frameWell.ViewPen.PenWidth = e.ViewPen.PenWidth;
                }
                if (checkedProperty == "BrushColor") {
                    frameWell.ViewBrush.Color = e.ViewBrush.Color.Clone();
                }
                if (checkedProperty == "WellSize") {
                    frameWell.WellSize = e.WellSize;
                }
                if (checkedProperty == "WellNameSize") {
                    frameWell.Childrens[0].Font.FontSize = e.Childrens[0].Font.FontSize;
                }
                if (checkedProperty == "WellNameColor") {
                    frameWell.Childrens[0].Font.Color = e.Childrens[0].Font.Color.Clone();
                }
                if (checkedProperty == "Truncate") {
                    frameWell.Truncate = e.Truncate;
                }
                if (checkedProperty == "IsFixed") {
                    frameWell.IsFixed = e.IsFixed;
                }
                if (checkedProperty == "IsUsed") {
                    frameWell.IsUsed = e.IsUsed;
                }
                if (checkedProperty == "Hidden") {
                    frameWell.Hidden = e.Hidden;
                }
                if (checkedProperty == "locationAll") {
                    frameWell.Childrens[0].OffX = e.Childrens[0].OffX;
                    frameWell.Childrens[0].OffY = e.Childrens[0].OffY;
                }
                if (checkedProperty == "locationAll") {
                    frameWell.Childrens[1].OffX = e.Childrens[1].OffX;
                    frameWell.Childrens[1].OffY = e.Childrens[1].OffY;
                }
                if (checkedProperty == "valueAll") {
                    frameWell.Childrens[0].Font = e.Childrens[0].Font.Clone();
                    frameWell.Childrens[0].Hidden = e.Childrens[0].Hidden;
                }
                if (checkedProperty == "valueAll") {
                    frameWell.Childrens[1].Font = e.Childrens[1].Font.Clone();
                    frameWell.Childrens[1].Hidden = e.Childrens[1].Hidden;
                }
            }
        }

        function setIsoLineFillProperty(e, fill) {
            for (var i = 0; i < e.checkedProperties.length; i++) {
                var checkedProperty = e.checkedProperties[i];
                if (checkedProperty == "LineWidth") {
                    fill.ViewPen.PenWidth = e.ViewPen.PenWidth;
                }
                if (checkedProperty == "LineColor") {
                    fill.ViewPen.PenColor = e.ViewPen.PenColor.Clone();
                }
                if (checkedProperty == "LineStyle") {
                    fill.ViewPen.PenDashStyle = e.ViewPen.PenDashStyle;
                }
                if (checkedProperty == "BrushColor") {
                    fill.ViewBrush.Color = e.ViewBrush.Color.Clone();
                }
            }
        }

        function setLogProperty(e, log) {
            for (var i = 0; i < e.checkedProperties.length; i++) {
                var checkedProperty = e.checkedProperties[i];
                //以_分隔开
                var proValue = checkedProperty[2];
                var pro = checkedProperty[1];
                var curveName = checkedProperty[0];
                for (var j = 0; j < log.Childrens.length; j++) {
                    var child = log.Childrens[j];
                    if (pro == "Height") {
                        child.Height = proValue;
                    }
                    if (pro == "Width") {
                        child.Width = proValue;
                    }
                    if (child.ObjType != 138) {
                        continue;
                    }
                    if (curveName != child.LogName) {
                        continue;
                    }

                    if (pro == "FillProValue") {
                        var vs = proValue.split("_");
                        //此时需要重置中间值和填充等
                        var lastZxz = child.CurveData.ZXZ;
                        var lastZdz = child.CurveData.ZDZ;
                        var zxz = vs[0];
                        if (zxz == "") {
                            zxz = lastZxz;
                        }
                        var zdz = vs[1];
                        if (zdz == "") {
                            zdz = lastZdz;
                        }
                        var lastCompare = Number(lastZxz) < Number(lastZdz) ? true : false;
                        var newCompare = Number(zxz) < Number(zdz) ? true : false;
                        //判断中间值=最大还是最小
                        var centerMin = true;
                        if (Math.abs(Number(child.CenterValue) - Number(lastZdz)) < 1e-6) {
                            centerMin = false;
                        }
                        if (lastCompare != newCompare) {
                            child.IsFillLeft = !child.IsFillLeft;
                            child.IsFillRight = !child.IsFillRight;
                        }
                        if (centerMin) {
                            child.CenterValue = zxz;
                        } else {
                            child.CenterValue = zdz;
                        }
                    }
                    if (pro == "LeftData") {
                        child.CurveData.ZXZ = proValue;
                    }
                    if (pro == "RightData") {
                        child.CurveData.ZDZ = proValue;
                    }
                    if (pro == "LineWidth") {
                        child.ViewPen.PenWidth = proValue;
                    }
                    if (pro == "LineStyle") {
                        child.ViewPen.PenDashStyle = proValue;
                    }
                    if (pro == "LineColor") {
                        child.ViewPen.PenColor = proValue.Clone();
                        child.TextFont.Color = proValue.Clone();
                        child.ValueFont.Color = proValue.Clone();
                    }
                    if (pro == "BrushColor") {
                        child.ViewBrush.Color = proValue.Clone();
                    }
                }
            }
        }
        function setFlowLineProperty(e, obj) {
            for (var i = 0; i < e.checkedProperties.length; i++) {
                var checkedProperty = e.checkedProperties[i];
                if (checkedProperty == "Value") {
                    obj.Value = e.Value;
                }
                if (checkedProperty == "FromOff") {
                    obj.FromOff = e.FromOff;
                }
                if (checkedProperty == "ToOff") {
                    obj.ToOff = e.ToOff;
                }
                if (checkedProperty == "PenColor") {
                    obj.ViewPen.PenColor = e.ViewPen.PenColor.Clone();
                }
            }
        }

        //配准结果
        this.PictureAdjustResult = function () {
            var result = {};
            result.PicMinXMap = this.View.MapData.EarthLeft;
            result.PicMaxXMap = this.View.MapData.EarthRight;
            result.PicMinYMap = this.View.MapData.EarthBottom;
            result.PicMaxYMap = this.View.MapData.EarthTop;
            var jsonResult = JSON.stringify(result);
            return jsonResult;
        };
        //图片配准
        this.PictureAdjust = function () {
            //判断是否存在底图图片，如果存在，则开启图片配准功能
            if (fView.View.MapData.Image.src && fView.View.MapData.Image.src != "") {
                $("#showAdjustFunc").window("open");
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbPictureAdjust);
            }
            comSelf.EventAdjustFuncOk = function (e) {
                //执行校正
                var result = comSelf.DoPictureAdjust(e.pointsD, e.pointsT);
                if (result) {
                    var iframe = document.getElementById("showAdjustFunc").getElementsByTagName("iframe")[0];
                    iframe.contentWindow.winClose();
                    $("#showAdjustFunc").window("close");
                    //恢复鼠标状态
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                }
            };
            comSelf.EventAdjustFuncClose = function (e) {
                //恢复鼠标状态
                $("#showAdjustFunc").window("close");
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
            };
        };
        //大地坐标D 图像坐标T
        this.DoPictureAdjust = function (pointsD, pointsT) {
            //判断大地坐标
            for (var i = 0; i < 3; i++) {
                if (
                    WGADPlatGMEngine.WGMathGeometry.PointLine(
                        pointsD[i % 3].X,
                        pointsD[i % 3].Y,
                        pointsD[(i + 1) % 3].X,
                        pointsD[(i + 1) % 3].Y,
                        pointsD[(i + 2) % 3].X,
                        pointsD[(i + 2) % 3].Y,
                        1
                    ) < 1
                ) {
                    alert("输入点的大地坐标在一条直线上，请检查!");
                    return false;
                }
            }
            for (var i = 0; i < 3; i++) {
                if (
                    WGADPlatGMEngine.WGMathGeometry.PointLine(
                        pointsT[i % 3].X,
                        pointsT[i % 3].Y,
                        pointsT[(i + 1) % 3].X,
                        pointsT[(i + 1) % 3].Y,
                        pointsT[(i + 2) % 3].X,
                        pointsT[(i + 2) % 3].Y,
                        1
                    ) < 1
                ) {
                    alert("输入点的图像坐标在一条直线上，请检查!");
                    return false;
                }
            }

            //求配准系数
            var result = WGADPlatGMEngine.WGMathGeometry.IntoVectorgraph(pointsT, pointsD);
            var a = result[0];
            var b = result[1];
            var c = result[2];
            var d = result[3];
            var e = result[4];
            var f = result[5];
            //求配准之后的坐标
            var xLeft = a * this.View.MapData.EarthLeft + b * this.View.MapData.EarthTop + e;
            var yTop = c * this.View.MapData.EarthLeft + d * this.View.MapData.EarthTop + f;
            var xRight = a * this.View.MapData.EarthRight + b * this.View.MapData.EarthBottom + e;
            var yBottom = c * this.View.MapData.EarthRight + d * this.View.MapData.EarthBottom + f;
            //更新底图范围
            this.View.MapData.EarthLeft = xLeft;
            this.View.MapData.EarthRight = xRight;
            this.View.MapData.EarthTop = yTop;
            this.View.MapData.EarthBottom = yBottom;
            this.View.MapData.PicEarthLeft = xLeft;
            this.View.MapData.PicEarthRight = xRight;
            this.View.MapData.PicEarthTop = yTop;
            this.View.MapData.PicEarthBottom = yBottom;
            this.View.MapData.UpdateTransform();
            this.View.MapData.SetChanged(true);
            this.View.Repaint();
            //全图
            this.ZoomPicture();
            return true;
        };
        //增加一行记录
        this.DoAddPostion = function (p, e) {
            var iframe = document.getElementById("showAdjustFunc").getElementsByTagName("iframe")[0];
            iframe.contentWindow.addRow(p.X, p.Y, e.X, e.Y);
        };
        this.View.EventPictureAdjust = function (p) {
            //弹出坐标输入界面
            var iframe = document.getElementById("showAdjustFunc").getElementsByTagName("iframe")[0];
            var obj = iframe.contentWindow.document.getElementById("tableContent");
            if (obj.rows.length > 3) {
                alert("已经选择三个校正点，请执行位置校正!");
                return;
            }
            $("#showAdjustPosition").window("open");
            comSelf.EventAdjustPositionOk = function (e) {
                //增加坐标到图片位置校正界面
                p.X = comSelf.View.MapData.Transform.ViewToEarth(p.X, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
                p.Y = comSelf.View.MapData.Transform.ViewToEarth(p.Y, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
                comSelf.DoAddPostion(p, e);
            };
            comSelf.EventAdjustPositionClose = function (e) {
                //恢复鼠标状态
                $("#showAdjustPosition").window("close");
            };
        };
        this.View.EventObjectSingleClick = function (event) {
            //console.log(event.HiteObj);
            comSelf.PropertyPanel.Hide();
            if (event.Event.button == WGADPlatGraph2D.MouseButtons.Right) {
                $(document).bind("contextmenu", function (e) {
                    return false;
                });
                var obj = event.HiteObj;
                if (obj == null) {
                    WGADPlatSystemTools.WGRightClickMenu(
                        "main",
                        "frameMenu",
                        "emptyMenu",
                        event.Event.layerX,
                        event.Event.layerY,
                        this,
                        "../Config"
                    );
                } else {
                    if (
                        WGADPlatGraph2D.IsBaseClass(obj, WGADPlatGraph2DFrame.WGFrameIsoLine) ||
                        WGADPlatGraph2D.IsBaseClass(obj, WGADPlatGraph2DFrame.WGFrameBreakLine) ||
                        WGADPlatGraph2D.IsBaseClass(obj, WGADPlatGraph2DFrame.WGFrameFoulline) ||
                        WGADPlatGraph2D.IsBaseClass(obj, WGADPlatGraph2DFrame.WGFrameIsoLegend) ||
                        WGADPlatGraph2D.IsBaseClass(obj, WGADPlatGraph2DFrame.WGFrameIsoLineFill)
                    ) {
                        WGADPlatSystemTools.WGRightClickMenu(
                            "main",
                            "frameMenu",
                            "propertyMenu",
                            event.Event.layerX,
                            event.Event.layerY,
                            event.HiteObj,
                            "../Config"
                        );
                    }
                    if (
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoDot ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoLine ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoPolyline ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoArc ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoRect ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoPolygon ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoCircle ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoEllipse ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoPie ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoPicture ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoSText ||
                        event.HiteObj instanceof WGADPlatGraph2D.WGGeoTable
                    ) {
                        WGADPlatSystemTools.WGRightClickMenu(
                            "main",
                            "frameMenu",
                            "objPostion",
                            event.Event.layerX,
                            event.Event.layerY,
                            event.HiteObj,
                            "../Config"
                        );
                    }
                }
                /* else {
                    if (WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DLog.WGLogObjCurve)) {
                        WGADPlatSystemTools.WGRightClickMenu("main", "logMenu", "curveProperty", event.Event.layerX, event.Event.layerY, event.HiteObj);
                    }
                    else if (WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DLog.WGLogTube)) {
                        WGADPlatSystemTools.WGRightClickMenu("main", "logMenu", "hoistwayMenu", event.Event.layerX, event.Event.layerY, event.HiteObj);
                    }
                    else if (WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DLog.WGLogTubeHead)) {
                        WGADPlatSystemTools.WGRightClickMenu("main", "logMenu", "hoistwayHeadMenu", event.Event.layerX, event.Event.layerY, event.HiteObj);
                    }
                }*/
            } else if (event.Event.button == WGADPlatGraph2D.MouseButtons.Left) {
                if (event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameSeismicCrossPLine) {
                    comSelf.SelectSeismicLine = event.HiteObj;
                    comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = comSelf.SelectSeismicLine;
                    // console.log(event.HiteObj);
                }
            }
        };

        this.View.EventNewObjectAdd = function (event) {
            comSelf.SelectedObj = event.HiteObj;
            comSelf.EventMidWinOk = function (e) {
                event.HiteObj.SetDataChanged(true);
                event.Layer.AddChildren(event.HiteObj);
                comSelf.View.Repaint();
                //return true;
            };
            if (event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                if (event.Layer.LayerName == "趋势约束图层") {
                    openMidWinObjQSX("midWin", "QSX");
                } else {
                    event.HiteObj.SetDataChanged(true);
                    event.Layer.AddChildren(event.HiteObj);
                    comSelf.View.Repaint();
                }
            } else if (event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                if (event.Layer.LayerName == "趋势约束图层") {
                    event.HiteObj.WellName = "0";
                    openMidWinObjQSD("midWin", "QSD");
                } else {
                    event.HiteObj.WellName = "井号";
                    event.HiteObj.SetDataChanged(true);
                    event.Layer.AddChildren(event.HiteObj);
                    comSelf.View.Repaint();
                }
            } else {
                event.HiteObj.SetDataChanged(true);
                event.Layer.AddChildren(event.HiteObj);
                comSelf.View.Repaint();
            }
            // var objProperty=[];
            // if(event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine)
            // {
            //     var obj=event.HiteObj;
            //     var param={};
            //     param.depth=obj.ValueText;
            //     param.lineWidth=obj.ViewPen.PenWidth;
            //     var color=obj.ViewPen.PenColor;
            //     param.lineColor=color.GetA()+","+color.GetR()+","+color.GetG()+","+color.GetB();
            //     comSelf.EventMidWinOk=function (e) {
            //         if(e.depth!=undefined)
            //         {
            //             obj.ValueText=e.depth;
            //         }
            //         if(e.lineWidth!=undefined)
            //         {
            //             obj.ViewPen.PenWidth=e.lineWidth;
            //         }
            //         if(e.lineColor!=undefined)
            //         {
            //             obj.ViewPen.PenColor=WGADPlatGMEngine.WGColor.FromARGB(Number(e.lineColor[0]),Number(e.lineColor[1]),Number(e.lineColor[2]),Number(e.lineColor[3]));
            //         }
            //         obj.SetDataChanged(true);
            //         comSelf.View.Repaint();
            //     }
            //     openMidWin("midWin","custom","DrawQSX",obj,objProperty);
            //     //$.messager.alert("type","WGFrameIsoLine")
            // }
            // else if(event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameWell)
            // {
            //     //$.messager.alert("type","WGFrameWell")
            // }
        };

        this.View.EventPLineDistance = function (event) {
            console.log(event);
            alert(event.Area.TransformData(event.MapData.Transform.GetViewToEarthMatrix()).Length() + "(M)");
        };

        this.openMidWinObj = function (divid, objtype) {
            var jsonPath = "/static/frameView/IsoFrameCom/Config/midWinConfig.json";
            $.ajax({
                url: jsonPath,
                contentType: "utf-8",
                async: false,
                dataType: "json",
                success: function (data) {
                    var baseUrl = data.baseUrl;
                    for (var i = 0; i < data.midWin.length; i++) {
                        var subitme = data.midWin[i];
                        if (subitme.objType == objtype) {
                            var title = subitme.title;
                            var url = baseUrl + subitme.url;
                            var width = subitme.width;
                            var height = subitme.height;
                            //var paramValue=GetParamValue(obj,subitme.param,objProperty);
                            $("#" + divid).window({
                                title: title,
                                width: width,
                                height: height,
                                cache: false,
                                closed: true,
                                minimizable: false,
                                maximizable: false,
                                collapsible: false,
                                content:
                                    "<iframe scrolling='auto' frameborder='0' src='" +
                                    url +
                                    "' style='width:100%; height:100%; display:block;'></iframe>",
                                modal: true
                            });
                            $("#" + divid).window("open");
                            return;
                        }
                    }
                }
            });
        };

        function openMidWinObj(divid, objtype) {
            //var jsonPath = '/static/frameView/IsoFrameCom/Config/midWinConfig.json';
            var jsonPath = WGADPlatConfig.configPath + "midWinConfig.json";
            $.ajax({
                url: jsonPath,
                contentType: "utf-8",
                async: false,
                dataType: "json",
                success: function (data) {
                    var baseUrl = data.baseUrl;
                    for (var i = 0; i < data.midWin.length; i++) {
                        var subitme = data.midWin[i];
                        if (subitme.objType == objtype) {
                            var title = subitme.title;
                            var url = baseUrl + subitme.url;
                            var width = subitme.width;
                            var height = subitme.height;
                            if (comSelf.openMidWinFun) {
                                comSelf.openMidWinFun(title, url, width, height);
                            }
                            return true;
                        }
                    }
                }
            });
            // comSelf.openMidWinFun();
        }
        function openMidWinObjQSD(divid, objtype) {
            if (comSelf.openMidWinFunQSD() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjQSX(divid, objtype) {
            if (comSelf.openMidWinFunQSX() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjWellLog(divid, objtype) {
            if (comSelf.openMidWinFunWellLog() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjFlowLine(divid, objtype) {
            if (comSelf.openMidWinFunFlowLine() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }

        function openMidWinObjBreakLine(divid, objtype) {
            if (comSelf.openMidWinFunBreakLine() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjJsx(divid, objtype) {
            if (comSelf.openMidWinFunJSX() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjText(divid, objtype) {
            if (comSelf.openMidWinFunText() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjKcxzt(divid, objtype) {
            if (comSelf.openMidWinFunKCXZT() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjBorder(divid, objtype) {
            if (comSelf.openMidWinFunBorder() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjLineFill() {
            if (comSelf.openMidWinFunLineFill() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjJgjsx(divid, objtype) {
            if (comSelf.openMidWinFunJGJSX() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjDZX(divid, objtype) {
            if (comSelf.openMidWinFunDZX() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjLKX(divid, objtype) {
            if (comSelf.openMidWinFunLKX() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openMidWinObjIsoLineFill(divid, objtype) {
            if (comSelf.openMidWinFunIsoLineFill() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }
        function openRouteMapImage() {
            if (comSelf.openMidWinFunRouteMapImage() == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }

        function openMidWinObjPicture(obj) {
            if (comSelf.openMidWinFunPicture(obj) == undefined) {
            }
        }

        function openMidWinObjRegionGrid(obj) {
            if (comSelf.openMidWinFunRegionGrid(obj) == undefined) {
                comSelf.ShowPropertyForm(comSelf.SelectedObj);
            }
        }

        function openMidWin(divid, cood, objtype, obj, objProperty) {
            var jsonPath = "../Config/midWinConfig.json";
            $.ajax({
                url: jsonPath,
                contentType: "utf-8",
                async: false,
                dataType: "json",
                success: function (data) {
                    var baseUrl = data.baseUrl;
                    for (var i = 0; i < data.midWin.length; i++) {
                        var subitme = data.midWin[i];
                        if (subitme.objType == objtype) {
                            var title = subitme.title;
                            var url = baseUrl + subitme.url;
                            var width = subitme.width;
                            var height = subitme.height;
                            var paramValue = GetParamValue(obj, subitme.param, objProperty);
                            // $("#" + divid).window({
                            //     title: title,
                            //     width: width,
                            //     height: height,
                            //     closed: false,
                            //     cache: false,
                            //     content: "<iframe scrolling='auto' frameborder='0' src='" + url + "?param=" + JSON.stringify(paramValue) + "' style='width:100%; height:100%; display:block;'></iframe>",
                            //     modal: true
                            // });
                            return;
                        }
                    }
                }
            });
        }
        function GetParamValue(obj, subitem, objProperty) {
            var returnObj = {};
            //WGADPlatGraph2D.WEGPropEditorType.pemDouble
            // WGADPlatGraph2D.WEGPropEditorType.pemLineWidth
            //WGADPlatGraph2D.WEGPropEditorType.pemColor
            //WGADPlatGraph2D.WEGPropEditorType.pemLineStyle
            //WGADPlatGraph2D.WEGPropEditorType.pemText
            //WGADPlatGraph2D.WEGPropEditorType.pemPositionType
            //WGADPlatGraph2D.WEGPropEditorType.pemSymbol
            //WGADPlatGraph2D.WEGPropEditorType.pemBool
            //WGADPlatGraph2D.WEGPropEditorType.pemFontName
            //WGADPlatGraph2D.WEGPropEditorType.pemFontSize
            //WGADPlatGraph2D.WEGPropEditorType.pemFontWeight
            //WGADPlatGraph2D.WEGPropEditorType.pemFontDirection
            //WGADPlatGraph2D.WEGPropEditorType.pemFontHAlign
            //WGADPlatGraph2D.WEGPropEditorType.pemFontVAlign
            for (var attr1 in obj) {
                if ($.isFunction(obj[attr1])) {
                    continue;
                }
                for (var attr2 in subitem) {
                    var strAttr1 = attr1;
                    var strAtrr2 = subitem[attr2].toString();
                    if (strAttr1 == strAtrr2) {
                        var tempattr = {};
                        tempattr.attrName = strAttr1;
                        if (typeof obj[attr1] == "string" || typeof obj[attr1] == "number") {
                            //字符 数字 数组
                            tempattr.attrName = attr1;
                            tempattr.value = obj[attr1];
                            tempattr.type = typeof obj[attr1];
                            objProperty.push(tempattr);
                            returnObj[attr1] = obj[attr1];
                        } else if ($.isArray(obj[attr1])) {
                            //字符 数字 数组
                            var tempattr = {};
                            tempattr.attrName = attr1;
                            tempattr.value = obj[attr1];
                            tempattr.type = "Array";
                            objProperty.push(tempattr);
                            returnObj[attr1] = obj[attr1];
                        } else if (obj[attr1] instanceof WGADPlatGMEngine.WGPen) {
                            //WGADPlatGMEngineTools.WGJsonObjPersistence.BrushToJson(this.ViewBrush, selfNode,"ViewBrush");
                            var tempJson = {};
                            WGADPlatGMEngineTools.WGJsonObjPersistence.PenToJson(obj[attr1], tempJson);
                            var tempattr = {};
                            tempattr.attrName = attr1;
                            tempattr.value = tempJson;
                            tempattr.type = WGADPlatGraph2D.WEGPropEditorType.pemColor;
                            objProperty.push(tempattr);
                            returnObj[attr1] = tempJson;
                            console.log(objProperty);
                            console.log(returnObj);
                        }
                        break;
                        //console.log(attr1+"="+obj[attr1]);
                    }
                }
            }
            return returnObj;
        }
        //封装一个方法判断数组和对象
        function isType(obj) {
            var type = Object.prototype.toString.call(obj);
            if (type == "[object Array]") {
                return "Array";
            } else if (type == "[object Object]") {
                return "Object";
            } else {
                return "param is no object type";
            }
        }
        function refreshData(data) {
            //var  redisUrl="http://192.152.2.109:7000/saveMapRedis";
            if (data) {
                fView.LoadFrameData(data.TJData);
                fView.ApplyWellTemplate(data.Template, 0);
                fView.ZoomAll();
                fView.View.MapData.SetChanged(false);
                //fView.updataRedis(redisUrl,tabID);
            }
        }

        //得到图中所有的多边形、矩形和圆；返回每个多边形或者矩形或者圆内的井号列表[[obj,wells]..]
        this.GetaAllObjAndWells = function () {
            var result = [];
            //获取激活图层上面的
            if (this.View.MapData.GetActivateLayer()) {
                var layer = this.View.MapData.GetActivateLayer();
                for (var i = 0; i < layer.GetChildrenCount(); i++) {
                    var obj = layer.GetChildrenByIndex(i);
                    if (
                        obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtPolygon ||
                        obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtCircle ||
                        obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtRect
                    ) {
                        var wells = this.GetWellsByObj(obj);
                        result.push([obj, wells]);
                    }
                }
            }
            return result;
        };
        //得到传入的多边形或者矩形或者圆内的井号列表
        this.GetWellsByObj = function (obj) {
            //获取到obj内部的井列表
            var result = [];
            //获取井图层
            var wellLayer = this.GetWellLayer();
            if (wellLayer) {
                for (var j = 0; j < wellLayer.GetChildrenCount(); j++) {
                    var well = wellLayer.GetChildrenByIndex(j);
                    //根据图元类型，获取坐标，取井图层上面的所有井，遍历是否在内部
                    if (well.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                        var x = well.CoordX;
                        var y = well.CoordY;
                        var contain = false;
                        if (obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtPolygon) {
                            contain = obj.OriginalEarthPgon.IsInPolygon(x, y, 1e-5);
                        } else if (obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtCircle) {
                            var index = obj.EarthCircle.IsInRound(x, y, 0, 1e-5);
                            if (index > -1) {
                                contain = true;
                            }
                        } else if (obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtRect) {
                            var m_pRefR = WGADPlatGMEngine.WGMathGeometry.PointWithRect(
                                x,
                                y,
                                obj.EarthRect.Left,
                                obj.EarthRect.Top,
                                obj.EarthRect.Right,
                                obj.EarthRect.Bottom,
                                1e-5
                            );
                            if (m_pRefR != WGADPlatGMEngine.EGPointWithRect.wgprOutside) {
                                contain = true;
                            }
                        }
                        if (contain) {
                            result.push(well);
                        }
                    }
                }
            }

            return result;
        };

        //右键事件
        this.RightEvent = function (arg) {};

        this.openMidWinFun = function () {};
        //断层线属性
        this.openMidWinFunBreakLine = function () {};
        //井旁曲线属性
        this.openMidWinFunWellLog = function () {};

        //流线属性
        this.openMidWinFunFlowLine = function () {};
        this.openMidWinFunText = function () {};
        this.openMidWinFunQSD = function () {};
        this.openMidWinFunLineFill = function () {};
        this.openMidWinFunIsoLineFill = function () {};
        //井属性
        this.openMidWinFunJSX = function () {};
        //井轨迹属性
        this.openMidWinFunJGJSX = function () {};
        //等值线属性
        this.openMidWinFunDZX = function () {};
        //轮廓线属性
        this.openMidWinFunLKX = function () {};
        //趋势线属性
        this.openMidWinFunQSX = function () {};
        //沿程图属性
        this.openMidWinFunRouteMapImage = function () {};
        //开采现状图
        this.openMidWinFunKCXZT = function () {};
        //边框属性
        this.openMidWinFunBorder = function () {};
        //图片属性
        this.openMidWinFunPicture = function (obj) {};
        //网格属性
        this.openMidWinFunRegionGrid = function (obj) {};
        //地质属性设置 ——加载属性数据
        this.WellDataSet = function (mapJson) {
            comSelf.View.RUManager.RecordCommond = false;
            comSelf.View.MapData.SJGL = mapJson.SJGL;
            //comSelf.View.MapData.MapID=mapJson.TJID;
            var propertyName = mapJson.PropertyName;
            var jsonLayerList = mapJson.TCData.LayerList;
            //var jsonLayerList=mapJson.LayerList;
            if (jsonLayerList.length > 0) {
                var wellLayer = null;
                var qsysLayer = null;
                for (var i = 0; i < jsonLayerList.length; i++) {
                    if (jsonLayerList[i].LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                        wellLayer = jsonLayerList[i];
                    } else if (jsonLayerList[i].LayerName == "趋势约束图层") {
                        qsysLayer = jsonLayerList[i];
                    }
                }
                var layerID = "";
                if (wellLayer != null) {
                    layerID = wellLayer.ObjID;
                }
                var layer = comSelf.View.MapData.GetLayerByID(layerID);
                if (layer != null) {
                    if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                        for (var i = 0; i < layer.GetChildrenCount(); i++) {
                            var wellObj = layer.GetChildrenByIndex(i);
                            if (wellObj instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                if (wellObj.GetChildrenCount() > 1) {
                                    var lable = wellObj.GetChildrenByIndex(1);
                                    if (lable instanceof WGADPlatGraph2DFrame.WGFrameWellLabelText) {
                                        lable.LabelCode = propertyName;
                                        lable.Hidden = false;
                                        lable.Visible = true;
                                        lable.SetDataChanged(true);
                                    }
                                }
                            }
                        }
                    }
                }
                if (qsysLayer != null) {
                    var count = comSelf.View.MapData.LayerList.length;
                    for (var i = 0; i < count; ++i) {
                        if (comSelf.View.MapData.LayerList[i].ObjID == wellLayer.ObjTag) {
                            comSelf.View.MapData.LayerList.splice(i, 1);
                            comSelf.View.Repaint();
                            break;
                        }
                    }
                    // var j={};
                    // var jlayerlist=[];
                    // jlayerlist.push(qsysLayer);
                    // j.LayerList=jlayerlist;
                    // comSelf.LoadFrameData(j);
                    // comSelf.View.MapData.SetChanged(false);
                }
                comSelf.LoadFrameData(mapJson.TCData);
                //comSelf.LoadFrameData(mapJson);
                comSelf.ZoomAll();
            }
            comSelf.View.RUManager.RecordCommond = true;
            comSelf.View.Repaint();
        };
        //设置井别，更新井圈
        this.SetWellType = function (jsonData) {
            //接收数据中的整体属性设置
            var wellDotPenDic = {};
            var wellDotBrushDic = {};
            var wellSizeDic = {};
            var wellDrawSymbolDic = {};
            var wellSymbolNameDic = {};
            if (jsonData.WellDotInfo && jsonData.WellDotInfo.length > 0) {
                //井点信息存在，根据code获取井圈的颜色等属性
                for (var index = 0; index < jsonData.WellDotInfo.length; index++) {
                    var wellDotInfo = jsonData.WellDotInfo[index];
                    if (wellDotInfo.ViewPen && wellDotInfo.WellDotTypeCode != undefined) {
                        //画笔
                        var viewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(wellDotInfo.ViewPen);
                        wellDotPenDic[wellDotInfo.WellDotTypeCode] = viewPen;
                    }
                    if (wellDotInfo.ViewBrush && wellDotInfo.WellDotTypeCode != undefined) {
                        var ViewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                            wellDotInfo,
                            "ViewBrush"
                        );
                        wellDotBrushDic[wellDotInfo.WellDotTypeCode] = ViewBrush;
                    }
                    if (wellDotInfo.WellSize && wellDotInfo.WellDotTypeCode != undefined) {
                        wellSizeDic[wellDotInfo.WellDotTypeCode] = wellDotInfo.WellSize;
                    }
                    if (wellDotInfo.IsDrawSymbol && wellDotInfo.WellDotTypeCode != undefined) {
                        wellDrawSymbolDic[wellDotInfo.WellDotTypeCode] = wellDotInfo.IsDrawSymbol;
                    }
                    if (wellDotInfo.SymbolName && wellDotInfo.WellDotTypeCode != undefined) {
                        wellSymbolNameDic[wellDotInfo.WellDotTypeCode] = wellDotInfo.SymbolName;
                    }
                }
            }
            var layer = comSelf.View.MapData.GetLayerByName("井位图层");
            if (layer != null) {
                for (var i = 0; i < layer.GetChildrenCount(); i++) {
                    var well = layer.GetChildrenByIndex(i);
                    if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                        //遍历所有数据中的信息，找到的就从数据中删除掉
                        var objects = jsonData.Objects;
                        for (var j = objects.length - 1; j > -1; j--) {
                            var object = objects[j];
                            if (object.WellName == well.WellName) {
                                var wellDotType = object.WellType;
                                well.WellType = wellDotType;
                                if (wellDotType != undefined) {
                                    //井点信息存在，根据code获取井圈的颜色等属性
                                    if (wellDotPenDic[wellDotType]) {
                                        well.ViewPen = wellDotPenDic[wellDotType].Clone();
                                    }

                                    //井点信息存在，根据code获取井圈的颜色等属性
                                    if (wellDotBrushDic[wellDotType]) {
                                        well.ViewBrush = wellDotBrushDic[wellDotType].Clone();
                                    }

                                    if (wellSizeDic[wellDotType]) {
                                        well.WellSize = wellSizeDic[wellDotType];
                                    }

                                    if (wellDrawSymbolDic[wellDotType]) {
                                        well.IsDrawSymbol = wellDrawSymbolDic[wellDotType];
                                    }
                                    if (wellSymbolNameDic[wellDotType]) {
                                        var symbolName = wellSymbolNameDic[wellDotType];
                                        var url = WGADPlatConfig.symbolDataPath + "104/" + symbolName + ".json";
                                        GetSymbol(well, "Symbol", symbolName, url, symbolData);
                                    }
                                }
                                //如果传过来的每口井中有属性设置，则用每口井的覆盖掉全局的
                                if (object.WellSize) {
                                    well.WellSize = object.WellSize;
                                }
                                if (object.ViewPen) {
                                    well.ViewPen = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToPen(object.ViewPen);
                                }
                                if (object.ViewBrush) {
                                    well.ViewBrush = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonToBrush(
                                        object,
                                        "ViewBrush"
                                    );
                                }
                                if (object.IsDrawSymbol != undefined) {
                                    well.IsDrawSymbol = object.IsDrawSymbol;
                                }

                                if (object.SymbolName) {
                                    var symbolName = object.SymbolName;
                                    var url = WGADPlatConfig.symbolDataPath + "104/" + symbolName + ".json";
                                    GetSymbol(well, "Symbol", symbolName, url, symbolData);
                                }
                                objects.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
                this.View.Repaint();
            }
        };

        //增加流线
        this.AddFlowLine = function (jsonData) {
            //接收数据中的整体属性设置
            var groupLineWidthConfig = [1, 2, 4, 6, 8];

            if (jsonData.GroupLineWidthConfig && jsonData.GroupLineWidthConfig.length > 0) {
                groupLineWidthConfig = jsonData.GroupLineWidthConfig;
            }
            //流线数据，加到井的children中
            var layer = comSelf.View.MapData.GetLayerByName("井位图层");
            if (layer != null) {
                layer.FlowLineType = 0; //井组模式
                layer.GroupLineWidthConfig = groupLineWidthConfig;
                for (var i = 0; i < layer.GetChildrenCount(); i++) {
                    var well = layer.GetChildrenByIndex(i);
                    if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                        //删除井上面的所有流线
                        if (jsonData.ClearLayer) {
                            for (var index = well.Childrens.length - 1; index > -1; index--) {
                                if (well.Childrens[index] instanceof WGADPlatGraph2DFrame.WGFrameFlowLine) {
                                    well.Childrens.splice(index, 1);
                                }
                            }
                        }
                        //遍历所有数据中的信息，找到的就从数据中删除掉
                        var objects = jsonData.Objects;
                        for (var j = objects.length - 1; j > -1; j--) {
                            var object = objects[j];
                            if (object.WellName == well.WellName) {
                                for (var k = 0; k < object.WellList.length; k++) {
                                    //根据井名获取井点的坐标
                                    for (var m = 0; m < layer.GetChildrenCount(); m++) {
                                        var well1 = layer.GetChildrenByIndex(m);
                                        if (
                                            well1 instanceof WGADPlatGraph2DFrame.WGFrameWell &&
                                            well1.WellName == object.WellList[k].WellName
                                        ) {
                                            var obj = new WGADPlatGraph2DFrame.WGFrameFlowLine({});
                                            if (object.ToArrow == undefined) {
                                                obj.ToArrow = true;
                                                obj.FromArrow = false;
                                            } else {
                                                obj.ToArrow = object.ToArrow;
                                                obj.FromArrow = !obj.ToArrow;
                                            }
                                            obj.Value = object.WellList[k].Value;
                                            obj.CenterWellName = object.WellName;
                                            obj.WellName = object.WellList[k].WellName;
                                            obj.Points.push(well.CoordX);
                                            obj.Points.push(well.CoordY);
                                            obj.Points.push(1);
                                            obj.Points.push(well1.CoordX);
                                            obj.Points.push(well1.CoordY);
                                            obj.Points.push(1);
                                            well.AddChildren(obj);
                                            break;
                                        }
                                    }
                                }
                                objects.splice(j, 1);
                            }
                        }
                    }
                }
                layer.DealWithFlowLine();
                this.View.Repaint();
            }
        };
        //等值线图层加载 - 生成等值线
        this.IsoLayerLoad = function (mapJson, e) {
            //删除原有等值线和轮廓线
            var layerTempID = null;
            var jsonLayerList = mapJson.TCData.LayerList;
            if (jsonLayerList.length > 0) {
                for (var m = 0; m < jsonLayerList.length; m++) {
                    var layerID = jsonLayerList[m].ObjID;
                    layerTempID = layerID;
                    var layer = comSelf.View.MapData.GetLayerByID(layerID);
                    if (layer != null && layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline) {
                        for (var i = layer.GetChildrenCount() - 1; i >= 0; i--) {
                            var wellObj = layer.GetChildrenByIndex(i);
                            if (
                                wellObj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine ||
                                wellObj instanceof WGADPlatGraph2DFrame.WGFrameOutLine
                            ) {
                                layer.RemoveChildrenByIndex(i);
                            }
                        }
                    }
                }
            }
            comSelf.LoadFrameData(mapJson.TCData);
            if (layerTempID != null) {
                var layer = comSelf.View.MapData.GetLayerByID(layerID);
                for (var i = 0; i < layer.GetChildrenCount(); i++) {
                    var m_IsoLine1 = layer.GetChildrenByIndex(i);
                    if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                        if (e != null) {
                            m_IsoLine1.ViewPen.PenWidth = e.LineWidth;
                            m_IsoLine1.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                                "255",
                                e.LineColor[0],
                                e.LineColor[1],
                                e.LineColor[2]
                            );
                        }
                    }
                }
            }

            comSelf.View.Repaint();
        };
        //删除图层 通过ID
        this.RemoveLayer = function (objID) {
            for (var i = 0; i < comSelf.View.MapData.LayerList.length; i++) {
                var layer = comSelf.View.MapData.LayerList[i];
                if (layer.ObjID == objID) {
                    comSelf.View.MapData.LayerList.splice(i, 1);
                    if (comSelf.AfterRemoveLayer != null) {
                        comSelf.AfterRemoveLayer();
                    }
                    break;
                }
            }
            comSelf.View.Repaint();
        };
        //删除图层 通过name
        this.RemoveLayerByName = function (name) {
            for (var i = 0; i < comSelf.View.MapData.LayerList.length; i++) {
                var layer = comSelf.View.MapData.LayerList[i];
                if (layer.LayerName == name) {
                    comSelf.View.MapData.LayerList.splice(i, 1);
                    if (comSelf.AfterRemoveLayer != null) {
                        comSelf.AfterRemoveLayer(layer.LayerType);
                    }
                    break;
                }
            }
            comSelf.View.Repaint();
        };

        //调用修改当前颜色值为对象 fView:要改变的对象。color :要改变的颜色数组 type:哪个结构的 index,fView为[]时的下标
        this.SetFontColor = function (fView, color, type, index) {
            if (type == "LKX") {
                //轮廓线
                fView.SelectedObj.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                    255,
                    color[0],
                    color[1],
                    color[2]
                );
            } else if (type == "JSX") {
                //井属性
                fView.Childrens[index].Font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                    255,
                    color[0],
                    color[1],
                    color[2]
                );
            } else if (type == "Text") {
                //字体颜色属性
                fView.SelectedObj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, color[0], color[1], color[2]);
            }
        };
        this.WellTraceLayerLoad = function (mapJson, traceType, selectType, wellJsjg) {
            var jsonLayerList = mapJson.TCData.LayerList;
            var wellLayer = null;
            if (jsonLayerList.length > 0) {
                for (var m = 0; m < jsonLayerList.length; m++) {
                    var jsonLayer = jsonLayerList[m];
                    var layerID = jsonLayer.ObjID;
                    var layer = comSelf.View.MapData.GetLayerByID(layerID);
                    //改变井位坐标
                    if (layer != null) {
                        if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                            layer.JsonObjLoad(jsonLayer);
                            wellLayer = layer;
                        } else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWellTrack) {
                            if (traceType == "井口") {
                                this.DeleteTraceLayerObj(layer, jsonLayer);
                            } else {
                                if (selectType == "selWell") {
                                }
                                if (selectType == "allWell") {
                                    this.DeleteTraceLayerObj(layer, jsonLayer);
                                } else if (selectType == "sameJsjg") {
                                    this.DeleteTraceLayerObjJSJG(wellLayer, layer, jsonLayer, wellJsjg);
                                }
                            }
                            layer.JsonObjLoad(jsonLayer);
                        }
                        layer.SetDataChanged(true);
                    }
                }
            }
        };
        this.WellAndWellTraceLayerReLoad = function (mapJson, template) {
            var jsonLayerList = mapJson.TCData.LayerList;
            var wellLayer = null;
            if (jsonLayerList.length > 0) {
                for (var m = 0; m < jsonLayerList.length; m++) {
                    var jsonLayer = jsonLayerList[m];
                    var layerID = jsonLayer.ObjID;
                    var layer = comSelf.View.MapData.GetLayerByID(layerID);
                    //改变井位坐标
                    if (layer != null) {
                        if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell) {
                            //所有井的属性恢复到默认（井别、井圈颜色）
                            layer.JsonObjLoad(jsonLayer);
                            wellLayer = layer;
                        } else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWellTrack) {
                            this.DeleteTraceLayerObj(layer, jsonLayer);
                            layer.JsonObjLoad(jsonLayer);
                        }
                        layer.SetDataChanged(true);
                    }
                }
            }
            this.ApplyWellTemplate(template, 0); //应用模版
            this.View.MakeAviod(); //井号避让
        };
        this.DeleteTraceLayerObj = function (layer, jsonLayer) {
            for (var m = layer.GetChildrenCount() - 1; m >= 0; m--) {
                var objTemp = layer.GetChildrenByIndex(m);
                var isFind = false;
                if (jsonLayer.Childrens != undefined && jsonLayer.Childrens != null) {
                    for (var index in jsonLayer.Childrens) {
                        var childJsonNode = jsonLayer.Childrens[index];
                        if (childJsonNode.ObjID == objTemp.ObjID) {
                            layer.RemoveChildrenByIndex(m);
                        }
                    }
                }
            }
        };
        this.DeleteTraceLayerObjJSJG = function (layerWell, layerTrace, jsonLayer, jsjg) {
            var arrWell = [];
            for (var i = 0; i < layerWell.GetChildrenCount(); i++) {
                var wellObj = layerWell.GetChildrenIndex(i);
                if (wellObj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                    if (wellObj.WellJsjg == jsjg) {
                        arrWell.push(wellObj);
                    }
                }
            }
            for (var m = 0; m < arrWell.length; m++) {
                var objTemp = arrWell[m];
                var isFind = false;
                if (jsonLayer.Childrens != undefined && jsonLayer.Childrens != null) {
                    for (var index in jsonLayer.Childrens) {
                        var childJsonNode = jsonLayer.Childrens[index];
                        if (childJsonNode.ObjID == objTemp.ObjID) {
                            isFind = true;
                            break;
                        }
                    }
                }
                if (!isFind) {
                    layerTrace.RemoveChildrenByID(objTemp.ObjID);
                }
            }
        };
        this.SetWellTraceProperty = function (e) {
            if (e.batchSetType == "allWell") {
                //全部应用
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_objTrace = e.Layer.GetChildrenByIndex(i);
                    if (m_objTrace != null) {
                        if (m_objTrace instanceof WGADPlatGraph2DFrame.WGFrameWellTrace) {
                            this.SetWellTraceObj(m_objTrace, e);
                        }
                    }
                }
            } else if (e.batchSetType == "selWell") {
                //选中斜井
                if (comSelf.View.HiteResult.SelectObjs.length > 0) {
                    for (var i = 0; i < comSelf.View.HiteResult.SelectObjs.length; i++) {
                        var m_objTrace = comSelf.View.HiteResult.SelectObjs[i];
                        if (m_objTrace != null) {
                            if (m_objTrace instanceof WGADPlatGraph2DFrame.WGFrameWellTrace) {
                                this.SetWellTraceObj(m_objTrace, e);
                            }
                        }
                    }
                }
            } else if (e.batchSetType == "sameJsjg") {
                //解释结果相同
                var jsjg = "";
                var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
                for (var i = 0; i < layer.GetChildrenCount(); i++) {
                    var well = layer.GetChildrenByIndex(i);
                    if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                        if ((well.ObjID = e.obj.ObjID)) {
                            jsjg = well.WellJsjg;
                            break;
                        }
                    }
                }
                if (jsjg != "") {
                    var jsjgarr = this.GetSameJSJG();
                    for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                        var m_objTrace = e.Layer.GetChildrenByIndex(i);
                        if (m_objTrace != null) {
                            if (m_objTrace instanceof WGADPlatGraph2DFrame.WGFrameWellTrace) {
                                for (var index in jsjgarr) {
                                    if (jsjgarr.ObjID == m_objTrace.ObjID) {
                                        this.SetWellTraceObj(m_objTrace, e);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    jsjgarr = [];
                }
            } //当前选中的唯一等值线
            else {
                // m_isoLine.Closed = ckbClosed.Checked;
                // m_isoLine.ValueText = this.txtValueText.Text;
                if (e.obj instanceof WGADPlatGraph2DFrame.WGFrameWellTrace) {
                    this.SetWellTraceObj(e.obj, e);
                    if (e.Symbol != undefined && e.Symbol != null) {
                        e.obj.Symbol = e.Symbol;
                    }
                }
            }
            e.Layer.SetDataChanged(true);
            comSelf.View.Repaint();
        };
        this.SetWellTraceObj = function (obj, e) {
            obj.SymbolPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                Number(e.symbolPenColor[0]),
                Number(e.symbolPenColor[1]),
                Number(e.symbolPenColor[2]),
                Number(e.symbolPenColor[3])
            );
            obj.SymbolPen.PenDashStyle = e.symbolPenDashStyle;
            obj.WellSize = e.wellSize;
            obj.SymbolPen.PenWidth = e.symbolPenWidth;
            obj.ViewPen.PenWidth = e.viewPenWidth;
            obj.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                Number(e.viewPenColor[0]),
                Number(e.viewPenColor[1]),
                Number(e.viewPenColor[2]),
                Number(e.viewPenColor[3])
            );
            obj.ViewPen.PenDashStyle = e.viewPenDashStyle;
            obj.TraceType = e.traceType;
            obj.ObjTag = e.objTag;
            if (e.chkWellType) {
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_objTrace = e.Layer.GetChildrenByIndex(i);
                    if (m_objTrace != null) {
                        if (m_objTrace instanceof WGADPlatGraph2DFrame.WGFrameWellTrace) {
                            if (e.Symbol != undefined && e.Symbol != null) {
                                m_objTrace.Symbol = e.Symbol;
                            }
                        }
                    }
                }
            } else {
                if (e.Symbol != undefined && e.Symbol != null) {
                    obj.Symbol = e.Symbol;
                }
            }
        };
        this.GetSameJSJG = function (layerWell, jsjg) {
            var arrWell = [];
            for (var i = 0; i < layerWell.GetChildrenCount(); i++) {
                var wellObj = layerWell.GetChildrenIndex(i);
                if (wellObj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                    if (wellObj.WellJsjg == jsjg) {
                        arrWell.push(wellObj);
                    }
                }
            }
            return arrWell;
        };

        this.SetIsoProperty = function (mIsoLine, e) {
            var count = mIsoLine.GetChildrenCount();
            if (count > 0) {
                var aaa = mIsoLine.GetChildrenByIndex(0);
                if (mIsoLine.GetChildrenByIndex(0) instanceof WGADPlatGraph2D.WGGeoLineSignText) {
                    var obj = mIsoLine.GetChildrenByIndex(0);
                    if (obj != null) {
                        switch (e.SymbolPos) {
                            case 0:
                            case 1:
                                obj.SymbolNum = 1;
                                break;
                            default:
                                obj.SymbolNum = e.SymbolNum;
                                var startPos = 1 / (obj.SymbolNum + 1.0);
                                var endPos = 1 - startPos;
                                obj.MinLocation = startPos;
                                obj.MaxLocation = endPos;
                                break;
                        }
                    }
                }
            }
            //var ArrowDir = e.ArrowDir;
            mIsoLine.ArrowDir = e.ArrowDir;
            var cout = mIsoLine.GetChildrenCount();
            for (var j = 0; j < cout; j++) {
                if (mIsoLine.GetChildrenByIndex(j) instanceof WGADPlatGraph2D.WGGeoLineSignText) {
                    var oLineSignText = mIsoLine.GetChildrenByIndex(j);
                    if (oLineSignText != null) {
                        oLineSignText.SymbolDir = e.SymbolDir;
                        oLineSignText.SymbolPos = e.SymbolPos;
                        oLineSignText.Font = e.Font;
                        if (oLineSignText.Font.symbolPenColor != null) {
                            oLineSignText.Font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                255,
                                oLineSignText.Font.symbolPenColor[0],
                                oLineSignText.Font.symbolPenColor[1],
                                oLineSignText.Font.symbolPenColor[2]
                            );
                        }
                        oLineSignText.Hidden = e.HiddenLabel;
                        oLineSignText.Label = mIsoLine.ValueText;
                    }
                }
            }

            //设定等值线属性
            mIsoLine.SmoothAlgorithm = e.SmoothAlgorithm;
            mIsoLine.Eps = e.Eps;
            mIsoLine.ViewPen.PenWidth = e.LineWidth;
            //mIsoLine.ValueText=e.ValueText;
            mIsoLine.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                e.GcbcColor[0],
                e.GcbcColor[1],
                e.GcbcColor[2],
                e.GcbcColor[3]
            );

            // if (e.ChbShowNumber)
            // {
            //     if (e.TxbShowNumber != "")
            //         mIsoLine.ShowNum = Number(e.TxbShowNumber);
            // }
            // else
            // {
            //     mIsoLine.ShowNum = 0;
            // }

            // mIsoLine.BoldNum = Number(e.BoldNumber);e.BoldStartValue
            mIsoLine.BoldLineWidth = Number(e.BoldLineWidth);
            e.Layer.SetDataChanged(true);
            comSelf.View.Repaint();
        };
        this.SetIsoObjProperty = function (e) {
            if (e.obj != undefined && e.obj != null) {
                e.obj.Closed = e.Closed;
                e.obj.ValueText = e.ValueText;
            }
            //GFrameIsoLine m_IsoLine1 = null;
            if (e.batchSetType == "allWell") {
                //全部应用
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_IsoLine1 = e.Layer.GetChildrenByIndex(i);
                    if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                        this.SetIsoProperty(m_IsoLine1, e);
                    }
                }
            } else if (e.batchSetType == "allSelected") {
                //选中所有
                if (comSelf.View.HiteResult.SelectObjs.length > 0) {
                    for (var i = 0; i < comSelf.View.HiteResult.SelectObjs.length; i++) {
                        var m_IsoLine1 = comSelf.View.HiteResult.SelectObjs[i];
                        if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                            // var Closed = ckbClosed.Checked;  //闭合
                            this.SetIsoProperty(m_IsoLine1, e);
                        }
                    }
                }
            } else if (e.batchSetType == "sameName") {
                //同标注名称的等值线
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_IsoLine1 = e.Layer.GetChildrenByIndex(i);
                    if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                        if (m_IsoLine1.ValueText == e.ValueText) {
                            this.SetIsoProperty(m_IsoLine1, e);
                        }
                    }
                }
            } //当前选中的唯一等值线
            else {
                // m_isoLine.Closed = ckbClosed.Checked;
                // m_isoLine.ValueText = this.txtValueText.Text;
                if (e.obj != undefined && e.obj != null && e.obj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                    this.SetIsoProperty(e.obj, e);
                }
            }
        };
        this.ExpLayerLoad = function (mapJson) {
            //删除原有开采现状图
            var jsonLayerList = mapJson.TCData.LayerList;
            if (jsonLayerList.length > 0) {
                for (var m = 0; m < jsonLayerList.length; m++) {
                    var layerID = jsonLayerList[m].ObjID;
                    var layer = comSelf.View.MapData.GetLayerByID(layerID);
                    if (layer != null && layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltExploitation) {
                        for (var i = layer.GetChildrenCount() - 1; i >= 0; i--) {
                            var wellObj = layer.GetChildrenByIndex(i);
                            if (wellObj instanceof WGADPlatGraph2DFrame.WGFrameExploitation) {
                                layer.RemoveChildrenByIndex(i);
                            }
                        }
                    }
                }
            }
            comSelf.LoadFrameData(mapJson.TCData);
            comSelf.View.Repaint();
        };
        this.SetExpObjProperty = function (expObj, e) {
            if (expObj instanceof WGADPlatGraph2DFrame.WGFrameExploitation) {
                expObj.ShowHistogram = e.ShowHistogram; //显示直方图
                expObj.ShowPie = e.ShowPie; //显示饼图
                expObj.MinPieRadius = e.MinPieRadius; //饼图最小半径
                expObj.MaxPieRadius = e.MaxPieRadius; //饼图最大半径
                expObj.MinHeight = e.MinHeight; //柱子最小高度
                expObj.MaxHeight = e.MaxHeight; //柱子最大高度
                expObj.Width = e.Width; //柱子宽度
                expObj.Interval = e.Interval; //柱子间距
                expObj.Reversal = e.Reversal; //倒置
                expObj.DrawDirectLine = e.DrawDirectLine; //是否绘制指引线
                expObj.ShowLineLength = e.ShowLineLength; //指引线显示范围
                //直方图设置
                var hisMapArry = [];
                var pieMapArry = [];
                for (var m = 0; m < expObj.GetChildrenCount(); m++) {
                    var cObj = expObj.GetChildrenByIndex(m);
                    if (cObj instanceof WGADPlatGraph2DFrame.WGFrameExploitationHistogram) {
                        cObj.ShowText = ""; //直方图是否显示文字
                        cObj.Text = ""; //文字数值
                        cObj.HistogramDecimals = "";
                        cObj.ViewBrush.BrushColor = WGADPlatGMEngine.WGColor.FromARGB(
                            e.Histogram[i].BrushColor[0],
                            e.Histogram[i].BrushColor[1],
                            e.Histogram[i].BrushColor[2],
                            e.Histogram[i].BrushColor[3]
                        );
                        cObj.Code = "";
                    } else if (cObj instanceof WGADPlatGraph2DFrame.WGFrameExploitationPie) {
                        cObj.ShowText = ""; //饼图是否显示文字
                        cObj.Text = ""; //文字数值
                        cObj.PieDecimals = "";
                        cObj.ViewBrush.BrushColor = WGADPlatGMEngine.WGColor.FromARGB(
                            pieArry[i].BrushColor[0],
                            pieArry[i].BrushColor[1],
                            pieArry[i].BrushColor[2],
                            pieArry[i].BrushColor[3]
                        );
                        cObj.Code = "";
                    }
                }
                expObj.SetDataChanged(true);
            }
        };

        this.AddExpHistogram = function (obj, expObj) {
            var cObj = new WGADPlatGraph2DFrame.WGFrameExploitationHistogram({});
            cObj.ShowText = obj.ShowText; //直方图是否显示文字
            cObj.Value = Number(obj.Text); //文字数值
            cObj.OffX1 = Number(obj.OffX1);
            cObj.OffY1 = Number(obj.OffY1);
            cObj.HistogramDecimals = obj.HistogramDecimals;
            cObj.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
            cObj.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                "255",
                obj.BrushColor[0],
                obj.BrushColor[1],
                obj.BrushColor[2]
            );
            cObj.Code = obj.Code;
            cObj.ParentExploitation = expObj;
            var text = new WGADPlatGraph2DFrame.WGFrameExpText({});
            text.Font.FontSize = obj.Font.FontSize;
            text.Font.FontName = obj.Font.FontName;
            text.Font.Direction = obj.Font.Direction;
            text.Font.HorizAlign = obj.Font.HorizAlign;
            text.Font.VerticalAlign = obj.Font.VerticalAlign;
            text.Font.AutoSize = obj.Font.AutoSize;
            text.Font.PitchAndFamily = obj.Font.PitchAndFamily;
            text.Font.CharSet = obj.Font.CharSet;
            text.Font.Weight = obj.Font.Weight;
            text.Font.Orientation = obj.Font.Orientation;
            text.Angle = obj.Angle;
            if (obj.Font.symbolPenColor != null) {
                text.Font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                    "255",
                    obj.Font.symbolPenColor[0],
                    obj.Font.symbolPenColor[1],
                    obj.Font.symbolPenColor[2]
                );
            } else {
                text.Font.Color = obj.Font.Color;
            }
            cObj.AddChildren(text);
            cObj.SetDataChanged(true);

            expObj.AddChildren(cObj);
            expObj.SetDataChanged(true);
        };
        this.AddExpPie = function (obj, expObj) {
            var cObj = new WGADPlatGraph2DFrame.WGFrameExploitationPie({});
            cObj.ShowText = obj.ShowText; //直方图是否显示文字
            cObj.Value = Number(obj.Text); //文字数值
            cObj.OffX1 = Number(obj.OffX1);
            cObj.OffY1 = Number(obj.OffY1);
            cObj.PieDecimals = obj.HistogramDecimals;
            cObj.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
            cObj.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                "255",
                obj.BrushColor[0],
                obj.BrushColor[1],
                obj.BrushColor[2]
            );
            cObj.Code = obj.Code;
            cObj.ParentExploitation = expObj;
            var text = new WGADPlatGraph2DFrame.WGFrameExpText({});
            text.Font.FontSize = obj.Font.FontSize;
            text.Font.FontName = obj.Font.FontName;
            text.Font.Direction = obj.Font.Direction;
            text.Font.HorizAlign = obj.Font.HorizAlign;
            text.Font.VerticalAlign = obj.Font.VerticalAlign;
            text.Font.AutoSize = obj.Font.AutoSize;
            text.Font.PitchAndFamily = obj.Font.PitchAndFamily;
            text.Font.CharSet = obj.Font.CharSet;
            text.Font.Weight = obj.Font.Weight;
            text.Font.Orientation = obj.Font.Orientation;
            text.Angle = obj.Angle;
            if (obj.Font.symbolPenColor != null) {
                text.Font.Color = WGADPlatGMEngine.WGColor.FromARGB(
                    "255",
                    obj.Font.symbolPenColor[0],
                    obj.Font.symbolPenColor[1],
                    obj.Font.symbolPenColor[2]
                );
            } else {
                text.Font.Color = obj.Font.Color;
            }
            cObj.AddChildren(text);
            cObj.SetDataChanged(true);
            expObj.AddChildren(cObj);
            expObj.SetDataChanged(true);
        };
        /// <summary>
        /// 设置层上开采现状图的半径和高度
        /// </summary>
        /// <param name="layer">开采现状图图层</param>
        /// <param name="wellType">类型</param>
        /// <param name="maxHeight">直方图柱子最大高度</param>
        ///  /// <param name="minHeight">直方图柱子最小高度</param>
        /// <param name="maxPieRadius">饼图最大半径</param>
        /// <param name="minPieRadius">饼图最小半径</param>
        this.SetExploitation = function (layer, wellType, maxHeight, minHeight, pieField, maxPieRadius, minPieRadius) {
            var tempKeyValue = {};
            var dicHis = []; //直方图所有柱子数据new Dictionary<string, List<double>>();
            // dicHis.push(tempKeyValue)
            var lstPieValue = []; //记录所有开采现状图对象中每个饼图的业务数据之和
            var hisMax = 0;
            var hisMin = 0;

            //#region 取图层上所有开采现状图数据

            var ic = layer.GetChildrenCount();
            for (var i = 0; i < ic; i++) {
                var oExp = layer.GetChildrenByIndex(i);
                var sum = 0;

                if (oExp != null) {
                    oExp.PieCode = pieField;
                    if (oExp.WellKCType == wellType) {
                        var count = oExp.GetChildrenCount();
                        for (var j = 0; j < count; j++) {
                            if (
                                oExp.GetChildrenByIndex(j) instanceof WGADPlatGraph2DFrame.WGFrameExploitationHistogram
                            ) {
                                var oHis = oExp.GetChildrenByIndex(j);
                                if (GetArryItem(dicHis, oHis.Code) == null) {
                                    var lstHis = [];
                                    PushArryItem(dicHis, oHis.Code, lstHis);
                                }

                                if (oHis.Value > hisMax) {
                                    hisMax = Number(oHis.Value);
                                } else {
                                    if (hisMin > 0) {
                                        if (hisMin > oHis.Value) {
                                            hisMin = oHis.Value;
                                        }
                                    } else {
                                        hisMin = oHis.Value;
                                    }
                                }
                                GetArryItem(dicHis, oHis.Code).value.push(oHis.Value);
                                //dicHis[oHis.Code].Add(oHis.Value);
                            } else if (
                                oExp.GetChildrenByIndex(j) instanceof WGADPlatGraph2DFrame.WGFrameExploitationPie
                            ) {
                                var oPie = oExp.GetChildrenByIndex(j);
                                if (pieField == "" || pieField == null) {
                                    sum += oPie.Value;
                                } else {
                                    if (oPie.Code == pieField) {
                                        sum = oPie.Value;
                                    }
                                }
                            }
                        }

                        lstPieValue.push(sum);
                    }
                }
            }

            //设置饼图半径和直方图柱子高度
            GetMaxMinValue(lstPieValue);
            var maxPie = m_max;
            var minPie = m_min;
            var dicMaxHis = [];
            var dicMinHis = [];

            if (hisMax == hisMin) {
                hisMax = hisMin + 10;
            }

            for (var m = 0; m < dicHis.length; m++) {
                var item = dicHis[m];
                GetMaxMinValue(item.value);
                var maxTemp = m_max;
                var minTemp = m_min;

                if (maxTemp == minTemp) {
                    maxTemp = minTemp + 10;
                }
                PushArryItem(dicMaxHis, item.key, maxTemp);
                PushArryItem(dicMinHis, item.key, minTemp);
            }

            //特殊情况处理--最大值和最小值一样的情况
            if (maxPie == minPie) {
                maxPie = minPie + 10;
            }

            var exp;
            for (var m = 0; m < ic; m++) {
                exp = layer.GetChildrenByIndex(m);
                if (exp != null && exp.WellKCType == wellType) {
                    exp.MaxHeight = maxHeight;
                    exp.MinHeight = minHeight;
                    exp.MaxPieValue = maxPie;
                    exp.MinPieValue = minPie;
                    exp.MaxPieRadius = maxPieRadius;
                    exp.MinPieRadius = minPieRadius;

                    var num = exp.GetChildrenCount();
                    for (var n = 0; n < num; n++) {
                        if (exp.GetChildrenByIndex(n) instanceof WGADPlatGraph2DFrame.WGFrameExploitationHistogram) {
                            var WellExpHis = exp.GetChildrenByIndex(n);
                            if (WellExpHis != null) {
                                if (exp.IsAllSort) {
                                    WellExpHis.MaxValue = hisMax;
                                    WellExpHis.MinValue = hisMin;
                                } else {
                                    WellExpHis.MaxValue = GetArryItem(dicMaxHis, WellExpHis.Code).value;
                                    WellExpHis.MinValue = GetArryItem(dicMinHis, WellExpHis.Code).value;
                                }

                                WellExpHis.Height = GetHisHight(
                                    exp.MaxHeight,
                                    WellExpHis.MaxValue,
                                    exp.MinHeight,
                                    WellExpHis.MinValue,
                                    WellExpHis.Value
                                );
                            }
                        }
                    }
                }
            }
        };

        /// <summary>
        /// 计算柱子高度
        /// </summary>
        function GetHisHight(maxHeight, maxValue, minHeight, minValue, curValue) {
            var result = 0;

            if (maxValue - minValue > 0) {
                result = ((maxHeight - minHeight) * (curValue - minValue)) / (maxValue - minValue) + minHeight;
            } else {
                result = maxHeight;
            }

            return result;
        }

        /// <summary>
        /// 返回当前中的最大值
        /// </summary>
        /// <param name="tempListValue">string</param>
        /// <returns>string</returns>
        function GetMaxValue(tempListValue) {
            var count = tempListValue.length;
            var maxValue = 0;
            for (var i = 0; i < count; i++) {
                if (maxValue < tempListValue[i]) {
                    maxValue = tempListValue[i];
                }
            }

            return maxValue;
        }

        /// <summary>
        /// 返回当前中的最小值
        /// </summary>
        /// <param name="tempListValue">string</param>
        /// <returns>string</returns>
        function GetMinValue(tempListValue) {
            var count = tempListValue.length;
            var minValue = 10000000000;
            for (var i = 0; i < count; i++) {
                if (minValue > tempListValue[i]) {
                    minValue = tempListValue[i];
                }
            }

            return minValue;
        }
        var m_max = 0;
        var m_min = 0;
        /// <summary>
        /// 获取列表最大值和最小值
        /// </summary>
        /// <param name="lst">列表</param>
        /// <param name="max">最大值</param>
        /// <param name="min">最小值</param>
        function GetMaxMinValue(lst) {
            m_min = 1000000;
            m_max = 0.000001;
            for (var i = 0; i < lst.length; i++) {
                var item = lst[i];
                if (item < m_min) {
                    m_min = item;
                }

                if (item > m_max) {
                    m_max = item;
                }
            }
        }
        function GetArryItem(arry, key) {
            var obj = null;
            for (var i = 0; i < arry.length; i++) {
                if (arry[i].key == key) {
                    obj = arry[i];
                    break;
                }
            }
            return obj;
        }
        function PushArryItem(arry, key, value) {
            var tempItem = {};
            if (key != "") {
                tempItem.key = key;
                tempItem.value = value;
                arry.push(tempItem);
            }
        }

        // flag :0 删除 1 增加 2 改变
        this.UpdataRedis = function (url, tabID, obj, flag) {
            var m = {};
            var layerlist = [];
            var j = {};
            if (obj.Parent.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLayer) {
                var arr = [];
                arr.push(obj);
                var layer = obj.Parent;
                layer.CopyDataToJson(j, arr, flag);
                layerlist.push(j);
            }
            m.LayerList = layerlist;
            var json = {};
            json.PageKey = tabID;
            json.TJID = this.View.MapData.MapID;
            json.TCData = m;
            var param = JSON.stringify(json);
            $.ajax({
                url: url,
                type: "POST",
                data: { objparam: param },
                async: true,
                dataType: "text",
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        };

        // 关闭图件 清空当前图件Redis
        this.closeTJ = function (param, url) {
            $.ajax({
                url: url,
                type: "get",
                data: param,
                async: false,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        };
        this.ApplyWellTemplateByUrl = function (url) {
            var wellJson = null;
            $.ajax({
                url: url,
                contentType: "utf-8",
                async: false,
                error: console.log("error"),
                dataType: "json",
                success: function (data) {
                    wellJson = data;
                }
            });
            if (wellJson != null) {
                var wellObj = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonObjReturnObject(wellJson);
                var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
                if (layer != null && wellObj != null) {
                    for (var i = 0; i < layer.GetChildrenCount(); i++) {
                        var well = layer.GetChildrenByIndex(i);
                        if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                            well.CopyFromTemplet(wellObj);
                        }
                    }
                    this.View.Repaint();
                }
            }
        };
        this.BorderApplyTemplate = function (obj, templateJson) {
            if (templateJson != undefined) {
                var templateobj = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonObjReturnObject(templateJson);
                obj.CopyFromTemplet(templateobj);
                var layer = obj.Parent;
                if (layer) {
                    layer.SetDataChanged(true);
                }
                this.View.Repaint();
            }
        };
        this.CreateFont = function () {
            var textFont = new WGADPlatGMEngine.WGFont();
            return textFont;
        };
        this.SetColorRGBA = function (e) {
            return WGADPlatGMEngine.WGColor.FromARGB(255, Number(e[0]), Number(e[1]), Number(e[2]));
        };
        //等值线图例填充
        this.AddIsoLegend = function (objID, textlist, colorlist, showGradient, font) {
            var layer = this.View.MapData.GetLayerByID(objID);
            if (layer == null) return;
            var isolegend = null;
            for (var i = 0; i < layer.GetChildrenCount(); i++) {
                var obj = layer.GetChildrenByIndex(i);
                if (obj instanceof WGADPlatGraph2DFrame.WGFrameIsoLegend) {
                    isolegend = obj;
                    break;
                }
            }
            var temp = new WGADPlatGMEngine.WGRect();
            temp = comSelf.View.MapData.GetAllObjsEarthBound();
            var width = Math.abs(
                this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX)
            );
            var height = Math.abs(
                this.View.MapData.Transform.MapToEarth(50, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceY)
            );
            if (isolegend == null) {
                isolegend = new WGADPlatGraph2DFrame.WGFrameIsoLegend({});
                isolegend.PositionX = temp.Left - width;
                isolegend.PositionY = temp.Top;
                isolegend.Width = width;
                isolegend.Height = height;
                layer.AddChildren(isolegend);
            }
            isolegend.IsShowGradient = showGradient;
            isolegend.Text = textlist;
            isolegend.TextOrigin = [];
            //增加原始数据的记录
            if (isolegend.Text) {
                for (var i = 0; i < isolegend.Text.length; i++) {
                    isolegend.TextOrigin.push(isolegend.Text[i]);
                }
            }
            //增加字体的设置-如果创建font接口不可行，字体赋值需要重新写
            isolegend.TextFont = font;
            isolegend.ColorList = colorlist;
            comSelf.View.Repaint();
        };
        this.View.EventRectMap = function (e) {
            var rect = e.Area;
            var p = comSelf.View.MapData.toPngDataURLRect(rect.Left, rect.Top, rect.GetWidth(), rect.GetHeight());
            var b64 = p.substring(22);
            var filename = new Date().toLocaleDateString() + "." + "png";
            downloadFile(filename, p);
            //返回给index.vue 传到后台
            comSelf.openCutOutImage(b64);
        };
        this.SetAlongTrackColorList = function (obj, json) {
            if (obj instanceof WGADPlatGraph2DFrame.WGFrameAlongTrack) {
                for (var i = 0; i < obj.GetChildrenCount(); i++) {
                    var child = obj.GetChildrenByIndex(i);
                    if (child instanceof WGADPlatGraph2DFrame.WGFrameAlongTrackPart) {
                        var objvalue = json["f" + child.FdIndex.toString()];
                        if (objvalue) {
                            child.ViewPen.PenDashStyle = objvalue.linestyle;
                            child.ViewPen.PenWidth = objvalue.linewidth;
                            child.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(
                                "255",
                                objvalue.linecolor[0],
                                objvalue.linecolor[1],
                                objvalue.linecolor[2]
                            );
                            child.ViewBrush.FillStyle = objvalue.fillstyle;
                            child.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(
                                "255",
                                objvalue.color[0],
                                objvalue.color[1],
                                objvalue.color[2]
                            );
                        }
                    }
                }
            }
        };
        this.Earthwidth = function (width) {
            return Math.abs(this.View.MapData.Transform.MapToEarth(width, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX));
        };
        var wellList = [];
        var currentIndex = 0;
        //获取井号列表
        this.GetWellByName = function (wellname) {
            wellList = [];
            wellNameList = [];
            currentIndex = 0;
            var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
            var ic = layer.GetChildrenCount();
            for (var i = 0; i < ic; ++i) {
                var tempobj = layer.GetChildrenByIndex(i);
                if (tempobj instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                    if (tempobj.WellName.indexOf(wellname) >= 0) {
                        wellList.push(tempobj);
                        wellNameList.push({ value: tempobj.WellName, label: tempobj.WellName });
                    }
                }
            }
            return wellNameList;
        };

        this.SearchWellByName = function (wellname) {
            var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
            var obj;
            var ic = layer.GetChildrenCount();
            for (var i = 0; i < ic; ++i) {
                var tempobj = layer.GetChildrenByIndex(i);
                if (tempobj instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                    if (tempobj.WellName === wellname) {
                        obj = tempobj;
                        break;
                    }
                }
            }
            if (obj) {
                var x = obj.Bound.Left;
                var y = obj.Bound.Top;
                //工作区矩形
                var rect = new WGADPlatGMEngine.WGRect();
                rect.Left = this.View.m_clientRect.Left;
                rect.Top = this.View.m_clientRect.Top;
                rect.Right = this.View.m_clientRect.Right;
                rect.Bottom = this.View.m_clientRect.Bottom;
                //工作区中心
                var dvClientCenterX = 0.5 * (rect.Left + rect.Right);
                var dvClientCenterY = 0.5 * (rect.Top + rect.Bottom);

                var dvCenterX = this.View.MapData.Transform.MapToView(x, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
                var dvCenterY = this.View.MapData.Transform.MapToView(y, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
                this.View.ScrollView(dvClientCenterX - dvCenterX, dvClientCenterY - dvCenterY);
                this.View.HiteResult.AddSelectObject(obj);
                this.View.Repaint();
            }
        };
        //查找下一个
        this.searchNext = function () {
            if (wellList.length > 0) {
                currentIndex++;
                if (currentIndex >= wellList.length) {
                    currentIndex = 0;
                }
                var obj = wellList[currentIndex];
                this.findObj(obj);
            }
        };
        //查找前一个
        this.searchPre = function () {
            if (wellList.length > 0) {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = wellList.length - 1;
                }
                var obj = wellList[currentIndex];
                this.findObj(obj);
            }
        };
        //开始查找
        this.findObj = function (obj) {
            if (obj) {
                var x = obj.Bound.Left;
                var y = obj.Bound.Top;
                //工作区矩形
                var rect = new WGADPlatGMEngine.WGRect();
                rect.Left = this.View.m_clientRect.Left;
                rect.Top = this.View.m_clientRect.Top;
                rect.Right = this.View.m_clientRect.Right;
                rect.Bottom = this.View.m_clientRect.Bottom;
                //工作区中心
                var dvClientCenterX = 0.5 * (rect.Left + rect.Right);
                var dvClientCenterY = 0.5 * (rect.Top + rect.Bottom);

                var dvCenterX = this.View.MapData.Transform.MapToView(x, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
                var dvCenterY = this.View.MapData.Transform.MapToView(y, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
                this.View.ScrollView(dvClientCenterX - dvCenterX, dvClientCenterY - dvCenterY);
                this.View.HiteResult.AddSelectObject(obj);
                this.View.Repaint();
            }
        };
        var m_posX, m_posY;
        this.View.EventMouseMove = function (e) {
            m_posX = e.Point.X;
            m_posY = e.Point.Y;
            var eX = comSelf.View.MapData.Transform.ViewToEarth(m_posX, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
            var eY = comSelf.View.MapData.Transform.ViewToEarth(m_posY, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
            //显示坐标信息
            $("#lblCoordX").html("X:" + eX.toFixed(2));
            $("#lblCoordY").html("Y:" + eY.toFixed(2));
            //显示坐标信息
            if (
                comSelf.rangeSegY &&
                comSelf.rangeSegY.seismicMainMap &&
                comSelf.rangeSegY.seismicMainMap.MapBoundEarth != null
            ) {
                if (comSelf.rangeSegY.seismicMainMap.MapBoundEarth.IsInPolygon(eX, eY)) {
                    var arry = comSelf.rangeSegY.ConvertToLine2(eX, eY);
                    $("#bsLabelI").html("Inline:" + arry.outInLine.toFixed(0));
                    $("#bsLabelC").html("Crossline:" + arry.outCrossLine.toFixed(0));
                } else {
                    $("#bsLabelI").html("");
                    $("#bsLabelC").html("");
                }
            } else {
                $("#bsLabelI").html("");
                $("#bsLabelC").html("");
            }

            // if (comSelf.OperationMode == 2)//交互模式 鼠标跟随
            // {
            //     if (comSelf.rangeSegY && comSelf.rangeSegY.seismicMainMap && comSelf.rangeSegY.seismicMainMap.MapBoundEarth != null) {
            //         if (comSelf.rangeSegY.seismicMainMap.MapBoundEarth.IsInPolygon(eX, eY)) {
            //             var seismicLine = this.SelectSeismicLine;
            //             if (seismicLine) {
            //                 comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = seismicLine;
            //             }
            //             else {
            //                 comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = null;
            //             }

            //         }
            //         else {
            //             comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = null;
            //         }
            //     }

            // }
            // else {
            //     if (comSelf.rangeSegY && comSelf.rangeSegY.seismicMainMap && comSelf.rangeSegY.seismicMainMap.MapBoundEarth != null) {
            //         comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = null;
            //     }
            // }

            var hiteResult = new WGADPlatGraph2D.WGHiteResult();
            var p = new WGADPlatGMEngine.WGPoint();
            hiteResult.SetSelectDataPoint(p);
            for (var m = 0; m < comSelf.View.MapData.LayerList.length; m++) {
                var olayer = comSelf.View.MapData.LayerList[m];

                if (olayer.Display && olayer.Actived) {
                    var gObject = comSelf.View.GetSelectedObj();
                    comSelf.GGeoObjShow(gObject);
                    break;
                } else {
                    olayer.HiteTest(hiteResult);
                    if (hiteResult.WhereInObj != WGADPlatGraph2D.EGMouseInObj.gmiNone) {
                        var gObject = hiteResult.HiteObject;
                        comSelf.GGeoObjShow(gObject);
                        break;
                    }
                }
            }
        };

        //图元显示
        this.GGeoObjShow = function (gObject) {
            if (gObject != null) {
                var flag = this.IsDisplay(gObject);
                if (!flag) {
                    $("#lblLayerAndObj").html("");

                    return;
                }
                //if (gObject.ObjType == EGObjectType.gtFrameWell)
                //{
                //    int a = 3;
                //}
                if (gObject.ObjName == "遮盖面积" || gObject.ObjName == "断层线闭合区域") {
                    return;
                }
                var gObjectParent = gObject.Parent;
                var str1 = gObject.ObjName; //图元名称

                if (
                    gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline ||
                    gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakPLine
                ) {
                    //var nvc = GCommandMap.GetEnumDescriptionValue(typeof(EGBreakLineUpDown));
                    var sxpName = gObject.BreakLineUpDown;
                    str1 = "断层线[" + sxpName + "]"; //+ (gObject as GFrameBreakLine).Tag + "(")
                }
                if (gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine) {
                    var sxpName = gObject.ValueText;
                    str1 = "等值线" + sxpName;
                }

                var Text = str1;
                for (
                    var i = 0;
                    i < 2;
                    i++ //图框中的文字子类，井的标注子类 图元的父类的父类是图层
                ) {
                    if (gObjectParent == null) {
                        break;
                    }

                    if (gObjectParent.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLayer) {
                        var str2 = gObjectParent.LayerName; //图层名称
                        if (!gObject.Visible) {
                            str1 = str1 + "(隐藏)";
                        }

                        // if (gObject.ObjType ==  WGADPlatGraph2D.EWGObjectTyp.gtFrameWell && m_formMain.ParamManager.IsParam("PropertyType"))
                        // {
                        //     string propertyName = m_formMain.ParamManager.GetParamValue("PropertyName").ToString();
                        //     string propertyType = m_formMain.ParamManager.GetParamValue("PropertyType").ToString();
                        //     GFrameWell well = gObject as GFrameWell;
                        //     if (well != null)
                        //     {
                        //         string result = well.GetWellData(propertyName);
                        //         double temp = 0;
                        //         bool sign = double.TryParse(result, out temp);
                        //         if (sign)
                        //         {
                        //             if (propertyName == "孔隙度" || propertyName == "渗透率" || propertyName == "含油饱和度" || propertyName == "含气饱和度" || propertyName == "含水饱和度" || propertyName == "泥质含量")
                        //             {
                        //                 temp = Math.Round(temp, 2, MidpointRounding.AwayFromZero);
                        //             }
                        //             else
                        //             {
                        //                 temp = Math.Round(temp, 1, MidpointRounding.AwayFromZero);
                        //             }
                        //             result = temp.ToString();
                        //         }
                        //
                        //         if (!string.IsNullOrEmpty(result))
                        //         {
                        //             str1 += " " + propertyName + ":" + result;
                        //         }
                        //     }
                        // }

                        if (gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameExploitation) {
                            var exploitation = gObject;
                            if (exploitation != null) {
                                str1 += " " + exploitation.WellName;
                            }
                        }
                        $("#lblLayerAndObj").html(str1 + "---" + str2);

                        break;
                    }

                    gObjectParent = gObjectParent.Parent;
                }
            }
        };
        this.IsDisplay = function (gObject) {
            var flag = true;
            //if (gObject.ObjType == EGObjectType.gtFrameWell)
            //{
            //    int a = 3;
            //}
            if (gObject == null) {
                return flag;
            }
            var gObjectParent = gObject.Parent;
            if (gObjectParent != null && gObjectParent.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLayer) {
                flag = gObjectParent.Display;
            } else {
                this.IsDisplay(gObjectParent);
            }
            return flag;
        };
        this.View.EventLineSelect = function (e) {
            comSelf.View.HiteResult.MutiSelect = true;
            var layer = comSelf.View.MapData.GetActivateLayer();
            if (layer != null) {
                var ic = layer.GetChildrenCount();
                for (var i = 0; i < ic; i++) {
                    var obj = layer.GetChildrenByIndex(i);
                    if (obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine) {
                        //判断是否相交
                        var isIn = obj.isLineCross(e.StartX, e.StartY, e.EndX, e.EndY);
                        if (isIn) {
                            comSelf.View.HiteResult.AddSelectObject(obj);
                            obj.Selected = true;
                        } else {
                            obj.Selected = false;
                        }
                    }
                }
            }
            comSelf.View.HiteResult.MutiSelect = false;
        };
        this.DealWithIsoLineInterval = function (layer, boldNum, lableNum, boldWidth, lableCheck, boldCheck) {
            //lableCheck 间隔显示标注  lableNum
            //boldCheck 间隔 boldNum
            //boldWidth 等值线加粗线宽
            var isoArr = [];
            var min = 1e10;
            var min2 = 1e10;
            //查询最小值
            for (var i = 0; i < layer.GetChildrenCount(); i++) {
                var m_IsoLine1 = layer.GetChildrenByIndex(i);
                if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                    isoArr.push(m_IsoLine1);
                    var value = Number(m_IsoLine1.ValueText);
                    if (min > value) {
                        min = value;
                    }
                }
            }

            //查询次小值
            for (var i = 0; i < layer.GetChildrenCount(); i++) {
                var m_IsoLine1 = layer.GetChildrenByIndex(i);
                if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                    var value = Number(m_IsoLine1.ValueText);
                    if (value > min && min2 > value) {
                        min2 = value;
                    }
                }
            }
            if (Math.abs(min2 - min) < 1e-6 || Math.abs(min2 - 1e10) < 1e-6) {
                return;
            }
            var ShowInterval = lableNum + 1;
            var BoldInterval = boldNum + 1;
            var LineWidth = boldWidth;
            for (var item in isoArr) {
                var LineItem = isoArr[item];
                LineItem.BoldNum = boldNum;
                LineItem.ShowNum = lableNum;
                LineItem.BoldLineWidth = LineWidth;
                LineItem.BoldCheck = boldCheck;
                LineItem.LableCheck = lableCheck;
                var value = Number(LineItem.ValueText);
                //处理标注是否显示
                if (lableCheck) {
                    //取等值线的值，是否跟最小值的间隔，是否整除步长
                    if (((value - min) / (min2 - min)) % ShowInterval == 0) {
                        LineItem.HiddenLabel = false;
                    } else {
                        LineItem.HiddenLabel = true;
                    }
                }

                //处理等值线宽度
                if (boldCheck) {
                    if (((value - min) / (min2 - min)) % BoldInterval == 0) {
                        LineItem.ViewPen.PenWidth = LineWidth;
                    }
                }
            }
            layer.SetDataChanged(true);
            comSelf.View.Repaint();
        };

        this.IsoArrSort = function (item1, item2) {
            return Number(item1.ValueText) - Number(item2.ValueText);
        };
        //开采现状图应用当前图元样式
        this.ApplyExpStyle = function (obj) {
            var layer = this.GetLayerOfObj(obj);
            for (var i = 0; i < layer.GetChildrenCount(); i++) {
                var o = layer.GetChildrenByIndex(i);
                if (o instanceof WGADPlatGraph2DFrame.WGFrameExploitation) {
                    o.OffX1 = obj.OffX1;
                    o.OffY1 = obj.OffY1;
                    for (var m = 0; m < o.GetChildrenCount(); m++) {
                        var o1 = o.GetChildrenByIndex(m);
                        o1.OffX1 = obj.GetChildrenByIndex(m).OffX1;
                        o1.OffY1 = obj.GetChildrenByIndex(m).OffY1;
                    }
                }
            }
            layer.SetDataChanged(true);
            this.View.Repaint();
        };
        //开采现状图应用模板
        this.ApplyExpTemplate = function (data) {
            var templateJson = data;
            if (templateJson != null) {
                var expObj = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonObjReturnObject(templateJson);
                var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltExploitation);
                if (layer != null && expObj != null) {
                    for (var i = 0; i < layer.GetChildrenCount(); i++) {
                        var exp = layer.GetChildrenByIndex(i);
                        if (exp instanceof WGADPlatGraph2DFrame.WGFrameExploitation) {
                            exp.CopyFromTemplet(expObj);
                        }
                    }
                    layer.SetDataChanged(true);
                    this.View.Repaint();
                }
            }
        };
        function GetRockTextUrl(rockTextUrl) {
            //获取岩性代码跟岩性名称对应
            $.ajax({
                url: WGADPlatConfig.rockTextUrlPath,
                async: false,
                dataType: "json",
                contentType: "utf-8",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == "123") {
                            if (data[i].pelItem != undefined) {
                                //加载文件名中不带（）的json
                                for (var k = 0; k < data[i].pelItem.length; k++) {
                                    if (data[i].pelItem[k].id.indexOf("(") < 0) {
                                        rockTextUrl[data[i].pelItem[k].text] = data[i].pelItem[k].url;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
        function GetSymbol(obj, str, name, JsonObjUrl, symbolData) {
            $.ajax({
                type: "GET",
                url: JsonObjUrl,
                scriptCharset: "utf-8",
                async: false,
                dataType: "json",
                success: function (data) {
                    var symbol = new WGADPlatGraph2D.WGGeoSymbol();
                    symbol.JsonObjLoad(data);
                    obj[str] = symbol;
                    symbolData[name] = data;
                }
            });
        }

        //加载测网数据
        this.SetSurveyGrid = function (data, layer) {
            // this.View.MapData.RemoveAllLayer();
            this.View.MapData.SJGL = "";
            this.View.MapData.SJGL += "|"; //测线
            this.View.MapData.SJGL += data.ObjID + ";";
            this.View.MapData.SJGL += data.HorizonName + "|";
            this.View.MapData.SJGL += this.View.MapData.MapID;

            layer.RemoveAllChildrens();

            //创建一个范围变量，用于自动计算大地坐标到线道号的转换，以及线道号到大地坐标的转换

            var LeftBottomX = data.ZXX;
            var LeftBottomY = data.ZXY;
            var LeftTopX = data.ZSX;
            var LeftTopY = data.ZSY;
            var RightBottomX = data.YXX;
            var RightBottomY = data.YXY;
            var RightTopX = data.YSX;
            var RightTopY = data.YSY;
            var MinLine = data.IZXZ;
            var MaxLine = data.IZDZ;
            var MinCDP = data.CZXZ;
            var MaxCDP = data.CZDZ;
            var CDPStep = data.CrossLineStep;
            this.rangeSegY = new WGADPlatGraph2DFrame.WGDSEGYRange({
                InLineStart: MinLine,
                InLineEnd: MaxLine,
                InLineStep: 1,
                CrossLineStart: MinCDP,
                CorossLineEnd: MaxCDP,
                CrossLineStep: 1
            });
            this.rangeSegY.LeftBottomX = LeftBottomX;
            this.rangeSegY.LeftBottomY = LeftBottomY;

            this.rangeSegY.LeftTopX = LeftTopX;
            this.rangeSegY.LeftTopY = LeftTopY;

            this.rangeSegY.RightBottomX = RightBottomX;
            this.rangeSegY.RightBottomY = RightBottomY;

            this.rangeSegY.RightTopX = RightTopX;
            this.rangeSegY.RightTopY = RightTopY;

            var seismicMainMap = new WGADPlatGraph2DFrame.WGFrameSeismicMainMap();
            seismicMainMap.ObjID = data.ObjID;
            var boundary = new WGADPlatGMEngine.WGPointPoly();

            boundary.AddPoint(data.ZSX, data.ZSY);
            boundary.AddPoint(data.ZXX, data.ZXY);
            boundary.AddPoint(data.YXX, data.YXY);
            boundary.AddPoint(data.YSX, data.YSY);
            layer.AddChildren(seismicMainMap);
            //设置范围WGADPlatGraph2DFrame.WGFrameSeismicGrid
            for (var i = 0; i < boundary.PointCount(); i++) {
                seismicMainMap.AddPoint(boundary.GetPointX(i), boundary.GetPointY(i));
            }
            seismicMainMap.MapBoundEarth = boundary;
            seismicMainMap.PointNames = ["", "", "", ""];

            this.rangeSegY.seismicMainMap = seismicMainMap;
            seismicMainMap.rangeSegY = this.rangeSegY;

            var grid = this.SetGrid(data.IZXZ, data.IZDZ, data.CZXZ, data.CZDZ, data.InlineStep, data.CrossLineStep);
            // grid.CrossLineFont.AutoScale = true;
            grid.CrossLineFont.AutoSize = true;
            grid.CrossLineFont.FontSize = 20;
            // grid.InLineFont.AutoScale = true;
            grid.InLineFont.AutoSize = true;
            grid.InLineFont.FontSize = 20;
            grid.AbleSelecte = false;
            grid.AllowDrag = false;
            grid.AllowMove = false;
            seismicMainMap.RemoveAllChildrens();
            seismicMainMap.AddChildren(grid);
            grid.IsDrawGrid = true;
            var minX = 1e9;
            var maxX = -1e9;
            var minY = 1e9;
            var maxY = -1e9;
            for (var i = 0; i < boundary.PointCount(); i++) {
                minX = Math.min(minX, boundary.GetPointX(i));
                maxX = Math.max(maxX, boundary.GetPointX(i));

                minY = Math.min(minY, boundary.GetPointY(i));
                maxY = Math.max(maxY, boundary.GetPointY(i));
            }
            // var xRange = 0.1 * (maxX - minX);
            // var yRange = 0.1 * (maxY - minY);
            // this.SetMapArea(minX - xRange, maxX + xRange, minY - yRange, maxY + yRange);
            this.View.MapData.UpdateTransform();
            this.View.MapData.UpdateMapSizeChange();
            // layer.UpdateTransform();
            layer.SetDataChanged(true);

            var desLayer = comSelf.View.MapData.GetLayerByName("地震图层辅助图层");
            if (desLayer == null) {
                desLayer = comSelf.View.MapData.AddLayerWithNameAndType(
                    "地震图层辅助图层",
                    WGADPlatGraph2DFrame.EWGFrameLayerType.fltGeneral
                );
            }
            this.View.Repaint();
        };
        /// <summary>
        /// 设置网格
        /// </summary>
        /// <param name="IZXZ"></param>
        /// <param name="IZDZ"></param>
        /// <param name="CZXZ"></param>
        /// <param name="CZDZ"></param>
        /// <param name="InlineStep"></param>
        /// <param name="CrossLineStep"></param>
        /// <returns></returns>
        this.SetGrid = function (IZXZ, IZDZ, CZXZ, CZDZ, InlineStep, CrossLineStep) {
            var grid = new WGADPlatGraph2DFrame.WGFrameSeismicGrid();
            grid.IsDrawGrid = false;
            grid.AllowDrag = false;
            grid.CrossLineNumber = 10;
            grid.InLineNumber = 10;
            grid.StartInLine = IZXZ;
            grid.EndInLine = IZDZ;
            grid.StartCrossLine = CZXZ;
            grid.EndCrossLine = CZDZ;
            grid.LineColor = WGADPlatGMEngine.WGColor.FromRGB(166, 166, 166);
            grid.CrossLineFont.Color = WGADPlatGMEngine.WGColor.FromRGB(255, 0, 0);
            grid.AbleSelecte = false;
            grid.AllowDrag = false;
            grid.AllowMove = false;
            //grid.LineStyle = EGLineStyle.glsDashDot;//实线
            grid.LineStyle = WGADPlatGMEngine.EGLineStyle.wglsDot; //虚线
            grid.InLineFont.Color = WGADPlatGMEngine.WGColor.FromRGB(0, 255, 0);

            if (InlineStep != 0 && CrossLineStep != 0) {
                grid.AutoStep = false;
                grid.InLineStep = InlineStep;
                grid.CrossLineStep = CrossLineStep;
            }
            grid.InLineFont.AutoScale = false;
            grid.InLineFont.AutoSize = false;
            grid.CrossLineFont.AutoScale = false;
            grid.CrossLineFont.AutoSize = false;
            return grid;
        };

        this.NewInline = function () {
            this.OperationMode = 1;
            var layer = this.View.MapData.GetLayerByName("测网图层");
            if (layer != null && layer) {
                layer.Actived = true;
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawSeismicLineY);
                this.direction = "Line";
            }
        };
        this.NewCrossline = function () {
            this.OperationMode = 1;
            var layer = this.View.MapData.GetLayerByName("测网图层");
            if (layer != null && layer) {
                layer.Actived = true;
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawSeismicLineX);
                this.direction = "Cross";
            }
        };
        this.NewAnyLine = function () {
            this.OperationMode = 1;
            var layer = this.View.MapData.GetLayerByName("测网图层");
            if (layer != null && layer) {
                layer.Actived = true;
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawSeismicPline);
                this.direction = "Any";
            }
        };
        this.MouseFolow = function () {
            comSelf.OperationMode = 2;
            if (comSelf.rangeSegY.seismicMainMap) {
                var seismicLine = comSelf.SelectSeismicLine;
                if (seismicLine) {
                    comSelf.rangeSegY.seismicMainMap.IsDrawMarker = true;
                    comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = seismicLine;
                } else {
                    comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = null;
                }
            }
        };
        this.MouseFolowStop = function () {
            comSelf.OperationMode = 0;
            comSelf.rangeSegY.seismicMainMap.IsDrawMarker = false;
        };
        //绘制自动标记 根据当前线号
        this.AutoFollowDraw = function (inline, crossline) {
            comSelf.OperationMode = 3;
            //根据线号获取图层上的线
            var result = this.rangeSegY.ConvertToEarth(inline, crossline);
            var point = new WGADPlatGMEngine.WGPoint();
            point.Init(result[0], result[1]);

            this.RefreshSelectSesmicLine(point); //找到点所在的线，设置为当前切线

            //绘制标记点
            comSelf.View.Repaint();
            var canvas = WGADPlatGMEngineTools.Canvas.Canvas;
            point = point.TransformData(this.View.MapData.Transform.GetEarthToMapMatrix());

            comSelf.rangeSegY.seismicMainMap.IsDrawMarker = false;
            comSelf.rangeSegY.seismicMainMap.DrawDot(canvas, point, false);
        };
        //取消自动标记绘制
        this.StopAutoFollowDraw = function () {
            comSelf.OperationMode = 0;
            comSelf.View.Repaint();
            comSelf.rangeSegY.seismicMainMap.IsDrawMarker = false;
            comSelf.View.Repaint();
        };
        this.ResetMode = function (mode) {
            comSelf.OperationMode = mode;
            if (mode == 0) {
                comSelf.StopAutoFollowDraw();
                $("#chkMouseFolow").prop("checked", false);
                $("#chkMouseFolow").prop("disabled", false);
            } else if (mode == 2) {
                if (comSelf.rangeSegY.seismicMainMap) {
                    var seismicLine = comSelf.SelectSeismicLine;
                    if (seismicLine) {
                        comSelf.rangeSegY.seismicMainMap.IsDrawMarker = true;
                        comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = seismicLine;
                    } else {
                        comSelf.rangeSegY.seismicMainMap.SelectSeismicLine = null;
                    }
                }
                $("#chkMouseFolow").prop("checked", false);
                // $("#chkMouseFolow").prop('disabled',true);
            } else if (mode == 3) {
                if (comSelf.rangeSegY.seismicMainMap) {
                    comSelf.rangeSegY.seismicMainMap.IsDrawMarker = false;
                }
                $("#chkMouseFolow").prop("checked", false);
                $("#chkMouseFolow").prop("disabled", true);
            }
        };

        this.RefreshSelectSesmicLine = function (point) {
            var desLayer = comSelf.View.MapData.GetLayerByName("地震图层辅助图层");
            if (desLayer != null) {
                var Num = desLayer.GetChildrenCount();
                for (var i = 0; i < Num; i++) {
                    var line = desLayer.GetChildrenByIndex(i);
                    if (line instanceof WGADPlatGraph2DFrame.WGFrameSeismicCrossPLine) {
                        if (line.MapBoundEarth.IsInLine(point.GetX(), point.GetY(), 0.1) >= 0) {
                            // line.Hidden = false;
                            // selectline = line;
                            this.SelectSeismicLine = line;
                            break;
                        }
                    }
                }
            }
        };

        this.View.EventObjectSeismicPLineDraw = function (e) {
            if (e.HiteObj == null) return;
            comSelf.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
            var desLayer = comSelf.View.MapData.GetLayerByName("地震图层辅助图层");
            if (desLayer == null) {
                desLayer = comSelf.View.MapData.AddLayerWithNameAndType(
                    "地震图层辅助图层",
                    WGADPlatGraph2DFrame.EWGFrameLayerType.fltGeneral
                );
                var arr = comSelf.View.MapData.LayerList;
                for (var i in arr) {
                    if (arr[i].LayerName == desLayer.LayerName) {
                        arr.splice(i, 1);
                    }
                }
                arr.unshift(desLayer);
            }
            desLayer.Actived = true;
            e.HiteObj.Tag = comSelf.direction; //保存方向
            e.HiteObj.ObjName = comSelf.GetDefaultName();
            e.HiteObj.AllowDrag = false;
            e.HiteObj.AllowMove = false;
            desLayer.AddChildren(e.HiteObj);

            var temp = e.HiteObj.GetEarthPLine();
            //获取需要传入到js的点列信息
            comSelf.pointInfo = comSelf.GetLinkInfo(temp);
            comSelf.wellInfo = "";
            // comSelf.wellInfo = comSelf.GetRealWellInfo(temp, comSelf.distance);
            comSelf.direction = e.HiteObj.Tag.toString();
            if (comSelf.EventAfterSesmicLineAdd) {
                comSelf.EventAfterSesmicLineAdd(comSelf.pointInfo, comSelf.wellInfo, comSelf.direction);
            }
            desLayer.SetDataChanged(true);
            comSelf.SelectSeismicLine = e.HiteObj;
            comSelf.View.Repaint();
            this.OperationMode = 0;
            // console.log(comSelf.SelectSeismicLine);
        };
        /// <summary>
        /// 获取连接点信息
        /// </summary>
        /// <param name="temp"></param>
        /// <returns></returns>
        this.GetLinkInfo = function (temp) {
            var str = "";
            var sb = "";
            var num = temp.PointCount();

            for (var i = 0; i < num; i++) {
                var CoordX = temp.GetPointX(i);
                var CoordY = temp.GetPointY(i);
                var outInLine;
                var outCrossLine;
                var result = this.rangeSegY.ConvertToLine2(CoordX, CoordY, outInLine, outCrossLine);
                CoordX = result.outInLine;
                CoordY = result.outCrossLine;
                sb += "<";
                sb += CoordX + ",";
                sb += CoordY;
                sb += ">";
                sb += ";";
            }

            if (sb.length > 0) {
                str = sb.toString();
                str = str.substring(0, str.length - 1);
            }

            return str;
        };
        /// <summary>
        /// 获取默认名称
        /// </summary>
        /// <returns></returns>
        this.GetDefaultName = function () {
            var Name = "DefaultLine_1";
            var DesLayer = comSelf.View.MapData.GetLayerByName("地震图层辅助图层");
            if (DesLayer != null) {
                var Num = DesLayer.GetChildrenCount();
                var index = 0;
                for (var i = 0; i < Num; i++) {
                    var Line = DesLayer.GetChildrenByIndex(i);
                    if (Line == null) {
                        continue;
                    }

                    if (Line.ObjName.indexOf("DefaultLine") >= 0) {
                        index++;
                    }
                }

                Name = "DefaultLine_" + index;
            }

            return Name;
        };

        this.SetAfterMarkerDrawEvent = function (fun) {
            if (comSelf.rangeSegY.seismicMainMap) {
                comSelf.rangeSegY.seismicMainMap.EventAfterMarkerDraw = fun;
            }
        };
        var layersort = function (layer1, layer2) {
            return layer1.LayerIndex - layer2.LayerIndex;
        };

        this.SetLegendFill = function (legendlayerjson, isofilllayername) {
            //找到图例json
            var itemObject = null;
            for (var j = 0; j < legendlayerjson.Objects.length; j++) {
                switch (legendlayerjson.Objects[j].ObjType) {
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLegend:
                        itemObject = legendlayerjson.Objects[j];
                        break;
                    default:
                        break;
                }
            }

            //获取图例图层，存在删除图例 不存在创建
            var legendlayer = this.View.MapData.GetLayerByName(legendlayerjson.LayerName);
            if (legendlayer != null) {
                //删除原有图例
                for (var i = 0; i < legendlayer.GetChildrenCount(); i++) {
                    var obj = legendlayer.GetChildrenByIndex(i);
                    if (obj instanceof WGADPlatGraph2DFrame.WGFrameIsoLegend) {
                        legendlayer.RemoveChildrenByIndex(i);
                        break;
                    }
                }
            } else {
                legendlayer = new WGADPlatGraph2DFrame.WGFrameLayer({});
                legendlayer.LayerName = legendlayerjson.LayerName;
                legendlayer.LayerType = legendlayerjson.LayerType;
                legendlayer.Actived = legendlayerjson.Active;
                this.View.MapData.AddLayer(legendlayer);
                legendlayer.LayerIndex = legendlayerjson.LayerIndex;
                if (legendlayerjson.Display != undefined) {
                    legendlayer.Display = legendlayerjson.Display;
                    legendlayer.Hidden = !legendlayer.Display;
                }
            }

            //添加图例
            if (itemObject != null) {
                var isolegend = new WGADPlatGraph2DFrame.WGFrameIsoLegend({});
                isolegend.PositionX = itemObject.PositionX;
                isolegend.PositionY = itemObject.PositionY;
                isolegend.Width = itemObject.Width;
                isolegend.Height = itemObject.Height;
                isolegend.Text = itemObject.Text;
                isolegend.ColorList = itemObject.ColorList;
                isolegend.MaxValue = itemObject.MaxValue;
                isolegend.MinValue = itemObject.MinValue;
                if (itemObject.ShowMode != undefined) {
                    isolegend.ShowMode = itemObject.ShowMode;
                    if (itemObject.ShowMode == 1) {
                        isolegend.ColorList = itemObject.ColorList2;
                    } else if (itemObject.ShowMode == 0) {
                        isolegend.MaxValue = Math.max.apply(null, itemObject.Text.map(Number));
                        isolegend.MinValue = Math.min.apply(null, itemObject.Text.map(Number));
                    }
                }
                isolegend.IsoValueType = 0; //0 正常 1 反向
                isolegend.StartFromMin = false; //从最小刻度开始显示

                isolegend.Pace = itemObject.Pace;
                if (itemObject.IsoValueType != undefined) {
                    isolegend.IsoValueType = itemObject.IsoValueType;
                }
                if (itemObject.StartFromMin != undefined) {
                    isolegend.StartFromMin = itemObject.StartFromMin;
                }
                if (itemObject.IsLeftShowText != undefined) {
                    isolegend.IsLeftShowText = itemObject.IsLeftShowText;
                }

                isolegend.IsShowGradient = true;
                legendlayer.AddChildren(isolegend);

                //修改填充图层颜色
                if (!isofilllayername) {
                    isofilllayername = legendlayerjson.LayerName;
                }

                if (itemObject.ShowMode == 0) {
                }
                var isofilllayer = this.View.MapData.GetLayerByName(isofilllayername);
                if (isofilllayer != null) {
                    for (var i = 0; i < isofilllayer.GetChildrenCount(); i++) {
                        var obj = isofilllayer.GetChildrenByIndex(i);
                        if (obj instanceof WGADPlatGraph2DFrame.WGFrameIsoLineFill) {
                            //获取比例
                            var color = this.GetIsoLineColorByValue(obj.IsolineValue, isolegend);
                            obj.ViewBrush.Color = color;
                        }
                    }
                }
            }
            this.View.Repaint();
        };
        //根据value获取颜色
        this.GetIsoLineColorByValue = function (value, isolegend) {
            var colorPlan = isolegend.ColorList;
            var count = colorPlan.length;
            if (count >= 1) {
                var showmode = 0;
                if (colorPlan[0].Index != undefined) {
                    showmode = 1;
                }
                // if (showmode == 1) {
                //     for (var m = 0; m < count; m++) {
                //         colorPlan[m].Color = Object.assign({}, colorPlan[m]);
                //         colorPlan[m].Index = (m + 1) / colorPlan.length;
                //     }
                // }
                if (showmode == 1) {
                    value = (value - isolegend.MinValue) / (isolegend.MaxValue - isolegend.MinValue);
                    if (value < colorPlan[0].Index) {
                        return WGADPlatGMEngine.WGColor.FromARGB(
                            255,
                            colorPlan[0].Color.R,
                            colorPlan[0].Color.G,
                            colorPlan[0].Color.B
                        );
                    }

                    if (count == 1) {
                        return WGADPlatGMEngine.WGColor.FromARGB(
                            255,
                            colorPlan[0].Color.R,
                            colorPlan[0].Color.G,
                            colorPlan[0].Color.B
                        );
                    }

                    var findColor = false;
                    for (var i = 0; i < count - 1; i++) {
                        if (value >= colorPlan[i].Index && value < colorPlan[i + 1].Index) {
                            var num3 = value - colorPlan[i].Index;
                            var num4 = num3 / (colorPlan[i + 1].Index - colorPlan[i].Index);
                            var r = colorPlan[i].Color.R;
                            var g = colorPlan[i].Color.G;
                            var b = colorPlan[i].Color.B;
                            var num8 = colorPlan[i + 1].Color.R;
                            var num9 = colorPlan[i + 1].Color.G;
                            var num10 = colorPlan[i + 1].Color.B;
                            findColor = true;
                            return WGADPlatGMEngine.WGColor.FromARGB(
                                255,
                                r + num4 * (num8 - r),
                                g + num4 * (num9 - g),
                                b + num4 * (num10 - b)
                            );
                        }
                    }

                    if (!findColor) {
                        return WGADPlatGMEngine.WGColor.FromARGB(
                            255,
                            colorPlan[count - 1].Color.R,
                            colorPlan[count - 1].Color.G,
                            colorPlan[count - 1].Color.B
                        );
                    }
                } else if (showmode == 0) {
                    var textArry = isolegend.Text;
                    if (count == 1) {
                        return WGADPlatGMEngine.WGColor.FromARGB(255, colorPlan[0].R, colorPlan[0].G, colorPlan[0].B);
                    }

                    var findColor = false;
                    for (var i = 0; i < count - 1; i++) {
                        if (
                            (value >= Number(textArry[i]) && value < Number(textArry[i + 1])) ||
                            (value < Number(textArry[i]) && value >= Number(textArry[i + 1]))
                        ) {
                            var m = i;
                            n = i + 1;
                            if (textArry[i] > textArry[i + 1]) {
                                m = i + 1;
                                n = i;
                            }
                            var num3 = value - Number(textArry[i]);
                            var num4 = num3 / (Number(textArry[i + 1]) - Number(textArry[i]));
                            var r = colorPlan[m].R;
                            var g = colorPlan[m].G;
                            var b = colorPlan[m].B;
                            var num8 = colorPlan[n].R;
                            var num9 = colorPlan[n].G;
                            var num10 = colorPlan[n].B;
                            findColor = true;
                            return WGADPlatGMEngine.WGColor.FromARGB(
                                255,
                                r + num4 * (num8 - r),
                                g + num4 * (num9 - g),
                                b + num4 * (num10 - b)
                            );
                        }
                    }

                    if (!findColor) {
                        return WGADPlatGMEngine.WGColor.FromARGB(
                            255,
                            colorPlan[count - 1].R,
                            colorPlan[count - 1].G,
                            colorPlan[count - 1].B
                        );
                    }
                }
            }
            return WGADPlatGMEngine.WGColor.FromARGB(255, 255, 255, 255);
        };

        this.GetSesmicLineList = function () {
            var list = [];
            var desLayer = comSelf.View.MapData.GetLayerByName("地震图层辅助图层");
            if (desLayer != null) {
                var num = desLayer.GetChildrenCount();
                for (var i = 0; i < num; i++) {
                    var line = desLayer.GetChildrenByIndex(i);
                    if (line instanceof WGADPlatGraph2DFrame.WGFrameSeismicCrossPLine) {
                        list.push(line);
                    }
                }
            }
            return list;
        };
    };
    return Com;
});
