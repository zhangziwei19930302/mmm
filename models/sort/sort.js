/**
 * Created by Administrator on 2017/6/22.
 */
$(function(){
    //ajax请求数据,渲染getcategorytitle

    //添加data属性:为了获取到li的titleId从而渲染子下拉菜单
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:3000/api/getcategorytitle",
        success:function(data){
            var data1=data.result;
            console.log(data1);
            $.each(data1,function(index,value){
                var str="";
                str+='<li data='+value.titleId+'>'+
                    '<a href="#">'+value.title+'</a>'+
                    '<i></i>'+
                    '</li>';
                $(".getcategorytitle").append(str);
            })

            //getcategorytitle的每个li绑定点击事件
            $(".getcategorytitle li").click(function(){

                //获取当前大li的data属性

                var Id=$(this).attr("data");
                $(this).find("div").remove();
                console.log(this.isClick);
                if(!this.isClick){
                    //传入获取到的titleid,然后显示相应的子列表并渲染 并且为每一个分类设置data属性 为了跳转到详情页
                    $.ajax({
                        type:"get",
                        url:"http://127.0.0.1:3000/api/getcategory",
                        data:{"titleid":Id},
                        success:function(data){
                            var data=data.result;
                            console.log(data);
                            var tag='<div class="item">'+
                                '<ul>';
                            $.each(data,function(index,value){
                                tag+='<li data='+value.categoryId+'><a href="../productList/productList.html">'+value.category+'</a></li>'
                            })
                            tag+='</ul>'+
                                '</div>';
                            $($(".getcategorytitle>li").get(Id)).append(tag);
                        }
                    })
                    $(this).find('i').css('background','url("../../images/arrow2.gif") no-repeat' )
                    this.isClick = true
                }else{
                    $(this).find('i').css('background','url("../../images/arrow1.gif") no-repeat' )
                    this.isClick = false
                }

                $(this).siblings().find('div').css("display","none");

            })

            //设置sessionStorage存储数据每个小li里面的data属性 为了在productList.html可也拿到相应的categoryId

            $(".getcategorytitle li").on("click","li",function(e){
                e.stopPropagation;
                //console.log($(this).attr('data'));
                sessionStorage.setItem('value',$(this).attr('data'));
            })
        }
    })
})