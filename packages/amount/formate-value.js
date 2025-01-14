// 根据间隔规则格式化值
export function formatValueByGapRule(gapRule, value, gap = ' ', range, isAdd = 1) {
    const arr = value ? value.split('') : [] // 将值转换为字符数组
    let showValue = '' // 格式化后的值
    const rule = [] // 间隔规则数组
    gapRule.split('|').some((n, j) => {
        rule[j] = +n + (rule[j - 1] ? +rule[j - 1] : 0) // 计算间隔位置
    })
    let j = 0
    arr.some((n, i) => {
        // 移除多余部分
        if (i > rule[rule.length - 1] - 1) {
            return
        }
        if (i > 0 && i === rule[j]) {
            showValue = showValue + gap + n // 添加间隔符
            j++
        } else {
            showValue = showValue + '' + n
        }
    })
    let adapt = 0
    rule.some((n, j) => {
        if (range === +n + 1 + j) {
            adapt = 1 * isAdd // 调整光标位置
        }
    })
    range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
    return { value: showValue, range: range } // 返回格式化后的值和光标位置
}

// 根据步长格式化值
export function formatValueByGapStep(step, value, gap = ' ', direction = 'right', range, isAdd = 1, oldValue = '') {
    if (value.length === 0) {
        return { value, range }
    }

    const arr = value && value.split('')
    let _range = range
    let showValue = ''

    if (direction === 'right') {
        for (let j = arr.length - 1, k = 0; j >= 0; j--, k++) {
            const m = arr[j]
            showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue // 从右向左添加间隔符
        }
        if (isAdd === 1) {
            // 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
            if (oldValue.length - showValue.length === -2) {
                _range = range + 1
            }
        } else {
            // 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
            if (oldValue.length - showValue.length === 2) {
                _range = range - 1
            }
            // 删除到最开始，range 保持 0
            if (_range <= 0) {
                _range = 0
            }
        }
    } else {
        arr.some((n, i) => {
            showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n // 从左向右添加间隔符
        })
        const adapt = range % (step + 1) === 0 ? 1 * isAdd : 0
        _range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
    }

    return { value: showValue, range: _range } // 返回格式化后的值和光标位置
}

// 去除值中的间隔符
export function trimValue(value, gap = ' ') {
    value = typeof value === 'undefined' ? '' : value
    const reg = new RegExp(gap, 'g')
    value = value.toString().replace(reg, '') // 去除所有间隔符
    return value
}
