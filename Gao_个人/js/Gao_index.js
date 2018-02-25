$(function() {
    //全局变量
    var timeNum = 0;
    var Flag = false;

    var Gao_Page1 = {
        //初始化
        init: function() {
            var self = this;
            var timer = setTimeout(function() {
                $('.loading').animate({
                    'opacity': '0'
                }, 500, function() {
                    $(this).remove();
                    $('.menuList').eq(0).removeClass('active');
                });
                self.Start();
            }, 2000)
        },
        Start: function() {
            var self = this;
            $('#wrapper').animate({
                'opacity': '1'
            }, 1500)
            this.BannerMove();


            // 菜单显示
            $('.iconBtn').click(function(e) {
                Flag = true;
                e.preventDefault();
                $(this).fadeOut(500);
                $('.menu').stop().animate({
                    'top': '36px',
                    'opacity': 1
                }, 500)
            })
            $('.closeBtn').on('click', function(e) {
                Flag = false;
                e.preventDefault();
                $('.menu').animate({
                    'top': '-50px',
                    'opacity': '0'
                }, 500)
                $('.iconBtn').fadeIn(500)
            })


            //调用插件
            $('#wrapper').fullpage({
                slidesColor: ['#E4E6CE', '#FFF', '#f8f8f8', '#42a4ff', '#1BBC9B', '#E4E6CE', '#6CE26C'],
                time: 700, //动画时间
                menu: true, //绑定菜单
                menuText: ['首页首页1', '首页首页2', '首页首页3', '首页首页4', '首页首页5', '首页首页6', '首页首页7'], //菜单文字
                navigation: true, //是否显示项目导航
                afterLoad: function(index) {
                    if (Flag) {
                        if (index == 0) {
                            $('.menuList').eq(0).removeClass('active');
                            $('.menu').stop().css({
                                'position': 'absolute',
                                'background': '',
                                'color': '#FFF'
                            }).animate({
                                'top': '36px'
                            }, 700);
                            $('.closeBtn').css({
                                'color': '#FFF'
                            });
                        } else if (index == 1 || index == 2 || index == 3 || index == 4) {
                            $('.menu').css({
                                'position': 'fixed',
                                'top': '0',
                                'background': 'rgba(0,0,0,0.5)',
                                'color': '#FFF'
                            }).stop().animate({
                                'opacity': 1
                            }, 700)
                            $('.closeBtn').css({
                                'color': '#FFF'
                            });

                            if(index == 2){
                                setTimeout(function(){
                                    Gao_Page3.init();
                                },800)
                            }

                        }
                    } else {
                        $('.menuList').removeClass('active');
                        $('.menu').stop().css({
                            'position': 'absolute',
                            'background': '',
                            'color': '#FFF'
                        }).animate({
                            'top': '-50px'
                        }, 700);
                        if(index == 2){
                            setTimeout(function(){
                                Gao_Page3.init();
                            },800)
                        }
                    }
                }
            });
            $('.menuList').eq(0).removeClass('active');
            $('.slider_spot').eq(0).on('click', function() {
                $('.menuList').eq(0).removeClass('active');
            });
        },
        BannerMove: function() {
            var timer = setInterval(function() {
                timeNum++;
                if (timeNum == 1) {
                    $('.banner li').eq(0).stop().animate({
                        'z-index': '1',
                        'opacity': '0.4'
                    }, 600)
                    $('.banner li').eq(1).stop().animate({
                        'z-index': '0',
                        'opacity': '0'
                    }, 600)
                } else if (timeNum == 2) {
                    $('.banner li').eq(1).stop().animate({
                        'z-index': '1',
                        'opacity': '0.4'
                    }, 600)
                    $('.banner li').eq(0).stop().animate({
                        'z-index': '0',
                        'opacity': '0'
                    }, 600)
                    timeNum = 0;
                }
            }, 4000)
        }
    }

    var Gao_Page2 = {
        init: function() {

        }
    }

    var Gao_Page3 = {
        init: function() {
            var myChart = echarts.init(document.getElementById('page3_Conleft'));
            var option = {
                backgroundColor: '#2c343c',
                title: {
                    text: '天气情况统计',
                    subtext: '虚构数据',
                    left: 'center',
                    top:20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                    data: ['西凉', '益州','兖州','荆州','幽州'],
                    textStyle: {
                        color: '#FFF'
                    }
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {
                                value:1548,
                                name: '幽州',
                            },
                            {value:535, name: '荆州'},
                            {value:510, name: '兖州'},
                            {value:634, name: '益州'},
                            {value:735, name: '西凉'}
                        ],
                        /*label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 1)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 1)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },*/
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    }

    var Gao_Page4 = {
        init: function() {

        }
    }

    var Gao_Page5 = {
        init: function() {

        }
    }

    Gao_Page1.init();
    Gao_Page2.init();

    Gao_Page4.init();
    Gao_Page5.init();

})