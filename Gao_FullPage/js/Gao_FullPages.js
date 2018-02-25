$(function(){
   /* (function($){
        $.fn.extend({
            fullpage:function(params){
                // 参数
                // var time = ((params && params.time)) ? params.time : 1000 ;
                var defaults = {
                    time:1000
                };
                var options = $.extend({},defaults, params);
                console.log(options)
                //定义全局变量
                var num = 0;
                var Flag = true;

                var objThis = $(this);
                var vh = $(window).height();
                document.body.style.overflow='hidden';
                objThis.find('.slider').css('height',vh);

                windowResize();
                MouseWheel();


                function windowResize(){
                    $(window).resize(function(event){
                        var vh = $(window).height();
                        var arrivePoint = num * $(window).height();
                        $('.slider').css('height',vh)
                        showAnimate(arrivePoint,options.time);
                    })
                }

                function MouseWheel(){
                    $(document).on('mousewheel DOMMouseScroll',function(e){
                        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                        if(Flag){
                            Flag = false;
                            if(delta < 0){
                                num++;
                                $('.slider_spot').eq(num).addClass('active').siblings().removeClass('active');
                                if(num == $('.slider').length){
                                    num = 1
                                    $("#wrapper").css('top',0)
                                    $('.slider_spot').eq(num).addClass('active').siblings().removeClass('active');
                                };
                                if(num > $('.slider').length-1){
                                    num = $('.slider').length-1;
                                }
                                //处理最后一屏不是内容不足全屏的情况
                                if(num == $('.slider').length-1 && $('.slider:last-child').height() != $(window).height()){
                                    var arrivePoint = (num-1) * $(window).height() + $('.slider:last-child').height();
                                }else{
                                    var arrivePoint = num * $(window).height();
                                }
                                showAnimate(arrivePoint,options.time)
                            }else{
                                num--;
                                if(num < 0){
                                    num = 0;
                                }
                                $('.slider_spot').eq(num).addClass('active').siblings().removeClass('active');
                                var arrivePoint = num * $(window).height();
                                showAnimate(arrivePoint,options.time)
                            }

                        }
                    })
                }

                function showAnimate(top,time){
                    $("#wrapper").animate({'top':-top+'px'},time,function(){
                        Flag = true
                    })
                }
            }
        })
    })(jQuery);*/

    ;(function($,window,document,undefined){
        var FullPage = function(obj,para){
            this.num = 0;
            this.num1 = 5;
            this.Flag = true;
            this.windowResize();
            //默认参数
            this.defaults = {
                slidesColor:[],
                time:1000,
                navigation:false,
                navigationPosition:'right',
                menu:false,
                autoScrolling:true,
                afterLoad:function(){

                },
                onLeave:function(){

                }
            };
            //合并参数
            this.options = $.extend({},this.defaults, para);
            console.log(this.options)

            /* 改变背景色 */
            if(this.options.slidesColor.length != 0){
                this.options.slidesColor.map(function(item,index){
                    $('.slider').eq(index).css('background',item);
                })
            }

            /* 是否使用插件的滚动方式 */
            if(!this.options.autoScrolling){
                $('#wrapper').css('position','static')
                document.body.style.overflow='auto';
                this.options.navigation = false;
            }

            /* 控制项目导航 */
            if(this.options.navigation){
                this.createdSpot();
                if(this.options.navigationPosition == 'left'){
                    $('.sliderSpot_wrapper').css({'left':'20px','right':'auto'})
                }else{
                    $('.sliderSpot_wrapper').css({'left':'auto','right':'20px'})
                }
                var _that = this;
                $('.slider_spot').on('click',function(){
                    _that.TabsClick(this);
                })
            }
            /* 初始化回调函数 */
            if(this.options.afterLoad && typeof this.options.afterLoad == 'function'){
                    this.options.afterLoad(this.num);
                }

            /* 绑定菜单 */
            if(this.options.menu){
                var MenuDiv = $('<div class="menuItem"></div>')
                if($('.slider:last-child').height() != $(window).height()){
                    for(var i = 0; i < $('.slider').length-1; i++){
                        $('<div class="menuList">第'+ (i+1) +'屏</div>').appendTo(MenuDiv);
                    }
                }else{
                    for(var i = 0; i < $('.slider').length; i++){
                        $('<div class="menuList">第'+ (i+1) +'屏</div>').appendTo(MenuDiv);
                    }
                }
                $('#wrapper').append(MenuDiv)
                $('.menuList').eq(this.num).addClass('active');
                var _that = this;
                $('.menuList').on('click',function(){
                    _that.TabsClick(this)
                })
            }
        }

        FullPage.prototype = {
            MouseWheel:function(){
                var _that = this;
                $(document).on('mousewheel DOMMouseScroll',function(e){
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                    (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                    if(_that.Flag){
                        _that.Flag = false;
                        if(delta < 0){
                            _that.num++;
                            /* 项目菜单联动 */
                            if(_that.options.navigation){
                                $('.slider_spot').eq(_that.num).addClass('active').siblings().removeClass('active');
                            }
                            /* 菜单联动 */
                            if(_that.options.menu){
                                $('.menuList').eq(_that.num).addClass('active').siblings().removeClass('active');
                            }

                            // 回调函数
                            //进入
                            if(_that.options.afterLoad && typeof _that.options.afterLoad == 'function'){
                                _that.options.afterLoad(_that.num);
                            }
                            // 离开
                            if(_that.options.onLeave && typeof _that.options.onLeave == 'function'){
                                if(_that.num == $('.slider').length-1 && $('.slider:last-child').height() != $(window).height()){
                                    _that.num+=1;
                                }
                                _that.options.onLeave(_that.num);
                            }
                            if(_that.num > $('.slider').length-1){
                                _that.num = $('.slider').length-1;
                            }
                            //处理最后一屏不是内容不足全屏的情况
                            if(_that.num == $('.slider').length-1 && $('.slider:last-child').height() != $(window).height()){
                                var arrivePoint = (_that.num-1) * $(window).height() + $('.slider:last-child').height();
                            }else{
                                var arrivePoint = _that.num * $(window).height();
                            }
                            _that.showAnimate(arrivePoint,_that.options.time)
                        }else{
                            _that.num--;
                            if(_that.num < 0){
                                _that.num = 0;
                            }
                            /* 项目菜单联动 */
                            if(_that.options.navigation){
                                $('.slider_spot').eq(_that.num).addClass('active').siblings().removeClass('active');
                            }
                            /* 菜单联动 */
                            if(_that.options.menu){
                                $('.menuList').eq(_that.num).addClass('active').siblings().removeClass('active');
                            }
                            // 回调函数
                            //进入
                            if(_that.options.afterLoad && typeof _that.options.afterLoad == 'function'){
                                _that.options.afterLoad(_that.num);
                            }
                            // 离开
                            if(_that.options.onLeave && typeof _that.options.onLeave == 'function'){
                                _that.options.onLeave(_that.num);
                            }
                            var arrivePoint = _that.num * $(window).height();
                            _that.showAnimate(arrivePoint,_that.options.time)
                        }

                    }
                })
            },
            showAnimate:function(top,time){
                var _that = this;
                $("#wrapper").animate({'top':-top+'px'},time,function(){
                    _that.Flag = true
                })
            },
            createdSpot:function(){
                var DIV = $('<ul class="sliderSpot_wrapper"></ul>')
                if($('.slider:last-child').height() != $(window).height()){
                    for(var i=0;i<$('.slider').length-1;i++){
                        $('<li class="slider_spot"></li>').appendTo(DIV);
                    }
                }else{
                    for(var i=0;i<$('.slider').length;i++){
                        $('<li class="slider_spot"></li>').appendTo(DIV);
                    }
                }

                $('#wrapper').append(DIV)
                $('.slider_spot').eq(this.num).addClass('active');
            },
            windowResize:function(){
                var _that = this;
                $(window).resize(function(event){
                    var vh = $(window).height();
                    var arrivePoint = _that.num * $(window).height();
                    $('.slider').css('height',vh)
                    _that.showAnimate(arrivePoint,_that.options.time);
                })
            },
            TabsClick:function(obj){
                var index = $(obj).index();
                this.num = index;
                $(obj).addClass('active').siblings().removeClass('active');
                if(this.options.navigation){
                    $('.slider_spot').eq(index).addClass('active').siblings().removeClass('active');
                }
                if(this.options.menu){
                    $('.menuList').eq(index).addClass('active').siblings().removeClass('active');
                }
                // 回调函数
                //进入
                if(this.options.afterLoad && typeof this.options.afterLoad == 'function'){
                    this.options.afterLoad(this.num);
                }
                // 离开
                if(this.options.onLeave && typeof this.options.onLeave == 'function'){
                    this.options.onLeave(this.num);
                }
                var arrivePoint = index * $(window).height();
                this.showAnimate(arrivePoint,this.options.time)
            }
        }

        $.fn.extend({
            fullpage:function(params){
                var vh = $(window).height();
                document.body.style.overflow='hidden';
                var objThis = $(this);
                objThis.find('.slider').css('height',vh);
                var Fullpage = new FullPage(this,params)
                Fullpage.MouseWheel();
            }
        })
    })(jQuery,window,document)

})