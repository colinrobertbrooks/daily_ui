var keyMap = [
  {code: 48, key: 0},
  {code: 49, key: 1},
  {code: 50, key: 2},
  {code: 51, key: 3},
  {code: 52, key: 4},
  {code: 53, key: 5},
  {code: 54, key: 6},
  {code: 55, key: 7},
  {code: 56, key: 8},
  {code: 57, key: 9},
  {code: 46, key: '.'},
  {code: 43, key: ' + '},
  {code: 45, key: ' - '},
  {code: 73, key: ' * '},
  {code: 47, key: ' / '},
  {code: 13, key: ' = '},
  {code: 61, key: ' = '}
];

function simulateKeyPress(character) {
  $( document ).trigger({type: 'keypress', which: character, keyCode: character});
}

$( document ).keypress(function(e) {
  var filteredKeys = keyMap.filter(function(c){ return c.code == e.keyCode; });
  if(filteredKeys.length === 1){
    var key = filteredKeys[0].key;
    var oldImediate = $('#imediate').text();
    if(key == ' = ') {
      //evaluate
      d3.select('#history')
        .append('p')
        .text(oldImediate + ' = ')
          .append('span')
          .text(parseFloat(eval(oldImediate)));
      d3.select('#history').append('p')
        .text('-------------------------')
        .classed('new-line','true');
      d3.select('#imediate').text('0');
      $('#evaluate-btn').prop('disabled', true);
    } else {
      //first char cases
      if(+oldImediate == 0) {
        //can't add an operator or a decimal in first char
        if([' + ',' * ',' / '].indexOf(key) == -1) {
          //decimal check
          if(key == '.' || oldImediate[oldImediate.length-1] == '.') {
            //decimal first char case
            d3.select('#imediate').text(oldImediate + key);
          } else {
            //negative first char case
            if(key == ' - ') {
              // 0 with negative char
              d3.select('#imediate').text('-');
            } else {
              //replace 0 with first number
              d3.select('#imediate').text(key);
            }
          }
          $('#evaluate-btn').prop('disabled', true);
        }
      //subsequent char cases
      } else {
        //non-operator case
        if([' - ',' + ',' * ',' / '].indexOf(key) == -1) {
          //decimal check
          if(key == '.') {
            //ensure no more than one consecutive decimal and no more than 1 in a number
            var decimalCheckArr = oldImediate.split(' ');
            if(oldImediate[oldImediate.length-1] != '.' && decimalCheckArr[decimalCheckArr.length - 1].indexOf('.') == -1) {
              //add decimal
              d3.select('#imediate').text(oldImediate + key);
            }
          } else {
            //add non-operator char
            d3.select('#imediate').text(oldImediate + key);
          }
          //check if at least one operator exists before enabling evaluate
          if(oldImediate.search(' ') != -1) {
            $('#evaluate-btn').prop('disabled', false);
          }
        //operator cases
        } else {
          //minus case
          if(key == ' - ') {
            //previous character check
            if(oldImediate[oldImediate.length-1] != ' ') {
              //subtraction operator if it won't be the 3rd consecutive
              if(oldImediate.substring(oldImediate.length - 3) != '- -') {
                d3.select('#imediate').text(oldImediate + key);
              }
            } else {
              //negative char
              d3.select('#imediate').text(oldImediate + '-');
            }
            $('#evaluate-btn').prop('disabled', true);
          //remaining case
          } else {
            //check if last char was an operator
            if(oldImediate[oldImediate.length-1] != ' ') {
              d3.select('#imediate').text(oldImediate + key);
            }
            $('#evaluate-btn').prop('disabled', true);
          }
        }
      }
    }
    //scroll lcd to bottom
    $('#lcd').animate({scrollTop: $('#lcd')[0].scrollHeight}, 0);
  }
});