//document ready function
$( document ).ready(function(){
  var postString = 'Played fetch today and it was ';
  var adjectives = ['awesome','great','amazing','wonderful','fantastic','excellent'];
  var passOptions = d3.range(20,41);
  var postCount = 1;
  //generate 10 posts
  while (postCount <= 11) {
    var dateText;
    if(postCount == 1) {
      dateText = 'yesterday';
    } else {
      dateText = postCount + ' days ago';
    }
    var postText = postString + _.sample(adjectives) + '! ' + _.sample(passOptions) + ' complete passes.';
    var postDate = 'Posted ' + dateText;
    drawPost(postText, postDate);
    postCount++;
  }
});

//post function
function drawPost (text, date) {
  $('#posts').append(
    '<div class="col-md-12">' +
      '<div class="post-container">' +
        '<div class="post-header">' +
          '<img alt="Ellie" src="img/006_user_profile/ellie.jpg" class="user-thumbnail">' +
          '<h4>Ellie</h4>' +
        '</div>' +
        '<div class="post-body">' +
          '<p>' + text + '</p>' +
          '<small>' + date + '</small>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

