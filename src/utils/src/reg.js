
const Reg = {
  checkPhone: /^1(3|4|5|6|7|8|9)\d{9}$/, // 校验手机号
  checkPwd: /^[0-9A-Za-z]{8,20}$/, // 8-20位的字母和数字
  checkNumber: /^[+-]?(0|([1-9]\d*))(?:\.\d{1,2})?$/g, // 校验数字类型
  checkTel: /[0-9-()（）]{7,18}/, // 座机号码
  checkEmail: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, // 邮箱
  checkFullName: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, // 中文、英文、数字包括下划线
  positiveInteger: /^[1-9]\d*$/, // 正整数
  twoDecimal: /(^[0-9]{1,20}$)|(^[0-9]{1,20}[.][0-9]{1,2}$)/, // 2位小数
  text: /^[a-z\d\u4E00-\u9FA5]+$/i, // 不含特殊字符和标点
  getCity: /.+?(省|市|自治区|自治州|县|区)/g // 获取地址中的省市区[省,市,区]
}

export default Reg
