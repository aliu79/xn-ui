import { Message } from 'element-ui'
/* eslint-disable */
const SUFFIX = /.+(\.\w+)$/,
    TIMEOUT = 60000,
    BYTE = 1024,
    RETRY_COUNT_MAX = 3,
    ACCEPT = {
        zip: 'application/zip,application/x-zip,application/x-zip-compressed',
        pdf: 'application/pdf',
        excel: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        image: 'image/jpeg,image/bmp,image/png,image/gif',
    },
    getAccepts = accept => (Array.isArray(accept) ? accept : [accept]).map(ac => ACCEPT[ac]).join(','),
    beforeCheck = (config, file) => {

        let { max = Number.MAX_VALUE, accept = [] } = config || {}, { size, type } = file, accepts = getAccepts(accept).split(',');

        //大小限制(M)
        if (Math.pow(BYTE, 2) * max < size) {
            Message.warning(`文件不能超过${max}M`);
            return false;
        }
    };
// const imageViewer = {
//     render: function (h, ctx) {
//         console.log('ctx', ctx);
//         return h('span', 222 )
//     }
// }
export default {
    name: 'XnUpload',
    functional: true,
    props: { config: Object, limit: Number, percentage: Function },
    render: function (h, ctx) {
        let { props, data: attrs, children = [] } = ctx,
         { config, limit } = props, 
         { accept } = config;
        if (!attrs.attrs.accept && accept) {
            attrs.attrs.accept = getAccepts(accept);
        }
        console.log(ctx);
        Object.assign(props, {
            action: attrs.action || 'https://gatewaydev.xianniu.cn/tp/upload/uploadFile',
            beforeUpload: file => beforeCheck(config, file),
            onExceed: () => Message.warning(`最多可以上传${limit}个文件`),
        })
        return h('el-upload', { props, ...attrs }, [...children || [], h('span', {
            class: 'el-icon-plus',
            style: {
            },
        })])
    }
}
