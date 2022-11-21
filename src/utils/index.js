
import reg from './reg'
import format from './format'
import dayjs from './dayjs'
import storage from './storage'
import utils from './utils'
import lodash from 'lodash'
import math from './math'
const version = () => {
    return `xianniu-utils@${require('./package.json').version}`
}

export default {
    version,
    $reg: reg,
    $format: format,
    $dayjs: dayjs,
    $lodash: lodash,
    $storage: storage,
    $utils: utils,
    $math: math
}