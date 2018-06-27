var path = require('path');
var webpack = require('webpack');//使用plugin，要在项目下安装webpack
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;//返回一个类
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 入口文件路径
  entry : './src/js/index.js',
  // 输出文件配置，输出的目录和文件名
  output : {
    filename : 'bundle.js',
    path : path.resolve(__dirname, './dist')
  },
  /*loader模块——针对不同类型单文件（模块）进行处理*/
  module : {
    rules : [{
      test : /\.css$/,
      // use : ['style-loader','css-loader'],
      use : ExtractTextPlugin.extract({
        fallback: "style-loader",//编译后用什么loader来提取css文件
        use: "css-loader"//指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
      })
    }]
  },
  plugins : [
    // 使用压缩插件，new一个实例就可以了
    new UglifyJsPlugin(),
    // 加入 html 模板任务
    new HtmlWebpackPlugin({
      minify:{
        caseSensitive : false, //是否大小写敏感
        removeComments :  true, //去除注释
        removeEmptyAttributes : true, //去除空属性
        collapseWhitespace : true, //是否去除空格
        collapseBooleanAttributes: true //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
      },
      // 模板文件
      template: './src/index.html',
      // 打包后文件名称，会自动放到 output 指定的 dist 目录
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
          from: './src/images',//定义要拷贝的源目录
          to: './images'     //定义要拷贝到的目标目录
      }
    ]),
    new CleanWebpackPlugin(['dist']),//一个数组，数组的每一个元素为要删除的路径
    new ExtractTextPlugin('style.css')
  ]
}