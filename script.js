let data = d3.csv('cities.csv', d3.autoType).then(data=>{
	console.log('cities', data);
    let filtered_data = data.filter(d => d.eu == true);
    //checking to make sure data was filtered
    console.log(filtered_data);
    d3.select('.city-count').text("The number of cities in the EU:"+ filtered_data.length);
    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
		.append('svg')
        .attr('width', width)
        .attr('height', height);

        var x = d3.scaleLinear().domain([0,700]).range([0,width]);
        var y = d3.scaleLinear().domain([0,550]).range([0,height]);

        var node = svg.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle");
        
        node.attr("cx", function(d){
        return x(d.x);
        })
        .attr("cy", function(d){
            return y(d.y);
        })


        .attr("r", function(d){
            if (d.population > 1000000){

                return r = 8;
            }
            else if (d.population< 1000000){
                return r = 4;
            }
        }) //4 pixel, need double the size for over 1 mil pop
//create labels for the circles     
        svg.selectAll("text")
        .data(filtered_data)
        .enter()
        .append("text")
	.attr("text-anchor", 'center')
        .text(function(d){
            if (d.population > 1000000){
                return d.city;
            }
            else if (d.population<1000000){
                return null;
            }
            //prints out correct outputs
            console.log(d.city)
        })
        .attr("x", function(d){
                return x(d.x);
            })
        .attr("y", function(d){
                return y(d.y -10);
            })

        


let bar_data = d3.csv('buildings.csv',d3.autoType).then(bar_data =>{
    console.log('buildings', bar_data);
    let sorted_bar_data = bar_data.sort((firstItem, secondItem) => secondItem.height_ft - firstItem.height_ft);
    //printing out the sorted bar data
    //console.log(sorted_bar_data);
    const width = 500;
    const height = 500;
    const svg  = d3.select('.heightchart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

/*
    var x = d3.scaleBand()
        .domain([0,d3.)])
        .range([0,width]);

    var y = d3.scaleLinear()
        .domain([0,500])
        .range([0, height]);    */
    svg.selectAll('rect')

        .data(sorted_bar_data)
        .enter()
        .append('rect')
        .attr('width', d => d.height_px)
        .attr('height', d => 30)
        .attr('x', 220)
        .attr('y', (d,i) => (i * 50))
        .attr('fill', 'lightblue')
        .attr("class", "rect")
        .on('click', (event,d)=>{
    //this changes the values in the table based on what rect is clicked
            d3.select('.building-name').text(d.building)
            d3.select('.height').text(d.height_ft)
            d3.select('.country').text(d.country)
            d3.select('.floors').text(d.floors)
            d3.select('.Completed').text(d.completed)
            d3.select('.image')
            .attr('src',"img/"+ d.image);
            //d3.select('.image').attr('src', d.image)
            console.log(d.image);
        })
/*
    //interactivity
        d3.selectAll('rect')
        .append('rect')
        .attr("class", "rect")
        .on('click', function(d){
            d3.select('.building-name').text(d.building)
            d3.select('.height').text(d.height_ft)
            d3.select('.country').text(d.country)
            d3.select('.floors').text(d.floors)
            d3.select('.completed').text(completed)
            //document.querySelector(".building-name")
            //return d.building;
            

        })

*/
    svg.selectAll(".text1")
        .data(sorted_bar_data)
        .enter()
        .append("text")
        .attr('class', 'text1')
        .attr('text-anchor', 'start')
        .text(function(d){
                return d.building;
        })
        .attr('height', 0)
        .attr("x",0)
        .attr("y", (d,i) => ((i*50) +15))

    svg.selectAll(".text2")
        .data(sorted_bar_data)
        .enter()
        .append("text")
        .attr('class', 'text2')
        //.attr('text-anchor', 'end')
        .text(function(d){
                return (d.height_ft);
        })
        .attr('height', d=>30)
        .attr("x",d=>d.height_px + 180)
        .attr("y", (d,i) => ((i*50) +17));




      /*  .join('rect')
            .attr('x', (d,i) => x(i))
            .attr('y', (d) => y(d.height))
            .attr('height', d => d.height)
            .attr('width', width)
    
*/
/*    
    const bar_width = 500;
    const bar_height = 500;
    const svg = d3.select(".heightchart")
        .append('svg')
        .attr('width', bar_width)
        .attr('height', bar_height)
    
    var x = d3.scaleBand()
        .domain([0,d3.range(bar_data.length)])
        .range([0,bar_width]);

    var y = d3.scaleLinear()
        .domain([0,500])
        .range([0, bar_height]);
    var node = svg.selectAll('rect')
        .data(sorted_bar_data)
        .append('rect')
        .join('rect')
        .attr('fill', 'blue')
        .enter();

    node.attr('x', (d,i) => x(i))
    .attr('y', (d,i) => y(d.height))
    .attr('bar_height', d=> y(0) - y(d.height))
    .attr('bar_width', x.bandwidth())
    svg.node();
*/
})
})
