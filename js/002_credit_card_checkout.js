$(document).ready(function() {
  $('#cc-form').formValidation({
      framework: 'bootstrap',
      fields: {
        card: {
          validators: {
            notEmpty: {
              message: 'A credit card number is required'
            },
            creditCard: {
              message: 'The credit card number is not valid'
            }
          }
        },
        expiration: {
          verbose: false,
          validators: {
            notEmpty: {
              message: 'The expiration date is required'
            },
            regexp: {
              message: 'The expiration date must be YYYY/MM',
              regexp: /^\d{4}\/\d{1,2}$/
            },
            callback: {
              message: 'The expiration date is expired',
              callback: function(value, validator, $field) {
                var sections = value.split('/');
                if (sections.length !== 2) {
                  return {
                    valid: false,
                    message: 'The expiration date is not valid'
                  };
                }
                var year = parseInt(sections[0], 10),
                  month = parseInt(sections[1], 10),
                  currentMonth = new Date().getMonth() + 1,
                  currentYear = new Date().getFullYear();
                if (month <= 0 || month > 12 || year > currentYear + 10) {
                  return {
                    valid: false,
                    message: 'The expiration date is not valid'
                  };
                }
                if (year < currentYear || (year == currentYear && month < currentMonth)) {
                  return {
                    valid: false,
                    message: 'The expiration date is expired'
                  };
                }
                return true;
              }
            }
          }
        },
        security: {
          validators: {
            notEmpty: {
              message: 'The security code is required'
            },
            stringLength: {
              min: 3,
              max: 4
            }
          }
        }
      }
    })
    .on('success.validator.fv', function(e, data) {
      if (data.field === 'card' && data.validator === 'creditCard') {
        switch (data.result.type) {
          case 'AMERICAN_EXPRESS':
            $('.cc-icon').css('color', '#B0B0B0');
            $('.fa-cc-amex').css('color', '#5DB8D3');
            break;
          case 'DISCOVER':
            $('.cc-icon').css('color', '#B0B0B0');
            $('.fa-cc-discover').css('color', '#EA6E1D');
            break;
          case 'MASTERCARD':
            $('.cc-icon').css('color', '#B0B0B0');
            $('.fa-cc-mastercard').css('color', '#CC0000');
            break;
          case 'VISA':
            $('.cc-icon').css('color', '#B0B0B0');
            $('.fa-cc-visa').css('color', '#16216A');
            break;
        }
      }
    })
    .on('err.field.fv', function(e, data) {
      if (data.field === 'card') {
        $('.cc-icon').css('color', '#B0B0B0');
      }
    })
    .on('success.form.fv', function(e) {
      e.preventDefault();
      $('#total, #cc-form-container, #cc-icons').hide();
      $('#card-numbers').collapse('hide');
      $('#success-message')
        .show()
        .addClass('slideInLeft animated');
    });
});
