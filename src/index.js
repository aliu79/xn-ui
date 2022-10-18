
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

import Utils from 'xn-ui/src/utils/index'
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
    XnExport
]
const version = require('../package.json').version

const install = function (Vue) {
    console.log(Vue.prototype);
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

}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version,
    install,
    XnDialog,
    XnTable,
    XnPage,
    XnSearch,
    XnCity,
    XnTip
}