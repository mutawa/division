function Pad({svg}) {
    this.x = width/2;
    this.y = height/2;

    let g = svg.append("g").attr("class", "pad").attr("opacity",0).attr("transform", `translate(${this.x},${this.y}) scale(0)`);
    let h = 20;
    let w = 40;

    let buttons = [1,2,3,4,5,6,7,8,9,"↵", 0, "⌫"];

    let buttonsEnter = g.selectAll("g.num").data(buttons).enter();

    buttonsEnter.append("g").attr("class", "num").attr("transform",function(d,i){
        let y = Math.floor(i/3) * h;
        let x = Math.floor(i%3) * w;
        return `translate(${x},${y})`;
    }).append("rect").attr("x",0).attr("y",0)
        .attr("height", h-2)
        .attr("width", w-2)
        .attr("stroke", "#ccc")
        .attr("rx", 2);

    buttonsEnter.selectAll(".num")
        .append("text").attr("class", "digit")
        .text(function(d,i){
            if(!isNaN(d)) { return d.arb(); }
            return d;
        })
            .attr("x", w/2)
            .attr("y", h*.75)
        ;
    
    g.select(".num:nth-child(10) rect").attr("class", "enter");
    g.select(".num:nth-child(12) rect").attr("class", "clear");

    let enter = g.select(".num:nth-child(10)");

    
    this.fade = function() {
        g.transition().duration(500)
            .attr("opacity", 0)
            .attr("transform", `translate(${this.x},${this.y + 200}) scale(0)`)
            .on("end", function(){
                that.confirm.attr("opacity",1);
            });
        
    }
    this.moveTo = function(x,y) {
        
        g.transition().duration(500)
            .attr("opacity", 1)
            .attr("transform", `translate(${x},${y}) scale(2)`);
        svg.on("click", null);
    }

    g.selectAll(".num").on("click", function(d){

        let text = that.output.select("text");

        let n = text.text().replace("_",0).toInt() * 10;
        if(isNaN(d)) { text.text("_"); return; }
        text.text((n+d).arb());
    });

    

    let that = this;
    enter.on("click", function(){
        that.fade();
        
    });

    
}