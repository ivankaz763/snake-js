var canvas =document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var snake = [{x:10,y:10}];
var fruit ={};
var score=0;
var dir='';
var dostupkKlave=true;
var fps=0;

var keyUp= document.getElementById('keyUp'); //38
var keyLeft= document.getElementById('keyLeft');//37
var keyDown= document.getElementById('keyDown');//39
var keyRight= document.getElementById('keyRight');//40

document.onkeydown=function(event){
	if (dostupkKlave){
	if ((event.keyCode==37||event.keyCode==65)&&(dir!='rigth'))  dir='left';
	if ((event.keyCode==38||event.keyCode==87)&&(dir!='down'))  dir='up'; 
	if ((event.keyCode==39||event.keyCode==68)&&(dir!='left'))  dir='right';
	if ((event.keyCode==40||event.keyCode==83)&&(dir!='up'))  dir='down';
	if (event.keyCode==69||event.keyCode==32) dir='puse';
	if (event.keyCode==81) dir='automat';

}
}


//======================================================================
CreateEat();
game();

function game()
{
dostupkKlave=true;
ctx.clearRect(0,0,632,632);
collision();
eatFruit();
drawEat();
stepSnake();
DrawSnake()
drawScore();
setTimeout('game()',2000);
}

//=======================================================================
function collision(){
	if (snake.length>4){
	var x=snake[0].x;
	var y=snake[0].y;
	for( var i=4;i<snake.length;i++){
		if (x==snake[i].x && y==snake[i].y){
			dir='lose';
			snake=[{x:10,y:10}];
			CreateEat();

		}

	}
	}
}
function stepSnake(){


	var x=0;
	var y=0;
	var obj={};// сохраняем голову
	obj.x=snake[0].x;
	obj.y=snake[0].y;
	if (dir=='left') x=-1;
	if (dir=='right') x=+1;
	if (dir=='up') y=-1;
	if (dir=='down') y=+1;
	if (dir=='automat') {x=x;y=y;}
	if (dir=='puse') {x=x;y=y;}
	obj.x=Borti(obj.x+x);;
	obj.y=Borti(obj.y+y);;
	//удаляем хвость
	if (dir){
		snake.pop();//удаляем ласт 
		snake.unshift(obj);//добавляем в начало массива

	}
}
function Borti(val){
	if(val<0)val=20;
	if(val>20)val=0;
	return val;
}

function eatFruit(){
	var x=snake[0].x;
	var y=snake[0].y;
	
if (fruit.x==x && fruit.y==y){
	addSnake();
	stepSnake();

return;
}

}

function addSnake(){
	var x=snake[0].x;
	var y=snake[0].y;
	var head={};
	head.x=x;
	head.y=y;
	snake.unshift(head);
	CreateEat();
	score++;
}
//===============================================================
function DrawSnake() {
	ctx.fillStyle = 'maroon';
	for(var i=0;i<snake.length;i++){
		var x=snake[i].x*30+2;
		var y=snake[i].y*30+2;
		ctx.fillRect(x,y,28,28);

		}

}

function CreateEat(){
	var x=Math.floor(Math.random()*21);
	var y=Math.floor(Math.random()*21);
	for (var i = 0; i < snake.length; i++) {
		if(x ==snake[i].x && y==snake[i].y){
			CreateEat();
			return;
		}

	}
fruit.x=x;
fruit.y=y;
}
//===============================================================
function drawEat(){
	var x=fruit.x*30+2;
	var y=fruit.y*30+2;



	ctx.fillStyle ='red';

	ctx.fillRect (x,y,28,28);
}

//===============================================================

function drawScore(){
	var board=document.getElementById('score');
	if (dir){
		board.innerHTML='Очки:'+score;
	}
	
	else{
		board.innerHTML='Сыграем в игру?';
	}
	 if (dir =="puse") board.innerHTML='Пауза';
	 if (dir =="lose") {board.innerHTML='Ти проиграл ((('; score=0;}
	 if (dir =="automat") {
	 	board.innerHTML='Пауза';
	 	alert('Можно автомат по мультимедии ?');
	 	alert('да ну пожалуйста?!');
	 	alert('Можно хотябы пару лекций пропустить только чтобы вот без "на зачёте припомню " ))');
	 	dir='puse';
	 }
}