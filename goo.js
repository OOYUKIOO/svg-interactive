var svg = document.getElementById("svg");
var clear = document.getElementById("clear");
var move = document.getElementById("move");
var stop = document.getElementById("stop");

var height = svg.getAttribute("height");
var width = svg.getAttribute("width");

var interval;

var circle = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    c = drawCircle(x,y,20);
    svg.appendChild(c);
};

var drawCircle = function(x,y,r){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx",x);
    c.setAttribute("cy",y);
    c.setAttribute("r",r);
    c.setAttribute("fill","black");
    c.setAttribute("xVel",Math.floor((Math.random() < 0.5 ? -1 : 1)*Math.random()*15+1));
    c.setAttribute("yVel",Math.floor((Math.random() < 0.5 ? -1 : 1)*Math.random()*15+1));
    console.log("draw new circle");
    c.addEventListener('click',function(e){
	clickCircle(e,c);
    });
    return c;
};

var clickCircle = function(e,c){
    e.stopPropagation();
    if (c.getAttribute("fill") == "black"){
	c.setAttribute("fill","grey");
	console.log("change color");
    }else{
	svg.removeChild(c);
	svg.appendChild(drawCircle(Math.floor(Math.random()*500+10),Math.floor(Math.random()*500+10),20));
    };
};

var Clear = function() {
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
};

var Move = function() {
    var circles = svg.childNodes;
    for(var i = 0; i < circles.length; i++){
	var c = circles[i];
	var oldX = parseInt(c.getAttribute("cx"));
	var oldY = parseInt(c.getAttribute("cy"));
	var newX = oldX + parseInt(c.getAttribute("xVel"));
	var newY = oldY + parseInt(c.getAttribute("yVel"));
	var r = parseInt(c.getAttribute("r"));
	if ((oldX < width/2 && newX >= width/2) || (oldX > width/2 && newX <= width/2)){
	    console.log("pass",c);
	    var newR = Math.floor(parseInt(c.getAttribute("r"))/2);
	    var newVel = (-1) * parseInt(c.getAttribute("xVel"));
	    if (newR <= 2){
		console.log("remove",c);
		svg.removeChild(c);
	    }else{
		c.setAttribute("cx",newX);
		c.setAttribute("cy",newY);
		c.setAttribute("r",newR);
		var splitC = drawCircle(oldX,oldY,newR);
		splitC.setAttribute("xVel",newVel);
		svg.appendChild(splitC);
		console.log(c,splitC);
	    };
	}else{
	    if (newX-r<0 || newX+r>width){
		var newXVel = (-1) * parseInt(c.getAttribute("xVel"));
		c.setAttribute("xVel",newXVel);
	    };
	    if (newY-r<0 || newY+r>height){
		var newYVel = (-1) * parseInt(c.getAttribute("yVel"));
		c.setAttribute("yVel",newYVel);
	    };
	    c.setAttribute("cx",newX);
	    c.setAttribute("cy",newY);
	};
    };
};

var startMove = function(){
    interval = setInterval(Move,100);
};

var stopMove = function(){
    clearInterval(interval);
};

svg.addEventListener('click',circle,false);
clear.addEventListener('click',Clear);
move.addEventListener('click',startMove);
stop.addEventListener('click',stopMove);
