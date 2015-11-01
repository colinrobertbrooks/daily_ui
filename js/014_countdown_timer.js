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
  var currentMinutes = minutes;
  var currentSeconds = seconds;
  function tick () {
    //decriment counter
    if ( currentSeconds > 0 ) {
      currentSeconds--;
      setTimeout(tick, 1000);
    } else {
      if(currentMinutes > 0) {
        currentSeconds = 59;
        currentMinutes--;
        setTimeout(tick, 1000);
      }
    }
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
  }
  tick();
}
