/*
 * @Author: Gao_sir
 * @Date:   2018-07-05 14:03:06
 * @Last Modified by:   Gao_Sir
 * @Last Modified time: 2018-07-05 15:50:42
 */

'use strict';
require.config({
    baseUrl : "js",
    paths:{
        'jquery':['public/jquery-3.3.1'],
        'page1':['views/page1'],
        'page2':['views/page2'],
    },
    shim:{
        /*'page1':{
            init:function(){
                return {
                    'hello1':hello1,
                    'hello2':hello2
                }
            }
        }*/
    }
})


