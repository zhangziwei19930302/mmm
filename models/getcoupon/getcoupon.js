/**
 * Created by Administrator on 2017/6/27.
 */
$(function() {
	var arr = [];
	$.get("http://127.0.0.1:3000/api/getcoupon", function(data) {
		var data = data.result;
		console.log(data);
		var str = '';
		for(var i = 0; i < data.length; i++) {
			str += '<li>' +
				'<a href="#">' +
				'<img src="' + data[i].couponImg + '" alt="" /> ' +
				'<p>' +
				data[i].couponTitle +
				'</p>' +
				'</a>' +
				'</li>'
		}
		$(".bigbox ul").append(str);
	})

	//点击li,让大盒子以及底下的nav消失,并且对应的优惠券列表显示出来
	$(".bigbox ul").on('click', 'li', function() {
		$(".bigbox ul").css('display', "none");
		$(".nav").css('display', "none");
		init($(this).index());
	})


	//点击优惠券,显示遮罩,并且让所有的图片加载到轮播图的ul中
	$(".productList ul").on("click", 'li', function() {

		$('.mask').css('display', 'block');

		var str = '';
		for(var i = 0; i < arr.length; i++) {
			str += '<li class="swiper-slide">' +
				arr[i] +
				'</li>';
		}
		$(".swiper-wrapper").append(str);

		//ul盒子设置宽度
		$(".swiper-wrapper").width(arr.length*200+'px');

		//点击让当前图片显示出来
		$(".swiper-wrapper").css("left",-$(this).index()*200+'px');

		//插件轮播图
		var mySwiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
    		loop: true,
		})

	})

	//点击遮罩,让遮罩消失
	$('.mask').on("click", function() {
		$(this).css('display', 'none');
	})

	$('.swiper-wrapper').on('click','li',function(e){
		e.stopPropagation();
	})

	function init(index) {
		$.get('http://127.0.0.1:3000/api/getcouponproduct?couponid=' + index, function(data) {
			data = data.result;
			console.log(data);

			var str = '';
			for(var i = 0; i < data.length; i++) {

				var img = data[i].couponProductImg;
				arr.push(img);

				str += '<li>' +
					'<a href="#">' +
					'<div class="pic fl">' +
					data[i].couponProductImg +
					'</div>' +
					'<div class="info fr">' +
					'<div class="title">' +
					'<h3>' + data[i].couponProductName + '</h3>' +
					'<h2>' +
					data[i].couponProductPrice +
					'</h2>' +
					'</div>' +
					'<div class="time">' +
					data[i].couponProductTime +
					'</div>' +
					'</div>' +
					'</a>' +
					'</li>';
			}
			$(".productList ul").append(str);
		})

	}

	function goBack(){
		history.back();
	}

	$(".back a").find("i").on('click',function(){
		goBack();
	})
})