/**
 * Created by Administrator on 2017/6/24.
 */
$(function(){
    //tabs栏切换
    $('#tabs a').click(function(e) {
        e.preventDefault();
        $('#tabs li').removeClass("current");
        $(this).parent().addClass("current");
        $("#content div").removeClass("show");
        $('#' + $(this).attr('title')).addClass('show');
    });

    id=GetQueryString('productid');
    console.log(id);
    //通过.get()方法比ajax请求快 通过window.location.search取出传入的参数获取数据渲染
    $.get('http://127.0.0.1:3000/api/getproduct?productid='+id,function(data){
        console.log(data);
        var data=data.result;
        console.log(data);

        var str='';
       str+='<div class="describe">'+
            '<h3>'+data[0].productName+'</h3>'+
            '</div>'+
            '<div class="pic">'+
            data[0].productImg+
            '<a href="">'+
            '<img src="../../images/sc.jpg" alt=""/>'+
            '</a>'+
            '</div>';
       $(".detail").append(str);


        //取出传过来的参数,不认识中文,通过decode转码才可以渲染到头部
        var k=GetQueryString('category');
        console.log(k);
        k=decodeURI(k);
        console.log(k);

        var bb=GetQueryString('brandName');
        bb=decodeURI(bb);
        console.log(bb);

        var str1='';
        str1+='<span>'+k+'></span>'+
            '<span>'+bb+' ></span>';
        $(".headleft").append(str1);
    })

    $.get('http://127.0.0.1:3000/api/getproductcom?productid='+id,function(data){
        //console.log(data);
        var data=data.result;
        console.log(data);
        for(var i=0;i<data.length;i++){
            var str="";
            str+= '<div class="commentcontent">'+
                '<span>'+data[i].comName+'</span>'+
                '<span>'+data[i].comTime+'</span>'+
                '<p>'+data[i].comFrom+'</p>'+
                '</div>'+
                '<div class="commentnote">'+
                '<p>'+data[i].comContent+'</p>'+
                '</div>'
            $(".commentList").append(str);
        }
    })

    function goBack(){
        history.back();
    }

    $(".headleft").on('click',"span:eq(1)",function(){
        goBack();
    })
    $(".headleft").find("span:eq(0)").on('click',function(){
        window.location.href='../../index.html';
    })

});

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