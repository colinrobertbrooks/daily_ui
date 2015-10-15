//global vars
var splashImages = [
  {link:"img/003_landing_page/1-min.jpg"},
  {link:"img/003_landing_page/2-min.jpg"},
  {link:"img/003_landing_page/3-min.jpg"},
  {link:"img/003_landing_page/4-min.jpg"},
  {link:"img/003_landing_page/5-min.jpg"},
];


//document ready functions
$(document).ready(function() {
  var screenWidth = $(document).width();
  if(screenWidth > 1200) {
    setSplashImage();
  }
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
  $('body#background')
    .css('background', 'url(' + splashImages[0].link + ') fixed center center')
    .css('-webkit-background-size', 'cover')
    .css('background-size', 'cover');
}

function positionSplashContent() {
  var screenHeight = $(window).height();
  var splashHeight = 315;
  $('.splash-content').css('padding-top', (screenHeight - splashHeight) * 0.4);
}

$( window ).resize(function() {
  var screenWidth = $(document).width();
  if(screenWidth > 1200) {
    setSplashImage();
  }
  positionSplashContent();
});


//email functions
function emailSubmit () {
  var input = $('#email-address')[0].value;
  if(validateEmail(input) === true) {
    $('#email-address').blur();
    $('#splash-email')
      .addClass('fadeOut animated');
    setTimeout(function() {
      $('#splash-email')
        .hide();
      $('#splash-email-success')
        .show()
        .addClass('bounceIn animated');
    }, 750);
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