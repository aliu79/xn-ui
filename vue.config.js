
const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

const IS_PLAY= !!process.env.PLAY_ENV
module.exports = {
    // 将 examples 目录添加为新的页面
    pages: {
        index: {
            // page 的入口
            entry: IS_PLAY ? 'examples/play.js' : 'examples/main.js',
            // 模板来源
            template: 'public/index.html',
            // 输出文件名
            filename: 'index.html'
        }
    },
//     packages: path.resolve(__dirname, '../packages'),
//   examples: path.resolve(__dirname, '../examples'),
//   'element-ui': path.resolve(__dirname, '../')
    chainWebpack: (config) => {
        config.resolve.alias
            .set('xn-ui', resolve('./'))
            .set('packages', resolve('./packages'))
            .set('examples', resolve('./examples'))
            .end()

    },

    configureWebpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                },
                {
                    loader: path.resolve(__dirname, './build/md-loader/index.js'),
                },
            ]
        })
    }
}
