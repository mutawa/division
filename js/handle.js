
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

