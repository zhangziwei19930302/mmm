/**
 * Created by Administrator on 2017/6/25.
 */
$(function(){
    var pagesize,totalCount,page=0;


    //点击实现上一页
    $(".page input:eq(0)").on("click",function(){
        $(".getmoneyListItem").html('');
        if(page>0){
            page--;
        }
        Init(page);
        console.log(1);
    })


    //点击实现下一页

    $(".page input:eq(1)").on("click",function(){
        $(".getmoneyListItem").html('');
        if(page<Totalpage){
        page++;
        Init(page);
        }
        console.log(2);
    })

    Init(0);

    function Init(page){
        $.get('http://127.0.0.1:3000/api/getmoneyctrl?pageid='+page,function(data){
            console.log(data);
            var data1=data.result;
            console.log(data1);

            pagesize=data.pagesize;
            totalCount=data.totalCount;
            Totalpage=Math.ceil(totalCount/pagesize);
            console.log(page);
            for(var i=0;i<data1.length;i++){
                var productComCount=data1[i].productComCount;
                productComCount=productComCount.replace('有','');
                productComCount=productComCount.replace('人评论','');
                var str='';
                str+='<a href="../getmoneyctrlproduct/getmoneyctrlproduct.html?productId='+data1[i].productId+'">'+
                    '<div class="getmoneyList">'+
                    '<div class="Listleft fl">'+
                    data1[i].productImgSm+
                    '</div>'+
                    '<div class="Listright">'+
                    '<div class="title">'+
                    data1[i].productName+
                    '<span>'+data1[i].productPinkage+'</span>'+
                    '</div>'+
                    '<div class="other">'+
                    '<span>'+data1[i].productFrom+' | '+data1[i].productTime+'</span>'+
                    '<span><i></i>'+productComCount+'</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</a>';
                $(".getmoneyListItem").append(str);
            }

        })
    }
    function goBack(){
        window.history.back();
    }

    $(".back a").find("i").on('click',function(){
        goBack();
    })
})


