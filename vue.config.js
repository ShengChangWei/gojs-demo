const webpack = require('webpack')
const path = require('path')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const configureWebpack = {
  optimization: {
    minimizer: []
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./public/vendor/vendor-manifest.json')
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.resolve(__dirname, './public/vendor/*.js'),
      // dll 引用路径
      publicPath: './vendor',
      // dll最终输出的目录
      outputPath: './vendor'
    }),
    new BundleAnalyzerPlugin()
  ]
}

if (isProd) {
  configureWebpack.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
  );
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: false,
  configureWebpack: configureWebpack,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.8:6389',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
