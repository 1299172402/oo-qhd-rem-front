/**
 * Created by 123 on 2016/11/21.
 */

baseUrl = "http://10.68.199.127:9999/";
baseConfigUrl = "D:\\WebGad\\07External\\WebComponent\\IsoFrameCom\\";
//成果树服务地址
treeDataServiceUrl = baseUrl+"WGADService/treeData.jsp";
//成果图保存服务地址
templateSaveActionUrl = baseUrl+"WGADService/templateSave.jsp";
//图元上传服务地址
uploadFileUrl = baseUrl+"WGADService/UploadFile";
//图片上传服务地址
imgSaveActionUrl = baseUrl+"WGADService/backImgUpload.jsp";
//成果树配置文件路径
treePath =  baseConfigUrl+"IsoFrameCom\\Config\\tree.json";
//图元配置文件路径
pelPath =  baseConfigUrl+"IsoFrameCom\\Config\\ObjSelectConfig.json";
//成果图保存路径
templateSaveDir = baseConfigUrl+"IsoFrameCom\\data\\result\\";
//图片保存路径
imgSavePath = baseConfigUrl+"IsoFrameCom\\images\\";



var proPath = "../PropertySetting/WGraphFramePro/";

saveText = "保存";    //确定按钮文字
cancleText = "取消";  //取消按钮文字
useText = "应用";     //应用按钮文字

publicControlJsonPath = "../../data/";                             //json数据文件相对路径
publicControlImgPath = "../../images/";                            //图片相对路径

var publicControlPath = "PropertySetting/WGraphControls/";    //公共控件相对路径
var publicControlGraphPath =  "PropertySetting/WGraphControls/";     //公共控件相对于图形页面的路径
var comFramePath = "../PropertySetting/WGraphFramePro/";