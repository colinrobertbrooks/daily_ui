//map view vars
var projection;
var mapSVG;
var mapG;

//document ready function
$(document).ready(function(){
  queue()
  .defer(d3.json, 'data/020_location_tracker/us.json')
  .defer(d3.csv, 'data/020_location_tracker/candidates.csv')
  .awaitAll(function(error, data) {
    drawUSMap(data[0]);
    drawMapPoints(data[1]);
  });
});

//map resize function
$(window).resize(function() {
  var mapWidth = $('#map').width();
  mapSVG.attr('width', mapWidth);
  mapSVG.attr('height', mapWidth * 0.5);
});


//map functions
function drawUSMap (json) {
  //setup svg dimensions
  var viewBoxWidth = 960;
  var viewBoxHeight = viewBoxWidth * 0.5;
  var mapWidth = $('#map').width();
  var mapHeight = mapWidth * 0.5;
  //define map projection
  projection = d3.geo.albersUsa()
    .translate([viewBoxWidth/2, viewBoxHeight/2])
    .scale(viewBoxWidth);
  //define path generator
  var path = d3.geo.path()
    .projection(projection);
  //create svg element
  mapSVG = d3.select('#map')
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight)
    .attr('width', mapWidth)
    .attr('height', mapHeight)
    .attr('id', 'us-svg');
  //append g element to svg
  mapG = mapSVG.append('g');
  //bind data and create one path per state feature
  mapG.selectAll('path')
   .data(json.features)
   .enter()
   .append('path')
   .attr('d', path)
   .attr('class', 'state')
   .attr('id', function(d) { return d.id;})
   .style('fill', '#fff');
}

function drawMapPoints (data) {
  mapG.selectAll('.map-point')
  .data(data)
    .enter().append('circle')
    .attr('class','map-point')
    .attr('cx', function(d) {
      return projection([d.lon, d.lat])[0];
    })
    .attr('cy', function(d) {
      return projection([d.lon, d.lat])[1];
    })
    .attr('r', 3)
    .style('opacity', 0)
    .style('fill', function(d){
      if(d.party == 'R'){
        return 'red';
      } else {
        return 'blue';
      }
    })
    .style('stroke','black')
    .on('mouseover', function(d) {
      mapPointTooltipShow(d);
    })
    .on('mouseout', function() {
      tooltipHide();
    });
  d3.selectAll('.map-point')
    .transition()
    .duration(1000)
    .style('opacity', 1);
}

function mapPointTooltipShow (hoverObj) {
  //create tooltip
  var tooltip = d3.select('body').append('div')
    .attr('id', 'map-tooltip')
    .attr('class', 'tooltip');
  tooltip
    .html('<h4>' + hoverObj.name + '</h4>' + '<p>' + hoverObj.status + ' in ' + hoverObj.loc + '</p>');
  //position tooltip
  var mouse = d3.mouse(d3.select('body').node()).map( function(d) { return parseInt(d); } );
  var screenWidth = $('body').width();
  var tooltipWidth = $('#map-tooltip').width();
  if((mouse[0] + tooltipWidth) > screenWidth) {
    tooltip
      .style('left', (mouse[0] + (screenWidth - (mouse[0] + tooltipWidth + 5))) + 'px')
      .style('top', (mouse[1] + 20) + 'px');
  } else {
    tooltip
      .style('left', mouse[0] + 'px')
      .style('top', (mouse[1] + 20) + 'px');
  }
  //add style
  if(hoverObj.party == 'R'){
    $('.tooltip h4').css('background-color','rgba(255,0,0,0.35)');
  } else {
    $('.tooltip h4').css('background-color','rgba(0,0,255,0.35)');
  }
  //show tooltip
  tooltip
    .transition()
    .duration(300)
    .style('opacity', .95);
}

function tooltipHide () {
  d3.selectAll('.tooltip')
    .remove();
}
