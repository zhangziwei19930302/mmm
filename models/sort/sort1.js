/**
 * Created by Administrator on 2017/6/23.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:3000/api/getcategorytitle",
        dataType:"jsonp",
        success:function(data){
            console.log(data);
            var data1=data.result;
            console.log(data1);
            $.each(data1,function(index,value){
                var str="";
                str+='<li>'+
                    '<a href="#">'+value.title+'</a>'+
                    '<i></i>'+
                    '</li>';
                $(".getcategorytitle").append(str);
            })


            //$(".getcategorytitle li").click(function(){
            //    $(this).find("div").remove();
            //    var Id=$(this).attr("data");
            //    console.log(Id);
            //    //$(this).find('i').css('background','url("images/arrow2.gif") no-repeat' )


                   $.ajax({
                       type:"get",
                       url:"http://127.0.0.1:3000/api/getcategory",
                       dataType:"jsonp",
                       data:{"titleid":i},
                       success:function(data){
                           //console.log(data);
                           var data=data.result;
                           console.log(data);
                           var tag='<div class="item">'+
                               '<ul>';
                           console.log(data[i]);
                           $.each(data[i],function(index,value){
                               tag+='<li><a href="">'+value.category+'</a></li>'
                           })
                           tag+='</ul>'+
                               '</div>';

                           $($(".getcategorytitle>li").get(i)).append(tag);
                       }
                   })
               }

    })
})