function Box({svg,x,y,w,h,num1,num2,onStart}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.num1 = num1;
    this.num2 = num2;

    let g = svg.append("g").attr("class", "question").attr("opacity",1).attr("transform",`translate(${this.x},${this.y})`);
    let b1 = g.append("g").attr("class","box box1").attr("transform",`translate(0,0)`);
    let b2 = g.append("g").attr("class","box box2").attr("transform",`translate(${- 250},${0})`);
    let b3 = g.append("g").attr("class","start").attr("transform",`translate(${- 450},${0})`);

    b1.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("fill", "white")
        .attr("stroke", "#ccc")
        .attr("rx", 10)
        .attr("stroke-width", 2);
    
    b2.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("fill", "white")
        .attr("stroke", "#ccc")
        .attr("rx", 10)
        .attr("stroke-width", 2);

    

    b3.append("rect")
        .attr("width", this.w)
        .attr("height", this.h)
        .attr("stroke", "darkgreen")
        .attr("rx", 10)
        .attr("stroke-width", 2);

    g.append("text").attr("class", "box div")
        .attr("x", this.w/2 - 120 )
        .attr("y", this.h * .8 )
        .attr("font-size", 60)
        .attr("text-anchor", "middle")
        .text("÷");

    g.append("text").attr("class", "box equ")
        .attr("x", this.w/2 - 350)
        .attr("y", this.h * .8 )
        .attr("font-size", 60)
        .attr("text-anchor", "middle")
        .text("=");

    b1.append("text").attr("class", "box num num1")
        .attr("x", this.w/2)
        .attr("y", this.h * .8 )
        .attr("font-size", 40)
        .attr("text-anchor", "middle")
        .text(num1.arb());

    b2.append("text").attr("class", "box num num2")
        .attr("x", 90)
        .attr("y", this.h * .8 )
        .attr("font-size", 40)
        .attr("text-anchor", "middle")
        .text(num2.arb());

    b3.append("text").attr("class", "btn")
        .attr("x", 75)
        .attr("y", this.h * .8 )
        .attr("font-size", 40)
        .attr("fill", "darkgreen")
        .attr("text-anchor", "middle")
        .text("إبدأ");

    g.selectAll("g.box").on("click", function(){
        b3.attr("opacity",0);
        pad.fade();
        let box = d3.select(this);
        let x = d3.event.pageX - svg.node().getBoundingClientRect().x - 100;
        let y = d3.event.pageY - svg.node().getBoundingClientRect().y + 50;
        pad.moveTo(x,y);
        pad.output = box;
        pad.confirm = b3;
        box.select("text").text("_");
    });
    let that = this;
    b3.on("click", function(){ 
        that.num1 = g.select(".box1 text").text().toInt();
        that.num2 = g.select(".box2 text").text().toInt();
        g.transition().duration(500).attr("opacity",0);
        onStart(that.num1, that.num2); 
    });

    
}