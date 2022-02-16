/**
 * 判断各种值是否为空
 * @param {*} val 
 * @returns Boolean
 */
const isEmpty = function (val) {
    if (val) {
        if (val instanceof Array) {
            return val.length == 0;
        }
        if (val instanceof Object) {
            return Object.keys(val).length == 0;
        }
        return false;
    }
    return true
}
/**
 * 判断是否是图片格式
 */
 const isImg = (filePath) => {
    if (typeof filePath !== 'string' || !filePath) return
    var strFilter = '.jpeg|.gif|.jpg|.png|.bmp|.pic|.svg|'
    if (filePath.indexOf('.') > -1) {
      var p = filePath.lastIndexOf('.')
      var strPostfix = filePath.substring(p, filePath.length) + '|'
      strPostfix = strPostfix.toLowerCase()
      if (strFilter.indexOf(strPostfix) > -1) {
        return true
      }
    }
    return false
  }
export default {
    isEmpty,
    isImg
}