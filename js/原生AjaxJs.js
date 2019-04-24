/*
 * @Author: Gao_Sir
 * @Date:   2019-03-04 14:47:51
 * @Last Modified by: GaoSir
 * @Last Modified time: 2019-04-24 11:54:08
 */


'use strict';

const Ajax = (object) => {
    object = object || {};
    object.data = object.data || {};
    //判断请求类型为AJAX或者JSONP

    let json = object.jsonp ? Jsonp(object) : ajax(object);

    //设置ajax方法
    function ajax(object, params) {
        // 1.设置请求方式：如果没有制定则默认为GET
        object.type = (object.type || 'GET').toUpperCase();
        // 2.设置data数据的格式化
        object.data = formateObject(object.data);
        // 3.实例化XMLHttpRequest对象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        // 4.监听事件，只要readyState改变，就会调用readystatechange事件
        xhr.onreadystatechange = function () {
            // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据

            if (xhr.readyState == 4) {

                let status = xhr.status;
                // status : HTTP响应的状态码，2开头表示成功

                if (status >= 200 && status < 300) {

                    let response = '';
                    // 判断接受数据的内容类型

                    let type = xhr.getResponseHeader('Content-type');

                    if (type.indexOf('xml') !== -1 && xhr.responseXML) {
                        response = xhr.responseXML; //Document对象响应

                    } else if (type === 'application/json') {
                        response = JSON.parse(xhr.responseText); //JSON响应

                    } else {
                        response = xhr.responseText; //字符串响应

                    };
                    // 成功回调函数
                    object.success && object.success(response);

                } else {
                    object.error && object.error(response);

                }

            }

        }


        // 5.连接和传输数据

        if (object.type == 'GET') {
            // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
            xhr.open(object.type, object.url + '?' + object.data, true);
            xhr.send(null);

        } else {
            xhr.open(object.type, object.url, true);
            //必须，设置提交时的内容类型
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            // 传输数据
            xhr.send(object.data);

        }

    }

    //data的格式化方法

    function formateObject(data) {

        if (data) {

            let arr = [];

            for (let name in data) {
                //encodeURIComponent() ：用于对 URI 中的某一部分进行编码
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));

            }

            //为了防止缓存，在后面添加一个随机数
            arr.push('randomV=' + randomNumber());

            return arr.join('&');

        } else {
            console.error('无法格式化请求数据')

        }

    }

    //生成随机数的方法

    function randomNumber() {

        return Math.floor(Math.random() * 10000 + 404);

    }


};



//设置Jsonp方法
function Jsonp(object) {
    // 创建script标签并加入到页面中
    let callbackName = object.jsonp,
        head = document.getElementsByTagName('head')[0];
    // 设置传递给后台的回调参数名
    object.data['callback'] = callbackName;
    let data = formateObject(object.data),
        script = document.createElement('script');
    head.appendChild(script);
    // 创建JSONP的回调函数
    //创建jsonp回调函数
    window[callbackName] = function (json) {
        head.removeChild(script);
        clearTimeout(script.timer);
        window[callbackName] = null;
        object.success && object.success(json);
    };
    // 发送请求
    script.src = object.url + '?' + data;
    //为了得知此次请求是否成功，设置超时处理
    if (object.time) {
        script.timer = setTimeout(function () {
            window[callbackName] = null;
            head.removeChild(script);
            object.error && object.error({
                message: '请求超时'
            });
        }, time);
    }

}