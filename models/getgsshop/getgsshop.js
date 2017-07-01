/**
 * Created by Administrator on 2017/6/28.
 */
$(function(){

    $(".filter ul").on('click','li:eq(0)',function(){
        $(".choosearea").removeClass('show');
        $(".chooseshop").toggleClass('show');

        if($(".chooseshop").hasClass('show')){
            $(".filter ul").find("li:eq(0)>a>i").css("background-image","url('../../images/sanjiao2.svg')");
        }else{
            $(".filter ul").find("li:eq(0)>a>i").css("background-image","url('../../images/xiaosanjiao.svg')");
        }
    })

    $(".filter ul").on('click','li:eq(1)',function(){
        $(".chooseshop").removeClass('show');
        $(".choosearea").toggleClass('show');

        if($(".choosearea").hasClass('show')){
            $(".filter ul").find("li:eq(1)>a>i").css("background-image","url('../../images/sanjiao2.svg')");
        }else{
            $(".filter ul").find("li:eq(1)>a>i").css("background-image","url('../../images/xiaosanjiao.svg')");
        }
    })

    var shopId=0,areaId=0;
    //动态生成店铺名称
    $.get(' http://127.0.0.1:3000/api/getgsshop',function(data){
        var data=data.result;
        console.log(data);
        var str='';
        for(var i=0;i<data.length;i++){
           shopId=data[i].shopId;
           str+='<li>'+
                '<a href="#">'+data[i].shopName+'<i></i></a>'+
                '</li>'
        }
       $('.chooseshop ul').append(str);
    })

    //动态生成地区
    $.get('http://127.0.0.1:3000/api/getgsshoparea',function(data) {
        var data=data.result;
        console.log(data);
        var string='';
        for(var k=0;k<data.length;k++){
            areaId=data[k].areaId;
            string+='<li><a href="#">'+data[k].areaName+'<i></i></a></li>'
        }
        $(".choosearea ul").append(string);
    })

    //根据shopid和areaid的不同渲染列表
    init(shopId,areaId);


    //点击商店列表和地区列表 让头部的内容发生改变    并且让其底下的列表项被渲染
    $(".chooseshop ul").on('click','li',function(){
        console.log($(this).html());
        console.log($(".filter ul").find('li:eq(0)').html());
        $(".filter ul").find('li:eq(0)').html($(this).html());
        $(".chooseshop").toggleClass('show');

        $(".goodsList ul").html('');

        shopId=$(this).index();
        init(shopId,areaId);
    })

    $(".choosearea ul").on('click','li',function(){
        var reg=/（.*）/;
        console.log($(".filter ul").find('li:eq(1)').html());
        $(".filter ul").find('li:eq(1)').html($(this).html().replace(reg,''));
        $(".choosearea").toggleClass('show');

        areaId=$(this).index();
        $(".goodsList ul").html('');
        init(shopId,areaId);
    })


    function init(shopid,areaId){
        $.get('http://127.0.0.1:3000/api/getgsproduct?shopid='+shopid+'&areaid='+areaId,function(data){
            var data=data.result;
            console.log(data);

            var str='';
            for(var i=0;i<data.length;i++){
                str+='<li>'+
                    '<a href="">'+
                    '<div class="pic">'+
                    '<img src="'+data[i].productImg+'" alt=""/>'+
                    '</div>'+
                    '<div class="info">'+
                    data[i].productName+
                    '</div>'+
                    '<div class="other">'+
                    '<div class="price">'+
                    data[i].productPrice+
                    '</div>'+
                    '</div>'+
                    '</a>'+
                    '</li>'
            }
            $(".goodsList ul").append(str);

        })
    }

    function goBack(){
        history.back();
    }

    $(".back a").find("i").on('click',function(){
        goBack();
    })

})