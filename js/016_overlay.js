//document ready function
$(document).ready(function(){
  //append svg element
  var svg = d3.select('#svg-container').append('svg')
    .attr('width', 200)
    .attr('height', 75);

  //append svg shapes
  var square = svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 50)
    .attr('height', 50)
    .style('stroke', '#2D4059')
    .style('fill', '#EA5455')
    .attr('data-tooltip-text','This is a square')
    .attr('data-tooltip-bg-color','#EA5455');

  var circle = svg.append("circle")
    .attr("cx", 100)
    .attr("cy", 35)
    .attr("r", 25)
    .style('stroke', '#2D4059')
    .style('fill', '#F07B3F')
    .attr('data-tooltip-text','This is a circle')
    .attr('data-tooltip-bg-color','#F07B3F');

  var triangle = svg.append('polygon')
    .attr('points', '160,10, 135,60, 185,60')
    .style('stroke', '#2D4059')
    .style('fill', '#FFD460')
    .attr('data-tooltip-text','This is a triangle')
    .attr('data-tooltip-bg-color','#FFD460');
});

//bind tooltips to mouse events
$(function() {
  //default tooltip settings
  var offsetX = 15;
  var offsetY = 25;
  var tooltipOpacity = 0.8;
  // select all tags having a data-tooltip-text attribute
  $('[data-tooltip-text]').mouseenter(function(e) {
    //get the value of the data-tooltip text and bg-color attributes
    var tooltip = $(this).attr('data-tooltip-text');
    var tooltipBackgroundColor = $(this).attr('data-tooltip-bg-color');
    //check if tooltip exists
    if(tooltip !== '') {
      //tooltip exists; assign it to a custom attribute
      $(this).attr('tooltipElement',tooltip);
    }
    //assign tooltipElement to variable
    var tooltipElement = $(this).attr('tooltipElement');
    //check if tooltipElement exists
    if(tooltipElement !== '') {
      //append tooltip element to body
      $("body").append('<div id="tooltip">' + tooltipElement + '</div>');
      //set x and y coordinates for tooltip
      $('#tooltip').css('left', e.pageX + offsetX );
      $('#tooltip').css('top', e.pageY + offsetY );
      //set background color for tooltip
      $('#tooltip').css('background-color', tooltipBackgroundColor);
      //add fade in effect for tooltip
      $('#tooltip').fadeIn('500');
      $('#tooltip').fadeTo('10', tooltipOpacity);
    }
  }).mousemove(function(e) {
    var x = e.pageX;
    var y = e.pageY;
    var tipToBottom, tipToRight;
    //distance to the right
    tipToRight = $(window).width() - (x + offsetX + $('#tooltip').outerWidth() + 5);
    //check if tooltip is too close to the right
    if(tipToRight < offsetX) {
      x = e.pageX + tipToRight;
    }
    //distance to the bottom
    tipToBottom = $(window).height() - (y + offsetY + $('#tooltip').outerHeight() + 5);
    //check if tooltip is too close to the bottom
    if(tipToBottom < offsetY) {
      y = e.pageY + tipToBottom;
    }
    //assign tooltip position
    $('#tooltip').css('left', x + offsetX );
    $('#tooltip').css('top', y + offsetY );
  }).mouseleave(function() {
    //remove tooltip element
    $("body").children('div#tooltip').remove();
  });
});