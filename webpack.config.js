const path = require('path')
// const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const root = __dirname
const dist = path.resolve(root, 'dist')
const src = path.resolve(root, 'src')
const entry = path.resolve(src, 'index.tsx')
const outputFilename = 'main.js'
const htmlTemplate = path.resolve(src, 'index.html')

const { NODE_ENV, HMR } = process.env

const isProd = NODE_ENV === 'production'
const isHMR = HMR === 'true'

module.exports = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  entry: entry,
  output: {
    path: dist,
    filename: outputFilename,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: htmlTemplate }),
    isHMR && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    contentBase: dist,
    hot: isHMR,
  },
}
