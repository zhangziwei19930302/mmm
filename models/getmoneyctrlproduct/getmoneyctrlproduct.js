/**
 * Created by Administrator on 2017/6/25.
 */
$(function(){

    var id=GetQueryString('productId');
    $.get('http://127.0.0.1:3000/api/getmoneyctrlproduct?productid='+id+'',function(data){
        console.log(data);
            var data=data.result;
        console.log(data);
        var str='';
        str+='<div class="cu-content">'+
            '<h3 class="titel">'+data[0].productName+'</h3>'+
            '<h4>'+data[0].productPinkage+'</h4>'+
            '<div class="info">'+
            '<span class="mall">'+data[0].productFrom+'</span>'+
            '<span class="addtime">'+data[0].productTime+'</span>'+
            '<span class="author">'+data[0].productTips+'</span>'+
            '<span>'+
            '<a href="">'+data[0].productComCount+'</a>'+
            '</span>'+
            '</div>'+
            '<div class="content">'+
            '<div class="picwrap">'+
            data[0].productImgSm+
            '</div>'+
            '<div class="conn">'+
            data[0].productInfo2+
            '<br/>'+
            '<br/>'+
            data[0].productInfo1+
            '<br/>'+
            '<br/>'+
            '<p>'+data[0].productImgSm+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="golink">'+
            '<a href="">'+
            '<i></i>'+
            '前往购买'+
            '</a>'+
            '</div>'+
            '</div>'+
            data[0].productComment;
        $(".container").append(str);

    })

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }

    function goBack(){
        history.back();
    }

    $(".back a").find("i").on('click',function(){
        goBack();
    })
})