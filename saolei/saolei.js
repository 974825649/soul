//点击开启游戏 动态显示100div
//leftCick 没有雷 --> 显示数字 扩散模式(当前周围无雷)
// 有雷 --》 直接结束 ，弹出失败界面
//rightClick 有雷 --> 进行标记  有标记 -->取消标记 -->  标记是否正确，10都正确，提示成功 
// 有数字 --》没有反应

var startBtn = document.getElementsByClassName('btn')[0]; 
var box = document.getElementsByClassName('box')[0];
var boxFlag = document.getElementsByClassName('boxflag')[0];
var victory = document.getElementsByClassName('victory')[0];
var close = document.getElementsByClassName('close')[0];
var score = document.getElementsByClassName('score')[0];

var leiNum ;
var leiOver ;

var startGame = true;

bindEvent();

//开始游戏显示界面
function bindEvent(){
	startBtn.onclick = function(){
		if(startGame){
			box.style.display = 'block';
			boxFlag.style.display = 'block';
			init();	

			startGame = false;
		}else{
			box.style.display = 'none';
			boxFlag.style.display = 'none';
			box.innerHTML = '';
			score.innerHTML = '';
			startGame = true;
		}
		
	}
	victory.oncontextmenu = function(){
		return false;
	}
	box.oncontextmenu = function(){
		return false;
	}

	box.onmousedown = function(e){
		var event = e.target;
		if(e.which == 1){
			leftClick(event);
		}else if(e.which == 3){
			rightClick(event);
		}
	}

	close.onclick = function(){
		victory.style.display = 'none';
		close.style.display = 'none';
		box.style.display = 'none';
		boxFlag.style.display = 'none';
		box.innerHTML = '';
		score.innerHTML = '';
		startGame = true;
	}

}

//生成雷
function init(){	
	leiOver = 10;
	leiNum = 10;
	var leimap = [];
	score.innerHTML = leiOver;	
	for(var i = 0; i < 10; i++){  //创建小方块，赋值
		for(var j = 0; j < 10; j++){
			var con = document.createElement('div');
			con.classList.add('block');
			con.setAttribute('id', i + '-' + j);
			box.appendChild(con);
			leimap.push({lei: 0});
		}
	}
	block = document.getElementsByClassName('block');
	while(leiNum){       //随机生成雷
		var leiIndex = Math.floor(Math.random()*100);
		if(leimap[leiIndex].lei === 0){
			leimap[leiIndex].lei = 1;
			block[leiIndex].classList.add('isLei');
			leiNum--;
		}
	}
} 

//左键触发事件
function leftClick(dom){
	var isLei = document.getElementsByClassName('isLei');
	if(dom.classList.contains('flag')){               //左键flag无反应
		return;
	}else if(dom && dom.classList.contains('isLei')){ //左键雷全部展示
		var isLeiLength = isLei.length;
		for(var i = 0; i < isLeiLength; i++){
			isLei[i].classList.add('show');
		} 
		setTimeout(function(){							//弹出失败
			victory.style.display = 'block';
			victory.style.backgroundImage = 'url("img/defeat.jpg")';
			close.style.display = 'block';
		},500)
	}else{											//左键显示数字
		var n = 0;
		var posArr = dom && dom.getAttribute('id').split("-");
		var posX = posArr && +posArr[0];
		var posY = posArr && +posArr[1];
		dom && dom.classList.add('num');
		for(var i = posX - 1; i <= posX + 1; i++){
			for(var j = posY - 1; j <= posY + 1; j++){
				var aroundBox = document.getElementById(i + '-' + j);			
				if(aroundBox && aroundBox.classList.contains('isLei')){
					n++;
				}
			}
		}

		dom && (dom.innerHTML = n);
		if(n == 0){									//扩散算法
			for(var i = posX - 1; i <= posX + 1; i++){
				for(var j = posY - 1; j <= posY + 1; j++){
					var nearBox = document.getElementById(i + '-' + j);			
					if(nearBox && nearBox.length != 0){
						if(!nearBox.classList.contains('check')){
							nearBox.classList.add('check');
							leftClick(nearBox);
						}
					}					
				}
			}
		}
	}
}

function rightClick(dom){	

	if(dom.classList.contains('num')){			//数字无反应
		return;
	}else{										//有flag，flag取消，无，falg增加
		if(dom.classList.contains('flag')){
			dom.classList.remove('flag');
			leiOver++;
		}else{
			dom.classList.add('flag');
			 leiOver--;		
			
			if(leiOver == 0){
				var flag = document.getElementsByClassName('flag');
				var isLei = document.getElementsByClassName('isLei');
				var key = 0;									
				var isLeiLength = isLei.length;
				
				for(var i = 0; i < isLeiLength; i++){				
					if(!isLei[i].classList.contains('flag')){
						key = 1;
						break;
					}
				}
				console.log('b');
				
				if(key){					
					victory.style.backgroundImage = 'url("img/defeat.jpg")';
					console.log('zhixing');
				}else{
					victory.style.backgroundImage = 'url("img/victory.jpg")';					
				}			
				victory.style.display = 'block';
				close.style.display = 'block';
				
			}
	    }	
	    score.innerHTML = leiOver;
	}
}