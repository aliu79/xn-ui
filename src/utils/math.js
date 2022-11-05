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
                let val = new Decimal(pre - 0)
                return val[this.type](new Decimal(cur - 0)).toNumber()
            })
        } else {
            return args.reduce((pre, cur) => {
                return new Decimal(pre - 0)[this.type](new Decimal(cur - 0)).toNumber()
            })
        }
    }
    autoComputed(fields = [], fieldsRules = {}, field = '', value) {
        if (!fields.length || !Object.keys(fieldsRules).length) {
            throw new Error('error arguments: fields or fieldsRules')
        }
        const _fields = fields
        const _fieldsRules = fieldsRules
        const idx = _fields.indexOf(field)
        if (idx !== -1) {
            _fields.splice(idx, 1)
        }
        _fields.push(field)
        _fieldsRules[_fields[0]](value)
        return { fields: _fields, fieldsRules: _fieldsRules, field, value }
    }
}

// 加法  (1,2,3) = 6 or ([{a:1},{a:2}],'a') = 3
const add = function (...args) {
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
const autoComputed = function (fields = [], fieldsRules = {}, field = '', value) {
    return new Math().autoComputed(fields, fieldsRules, field, value)
}
export default {
    add,
    sub,
    mul,
    div,
    autoComputed,
    D: Decimal
}