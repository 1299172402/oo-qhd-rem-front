//线型选择控件
LineStyleSelect = function (selectDivId, propertyid) {
    this.Init(selectDivId, propertyid);
}

LineStyleSelect.prototype = {
    cvs: null,
    ctx: null,
    //显示层
    divPreview: null,
    //下拉层
    divCanvas: null,
    //用于区分多个控件的情况
    propertyid: null,

    //初始化线条
    WriteLine: function (cvs, obj) {
        canvas = document.getElementById(cvs);
        ctx = canvas.getContext('2d');

        if (cvs == "cvs_linestyle1_" + obj.propertyid) {
            ctx.setLineDash([]);
            obj.WriteLineByType(ctx, 5, 10);
        }
        if (cvs == "cvs_linestyle2_" + obj.propertyid) {
            ctx.setLineDash([5, 3]);
            obj.WriteLineByType(ctx, 5, 10);
        }
        if (cvs == "cvs_linestyle3_" + obj.propertyid) {
            ctx.setLineDash([1, 3]);
            obj.WriteLineByType(ctx, 5, 10);
        }
        if (cvs == "cvs_linestyle4_" + obj.propertyid) {
            ctx.setLineDash([5, 3, 1, 3]);
            obj.WriteLineByType(ctx, 5, 10);
        }
        if (cvs == "cvs_linestyle5_" + obj.propertyid) {
            ctx.setLineDash([5, 3, 1, 3, 1, 3]);
            obj.WriteLineByType(ctx, 5, 10);
        }
    },

    WritePreviewLine: function (cvs, cvsTarget, obj) {
        canvas = document.getElementById(cvsTarget);
        ctx = canvas.getContext('2d');
        if (cvs == "cvs_linestyle1_" + obj.propertyid) {
            ctx.setLineDash([]);
            obj.WriteLineByType(ctx, 5, 10);
            $("#description_" + obj.propertyid).html("直线");
        }
        if (cvs == "cvs_linestyle2_" + obj.propertyid) {
            ctx.setLineDash([5, 3]);
            obj.WriteLineByType(ctx, 5, 10);
            $("#description_" + obj.propertyid).html("虚线");
        }
        if (cvs == "cvs_linestyle3_" + obj.propertyid) {
            ctx.setLineDash([1, 3]);
            obj.WriteLineByType(ctx, 5, 10);
            $("#description_" + obj.propertyid).html("点线");
        }
        if (cvs == "cvs_linestyle4_" + obj.propertyid) {
            ctx.setLineDash([5, 3, 1, 3]);
            obj.WriteLineByType(ctx, 5, 10);
            $("#description_" + obj.propertyid).html("点划线");
        }
        if (cvs == "cvs_linestyle5_" + obj.propertyid) {
            ctx.setLineDash([5, 3, 1, 3, 1, 3]);
            obj.WriteLineByType(ctx, 5, 10);
            $("#description_" + obj.propertyid).html("双点划线");
        }
    },

    //初始化选中线型
    InitPreview: function (selectedType) {
        var self = this;
        canvas = document.getElementById("preview_" + self.propertyid);
        ctx = canvas.getContext('2d');
        switch (selectedType) {
            case 0:
                ctx.setLineDash([]);
                self.WriteLineByType(ctx, 5, 12);
                $("#description_" + self.propertyid).html("直线");
                break;
            case 1:
                ctx.setLineDash([5, 3]);
                self.WriteLineByType(ctx, 5, 12);
                $("#description_" + self.propertyid).html("虚线");
                break;
            case 2:
                ctx.setLineDash([1, 3]);
                self.WriteLineByType(ctx, 5, 12);
                $("#description_" + self.propertyid).html("点线");
                break;
            case 3:
                ctx.setLineDash([5, 3, 1, 3]);
                self.WriteLineByType(ctx, 5, 12);
                $("#description_" + self.propertyid).html("点划线");
                break;
            case 4:
                ctx.setLineDash([5, 3, 1, 3, 1, 3]);
                self.WriteLineByType(ctx, 5, 12);
                $("#description_" + self.propertyid).html("双点划线");
                break;
            default:
                break;
        }
    },

    //绘制直线
    WriteLineByType: function (ctx, x, y) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(ctx.canvas.width - 5, y);
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    },

    //空
    WriteNoneLine: function (cvsid) {
        cvs = document.getElementById(cvsid);
        ctx = cvs.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    //初始化
    //selectDivId为线型选择控件的divid
    //propertyid确定多控件的唯一性
    Init: function (selectDivId, propertyid) {
        this.propertyid = propertyid;
        var width = $("#" + selectDivId).width();
        var height = $("#" + selectDivId).height();
        var selectCanvasWidth = width * 0.6;
        var s = '<div id="previewPanel_' + this.propertyid + '" style="border:1px solid #95B8E7; height:'+ (height+2) +'px; border-radius:4px;" tabindex="1">'
            + '<div id="previewCanvas_' + this.propertyid + '" style="float: left; width: 60%; height:'+ height +'px; line-height:' + height + 'px">'
            + '<canvas id="preview_' + this.propertyid + '" width="'+ selectCanvasWidth +'px" height="'+ height +'px" ></canvas>'
            + '</div><div id="description_' + this.propertyid + '" style="float: right; width: 40%; height:'+ height +'px; line-height:'+ height +'px;"></div>'
            + '</div><div id="selPanel_' + this.propertyid + '" class="selPanel" style="display:none;width:'+ (width-2) +'px; border:1px solid #95B8E7; background-color: #fff; line-height:15px; position:fixed;z-index:9999" tabindex="2">'
            + '<ul style="padding:0px 0px 5px 0px; "><li id="1" tabindex="3" style="list-style-type: none; height: 15px;"><canvas id="cvs_linestyle1_' + this.propertyid + '" width="'+ (width-2) +'px" height="15px" tabindex="4">'
            + '</canvas></li><li id="2" tabindex="5" style="list-style-type: none; height: 15px;"><canvas id="cvs_linestyle2_' + this.propertyid + '" width="'+ (width-2) +'px" height="15px" tabindex="6">'
            + '</canvas></li><li id="3" style="list-style-type: none; height: 15px;"><canvas id="cvs_linestyle3_' + this.propertyid + '" width="'+ (width-2) +'px" height="15px" tabindex="7"></canvas></li>'
            + '<li id="4" style="list-style-type: none; height: 15px;"><canvas id="cvs_linestyle4_' + this.propertyid + '" width="'+ (width-2) +'px" height="15px" tabindex="8"></canvas></li>'
            + '<li id="5" style="list-style-type: none; height: 15px;"><canvas id="cvs_linestyle5_' + this.propertyid + '" width="'+ (width-2) +'px" height="15px" tabindex="8"></canvas></li>'
            + '</ul></div>';
        $("#" + selectDivId).html(s);

        var self = this;
        self.divPreview = $("#" + selectDivId + " div:first");
        self.divCanvas = $("#selPanel_" + this.propertyid);
        var previewCanvas = $("#" + selectDivId + " div:first canvas");
        var panelDivId = self.divCanvas.attr("id");

        //绘制各种线型
        $("#" + panelDivId + " canvas").each(function () {
            self.WriteLine($(this).attr("id"), self);
        });

        //为li添加获取焦点、失去焦点以及点击事件
        $("#" + panelDivId + " li").each(function () {
            $(this).click(function () {
                self.WritePreviewLine("cvs_linestyle" + $(this).attr("id") + "_" + self.propertyid, previewCanvas.attr("id"), self);
                document.getElementById(panelDivId).style.display = "dnone";
                var key = selectDivId.split("_")[1];
                self.SelecteChanged({"key": key, "value": parseInt($(this).attr("id")) - 1});
            });
            //鼠标悬浮在li上出现边框
            $(this).mouseover(function () {
                $(this).addClass("liBorder");
            });
            //鼠标离开li边框消失
            $(this).mouseout(function () {
                $(this).removeClass("liBorder");
            });
        });

        //控件层失去焦点隐藏下拉层
        $(document).click(function () {
            $("#" + panelDivId).css("display", "none");
        })

        //为文本框添加点击事件
        if (self.divPreview) {
            self.divPreview.click(function (event) {
                self.divCanvas.toggle('1000');
                //阻止事件冒泡
                event.stopPropagation();
            });
        }

        //为层添加失去焦点事件
        if (self.divCanvas) {
            self.divCanvas.blur(function () {
                document.getElementById(panelDivId).style.display = "none";
            });
        }
    }
}

LineStyleSelect.SelecteChanged = function (event) {

}