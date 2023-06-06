/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-29 18:50:49
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-05-29 22:48:51
 */
const minicss = require("mini-css-extract-plugin");
const rules = [
    {
        test: /\.js$/,
        use: { //为js文件选择loader的配置
            loader: "babel-loader"
        }
        // js的loader相关配置放在.babelrc文件中
    },
    {
        test: /\.css$/i,
        // 区别开发环境和生成环境
        use: [
            {
                loader: minicss.loader,
                options: {
                    publicPath: "../"
                }
            },
            {
                loader: "css-loader"
            }
        ]
    },
    {
        test: /\.less$/i,
        use: [
            // compiles Less to CSS
            minicss.loader,
            //"style-loader", style-loader将css注入进DOM节点中
            "css-loader",
            "less-loader",
        ],
    },
    {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [{
            // 需要下载url-loader
            loader: "url-loader",
            options: {
                limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
                // 图片文件输出的文件夹
                publicPath: "../images",
                outputPath: "images"
            }
        }]
    },
]

module.exports = rules;