define(['WGAD/Scripts/WGADPlatConfig/WGADPlatConfig',
    'WGAD/Scripts/WGADPlatGMEngine',
    'WGAD/Scripts/WGADPlatGMEngineTools',
    'WGAD/Scripts/WGADPlatGraph2D',
    'WGAD/Scripts/WGADPlatGraph2DFrame',
    'WGAD/Scripts/WGADPlatSystemTools'
], function(WGADPlatConfig, WGADPlatGMEngine, WGADPlatGMEngineTools,WGADPlatGraph2D, WGADPlatGraph2DFrame,WGADPlatSystemTools) {
    var commonJs = {};
    commonJs.ViewCommonJs = function (fView, contentWindow) {
        this.View=fView.View;

        var comSelf=this;
    
     //添加边框
     this.SetBorder=function(obj)
     {
         
         var Layer;
         //找通用图层
         for(var i = 0 ; i < this.View.MapData.LayerList.length; i++ ) {
             if(this.View.MapData.LayerList[i].LayerName == "通用图层")
             {
                 Layer = this.View.MapData.LayerList[i];
                 break;
             }
         }
         //若无此图层，则创建一个名称为通用图层的fltGeneral图层
         if(!Layer)
         {
             Layer = new WGADPlatGraph2DFrame.WGFrameLayer();
             Layer.LayerName = "通用图层";
             Layer.LayerType = WGADPlatGraph2DFrame.EWGFrameLayerType.fltGeneral;
             this.View.MapData.AddLayer(Layer);
         }
         Layer.Actived = true;
         //循环遍历次图层所有子图元
         for(var i = Layer.Childrens.length; i>=0; i--)
         {
             //如果子图元存在图框图元
             if (Layer.Childrens[i] instanceof WGADPlatGraph2DFrame.WGFrameBorder)
             {
                 var str = window.confirm("此图层上已存在图框，是否覆盖重新生成图框？");
                 if (!str) {
                     //如果否，则返回
                     return;
                 }
                 //如果是，则删除此图框图元
                 Layer.RemoveChildrenByIndex(i);
                 break;
             }
         }
         if(!obj)
         {
            obj=this.CreateBorder();
         }
         Layer.AddChildren(obj);
         Layer.SetDataChanged(true);
         var offTop=Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceY));
         var offleft=Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX));
         var offright=Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX));
         var offbottom=Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceY));
         //this.View.MapData.SetEarthArea(obj.Left-offleft, obj.Top+offTop, obj.Right+offright, obj.Bottom-offbottom);
         //this.View.MapData.SetEarthArea(obj.Left, obj.Top, obj.Right, obj.Bottom);
         this.View.MapData.UpdateTransform();
         this.View.Repaint();
         this.ZoomAll();

     }
     this.CreateBorder=function (json) {
        if(!json) {
            json = {};
            //json.title = "$二级下标$~二级上标~@下标@^上标^ED3-1砂体层顶深平面图$二级下标$~二级上标~@下标@^上标^";
            json.title ="标题";
            json.bzr = "编制人:";
            json.qhr = "编制人:";
            json.shr = "审核人:";
            json.jsfzr = "技术负责人:";
            json.date = "日期:";
            json.dw = "单位:";
        }
        //得到Map上所有图元的外接矩形,JS中没有这个方法，需要自己遍历Map上所有图元得到外接矩形
        var temp = new WGADPlatGMEngine.WGRect();
        temp = fView.View.MapData.GetAllObjsEarthBound();
        //声明一个图框图元
        var oborder = new WGADPlatGraph2DFrame.WGFrameBorder({});
        oborder.Interval = 100;
        oborder.SpaceX = 150;
        oborder.SpaceY = 150;

        // oborder.CutFrontNumX=3;
        // oborder.CutFrontNumY=2;
        // oborder.FrontFont.Color=WGADPlatGMEngine.WGColor.FromARGB(255, 255,0,0);
        // oborder.BackFont.Color=WGADPlatGMEngine.WGColor.FromARGB(255, 0,0,255);
        //设置图框在屏幕上的范围
        var offX=Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceY));
        var offY=Math.abs(this.View.MapData.Transform.MapToEarth(10, WGADPlatGraph2D.EWGTransStyle.wgtsDistanceX));
        oborder.Top = temp.Top + oborder.Interval+offX;
        oborder.Left = temp.Left - oborder.Interval-offY;
        oborder.Bottom = temp.Bottom - oborder.Interval-offX;
        oborder.Right = temp.Right + oborder.Interval+offY;

        oborder.IsSetHVValue=true;
        oborder.HValue=Math.floor(temp.Left/100)*100;
        oborder.VValue=Math.ceil(temp.Top/100)*100;
        
        oborder.XLength = Math.abs(temp.GetWidth())+ 2 * oborder.Interval;
        oborder.YLength = Math.abs(temp.GetHeight()) + 2 * oborder.Interval;

        var otext1 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        oborder.AddChildren(otext1);
        otext1.TextCode = "title";
        otext1.TitleText = json.title;//"等值线平面图";//this.View.MapData.MapName; //"平面图";
        otext1.TextFont.AutoSize=true;
        otext1.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext1.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext1.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext1.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasCenter;
        otext1.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasTop;
        otext1.Visible = true;
        otext1.TextFont.FontSize = 30;
        otext1.RadioX = 0.5;
        otext1.RadioY = 1.052;
        otext1.OffX1=0;
        otext1.OffY1=-35;

        var otext2 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        oborder.AddChildren(otext2);
        otext2.TextCode = "bzr";
        otext2.TitleText = json.bzr;//"编制人：";
        otext2.TextFont.AutoSize=true;
        otext2.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext2.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext2.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext2.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasNone;
        otext2.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasBottom;
        otext2.Visible = true;
        otext2.RadioX = 0.1;
        otext2.RadioY = 0;
        otext2.OffX1=0;
        otext2.OffY1=5;

        // var otext3 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        // oborder.AddChildren(otext3);
        // otext3.TextCode = "qhr";
        // otext3.TitleText = json.qhr;//"清绘人：";
        // otext3.TextFont.AutoSize=true;
        // otext3.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        // otext3.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        // otext3.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        // otext3.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasNone;
        // otext3.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasBottom;
        // otext3.Visible = true;
        // otext3.RadioX = 0.3;
        // otext3.RadioY =-0;
        // otext3.OffX1=0;
        // otext3.OffY1=5;

        var otext4 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        oborder.AddChildren(otext4);
        otext4.TextCode = "shr";
        otext4.TitleText = json.shr;//"审核人：";
        otext4.TextFont.AutoSize=true;
        otext4.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext4.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext4.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext4.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasNone;
        otext4.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasBottom;
        otext4.RadioX = 0.5;
        otext4.RadioY = 0;
        otext4.Visible = true;
        otext4.OffX1=0;
        otext4.OffY1=5;

        var otext5 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        oborder.AddChildren(otext5);
        otext5.TextCode = "jsfzr";
        otext5.TitleText = json.jsfzr;//"技术负责人：";
        otext5.TextFont.AutoSize=true;
        otext5.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext5.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext5.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext5.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasNone;
        otext5.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasBottom;
        otext5.RadioX = 0.8;
        otext5.RadioY = 0;
        otext5.Visible = true;
        otext5.OffX1=0;
        otext5.OffY1=5;

        var otext6 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        oborder.AddChildren(otext6);
        otext6.TextCode = "date";
        otext6.TitleText = json.date;//"日期：";
        otext6.TextFont.Direction = WGADPlatGMEngine.EGTextDirection.wgtdTopToBottom;
        otext6.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext6.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext6.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaTOP;
        otext6.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasTop;
        otext6.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasNone;
        otext6.Visible = true;
        otext6.RadioX = 1;
        otext6.RadioY = 1;
        otext6.OffX1=2;
        otext6.OffY1=0;

        var otext7 = new WGADPlatGraph2DFrame.WGFrameBorderText({});
        oborder.AddChildren(otext7);
        otext7.TextCode = "dw";
        otext7.TitleText = json.dw;//"山东胜软科技股份有限公司";
        otext7.TextFont.AutoSize=true;
        otext7.TextFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaBOTTOM;
        otext7.UpDownFont.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaBOTTOM;
        otext7.UpDownFont2.VerticalAlign = WGADPlatGMEngine.EGTextVAlign.wgvaBOTTOM;
        otext7.TextFont.Direction = WGADPlatGMEngine.EGTextDirection.wgtdTopToBottom;
        otext7.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasBottom;
        otext7.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasNone;
        otext7.Visible = true;
        otext7.RadioX = -0.05;
        otext7.RadioY = 0.23;
        otext7.OffX1=-5;
        otext7.OffY1=0;

        var oscale = new WGADPlatGraph2DFrame.WGFrameScale({});
        oborder.AddChildren(oscale);
        oscale.Interval = 200;
        var olength = 5 * this.Interval;
        oscale.HAlignStyle = WGADPlatGraph2DFrame.EGHALignStyle.hasCenter;
        oscale.VAlignStyle = WGADPlatGraph2DFrame.EGVALignStyle.vasTop;
        oscale.TextFont.FontSize=20;
        oscale.CoordY = oborder.Top + 40 + oscale.Height;
        oscale.CoordX = (oborder.Left + oborder.Right - olength) / 2;
        oscale.ScaleY = (oscale.CoordY - oborder.Bottom) / (oborder.Top - oborder.Bottom);
        oscale.ScaleX = (oscale.CoordX - oborder.Left) / (oborder.Right - oborder.Left);
       // console.log(this.View.MapData.MapScale);
  //应用模板
  var url="../data/bordertemplate1.json";
  $.ajax({
      url: url,
      contentType: 'utf-8',
      async: false,
      error:console.log('error'),
      dataType: 'json',
      success: function (data) {
          fView.BorderApplyTemplate(oborder,data);
        
      }
  });
  fView.ZoomAll();
  fView.View.MapData.SetChanged(false);
        return oborder;
}

 
         this.SetBorderObjProperty=function (boderObj,e) {
            if (boderObj instanceof WGADPlatGraph2DFrame.WGFrameBorder)
            {
                boderObj.Left=e.Left;//起点横坐标
                boderObj.Top=e.Top;//起点纵坐标
                boderObj.XLength=e.XLength;//X轴长度
                boderObj.YLength=e.YLength;//Y轴长度
                boderObj.Interval=e.Interval;//线框间隔
                boderObj.InLineWidth=e.InLineWidth;//内框线宽
                boderObj.InLineColor=WGADPlatGMEngine.WGColor.FromARGB(255, e.InLineColor[0], e.InLineColor[1], e.InLineColor[2]);//内框线颜色
                boderObj.InLineStyle=e.InLineStyle;//内框线型
                boderObj.OutLineWidth=e.OutLineWidth;//外框线宽
                boderObj.OutLineColor=WGADPlatGMEngine.WGColor.FromARGB(255, e.OutLineColor[0], e.OutLineColor[1], e.OutLineColor[2]);//外框线颜色               
                boderObj.OutLineStyle=e.OutLineStyle;//外框线型

                boderObj.ShowGrid=e.ShowGrid;//是否显示网格
                boderObj.GridX=e.GridX;//横向网格间隔
                boderObj.GridY=e.GridY;//纵向网格间隔
                boderObj.GridLineWidth=e.GridLineWidth;//网格线宽
                boderObj.GridLineColor=WGADPlatGMEngine.WGColor.FromARGB(255, e.GridLineColor[0], e.GridLineColor[1], e.GridLineColor[2]);//网格线颜色
                
                boderObj.GridLineStyle=e.GridLineStyle;//网格线型

                boderObj.IsSetHVValue=e.IsSetHVValue;//是否设置初始值
                boderObj.HValue=e.HValue;//x轴起始值
                boderObj.VValue=e.VValue;//y轴起始值

                boderObj.ShowMark=e.ShowMark;//显示刻度
                boderObj.SpaceX=e.SpaceX;//X轴刻度间隔
                boderObj.SpaceY=e.SpaceY;//Y轴刻度间隔
                boderObj.CutFrontNumX=e.CutFrontNumX;//X轴刻度前端截长
                boderObj.CutFrontNumY=e.CutFrontNumY;//Y轴刻度前端截长
                boderObj.CutBackNumX=e.CutBackNumX;//X轴刻度后端截长
                boderObj.CutBackNumY=e.CutBackNumY;//Y轴刻度后端截长
                boderObj.FrontFont=e.FrontFont;//分割线前文字
                if(e.FrontFont.Color[0] != null){
                    boderObj.FrontFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.FrontFont.Color[0], e.FrontFont.Color[1], e.FrontFont.Color[2]);
                }else{
                    
                }
                boderObj.BackFont=e.BackFont;//分割线后文字
                if(e.BackFont.Color[0] != null){
                    boderObj.BackFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.BackFont.Color[0], e.BackFont.Color[1], e.BackFont.Color[2]);
                }else{
                    
                }

                //标签
                for(var i=0;i<boderObj.GetChildrenCount();i++)
                {
                    var obj=boderObj.GetChildrenByIndex(i);
                    if(obj instanceof WGADPlatGraph2DFrame.WGFrameBorderText)
                    {
                        if(obj.TextCode=="title")  //标题
                        {
                            if(e.title)
                            {
                                obj.TitleText=e.title;
                            }
                          
                            if(e.titleFont)
                            {
                                obj.TextFont=e.titleFont;
                                if(e.titleFont.Color[0] != null){
                                    obj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.titleFont.Color[0], e.titleFont.Color[1], e.titleFont.Color[2]);
                                }else{
                                    
                                }
                                obj.HAlignStyle=e.titleFont.HAlignStyle;//水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
                                obj.VAlignStyle=e.titleFont.VAlignStyle;//垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1
                            }
                            if(e.titleShow)
                            {
                                obj.Hidden=!e.titleShow;
                            }
                              //是否显示标题

                        }
                        else if(obj.TextCode=="bzr")
                        {
                            if(e.bzr)
                            {
                                obj.TitleText=e.bzr;
                            }
                            if(e.bzrShow)
                            {
                                obj.Hidden=!e.bzrShow;  //是否显示编制人

                            }
                           
                        }
                        else if(obj.TextCode=="qhr")
                        {
                            if(e.qhr)
                            {
                                obj.TitleText=e.qhr;
                            }
                            if(e.qhrFont){
                                obj.TextFont=e.qhrFont;
                                if(e.qhrFont.Color[0] != null){
                                    obj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.qhrFont.Color[0], e.qhrFont.Color[1], e.qhrFont.Color[2]);
                                }else{}
                                obj.HAlignStyle=e.qhrFont.HAlignStyle;//水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
                                obj.VAlignStyle=e.qhrFont.VAlignStyle;//垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1
                            }
                           if(e.qhrShow)
                                obj.Hidden=!e.qhrShow;  //是否显示
                        }
                        else if(obj.TextCode=="shr")
                        {
                            if(e.shr)
                            {
                                obj.TitleText=e.shr;
                            }
                            if(e.shrFont){
                                obj.TextFont=e.shrFont;
                                if(e.shrFont.Color[0] != null){
                                    obj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.shrFont.Color[0], e.shrFont.Color[1], e.shrFont.Color[2]);
                                }else{}
                                obj.HAlignStyle=e.shrFont.HAlignStyle;//水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
                                obj.VAlignStyle=e.shrFont.VAlignStyle;//垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1
                            }
                           if(e.shrShow)
                           {
                            obj.Hidden=!e.shrShow; 
                           }
                           //是否显示
                        }
                        else if(obj.TextCode=="jsfzr")
                        {
                            if(e.jsfzr)
                            {
                                obj.TitleText=e.jsfzr;
                            }
                            if(e.jsfzrFont){
                                obj.TextFont=e.jsfzrFont;
                                if(e.jsfzrFont.Color[0] != null){
                                    obj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.jsfzrFont.Color[0], e.jsfzrFont.Color[1], e.jsfzrFont.Color[2]);
                                }else{}
                                obj.HAlignStyle=e.jsfzrFont.HAlignStyle;//水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
                                obj.VAlignStyle=e.jsfzrFont.VAlignStyle;//垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1
                            }
                           if(e.jsfzrShow)
                           {
                            obj.Hidden=!e.jsfzrShow; 
                           }
                            //是否显示
                        }
                        else if(obj.TextCode=="date")
                        {
                            if(e.date)
                            {
                                obj.TitleText=e.date;
                            }
                            if(e.dateFont){
                                obj.TextFont=e.dateFont;
                                if(e.dateFont.Color[0] != null){
                                    obj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.dateFont.Color[0], e.dateFont.Color[1], e.dateFont.Color[2]);
                                }else{}
                                obj.HAlignStyle=e.dateFont.HAlignStyle;//水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
                                obj.VAlignStyle=e.dateFont.VAlignStyle;//垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1
                            }
                           if(e.dateShow)
                           {
                            obj.Hidden=!e.dateShow; 
                           }
                             //是否显示
                        }
                        else if(obj.TextCode=="dw")
                        {
                            if(e.dw)
                            {
                                obj.TitleText=e.dw;
                            }
                            if(e.dwFont){
                                obj.TextFont=e.dwFont;
                                if(e.dwFont.Color[0] != null){
                                    obj.TextFont.Color = WGADPlatGMEngine.WGColor.FromARGB(255, e.dwFont.Color[0], e.dwFont.Color[1], e.dwFont.Color[2]);
                                }else{}
                                obj.HAlignStyle=e.dwFont.HAlignStyle;//水平对齐方式   居中: 3,左对齐: 1, 不对齐" 0, 右对齐": 2
                                obj.VAlignStyle=e.dwFont.VAlignStyle;//垂直对齐方式   下对齐 2   居中 3 不对齐 0 上对齐 1
                            }
                          if(e.dwShow)
                          {
                            obj.Hidden=!e.dwShow; 
                          }
                            //是否显示
                        }
                        
                    }
                    else if(obj instanceof WGADPlatGraph2DFrame.WGFrameScale)
                    {
                        obj.Hidden=!e.scaleShow;
                    }
                }
                boderObj.SetDataChanged(true);

            }
            this.View.Repaint();
        }
        //放大
        this.ZoomOut = function () {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbZoomOut);
        }

        //缩小
        this.ZoomIn = function () {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbZoomIn);
        }

        //选择状态
        this.SetSelect=function () {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
        }
        //橡皮擦
        this.Eraser=function () {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDeletePointEraser);
        }
        
        //复制
        this.Copy = function () {
            for(let i = 0;i<this.View.HiteResult.SelectObjs.length;i++){
                if(this.View.HiteResult.SelectObjs[i].ObjType != this.View.HiteResult.SelectObjs[0].ObjType){
                    alert("请选择同一个图层的图元");
                    return;
                }
            }
            this.View.MapData.SetActivateLayer(this.GetLayerOfObj(this.View.HiteResult.SelectObjs[0]), true);
            this.View.MapData.SetSelectLayer(this.GetLayerOfObj(this.View.HiteResult.SelectObjs[0]), true);
            this.View.m_pasteNum = 1;
            this.View.CopyToClipborad();
            if (this.View.HiteResult.HiteModel == WGADPlatGraph2D.EWGHiteModel.wghmPoint) {
                this.View.HiteResult.MutiSelect = false;
            }
            this.View.Repaint();
        }
        //粘贴
        this.Paste = function () {
            if (this.View.m_canPaste) {
                this.View.m_canPaste = false;
                this.View.PasteFromClipborad();
                this.View.m_pasteNum ++;
            }

            if (this.View.HiteResult.HiteModel == WGADPlatGraph2D.EWGHiteModel.wghmPoint) {
                this.View.HiteResult.MutiSelect = false;
            }
            this.View.m_canPaste = true;
            this.View.Repaint();
        }
        //折线 连接
        this.LinkTwoLines=function()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbJoinLine);
        }
        //剪切
        this.Cut = function () {
            this.View.Cut();
            if (this.View.HiteResult.HiteModel == WGADPlatGraph2D.EWGHiteModel.wghmPoint) {
                this.View.HiteResult.MutiSelect = false;
            }
            this.View.Repaint();
        }
        //删除
        this.Delete = function () {
            this.View.Delete();
            this.View.Repaint();
        }
        //剪断线
        this.ClipLine = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbClipLine);
            this.View.Repaint();
        }
        //线减点
        this.DeleteManyPoint = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDeleteManyPoint);
        }
        //直线选择
        this.LineSelect = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbLineSelect);
            this.View.Repaint();
        }
        //全图显示
        this.ZoomAll = function () {
            
            var width = this.View.MapCanvas.width;
            var height = this.View.MapCanvas.height;
            this.View.MapData.ZoomAll(width, height);
            this.View.Repaint();
            console.log(this.View.MapData.ViewScale);
        }
        //绘制点
        this.DrawPoint = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawDot);
        }
        //绘制直线
        this.DrawLine = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawLine);
        }
        //绘制折线
        this.DrawPolyLine = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawPolyline);
        }
        //绘制圆弧
        this.DrawArc = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawArc);
        }
        //绘制矩形
        this.DrawRect = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawRect);
        }
        //绘制多边形
        this.DrawPolygon = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawPolygon);
        }
        //绘制椭圆
        this.DrawEllipse = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawEllipse);
        }
        //绘制圆
        this.DrawCircle = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawCircle);
        }
        //绘制饼图
        this.DrawPie = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawPie);
        }
        //绘制图片
        this.DrawPic = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawPicture);
        }
        //绘制表格
        this.DrawTable = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawTable);
        }
        //绘制普通文本
        this.DrawText = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawSText);
        }

        this.DrawLegend = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawLegend);
        }
      
        //绘制断层线
        this.DrawBreak = function () {

            var breaklayer = this.GetSomeTypeLayer(this.View.MapData, WGADPlatGraph2DFrame.EWGFrameLayerType.fltBreakLine);
            if (breaklayer == null) {
                breaklayer = this.View.MapData.AddLayerWithNameAndType("断层线图层", WGADPlatGraph2DFrame.EWGFrameLayerType.fltBreakLine);

                var iindex = this.View.MapData.LayerList.length - 1;
                var frameLayer = null;
                var desIndex = iindex;
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    frameLayer = this.View.MapData.LayerList[i];

                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill) {
                        if (desIndex > i) {
                            desIndex = i;
                        }
                    }
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltBreakLine) {
                        iindex = i;
                    }
                }
                if (desIndex != -1) {
                    this.View.MapData.DragLayerofIndex(iindex, desIndex);
                }
            } else if(breaklayer == "error"){
                //说明当前激活的 非本图层
                return;
            }
            else {
                if (!breaklayer.Display) {
                    alert("请先激活断层图层！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
            }

            breaklayer.Display = true;
            this.View.MapData.SetActivateLayer(breaklayer, true);
            this.View.MapData.SetSelectLayer(breaklayer, true);
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawBreakLine);
        }

        //绘制尖灭线
        this.DrawJMX = function () {

            var deslayer = this.GetSomeTypeLayer(this.View.MapData, WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine);
            if (deslayer == null) {
                deslayer = this.View.MapData.AddLayerWithNameAndType("尖灭线图层", WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine);
                var iindex = this.View.MapData.LayerList.length - 1;
                var frameLayer = null;
                var desIndex = iindex;
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    frameLayer = this.View.MapData.LayerList[i];
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ) {
                        if (desIndex > i) {
                            desIndex = i;
                        }
                    }
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine) {
                        iindex = i;
                    }
                }

                if (desIndex != -1) {
                    this.View.MapData.DragLayerofIndex(iindex, desIndex);
                }
            } else if(deslayer == "error"){
                //说明当前激活的 非本图层
                return;
            }
            else {
                if (!deslayer.Display) {
                    alert("请先激活" + deslayer.LayerName + "！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
            }

            deslayer.Display = true;
            this.View.MapData.SetActivateLayer(deslayer, true);
            this.View.MapData.SetSelectLayer(deslayer, true);
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawPinchout);
        }
        //绘制含油零线
        this.DrawHYLX = function () {
            var deslayer = this.GetSomeTypeLayer(this.View.MapData, WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX);
            if (deslayer == null) {
                deslayer =this.View.MapData.AddLayerWithNameAndType("含油零线图层", WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX);
                var iindex =this.View.MapData.LayerList.length - 1;
                var frameLayer = null;
                var desIndex = iindex;
                for (var i = 0; i < this.View.MapData.LayerList.length;i++)
                {
                    frameLayer = this.View.MapData.LayerList[i];
                    if (
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill) {
                        if (desIndex > i) {
                            desIndex = i;
                        }
                    }

                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX) {
                        iindex = i;
                    }
                }

                if (desIndex != -1) {
                    this.View.MapData.DragLayerofIndex(iindex, desIndex);
                }
            } else if(deslayer == "error"){
                //说明当前激活的 非本图层
                return;
            }
            else {
                if (!deslayer.Display) {
                    alert("请先激活" + deslayer.LayerName + "！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
            }

            deslayer.Display = true;
            this.View.MapData.SetActivateLayer(deslayer, true);
            this.View.MapData.SetSelectLayer(deslayer, true);
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawOilLine);
        }
        //绘制等值线
        this.DrawIso = function ()
        {
            var deslayer = this.GetSomeTypeLayer(this.View.MapData, WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline);
            if (deslayer == null) {
                deslayer = this.View.MapData.AddLayerWithNameAndType("等值线图层", WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline);
                var iindex = this.View.MapData.LayerList.length - 1;
                var frameLayer = null;
                var desIndex = iindex;
                for (var i = 0; i < this.View.MapData.LayerList.length; i++) {
                    frameLayer = this.View.MapData.LayerList[i];
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ) {
                        if (desIndex > i) {
                            desIndex = i;
                        }
                    }
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline) {
                        iindex = i;
                    }
                }
                if (desIndex != -1) {
                    this.View.MapData.DragLayerofIndex(iindex, desIndex);
                }
            } else if(deslayer == "error"){
                //说明当前激活的 非本图层
                return;
            }
            else {
                if (!deslayer.Display) {
                    alert("请先激活" + deslayer.LayerName + "！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
            }
            deslayer.Display = true;
            this.View.MapData.SetActivateLayer(deslayer, true);
            this.View.MapData.SetSelectLayer(deslayer, true);
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawIsoLine);
        }
        //绘制储层面积
        this.DrawCCMJ = function ()
        {
            var deslayer = this.GetSomeTypeLayer( this.View.MapData , WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ );
            if (deslayer == null)
            {
                deslayer = this.View.MapData.AddLayerWithNameAndType("储层面积图层",WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ );
                var iindex = this.View.MapData.LayerList.length - 1;
                var frameLayer = null;
                var desIndex = iindex;

                for (var i = 0 ; i < this.View.MapData.LayerList.length ; i++)
                {
                    frameLayer = this.View.MapData.LayerList[i];
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ)
                    {
                        if (desIndex > i)
                        {
                            desIndex = i;
                        }
                    }
                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ)
                    {
                        iindex = i;
                    }
                }

                if (desIndex != -1)
                {
                    this.View.MapData.DragLayerofIndex( iindex , desIndex );
                }
            } else if(deslayer == "error"){
                //说明当前激活的 非本图层
                return;
            }
            else
            {
                if (!deslayer.Display)
                {
                    alert("请先激活" + deslayer.LayerName + "！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
            }

            deslayer.Display = true;
            this.View.MapData.SetActivateLayer( deslayer , true );
            this.View.MapData.SetSelectLayer( deslayer , true );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawIsoLineFill);
        }
        //绘制含油面积
        this.DrawHYMJ = function () {
            var deslayer = this.GetSomeTypeLayer(this.View.MapData , WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ );
            if (deslayer == null)
            {
                deslayer = this.View.MapData.AddLayerWithNameAndType( "含油面积图层" , WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ );
                var iindex = this.View.MapData.LayerList.length - 1;
                var frameLayer = null;
                var desIndex = iindex;

                for (var i = 0 ; i < this.View.MapData.LayerList.length ; i++)
                {
                    frameLayer = this.View.MapData.LayerList[i];

                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                        frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ)
                    {
                        if (desIndex > i)
                        {
                            desIndex = i;
                        }
                    }

                    if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ)
                    {
                        iindex = i;
                    }
                }

                if (desIndex != -1)
                {
                    this.View.MapData.DragLayerofIndex( iindex , desIndex );
                }
            } else if(deslayer == "error"){
                //说明当前激活的 非本图层
                return;
            }
            else
            {
                if (!deslayer.Display)
                {
                    alert("请先激活" + deslayer.LayerName + "！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
            }

            deslayer.Display = true;
            this.View.MapData.SetActivateLayer( deslayer , true );
            this.View.MapData.SetSelectLayer( deslayer , true );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawIsoLineFill);
        }
        //绘制轮廓线
        this.DrawLKX = function ()
        {
            var lkxlayer = null;
            var frameLayer = this.View.MapData.GetActivateLayer();
            if (frameLayer != null)
            {
                if (frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine ||
                    frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX ||
                    frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine ||
                    frameLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline)
                {
                    lkxlayer = frameLayer;
                }
            }

            if (lkxlayer == null)
            {
                //获取轮廓线该绘制在哪个图层上
                var isfirstLayer = false;
                for (var i = 0 ; i < this.View.MapData.LayerList.length ; i++)
                {
                    var tmpLayer = this.View.MapData.LayerList[i];
                    if (tmpLayer != null)
                    {
                        if (tmpLayer.Display)
                        {
                            //获取显示的可绘制轮廓线的图层
                            if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine)
                            {
                                lkxlayer = tmpLayer;
                                break;
                            }

                            if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX)
                            {
                                lkxlayer = tmpLayer;
                                break;
                            }

                            if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline)
                            {
                                lkxlayer = tmpLayer;
                                break;
                            }

                            if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine)
                            {
                                lkxlayer = tmpLayer;
                                break;
                            }
                        }
                        else
                        {
                            if (!isfirstLayer)
                            {
                                //不显示的但是可绘制轮廓线的第一个图层
                                if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine)
                                {
                                    lkxlayer = tmpLayer;
                                    isfirstLayer = true;
                                }

                                if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX)
                                {
                                    lkxlayer = tmpLayer;
                                    isfirstLayer = true;
                                }

                                if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline)
                                {
                                    lkxlayer = tmpLayer;
                                    isfirstLayer = true;
                                }

                                if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine)
                                {
                                    lkxlayer = tmpLayer;
                                    isfirstLayer = true;
                                }
                            }
                        }
                    }
                }
            }
            //如果遍历所有图层，没有合适的图层可绘制轮廓线，则创建尖灭线图层，绘制轮廓线
            if (lkxlayer == null)
            {
                //创建尖灭线图层，绘制轮廓线，并更改尖灭线图层的索引位置
                lkxlayer = this.View.MapData.AddLayerWithNameAndType( "尖灭线图层" , WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine );
                var iindex = this.View.MapData.LayerList.length - 1;
                var desIndex = iindex;

                for (var i = 0 ; i < this.View.MapData.LayerList.length ; i++)
                {
                    var tmpLayer = this.View.MapData.LayerList[i];

                    if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYLX ||
                        tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsoline ||
                        tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesLine ||
                        tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                        tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ ||
                        tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill ||
                        tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ)
                    {
                        if (desIndex > i)
                        {
                            desIndex = i;
                        }
                    }

                    if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltDestroyLine)
                    {
                        iindex = i;
                    }
                }

                if (desIndex != -1)
                {
                    this.View.MapData.DragLayerofIndex( iindex , desIndex );
                }
            }
            else {
                if (!lkxlayer.Display) {
                    alert("请先激活" + lkxlayer.LayerName + "！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    return;
                }
                //判断存在轮廓线，存在，删除后，才可手绘
                var isexist = false;
                for (var i = lkxlayer.GetChildrenCount() - 1; i >= 0; i--) {
                    if (lkxlayer.GetChildrenByIndex(i).ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameOutLine) {
                        isexist = true;
                        break;
                    }
                }
                if (isexist) {
                    //判断删除轮廓线与否
                    var mymessage=confirm("图层上已存在轮廓线，是否删除已有的轮廓线(保持轮廓线的唯一性)再手绘？");  
                    if(mymessage==true)  
                    {  
                        for (var i = lkxlayer.GetChildrenCount() - 1; i >= 0; i--) {
                            if (lkxlayer.GetChildrenByIndex(i).ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameOutLine) {
                                lkxlayer.RemoveChildrenByIndex(i);
                            }
                        }
                    }  
                    else if(mymessage==false)  
                    {  
                        return;
                    }  
                }
            }
            lkxlayer.Display = true;
            this.View.MapData.SetActivateLayer( lkxlayer , true );
            //lkxlayer.Selected = true;
            this.View.MapData.SetSelectLayer( lkxlayer , true );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawOutLine);
        }
        //绘制趋势线
        this.DrawQSX = function ()
        {
            var deslayer = this.GetSomeNameLayer(this.View.MapData, "趋势约束图层" );
            if (deslayer == null)
            {
                deslayer = this.View.MapData.AddLayerWithNameAndType( "趋势约束图层" , WGADPlatGraph2DFrame.EWGFrameLayerType.fltGeneral );
            }
            deslayer.Display = true;
            this.View.MapData.SetActivateLayer( deslayer , true );
            this.View.MapData.SetSelectLayer( deslayer , true );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawIsoLine);
        }
        //绘制趋势点
        this.DrawQSD = function ()
        {
            var deslayer = this.GetSomeNameLayer( this.View.MapData , "趋势约束图层" );
            if (deslayer == null)
            {
                deslayer =this.View.MapData.AddLayerWithNameAndType( "趋势约束图层" ,  WGADPlatGraph2DFrame.EWGFrameLayerType.fltGeneral );
            }

            deslayer.Display = true;
            this.View.MapData.SetActivateLayer( deslayer , true );
            this.View.MapData.SetSelectLayer( deslayer , true );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawWell);
        }
        //绘制井位
        this.DrawJW = function ()
        {
            var m_map = this.View.MapData;
            if (m_map != null)
            {
                var m_layer = m_map.GetLayerByType( WGADPlatGraph2DFrame.EWGFrameLayerType.fltWell );
                if (m_layer == null)
                {
                    $.messager.alert( "提示","图件上不存在井位图层，请建立井位图层！" ,"info" );
                    return;
                }

                m_map.SetActivateLayer( m_layer , true );
                m_layer.Display = true;
                m_map.SetSelectLayer( m_layer , true );
                this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDrawWell);
            }

        }

        //绘制趋势线
        this.CalcRange = function ()
        {
            var deslayer = this.GetSomeNameLayer(this.View.MapData, "趋势约束图层" );
            if (deslayer == null)
            {
                deslayer = this.View.MapData.AddLayerWithNameAndType( "趋势约束图层" , WGADPlatGraph2DFrame.EWGFrameLayerType.fltGeneral );
            }
            deslayer.Display = true;
            this.View.MapData.SetActivateLayer( deslayer , true );
            this.View.MapData.SetSelectLayer( deslayer , true );
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbPLineDistance);
        }

        //面积圈空
        this.DrawAriHole=function () {
            var layer = null;
            var tmpEditLayer = null; //可编辑的
            var firstActiveLayer = null; // 首个可激活的
            var firstDisplayLayer = null; //首个可显示的
            var firstLayer = null; //第一个图层
            var isfirst = false;
            var isfirstDisplay = false;
            var isfirstActive = false;

            for (var i = 0 ; i < this.View.MapData.LayerList.length ; i++)
            {
                var tmpLayer = this.View.MapData.LayerList[i];
                if (!tmpLayer.Display)
                {
                    continue;
                }

                if (tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltCCMJ ||
                    tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltHYMJ ||
                    tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltIsolineFill ||
                    tmpLayer.LayerType == WGADPlatGraph2DFrame.EWGFrameLayerType.fltFaicesMJ)
                {
                    if (tmpLayer.Actived)
                    {
                        if (tmpLayer.Selected)
                        {
                            tmpEditLayer = tmpLayer;
                            break;
                        }
                        else
                        {
                            if (!isfirstActive)
                            {
                                firstActiveLayer = tmpLayer;
                                isfirstActive = true;
                            }
                        }
                    }
                    else
                    {
                        if (!isfirstDisplay)
                        {
                            firstDisplayLayer = tmpLayer;
                            isfirstDisplay = true;
                        }
                    }
                }

                if (!isfirst)
                {
                    firstLayer = tmpLayer;
                    isfirst = true;
                }
            }

            if (tmpEditLayer != null)
            {
                //srcLayer = tempLayer;
                layer = tmpEditLayer;
            }
            else if (firstActiveLayer != null)
            {
                layer = firstActiveLayer;
            }
            else if (firstDisplayLayer != null)
            {
                layer = firstDisplayLayer;
            }
            else
            {
                layer = firstLayer;
            }

            this.View.MapData.SetActivateLayer( layer , true );
            this.View.MapData.SetSelectLayer( layer , true );
            this.View.SetOperationModel( WGADPlatGraph2D.EWGMapOpModel.msbPolygonCave );
        }

        //线加点
        this.AddPoint = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbAddPoint);
        }

        //线减点
        this.DeletePoint = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbDeletePoint);
        }

        //全选
        this.SelectAll = function ()
        {
            for(var i = 0 ; i < this.View.MapData.LayerList.length; i++ ) {
                var layer = this.View.MapData.LayerList[i];
                if(layer.Actived == true || layer.Actived == "true") {
                    for (var j = 0; j < layer.Childrens.length; j++) {
                        var obj = layer.Childrens[j];
                        this.View.HiteResult.MutiSelect = true;
                        this.View.HiteResult.AddSelectObject(obj);
                        this.View.HiteResult.MutiSelect = false;
                    }
                }
            }
            this.View.Repaint();
        }

        
        //矩形选择
        this.RectSelect = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbRectSelect);
            this.View.Repaint();
        }
        //导出缩略图
        this.RectMap = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbRectMap);
            this.View.Repaint();
        }

        //多边形区域选择
        this.AreaSelect = function ()
        {
            this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbAreaSelect);
            this.View.Repaint();
        }
        this.SaveToPng=function()
        {
           fView.SaveToPng();
        }
        this.SaveToBase=function(){
            fView.SaveToBase();
        }
        this.SaveMap=function () {
            fView.SaveMap();

        }
        this.SetLayerActive=function (layer,isActive) {
            this.View.MapData.SetActivateLayer( layer , isActive );
        }
        this.SetLayerDisplay=function (layer,isDisplay) {
            this.View.MapData.SetDisplayLayer( layer , isDisplay );
        }
        /// <summary>
        /// 获取某类型的图层（首选显示的，可编辑的，再激活的，再显示的，再第一个）
        /// </summary>
        /// <param name="frameMap">GFrameMap</param>
        /// <param name="frameLayerTyepe">EGFrameLayerType</param>
        /// <returns>GFrameLayer</returns>
        this.GetSomeTypeLayer=function(frameMap, frameLayerTyepe) {
            var tmpEditLayer = null; //可编辑的
            var firstActiveLayer = null; // 首个可激活的
            var firstDisplayLayer = null; //首个可显示的
            var firstLayer = null; //第一个图层
            var isfirst = false;
            var isfirstDisplay = false;
            var isfirstActive = false;

            for (var i = 0; i < frameMap.LayerList.length; i++) {
                var tmpLayer = frameMap.LayerList[i];
                //在这先判断 通用图层是否为激活状图，若是单独锁定通用图层则在通用图层绘制 否则 在自己的图层上绘制或者创建新的图层。
                if(tmpLayer.LayerType == 0 && tmpLayer["Activeds"]){
                    tmpEditLayer = tmpLayer;
                    break;
                }
                if(tmpLayer.LayerType != frameLayerTyepe && tmpLayer["Activeds"]){
                    alert("当前只可编辑图层[" + tmpLayer.LayerName + "]！");
                    this.View.SetOperationModel(WGADPlatGraph2D.EWGMapOpModel.msbSelect);
                    firstLayer = "error"
                    return firstLayer;
                }
                if (tmpLayer.LayerType == frameLayerTyepe) {
                    if (tmpLayer.Display) {
                        if (tmpLayer.Actived) {
                            if (tmpLayer.Selected) {
                                tmpEditLayer = tmpLayer;

                                break;
                            }
                            else {
                                if (!isfirstActive) {
                                    firstActiveLayer = tmpLayer;
                                    isfirstActive = true;
                                }
                            }
                        }
                        else {
                            if (!isfirstDisplay) {
                                firstDisplayLayer = tmpLayer;
                                isfirstDisplay = true;
                            }
                        }
                    }

                    if (!isfirst) {
                        firstLayer = tmpLayer;
                        isfirst = true;
                    }
                }
            }

            if (tmpEditLayer != null) {
                //srcLayer = tempLayer;
                return tmpEditLayer;
            }
            else if (firstActiveLayer != null) {
                return firstActiveLayer;
            }
            else if (firstDisplayLayer != null) {
                return firstDisplayLayer;
            }
            else {
                return firstLayer;
            }
        }
        /// <summary>
        /// 获取某名称的图层
        /// </summary>
        /// <param name="frameMap">GFrameMap</param>
        /// <param name="frameMap">GFrameMap</param>
        /// <param name="layerName">string</param>
        /// <returns>GFrameLayer</returns>
        this.GetSomeNameLayer=function( frameMap ,layerName)
        {
            var tmpLayer = null;
            for (var i = 0 ; i < frameMap.LayerList.length ; i++)
            {
                var layer = frameMap.LayerList[i];
                if (layer.LayerName.toUpperCase() == layerName.toUpperCase())
                {
                    tmpLayer = layer;
                    break;
                }
            }

            return tmpLayer;
        }
        //循环得到外接矩形
        this.GetMapBound =function () {
            var oEarthBound = new WGADPlatGMEngine.WGRect();
            var left = this.View.MapData.EarthRight;
            var right = this.View.MapData.EarthLeft;
            var top = this.View.MapData.EarthBottom;
            var bottom = this.View.MapData.EarthTop;
            //循环图层
            for(var i = 0 ; i < this.View.MapData.LayerList.length; i++ )
            {
                var tempLayer = this.View.MapData.LayerList[i];
                if(tempLayer.Childrens) {
                    for (var j = 0; j < tempLayer.Childrens.length; j++) {
                        var temp1 = tempLayer.Childrens[j];
                        var tempRect = temp1.GetBoundRect();
                        if(tempRect)
                        {
                            if(tempRect.Left < left)
                            {
                                left = tempRect.Left;
                            }
                            if(tempRect.Right > right)
                            {
                                right = tempRect.Right;
                            }
                            if(tempRect.Top > top)
                            {
                                top = tempRect.Top;
                            }
                            if(tempRect.Bottom < bottom)
                            {
                                bottom = tempRect.Bottom;
                            }
                        }
                        if(temp1.Childrens) {
                            for (var h = 0; h < temp1.Childrens.length; h++) {
                                var temp2 = temp1.Childrens[h];
                                var tempRect1 = temp2.GetBoundRect();
                                if (tempRect1) {
                                    if (tempRect1.Left < left) {
                                        left = tempRect.Left;
                                    }
                                    if (tempRect1.Right > right) {
                                        right = tempRect.Right;
                                    }
                                    if (tempRect1.Top > top) {
                                        top = tempRect.Top;
                                    }
                                    if (tempRect1.Bottom < bottom) {
                                        bottom = tempRect.Bottom;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            oEarthBound.initial(left, top, right, bottom);
            return oEarthBound;
        }
        this.SearchObjByID=function (id) {
            var obj;
            //找通用图层
            for(var i = 0 ; i < this.View.MapData.LayerList.length; i++ ) {
                if (this.View.MapData.LayerList[i].Childrens) {
                    for (var j = 0; j < this.View.MapData.LayerList[i].Childrens.length; j++) {
                        var well = this.View.MapData.LayerList[i].Childrens[j];
                        if (well != null) {
                            if (well.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameWell) {
                                if (well.WellName == id) {
                                    obj = well;
                                    break;
                                }
                            }
                        }

                    }
                }

                if (obj){
                    break;
                }
            }

            if(obj)
            {
                //获取obj的中心点
                var x=0.5 * (obj.GetBoundRect().Left + obj.GetBoundRect().Right);
                var y=0.5 * (obj.GetBoundRect().Top+obj.GetBoundRect().Bottom);
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
                this.View.Repaint();
            }

        }
        //封装一个方法判断数组和对象
        function isType(obj){
            var type = Object.prototype.toString.call(obj);
            if(type == '[object Array]'){
                return 'Array';
            }else if(type == '[object Object]'){
                return "Object"
            }else{
                return 'param is no object type';
            }
        }

        /// <summary>
        /// 自动拼接两个同样的折线
        /// </summary>
        this.AutoLinkTwoLines=function()
        {
            if (comSelf.View.HiteResult.SelectObjs.length != 2)
            {
                alert( "请选中两条相同类型的线图元！");
                return;
            }

            var geoObj1 = comSelf.View.HiteResult.SelectObjs[0];
            var geoObj2 = comSelf.View.HiteResult.SelectObjs[1];
            var line1 = null;
            var line2 = null;

            if (geoObj1.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameFoulline)
            {
                line1 = geoObj1;
                if (geoObj2.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameFoulline)
                {
                    line2 = geoObj2;

                    if (line1 == null || line2 == null) {
                        alert("请选中两条相同类型的线图元！");
                        return;
                    }
                    if (line1.FoulLineType != line2.FoulLineType) {
                        alert("请选中两条相同类型的线图元！");
                        return;
                    }
                }
            }
            else if (geoObj1.ObjType == WGADPlatGraph2D.EWGObjectType.wgtPLine)
            {
                line1 = geoObj1;
                if (geoObj2.ObjType == WGADPlatGraph2D.EWGObjectType.wgtPLine)
                {
                    line2 = geoObj2;
                }
                if (line1 == null || line2 == null)
                {
                    alert( "请选中两条相同类型的线图元！");
                    return;
                }
            }
            else if (geoObj1.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine)
            {
                line1 = geoObj1;
                if (geoObj2.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameIsoLine)
                {
                    line2 = geoObj2;
                }
                if (line1 == null || line2 == null)
                {
                    alert("请选中两条相同类型的线图元！");
                    return;
                }
            }
            else if (geoObj1.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline)
            {
                line1 = geoObj1;
                if (geoObj2.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameBreakline)
                {
                    line2 = geoObj2;
                }
                if (line1 == null || line2 == null)
                {
                    alert("请选中两条相同类型的线图元！");
                    return;
                }
            }
            var layer = line1.Parent;
            if (layer == null)
            {
                return;
            }
            //GFrameLineOperationFunc.LinkTwoPLine(line1,line2);
            var m={};
            var layerlist=[];
            var j={};
            var arr=[];
            arr.push(line1);
            arr.push(line2);
            layer.CopyDataToJson(j,arr,'1');
            layerlist.push(j);
            m.LayerList=layerlist;
            var json={};
            json.PageKey=tabID;
            json.TJID=comSelf.View.MapData.MapID;
            json.TCData=m;
            var param = JSON.stringify(json);
            // console.log(json);
            $.ajax({
                url: "",
                type: "POST",
                data: {objparam: param},
                async: true,
                dataType: 'text',
                success: function (data) {
                    comSelf.LoadFrameData(data.TJData);
                    var layerTemp=comSelf.View.MapData.GetLayerByID(layer.ObjID);
                    if(layerTemp!=null)
                    {
                        layer.RemoveChildrenByID(line2.ObjID);
                        layer.DataChanged = true;
                        comSelf.View.UpdateObjectChange();
                        comSelf.View.Repaint();
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });

        }
        //递归获取当前选中的SelectObj所在的图层
        this.GetLayerOfObj=function (obj) {
            if(obj) {
                if (obj.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLayer)
                {
                    return obj;
                }
                if(obj.Parent)
                {
                    if (obj.Parent.ObjType == WGADPlatGraph2D.EWGObjectType.wgtFrameLayer) {
                        return obj.Parent;
                    }
                }
                else
                {
                    return null;
                }
                this.GetLayerOfObj(obj.Parent);
            }
            else
            {
                return null;
            }
        }

    }

    return commonJs;
});