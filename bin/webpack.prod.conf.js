const path = require('path');
const webpack = require("webpack");
const {merge} = require("webpack-merge");
// 清除目录等
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpackConfigBase = require('./webpack.base.conf');
const minicss = require("mini-css-extract-plugin");
const webpackConfigProd = {
    mode: 'production', // 通过 mode 声明生产环境
    
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
        filename: 'js/[name].[hash].js',
        publicPath: '../'
    },
    
    devtool: 'cheap-module-source-map',
    
	plugins: [
		//删除dist目录
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
		})
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd);