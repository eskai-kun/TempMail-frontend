const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

//minify css settings
const minify_attr = {
removeComments: true,
collapseWhitespace: true,
removeRedundantAttributes: true,
useShortDoctype: true,
removeEmptyAttributes: true,
removeStyleLinkTypeAttributes: true,
keepClosingSlash: true,
minifyJS: true,
minifyCSS: true,
minifyURLs: true,
};



module.exports = (env) => {
  const plugins = [
    new Dotenv(),
    new ExtractTextPlugin("assets/css/[name].[hash].css"),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
      }),
    new HtmlWebpackPlugin({
            hash: false,
            inject: true,
            chunks:['app'],
            template: './src/html/index.default.html',
            filename: 'html/index.html',
            minify: minify_attr
        }),
  ]

  if (env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin(['dist'], {root: __dirname})
    )

  }

  return {

    entry: {
      "app": path.resolve(__dirname, 'app.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[hash].js',
      publicPath: "./",
      chunkFilename: 'assets/js/[id].[chunkhash].js',
    },
    devServer: {
      port: 9001,
    },
    module: {
      rules: [
        {
          // test: que tipo de archivo quiero reconocer,
          // use: que loader se va a encargar del archivo
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            },
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                }
              }
            ]
          })
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  // modules:{
                  //   minifyNames: true
                  // },
                  minimize: true,
                  // localIdentName: '[sha1:hash:hex:6]'
                }
              },
              {
                loader: "stylus-loader",
                options:{
                  use: [
                    require('nib'),
                    require('rupture')
                  ],
                  import: [
                    '~nib/lib/nib/index.styl',
                   '~rupture/rupture/index.styl']
                }
              },
            ]
          })
        },
        {
          test: /\.(jpg|png|gif|svg|webp|ico)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]',
            }
          }
        },
      ]
    },
    plugins
  }
}