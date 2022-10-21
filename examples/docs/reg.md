## 一些常用的校验



``` js
this.$reg.checkPhone // 校验手机号
this.$reg.checkPwd // 8-20位的字母和数字
this.$reg.checkNumber // 校验数字类型
this.$reg.checkTel //座机号码
this.$reg.checkEmail // 邮箱
this.$reg.checkFullName //中文、英文、数字包括下划线
this.$reg.positiveInteger // 正整数
this.$reg.twoDecimal // 2位小数
this.$reg.text // 不含特殊字符和标点
```

``` js
// 例如：el-form下的rules

rules:[
    {
        required: true,
        message: '请输入正确手机号',
        pattern: this.$reg.checkPhone,
        trigger: ['blur', 'change']
    }
]
```