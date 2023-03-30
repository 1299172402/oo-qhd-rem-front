/*******************************************************************
 * Copyright (C) 2016 山东胜利软件股份有限公司 版权所有
 * 文件名称: WGADPlatComFCMapProperty.js
 * 功能描述: 图件属性脚本
 * 作者:     yl
 * 创建时间: 2016.05.27
 *
 * 修改记录:
 * 修改人:
 **********************************************************************/
WGADPlatComFCMapProperty = function () {
    color1 = "";
    color2 = "";
    $('#btnStartMoreColor').bind('click', function () {
        var content = '<div style="position:absolute;top:30px;bottom:0;height:auto;left:10px;right:0;width:auto;"><iframe id="colorFrame" scrolling="no" frameborder="0" src="PropertySetting/WGraphControls/eWGraphGetColor.html?color='+ color1 +' " style="width:100%;height:100%;"></iframe></div>';
        window.parent.$("#colorPicker").dialog({
            title: "颜色选择",
            width: 470,
            height: 300,
            top: 50,
            content: content,
            inline: true,
            lines: true,
            resizable: true,
            modal: false,
            minimizable: false,
            maximizable: false,
            buttons: [{
                text: saveText,
                width: 80,
                iconCls: "icon-ok",
                handler: function () {
                    var c = window.parent.document.getElementById("colorFrame").contentWindow.$('#rgbaVal').val().split(',');
                    var cc = c[0]+"," + c[1]+ "," + c[2] + "," + (c[3] / 255).toFixed(2);
                    $("#startColor").css("background-color", "rgba(" + cc + ")");
                    $("#startColorValue").val(cc);
                    $("#startColorDisplay").html("[" + cc + "]");
                    window.parent.$("#colorPicker").dialog('close');
                    color1 = c[0]+"," + c[1]+ "," + c[2] + "," + c[3];
                }
            }, {
                text: cancleText,
                width: 80,
                iconCls: "icon-cancel",
                handler: function () {
                    window.parent.$("#colorPicker").dialog('close');
                }
            }]
        });
    });

    $('#btnEndMoreColor').bind('click', function () {
        var content = '<iframe id="colorFrame" scrolling="no" frameborder="0" src="PropertySetting/WGraphControls/eWGraphGetColor.html?color='+ color2 +' " style="width:100%;height:100%;"></iframe>';
        window.parent.$("#colorPicker").dialog({
            title: "颜色选择",
            width: 470,
            height: 300,
            top: 50,
            content: content,
            inline: true,
            lines: true,
            resizable: true,
            modal: false,
            minimizable: false,
            maximizable: false,
            buttons: [{
                text: saveText,
                width: 80,
                iconCls: "icon-ok",
                handler: function () {
                    var c = window.parent.document.getElementById("colorFrame").contentWindow.$('#rgbaVal').val().split(',');
                    var cc = c[0]+"," + c[1]+ "," + c[2] + "," + (c[3] / 255).toFixed(2);
                    $("#endColor").css("background-color", "rgba(" + cc + ")");
                    $("#endColorValue").val(cc);
                    $("#endColorDisplay").html("[" + cc + "]");

                    window.parent.$("#colorPicker").dialog('close');
                    color2 = c[0]+"," + c[1]+ "," + c[2] + "," + c[3];
                }
            }, {
                text: cancleText,
                width: 80,
                iconCls: "icon-cancel",
                handler: function () {
                    window.parent.$("#colorPicker").dialog('close');
                }
            }]
        });
    });

    $("#divMapArea").panel({
        width: 400,
        height: 100,
        title: '地图范围'
    });

    $("#divMapScale").panel({
        width: 400,
        height: 70,
        title: '地理比例尺'
    });

    $("#Mapcolor").panel({
        width: 400,
        height: 150,
        title: '底图颜色'
    });

    InitProperty(window.parent.obj);
    function InitProperty(pro)
    {
        if(pro)
        {
            $("#txtMinX").numberbox('setValue', pro.EarthLeft);
            $("#txtMaxX").numberbox('setValue', pro.EarthRight);
            $("#txtMinY").numberbox('setValue', 0);
            $("#txtMaxY").numberbox('setValue', pro.EarthTop-pro.EarthBottom);

            $("#txtScaleX").numberbox('setValue', pro.XScaleMapToEarth);
            $("#txtScaleY").numberbox('setValue', pro.YScaleMapToEarth);

            document.getElementById("ckIsGradient").checked = pro.IsShowBackGround;

            var color = pro.StartColor.GetR() + "," + pro.StartColor.GetG() + "," + pro.StartColor.GetB() + "," + (pro.StartColor.GetA() / 255).toFixed(2);
            color1 = pro.StartColor.GetR() + "," + pro.StartColor.GetG() + "," + pro.StartColor.GetB() + "," + pro.StartColor.GetA();
            $("#startColor").css("background-color", "rgba(" + color + ")");
            $("#startColorValue").val(color);
            $("#startColorDisplay").html("[" + color + "]");

            color = pro.EndColor.GetR() + "," + pro.EndColor.GetG() + "," + pro.EndColor.GetB() + "," + (pro.EndColor.GetA() / 255).toFixed(2);
            color2 = pro.EndColor.GetR() + "," + pro.EndColor.GetG() + "," + pro.EndColor.GetB() + "," + pro.EndColor.GetA();
            $("#endColor").css("background-color", "rgba(" + color + ")");
            $("#endColorValue").val(color);
            $("#endColorDisplay").html("[" + color + "]");

        }
    }
}

WGADPlatComFCMapProperty.GetProperty = function (obj)
{
    if(obj)
    {
        var minX = parseFloat($("#txtMinX").numberbox('getValue'));
        var maxX = parseFloat($("#txtMaxX").numberbox('getValue'));
        var minY = parseFloat($("#txtMinY").numberbox('getValue'));
        var maxY = parseFloat($("#txtMaxY").numberbox('getValue'));

        minY = obj.EarthTop - maxY;

        var sx = parseFloat($("#txtScaleX").numberbox('getValue'));
        var sy = parseFloat($("#txtScaleY").numberbox('getValue'));

        obj.IsShowBackGround = document.getElementById("ckIsGradient").checked;

        var colorARGB = $("#startColorValue").val().split(',');
        //obj.StartColor = WGADPlatGMEngine.WGColor.FromARGB(colorARGB[3], colorARGB[0], colorARGB[1], colorARGB[2]);

        colorARGB1 = $("#endColorValue").val().split(',');
        //obj.EndColor = WGADPlatGMEngine.WGColor.FromARGB(colorARGB[3], colorARGB[0], colorARGB[1], colorARGB[2]);

        obj.SetColor(colorARGB,colorARGB1);
        obj.SetEarthArea(minX,obj.EarthTop,maxX,minY);
        obj.SetMapToEarthScale(sx,sy);
        obj.SizeChanged = true;
        obj.UpdateTransform();
    }
}


