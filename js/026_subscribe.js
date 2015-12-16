// document ready function
$(document).ready(function(){
  // bind event handlers
  $('#js-subscribe-open').on('click',function(){
    $('#js-modal').modal('show');
  });
  $('#js-subscribe-submit').on('click',function(){
    handleEmailSubmit();
  });
  $('#js-email-input').keyup(function(e) {
    if (e.which == 13) {
      handleEmailSubmit();
    }
  });
});


//email functions
function handleEmailSubmit () {
  var input = $('#js-email-input')[0].value;
  if(validateEmail(input) === true) {
    //hide subscribe-open button, close modal and show success
    $('#js-subscribe-open').hide();
    $('#js-modal').modal('hide');
    $('#js-subscribe-success')
      .show()
      .addClass('bounceIn animated');
  } else {
    // animate modal with incorrect email feedback
    $('#js-subscribe-submit').css('pointer-events', 'none');
    $('#js-modal').addClass('shake animated');
    setTimeout(function() {
      $('#js-modal').removeClass('shake animated');
      $('#js-subscribe-submit').css('pointer-events', 'auto');
    }, 1001);
  }
}

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}