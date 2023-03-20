import FileSaver from 'file-saver'
// import XLSX from '@/utils/oilDeposit/xlsx/dist/xlsx.js'

/**
 *  hwh
 *  导出表格数据为csv文件
 * @param tableId  表格id 使用时需要加 ’#‘号
 * @param fileName 导出文件名称
 * @returns {any}
 */
function exportExcel (tableId,fileName) {
  // 使表格中数据原样输出
  const xlsxParam = { raw: true };
  const fix = document.querySelector('.el-table__fixed');
  let wb;
  if(fix){
    wb = XLSX.utils.table_to_book(document.querySelector(tableId).removeChild(fix),xlsxParam);
    document.querySelector(tableId).appendChild(fix);
  }else{
    wb = XLSX.utils.table_to_book(document.querySelector(tableId),xlsxParam) // 这个id是表格的id
  }
  const wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
  try {
    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.csv`)
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}

/**
 * hwh
 * 根据json数据导出文件内容
 * @param jsonData json数据 需要默认第一行绑定表头
 * @param fileName 导出文件名称
 */
function exportExcelFromJson(jsonData,fileName) {
  const wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'array'
  }
  const workBook = {
    SheetNames: ['Sheet1'],
    Sheets: {},
    Props: {}
  }
  const workSheet = XLSX.utils.json_to_sheet(jsonData,{skipHeader: true});
  workBook.Sheets.Sheet1 = workSheet;
  const wbout = XLSX.write(workBook,wopts);
  try {
    FileSaver.saveAs(new Blob([wbout],{type: 'application/octet-stream'}),`${fileName}.xlsx`)
  } catch (e) {
    if(typeof console !== 'undefined') console.log(e,wbout);
  }
}
function exportComplexHeaderExcelFromJson(headers, merges, jsonData,fileName) {

  const ref = 'A1:Z600';
  const output = { ...headers, ...jsonData};
  const wb = {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: { ...output,  '!ref': ref, '!merges': merges}
    }
  };
  const wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'array'
  }
  const wbout = XLSX.write(wb,wopts);
  try {
    FileSaver.saveAs(new Blob([wbout],{type: 'application/octet-stream'}),`${fileName}.xlsx`)
  } catch (e) {
    if(typeof console !== 'undefined') console.log(e,wbout);
  }
  // XLSX.writeFile(wb, fileName+'.xlsx')
}

export {
  exportExcel,
  exportExcelFromJson,
  exportComplexHeaderExcelFromJson,
}