function Pad({svg}) {
    this.x = width/2;
    this.y = height/2;

    let g = svg.append("g").attr("class", "pad").attr("opacity",0).attr("transform", `translate(${this.x},${this.y}) scale(2)`);
    let h = 20;
    let w = 40;

    let text = [1,2,3,4,5,6,7,8,9,"↵", 0, "⌫"];
    let i = 0;
    for(let y=0; y<80; y+= h + 3) {
        for(let x=0; x<100; x += w + 3) {
            let tg = g.append("g").attr("class", "num").attr("transform", `translate(${x},${y})`);

            tg.append("rect").attr("x",0).attr("y",0)
                .attr("height", h)
                .attr("width", w)
                .attr("stroke", "#ccc")
                .attr("rx", 2)
                ;
            tg.append("text").text(function(){
                if(!isNaN(text[i])) { return text[i].arb(); }
                return text[i];
            }).attr("text-anchor", "middle").attr("x", w/2).attr("y", h*.75);
            i++;
        }
    }
    g.select(".num:nth-child(10) rect").attr("class", "enter");
    g.select(".num:nth-child(12) rect").attr("class", "clear");

    let enter = g.select(".num:nth-child(10)");

    
    this.fade = function() {
        g.transition().duration(500)
            .attr("opacity", 0)
            .attr("transform", `translate(${this.x},${this.y + 200})`)
            .on("end", function(){
            svg.on("click", moveToClick);
        });
        
    }

    svg.on("click", moveToClick);

    let that = this;
    enter.on("click", function(){
        that.fade();
        
    });

    function moveToClick() {
        let coords = d3.mouse(this);
        that.x = coords[0];
        that.y = coords[1];
        g.transition().duration(500)
            .attr("opacity", 1)
            .attr("transform", `translate(${that.x-100},${that.y+50}) scale(2)`);
        svg.on("click", null);
    }

}