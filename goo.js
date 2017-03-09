var svg = document.getElementById("svg");
var clear = document.getElementById("clear");

var circle = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    e.stopPropagation();
    c = drawCircle(x,y);
    svg.appendChild(c);
    c.addEventListener('click',changeColor(c));    
};

var drawCircle = function(x,y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttributeNS(null,"cx",x);
    c.setAttributeNS(null,"cy",y);
    c.setAttributeNS(null,"r",10);
    c.setAttributeNS(null,"fill","black");

    console.log("draw new circle");
    return c;
};

var changeColor = function(c) {
    c.setAttributeNS(null,"fill","grey");
    console.log("change color");
};

var Clear = function() {
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
};



svg.addEventListener('click',circle,false);
clear.addEventListener('click',Clear);
