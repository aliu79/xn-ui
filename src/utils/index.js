
import reg from './reg'
import format from './format'
import dayjs from './dayjs'
import storage from './storage'
import utils from './utils'
import lodash from 'lodash'
const version = () => {
    return `xianniu-tools@${require('./package.json').version}`
}
if (process.env.VUE_APP_CURRENTMODE && process.env.VUE_APP_CURRENTMODE === 'dev') {
    console.log("文档：http://lzwr.gitee.io/xn-ui/#/");
}
export default {
    version,
    $reg: reg,
    $format: format,
    $dayjs: dayjs,
    $lodash: lodash,
    $storage: storage,
    $utils: utils
}