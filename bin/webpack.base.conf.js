/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-28 15:55:17
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-05-30 17:48:32
 */
const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const minimizer = require("css-minimizer-webpack-plugin");
const htmlWebPackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const minicss = require("mini-css-extract-plugin");
const rules = require("./webpack.rules.conf.js");

// 获取pages下的所有包含js文件的文件夹作为入口打包
const getEntry = () => {
    const entry = {};
    glob.sync("./src/pages/**/*.js")
    .forEach(name => {
        name = name.replace(/\\/g,"/");
        let arr = [];
        let start = name.indexOf("src/") + 4,
        end = name.length - 3;
        let n = name.slice(start, end);
        n = n.slice(0, n.lastIndexOf("/"));
        n = n.replace("pages/", "");
        arr.push(`./${name}`);
        entry[n] = arr;
    })
    return entry;
}
const getHtmlConfig = (name, chunks) => {
    return {
        template: `./src/pages/${name.replace("\\","/")}/index.html`,
        filename: process.env.NODE_ENV === "development"? `${name.slice(name.lastIndexOf('/') + 1)}.html`:`html/${name.slice(name.lastIndexOf('/') + 1)}.html`,
        inject: true,
        hash: false,
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        },
    }
}
const entryObj = getEntry();
let htmlArr = Object.keys(entryObj).map(ele => (
    getHtmlConfig(ele, ["vendor", "common", ele])
))
module.exports = {
    entry: getEntry(),
    module: {
        rules: [...rules]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendorx', // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: { // 抽离自己写的公共代码，common这个名字可以随意起
                    chunks: 'initial',
                    name: 'common', // 任意命名
                    minSize: 0, // 只要超出0字节就生成一个新包
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new minicss({
            filename: "./css/[name].css"
        }),
        new minimizer(),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../src/static"),
                    to: './static',
                    globOptions: {
                        ignore: [".*"]
                    }
                }
            ]
        }),
    ]
}

htmlArr.forEach(ele => {
  module.exports.plugins.push(new htmlWebPackPlugin(ele))  
})

console.log('module.exports', module.exports);