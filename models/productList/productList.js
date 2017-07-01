/**
 * Created by Administrator on 2017/6/23.
 */

$(function(){
    //取出sessionStorage存储数据每个小li里面的data属性,获取相应的列表
    var v = sessionStorage.getItem('value');
    var p= 1,id;
    var category,brandName;


    var pagesize,totalCount,page;
    console.log(v);
    //ajax请求数据,渲染headleft和itemList
    $.ajax({
        url:"http://127.0.0.1:3000/api/getcategorybyid",
        type:'get',
        data:{"categoryid":v},
        success:function(data){
            var data=data.result;
            console.log(data);

            category=data[0].category;
            console.log(category);

            for(var i=0;i<data.length;i++){
                var tag='';
                tag+='<span>'+data[i].category+' ></span>';
                $(".headleft").append(tag);

                id=data[i].categoryId;

                init(id,p);

            }
        }
    })
    //点击实现下一页
    $(".page input:last-child").on("click",function(){

        $(".itemList").html('');
        p+=1;
        if(p>page){
            p=p-1;
           init(id,p);
           return;
       }
        init(id,p);
        //console.log(p);

    })

    //点击实现上一页
    $(".page input:first-child").on("click",function(){
        $(".itemList").html('');
        p-=1;

       if(p<1){
         p=p+1;
           init(id,p);
           return;
       }
        init(id,p);
    })


    //选择翻页功能
    $(".pageNum").on('click','p',function(){
        $(".pageNum strong").html("");
        $(".pageNum strong").toggleClass("show");
        var str='';
        for(var i=0;i<page;i++){
            str+='<em>'+(i+1)+'/12</em><br>';
        }
        console.log(str);
        $(".pageNum").find('strong').append(str);
        console.log($(".pageNum").find('strong').css("top",-i*35+'px'));
    })

    $(".pageNum strong").on('click','em',function(){
        $(".pageNum strong").toggleClass("show");
        $(".itemList").html('');
        $(".pageNum p").html($(this).html());

        init(id,$(".pageNum p").html().slice(0,1));
    })


    function init(id,p){
        $.ajax({
            url:"http://127.0.0.1:3000/api/getproductlist?categoryid="+id+"&pageid="+p,
            type:'get',
            success:function(data){
                var datas=data.result;
                console.log(datas);

                pagesize=data.pagesize;
                totalCount=data.totalCount;
                page=Math.ceil(totalCount/pagesize);
                console.log(page);
                for(var i=0;i<datas.length;i++){

                    brandName=datas[i].brandName;
                    //console.log(brandName);

                    var str='';
                    str+='<a href="../details/detailsl.html?brandName='+brandName+'&category='+category+'&productid='+datas[i].productId+'">'+
                        '<div class="pic fl">'+
                        datas[i].productImg+
                        '</div>'+
                        '<div class="content fl">'+
                        '<h3>'+datas[i].productName+'</h3>'+
                        '<p>'+datas[i].productPrice+'</p>'+
                        '<span>'+datas[i].productQuote+'</span>'+
                        '<span>'+datas[i].productCom+'</span>'+
                        '</div>'+
                        '</a>';

                    $(".itemList").append(str);
                }
            }

        })
    }


    function goBack(){
        history.back();
    }

    $(".headleft").find("span:eq(1)").on('click',function(){
        goBack();
    })
    $(".headleft").find("span:eq(0)").on('click',function(){
        window.location.href='../../index.html';
    })
})