/*******************************************************************
 * Copyright (C) 2016 山东胜利软件股份有限公司 版权所有
 * 文件名称: WGRightMenu.js
 * 功能描述: 右键菜单功能
 * 作者:     yl
 * 创建时间: 2016.04.12
 *
 * 修改记录:
 * 修改人:
 **********************************************************************/

/////空白菜单
function ViewZoomOut(view)
{
    if(fCommon)
    {
        fCommon.ZoomOut();
    }
}

function ViewZoomIn(view)
{
    if(fCommon)
    {
        fCommon.ZoomIn();
    }
}
function ViewMapMove(view)
{
    if(fCommon)
    {
        fCommon.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbMove);
    }
}

function GeoObjMove(view)
{
    if(fCommon){
        var selectObj = fCommon.View.HiteResult.SelectObjs;
        if(selectObj == null || selectObj.length <= 0) {
            alert("请选中一个或多个图元！");
        }else {
            fCommon.openMidWinObj("midWin","GeoObjMove");
        }
    }
}

function SmoothPoly(view)
{
    if(fCommon){
        fCommon.SmoothPoly(30);
    }
}

function ShowWell(view)
{
    if(fCommon){
        fCommon.openMidWinObj("midWin","ShowWell");
    }
}

function ShowOutLine(view)
{
    if(fCommon){
        fCommon.ShowOutLine();
    }
}

function HideOutLine(view)
{
    if(fCommon){
        fCommon.HideOutLine();
    }
}

function CalcRange(view)
{
    if(fCommon){
        fCommon.CalcRange();
    }
}

function ViewZoomAll(view)
{
    if(fCommon)
    {
        fCommon.ZoomAll();
    }
}
function DrawPoint(view)
{
    if(fCommon)
    {
        fCommon.DrawPoint();
    }
}
function DrawText(view)
{
    if(fCommon)
    {
        fCommon.DrawText();
    }
}
function DrawLine(view)
{
    if(fCommon)
    {
        fCommon.DrawLine();
    }
}
function DrawPolyLine(view)
{
    if(fCommon)
    {
        fCommon.DrawPolyLine();
    }
}
function DrawRect(view)
{
    if(fCommon)
    {
        fCommon.DrawRect();
    }
}
function DrawArc(view)
{
    if(fCommon)
    {
        fCommon.DrawArc();
    }
}
function DrawPie(view)
{
    if(fCommon)
    {
        fCommon.DrawPie();
    }
}
function DrawPolygon(view)
{
    if(fCommon)
    {
        fCommon.DrawPolygon();
    }
}
function DrawEllipse(view)
{
    if(fCommon)
    {
        fCommon.DrawEllipse();
    }
}
function DrawCircle(view)
{
    if(fCommon)
    {
        fCommon.DrawCircle();
    }
}
function DrawPic(view)
{
    if(fCommon)
    {
        fCommon.DrawPic();
    }
}
function DrawTable(view)
{
    if(fCommon)
    {
        fCommon.DrawTable();
    }
}

function DrawBreak(view)
{
    if(fCommon)
    {
        fCommon.DrawBreak();
    }
}
function DrawJM(view)
{
    if(fCommon)
    {
        fCommon.DrawJM();
    }
}
function DrawISO(view)
{
    if(fCommon)
    {
        fCommon.DrawISO();
    }
}
function DrawHYLX(view)
{
    if(fCommon)
    {
        fCommon.DrawHYLX();
    }
}
function DrawQSX(view)
{
    if(fCommon)
    {
        fCommon.DrawQSX();
    }
}
function DrawQSD(view)
{
    if(fCommon)
    {
        fCommon.DrawQSD();
    }
}
function DrawCCMJ(view)
{
    if(fCommon)
    {
        fCommon.DrawQSD();
    }
}
function DrawHYMJ(view)
{
    if(fCommon)
    {
        fCommon.DrawQSD();
    }
}
function DrawLegend(view)
{
    if(fCommon)
    {
        fCommon.DrawLegend();
    }
}
function AddLayer(view)
{
    if(fCommon)
    {
        fCommon.AddLayer();
    }
}
function ViewLayer(view)
{
    if(fCommon)
    {
        fCommon.ShowLayerList();
    }
}

function  ObjProperty(curve)
{
    var obj = curve.HiteObj;
    if (obj != null)
    {
        var pro = fCommon.GetObjProperty(obj);

        fCommon.PropertyPanel.Show(pro,fCommon.View,"panel");
    }
}
function  ApplyTemplate() {
    alert('应用模板');
}
/**
 * 加载底图
 * @constructor
 */
function ShowBackImg(){
    if(fCommon){
        var content = '<div style="position:absolute;top:10px;bottom:0;height:auto;left:0;right:0;width:auto;"><iframe id="imgFrame" scrolling="no" frameborder="0" src="' + comFramePath + 'eWGraphFrameBackImgProperty.html" style="width:100%;height:100%;"></iframe></div>';
        $("#contentProperty").dialog({ title: "加载底图", width: 390 , height: 250, top: 110, content: content, inline: true, lines: true, modal: false, minimizable: false, maximizable: false,
            buttons: [{text: saveText, width: 80, iconCls: "icon-ok",
                handler: function () {  //保存按钮事件
                    var frame = document.getElementById("imgFrame").contentWindow;
                    fCommon.View.MapData.IsShowPicture = frame.getIsImgShow();
                    var size = frame.getSize();
                    var filename=frame.getFileName();
                    if(filename != "")
                    {
                        fCommon.View.MapData.PicturePath = "images/" + filename;
                        fCommon.View.MapData.isLoad = true;
                    }

                    if(fCommon.View.MapData.IsShowPicture)
                    {
                        // if(size[0] > 0 && size[1] >0)
                        // {
                        //     view.View.MapData.SetEarthArea(0,size[1],size[0],0);
                        //     view.View.MapData.UpdateTransform();
                        // }
                    }

                    fCommon.View.MapData.UpdateObjectChange();
                    fCommon.View.Repaint();
                    $("#contentProperty").dialog('close');
                }
            }, {text: cancleText, width: 80, iconCls: "icon-cancel",
                handler: function () {  //取消按钮事件
                    $("#contentProperty").dialog('close');
                }
            }]
        });
    }
}