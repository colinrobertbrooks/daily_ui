//document ready function
$(document).ready(function(){
  //bind light functions to switch
  $('#light-switch').change(function() {
    var switchStatus = $(this).prop('checked');
    if(switchStatus == true) {
      lightsOn();
    } else {
      lightsOff();
    }
  });
});


//light functions
function lightsOn () {
  d3.select("body")
    .transition()
    .duration(1000)
    .style("background-color", "#fff");
  d3.selectAll('.transition-text')
    .transition()
    .duration(1000)
    .style("color", "#333");
}

function lightsOff () {
  d3.select("body")
    .transition()
    .duration(1000)
    .style("background-color", "#333");
  d3.selectAll('.transition-text')
    .transition()
    .duration(1000)
    .style("color", "#fff");
}