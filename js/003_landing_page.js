//global vars
var splashImages = [
  {link:"../img/003_landing_page/1.jpg"},
  {link:"../img/003_landing_page/2.jpg"},
  {link:"../img/003_landing_page/3.jpg"},
  {link:"../img/003_landing_page/4.jpg"},
  {link:"../img/003_landing_page/5.jpg"},
];


//document ready functions
$(document).ready(function() {
  setSplashImage();
  positionSplashContent();
  setTimeout(function() {
    $('#splash-text-container')
      .show()
      .addClass('fadeInDown animated');
    $('#splash-email-container, #contact-container')
      .show()
      .addClass('fadeInUp animated');
  }, 200);
});


//splash functions
function setSplashImage () {
  splashImages = randomizeArray(splashImages);
  $('.splash')
    .css('position', 'relative')
    .css('height', '100%')
    .css('background', 'rgb(245, 246, 250) url(' + splashImages[0].link + ') fixed center center')
    .css('-webkit-background-size', 'cover')
    .css('background-size', 'cover')
    .css('color', '#fff');
}

function positionSplashContent() {
  var screenHeight = $(window).height();
  var splashHeight = 315;
  $('.splash-content').css('padding-top', (screenHeight - splashHeight) * 0.4);
}

$( window ).resize(function() {
  positionSplashContent();
});


//validate email functions
function emailSubmit () {
  var input = $('#email-address')[0].value;
  if(validateEmail(input) === true) {
    $('#contact-container')
      .hide()
      .removeClass('fadeInUp animated');
    $('#splash-email').addClass('fadeOutDownBig animated');
    setTimeout(function() {
      $('#splash-email').hide();
      $('#splash-email-success')
        .show()
        .addClass('fadeInUpBig animated');
    }, 400);
    setTimeout(function() {
      $('#contact-container')
        .show()
        .addClass('fadeIn animated');
    }, 1300);
  } else {
    $('#email-submit').css('pointer-events', 'none');
    $('#splash-email').addClass('shake animated');
    setTimeout(function() {
      $('#splash-email').removeClass('shake animated');
      $('#email-submit')
        .css('pointer-events', 'auto');
    }, 1001);
  }
}

$('#email-address').keyup(function(e) {
  if (e.which == 13) {
    emailSubmit();
  }
});


//helper functions
function randomizeArray (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}