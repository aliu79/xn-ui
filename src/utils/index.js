
import reg from './reg'
import format from './format'
import dayjs from './dayjs'
import storage from './storage'
import lodash from './lodash'
import utils from './utils'

const version = () => {
    return `xianniu-tools@${require('./package.json').version}`
}

export default {
    version,
    $reg: reg,
    $format: format,
    $dayjs: dayjs,
    $storage: storage,
    $lodash: lodash,
    $utils: utils
}