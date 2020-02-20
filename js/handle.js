
function Handle({numerator,denominator,svg}) {
    this.num = numerator;
    this.den = denominator;
    svg.selectAll(".handle").transition().attr("opacity",0).on("end", function(){ d3.select(this).remove(); });

    const h = svg.append("g").attr("class", "handle")
                            .attr("opacity","1")
                            .attr("transform", `translate(${width / 2},150)`);

    this.hh = h;

    this.draw = function () {
        h.append("line").attr("x1", -10).attr("x2", 220).attr("y1", 10).attr("y2", 10);
        h.append("line").attr("x1", -10).attr("x2", -10).attr("y1", 10).attr("y2", 70);
        h.append("line").attr("x1", -10).attr("x2", -90).attr("y1", 70).attr("y2", 70);
    }

    this.putNumerator = function () {

        h.append("text")
            .attr("class", "numerator")
            .attr("transform", `translate(140,-20)`).text(this.num.arb())
            .transition()
            .delay(1000)
            .attr("transform", `translate(0,60)`);


    }
    this.putDenomintator = function () {

        h.append("text")
            .attr("class", "denominator")
            .attr("transform", `translate(-60,-20)`).text(this.den.arb())
            .transition()
            .delay(2000)
            .attr("transform", `translate(-20,60)`);
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

    this.draw();
    this.putNumerator();
    this.putDenomintator();

    let that = this;
    svg.on("click",function() {
        let coords = d3.mouse(this);
        let x = coords[0];
        let y = coords[1];
        //that.moveTo(x,y);
      });
}

