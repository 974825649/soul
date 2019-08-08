// 产品标准库聚合的js
$(document).ready(function($) {		
	// 点击标题展开或折叠内容
	// 方法1：添加class
	// $('.sceneryShow_title').on('click',function(){ 
	// 	console.log('c ok');
	// 	console.log($(this).parent().siblings());		
	// 	if($(this).hasClass('hide')){
	// 		$(this).parent().siblings().fadeIn();
	// 		$(this).removeClass('hide');					
	// 	}else{
	// 		$(this).parent().siblings().fadeOut();
	// 		$(this).addClass('hide');	
	// 	}
	// }	
	$('.sceneryShow_title').on('click',function(){ 
		console.log('c ok');
		console.log($(this).parent().siblings().eq(0).is(':visible'));		
		if($(this).parent().siblings().eq(0).is(':visible')){
			$(this).parent().siblings().fadeOut();
		}else{
			$(this).parent().siblings().fadeIn();			
		}
	})
});
