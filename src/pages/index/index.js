/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-29 11:59:24
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-05-29 23:13:50
 */
import './index.css'
console.log(document.querySelector('.page1_test'));
console.log(new Array(10).fill({}).map((ele, index) => ({
    index: index,
    age: index * 5
})));