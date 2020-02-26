let svg, width, height, pad, handle;



window.addEventListener("load", start);

function start() {
  ask({
    questionText: "ما هي نتيجة القسمة",
    defaultValues: [random(900, 2000), random(30)],
    splitter: " ÷ ",
    buttonText: "إبدأ",
    callback: createHandle
  });

  svg = d3.select("svg").attr("width", "100%").attr("height", "100%").style("background-color", "#def");

  width = Number(svg.style("width").replace("px", ""));
  height = Number(svg.style("height").replace("px", ""));
}

function createHandle(array) {

      
    d3.select(".all").remove();
    d3.select("#ask").transition().duration(1000).style("opacity", "0").style("height","0px")
      .on("end", function(){
        d3.select(this).style("display", "none");
        let allTransform = `translate(${width/2}, ${height/4})`;
        if(width<500) {
          allTransform += " scale(0.7)";
        }
        
        let all = svg.append("g").attr("class", "all").attr("transform", allTransform);
        handle = new Handle({svg:all, numerator: array[0], denominator: array[1]});
        pad = new Pad({svg:all});
    });
}
// document.addEventListener("click", function (e) {
//   handle.moveTo(e.clientX, e.clientY);
// });