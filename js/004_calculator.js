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
    //evaluate check
    if(key == ' = ') {
      //evaluate imediate and update lcd
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
    //otherwise process key and update imediate
    } else {
      //check if first character and process key
      if(oldImediate == '0') {
        //operator check (can't append an operator as first char; special case below for -)
        if([' + ',' * ',' / '].indexOf(key) == -1) {
          //decimal check
          if(key == '.' || oldImediate[oldImediate.length-1] == '.') {
            //append decimal to leading zero
            d3.select('#imediate').text(oldImediate + key);
          } else {
            //negative first char check
            if(key == ' - ') {
              //replace zero with negative char
              d3.select('#imediate').text('-');
            } else {
              //replace zero with number
              d3.select('#imediate').text(key);
            }
          }
          $('#evaluate-btn').prop('disabled', true);
        }
      //otherwise process key as subsequent char
      } else {
        //non-operator check
        if([' - ',' + ',' * ',' / '].indexOf(key) == -1) {
          //decimal check
          if(key == '.') {
            //ensure no more than one consecutive decimal and no more than one decimal in a number
            var decimalCheckArr = oldImediate.split(' ');
            if(oldImediate[oldImediate.length-1] != '.' && decimalCheckArr[decimalCheckArr.length - 1].indexOf('.') == -1) {
              //append decimal
              d3.select('#imediate').text(oldImediate + key);
            }
          //otherwise append number
          } else {
            //octal check
            if(oldImediate.slice(-2) == ' 0' || oldImediate.slice(-2) == '-0') {
              //overwrite leading zero with number to block octals
              d3.select('#imediate').text(oldImediate.substring(0,oldImediate.length - 1) + key);
            } else {
              //append number normally
              d3.select('#imediate').text(oldImediate + key);
            }
          }
          //check if at least one operator exists before enabling evaluate
          if(oldImediate.search(' ') != -1) {
            $('#evaluate-btn').prop('disabled', false);
          }
        //otherwise operator cases
        } else {
          //subtraction operator vs negative char cases
          if(key == ' - ') {
            //previous character was operator check
            if(oldImediate[oldImediate.length-1] != ' ') {
              //append subtraction operator if it won't be the third in a row of if it won't immediately follow an operator
              if(oldImediate != '-' && oldImediate.substring(oldImediate.length - 3) != '- -' && oldImediate.substring(oldImediate.length - 1) != '-') {
                d3.select('#imediate').text(oldImediate + key);
              }
            } else {
              //append negative char
              d3.select('#imediate').text(oldImediate + '-');
            }
            $('#evaluate-btn').prop('disabled', true);
          //remaining operator case
          } else {
            //check that last char was not an operator and not a negative char
            if(oldImediate[oldImediate.length-1] != ' ' && oldImediate.slice(-1) != '-') {
              //append operator normally
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