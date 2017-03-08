var svg = document.getElementById("svg");
var clear = document.getElementById("clear");

var circle = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    svg.appendChild(drawCircle(x,y));
};

var drawCircle = function(x,y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttributeNS(null,"cx",x);
    c.setAttributeNS(null,"cy",y);
    c.setAttributeNS(null,"r",10);
    c.setAttributeNS(null,"fill","black");
    c.addEventListener('click',changeColor);
    return c;
};

var Clear = function() {
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
};



svg.addEventListener('click',circle);
clear.addEventListener('click',Clear);
