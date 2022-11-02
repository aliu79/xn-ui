

const path = require('path');//引入path模块
function resolve(dir) {
    return path.resolve(__dirname, dir)//path.join(__dirname)设置绝对路径
}
const CopyWebpackPlugin = require('copy-webpack-plugin');




const IS_PLAY = !!process.env.PLAY_ENV


module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/xn-ui/" : "./",
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
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

    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.symlinks(false)
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('xn-ui', resolve('./'))
            .set('packages', resolve('./packages'))
            .set('examples', resolve('./examples'))
            .set('lib', resolve('./lib'))
            .end()
        config.module
            .rule('eslint')
            .exclude.add(path.resolve('lib'))
            .end()
            .exclude.add(path.resolve('examples/docs'))
            .end();
        config.module
            .rule('js')
            .include
            .add(resolve('./packages'))
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')
    },
    configureWebpack: config => {
        config.plugins.push(
            new CopyWebpackPlugin([
                {
                    from: '/packages/style/lib',
                    to: '/lib/style'
                }
            ])
        )

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
