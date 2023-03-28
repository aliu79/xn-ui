
import XnDialog from '../packages/dialog/index'
import XnTable from '../packages/table/index'
import XnPage from '../packages/page/index'
import XnSearch from '../packages/search/index'
import XnDate from '../packages/date/index'
import XnUpload from '../packages/upload/index'
import XnCity from '../packages/city/index'
import XnTip from '../packages/tip/index'
import XnDrawer from '../packages/drawer/index'
import XnTree from '../packages/tree/index'
import XnImport from '../packages/import/index'
import XnExport from '../packages/export/index'
import XnFooter from '../packages/footer/index'
import XnEmpty from '../packages/empty/index'
import XnTag from '../packages/tag/index'
import XnEllipsis from '../packages/ellipsis/index'

import Utils from 'xn-ui/src/utils/index'
const doc = 'http://lzwr.gitee.io/xn-ui/#/'
const components = [
    XnDialog,
    XnTable,
    XnPage,
    XnSearch,
    XnDate,
    XnUpload,
    XnCity,
    XnTip,
    XnDrawer,
    XnTree,
    XnImport,
    XnExport,
    XnFooter,
    XnEmpty,
    XnTag,
    XnEllipsis
]
const version = require('../package.json').version
const install = function (Vue) {
    if (install.installed) return
    if (!Vue.prototype.$ELEMENT) throw new Error('缺失 element-ui，请进行安装')
    install.installed = true
    components.map(component => {
        Vue.component(component.name, component)
    })

    Vue.prototype.$XN = {
        uploadUrl: ''
    }
    Vue.prototype.$utils = Utils.$utils
    Vue.prototype.$reg = Utils.$reg
    Vue.prototype.$format = Utils.$format
    Vue.prototype.$dayjs = Utils.$dayjs
    Vue.prototype.$storage = Utils.$storage
    Vue.prototype.$lodash = Utils.$lodash
    Vue.prototype.$math = Utils.$math

}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version,
    doc,
    install,
    XnDialog,
    XnTable,
    XnPage,
    XnSearch,
    XnDate,
    XnUpload,
    XnCity,
    XnTip,
    XnDrawer,
    XnTree,
    XnImport,
    XnExport,
    XnFooter,
    XnEmpty,
    XnTag,
    XnEllipsis
}