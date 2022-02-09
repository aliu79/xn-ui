
const Reg = {
    checkPhone: /^1(3|4|5|6|7|8|9)\d{9}$/, // 校验手机号
    checkPwd: /^[0-9A-Za-z]{8,20}$/, // 8-20位的字母和数字
    checkNumber: /^[+-]?(0|([1-9]\d*))(?:\.\d{1,2})?$/g // 校验数字类型
}

export default Reg