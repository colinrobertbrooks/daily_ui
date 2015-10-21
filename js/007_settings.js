//react
var TextInput = React.createClass({
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <div className='input-group'>
            <input type='text' className='form-control text-center' id='user-input' placeholder='Enter text to style...' aria-describedby='message-send' onKeyPress={this.props.enterKeySubmit}></input>
            <span className='input-group-addon' id='user-input-submit' title='Submit for styling' onClick={this.props.buttonSubmit}><i className='fa fa-pencil'></i></span>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
});

var StyleViewer = React.createClass({
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-3'></div>
        <div className='col-md-6 text-center'>
          <div id='style-this-container'>
            <p id='style-this'>{this.props.text}</p>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
});

var StyleControls = React.createClass({
  componentDidMount: function () {
    //font size
    $('#font-size-slider').slider({
      min: 10,
      max: 50,
      step: 1,
      value: 12
    }).on('slide', function( event, ui ) {
      $('#style-this').css('font-size', ui.value + 'px');
    });
    //font color
    var red = 0;
    var green = 0;
    var blue = 0;
    $('#font-red-slider').slider({
      min: 0,
      max: 255,
      step: 1,
      value: 0
    }).on('slide', function( event, ui ) {
      red = ui.value;
      updateColor('style-this', red, green, blue);
    });
    $('#font-green-slider').slider({
      min: 0,
      max: 255,
      step: 1,
      value: 0
    }).on('slide', function( event, ui ) {
      green = ui.value;
      updateColor('style-this', red, green, blue);
    });
    $('#font-blue-slider').slider({
      min: 0,
      max: 255,
      step: 1,
      value: 0
    }).on('slide', function( event, ui ) {
      blue = ui.value;
      updateColor('style-this', red, green, blue);
    });
  },
  render: function() {
    return (
      <div id='style-controls' className='row text-center'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <h3>Style Controls</h3>
          <hr></hr>
          <div className='row'>
            <div className='col-md-6'>
              <p>Font Size</p>
              <div id='font-size-slider' className='slider'></div>
            </div>
            <div className='col-md-6'>
              <p>Font RGB Color</p>
              <div id='font-red-slider' className='slider color-slider'></div>
              <div id='font-green-slider' className='slider color-slider'></div>
              <div id='font-blue-slider' className='slider color-slider'></div>
            </div>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
    );
  }
});

var ResetButton = React.createClass({
  resetPage: function() {
    location.reload();
  },
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-12'>
          <button type='button' className='btn btn-default' id='reset-btn' onClick={this.resetPage}>
            Reset
          </button>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      mode: 'input',
      text: ''
    };
  },
  handleTextInput: function() {
    var userInput = $('#user-input').val();
    if(userInput.length > 0) {
    this.setState({
        mode: 'style',
        text: userInput
      });
    }
  },
  handleEnterKeyTextInput: function (e) {
    if(e.which == 13) {
      this.handleTextInput();
    }
  },
  render: function() {
    return (
      <div>
        { this.state.mode == 'input' ? <TextInput buttonSubmit={this.handleTextInput} enterKeySubmit={this.handleEnterKeyTextInput} /> : null }
        { this.state.mode == 'style' ? <StyleViewer text={this.state.text} /> : null }
        { this.state.mode == 'style' ? <StyleControls /> : null }
        { this.state.mode == 'style' ? <ResetButton /> : null }
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);


//update color function
function updateColor (target, r, g, b) {
  var colorString = 'rgb(' + r +',' + g + ',' + b + ')';
  $('#' + target).css('color',colorString);
}