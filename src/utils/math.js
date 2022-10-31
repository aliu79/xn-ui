import { Decimal } from "decimal.js";

class Math {
    constructor(type) {
        this.type = type
    }
    result(...args) {
        if (!args) {
            throw new Error('error arguments')
        }
        if (Array.isArray(args[0])) {
            if (!args[0].length) return 0
            const list = args[0]
            const fieldKey = args[1]
            return list.map(item => item[fieldKey]).reduce((pre, cur) => {
                let val = new Decimal(pre)
                return val[this.type](new Decimal(cur)).toNumber()
            })
        } else {
            return args.reduce((pre, cur) => new Decimal(pre)[this.type](new Decimal(cur)).toNumber())
        }
    }
}

// 加法  (1,2,3) = 6
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

export default {
    add,
    sub,
    mul,
    div,
    D: Decimal
}