//react
var Header = React.createClass({
  render: function() {
    return (
      <div id='header' className='row text-center'>
        <div className='col-md-12'>
          <h3>Heads or Tails Championship</h3>
          <h4><i className='fa fa-trophy'></i></h4>
        </div>
      </div>
    );
  }
});

var Leaderboard = React.createClass({
  render: function() {
    var leader = determineLeader(this.props.userScore, this.props.computerScore)
    return (
      <div id='leaderboard' className='row text-center'>
        <div className='col-sm-3 col-md-4'></div>
        <div className='col-sm-6 col-md-4'>
          <table className='table table-bordered table-condensed'>
            <thead>
              <tr>
                <th className='text-center'>Player</th>
                <th className='text-center'>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{leader == 'user' ? this.props.userName : 'Computer'}</td>
                <td>{leader == 'user' ? this.props.userScore : this.props.computerScore}</td>
              </tr>
              <tr>
                <td>{leader == 'user' ? 'Computer' : this.props.userName}</td>
                <td>{leader == 'user' ? this.props.computerScore : this.props.userScore}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-sm-3 col-md-4'></div>
      </div>
    );
  }
});

var Players = React.createClass({
  render: function() {
    var userClass = (this.props.userCorrect == true ? 'text-success' : 'text-danger');
    var computerClass = (this.props.computerCorrect == true ? 'text-success' : 'text-danger');
    return (
      <div id='players' className='row text-center'>
        <div className='hidden-xs hidden-sm col-md-2'></div>
        <div className='col-xs-6 col-sm-6 col-md-4'>
          <i className='fa fa-desktop player-icon'></i>
          <p className='player-selection'>
            {this.props.gameStatus == 'beforeRound' ? <span title='Computer will guess when you guess'>?</span> : <span className={computerClass}>{this.props.computerGuess}</span>}
          </p>
        </div>
        <div className='col-xs-6 col-sm-6 col-md-4'>
          <i className='fa fa-user player-icon'></i>
          <div className='player-selection'>
            {this.props.gameStatus == 'beforeRound' ? <UserSelect handleSelect={this.props.handleSelect} /> : <UserResult userClass={userClass} userGuess={this.props.userGuess} />}
          </div>
        </div>
        <div className='hidden-xs hidden-sm col-md-2'></div>
      </div>
    );
  }
});

var UserSelect = React.createClass({
  render: function() {
    return (
      <div className='row'>
        <div className='col-sm-3 col-md-3'></div>
        <div className='col-sm-6 col-md-6'>
          <select id='guess' className='form-control' onChange={this.props.handleSelect}>
            <option value='pending'>Guess</option>
            <option value='heads'>Heads</option>
            <option value='tails'>Tails</option>
          </select>
        </div>
        <div className='col-sm-3 col-md-3'></div>
      </div>
    );
  }
});

var UserResult = React.createClass({
  render: function() {
    return (
      <p className={this.props.userClass}>{this.props.userGuess}</p>
    );
  }
});

var Result = React.createClass({
  render: function() {
    var resultImgPath;
    switch(this.props.coinResult) {
      case 'heads':
        resultImgPath = 'img/019_leaderboard/heads.jpg';
        break;
      case 'tails':
        resultImgPath = 'img/019_leaderboard/tails.jpg';
        break;
    }
    return (
      <div id='result' className='row text-center'>
        <div className='col-md-12'>
          <h4>Result:</h4>
          {this.props.gameStatus == 'beforeRound' ? <p><i>Make a guess...</i></p> : <img id='coin-img' title={'The result was ' + this.props.coinResult} src={resultImgPath}></img>}
        </div>
      </div>
    );
  }
});

var Reset = React.createClass({
  render: function() {
    return (
      <div id='reset' className='row'>
        <div className='col-md-12 text-center'>
          <button type='button' className='btn btn-default btn-md' onClick={this.props.handleReset} >Next Round</button>
        </div>
      </div>
    );
  }
});

var UserNameModal = React.createClass({
  componentDidMount: function () {
    $('#user-name-modal').on('shown.bs.modal', function () {
      $('#user-name-input').focus();
    });
  },
  render: function () {
    return (
      <div id='user-name-modal' className='modal fade' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content text-center'>
            <div className='modal-header'>
              <h4 className='modal-title'>Welcome to the Heads or Tails Championship!</h4>
            </div>
            <div className='modal-body'>
              <input type='text' className='form-control text-center' id='user-name-input' placeholder='enter name for leaderboard' onKeyPress={this.props.enterKeySubmit}></input>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' onClick={this.props.submit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      gameStatus: 'beforeRound',
      coinSides: ['heads','tails'],
      coinResult: 'pending',
      userName: '',
      userGuess: 'pending',
      computerGuess: 'pending',
      userCorrect: 'pending',
      computerCorrect: 'pending',
      userScore: 0,
      computerScore: 0
    };
  },
  componentDidMount: function () {
    //configure and call user name modal
    $('#user-name-modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#user-name-modal').modal('show');
  },
  setUserName: function () {
    var userName = $('#user-name-input').val();
    if(userName.length > 0) {
      this.setState({
        userName: userName
      });
      $('#user-name-modal').modal('hide');
    }
  },
  setUserNameEnterKey: function (e) {
    if(e.which == 13) {
      this.setUserName();
    }
  },
  handleUserSelect: function (e) {
    var userSelected = e.target.value;
    if(userSelected == 'heads' || userSelected == 'tails') {
      this.scoreRound(userSelected);
    }
  },
  scoreRound: function (userGuess) {
    //determine computerGuess and coinResult
    var computerGuess = _.sample(this.state.coinSides);
    var coinResult = _.sample(this.state.coinSides);
    //determine correctness
    var userCorrect = (userGuess == coinResult ? true : false);
    var computerCorrect = (computerGuess == coinResult ? true : false);
    //determine scores
    var userScore = this.state.userScore;
    var computerScore = this.state.computerScore;
    if(userGuess == coinResult) {
      userScore++;
    }
    if(computerGuess == coinResult) {
      computerScore++;
    }
    //update state
    this.setState({
      gameStatus: 'afterRound',
      coinResult: coinResult,
      userGuess: userGuess.toProperCase(),
      computerGuess: computerGuess.toProperCase(),
      userCorrect: userCorrect,
      computerCorrect: computerCorrect,
      userScore: userScore,
      computerScore: computerScore
    });
  },
  nextRound: function () {
    this.setState({
      gameStatus: 'beforeRound',
      coinResult: 'pending',
      userGuess: 'pending',
      computerGuess: 'pending',
      userCorrect: 'pending',
      computerCorrect: 'pending',
    });
  },
  render: function() {
    return (
      <div id='app'>
        <Header />
        <Leaderboard
          userName={this.state.userName}
          gameStatus={this.state.gameStatus}
          userScore={this.state.userScore}
          computerScore={this.state.computerScore}
        />
        <Players
          gameStatus={this.state.gameStatus}
          handleSelect={this.handleUserSelect}
          userCorrect={this.state.userCorrect}
          computerCorrect={this.state.computerCorrect}
          userGuess={this.state.userGuess}
          computerGuess={this.state.computerGuess}
        />
        <Result
          gameStatus={this.state.gameStatus}
          coinResult={this.state.coinResult}
        />
        {this.state.gameStatus == 'afterRound' ? <Reset handleReset={this.nextRound}/> : null}
        <UserNameModal
          submit={this.setUserName}
          enterKeySubmit={this.setUserNameEnterKey}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);


//helpers
function determineLeader (userScore, computerScore) {
  if(userScore >= computerScore){
    return 'user';
  } else {
    return 'computer';
  }
}

String.prototype.toProperCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}