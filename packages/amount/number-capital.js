// 中文数字
const cnNums = ['\u96f6', '\u58f9', '\u8d30', '\u53c1', '\u8086', '\u4f0d', '\u9646', '\u67d2', '\u634c', '\u7396']

// 整数部分的单位
const cnIntRadice = ['', '\u62fe', '\u4f70', '\u4edf']

// 整数部分的进位单位
const cnIntUnits = ['', '\u4e07', '\u4ebf', '兆']

// 小数部分的单位
const cnDecUnits = ['\u89d2', '\u5206', '\u5398', '\u6beb']

// 整数部分的结尾字符
const cnInteger = '\u6574' // 整

// 整数部分的货币单位
const cnIntLast = '\u5143' // 元

// 负数的符号
const cnNegative = '\u8d1f' // 负

// 最大处理的数字
const maxNum = 999999999999999.9999

// 将数字转换为中文大写金额的函数
export default function(number) {
  let negative // 负数标志
  let integerNum // 整数部分
  let decimalNum // 小数部分
  let capitalStr = '' // 中文大写金额字符串

  let parts // 数字的整数和小数部分

  /* istanbul ignore if  */
  if (number === '') {
    return ''
  }

  number = parseFloat(number) // 将输入转换为浮点数

  if (number < 0) {
    negative = true // 如果是负数，设置负数标志
    number = Math.abs(number) // 取绝对值
  }

  /* istanbul ignore if  */
  if (number >= maxNum) {
    return ''
  }

  /* istanbul ignore if  */
  if (number === 0) {
    capitalStr = cnNums[0] + cnIntLast + cnInteger // 如果数字为0，直接返回“零元整”
    return capitalStr
  }

  // 将数字转换为字符串
  number += ''

  if (number.indexOf('.') === -1) {
    integerNum = number // 如果没有小数点，整数部分为整个数字
    decimalNum = '' // 小数部分为空
  } else {
    parts = number.split('.') // 分割整数和小数部分
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4) // 取小数部分的前四位
  }

  // 转换整数部分
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0 // 连续零的计数器
    for (let i = 0, IntLen = integerNum.length; i < IntLen; i++) {
      const n = integerNum.substr(i, 1) // 当前位的数字
      const p = IntLen - i - 1 // 当前位的权重
      const q = p / 4 // 当前位的进位单位
      const m = p % 4 // 当前位的单位
      if (n === '0') {
        zeroCount++ // 如果当前位是零，增加零计数器
      } else {
        if (zeroCount > 0) {
          capitalStr += cnNums[0] // 如果有连续的零，添加一个零
        }
        zeroCount = 0 // 重置零计数器
        capitalStr += cnNums[parseInt(n)] + cnIntRadice[m] // 添加当前位的中文数字和单位
      }
      if (m === 0 && zeroCount < 4) {
        capitalStr += cnIntUnits[q] // 添加进位单位
      }
    }
    capitalStr += cnIntLast // 添加货币单位
  }

  // 转换小数部分
  if (decimalNum !== '') {
    for (let i = 0, decLen = decimalNum.length; i < decLen; i++) {
      const n = decimalNum.substr(i, 1) // 当前位的小数
      if (n !== '0') {
        capitalStr += cnNums[Number(n)] + cnDecUnits[i] // 添加当前位的小数的中文数字和单位
      }
    }
  }

  /* istanbul ignore if  */
  if (capitalStr === '') {
    capitalStr += cnNums[0] + cnIntLast + cnInteger // 如果没有任何转换结果，返回“零元整”
  } else if (decimalNum === '') {
    capitalStr += cnInteger // 如果没有小数部分，添加“整”
  }

  if (negative) {
    capitalStr = `${cnNegative}${capitalStr}` // 如果是负数，添加负号
  }
  return capitalStr // 返回中文大写金额字符串
}
