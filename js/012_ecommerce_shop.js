//document ready function
$(document).ready(function(){
  $('.color-square').on('click', function () {
    var clickedColor = $(this).attr('id');
    colorSquareClick(clickedColor);
  });
  $('.product-tab').on('click', function () {
    var clickedTab = $(this).text().toLowerCase();
    productTabClick(clickedTab);
  });

});


//color square function
function colorSquareClick (color) {
  $('.color-square').removeClass('color-selected');
  switch(color) {
    case 'color-black':
      $('#color-black').addClass('color-selected');
      $('.fa-cog').css('color','black')
      break;
    case 'color-grey':
      $('#color-grey').addClass('color-selected');
      $('.fa-cog').css('color','grey')
      break;
    case 'color-red':
      $('#color-red').addClass('color-selected');
      $('.fa-cog').css('color','red')
      break;
    case 'color-orange':
      $('#color-orange').addClass('color-selected');
      $('.fa-cog').css('color','orange')
      break;
    case 'color-yellow':
      $('#color-yellow').addClass('color-selected');
      $('.fa-cog').css('color','yellow')
      break;
    case 'color-green':
      $('#color-green').addClass('color-selected');
      $('.fa-cog').css('color','green')
      break;
    case 'color-blue':
      $('#color-blue').addClass('color-selected');
      $('.fa-cog').css('color','blue')
      break;
  }
}


//product tab change function
function productTabClick (tab) {
  $('.product-tab').removeClass('active');
  $('.tab-content').hide();
  switch(tab) {
    case 'description':
      $('#description-tab').addClass('active');
      $('#description-content').show();
      break;
    case 'reviews':
      $('#reviews-tab').addClass('active');
      $('#reviews-content').show();
      break;
  }
}