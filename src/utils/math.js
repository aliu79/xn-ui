import { Decimal } from "decimal.js";
/*
方式一
    @params 0 array 要计算的数组
    @params 1 string 需要计算的key
    return number 最终结果
方式二
    @params number/string 需要计算的数值
    return number 最终结果
*/
class Math {
    constructor(type) {
        this.type = type
    }
    result(...args) {
        if (!args) {
            throw new Error('error arguments')
        }
        if (Array.isArray(args[0]) && args[1]) {
            if (!args[0].length) return 0
            const list = args[0]
            const fieldKey = args[1]
            return list.map(item => item[fieldKey]).reduce((pre, cur) => {
                let val = new Decimal(pre)
                return val[this.type](new Decimal(cur || 0)).toNumber()
            })
        } else {
            return args.reduce((pre, cur) => {
                console.log('pre, cur: ', pre, cur);
                return new Decimal(pre || 0)[this.type](new Decimal(cur || 0)).toNumber()
            })
        }
    }
}

// 加法  (1,2,3) = 6
const add = function (...args) {
    console.log('..args: ', {...args});
    return new Math('add').result(...args)
}
// 减法 
const sub = function (...args) {
    return new Math('sub').result(...args)
}

const mul = function (...args) {
    return new Math('mul').result(...args)
}
const div = function (...args) {
    return new Math('div').result(...args)
}

export default {
    add,
    sub,
    mul,
    div,
    D: Decimal
}