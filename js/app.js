let svg, width, height, pad, handle;



window.addEventListener("load", start);

function start() {
  ask({
    defaultValues: [random(900, 2000), random(30)],
    splitter: " ÷ ",
    buttonText: "إبدأ",
    callback: (array) => {
      d3.select("#ask").transition().duration(1000).style("opacity", "0").style("height","0px").on("end", function(){
        d3.select(this).style("display", "none");
        let allTransform = `translate(${width/2}, ${height/2})`;
        

        if(width<500) {
          allTransform += " scale(0.7)";
        }
        let all = svg.append("g").attr("class", "all").attr("transform", allTransform);
        handle = new Handle({svg:all, numerator: array[0], denominator: array[1]});
        pad = new Pad({svg:all});
      });
    }
  });

  svg = d3.select("svg").attr("width", "100%").attr("height", "100%").style("background-color", "#def");

  width = Number(svg.style("width").replace("px", ""));
  height = Number(svg.style("height").replace("px", ""));

  
  // let box = new Box({svg:svg, x:width/2 + 100,y:100,w:150,h:50, num1: num, num2: den, onStart: function(num1,num2){
  //   handle = new Handle({svg:svg, numerator: num1, denominator: num2});
  // }});

  //

  
  

  //handle = new Handle({svg:svg, numerator: num, denominator: den});

  
  
  
}

// document.addEventListener("click", function (e) {
//   handle.moveTo(e.clientX, e.clientY);
// });