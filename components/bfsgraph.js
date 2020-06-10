const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const Graph = require('@dagrejs/graphlib').Graph;

// Create a new directed graph

class BfsGraph extends D3Component {
  network = new Graph();

  initialize(node, props) {
    var network = this.network

    network.setNode(0, {x: 300, y: 50})
    network.setNode(1, {x: 150, y: 150})
    network.setNode(2, {x: 450, y: 150})
    network.setNode(3, {x: 50, y: 300})
    network.setNode(4, {x: 250, y: 300})
    network.setNode(5, {x: 400, y: 300})
    network.setNode(6, {x: 550, y: 300})
    network.setNode(7, {x: 150, y: 450})
    network.setNode(8, {x: 350, y: 450})

    network.setEdge(0, 1)
    network.setEdge(0, 2)
    network.setEdge(1, 3)
    network.setEdge(1, 4)
    network.setEdge(2, 5)
    network.setEdge(2, 6)
    network.setEdge(4, 7)
    network.setEdge(4, 8)

    
    var w = 600;
    var h = 600;

    var nodeCount=9

    var graph = d3.select(node).append('svg')
    .attr("class", "graphy")
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

    
    update(props, oldProps){
      bfs(this.network)
    }
}

function handleNodeMouseOver(d, i){
  d3.select(this)
    .attr("r", "30px")
    .attr("stroke", "blue");
}

function handleNodeMouseOut(d, i){
  d3.select(this)
    .attr("r", "20px")
    .attr("stroke", "#9d7463");
}

function bfs(network) {
  var queue = [];
  var start = 0;
  var end = 7;
  queue.push(start)
  bfsLoop(network, queue, end)
}

function bfsLoop(network, queue, end) {

  setTimeout(function () {
      var graph = d3.select(".graphy")

      graph.selectAll(".link").style("stroke-width", "4px")

      var next = queue.shift()
      if (next == end) {
          return
      }

      var circleNodes = graph.selectAll("circle2").data(network.node(next))

      circleNodes.enter().append("circle")
      .attr("class", "nodes")
      .attr("cx", function(d) {return d.x + 100;})
      .attr("cy", function(d) {return d.y + 100;})
      .attr("r", "40px")
      .attr("stroke-width", "4px") 
      .attr("fill", "yellow")
      .attr("stroke", "#9d7463");

      var currNodes = graph.selectAll("line2").data(network.outEdges(next))
      
      currNodes.enter().append("line")  
      .attr('class','redline')
      .attr("x1", function(d) {return network.node(d.v).x})
      .attr("y1", function(d) {return network.node(d.v).y})
      .attr("x2", function(d) {return network.node(d.w).x})
      .attr("y2", function(d) {return network.node(d.w).y})
      .style("stroke-width", "4px")
      .style("stroke", "#9d7463")
      .transition()
      .delay(300);

     
      network.outEdges(next).forEach(edge => {
          if (queue.indexOf(edge.w) === -1){queue.push(edge.w)}
      })

      bfsLoop(network, queue, end)
  }, 2000) 
}





module.exports = BfsGraph;