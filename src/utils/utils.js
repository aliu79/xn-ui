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
const isImg = (file) => {
  const { url } = file
  if (typeof url !== 'string' || !url) return
  var strFilter = '.jpeg|.gif|.jpg|.png|.bmp|.pic|.svg|'
  if (file.imgFlag) return true
  if (url.indexOf('.') > -1) {
    var p = url.lastIndexOf('.')
    var strPostfix = url.substring(p, url.length) + '|'
    strPostfix = strPostfix.toLowerCase()
    if (strFilter.indexOf(strPostfix) > -1) {
      return true
    }
  }
  return false
}
/**
 * 判断文件类型
 * @param {*} file 
 * @returns 
 */
const isAV = (file) => {
  const { url } = file
  if (typeof url !== 'string' || !url) return
  var strFilter = '.mp4|.avi|.wmv|.MP4|.AVI|.WMV'
  if (url.indexOf('.') > -1) {
    var p = url.lastIndexOf('.')
    var strPostfix = url.substring(p, url.length) + '|'
    strPostfix = strPostfix.toLowerCase()
    if (strFilter.indexOf(strPostfix) > -1) {
      return true
    }
  }
  return false
}
const checkFile = (fileValue) =>{
  var index = fileValue.lastIndexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
  const fileValueSuffix = fileValue.substring(index); //截断"."之前的，得到后缀
      if (/(.*)\.(mp4|avi|wmv|MP4|AVI|WMV)$/.test(fileValueSuffix)) { //根据后缀，判断是否符合视频格式
          return 'video';
      }else  if(/(.*)\.(jpg|JPG|bmp|BMP|mpg|MPG|mpeg|MPEG|tis|TIS)$/.test(fileValueSuffix)) { //根据后缀，判断是否符合图片格式
          return 'image';
      }else if (/(.*)\.(xls|XLS|xlsx|XLSX|doc|DOC|docx|DOCX|pdf|PDF|PPT|PPTX|ppt|pptx)$/.test(fileValueSuffix)) { //根据后缀，判断是否符合OFFICE格式
          return 'office';
      }
  return false;
}

/**
 * 深拷贝
 * @param {*} source 
 * @returns 
 */
const deepClone = (source) => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 
 * @param {object} params 
 * @param {string} name 文件名 
 * @param {string} url 文件地址
 * @returns 
 */
const download = (params = { name: '', url: '' }) => {
  if(!params.url) return

  let { url, name } = params
  name = name ? name : getFileNameFromUrl(params.url)
  const x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = "blob";
  x.onload = function () {
    const _url = window.URL.createObjectURL(x.response);
    const elt = document.createElement("a");
    elt.setAttribute("href", _url);
    elt.setAttribute("download", name);
    elt.style.display = "none";
    elt.target = "_blank";
    document.body.appendChild(elt);
    elt.click();
    document.body.removeChild(elt);
  };
  x.send();
}

/**
 * 从url中获取文件名
 * @param {string} url
 * @returns {string} filename
 * @example
 * getFileNameFromUrl('http://www.baidu.com/abc/def/123.jpg') // 123.jpg  
 * getFileNameFromUrl('http://www.baidu.com/abc/def/') // def
 */
const getFileNameFromUrl = function(url){
  var parsedUrl = new URL(url);
  var pathname = parsedUrl.pathname;
  var pathComponents = pathname.split('/');
  var filename = pathComponents[pathComponents.length - 1];
  return decodeURIComponent(filename);
}

/**
 * 根据某个key 对数组去重合并
 * @param {array} arr 需要合并的数组
 * @param {string} key 传入要合并的key
 * @return {array} result
 */
const arrMerge = (arr = [], key = '') => {
  if (!key) {
    throw new Error('error arguments: key is required')
  }
  if (!arr.length) return
  var map = {}; var result = []

  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i]
    if (!map[ai[key]]) {
      result.push({
        [key]: ai[key],
        children: [ai]
      })
      map[ai[key]] = ai
    } else {
      for (var j = 0; j < result.length; j++) {
        var dj = result[j]
        if (dj[key] === ai[key]) {
          dj.children.push(ai)
          break
        }
      }
    }
  }
  return result
}
// 判空
const isBlank = (str) => {
  if (str === null || (!str && str !== 0)) {
      return true
  }
  return false
}
/* 重置方法 */
const reset = (obj) => {
  for (const key in obj) {
      if (Array.isArray(obj[key])) {
          obj[key] = []
      } else if (typeof obj[key] === 'object') {
          obj[key] = reset(obj[key])
      } else {
          obj[key] = ''
      }
  }
  return obj
}

export const toCamelCase = (string)=> {
  var words = string.split('-'); // 步1
  var camelCaseWords = [words[0]];
  
  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1); // 步骤2
    camelCaseWords.push(capitalizedWord);
  }
  
  var camelCaseString = camelCaseWords.join(''); // 步骤3
  return camelCaseString;
}

export function assignValues(form, apiResponse) {
  function isEmpty(value) {
    return (
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    )
  }

  const updatedForm = Array.isArray(form) ? [...form] : { ...form }

  for (const key in form) {
    if (Object.hasOwnProperty.call(form, key)) {
      const apiValue = apiResponse[key]

      // 检查 apiValue 是否是一个对象，如果是，则递归
      if (typeof apiValue === 'object' && apiValue !== null && !Array.isArray(apiValue)) {
        updatedForm[key] = assignValues(form[key], apiValue)
      } else if (apiValue !== null && apiValue !== undefined && apiValue !== '' && !isEmpty(apiValue)) {
        // 如果 apiValue 不是空值及不是空的对象或数组，更新 updatedForm
        updatedForm[key] = apiValue
      }
    }
  }

  return updatedForm
}
export default {
  isEmpty,
  isImg,
  deepClone,
  download,
  arrMerge,
  reset,
  isBlank,
  toCamelCase,
  checkFile,
  isAV,
  assignValues
}