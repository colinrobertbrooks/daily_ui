//document ready function
$( document ).ready(function(){
  //load challenge data and draw challenge elements newest first
  d3.json('data/challenges.json', function(data) {
    var challenges = data.challenges.reverse();
    drawChallenges(challenges);
  });
});

//challenge function
function drawChallenges (data) {
  data.forEach(function(d){
    $('#challenges-hook').append(
      '<div class="col-md-6 challenge">' +
        '<div class="challenge-border">' +
          '<h3>' + d.name + '</h3>' +
          '<a href="' + d.link + '" title="View challenge ' + d.name + '">' +
           '<img class="img-responsive center-block challenge-img" src="img/challenge_screenshots/' + d.image + '">' +
          '</a>' +
          '<p>' + d.description + '</p>' +
        '</div>' +
      '</div>'
    );
  });
}