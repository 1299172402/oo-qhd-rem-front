define([
    'WGAD/Scripts/WGADPlatGraph2D'], function (WGADPlatGraph2D) {
   var SymbolControl = {};

    //符号控件
    SymbolControl.SymbolSelect = function () {
        this.Init();
    }

    SymbolControl.SymbolSelect.prototype = {
        //符号数据集合
        SymbolData: [],
        SymbolCtrlData: [],

        Init: function () {

        },
        /**
         * 初始化下拉表格控件
         * type: 符号类型
         * selId: 下拉表格id
         **/
        InitSel: function (type, selId, propertyid, selSymbolName, width, height) {
            if(obj != null) {
                $('#' + selId).combogrid('setValue', selSymbolName);
                if(!width || width == "") {
                    width = 60;
                }
                if(!height || height == "") {
                    height = 60;
                }
                $.ajax({
                    url: "../data/SymbolData/ObjSelectConfig.json",
                    dataType: 'json',
                    contentType: 'utf-8',
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == type) {
                                if (data[i].pelItem != undefined) {
                                    var symbolArr = [];
                                    //加载文件名中不带（）的json
                                    for (var k = 0; k < data[i].pelItem.length; k++) {
                                        if (data[i].pelItem[k].id.indexOf("(") < 0) {
                                            symbolArr.push(data[i].pelItem[k]);
                                        }
                                    }
                                    $('#' + selId).combogrid({
                                        data: symbolArr,
                                        idField:'text',
                                        textField:'text',
                                        columns: [[
                                            {
                                                field: 'text', title: '', width: 200,
                                                formatter: function (value, row, index) {
                                                    var html = '<div style="float:left;width:' + width + 'px" id="canvasTool_' + propertyid + '_' + row.text + '"><canvas width="'+width+'px" height="' + height +'px" id="' + propertyid + '_' + row.text + '"></canvas></div><div style="height:'+ height + 'px; line-height:'+ height +'px; border: none" id="' + propertyid + '_' + row.text + 'text" style="float: left">' + value + '</div>';
                                                    return html;
                                                }
                                            }
                                        ]],
                                        onLoadSuccess: function () {
                                            if(selSymbolName) {
                                                $('#' + selId).combogrid('setValue', selSymbolName);
                                            }
                                        }
                                    });
                                    for (var j = 0; j < symbolArr.length; j++) {
                                        var symctl = new SymbolControl.SymbolSelect();
                                        symctl.GetSymbol(propertyid + "_" + symbolArr[j].text, symbolArr[j].url, width, height);
                                    }
                                }
                                return false;
                            }
                        }
                    }
                });
            }
        },
        /**
         * 初始化符号
         * canvasId: canvas的ID
         * path: 文件路径 例如：101/33.json
         **/
        GetSymbol: function (canvasId, path, width, height) {
            var Self = this;
            var viewSetting = {};
            viewSetting.CanvasID = canvasId;
            viewSetting.CanvasStyle = "Html5 Canvas 2D";
            var view = new WGADPlatGraph2D.WGGeoView(viewSetting);
            view.MapData = new WGADPlatGraph2D.WGMap2D({});
            //view.MapData.SetEarthArea(0, 68, 68, 0);
            view.MapData.SetMapToEarthScale(5000, 5000);
            view.MapData.SetPageMargin(0, 0, 0, 0);
            view.MapData.ViewScale = 1;
            view.MapData.IsCenterShowX = true;
            view.MapData.IsCenterShowY = true;
            view.MapData.UpdateTransform();

            var symbol = new WGADPlatGraph2D.WGGeoSymbol();
            var symbol1 = new WGADPlatGraph2D.WGGeoSymbol();
            $.ajax({
                url: path,
                dataType: 'json',
                async: false,
                contentType: 'utf-8',
                success: function (data) {
                    symbol.JsonObjLoad(data);
                    symbol1.JsonObjLoad(data);
                    view.MapData.SetEarthArea(0, symbol.MapHeight, symbol.MapWidth, 0);
                    view.MapData.LayerList = [];
                    view.MapData.LayerList.push(symbol.Layer);
                    symbol.Layer.SetTransform(view.MapData.Transform);
                    symbol.Layer.Actived = true;
                    view.MapData.ZoomAll(width*0.9, height*0.9);
                    view.MapData.UpdateTransform();
                    Self.SymbolData[symbol.Code] = symbol1;
                    Self.SymbolCtrlData[symbol.Name] = symbol1;
                    view.Repaint();
                }
            });
        }
    }
    return SymbolControl
})