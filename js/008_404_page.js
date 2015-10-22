//document ready functions
$(document).ready(function() {
  positionContent();
  $("#typed-text").typed({
    strings: ['Houston...','Houston, we have a problem...'],
    typeSpeed: 125,
    startDelay: 1500,
    backSpeed: 25,
    backDelay: 2500,
    loop: true
  });
});

//window resize function
$( window ).resize(function() {
  positionContent();
});

function positionContent() {
  var screenHeight = $(window).height();
  var contentHeight = $('#text-container').height();
  $('#text-container').css('padding-top', (screenHeight - contentHeight) * 0.3);
}
