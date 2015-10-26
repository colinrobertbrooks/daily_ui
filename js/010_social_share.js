$(document).ready(function(){
  var docURL = document.URL;
  $('.share-on-facebook').attr('href','https://www.facebook.com/sharer/sharer.php?u=' + docURL);
  $('.share-on-twitter').attr('href','https://twitter.com/share?url=' + docURL);
  $('.share-on-google-plus').attr('href','https://plus.google.com/share?url=' + docURL);
});
