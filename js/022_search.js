var Search = React.createClass({
  componentDidMount: function () {
    var _this = this;
    $('#dwarf-search .typeahead').typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    },
    {
      name: 'dwarfs',
      source: this.substringMatcher(this.props.source)
    }).on('typeahead:selected', function(obj, datum, name) {
      _this.props.select(datum);
    });
    $('input.typeahead.tt-input').focus();
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
  render: function () {
    return (
      <div className='row text-center'>
        <div className='col-sm-3'></div>
        <div id='dwarf-search' className='col-sm-6'>
          <input className='typeahead' type='text' placeholder='search the seven dwarfs...' onKeyPress={this.props.enter}></input>
        </div>
        <div className='col-sm-3'></div>
      </div>
    );
  }
});

var Dwarf = React.createClass({
  render: function() {
    var selection = this.props.name;
    var selectionData = this.props.data.filter(function(d){return d.name == selection; })
    return (
      <div className='row text-center'>
      <div className='col-md-3'></div>
      <div className='col-md-6'>
        <h3>{selection}</h3>
        <img className='dwarf-img' src={'img/022_search/' + selection.toLowerCase() + '.jpg'}></img>
        <p>{selectionData[0].bio}</p>
      </div>
      <div className='col-md-3'></div>
      </div>
    );
  }
})

var App = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      names: ["Doc", "Dopey", "Bashful", "Grumpy", "Sneezy", "Sleepy", "Happy"], //data.dwarfs.map(function(d){return d.name; })
      selection: ''
    };
  },
  componentDidMount: function () {
    this.loadData();
  },
  loadData: function () {
    $.ajax({
      url: 'data/022_search.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data.dwarfs
        });
      }.bind(this)
    });
  },
  setSelection: function (select) {
    this.handleSelect(select);
  },
  setSelectionEnter: function (e) {
    var select = $('input.typeahead.tt-input').val();
    if(e.which == 13 && this.state.names.indexOf(select) != -1) {
      this.handleSelect(select);
    }
  },
  handleSelect: function (select) {
    //update state
    this.setState({
      selection: select
    });
    //reset input
    $('.typeahead')
        .typeahead('val', '')
        .blur();
  },
  render: function() {
    return (
      <div id='app'>
        <Search source={this.state.names} select={this.setSelection} enter={this.setSelectionEnter}/>
        {this.state.selection != '' ? <Dwarf name={this.state.selection} data={this.state.data} /> : null }
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);


