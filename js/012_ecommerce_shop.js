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
    case 'color-1':
      $('#color-1').addClass('color-selected');
      $('.fa-cog').css('color','black')
      break;
    case 'color-2':
      $('#color-2').addClass('color-selected');
      $('.fa-cog').css('color','#5f1b00')
      break;
    case 'color-3':
      $('#color-3').addClass('color-selected');
      $('.fa-cog').css('color','#91300a')
      break;
    case 'color-4':
      $('#color-4').addClass('color-selected');
      $('.fa-cog').css('color','#d34f1e')
      break;
    case 'color-5':
      $('#color-5').addClass('color-selected');
      $('.fa-cog').css('color','#eca106')
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