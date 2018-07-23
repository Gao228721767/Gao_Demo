/*
* @Author: Gao_Sir
* @Date:   2018-07-05 14:18:57
* @Last Modified by:   Gao_Sir
* @Last Modified time: 2018-07-05 17:49:28
*/

'use strict';



define(['jquery','page2'],function($,page2){
    function hello1(){
        console.log('hello1 Gao_Sir');
    }

    function hello2(){
        console.log('hello2 Gao_Sir');
    }

    return {
        'hello1':hello1,
        'hello2':hello2
    }
})