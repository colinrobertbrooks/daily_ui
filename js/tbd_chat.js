//messages
var messages = [
  {from: "eight-ball", }
]


//react
var ChatWindow = React.createClass({
  componentDidMount: function() {
    resizeChat();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="chat-window">
            <h4 className="text-center" title="Returning 20 answers since the 1950s">Chat with <b>Magic 8 Ball</b></h4>
            <div className="message-container">
              <div className="message eight-ball-message">
                <p>Chat!</p>
              </div>
              <div className="message user-message">
                <p>Chat!</p>
              </div>
            </div>
            <div className="input-group message-input">
              <input type="text" className="form-control" placeholder="Type your question for Magic 8 Ball..." aria-describedby="message-send"></input>
              <span className="input-group-addon" id="message-send" title="Send your question to Magic 8 Ball" onClick={this.handleSubmit}><i className="fa fa-question"></i></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  handleMessageSend: function() {
    console.log('!');
  },
  render: function() {
    return (
      <ChatWindow send={this.messageSend} />
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);


//document ready function
$(document).ready(function() {
  //todo remove if not needed
});


//window resize funciton
$( window ).resize(function() {
  resizeChat();
});


//message container function
function resizeChat () {
  var screenHeight = $(window).height();
  var chatHeaderHeight = $('.chat-window h4').height();
  var chatInputHeight = $('.message-input').height();
  if(screenHeight > 320) {
    //size to current screen
    var buffer = 100;
    var chatWindowHeight = screenHeight - buffer;
    $('.chat-window').height(chatWindowHeight);
    $('.message-container').height(chatWindowHeight - (chatHeaderHeight + chatInputHeight + 20));
  } else {
    //default to xs screen
    $('.chat-window').height(220);
    $('.message-container').height(147);
  }
}

