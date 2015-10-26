function d3Piano () {
  //setup svg dimensions
  var viewBoxWidth = 960;
  var viewBoxHeight = viewBoxWidth * 0.44;
  var pianoWidth = $('#piano-container').width();
  var pianoHeight = pianoWidth * 0.44;
  //create svg element
  pianoSVG = d3.select("#piano-container")
    .append("svg")
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight)
    .attr('width', pianoWidth)
    .attr('height', pianoHeight);
  //load key data
  d3.json('data/009_music_player.json', function(data){
    //define white and black keys
    var whiteKeys = _.filter(data.keys, function(k){ return k.sharp == false; });
    var blackKeys = _.filter(data.keys, function(k){ return k.sharp == true; });
    //draw white keys
    pianoSVG.selectAll('.white-key')
      .data(whiteKeys)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return i * 64;
      })
      .attr('y', 0)
      .attr('width', 60)
      .attr('height', 400)
      .attr('class', 'white-key')
      .append("svg:title")
        .text(function(d) {
          return d.data;
        });
    //draw black keys
    var blackPositions = [42, 106, 234, 299, 362, 490, 555, 682, 747, 812];
    pianoSVG.selectAll('.black-key')
      .data(blackKeys)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return blackPositions[i];
      })
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 260)
      .attr('class', 'black-key')
      .append("svg:title")
        .text(function(d) {
          return d.data;
        });
      //add audio
      addAudio();
    });
}

//document ready function
$(document).ready(function(){
  var pianoSVG = d3Piano();

});

//window resize function
$(window).resize(function() {
  var pianoWidth = $('#piano-container').width();
  pianoSVG.attr('width', pianoWidth);
  pianoSVG.attr('height', pianoWidth * 0.44);
});

//audio function
function addAudio () {
  var over = "ontouchstart" in window ? "touchstart" : "mouseover";
  var out = "ontouchstart" in window ? "touchend" : "mouseout";
  var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
  if (!AudioContext) return console.error("AudioContext not supported");
  if (!OscillatorNode.prototype.start) OscillatorNode.prototype.start = OscillatorNode.prototype.noteOn;
  if (!OscillatorNode.prototype.stop) OscillatorNode.prototype.stop = OscillatorNode.prototype.noteOff;
  var context = new AudioContext;
  d3.selectAll('.white-key, .black-key')
    .on(over + ".beep", function(d, i) {
      console.log(d);
      var now = context.currentTime,
          oscillator = context.createOscillator(),
          gain = context.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = d.frequency;
      gain.gain.linearRampToValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(.6, now + .1);
      gain.gain.linearRampToValueAtTime(0, now + 1);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(0);
      setTimeout(function() { oscillator.stop(); }, 1500);
    });
}

