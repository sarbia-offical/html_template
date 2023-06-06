/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-29 12:00:12
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-05-30 12:54:44
 */
import './index.css'
const _ = require("lodash");
const fn = () => {
    console.log(_.defaults({'a': 1}, {'a': 3, 'b': 4}));
}
;(() => {
    fn();
})()