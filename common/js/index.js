/**
 * Created by Administrator on 2017/6/22.
 */
$(function(){

    //ajax请求数据,渲染bannerList
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:3000/api/getindexmenu",
        success:function(data){

            var data=data.result;

            var tag='<ul>';
            $.each(data,function(index,value){

                tag+='<li>'+
                    '<a href="#">'+
                    value.img+
                    '<p>'+value.name+'</p>'+
                    '</a>'+
                    '</li>'
            })
            tag+="</ul>";
            $(".bannerList").html(tag);

            //选中更多,点击实现添加 删除show类名
            $(".bannerList ul li:eq(7)").on("click",function(){
                $(".bannerList ul li:gt(7)").toggleClass('show');
            });

        }
    })
    //ajax请求数据,渲染recommendlist
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:3000/api/getmoneyctrl",
        success:function(data){
           var data=data.result;
            console.log(data);

               var str='';

            $.each(data,function(index,value){

                var string=value.productComCount;
                string=string.replace('有',"");
                string=string.replace('人评论',"");

               str+='<div class="listItem">'+
                    '<div class="img">'+
                    value.productImgSm+
                    '</div>'+
                    '<div class="info">'+
                    '<div class="title">'+
                    value.productName+
                    '<span class="redcolor">'+value.productPinkage+'</span>'+
                    '</div>'+
                    '<div class="other">'+
                    '<span>'+value.productFrom+' |'+value.productTime+'</span>'+
                    '<span>'+
                    '<i></i>'+
                    string+
                    '</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
            })
            $(".recommendlist").html(str);
        }

    })



    $(".bannerList").on('click',"li:eq(0)",function(){
        window.location.href='models/sort/sort.html';
    })

    $(".bannerList").on('click',"li:eq(1)",function(){
        window.location.href='models/getmoneyctrl/getmoneyctrl.html';
    })

    $(".bannerList").on('click',"li:eq(2)",function(){
        window.location.href='models/getinlanddiscount/getinlanddiscount.html';
    })


    $(".bannerList").on('click',"li:eq(3)",function(){
        window.location.href='models/getbaicaijiatitle/getbaicaijiatitle.html';
    })

    $(".bannerList").on('click',"li:eq(5)",function(){
        window.location.href='models/getcoupon/getcoupon.html';
    })

    $(".bannerList").on('click',"li:eq(8)",function(){
        window.location.href='models/getgsshop/getgsshop.html';
    })
})


