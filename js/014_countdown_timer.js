//document ready function
$(document).ready(function(){
  //bind update default select values on dropdown change
  $('#minutes-selection').change(function (){
    if($('#minutes-selection').val() != 'select' && $('#seconds-selection').val() == 'select') {
      $('#seconds-selection').prop('selectedIndex',1);
    }
  });
  $('#seconds-selection').change(function (){
    if($('#seconds-selection').val() != 'select' && $('#minutes-selection').val() == 'select') {
      $('#minutes-selection').prop('selectedIndex',1);
    }
  });
});


//timer functions
function startTimer() {
  var min = $('#minutes-selection').val();
  var sec = $('#seconds-selection').val();
  $('#select').hide();
  $('#timer').show();
  countdown('countdown', min, sec);
}

function resetTimer () {
  $('#timer').removeClass('flash animated');
  $('#minutes-selection').prop('selectedIndex',0);
  $('#seconds-selection').prop('selectedIndex',0);
  $('#select').show();
  $('#timer').hide();
  $('#reset').hide();
  $('#countdown').css('background-color','#449d44');
}

function countdown (target, minutes, seconds) {
  //set initial duration
  var currentMinutes = (minutes == "select" ? 0 : minutes);
  var currentSeconds = (seconds == "select" ? 0 : seconds);
  function decrement () {
    //update display
    var display = d3.select('#' + target);
    if(currentMinutes == 0 && currentSeconds == 0) {
      playAlert('glass');
      display.text('DONE!');
      $('#countdown').css('background-color','#d9534f');
      $('#timer').addClass('flash animated');
      $('#reset').show();
    } else {
      var minString = (currentMinutes < 10 ? "0" : "") + currentMinutes.toString();
      var secString = (currentSeconds < 10 ? "0" : "") + String(currentSeconds);
      display.text(minString + ":" + secString);
    }
    //decriment duration
    if ( currentSeconds > 0 ) {
      currentSeconds--;
      setTimeout(decrement, 1000);
    } else {
      if(currentMinutes > 0) {
        currentSeconds = 59;
        currentMinutes--;
        setTimeout(decrement, 1000);
      }
    }
  }
  decrement();
}
