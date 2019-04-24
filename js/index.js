/*
 * @Author: Gao_Sir
 * @Date:   2018-12-25 16:08:28
 * @Last Modified by: GaoSir
 * @Last Modified time: 2019-04-24 14:30:47
 */

'use strict';

$(function() {
    var params = [
        {url: 'aaa', userPlaceholder: 'a', pwdPlaceholder: 'a'},
        {url: 'bbb', userPlaceholder: 'b', pwdPlaceholder: 'b'},
        {url: 'ccc', userPlaceholder: 'c', pwdPlaceholder: 'c'},
        {url: 'ddd', userPlaceholder: 'd', pwdPlaceholder: 'd'}
    ];

    function init() {
        Events();
    }

    function Events() {
        // 切换登录入口
        $('.btn').on('click', function() {
            var _index = $(this).index();
            var loginParams = params[_index];
            $('form').attr('action', loginParams.url);
            $('.input1').attr('placeholder', loginParams.userPlaceholder);
            $('.input2').attr('placeholder', loginParams.pwdPlaceholder);
        })
    }

    // init();
})

