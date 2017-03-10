var svg = document.getElementById("svg");
var clear = document.getElementById("clear");
var move = document.getElementById("move");
var stop = document.getElementById("stop");

var height = svg.getAttribute("height");
var width = svg.getAttribute("width");
console.log(height,width);

var interval

var circle = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    c = drawCircle(x,y);
    svg.appendChild(c);
};

var drawCircle = function(x,y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx",x);
    c.setAttribute("cy",y);
    c.setAttribute("r",10);
    c.setAttribute("fill","black");
    c.setAttribute("xVel",Math.floor((Math.random() < 0.5 ? -1 : 1)*Math.random()*15+1));
    c.setAttribute("yVel",Math.floor((Math.random() < 0.5 ? -1 : 1)*Math.random()*15+1));
    console.log("draw new circle");
    c.addEventListener('click',function(e){
	e.stopPropagation();
	if (c.getAttribute("fill") == "black"){
	    c.setAttribute("fill","grey");
	    console.log("change color");
	}else{
	    svg.removeChild(c);
	    svg.append(drawCircle(Math.floor(Math.random()*500+10),Math.floor(Math.random()*500+10)));
	};
    });
    return c;
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
	console.log(c);

	var newX = parseInt(c.getAttribute("cx")) + parseInt(c.getAttribute("xVel"));
	var newY = parseInt(c.getAttribute("cy")) + parseInt(c.getAttribute("yVel"));
	var r = parseInt(c.getAttribute("r"));
	console.log(newX,newY);

	c.setAttribute("cx",newX);
	c.setAttribute("cy",newY);
	if (newX-r<0 || newX+r>width){
	    var newXVel = (-1) * parseInt(c.getAttribute("xVel"));
	    c.setAttribute("xVel",newXVel);
	};
	if (newY-r<0 || newY+r>height){
	    var newYVel = (-1) * parseInt(c.getAttribute("yVel"));
	    c.setAttribute("yVel",newYVel);
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
