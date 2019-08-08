// 公共的js
$(document).ready(function(){
	//评价表提交不能为空判断	
	$('.main_demo_content.result .resultbtn').on('click',function(){
		var resultTextareaTitle = $('.main_demo_content.result  .resultTextareaTitle').val();
		var resultTextareaContent = $('.main_demo_content.result  .resultTextareaContent').val();
		if(!(resultTextareaTitle && resultTextareaContent)){
			alert('标题或内容不能为空');
		}else{
			alert('评价已经发送，正在审核中...')
		}
	})
	// 折叠列表
	$(".foldU li").on('click', function(){
		//阻止事件冒泡
		event.stopPropagation();
		console.log($(this).children('ul'));
		if($(this).children('ul').length > 0){
        	if($(this).children('ul').is(':visible')){
        		$(this).children('ul').fadeOut();
        		$(this).children('i').addClass('add').removeClass('sub').removeClass('mid');
        		$(this).children('ul').children('li').children('i').addClass('mid');
        	}else{
        		$(this).children('ul').fadeIn();
        		$(this).children('i').addClass('sub').removeClass('add');
        	}
		}
     })
})