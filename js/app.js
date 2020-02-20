let svg, width, height, pad, handle;



window.addEventListener("load", start);

function start() {
  svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%").style("background-color", "#def");

  width = Number(svg.style("width").replace("px", ""));
  height = Number(svg.style("height").replace("px", ""));

  let num = random(900);
  let den = random(40);

  let box = new Box({svg:svg, x:width/2 + 100,y:100,w:150,h:50, num1: num, num2: den, onStart: function(num1,num2){
    handle = new Handle({svg:svg, numerator: num1, denominator: num2});
  }});

  pad = new Pad({svg:svg});

  
  

  //handle = new Handle({svg:svg, numerator: num, denominator: den});

  
  
  
}

// document.addEventListener("click", function (e) {
//   handle.moveTo(e.clientX, e.clientY);
// });