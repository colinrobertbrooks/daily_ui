//document ready
$(document).ready(function(){
  computerInitiateGame();
  $("#user-selection").change(function (){
    var computerSelection = computerPickNumber();
    var userSelection = $(this).val();
    flashResult(computerSelection, userSelection);
  });
});


//computer functions
function computerInitiateGame () {
  $("#computer-prompt")
    .data('typed', null)
    .typed({
      strings: ["I'm thinking of a number between 1 and 10... care to guess?"],
      typeSpeed: 20,
      startDelay: 250,
      onStringTyped: function() {
        $('#user-selection').fadeIn('fast');
      }
    });
}

function computerPickNumber () {
  var numPossibilities = d3.range(1,11);
  var numberPicked = _.sample(numPossibilities)
  return numberPicked;
}


//flash result function
function flashResult(computer, user) {
  //update prompt
  $('.typed-cursor').remove();
  $('#computer-prompt').text('Thanks for playing! ');
  $('#user-selection').hide();
  $('#reset-btn').show();
  //determine result
  var result;
  var resultText;
  if(+computer == +user){
    result = 'correct';
    resultText = "That's right! I was thinking of " + computer + '.';
  } else {
    result = 'incorrect';
    resultText = "Sorry! You guessed " + user + ". I was thinking of " + computer + '.';
  }
  //reset modal
  $('#status-container').removeClass('bg-success bg-danger');
  $('.modal-title').removeClass('text-success text-danger');
  $('.modal-title i').removeClass('fa fa-check fa-times');
  $('.modal-title span').text('');
  //set modal based on result
  if(result == 'correct'){
    $('#status-container').addClass('bg-success');
    $('.modal-title').addClass('text-success');
    $('.modal-title i').addClass('fa fa-check');
    $('.modal-title span').text('Your Guess Was Correct');
  } else {
    $('#status-container').addClass('bg-danger');
    $('.modal-title').addClass('text-danger');
    $('.modal-title i').addClass('fa fa-times');
    $('.modal-title span').text('Your Guess Was Incorrect');
  }
  $('#computer-result').text(resultText);
  $('#flash-modal').modal('show');
}


//reset game function
function resetGame () {
  $('#flash-modal').modal('hide');
  $('#user-selection').prop('selectedIndex',0);
  $('#reset-btn').hide();
  computerInitiateGame();
}