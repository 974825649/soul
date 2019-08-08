$(document).ready(function(){
	$('.ale').on('click',function(){ 
		//添加弹出框  
		var table ="<div class='table'></div>"; 
		var thead ="<div class='thead'>thead</div>";
		var tbody ="<div class='tbody'>tbody</div>";
		var tfoot ="<div class='tfoot'></div>";
		$('.main .content').append(table);
		$('.main .content .table').append(thead + tbody +tfoot);
		//添加页脚按钮
		var btn = "<button></button>"
		$('.tfoot').append(btn);
		$('.tfoot button').text('魂魄空灵');
		//添加关闭按钮
		$('.thead').append("<div>X</div>");
		$('.thead').children().addClass('close');
		//关闭按钮绑定事件
		$('.close').on('click',function(){
			console.log('ok');
			$('.table').remove();
		})
		//绑定鼠标事件
		var x,y;
		var isopen = false;
		$('.thead').on('mousedown',function(e){
			var e = e || window.event;
			//获取鼠标当前距离弹窗的位置
			x = e.clientX - $('.table').offset().left;
			y = e.clientY - $('.table').offset().top;
			isopen = true;
		})
		$(document).on('mousemove',function(e){
			if(isopen){
				var e = e || window.event;
				//判断弹窗的窗口距离
				var movex = e.clientX - x - $('.content').offset().left;
				var movey = e.clientY - y - $('.content').offset().top;
				//判断鼠标移动过快
				if(e.clienx <  $('.table').offset().left || e.clienty < $('.table').offset().top ||
					e.clientX > parseInt($('.thead').css('width')) +  $('.table').offset().left ||
					e.clienty > parseInt($('.thead').css('height')) +  $('.table').offset().top){
					isopen = false;
					console.log(isopen);
				}
				$('.table').css({'left': movex + 'px',
								 'top':  movey + 'px'
								})	
			}else{
				return;
			}		
		})
		$('.thead').on('mouseup',function(e){
			isopen = false;
		})		
	})
})