/**
 * hwh
 * Base64 下载
 * @param fileData
 * @param fileName
 */
function downFile(fileData,fileName) {
    let base=fileData;
    if(!base){
        return;
    }
    let wj= encodeURIComponent(base);
    wj=decodeURIComponent(wj);
    //把数据转为Blob文件
    var myBlob = dataURLtoBlob(wj);
    //生成地址
    var myUrl = URL.createObjectURL(myBlob);
    //下载文件
    downloadFile(myUrl,fileName);
}

function downFileList(fileDataList, fileName) {
    fileDataList.forEach((item, index) => {
        let base = item;
        if(!base){
            return;
        }
        let wj= encodeURIComponent(base);
        wj=decodeURIComponent(wj);
        //把数据转为Blob文件
        var myBlob = dataURLtoBlob(wj);
        //生成地址
        var myUrl = URL.createObjectURL(myBlob);
        //下载文件
        downloadFile(myUrl,fileName + "" + (index + 1));
    })
}

/**
 * hwh
 * 把数据流转换为Blob类型文件
 * @param dataurl
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

/**
 * hwh
 * 下载文件
 * @param url
 * @param name
 */
function downloadFile(url, name) {
    let a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", name)
    a.setAttribute("target", "_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}




export {
    downFile,
    downFileList,
}