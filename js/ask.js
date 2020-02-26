function ask({defaultValues, questionText, splitter, buttonText, callback}) {
    d3.select("#ask .btn").on("click", null);
    d3.select("#ask h2").text(questionText);

    d3.select("#ask").style("display", "block").style("opacity", 1);
    let div = d3.select("#ask > div");
    div.html("");
    for(let i=0; i<defaultValues.length; i++) {
        div.append("input")
            .attr("id", `in${i}`)
            .attr("type", "number")
            .attr("pattern", "[0-9]*")
            .attr("value", Number(defaultValues[i]))
            ;
        if(i==0) {
            div.append("div").attr("class", "splitter").html(splitter);
        }
    }
    div.append("div").attr("class", "splitter").html("=");
    let btn = div.append("button").attr("class", "btn").attr("type", "button").html(buttonText);
    btn.on("click", function(){
        let values = [];
        d3.selectAll("#ask input").nodes().forEach(function(n){
            values.push(Number(n.value));
        });
        if(callback) {
            callback(values);
        }
    });

}