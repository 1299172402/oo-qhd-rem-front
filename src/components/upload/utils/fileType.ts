// W3C标准和文件后缀的映射
const fileTypeMap = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/ms-excel": "xls",
  "application/zip": "zip"
};

// 文件后缀和W3C标准的映射-反转
const fileTypeReverseMap = {};
Object.keys(fileTypeMap).forEach(key => {
  fileTypeReverseMap[fileTypeMap[key]] = key;
});

const imgTypeArr = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

export {
  fileTypeReverseMap,
  fileTypeMap,
  imgTypeArr
};