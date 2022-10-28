import { Decimal } from "decimal.js";

// class Math {
//     result(...args){
//         if (Array.isArray(args[0])) {
//             if(!args[0].length) return 0
//             const list = args[0]
//             const fieldKey = args[1]
//             return list.map(item => item[fieldKey]).reduce((pre, cur) => {
//                 let val = new Decimal(pre)
//                 return val.add(new Decimal(cur)).toNumber()
//             })
//         } else {
//             return args.reduce((pre,cur)=>new Decimal(pre).add(new Decimal(cur)).toNumber())
//         }
//     }
// }
// new Math('').result()
// 加法  (1,2,3) = 6
const add = function (...args) {
    if (Array.isArray(args[0])) {
        if(!args[0].length) return 0
        const list = args[0]
        const fieldKey = args[1]
        return list.map(item => item[fieldKey]).reduce((pre, cur) => {
            let val = new Decimal(pre)
            return val.add(new Decimal(cur)).toNumber()
        })
    } else {
        return args.reduce((pre,cur)=>new Decimal(pre).add(new Decimal(cur)).toNumber())
    }
}
// 减法 
const sub = function (...args) {
    if (Array.isArray(args)) {
        if(!args.length) return 0
        const list = args[0]
        const fieldKey = args[1]
        return list.map(item => item[fieldKey]).reduce((pre, cur) => {
            let val = new Decimal(pre)
            return val.sub(new Decimal(cur)).toNumber()
        })
    } else {
        return args.reduce((pre,cur)=>new Decimal(pre).sub(new Decimal(cur)).toNumber())
    }
}

const mul = function (...args) {
    if (Array.isArray(args)) {
        if(!args.length) return 0
        const list = args[0]
        const fieldKey = args[1]
        return list.map(item => item[fieldKey]).reduce((pre, cur) => {
            let val = new Decimal(pre)
            return val.mul(new Decimal(cur)).toNumber()
        })
    } else {
        return args.reduce((pre,cur)=>new Decimal(pre).mul(new Decimal(cur)).toNumber())
    }
}
const div = function (...args) {
    if (Array.isArray(args)) {
        if(!args.length) return 0
        const list = args[0]
        const fieldKey = args[1]
        return list.map(item => item[fieldKey]).reduce((pre, cur) => {
            let val = new Decimal(pre)
            return val.div(new Decimal(cur)).toNumber()
        })
    } else {
        return args.reduce((pre,cur)=>new Decimal(pre).div(new Decimal(cur)).toNumber())
    }
}

export default {
    add,
    sub,
    mul,
    div,
    D: Decimal
}