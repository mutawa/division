function Pad({svg}) {
    this.x = 0;
    this.y = 0;
    this.scale = 0;

    let g = svg.append("g").attr("class", "pad").attr("opacity",0).attr("transform", `translate(${this.x},${this.y}) scale(${this.scale})`);
    let h = 20;
    let w = 40;

    //g.append("circle").attr("fill","darkgreen").attr("r",10);
    g.append("path").attr("d","M0,0 L20,8 L60,8 L60,90 L-62,90 L-62,8 L-20,8 z").attr("fill", "white").attr("stroke-width", 0.25).attr("stroke", "black");


    let buttons = [1,2,3,4,5,6,7,8,9,"↵", 0, "⌫"];

    let buttonsEnter = g.selectAll("g.num").data(buttons).enter();

    buttonsEnter.append("g").attr("class", "num").attr("transform",function(d,i){
        let y = Math.floor(i/3) * h + 10;
        let x = Math.floor(i%3) * w -60;
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
    
    g.select(".num:nth-child(11) rect").attr("class", "enter");
    g.select(".num:nth-child(13) rect").attr("class", "clear");

    let enter = g.select(".num:nth-child(10)");

    
    this.fade = function() {
        this.scale = 0;

        g.transition().duration(500)
            .attr("opacity", 0)
            .attr("transform", `translate(${this.x},${this.y}) scale(${this.scale})`)
            ;
        
    }

    this.moveTo = function(x,y) {
        this.x = x;
        this.y = y;
        this.scale = 2;

        g.transition().duration(500)
            .attr("opacity", 1)
            .attr("transform", `translate(${this.x},${this.y}) scale(${this.scale})`);
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