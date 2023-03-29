/**
 * Created by LMP on 2017/5/8.
 */
define(['WGAD/Scripts/WGADPlatConfig/WGADPlatConfig',
    'WGAD/Scripts/WGADPlatGMEngine',
    'WGAD/Scripts/WGADPlatGMEngineTools',
    'WGAD/Scripts/WGADPlatGraph2D',
    'WGAD/Scripts/WGADPlatGraph2DFrame',
    'WGAD/Scripts/WGADPlatSystemTools'
], function (WGADPlatConfig, WGADPlatGMEngine, WGADPlatGMEngineTools, WGADPlatGraph2D, WGADPlatGraph2DFrame, WGADPlatSystemTools) {
    var Com = {};

    Com.WGADPlatComFrame = function (viewSetting, contentWindow) {

        this.lineSymbolData = [];
        var comSelf = this;
        this.PropertyPanel = new WGADPlatSystemTools.WGPropteryPanel();

        this.LayerList = new WGADPlatSystemTools.WGLayerList();

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
        var xmin = 1000000000, ymin = 1000000000, xmax = 0, ymax = 0;
        this.SelectedObj = null;
        this.View.MapData.ViewScaleMinValue = 0.5;
        this.View.MapData.ViewScaleMaxValue = 10.0;
        this.EventMidWinOk = function (e) {

        }
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
        }
        this.SetFrameData = function (data) {
            if (data.MinXMap != undefined && data.MaxYMap != undefined
                && data.MaxXMap != undefined && data.MinYMap != undefined) {
                this.View.MapData.SetEarthArea(data.MinXMap, data.MaxYMap, data.MaxXMap, data.MinYMap);
                this.View.MapData.SetMapToEarthScale(10000, 10000);
                this.View.MapData.SetPageMargin(0, 10, 0, 0);
                this.View.MapData.ViewScale = 1.0;
                this.View.ScrollView(this.View.HScrollValue, this.View.VScrollValue);
                this.View.MapData.IsCenterShowX = true;
                this.View.MapData.IsCenterShowY = true;
            }
            if (data.PicMinXMap != undefined && data.PicMaxXMap != undefined
                && data.PicMaxYMap != undefined && data.PicMinYMap != undefined) {
                this.View.MapData.EarthLeft = data.PicMinXMap;
                this.View.MapData.EarthRight = data.PicMaxXMap;
                this.View.MapData.EarthTop = data.PicMaxYMap;
                this.View.MapData.EarthBottom = data.PicMinYMap;
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
            if (data.Layers) {
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
                                isolegend.IsShowGradient = true;
                                layer.AddChildren(isolegend);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameWell:
                                var well = new WGADPlatGraph2DFrame.WGFrameWell({});
                                well.WellName = itemObject.WellName;
                                well.CoordX = itemObject.CoordX;
                                well.CoordY = itemObject.CoordY;
                                well.BXHB = itemObject.BXHB;
                                well.IsUsed = itemObject.Used;
                                well.WellJsjg = itemObject.JSJG;
                                well.WellType = itemObject.WellType;
                                well.WellData = itemObject.Data;
                                well.WellSize = 1;
                                well.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(255, 255, 0, 0);
                                well.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;

                                if (xmin > itemObject.CoordX)
                                    if (ymax < itemObject.CoordY)
                                        ymax = itemObject.CoordY;

                                var welltext = new WGADPlatGraph2DFrame.WGFrameWellLabelText({});
                                welltext.Label = itemObject.WellName;
                                welltext.OffX = 1.5;
                                welltext.OffY = 1;
                                well.AddChildren(welltext);

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
                                for (var j = 0; j < data.Layers[i].Objects.length; j++) {
                                    if (itemObject.wellTrack) {
                                        for (var m = 0; m < itemObject.wellTrack.length; ++m) {
                                            if (itemObject.wellTrack[m].FWJHD === "NULL" || !itemObject.wellTrack[m].FWJHD) {
                                                if (itemObject.wellTrack[m].FWJ != "NULL") {
                                                    itemObject.wellTrack[m].FWJHD = itemObject.wellTrack[m].FWJ * 3.14 / 180;
                                                }


                                            }

                                            if (itemObject.wellTrack[m].JXJHD === "NULL" || !ditemObject.wellTrack[m].JXJHD) {
                                                if (itemObject.wellTrack[m].JXJ != "NULL") {
                                                    itemObject.wellTrack[m].JXJHD = itemObject.wellTrack[m].JXJ * 3.14 / 180;
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
                                    if (xmin > itemObject.Points[k].X)
                                        xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X)
                                        xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y)
                                        ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y)
                                        ymax = itemObject.Points[k].Y;
                                }
                                var lineSymbolCode = itemObject.LineSymbolCode;
                                if (lineSymbolCode != undefined && lineSymbolCode != "" && this.lineSymbolData[lineSymbolCode]) {
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

                                SetViewPen(isoline.ViewPen, itemObject.ViewPen);
                                SetViewPen(isoline.ViewPenCircle, itemObject.ViewPenCircle);
                                if (itemObject.circleRadius) {
                                    isoline.circleRadius = itemObject.circleRadius;
                                }
                                SetViewBrush(isoline.ViewBrushCircle, itemObject.ViewBrushCircle)
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

                                    if (xmin > itemObject.Points[k].X)
                                        xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X)
                                        xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y)
                                        ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y)
                                        ymax = itemObject.Points[k].Y;
                                }

                                var lineSymbolCode = itemObject.LineSymbolCode;
                                if (lineSymbolCode != undefined && lineSymbolCode != "" && this.lineSymbolData[lineSymbolCode]) {
                                    var linesymbol = new WGADPlatGraph2D.WGLineStyle({});
                                    linesymbol.JsonObjLoad(this.lineSymbolData[lineSymbolCode]);
                                    breakline.SetLineStyle(linesymbol);
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

                                    if (xmin > itemObject.Points[k].X)
                                        xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X)
                                        xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y)
                                        ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y)
                                        ymax = itemObject.Points[k].Y;
                                }

                                var lineSymbolCode = itemObject.LineSymbolCode;
                                if (lineSymbolCode != undefined && lineSymbolCode != "" && this.lineSymbolData[lineSymbolCode]) {
                                    var linesymbol = new WGADPlatGraph2D.WGLineStyle({});
                                    linesymbol.JsonObjLoad(this.lineSymbolData[lineSymbolCode]);
                                    foulline.SetLineStyle(linesymbol);

                                    foulline.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(this.lineSymbolData[lineSymbolCode].PenColorA, this.lineSymbolData[lineSymbolCode].PenColorR, this.lineSymbolData[lineSymbolCode].PenColorG, this.lineSymbolData[lineSymbolCode].PenColorB);
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
                                isoLineFill.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(itemObject.FillColor[0], itemObject.FillColor[1], itemObject.FillColor[2], itemObject.FillColor[3])
                                isoLineFill.ViewBrush.FillStyle = 0;
                                isoLineFill.IsolineFillStyle = m_isolineFillStyle;
                                for (var k = 0; k < itemObject.Points.length; k++) {
                                    isoLineFill.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);

                                    if (xmin > itemObject.Points[k].X)
                                        xmin = itemObject.Points[k].X;
                                    if (xmax < itemObject.Points[k].X)
                                        xmax = itemObject.Points[k].X;
                                    if (ymin > itemObject.Points[k].Y)
                                        ymin = itemObject.Points[k].Y;
                                    if (ymax < itemObject.Points[k].Y)
                                        ymax = itemObject.Points[k].Y;
                                }
                                layer.AddChildren(isoLineFill);
                                break;
                            case WGADPlatGraph2D.EWGObjectType.wgtPLine:
                                {
                                    var polyline = new WGADPlatGraph2D.WGGeoPolyline({});
                                    polyline.ViewPen.LineWidth = itemObject.LineWidth;
                                    polyline.Visible = itemObject.Visible;
                                    polyline.Closed = true;
                                    if (itemObject.Closed != undefined) {
                                        polyline.Closed = itemObject.Closed;
                                    }
                                    polyline.ViewPen.LineColor = WGADPlatGMEngine.WGColor.FromARGB(itemObject.LineColor[0], itemObject.LineColor[1], itemObject.LineColor[2], itemObject.LineColor[3]);
                                    for (var k = 0; k < itemObject.Points.length; k++) {
                                        polyline.AddPoint(itemObject.Points[k].X, itemObject.Points[k].Y);
                                    }
                                    layer.AddChildren(polyline);
                                    break;
                                }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameExploitation:
                                {
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
                                            expHis.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(obj.Color[0], obj.Color[1], obj.Color[2], obj.Color[3]);
                                            expHis.Value = obj.Value;
                                            expHis.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
                                            expHis.Text = obj.Text;
                                            expHis.Code = obj.Code;
                                            if (obj.Height != undefined) {
                                                expHis.Height = obj.Height;
                                            }
                                            else {
                                                expHis.Height = exp.MaxHisHeight * expHis.Value / exp.MaxHisValue;
                                            }
                                            if (obj.ShowText != undefined && !obj.ShowText) {
                                                expHis.ShowText = false;
                                            }
                                            else {
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
                                            expPie.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(obj.Color[0], obj.Color[1], obj.Color[2], obj.Color[3]);
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
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameLogTube:
                                {
                                    var logTube = new WGADPlatGraph2DFrame.WGFrameLogTube({});
                                    logTube.SetCoordX(itemObject.CoordX);
                                    logTube.SetCoordY(itemObject.CoordY);
                                    logTube.ObjName = itemObject.ObjName;
                                    logTube.Scale = itemObject.Scale;
                                    logTube.Width = itemObject.Width;
                                    logTube.Tag = itemObject.Tag;
                                    logTube.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(itemObject.LineColor[0], itemObject.LineColor[1], itemObject.LineColor[2], itemObject.LineColor[3]);
                                    var logCurve = itemObject.Curve;
                                    if (logCurve != undefined) {
                                        for (var m = 0; m < logCurve.length; m++) {
                                            var log = new WGADPlatGraph2DFrame.WGFrameWellLog({});
                                            log.Width = logCurve[m].Width;
                                            log.Height = logCurve[m].Height;
                                            log.StartDepth = logCurve[m].StartDepth;
                                            log.EndDepth = logCurve[m].EndDepth;
                                            log.IsShowName = logCurve[m].IsShowName;
                                            log.IntervalNum = logCurve[m].IntervalNum;
                                            log.CurveDataType = logCurve[m].CurveDataType;
                                            log.LogName = logCurve[m].LogName;
                                            log.LayerPly = logCurve[m].LayerPly;
                                            var objCurve = new WGADPlatGMEngineTools.WGDataLogCurveOneExt();
                                            objCurve.DepthList = itemObject.DepthList;
                                            objCurve.ValueList = logCurve[m].ValueList;
                                            objCurve.GetMinMaxDepth();
                                            objCurve.GetMinMaxValue();
                                            log.CurveData = objCurve;
                                            logTube.AddChildren(log);
                                        }
                                    }

                                    layer.AddChildren(logTube);
                                    break;
                                }
                            case WGADPlatGraph2D.EWGObjectType.wgtFrameBubble:
                                {
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
                                        var textobj=[];
                                        for (var m = 0; m < itemObject.Pie.length; m++) {
                                            var obj = itemObject.Pie[m];
                                            var expPie = new WGADPlatGraph2DFrame.WGFrameBubblePie({});
                                            expPie.AllowDrag=false;
                                            expPie.AbleSelecte=false;
                                            expPie.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(255, 0, 0, 0);
                                            expPie.ViewPen.PenWidth = 0.3;
                                            if(obj.Color!=undefined&&obj.Color.length>3)
                                            {
                                                expPie.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB(obj.Color[0], obj.Color[1], obj.Color[2], obj.Color[3]);
                                            }
                                            
                                            expPie.Value = obj.Value;
                                            expPie.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
                                            expPie.Text = obj.Text;
                                            expPie.Code = obj.Code;

                                            var expText = new WGADPlatGraph2DFrame.WGFrameExpText({});
                                            expText.AbleSelecte = false;
                                            expText.DrawFrame = false;
                                            expText.PointX=exp.CoordX;
                                            expText.PointY=exp.CoordY;
                                            expText.ParentObj=expPie;
                                            expText.Text=expPie.Value.toString();
                                            expText.TextFont.FontSize=12;
                                            expText.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
                                            expText.TextFont.HorizAlign = WGADPlatGMEngine.EGTextVAlign.wghaCENTER;
                                            textobj.push(expText);
                                           
                                            if (obj.ShowText != undefined && !obj.ShowText) {
                                                expText.Hidden = true;
                                            }
                                            else {
                                                expText.Hidden = false;
                                            }
                                            
                                            exp.AddChildren(expPie);


                                        }
                                        for(var index in textobj)
                                        {
                                            exp.AddChildren(textobj[index]);
                                        }
                                    }
                                    layer.AddChildren(exp);
                                    break;
                                }
                        }

                    }
                }
            }

            this.OuntEarthBound.initial(data.MinXMap, data.MaxYMap, data.MaxXMap, data.MinYMap);
            this.View.MapData.SetChanged(true);
            this.View.Repaint();
        }
        //画笔赋值
        function SetViewPen(pen, data) {
            if (data && pen) {
                if (data.PenColorA) {
                    pen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(data.PenColorA, data.PenColorR, data.PenColorG, data.PenColorB);
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
                    brush.Color = WGADPlatGMEngine.WGColor.FromARGB(data.BrushColorA, data.BrushColorR, data.BrushColorG, data.BrushColorB);
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
        }
        this.ApplyWellTemplate = function (data, type) {
            var wellJson = data;
            if (wellJson != null) {
                var wellObj = WGADPlatGMEngineTools.WGJsonObjPersistence.JsonObjReturnObject(wellJson);
                var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
                if (layer != null && wellObj != null) {
                    for (var i = 0; i < layer.GetChildrenCount(); i++) {
                        var well = layer.GetChildrenByIndex(i);
                        if (type == 0)//全部井
                        {
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                well.RemoveAllChildrens();
                                well.CopyFromTemplet(wellObj);
                            }
                        }
                        else if (type == 1)//选中井
                        {
                            //var wellSelect=this.View.HiteResult.SelectObjs;
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                if (well.Selected) {
                                    well.RemoveAllChildrens();
                                    well.CopyFromTemplet(wellObj);
                                }
                            }
                        }
                        else if (type == 2)//同种井别
                        {
                            if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                                if (well.WellType == wellObj.WellType) {
                                    well.RemoveAllChildrens();
                                    well.CopyFromTemplet(wellObj);
                                }
                            }
                        }
                        else if (type == 3)//同种解释
                        {
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
        }


        this.AddLayer = function (layerName, LayerType) {
            var layer = new WGADPlatGraph2DFrame.WGFrameLayer({});
            layer.LayerName = layerName;
            layer.LayerType = LayerType;
            this.View.MapData.AddLayer(layer);
            layer.Actived = true;
        }
        this.SetViewSetting = function (setting) {
            this.View.CanvasID = setting.CanvasID;
            this.View.CanvasStyle = setting.CanvasStyle;
        }
        //设置图形范围
        this.SetMapArea = function (left, top, right, bottom) {
            this.View.MapData.SetEarthArea(left, top, right, bottom);
        }

        //设置图形比例
        this.SetMapScale = function (scaleX, scaleY) {
            this.View.MapData.SetMapToEarthScale(scaleX, scaleY);
        }

        //图形显示比例
        this.SetViewScale = function (scale) {
            this.View.MapData.ViewScale = scale;
        }

        this.SetLayerActive = function (layer, isActive) {
            this.View.MapData.SetActivateLayer(layer, isActive);
        }
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
                        layer["Activeds"] = true;//此处给一个默认值为当前单独激活的哪一个图层。用作绘制等值线 剪灭线等应用
                        break;
                    } else {
                        layer["Activeds"] = true;//此处给一个默认值为当前单独激活的哪一个图层。用作绘制等值线 剪灭线等应用
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
        }
        //图形列表 显示 隐藏
        this.handleCheckChange = function (layerId, isActive) {
            for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                if (this.View.MapData.LayerList[i].ObjID == layerId) {
                    this.View.MapData.LayerList[i].Hidden = !isActive;
                    this.View.MapData.LayerList[i].Display = isActive;
                    this.View.Repaint();
                }
            }
        }
        this.SetLayerDisplay = function (layer, isDisplay) {
            this.View.MapData.SetDisplayLayer(layer, isDisplay);
        }
        this.GetSelectObjFromMap = function () {
            this.SelectedObj = this.View.HiteResult.SelectObjs;
            return SelectedObj;

        }
        /// <summary>
        /// 东西走向井斜显示
        /// </summary>
        /// <param name="TrackData"></param>
        /// <param name="MinX"></param>
        /// <param name="MaxX"></param>
        /// <param name="curveData"></param>
        /// <returns></returns>
        var MakeXToY = function (trackData) {
            var MinX = 1E9;
            var MaxX = -1E9;
            var MinY = 1E9;
            var MaxY = -1E9;
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
        }
        //全图显示
        this.ZoomAll = function () {
            var width = this.View.MapCanvas.width;
            var height = this.View.MapCanvas.height;
            this.View.MapData.ZoomAll(width, height);
            this.View.Repaint();
            //console.log(this.View.MapData.ViewScale);
        }

        //如果有底图，以底图范围来求缩放系数
        this.ZoomPicture = function () {
            this.View.MapData.ZoomPicture();
            this.View.Repaint();
        }

        //清空view
        this.ClearView = function (i) {
            if (this.View.MapData.GetActivateLayer()) {
                this.View.MapData.GetActivateLayer().RemoveAllChildrens();
                //this.View.ScrollView(this.View.HScrollValue, this.View.VScrollValue);
            }
        }
        this.ShowLayerList = function () {
            if (this.LayerList.isShow) {
                this.LayerList.Hide();
            }
            else {
                this.LayerList.Show(this.View);
            }
        }

        //所有图元范围导出
        this.SaveToPng = function () {
            // var p = this.View.toPngDataURL(0, 0);

            var p = this.View.MapData.toPngDataURLFitAll();
            //删除字符串前的提示信息 "data:image/png;base64,"
            var b64 = p.substring(22);
            console.log(b64);
            var filename = new Date().toLocaleDateString() + '.' + 'png';

            downloadFile(filename, p);
            //return b64;
        }
        //底图范围导出
        this.SaveToPngPicture = function () {
            var p = this.View.MapData.toPngDataURL(0, 0);
            //删除字符串前的提示信息 "data:image/png;base64,"
            var b64 = p.substring(22);
            console.log(b64);
            var filename = new Date().toLocaleDateString() + '.' + 'png';

            downloadFile(filename, p);
        }
        this.SaveToBase = function () {
            var p = this.View.toPngDataURL(0, 0);
            //删除字符串前的提示信息 "data:image/png;base64,"
            var b64 = p.substring(22);
            console.log(b64);
            return b64;
        }

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

                var aLink = document.createElement('a');
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);
                aLink.click();
            }
        }


        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
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
            var str = JSON.stringify(JsonObj)
            console.log(str);
            this.View.MapData.IsChanged = false;
            return str;

        }
        this.SetColor = function (e) {
            return WGADPlatGMEngine.WGColor.FromARGB(Number(e[0]), Number(e[1]), Number(e[2]), Number(e[3]));
        }

        this.GetObjProperty = function (obj) {
            return WGADPlatGraph2D.WGObjPropertyFactory.CreateObjProperty(obj, obj.GetObjFullName());
        }
        /// <summary>
        /// 控制点击跟拖动事件
        /// </summary>
        /// <param name="flagClick">是否允许点击</param>
        /// <param name="flagDrag">是否允许拖动</param>
        this.ShowClickDragStatus = function (flagClick, flagDrag) {
            this.View.MapCanvas.style.cursor = WGADPlatGraph2D.WGActionFactory.GetActionCursor(WGADPlatGraph2D.EWGMapOpModel.msbMove);
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbMove);
        }

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
        }
        this.View.EventObjectDoubleClick = function (event) {
            var obj = event.HiteObj;
            comSelf.SelectedObj = event.HiteObj;
            if (obj != null) {
                event.HiteObj.Selected = true;
                comSelf.EventMidWinOk = function (e) {
                    if (e.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                        if (e.checkedProperties.length > 0) {
                            if (e.batchSetType == "allWell") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var frameWell = e.Parent.Childrens[j];
                                    if (frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                                        for (var i = 0; i < e.checkedProperties.length; i++) {
                                            var checkedProperty = e.checkedProperties[i];
                                            if (checkedProperty == "WellType") {
                                                frameWell.WellType = e.WellType;
                                            }
                                            if (checkedProperty == "IsDrawSymbol") {
                                                frameWell.IsDrawSymbol = e.IsDrawSymbol;
                                            }
                                            if (checkedProperty == "WellColor") {
                                                frameWell.ViewPen.PenColor = e.ViewPen.PenColor;
                                            }
                                            if (checkedProperty == "WellLineWidth") {
                                                frameWell.ViewPen.PenWidth = e.ViewPen.PenWidth;
                                            }
                                            if (checkedProperty == "BrushColor") {
                                                frameWell.ViewBrush.Color = e.ViewBrush.Color;
                                            }
                                            if (checkedProperty == "WellSize") {
                                                frameWell.WellSize = e.WellSize;
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
                                        frameWell.SetDataChanged(true);
                                    }
                                }
                            }
                            else if (e.batchSetType == "sameWellType") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var frameWell = e.Parent.Childrens[j];
                                    if (frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell && frameWell.WellType == e.WellType) {
                                        for (var i = 0; i < e.checkedProperties.length; i++) {
                                            var checkedProperty = e.checkedProperties[i];
                                            if (checkedProperty == "WellType") {
                                                frameWell.WellType = e.WellType;
                                            }
                                            if (checkedProperty == "IsDrawSymbol") {
                                                frameWell.IsDrawSymbol = e.IsDrawSymbol;
                                            }
                                            if (checkedProperty == "WellColor") {
                                                frameWell.ViewPen.PenColor = e.ViewPen.PenColor;
                                            }
                                            if (checkedProperty == "WellLineWidth") {
                                                frameWell.ViewPen.PenWidth = e.ViewPen.PenWidth;
                                            }
                                            if (checkedProperty == "BrushColor") {
                                                frameWell.ViewBrush.Color = e.ViewBrush.Color;
                                            }
                                            if (checkedProperty == "WellSize") {
                                                frameWell.WellSize = e.WellSize;
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
                                        frameWell.SetDataChanged(true);
                                    }
                                }
                            }
                            else if (e.batchSetType == "sameJsjg") {
                                for (var j = 0; j < e.Parent.Childrens.length; j++) {
                                    var frameWell = e.Parent.Childrens[j];
                                    if (frameWell.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell && frameWell.WellJsjg == e.WellJsjg) {
                                        for (var i = 0; i < e.checkedProperties.length; i++) {
                                            var checkedProperty = e.checkedProperties[i];
                                            if (checkedProperty == "WellType") {
                                                frameWell.WellType = e.WellType;
                                            }
                                            if (checkedProperty == "IsDrawSymbol") {
                                                frameWell.IsDrawSymbol = e.IsDrawSymbol;
                                            }
                                            if (checkedProperty == "WellColor") {
                                                frameWell.ViewPen.PenColor = e.ViewPen.PenColor;
                                            }
                                            if (checkedProperty == "WellLineWidth") {
                                                frameWell.ViewPen.PenWidth = e.ViewPen.PenWidth;
                                            }
                                            if (checkedProperty == "BrushColor") {
                                                frameWell.ViewBrush.Color = e.ViewBrush.Color;
                                            }
                                            if (checkedProperty == "WellSize") {
                                                frameWell.WellSize = e.WellSize;
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
                                        }
                                        frameWell.SetDataChanged(true);
                                    }
                                }
                            }
                            else if (e.batchSetType == "selWell") {
                                e.SetDataChanged(true);
                            }
                            else {
                                e.SetDataChanged(true);
                            }
                        } else {
                            e.SetDataChanged(true);
                        }
                    } else {
                        e.SetDataChanged(true);
                    }
                    comSelf.View.Repaint();
                }
                switch (obj.ObjType) {
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine:
                        {
                            //趋势线
                            if (obj.Parent.LayerName == "趋势约束图层") {
                                openMidWinObjQSX("midWin", "QSX");
                            }
                            else {
                                //等值线
                                openMidWinObjDZX();
                            }
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLineFill:
                        {
                            //等值线填充
                            openMidWinObjIsoLineFill();
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameFoulline:
                        {
                            if (obj.FoulLineType == "203")  //尖灭线
                            {
                                openMidWinObj("midWin", "JMX");
                            }
                            else if (obj.FoulLineType == "204")  //含油零线
                            {
                                openMidWinObj("midWin", "HYLX");
                            }
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameOutLine:
                        {
                            //轮廓线
                            openMidWinObjLKX();
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWellTrace:
                        {
                            //井轨迹属性
                            openMidWinObjJgjsx();
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtSText: {
                        //文字弹框
                        openMidWinObjText();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWell:
                        {
                            //趋势点
                            if (obj.Parent.LayerName == "趋势约束图层") {
                                openMidWinObjQSD("midWin", "QSD");
                            } else {
                                //井属性
                                openMidWinObjJsx();
                            }
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWellLabelFraction:
                        {
                            //趋势点
                            if (obj.Parent.LayerName == "趋势约束图层") {
                                openMidWinObjQSD("midWin", "QSD");
                            } else {
                                //井属性
                                openMidWinObjJsx();
                            }
                            break;
                        }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameWellLabelText:
                        {
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
                    } case WGADPlatGraph2D.EWGObjectType.wgtFrameBorderText: {
                        //图框
                        openMidWinObjBorder();
                        break;
                    } case WGADPlatGraph2D.EWGObjectType.wgtFrameScale: {
                        //图框
                        openMidWinObjBorder();
                        break;
                    }
                    case WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLegend: {
                        //等值线填充图例
                        openMidWinObjLineFill();
                        break;
                    } case WGADPlatGraph2D.EWGObjectType.wgtFrameAlongTrack: {
                        //沿程图
                        openRouteMapImage();
                        break;
                    }
                    default:
                        {
                            openMidWinObj("midWin", obj.ObjType);
                            break;
                        }
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
        }
        //图片配准
        this.PictureAdjust = function () {
            //判断是否存在底图图片，如果存在，则开启图片配准功能
            if (fView.View.MapData.Image.src && fView.View.MapData.Image.src != "") {
                $("#showAdjustFunc").window('open');
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbPictureAdjust);
            }
            comSelf.EventAdjustFuncOk = function (e) {
                //执行校正
                var result = comSelf.DoPictureAdjust(e.pointsD, e.pointsT);
                if (result) {
                    var iframe = document.getElementById('showAdjustFunc').getElementsByTagName('iframe')[0];
                    iframe.contentWindow.winClose();          
                    $("#showAdjustFunc").window('close');
                    //恢复鼠标状态
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                }
            }
            comSelf.EventAdjustFuncClose = function (e) {
                //恢复鼠标状态
                $("#showAdjustFunc").window('close');
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
            }
        }
        //大地坐标D 图像坐标T
        this.DoPictureAdjust = function (pointsD, pointsT) {
            //判断大地坐标
            for (var i = 0; i < 3; i++) {
                if (WGADPlatGMEngine.WGMathGeometry.PointLine(pointsD[i % 3].X, pointsD[i % 3].Y, pointsD[(i + 1) % 3].X, pointsD[(i + 1) % 3].Y, pointsD[(i + 2) % 3].X, pointsD[(i + 2) % 3].Y, 1)<1) {
                    alert("输入点的大地坐标在一条直线上，请检查!");
                    return false;
                }
            }
            for (var i = 0; i < 3; i++) {
                if (WGADPlatGMEngine.WGMathGeometry.PointLine(pointsT[i % 3].X, pointsT[i % 3].Y, pointsT[(i + 1) % 3].X, pointsT[(i + 1) % 3].Y, pointsT[(i + 2) % 3].X, pointsT[(i + 2) % 3].Y, 1)<1) {
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
            this.View.MapData.UpdateTransform();
            this.View.MapData.SetChanged(true);
            this.View.Repaint();
            //全图
            this.ZoomPicture();
            return true;
        }
        //增加一行记录
        this.DoAddPostion = function (p,e) {
            var iframe = document.getElementById('showAdjustFunc').getElementsByTagName('iframe')[0];
            iframe.contentWindow.addRow(p.X,p.Y,e.X,e.Y);
        }
        this.View.EventPictureAdjust = function (p) {
            //弹出坐标输入界面
            var iframe = document.getElementById('showAdjustFunc').getElementsByTagName('iframe')[0];
            var obj = iframe.contentWindow.document.getElementById("tableContent");
            if (obj.rows.length > 3){
                alert("已经选择三个校正点，请执行位置校正!");
                return; 
            }
            $("#showAdjustPosition").window('open');
            comSelf.EventAdjustPositionOk = function (e) {
                //增加坐标到图片位置校正界面
                p.X = comSelf.View.MapData.Transform.ViewToEarth(p.X, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
                p.Y = comSelf.View.MapData.Transform.ViewToEarth(p.Y, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
                comSelf.DoAddPostion(p,e);
            }
            comSelf.EventAdjustPositionClose = function (e) {
                //恢复鼠标状态
                $("#showAdjustPosition").window('close');
            }
        }
        this.View.EventObjectSingleClick = function (event) {
            console.log(event.HiteObj);
            comSelf.PropertyPanel.Hide();
            if (event.Event.button == WGADPlatGraph2D.MouseButtons.Right) {
                $(document).bind('contextmenu', function (e) { return false });
                if (event.HiteObj == null) {
                    WGADPlatSystemTools.WGRightClickMenu("main", "frameMenu", "emptyMenu", event.Event.layerX, event.Event.layerY, this, "../Config");
                }
                else {
                    if (WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DFrame.WGFrameIsoLine) || WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DFrame.WGFrameBreakLine) || WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DFrame.WGFrameFoulline) || WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DFrame.WGFrameIsoLegend) || WGADPlatGraph2D.IsBaseClass(event.HiteObj, WGADPlatGraph2DFrame.WGFrameIsoLineFill)) {
                        WGADPlatSystemTools.WGRightClickMenu("main", "frameMenu", "propertyMenu", event.Event.layerX, event.Event.layerY, event.HiteObj, "../Config");
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
            }
        }

        this.View.EventNewObjectAdd = function (event) {
            comSelf.SelectedObj = event.HiteObj;
            comSelf.EventMidWinOk = function (e) {
                event.HiteObj.SetDataChanged(true);
                event.Layer.AddChildren(event.HiteObj);
                comSelf.View.Repaint();
                //return true;
            }
            if (event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                if (event.Layer.LayerName == "趋势约束图层") {
                    openMidWinObjQSX("midWin", "QSX");
                }
                else {
                    event.HiteObj.SetDataChanged(true);
                    event.Layer.AddChildren(event.HiteObj);
                    comSelf.View.Repaint();
                }
            }
            else if (event.HiteObj instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                if (event.Layer.LayerName == "趋势约束图层") {
                    event.HiteObj.WellName = "0";
                    openMidWinObjQSD("midWin", "QSD");
                }
                else {
                    event.HiteObj.WellName = "井号";
                    event.HiteObj.SetDataChanged(true);
                    event.Layer.AddChildren(event.HiteObj);
                    comSelf.View.Repaint();
                }
            }
            else {
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
        }

        this.View.EventPLineDistance = function (event) {
            console.log(event);
            alert(event.Area.TransformData(event.MapData.Transform.GetViewToEarthMatrix()).Length() + "(M)");
        }

        this.openMidWinObj = function (divid, objtype) {
            var jsonPath = '/static/frameView/IsoFrameCom/Config/midWinConfig.json';
            $.ajax({
                url: jsonPath,
                contentType: 'utf-8',
                async: false,
                dataType: 'json',
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
                                content: "<iframe scrolling='auto' frameborder='0' src='" + url + "' style='width:100%; height:100%; display:block;'></iframe>",
                                modal: true
                            });
                            $("#" + divid).window('open');
                            return;
                        }
                    }

                }
            });

        }

        function openMidWinObj(divid, objtype) {
            var jsonPath = '/static/frameView/IsoFrameCom/Config/midWinConfig.json';
            $.ajax({
                url: jsonPath,
                contentType: 'utf-8',
                async: false,
                dataType: 'json',
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
                            return;
                        }
                    }

                }
            });
            // comSelf.openMidWinFun();

        }
        function openMidWinObjQSD(divid, objtype) {
            comSelf.openMidWinFunQSD();
        }
        function openMidWinObjQSX(divid, objtype) {
            comSelf.openMidWinFunQSX();
        }
        function openMidWinObjJsx(divid, objtype) {
            comSelf.openMidWinFunJSX();
        }
        function openMidWinObjText(divid, objtype) {
            comSelf.openMidWinFunText();
        }
        function openMidWinObjKcxzt(divid, objtype) {
            comSelf.openMidWinFunKCXZT();
        }
        function openMidWinObjBorder(divid, objtype) {
            comSelf.openMidWinFunBorder();
        }
        function openMidWinObjLineFill() {
            comSelf.openMidWinFunLineFill();
        }
        function openMidWinObjJgjsx(divid, objtype) {
            comSelf.openMidWinFunJGJSX();
        }
        function openMidWinObjDZX(divid, objtype) {
            comSelf.openMidWinFunDZX();
        }
        function openMidWinObjQSX(divid, objtype) {
            comSelf.openMidWinFunQSX();
        }
        function openMidWinObjLKX(divid, objtype) {
            comSelf.openMidWinFunLKX();
        }
        function openMidWinObjIsoLineFill(divid, objtype) {
            comSelf.openMidWinFunIsoLineFill();
        }
        function openRouteMapImage() {
            comSelf.openMidWinFunRouteMapImage();
        }


        function openMidWin(divid, cood, objtype, obj, objProperty) {
            var jsonPath = '../Config/midWinConfig.json';
            $.ajax({
                url: jsonPath,
                contentType: 'utf-8',
                async: false,
                dataType: 'json',
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
                        if (typeof obj[attr1] == "string" || typeof obj[attr1] == "number")  //字符 数字 数组
                        {
                            tempattr.attrName = attr1;
                            tempattr.value = obj[attr1];
                            tempattr.type = typeof obj[attr1];
                            objProperty.push(tempattr);
                            returnObj[attr1] = obj[attr1];
                        }
                        else if ($.isArray(obj[attr1]))  //字符 数字 数组
                        {
                            var tempattr = {};
                            tempattr.attrName = attr1;
                            tempattr.value = obj[attr1];
                            tempattr.type = "Array";
                            objProperty.push(tempattr);
                            returnObj[attr1] = obj[attr1];
                        }
                        else if (obj[attr1] instanceof WGADPlatGMEngine.WGPen) {

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
            if (type == '[object Array]') {
                return 'Array';
            } else if (type == '[object Object]') {
                return "Object"
            } else {
                return 'param is no object type';
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

        this.openMidWinFun = function () {

        }
        //井属性
        this.openMidWinFunJSX = function () { }
        //井轨迹属性
        this.openMidWinFunJGJSX = function () { }
        //等值线属性
        this.openMidWinFunDZX = function () { }
        //轮廓线属性
        this.openMidWinFunLKX = function () { }
        //趋势线属性
        this.openMidWinFunQSX = function () { }
        //沿程图属性
        this.openMidWinFunRouteMapImage = function () { }
        //开采现状图
        this.openMidWinFunKCXZT = function () { }
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
                    }
                    else if (jsonLayerList[i].LayerName == "趋势约束图层") {
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
        }
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
                            if (wellObj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine || wellObj instanceof WGADPlatGraph2DFrame.WGFrameOutLine) {
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
                            m_IsoLine1.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB("255", e.LineColor[0], e.LineColor[1], e.LineColor[2]);
                        }

                    }
                }
            }

            comSelf.View.Repaint();
        }
        //删除图层
        this.RemoveLayer = function (objID) {
            for (var i = 0; i < comSelf.View.MapData.LayerList.length; i++) {
                var layer = comSelf.View.MapData.LayerList[i];
                if (layer.ObjID == objID) {
                    comSelf.View.MapData.LayerList.splice(i, 1);
                    break;
                }
            }
            comSelf.View.Repaint();
        }
        //调用修改当前颜色值为对象 fView:要改变的对象。color :要改变的颜色数组 type:哪个结构的 index,fView为[]时的下标
        this.SetFontColor = function (fView, color, type, index) {
            if (type == "LKX") {
                //轮廓线
                fView.SelectedObj.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(255, color[0], color[1], color[2]);
            } else if (type == "JSX") {
                //井属性
                fView.Childrens[index].Font.Color = WGADPlatGMEngine.WGColor.FromARGB(255, color[0], color[1], color[2]);
            } else if (type == "Text") {
                //字体颜色属性
                fView.SelectedObj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, color[0], color[1], color[2]);
            }
        }
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
                        }
                        else if (layer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltWellTrack) {
                            if (traceType == "井口") {
                                this.DeleteTraceLayerObj(layer, jsonLayer);
                            }
                            else {
                                if (selectType == "selWell") {

                                }
                                if (selectType == "allWell") {
                                    this.DeleteTraceLayerObj(layer, jsonLayer);

                                }
                                else if (selectType == "sameJsjg") {
                                    this.DeleteTraceLayerObjJSJG(wellLayer, layer, jsonLayer, wellJsjg);
                                }
                            }
                            layer.JsonObjLoad(jsonLayer);
                        }
                        layer.SetDataChanged(true);
                    }


                }

            }
        }
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
        }
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
        }
        this.SetWellTraceProperty = function (e) {
            if (e.batchSetType == "allWell")  //全部应用
            {
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_objTrace = e.Layer.GetChildrenByIndex(i);
                    if (m_objTrace != null) {
                        if (m_objTrace instanceof WGADPlatGraph2DFrame.WGFrameWellTrace) {
                            this.SetWellTraceObj(m_objTrace, e);

                        }

                    }
                }
            }
            else if (e.batchSetType == "selWell") //选中斜井
            {
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
            }
            else if (e.batchSetType == "sameJsjg")  //解释结果相同
            {
                var jsjg = '';
                var layer = this.View.MapData.GetLayerByType(WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell);
                for (var i = 0; i < layer.GetChildrenCount(); i++) {
                    var well = layer.GetChildrenByIndex(i);
                    if (well instanceof WGADPlatGraph2DFrame.WGFrameWell) {
                        if (well.ObjID = e.obj.ObjID) {
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
            }
            else   //当前选中的唯一等值线
            {
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
        }
        this.SetWellTraceObj = function (obj, e) {
            obj.SymbolPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(Number(e.symbolPenColor[0]), Number(e.symbolPenColor[1]), Number(e.symbolPenColor[2]), Number(e.symbolPenColor[3]));
            obj.SymbolPen.PenDashStyle = e.symbolPenDashStyle;
            obj.WellSize = e.wellSize;
            obj.SymbolPen.PenWidth = e.symbolPenWidth;
            obj.ViewPen.PenWidth = e.viewPenWidth;
            obj.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(Number(e.viewPenColor[0]), Number(e.viewPenColor[1]), Number(e.viewPenColor[2]), Number(e.viewPenColor[3]));
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

        }
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
        }

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
                            oLineSignText.Font.Color = WGADPlatGMEngine.WGColor.FromARGB(255, oLineSignText.Font.symbolPenColor[0], oLineSignText.Font.symbolPenColor[1], oLineSignText.Font.symbolPenColor[2]);
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
            mIsoLine.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB(e.GcbcColor[0], e.GcbcColor[1], e.GcbcColor[2], e.GcbcColor[3]);

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
        }
        this.SetIsoObjProperty = function (e) {
            if (e.obj != undefined && e.obj != null) {
                e.obj.Closed = e.Closed;
                e.obj.ValueText = e.ValueText;
            }
            //GFrameIsoLine m_IsoLine1 = null;
            if (e.batchSetType == "allWell")  //全部应用
            {
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_IsoLine1 = e.Layer.GetChildrenByIndex(i);
                    if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                        this.SetIsoProperty(m_IsoLine1, e);
                    }
                }
            }
            else if (e.batchSetType == "allSelected") //选中所有
            {
                if (comSelf.View.HiteResult.SelectObjs.length > 0) {
                    for (var i = 0; i < comSelf.View.HiteResult.SelectObjs.length; i++) {
                        var m_IsoLine1 = comSelf.View.HiteResult.SelectObjs[i];
                        if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                            // var Closed = ckbClosed.Checked;  //闭合
                            this.SetIsoProperty(m_IsoLine1, e);
                        }
                    }
                }
            }
            else if (e.batchSetType == "sameName")  //同标注名称的等值线
            {
                for (var i = 0; i < e.Layer.GetChildrenCount(); i++) {
                    var m_IsoLine1 = e.Layer.GetChildrenByIndex(i);
                    if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                        if (m_IsoLine1.ValueText == e.ValueText) {
                            this.SetIsoProperty(m_IsoLine1, e);
                        }
                    }
                }
            }
            else   //当前选中的唯一等值线
            {
                // m_isoLine.Closed = ckbClosed.Checked;
                // m_isoLine.ValueText = this.txtValueText.Text;
                if (e.obj != undefined && e.obj != null && e.obj instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                    this.SetIsoProperty(e.obj, e);
                }
            }
        }
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
        }
        this.SetExpObjProperty = function (expObj, e) {
            if (expObj instanceof WGADPlatGraph2DFrame.WGFrameExploitation) {
                expObj.ShowHistogram = e.ShowHistogram;//显示直方图
                expObj.ShowPie = e.ShowPie;//显示饼图
                expObj.MinPieRadius = e.MinPieRadius;//饼图最小半径
                expObj.MaxPieRadius = e.MaxPieRadius;//饼图最大半径
                expObj.MinHeight = e.MinHeight;//柱子最小高度
                expObj.MaxHeight = e.MaxHeight;//柱子最大高度
                expObj.Width = e.Width;//柱子宽度
                expObj.Interval = e.Interval;//柱子间距
                expObj.Reversal = e.Reversal;//倒置
                expObj.DrawDirectLine = e.DrawDirectLine;//是否绘制指引线
                expObj.ShowLineLength = e.ShowLineLength;//指引线显示范围
                //直方图设置
                var hisMapArry = [];
                var pieMapArry = [];
                for (var m = 0; m < expObj.GetChildrenCount(); m++) {
                    var cObj = expObj.GetChildrenByIndex(m);
                    if (cObj instanceof WGADPlatGraph2DFrame.WGFrameExploitationHistogram) {
                        cObj.ShowText = "";//直方图是否显示文字
                        cObj.Text = "";//文字数值
                        cObj.HistogramDecimals = "";
                        cObj.ViewBrush.BrushColor = WGADPlatGMEngine.WGColor.FromARGB(e.Histogram[i].BrushColor[0], e.Histogram[i].BrushColor[1], e.Histogram[i].BrushColor[2], e.Histogram[i].BrushColor[3])
                        cObj.Code = "";
                    }
                    else if (cObj instanceof WGADPlatGraph2DFrame.WGFrameExploitationPie) {
                        cObj.ShowText = "";//饼图是否显示文字
                        cObj.Text = "";//文字数值
                        cObj.PieDecimals = "";
                        cObj.ViewBrush.BrushColor = WGADPlatGMEngine.WGColor.FromARGB(pieArry[i].BrushColor[0], pieArry[i].BrushColor[1], pieArry[i].BrushColor[2], pieArry[i].BrushColor[3])
                        cObj.Code = "";
                    }
                }
                expObj.SetDataChanged(true);

            }
        }

        this.AddExpHistogram = function (obj, expObj) {

            var cObj = new WGADPlatGraph2DFrame.WGFrameExploitationHistogram({});
            cObj.ShowText = obj.ShowText;//直方图是否显示文字
            cObj.Value = Number(obj.Text);//文字数值
            cObj.OffX1 = Number(obj.OffX1);
            cObj.OffY1 = Number(obj.OffY1);
            cObj.HistogramDecimals = obj.HistogramDecimals;
            cObj.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
            cObj.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB("255", obj.BrushColor[0], obj.BrushColor[1], obj.BrushColor[2]);
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
                text.Font.Color = WGADPlatGMEngine.WGColor.FromARGB("255", obj.Font.symbolPenColor[0], obj.Font.symbolPenColor[1], obj.Font.symbolPenColor[2]);
            } else {
                text.Font.Color = obj.Font.Color;
            }
            cObj.AddChildren(text);
            cObj.SetDataChanged(true);

            expObj.AddChildren(cObj);
            expObj.SetDataChanged(true);

        }
        this.AddExpPie = function (obj, expObj) {

            var cObj = new WGADPlatGraph2DFrame.WGFrameExploitationPie({});
            cObj.ShowText = obj.ShowText;//直方图是否显示文字
            cObj.Value = Number(obj.Text);//文字数值
            cObj.OffX1 = Number(obj.OffX1);
            cObj.OffY1 = Number(obj.OffY1);
            cObj.PieDecimals = obj.HistogramDecimals;
            cObj.ViewBrush.FillStyle = WGADPlatGMEngine.EGFillStyle.wgfsSolidColor;
            cObj.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB("255", obj.BrushColor[0], obj.BrushColor[1], obj.BrushColor[2]);
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
                text.Font.Color = WGADPlatGMEngine.WGColor.FromARGB("255", obj.Font.symbolPenColor[0], obj.Font.symbolPenColor[1], obj.Font.symbolPenColor[2]);
            } else {
                text.Font.Color = obj.Font.Color;
            }
            cObj.AddChildren(text);
            cObj.SetDataChanged(true);
            expObj.AddChildren(cObj);
            expObj.SetDataChanged(true);
        }
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
            var dicHis = [];//直方图所有柱子数据new Dictionary<string, List<double>>();
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
                            if (oExp.GetChildrenByIndex(j) instanceof WGADPlatGraph2DFrame.WGFrameExploitationHistogram) {
                                var oHis = oExp.GetChildrenByIndex(j);
                                if (GetArryItem(dicHis, oHis.Code) == null) {
                                    var lstHis = [];
                                    PushArryItem(dicHis, oHis.Code, lstHis);
                                }

                                if (oHis.Value > hisMax) {
                                    hisMax = Number(oHis.Value);
                                }
                                else {
                                    if (hisMin > 0) {
                                        if (hisMin > oHis.Value) {
                                            hisMin = oHis.Value;
                                        }
                                    }
                                    else {
                                        hisMin = oHis.Value;
                                    }
                                }
                                GetArryItem(dicHis, oHis.Code).value.push(oHis.Value);
                                //dicHis[oHis.Code].Add(oHis.Value);
                            }
                            else if (oExp.GetChildrenByIndex(j) instanceof WGADPlatGraph2DFrame.WGFrameExploitationPie) {
                                var oPie = oExp.GetChildrenByIndex(j);
                                if (pieField == "" || pieField == null) {
                                    sum += oPie.Value;
                                }
                                else {
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
                                }
                                else {
                                    WellExpHis.MaxValue = GetArryItem(dicMaxHis, WellExpHis.Code).value;
                                    WellExpHis.MinValue = GetArryItem(dicMinHis, WellExpHis.Code).value;
                                }

                                WellExpHis.Height = GetHisHight(exp.MaxHeight, WellExpHis.MaxValue,
                                    exp.MinHeight, WellExpHis.MinValue, WellExpHis.Value);
                            }
                        }
                    }
                }
            }


        }

        /// <summary>
        /// 计算柱子高度
        /// </summary>
        function GetHisHight(maxHeight, maxValue, minHeight, minValue, curValue) {
            var result = 0;

            if (maxValue - minValue > 0) {
                result = (maxHeight - minHeight) * (curValue - minValue) / (maxValue - minValue) + minHeight;
            }
            else {
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
            if (key != '') {
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
            if (obj.Parent.ObjType = WGADPlatGraph2D.EWGObjectType.wgtFrameLayer) {
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
                dataType: 'text',
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

        this.ApplyWellTemplateByUrl = function (url) {
            var wellJson = null;
            $.ajax({
                url: url,
                contentType: 'utf-8',
                async: false,
                error: console.log('error'),
                dataType: 'json',
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
        }
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
        }
        this.CreateFont = function () {
            var textFont = new WGADPlatGMEngine.WGFont();
            return textFont;
        }
        this.SetColorRGBA = function (e) {
            return WGADPlatGMEngine.WGColor.FromARGB(255, Number(e[0]), Number(e[1]), Number(e[2]));
        }
        //等值线图例填充
        this.AddIsoLegend = function (objID, textlist, colorlist, showGradient, font) {
            var layer = this.View.MapData.GetLayerByID(objID);
            if (layer == null)
                return;
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
            var width = Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX));
            var height = Math.abs(this.View.MapData.Transform.MapToEarth(50, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceY));
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
        }
        this.View.EventRectMap = function (e) {
            var rect = e.Area;
            var p = comSelf.View.MapData.toPngDataURLRect(rect.Left, rect.Top, rect.GetWidth(), rect.GetHeight());
            var b64 = p.substring(22);
            var filename = new Date().toLocaleDateString() + '.' + 'png';
            downloadFile(filename, p);
            //返回给index.vue 传到后台
            comSelf.openCutOutImage(b64);
        }
        this.SetAlongTrackColorList = function (obj, json) {
            if (obj instanceof WGADPlatGraph2DFrame.WGFrameAlongTrack) {
                for (var i = 0; i < obj.GetChildrenCount(); i++) {
                    var child = obj.GetChildrenByIndex(i);
                    if (child instanceof WGADPlatGraph2DFrame.WGFrameAlongTrackPart) {
                        var objvalue = json['f' + child.FdIndex.toString()];
                        if (objvalue) {
                            child.ViewPen.PenDashStyle = objvalue.linestyle;
                            child.ViewPen.PenWidth = objvalue.linewidth;
                            child.ViewPen.PenColor = WGADPlatGMEngine.WGColor.FromARGB("255", objvalue.linecolor[0], objvalue.linecolor[1], objvalue.linecolor[2]);
                            child.ViewBrush.FillStyle = objvalue.fillstyle;
                            child.ViewBrush.Color = WGADPlatGMEngine.WGColor.FromARGB("255", objvalue.color[0], objvalue.color[1], objvalue.color[2]);
                        }

                    }
                }
            }
        }
        this.Earthwidth = function (width) {
            return Math.abs(this.View.MapData.Transform.MapToEarth(width, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX));
        }
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
        }

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

        }
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
        }
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
        }
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
        }
        var m_posX, m_posY;
        this.View.EventMouseMove = function (e) {
            m_posX = e.Point.X;
            m_posY = e.Point.Y;
            var eX = comSelf.View.MapData.Transform.ViewToEarth(m_posX, WGADPlatGraph2D.EWGTransStyle.wgtsCoordX);
            var eY = comSelf.View.MapData.Transform.ViewToEarth(m_posY, WGADPlatGraph2D.EWGTransStyle.wgtsCoordY);
            //显示坐标信息
            $('#lblCoordX').html("X:" + eX.toFixed(2));
            $('#lblCoordY').html("Y:" + eY.toFixed(2));
            //lblCoordY.Text = "Y:" + eY.ToString("f2");
            var hiteResult = new WGADPlatGraph2D.WGHiteResult();
            var p = new WGADPlatGMEngine.WGPoint();
            hiteResult.SetSelectDataPoint(p);
            for (var m = 0; m < comSelf.View.MapData.LayerList.length; m++) {
                var olayer = comSelf.View.MapData.LayerList[m];

                if (olayer.Display && olayer.Actived) {
                    var gObject = comSelf.View.GetSelectedObj();
                    comSelf.GGeoObjShow(gObject);
                    break;
                }
                else {
                    olayer.HiteTest(hiteResult);
                    if (hiteResult.WhereInObj != WGADPlatGraph2D.EGMouseInObj.gmiNone) {
                        var gObject = hiteResult.HiteObject;
                        comSelf.GGeoObjShow(gObject);
                        break;
                    }
                }
            }
        }

        //图元显示
        this.GGeoObjShow = function (gObject) {
            if (gObject != null) {
                var flag = this.IsDisplay(gObject);
                if (!flag) {
                    $('#lblLayerAndObj').html('');

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
                var str1 = gObject.ObjName;//图元名称

                if (gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline || gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakPLine) {
                    //var nvc = GCommandMap.GetEnumDescriptionValue(typeof(EGBreakLineUpDown));
                    var sxpName = gObject.BreakLineUpDown;
                    str1 = "断层线[" + sxpName + "]";//+ (gObject as GFrameBreakLine).Tag + "(")
                }
                if (gObject.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine) {
                    var sxpName = gObject.ValueText;
                    str1 = "等值线" + sxpName;
                }

                var Text = str1;
                for (var i = 0; i < 2; i++)//图框中的文字子类，井的标注子类 图元的父类的父类是图层
                {
                    if (gObjectParent == null) {
                        break;
                    }

                    if (gObjectParent.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLayer) {
                        var str2 = gObjectParent.LayerName;//图层名称
                        if (!(gObject.Visible)) {
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
                        $('#lblLayerAndObj').html(str1 + '---' + str2);

                        break;
                    }

                    gObjectParent = gObjectParent.Parent;
                }
            }
        }
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
            }
            else {
                this.IsDisplay(gObjectParent);
            }
            return flag;
        }
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
                        }
                        else {
                            obj.Selected = false;
                        }
                    }
                }
            }
            comSelf.View.HiteResult.MutiSelect = false;
        }
        this.DealWithIsoLineInterval = function (layer, boldNum, lableNum, boldWidth, lableCheck, boldCheck) {
            //lableCheck 间隔显示标注  lableNum
            //boldCheck 间隔 boldNum
            //boldWidth 等值线加粗线宽
            var isoArr = [];
            var valuearr = [];
            for (var i = 0; i < layer.GetChildrenCount(); i++) {
                var m_IsoLine1 = layer.GetChildrenByIndex(i);
                if (m_IsoLine1 != null && m_IsoLine1 instanceof WGADPlatGraph2DFrame.WGFrameIsoLine) {
                    isoArr.push(m_IsoLine1);
                    valuearr.push(m_IsoLine1.ValueText);
                }
            }
            isoArr.sort(this.IsoArrSort);
            var Index = 0;
            var ShowInterval = lableNum + 1;
            var BoldInterval = boldNum + 1;
            var LineWidth = boldWidth;
            for (var item in isoArr) {
                var LineItem = isoArr[item];
                LineItem.BoldNum = boldNum;
                LineItem.ShowNum = lableNum;
                LineItem.BoldLineWidth = LineWidth;
                //处理标注是否显示
                if (lableCheck) {
                    if (Index % ShowInterval == 0) {
                        LineItem.HiddenLabel = false;
                    }
                    else {
                        LineItem.HiddenLabel = true;
                    }
                }

                //处理等值线宽度
                if (boldCheck) {
                    if (Index % BoldInterval == 0) {
                        //LineItem.BoldLineWidth=LineWidth;
                        LineItem.ViewPen.PenWidth = LineWidth;
                    }
                }
                Index++;
            }
            layer.SetDataChanged(true);
            comSelf.View.Repaint();
        }
        this.IsoArrSort = function (item1, item2) {
            return Number(item1.ValueText) - Number(item2.ValueText);
        }
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
        }
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
        }


    }
    return Com;
});