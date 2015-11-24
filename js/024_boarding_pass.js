var InitiateButton = React.createClass({
  render: function() {
    return (
      <button type='button' id='initiate-btn' className='btn btn-lg' title='Click to start' onClick={this.props.click}>Get Boarding Pass</button>
    );
  }
});

var AppHeader = React.createClass({
  componentDidMount: function() {
    $('#demo-air-h1').addClass('animated fadeIn');
  },
  render: function() {
    return (
      <h1 id='demo-air-h1' className='animated fadeIn'>Demo Air</h1>
    );
  }
});

var StepOne = React.createClass({
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-3'></div>
        <div id='name-input-container' className='col-md-6 animated fadeInLeftBig'>
          <h3 className='demo-air-h3'><i className="fa fa-user"></i></h3>
          <p className='demo-air-p'>What is your name?</p>
          <div className='input-group'>
            <input type='text' className='form-control text-center' id='name-input' placeholder='enter passenger name' onKeyPress={this.props.enter}></input>
            <span className='input-group-btn'>
              <button className='btn da-form-btn' type='button' onClick={this.props.click}>Next</button>
            </span>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
});

var StepTwo = React.createClass({
  componentDidMount: function () {
    var _this = this;
    $('#origin-search .typeahead').typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    },
    {
      name: 'origins',
      source: this.substringMatcher(this.props.data)
    }).on('typeahead:selected', function(obj, datum, name) {
      _this.props.click(datum);
    });
  },
  substringMatcher: function (strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex, substrRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
      cb(matches);
    };
  },
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-3'></div>
        <div id='origin-input-container' className='col-md-6 animated fadeInLeftBig'>
          <h3 className='demo-air-h3'><i className="fa fa-plane"></i></h3>
          <p className='demo-air-p'>Where are you leaving from?</p>
          <div id='origin-search' className='input-group'>
            <input type='text' className='form-control text-center typeahead' id='origin-input' placeholder='enter origin airport code' onKeyPress={this.props.enter}></input>
            <span className='input-group-btn'>
              <button className='btn da-form-btn' type='button' onClick={this.props.click}>Next</button>
            </span>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
});

var StepThree = React.createClass({
  componentDidMount: function () {
    var _this = this;
    $('#destination-search .typeahead').typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    },
    {
      name: 'destinations',
      source: this.substringMatcher(this.props.data)
    }).on('typeahead:selected', function(obj, datum, name) {
      _this.props.click(datum);
    });
  },
  substringMatcher: function (strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex, substrRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
      cb(matches);
    };
  },
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-3'></div>
        <div id='destination-input-container' className='col-md-6 animated fadeInLeftBig'>
          <h3 className='demo-air-h3'><i className="fa fa-plane fa-rotate-90"></i></h3>
          <p className='demo-air-p'>Where are you headed to?</p>
          <div id='destination-search' className='input-group'>
            <input type='text' className='form-control text-center typeahead' id='destination-input' placeholder='enter destination airport code' onKeyPress={this.props.enter}></input>
            <span className='input-group-btn'>
              <button className='btn da-form-btn' type='button' onClick={this.props.click}>Next</button>
            </span>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
});

var StepFour = React.createClass({
  componentDidMount: function () {
    //generate code 128 barcode
    var string = this.props.origin + '/' + this.props.destination;
    console.log(string);
    var w = 420, h = 50
    var canvas = document.getElementById('bar-code');
    var g = canvas.getContext('2d');
    g.fillStyle = 'white';
    g.fillRect(0, 0, w, h);
    drawBarcode(g, string, {
      type: 'Code 128',
      x: w/2,
      y: h/2,
      maxWidth: w,
      horizontalAlign: 'center',
      verticalAlign: 'middle'
    });
    //restore footer
    $('footer').fadeIn(750);
  },
  render: function() {
    var currentDate = moment().format("MM/DD/YYYY");
    var origin = this.props.origin;
    var destination = this.props.destination;
    var oDescription = this.props.data.filter(function(d){return d.name == origin; })[0].description;
    var dDescription = this.props.data.filter(function(d){return d.name == destination; })[0].description;
    return (
      <div className='row text-center'>
        <div className='col-md-1'></div>
        <div className='col-md-10 animated zoomIn'>
          <div id='ticket-container'>
            <div id='ticket-header' className='text-left'>
              <p>Demo Air</p>
            </div>
            <div id='ticket-body' className='row text-center'>
              <div className='col-sm-6'>
                <p><b className='yellow-text'>Passenger:</b> <span className='blue-text'>{this.props.name}</span></p>
              </div>
              <div className='col-sm-6'>
                <p><b className='yellow-text'>Date:</b> <span className='blue-text'>{currentDate}</span></p>
              </div>
              <div className='col-sm-6'>
                <div className='row'>
                  <div className='col-xs-6'>
                    <p className='airport-code-header'><b className='yellow-text'>From:</b></p>
                    <p className='red-text airport-code'>{origin}</p>
                    <p><i><small className='text-muted'>{oDescription}</small></i></p>
                  </div>
                  <div className='col-xs-6'>
                    <p className='airport-code-header'><b className='yellow-text'>To:</b></p>
                    <p className='red-text airport-code'>{destination}</p>
                    <p><i><small className='text-muted'>{dDescription}</small></i></p>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <p><b className='yellow-text'>Gate:</b> <span className='red-text'>C4</span></p>
                <p><b className='yellow-text'>Seat:</b> <span className='red-text'>27C</span></p>
                <p><b className='yellow-text'>Departs:</b> <span className='red-text'> Proceed to Gate</span></p>
              </div>
            </div>
            <div id='ticket-footer' className='row text-center'>
              <div className='col-md-12'>
                <hr></hr>
                <p id='no-bar-code'><i>Rotate screen for barcode</i></p>
                <canvas id='bar-code' width='420' height='50' title='Code 128 barcode'></canvas>
                <p className='text-muted'>BOARDING PASS</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      airportCodes: [],
      boardingPassCreator: false,
      step: '',
      name: '',
      origin: '',
      destination: ''
    };
  },
  componentDidMount: function () {
    this.loadData();
  },
  loadData: function () {
    d3.csv('data/024_boarding_pass.csv',function(csv){
      this.setState({
        data: csv,
        airportCodes: csv.map(function(d){return d.name; })
      });
    }.bind(this));
  },
  initiateBoardingPassCreator: function() {
    //transition background
    d3.select('body')
      .transition()
      .duration(750)
      .style('background-color', '#ffd460');
    //transition header and footer
    $('header, footer').fadeOut(750);
    //transition button
    $('#initiate-btn').addClass('animated zoomOut')
    //update state after transitions
    setTimeout(function() {
      this.setState({
        boardingPassCreator: true,
        step: 1
      });
    }.bind(this), 800);
  },
  handleEnterKey: function (e) {
    if(e.which == 13) {
      switch(this.state.step) {
      case 1:
        this.setPassengerName();
        break;
      case 2:
        this.setOriginName();
        break;
      case 3:
        this.setDestinationName();
        break;
      }
    }
  },
  setPassengerName: function() {
    var name = $('#name-input').val();
    if(name.length > 0) {
      $('#name-input-container')
        .removeClass('fadeInLeftBig')
        .addClass('fadeOutRightBig');
      setTimeout(function() {
        this.setState({
          name: name,
          step: 2
        });
      }.bind(this), 200);
    }
  },
  setOriginName: function() {
    var origin = $('#origin-input').val();
    if(origin .length > 0 && this.state.airportCodes.indexOf(origin) != -1) {
      $('#origin-input-container')
        .removeClass('fadeInLeftBig')
        .addClass('fadeOutRightBig');
      setTimeout(function() {
        //remove origin from airportCodes and update state
        var updatedAirportCodes = this.state.airportCodes.filter(function(d){ return d != origin; });
        this.setState({
          airportCodes: updatedAirportCodes,
          origin : origin,
          step: 3
        });
      }.bind(this), 200);
    }
  },
  setDestinationName: function() {
    var destination = $('#destination-input').val();
    if(destination.length > 0 && this.state.airportCodes.indexOf(destination) != -1) {
      $('#destination-input-container')
        .removeClass('fadeInLeftBig')
        .addClass('fadeOutRightBig');
      setTimeout(function() {
        this.setState({
          destination: destination,
          step: 4
        });
      }.bind(this), 200);
    }
  },
  render: function() {
    return (
      <div id='app' className='row text-center'>
        <div className='col-md-12'>
          {this.state.boardingPassCreator == false ? <InitiateButton click={this.initiateBoardingPassCreator}/> : null}
          {this.state.boardingPassCreator == true ? <AppHeader /> : null}
          {this.state.step == 1 ? <StepOne click={this.setPassengerName} enter={this.handleEnterKey} /> : null}
          {this.state.step == 2 ? <StepTwo click={this.setOriginName} enter={this.handleEnterKey} data={this.state.airportCodes} /> : null}
          {this.state.step == 3 ? <StepThree click={this.setDestinationName} enter={this.handleEnterKey} data={this.state.airportCodes} /> : null}
          {this.state.step == 4 ? <StepFour name={this.state.name} origin={this.state.origin} destination={this.state.destination} data={this.state.data} /> : null}
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);
