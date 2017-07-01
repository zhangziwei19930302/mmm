/**
 * Created by Administrator on 2017/6/26.
 */
$(function(){

    var sumWidth =0;
    var titleId=0;
    $.get('http://127.0.0.1:3000/api/getbaicaijiatitle',function(data){
        var data=data.result;
        console.log(data);

        var string='';

        for(var i=0;i<data.length;i++){

            string+= '<li><a href="#">'+data[i].title+'</a></li>';
        }
        $(".uls").append(string);

        //给ul设置宽度
        $(".uls").find("li").each(function(){
            sumWidth += $(this).width();
        });
        $(".uls").width(sumWidth);

        $(".uls").find("li:eq(0) a").addClass('active');

    })

    //页面刚开始加载渲染第一页
    init(titleId);

    $(window).scroll(function(){
        //当鼠标滚到底部的时候,加载新的数据
        //解决方案:计算出鼠标到底部,加载数据
        winHeight=$(window).height();
        //console.log(winHeight);
        domHeight=$(document).height();
        //console.log(domHeight);
        //console.log($(window).scrollTop());
        if($(window).scrollTop()==domHeight-winHeight){
            titleId++;
            if(titleId>12){
                return;
            }
            console.log(("到底了"));
            console.log(titleId);
            init(titleId);
        }
    })

    //点击跳转某一个子li
    $(".uls").on("click","li",function(){

        $(".containList ul").html('');

        $(this).siblings().find("a").removeClass('active');
        $(this).find('a').addClass('active');

        var index=$(this).index();
        init(index);
    })

    $(".search").on("click",function(){
        $(this).find('div').toggleClass("icon-list icon-x");
        $(".searchbar").toggleClass("show");
    })

    function init(index){
        $.get('http://127.0.0.1:3000/api/getbaicaijiaproduct?titleid='+index,function(data){
            //console.log(data);
            var data=data.result;
            console.log(data);
            var productCoupon;

            var str='';
            for(var i=0;i<data.length;i++){
                titleId=data[i].titleId;
                productCoupon=data[i].productCoupon;

                productCoupon=$(productCoupon).text();
                productCoupon=productCoupon.replace('点此领','');
                str+='<li>'+
                    '<div class="left">'+
                    data[i].productImg+
                    '</div>'+
                    '<div class="right">'+
                    '<div class="title">'+
                    data[i].productName+
                    '</div>'+
                    '<div class="price">'+
                    data[i].productPrice+
                    '</div>'+
                    '<div class="o">'+
                    '<div class="b clearfix">'+
                    '<div class="q"><span class="togoquan">'+productCoupon+'</span></div>'+
                    '<div class="g"><span class="togobuy">领券下单</span></div>'+
                    '</div>'+
                    data[i].productCouponRemain+
                    '</div>'+
                    '</div>'+
                    '</li>'

            }
            $(".containList ul").append(str);
        })
    }


    //获取元素
    var uls=$("#wrapper .uls");
    var maxWidth;

    //设置变量
    var startX= 0,endX=0,moveX= 0,lastX=0;
    uls.on('touchstart',function(e){
        startX= e.originalEvent.touches[0].clientX;
    })

    uls.on("touchmove",function(e){
        endX= e.originalEvent.touches[0].clientX;
        moveX=endX-startX;
//      console.log(moveX);
        move(moveX+lastX,0);
    })

    uls.on('touchend',function(e){
        maxWidth=uls.width()-uls.parent().width();
        lastX+=moveX;
        if(lastX<-maxWidth){
            move(-maxWidth-40,1);
            lastX=-maxWidth;
        }
        if(lastX>0){
            move(0,1);
            lastX=0;
        }
    })

    function move(length,sec){
        uls.css("transform","translate("+length+"px)");
        uls.css("transition","all "+sec+"s");
    }

    function goBack(){
        history.back();
    }
    $(".back a").find("i").on('click',function(){
        goBack();
    })
})