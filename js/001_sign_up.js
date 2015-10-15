$('#sign-up-form').formValidation({
    framework: 'bootstrap',
    fields: {
      name: {
        validators: {
          notEmpty: {
            message: 'Please enter your name'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'Please enter your email address'
          },
          emailAddress: {
            message: 'Please enter a valid email address'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'Password cannot be blank'
          },
          stringLength: {
            min: 8
          }
        }
      },
      confirmPassword: {
        validators: {
          notEmpty: {
            message: 'Password confirmation cannot be blank'
          },
          stringLength: {
            min: 8,
          },
          identical: {
            field: 'password',
            message: 'Password and password confirmation must match'
          }
        }
      }
    }
  })
  .on('err.form.fv', function(e) {
    $('#sign-up-modal').addClass('shake animated');
    setTimeout(function() {
      $('#sign-up-modal').removeClass('bounceInDown animated');
    }, 1300);
  })
  .on('success.form.fv', function(e) {
    e.preventDefault();
    $('#sign-up-modal').modal('hide');
    $('#sign-up-btn').hide();
    $('#success-message')
      .show()
      .addClass('bounceInDown animated');
  });
