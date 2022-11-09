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
  // x.responseType = 'blob'
  // x.responseType = 'blob'
  x.onprogress = function () {
  }
  x.onload = function () {
    var _url = ''
    try {
      _url = window.URL.createObjectURL(x.response)
    } catch (error) {
      _url = url
    }
    var a = document.createElement('a')
    a.href = _url
    a.target = '_blank'
    a.download = name
    a.click()
  }
  x.send()
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
  if(!arr.length) return
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
export default {
  isEmpty,
  isImg,
  deepClone,
  download,
  arrMerge
}