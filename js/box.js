function Box({svg,x,y,w,h,num1,num2}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.num1 = num1;
    this.num2 = num2;
    

    let g = svg.append("g").attr("class","box1").attr("transform",`translate(${this.x},${this.y})`);

    g.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("fill", "white")
        .attr("stroke", "#ccc")
        .attr("rx", 10)
        .attr("stroke-width", 2);
    
    g.append("rect")
        .attr("x", -250)
        .attr("y", 0)
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("fill", "white")
        .attr("stroke", "#ccc")
        .attr("rx", 10)
        .attr("stroke-width", 2);

    g.append("text").attr("class", "box div")
        .attr("x", this.w/2 - 130)
        .attr("y", this.h * .8 )
        .attr("font-size", 60)
        .attr("text-anchor", "middle")
        .text("÷");

    let n1 = g.append("text").attr("class", "box num num1")
        .attr("x", this.w/2)
        .attr("y", this.h * .8 )
        .attr("font-size", 40)
        .attr("text-anchor", "middle")
        .text(num1.arb());

    let n2 = g.append("text").attr("class", "box num num2")
        .attr("x", this.w/2 - 250)
        .attr("y", this.h * .8 )
        .attr("font-size", 40)
        .attr("text-anchor", "middle")
        .text(num2.arb());

    n1.on("click", function(){
        n1.text("_");
    });
}