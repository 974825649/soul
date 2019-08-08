// 单个景观展示界面的js
$(document).ready(function(){
	var imgs = $('.hp_carousel_img'); //轮播图的div
	var ul = $('.hp_carousel_img_ul'); //轮播图的ul
	var list = $('.hp_carousel_img li'); //轮播图的li
	list_w = parseInt($('.hp_carousel_img li').css('width')); //单个图片宽度
	var n = $('.hp_carousel_img li').length; //总的图片个数
	var left = parseInt($('.hp_carousel_img_ul').css('left')); //轮播图的左偏移量
	var auto;//定时器
	var index = 0; //当前选中图片索引
   //初始化函数
	function init(){
		wrap();
		autoplay();
		nextplay()
		prev();
		sp();
		docs();
	}
	init();
	//让ul根据图片制定宽度
	function wrap(){
		list.eq(0).clone().appendTo(ul);  
		ul.css('width',list_w * (n + 1) +'px');
	}
	function docs(){
		//动态创建i小按钮
		var creatdocs = "<i></i>"; 
		for(var i = 0;i < n;i ++){
			$(creatdocs).appendTo($('.carousel_btns_con'));
		}

		// 点击按钮改变轮播图
		$('.carousel_btns_con i').on('click',function(){ 
			$(this).addClass('on').siblings().removeClass('on');
			index = $('.carousel_btns_con i').index($('.on'));
			console.log(index);
			ul.stop().css('left',index * list_w * -1 +'px');
		})
		
	}
	//自动播放
	function autoplay(){
		auto = setInterval(function(){			
			// left -= list_w;
			// ul.animate({'left':left + 'px'},300,function(){   //轮播图滑动
			// 	console.log('index'+index);
			// 	// if(index == n){index = 0} //将第三张变为第一张
			// 	if(left <= -list_w * n){  //判断临界条件
			// 		left = 0;
			// 		ul.css('left',left +'px');
			// 		index = 0;
			// 	}				
			// ul.children().eq(index).addClass('checked').siblings().removeClass('checked');  //给选中的图片添加类check
			// index++;
			// });
			next();
		},1000)
	}
	function prev(){
		$('.carousel_btn.btn_prev').on('click',function(){
			console.log(index+'lef');
			if(index == 0){
				left = -1260;
				ul.css('left', left + 'px');
				console.log('ok');
			}
			ul.stop().animate({'left': left += list_w},300,function(){
			index--;
			if(index == 3){index = 0}
			$('.carousel_btns_con i').eq(index).addClass('on').siblings().removeClass('on');
				if(left <= -list_w*n){
					left = 0;
					ul.stop().css('left', left + 'px');
					index = 0;
				}
			})
		})	
	}
	function nextplay(){
		$('.carousel_btn.btn_next').on('click',function(){
			next();
		})
	}
	function next(){
		ul.stop().animate({'left': left -= list_w},300,function(){
		index++;
		if(index == 3){index = 0}
		console.log(index + 'se');
		$('.carousel_btns_con i').eq(index).addClass('on').siblings().removeClass('on');
			if(left <= -list_w*n){
				left = 0;
				ul.stop().css('left', left + 'px');
				index = 0;
			}
		})
	}
	//鼠标移动暂停事件
	function sp(){
		imgs.on('mouseenter',function(){
			clearInterval(auto);
		})
		imgs.on('mouseleave',function(){
			autoplay();
		})
	}
	// 创建小按钮添加事件


		// // 小按钮跟随轮播图运动
		// var doc = setInterval(function(){
		// 	var ind = ul.children().index($('.checked'));
		// 	ind +=1;
		// 	if(ind == 3){ind = 0};
		// $('.carousel_btns_con i').eq(ind).addClass('on').siblings().removeClass('on');
		// },2000)



})