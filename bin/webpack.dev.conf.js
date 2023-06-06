/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-29 21:56:10
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-05-29 23:01:50
 */
const path = require('path');
const {merge} = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
console.log('path.join', path.join(__dirname, 'src/assets'));
const webpackConfigDev = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: 'js/[name].bundle.js'
    },
    devtool: "eval-cheap-source-map",
    devServer: {
        port: 1000,
        hot: true,
        static: {
            directory: path.join(__dirname, 'src/assets'),
            publicPath:'/assets',
        },
        proxy: {
            "/": {
                target: "https://www.baidu.com/" // 本地服务
            }
        }
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);