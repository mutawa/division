let svg, width, height, handle;


Number.prototype.arb = function () {
    let text = String(this).replace(/0/g, "٠")
        .replace(/1/g, "١")
        .replace(/2/g, "٢")
        .replace(/3/g, "٣")
        .replace(/4/g, "٤")
        .replace(/5/g, "٥")
        .replace(/6/g, "٦")
        .replace(/7/g, "٧")
        .replace(/8/g, "٨")
        .replace(/9/g, "٩");

    return text;
}

function Handle(svg) {

    const h = svg.append("g").attr("class", "handle").attr("transform", `translate(${width / 2},150)`);

    this.hh = h;

    this.draw = function () {
        h.append("line").attr("x1", -10).attr("x2", 220).attr("y1", 10).attr("y2", 10);
        h.append("line").attr("x1", -10).attr("x2", -10).attr("y1", 10).attr("y2", 70);
        h.append("line").attr("x1", -10).attr("x2", -90).attr("y1", 70).attr("y2", 70);
    }

    this.putDivisor = function (num) {

        h.append("text")
            .attr("class", "divisor")
            .attr("transform", `translate(0,60)`).text(num.arb());
    }
    this.putDivisee = function (num) {

        h.append("text")
            .attr("class", "divisee")
            .attr("transform", `translate(-20,60)`).text(num.arb());
    }
    this.moveBy = function (x, y) {
        let txt = h.attr("transform").replace("translate(", "").replace(")", "");
        let x0 = Number(txt.split(",")[0]);
        let y0 = Number(txt.split(",")[1]);

        h.transition().duration(500).attr("transform", `translate(${x0 + x},${y0 + y})`);
    }
    this.moveTo = function (x, y) {

        h.transition().duration(500).attr("transform", `translate(${x},${y})`);
    }
}


window.addEventListener("load", start);


function start() {
svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%").style("background-color", "#def");

width = Number(svg.style("width").replace("px", ""));
height = Number(svg.style("height").replace("px", ""));



handle = new Handle(svg);
handle.draw();
handle.putDivisor(parseInt(Math.random()*99999));
handle.putDivisee(parseInt(Math.random()*999));

}

document.addEventListener("click", function (e) {
  handle.moveTo(e.clientX, e.clientY);
});