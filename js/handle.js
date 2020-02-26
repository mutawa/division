
function Handle({numerator,denominator,svg}) {
    this.num = numerator;
    this.den = denominator;

    svg.selectAll(".handle").transition()
                                .attr("opacity",0)
                                .on("end", () => { d3.select(this).remove(); });

    const h = svg.append("g").attr("class", "handle")
                            .attr("opacity","1")
                            .attr("transform", `translate(${0},${0})`);

    this.hh = h;

    this.draw = function () {
        h.append("line").attr("x1", 0).attr("x2", 220).attr("y1", 10).attr("y2", 10);
        h.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 10).attr("y2", 70);
        h.append("line").attr("x1", 0).attr("x2", -90).attr("y1", 70).attr("y2", 70);
    }

    this.putNumerator = function () {
        let g = h.append("g").attr("class", "numerator").attr("transform", `translate(140,-200)`);
        g.append("circle").attr("r",5).attr("fill", "red").attr("stroke", "none");

        let dg = g.selectAll(".digits").data(this.num.arb().split("")).enter().append("g").attr("class", "digit");
        dg.attr("transform", (d,i) => `translate(${i*40},0)`)
        
        dg.append("rect")
            .attr("class", "holder")
            .attr("x", -35/2)
            .attr("width", 35)
            .attr("y", -40)
            .attr("height", 45)
            .attr("rx", 4)
            .attr("opacity", 0);

        dg.append("circle").attr("r",4).attr("fill", "red").attr("stroke-width", 1);


        dg.append("text")
            .attr("x",  15)
            .text(d => d);

        dg.on("click", function(){
            let ax = Number(d3.select(this.parentNode).attr("transform").replace(/[^\d,]/g,'').split(',')[0]);
            let ay = Number(d3.select(this.parentNode).attr("transform").replace(/[^\d,]/g,'').split(',')[1]);
            let dx = Number(d3.select(this).attr("transform").replace(/[^\d,]/g,'').split(',')[0]);
            let dy = Number(d3.select(this).attr("transform").replace(/[^\d,]/g,'').split(',')[1]);
            pad.moveTo(ax + dx, ay + dy);
        });
        
        g.transition()
            .delay(1000)
            .attr("transform", `translate(25,60)`);

        dg.selectAll(".holder").transition().delay(3000).duration(1000).attr("opacity", 0.5);



        h.append("text")
            .attr("class", "symbol")
            .attr("opacity", 1)
            .attr("transform", `translate(50,-200)`).text(" ÷ ")
            .transition()
            .duration(1000)
            .delay(2000)
            .attr("opacity", `0`)
            .on("end", ()=>{
                d3.select(".symbol").remove();
            });


    }
    this.putDenomintator = function () {

        h.append("text")
            .attr("class", "denominator")
            .attr("transform", `translate(-140,-200)`).text(this.den.arb())
            .transition()
            .delay(2000)
            .attr("transform", `translate(-80,60)`);
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

