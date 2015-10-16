//document ready function
$( document ).ready(function(){
  //load project data and draw  projects
  d3.json('data/projects.json', function(data) {
    drawProjects(data.projects);
  });
});

//TODO: VALIDATE PATH FOR
//project function
function drawProjects (data) {
  data.forEach(function(d){
    $('#projects-hook').append(
      '<div class="col-md-6 project">' +
        '<div class="project-border">' +
          '<h3>' + d.name + '</h3>' +
          '<a href="' + d.link + '" title="View project ' + d.name + '">' +
           '<img class="img-responsive center-block project-img" src="img/project_screenshots/' + d.image + '">' +
          '</a>' +
          '<p>' + d.description + '</p>' +
        '</div>' +
      '</div>'
    );
  });
}