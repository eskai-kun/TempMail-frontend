const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');



module.exports = {
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
            hash: false,
            inject: true,
            chunks:['app'],
            template: './src/html/index.default.html',
            filename: 'index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'async'
        }),
  ],

  entry: {
    "app": path.resolve(__dirname, './app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath:'/'
  },
  devServer: {
    port: 9001,
    host: '0.0.0.0',
    disableHostCheck: true,

    historyApiFallback:{
      rewrites: [
        { from: /^\/admin/, to: '/admin/' },
        { from: /^\//, to: '/' },
        { from: /./, to: '/views/404.html' }
      ]
    }


  },
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
      },
      {
        test: /\.css$/,
        use: [ "style-loader", 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [ "style-loader", 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(jpg|png|gif|svg|webp|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          }
        }
      },
    ]
  }
}
