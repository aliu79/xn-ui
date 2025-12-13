

const path = require('path');//引入path模块
function resolve(dir) {
    return path.resolve(__dirname, dir)//path.join(__dirname)设置绝对路径
}
// const CopyWebpackPlugin = require('copy-webpack-plugin');




const IS_PLAY = !!process.env.PLAY_ENV
const IS_DEPLOY = !!process.env.DEPLOY_ENV
const IS_LIB = process.argv.includes('--target') && process.argv.includes('lib')


module.exports = {
    publicPath: IS_DEPLOY ? "/xn-ui/" : "./",
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
            .set('element-ui', resolve('./node_modules/@liuzengwei/element-ui'))
            .set('element-ui/src', '@liuzengwei/element-ui/lib')
            .set('@liuzengwei/element-ui/src', '@liuzengwei/element-ui/lib')
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
        // config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')
        config
      .when(process.env.NODE_ENV !== 'development',
        config => {
        //   config
        //     .plugin('ScriptExtHtmlWebpackPlugin')
        //     .after('html')
        //     .use('script-ext-html-webpack-plugin', [{
        //       // `runtime` must same as runtimeChunk name. default is `runtime`
        //       inline: /runtime\..*\.js$/
        //     }])
        //     .end()
        config.optimization.minimize(true);
          config
            .optimization.splitChunks({
              chunks: 'async',
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
        //   config.optimization.runtimeChunk('single')
        }
      )
    // config.resolve.symlinks(true)
    },
    configureWebpack: config => {

        if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
            config.mode = 'production';
            config["performance"] = {//打包文件大小配置
              "maxEntrypointSize": 10000000,
              "maxAssetSize": 30000000
            }
            
            // 库构建或 GitHub Pages 部署时排除核心框架依赖，通过 CDN 加载
            // 本地构建（npm run build）时不使用 externals，直接打包所有依赖
            if (IS_LIB || IS_DEPLOY) {
              config.externals = {
                vue: {
                  commonjs: 'vue',
                  commonjs2: 'vue',
                  amd: 'vue',
                  root: 'Vue'
                },
                '@liuzengwei/element-ui': {
                  commonjs: '@liuzengwei/element-ui',
                  commonjs2: '@liuzengwei/element-ui',
                  amd: '@liuzengwei/element-ui',
                  root: 'ELEMENT'
                },
                'vue-router': {
                  commonjs: 'vue-router',
                  commonjs2: 'vue-router',
                  amd: 'vue-router',
                  root: 'VueRouter'
                },
                'vuex': {
                  commonjs: 'vuex',
                  commonjs2: 'vuex',
                  amd: 'vuex',
                  root: 'Vuex'
                }
              }
            }
          }
          
        // 不在这里复制样式文件，而是在 build:lib 命令中使用 cp-cli
        // config.plugins.push(
        //     new CopyWebpackPlugin([
        //         {
        //             from: '/packages/style/lib',
        //             to: '/lib/style'
        //         }
        //     ])
        // )

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
