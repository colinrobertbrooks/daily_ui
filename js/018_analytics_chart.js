//chart
var lineChart;


//document ready
$(document).ready(function(){
  setTimeout(function(){
    $('#to-viz')
      .removeClass('hide')
      .addClass('fadeInUp animated')
  }, 450);
  setTimeout(function(){
    $('#to-viz')
      .addClass('floating')
  }, 1000);
});


//react
var Header = React.createClass({
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-12'>
          <h3>2011 to 2015</h3>
        </div>
      </div>
    );
  }
});

var UserSelect = React.createClass({
  render: function() {
    return (
      <div className='row text-center'>
        <div className='col-md-12'>
          <div id='user-select-dropdown' className='dropdown'>
            <button className='btn btn-default dropdown-toggle' type='button' id='user-select' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
              <span id='select-text'>Avg Temp (ºF)</span> <span className='caret'></span>
            </button>
            <ul onClick={this.props.handleSelect} className='dropdown-menu' aria-labelledby='user-select'>
              <li><a href='javascript:void(0)' className='select current-selection' id='avg_temp_f'>Avg Temp (ºF)</a></li>
              <li><a href='javascript:void(0)' className='select' id='avg_min_temp_f'>Avg Min Temp (ºF)</a></li>
              <li><a href='javascript:void(0)' className='select' id='avg_max_temp_f'>Avg Max Temp (ºF)</a></li>
              <li><a href='javascript:void(0)' className='select' id='total_percipitation_in'>Total Percipitation (in)</a></li>
              <li><a href='javascript:void(0)' className='select' id='total_snowfall_in'>Total Snowfall (in)</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

var BarChart = React.createClass({
  componentDidMount: function() {
    drawLineChart('line-chart', lineData(this.props.selection, keyToYearThenMonth(this.props.data)));
  },
  componentDidUpdate: function() {
    updateLineChart('line-chart', lineData(this.props.selection, keyToYearThenMonth(this.props.data)));
  },
  render: function() {
    return (
      <div id='line-chart'>
        <svg></svg>
      </div>
    );
  }
});

var Viz = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      selection: 'avg_temp_f'
    };
  },
  loadData: function () {
    d3.csv('data/018_analytics_chart.csv',function(csv){
      this.setState({
        data: csv
      });
    }.bind(this));
  },
  componentDidMount: function () {
    this.loadData();
  },
  handleUserSelect: function (e) {
    var selection = e.target.id;
    $('#select-text').text(e.target.innerHTML);
    $('.select').removeClass('current-selection');
    $('#' + selection).addClass('current-selection');
    this.setState({
      selection: selection
    });
  },
  render: function() {
    return (
      <div id='viz'>
        <Header />
        <UserSelect selection={this.state.selection} handleSelect={this.handleUserSelect} />
        { this.state.data.length != 0 ? <BarChart data={this.state.data} selection={this.state.selection} /> : null }
      </div>
    );
  }
});

ReactDOM.render(
  <Viz />,
  document.getElementById('react-hook')
);


//line chart
function drawLineChart (elementParent, data) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  nv.addGraph(function() {
    lineChart = nv.models.lineChart()
      .margin({left: 25, right: 25})
      .x(function(d) {return d.x})
      .y(function(d) {return d.y})
      .useInteractiveGuideline(true)
      .showYAxis(true)
      .showXAxis(true);
    lineChart.xAxis
      .tickFormat(function (d) { return months[d - 1]; })
      .staggerLabels(false);
    lineChart.yAxis
      .tickFormat(d3.format('.1f'));
    d3.select('#' + elementParent + ' svg')
      .datum(data)
      .call(lineChart);
    nv.utils.windowResize(function() { lineChart.update() });
    return lineChart;
  });
}

function updateLineChart (elementParent, data) {
  d3.select('#' + elementParent + ' svg')
    .datum(data)
    .call(lineChart);
}


//line data
function keyToYearThenMonth (data) {
  var keyYearMonth = d3.nest()
    .key(function(d){return d.year; })
    .key(function(d){return d.month; });
  var keyedData = keyYearMonth.entries(
    data.map(function(d) {
      return d;
    })
  );
  return keyedData;
}

function lineData (selection, data) {
  var colors = ['#ff7f00','#984ea3','#4daf4a','#377eb8','#e41a1c'];
  data = data.sort(function(a,b){ return +a.key - +b.key; });
  var lineDataArr = [];
  for (var i = 0; i <= data.length-1; i++) {
    var lineDataElement = [];
    var currentValues = data[i].values.sort(function(a,b){ return +a.key - +b.key; });
    for (var j = 0; j <= currentValues.length-1; j++) {
      lineDataElement.push({
        'x': +currentValues[j].key,
        'y': +currentValues[j].values[0][selection]
      });
    }
    lineDataArr.push({
      key: +data[i].key,
      color: colors[i],
      values: lineDataElement
    });
  }
  return lineDataArr;
}


//smooth scroll
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1200);
      return false;
    }
  }
});

