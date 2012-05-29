var KEY={
	UP:38,
	DOWN:40,
	W:87,
	S:83
}

var pingpong={}
pingpong.pressedKeys=[]
pingpong.ball={
	speed:5,
	x:150,
	y:100,
	directionX:1,
	directionY:1
}

$(function(){
	//set interval to call gameloop every 30 milliseconds
	pingpong.timer=setInterval(gameloop,30);
	
	//mark down what key is down and into an array called "pressedKeys"
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.which]=true;
	})
	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which]=false;
	})	
})

function gameloop(){
	moveBall();
	movePaddles();
}

function moveBall(){
	
}

function movePaddles(){
	//use custom timer to continuously check if a key is pressed
	if(pingpong.pressedKeys[KEY.UP]){
		var top=parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN]){
		var top=parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top+5);
	}
	if(pingpong.pressedKeys[KEY.W]){
		var top=parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.S]){
		var top=parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top+5);
	}
}

// $(function(){
	// $("#paddleB").css("top","20px");
	// $("#paddleA").css("top","60px");
// 	
	// //listen to the key down event
	// $(document).keydown(function(e){
		// console.log(e.whitch);
		// switch(e.which){
			// case KEY.UP://arrow-up
				// var top=parseInt($("#paddleB").css("top"));
				// $("#paddleB").css("top",top-5);
				// break;
			// case KEY.DOWN:
				// var top=parseInt($("#paddleB").css("top"));
				// $("#paddleB").css("top",top+5);
				// break;
			// case KEY.W:
				// var top=parseInt($("#paddleA").css("top"));
				// $("#paddleA").css("top",top-5);
				// break;			
			// case KEY.S:
				// var top=parseInt($("#paddleA").css("top"));
				// $("#paddleA").css("top",top+5);
				// break;			
		// }
	// })
// })