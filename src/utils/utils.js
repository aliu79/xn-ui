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
 */
const download = (params = { name: '', url: '' }) => {
  const defaultParams = {
    url: '',
    name: '下载模板'
  }
  const _params = Object.assign(defaultParams, params)
  const { url, name } = _params
  var x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'blob'
  x.onload = function () {
    // 会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    var url = window.URL.createObjectURL(x.response)
    var a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
  }
  x.send()
}

export default {
  isEmpty,
  isImg,
  deepClone,
  download
}