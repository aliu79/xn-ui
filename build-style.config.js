const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './packages/style/src/index.scss'
  },
  output: {
    path: path.resolve(__dirname, 'packages/style/lib'),
    filename: '[name].js' // 这个文件会被忽略，我们只需要 CSS
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: ['ie > 9', 'last 2 versions']
                    }
                  ]
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  optimization: {
    minimize: true
  }
};
