
import reg from './reg'
import format from './format'
import dayjs from './dayjs'
import storage from './storage'
import utils from './utils'
import lodash from 'lodash'
import math from './math'
const version = () => {
    return `xianniu-tools@${require('./package.json').version}`
}

export const $reg = reg
export const $format = format
export const $dayjs = dayjs
export const $storage = storage
export const $utils = utils
export const $lodash = lodash
export const $math = math

export default {
    version,
    $reg,
    $format,
    $dayjs,
    $lodash,
    $storage,
    $utils,
    $math
}