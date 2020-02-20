let svg, width, height, handle;



window.addEventListener("load", start);


function start() {
svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%").style("background-color", "#def");

width = Number(svg.style("width").replace("px", ""));
height = Number(svg.style("height").replace("px", ""));



handle = new Handle(svg);
handle.draw();
handle.putDivisor(random(9999));
handle.putDivisee(random(99));

}

document.addEventListener("click", function (e) {
  handle.moveTo(e.clientX, e.clientY);
});