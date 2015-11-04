// validate receipt form
$(function() {
  $('#receipt').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      message: {
        required: true
      }
    },
    messages: {
      email: {
        required: "email is required"
      },
      message: {
        required: "um...yea, you have to write something to send this form.",
        minlength: "thats all? really?"
      }
    },
    submitHandler: function(form) {
      $(form).ajaxSubmit({
        type: "POST",
        data: $(form).serialize(),
        url: "/process.php",
        success: function() {
          $('#receipt :input').attr('disabled', 'disabled');
          $('#receipt').fadeTo("slow", 0.15, function() {
              $(this).find(':input').attr('disabled', 'disabled');
              $(this).find('label').css('cursor', 'default');
              $('#success').fadeIn();
          });
        },
        error: function() {
          $('#receipt').fadeTo("slow", 0.15, function() {
              $('#error').fadeIn();
          });
        }
      });
    }
  });
});
