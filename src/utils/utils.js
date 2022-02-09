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
export default {
    isEmpty
}