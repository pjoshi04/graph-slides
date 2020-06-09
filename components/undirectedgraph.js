const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const Graph = require('@dagrejs/graphlib').Graph;

// Create a new directed graph

class UnDirectedGraph extends D3Component {

  initialize(node, props) {
    var network = new Graph();

    network.setNode(0, {x: 100, y: 100})
    network.setNode(1, {x: 200, y: 200})
    network.setNode(2, {x: 100, y: 300})
    network.setNode(3, {x: 300, y: 150})
    network.setNode(4, {x: 350, y: 50})
    network.setNode(5, {x: 450, y: 250})
    network.setNode(6, {x: 500, y: 150})
    network.setNode(7, {x: 550, y: 50})

    network.setNode(8, {x: 560, y: 200})
    network.setNode(9, {x: 500, y: 350})
  

    network.setEdge(0, 1)
    network.setEdge(1, 2)
    network.setEdge(1, 3)
    network.setEdge(3, 4)
    network.setEdge(3, 5)
    network.setEdge(4, 6)
    network.setEdge(5, 6)
    network.setEdge(6, 7)

    network.setEdge(8, 9)

    var svg = d3.select(node).append('svg');
    
    var w = 600;
    var h = 400;

    var nodeCount=9

    var graph = d3.select(node).append('svg')
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", "-100px")
    .style("margin-left", "200px");
    //.style("padding", "20 20 20 20");

    var path = graph.append("g") 

    path.append("svg:defs").append("svg:marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr('refX', -20)//so that it comes towards the center.
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    var links = path.selectAll( "line.link" )
    .data( network.edges() )
    .enter().append( "path" )//append path
    .attr( "class", "link" )
    .style( "stroke", "#565c5e" )
    //.attr('marker-start', "url(#arrow)")//attach the arrow from defs
    .style( "stroke-width", 4 );
    
    links
    .attr( "d", function(d) {
        return "M" + network.node(d.v).x + "," + network.node(d.v).y + ", " +
        network.node(d.w).x + "," + network.node(d.w).y
    })

    // path.selectAll('text')
    // .data(network.edges())
    // .enter()
    // .append('text')
    //          .attr('class', 'barsEndlineText')
    //          .attr('text-anchor', 'right')
    //           .attr("x", function(d) {return network.node(d.v).x + (network.node(d.w).x - network.node(d.v).x)/2})
    //          .attr("y", function(d) {return  network.node(d.v).y - 5 + (network.node(d.w).y - network.node(d.v).y)/2})
    //          .text(function(d) {
    //              return distance(
    //                  network.node(d.v).x, 
    //                  network.node(d.v).y, 
    //                  network.node(d.w).x,
    //                  network.node(d.w).y)
    //                 }
    //         )

    graph.selectAll("circle").data(network.nodes()).enter().append("circle").attr("class", "nodes")
    .attr("cx", function(d) {return network.node(d).x;})
    .attr("cy", function(d) {return network.node(d).y;})
    .attr("r", "20px")
    .attr("stroke-width", "4px") 
    .attr("fill", "#dfdbd8")
    .attr("stroke", "#9d7463")
    .on("mouseover", handleNodeMouseOver)
    .on("mouseout", handleNodeMouseOut)
    }
  }

function handleNodeMouseOver(d, i){
  // d3.select(this)
  //   .attr("stroke-width", "6px")
  //   .attr("stroke", "#455954")
  //   .attr("r", "40px")
}

function handleNodeMouseOut(d, i){
  // d3.select(this)
  //   .attr("r", "30px")
  //   .attr("stroke", "#9d7463");
}


module.exports = UnDirectedGraph;