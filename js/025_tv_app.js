//react
var Player = React.createClass({
  render: function() {
    return (
      <div className='player-container'>
        <iframe id="player" type="text/html" src={this.props.src} frameborder="0"></iframe>
      </div>
    );
  }
});

var Gallery = React.createClass({
  componentDidMount: function() {
    //initiate filickty
    $('#gallery').flickity({
      wrapAround: true,
      freeScroll: true,
      contain: true,
      pageDots: false,
      imagesLoaded: true
    });
  },
  handleImageSelect: function(e) {
    this.props.change(e.target.id.replace('video-',''));
  },
  render: function() {
    return (
      <div id='gallery' onClick={this.handleImageSelect}>
        <img id='video-1' className='gallery-video' src='img/025_tv_app/1.jpg' title='1) Do Schools Kill Creativity? by Ken Robinson' />
        <img id='video-2' className='gallery-video' src='img/025_tv_app/2.jpg' title='2) Your Body Language Shapes Who You Are by Amy Cuddy' />
        <img id='video-3' className='gallery-video' src='img/025_tv_app/3.jpg' title='3) How Great Leaders Inspire Action by Simon Sinek' />
        <img id='video-4' className='gallery-video' src='img/025_tv_app/4.jpg' title='4) The Power of Vulnerability by Brene Brown' />
        <img id='video-5' className='gallery-video' src='img/025_tv_app/5.jpg' title='5) My Stroke of Insight by Jill Bolte Taylor' />
        <img id='video-6' className='gallery-video' src='img/025_tv_app/6.jpg' title='6) he Thrilling Potential of SixthSense Technology by Pranav Mistry' />
        <img id='video-7' className='gallery-video' src='img/025_tv_app/7.jpg' title='7) 10 Things You Didnt Know About Orgasm by Mary Roach' />
        <img id='video-8' className='gallery-video' src='img/025_tv_app/8.jpg' title='8) Why We Do What We Do by Tony Robbins' />
        <img id='video-9' className='gallery-video' src='img/025_tv_app/9.jpg' title='9) The Puzzle of Motivation by Dan Pink' />
        <img id='video-10' className='gallery-video' src='img/025_tv_app/10.jpg' title='10) Underwater Astonishments by David Gallo' />
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      origin: window.location.origin,
      allVideoData: [],
      thisVideoID: '',
      thisVideoSpeaker: '',
      thisVideoTitle: '',
      thisVideoRank: '',
    };
  },
  componentDidMount: function () {
    this.loadData();
  },
  loadData: function () {
    //load data
    d3.csv('data/025_tv_app.csv',function(csv){
      //update state with video data
      this.setState({
        allVideoData: csv
      });
      //randomly select first video and update state for thisVideo
      var firstVideoRank = _.sample(csv).rank
      this.thisVideoChange(firstVideoRank);
    }.bind(this));
  },
  thisVideoChange: function(selection) {
    //filter allVideoData to selection
    var thisVideoData = this.state.allVideoData.filter(function(d){ return d.rank == selection; })[0];
    //update state
    this.setState({
      thisVideoID: thisVideoData.id,
      thisVideoSpeaker: thisVideoData.speaker,
      thisVideoTitle: thisVideoData.title,
      thisVideoRank: thisVideoData.rank
    });
    //update gallery
    $('#gallery').flickity().flickity( 'select', thisVideoData.rank - 1 );
    $('.gallery-video').removeClass('video-selected');
    $('#video-' + thisVideoData.rank).addClass('video-selected');
    setTimeout(function() {
      $('#gallery').flickity().flickity('resize');
    }, 600);
  },
  render: function() {
    return (
      <div id='app' className='row text-center'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <h3>Top 10 TED Talks</h3>
          {this.state.videoID != '' ? <p>You are watching <i>{this.state.thisVideoTitle}</i> by {this.state.thisVideoSpeaker} (ranked #{this.state.thisVideoRank})</p>: null}
          {this.state.videoID != '' ? <Player src={generateSource(this.state.thisVideoID, this.state.origin)} /> : null}
          <Gallery change={this.thisVideoChange} />
        </div>
        <div className='col-md-2'></div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);


//helper functions
function generateSource(videoID, origin) {
  var src = 'https://www.youtube.com/embed/' + videoID + '?controls=1&autohide=1&autoplay=1&origin=' + origin;
  return src
}