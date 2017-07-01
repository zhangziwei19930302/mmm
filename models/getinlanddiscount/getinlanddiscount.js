/**
 * Created by Administrator on 2017/6/25.
 */
$(function(){


    var winHeight=0;
    var domHeight=0;
    var totallength=0;
    var len=8;
    var saleslist=$(".saleslist ul");
    $.get('http://127.0.0.1:3000/api/getinlanddiscount',function(data){
        console.log(data);
        var data=data.result;
        console.log(data);
        totallength=data.length;

        var string='';

        for(var i=0;i<len;i++){
        string+='<li>'+
                '<a href="#">'+
                data[i].productImg+
                '<h3>'+data[i].productName+'</h3>'+
                '<span>'+data[i].productPrice+'</span>'+
                '<div class="info">'+
                data[i].productFrom+' |'+data[i].productTime+
                '</div>'+
                '</a>'+
                '</li>';

        }
        saleslist.append(string);
    })



    $(window).scroll(function(){
        //当鼠标滚到底部的时候,加载新的数据
        //解决方案:计算出鼠标到底部,加载数据
        winHeight=$(window).height();
        //console.log(winHeight);
        domHeight=$(document).height();
        //console.log(domHeight);
        //console.log($(window).scrollTop());
        if($(window).scrollTop()==domHeight-winHeight){
            if(len>=totallength){
                return;
            }
            addProduct();
            console.log(("到底了"));
        }
    })



    function addProduct(){
        $.get('http://127.0.0.1:3000/api/getinlanddiscount',function(data){
            var data=data.result;
            console.log(("到底了"));
            totallength=data.length;
            var string='';
            for(var i=len;i<len+4;i++){
                string+='<li>'+
                    '<a href="#">'+
                    data[i].productImg+
                    '<h3>'+data[i].productName+'</h3>'+
                    '<span>'+data[i].productPrice+'</span>'+
                    '<div class="info">'+
                    data[i].productFrom+' |'+data[i].productTime+
                    '</div>'+
                    '</a>'+
                    '</li>';
            }
            saleslist.append(string);
            len+=4;
    })
}

    function goBack(){
        history.back();
    }

    $(".back a").find("i").on('click',function(){
        goBack();
    })
})