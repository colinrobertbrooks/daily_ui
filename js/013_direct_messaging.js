//react
var Message = React.createClass({
  render: function() {
    return (
      <div className={this.props.id == 'eight-ball' ? ('message eight-ball-message ' + this.props.bg) : 'message user-message' }>
        <p className='message-text'>{this.props.text}</p>
        <p className='message-date'><b>{this.props.name}</b> {this.props.time}</p>
      </div>
    );
  }
});

var ChatWindow = React.createClass({
  componentDidMount: function() {
    resizeChat();
    $('#user-input').focus();
  },
  componentDidUpdate: function() {
    var userMessage = $('#user-input')
      .blur()
      .val('')
      .focus();
    $('.message-container').animate({scrollTop: $('.message-container')[0].scrollHeight}, 0);
  },
  render: function() {
    var messageNodes = this.props.messages.map(function(message, index) {
      return (
        <Message key={index} id={message.id} name={message.name} text={message.text} time={message.time} bg={message.bg_color} />
      );
    });
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='chat-window'>
            <h4 className='text-center'>
              <img src="img/013_direct_messaging/eight-ball.svg" alt="Magic 8 Ball"></img>
              Chat with <b>Magic 8 Ball</b>
            </h4>
            <div className='message-container'>
              {messageNodes}
            </div>
            <div className='input-group message-input'>
              <input type='text' className='form-control' id='user-input' placeholder='Type your question for Magic 8 Ball...' aria-describedby='message-send' onKeyPress={this.props.enterKeyInput} ></input>
              <span className='input-group-addon' id='message-send' title='Send your question' onClick={this.props.messageSend}><i className='fa fa-question'></i></span>
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
      eightBallResponses: [],
      messages: []
    };
  },
  loadEightBallResponses: function () {
    $.ajax({
      url: 'data/013_direct_messaging.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          eightBallResponses: data.responses,
          messages: [{id: "eight-ball", name: "Magic Eight Ball", text: "Hello, I'm Magic 8 Ball. Please ask me yes/no questions...", time: returnMessageTime(), bg_color: ''}]
        });
      }.bind(this)
    });
  },
  handleMessageSend: function() {
    var messages = this.state.messages;
    var userMessage = $('#user-input').val();
    var eightBallResponse = _.sample(this.state.eightBallResponses);
    if(userMessage.length > 0) {
      messages.push(
        {id: "user", name: "You", text: userMessage, time: returnMessageTime(), bg_color: '' },
        {id: "eight-ball", name: "Magic Eight Ball", text: eightBallResponse.text, time:returnMessageTime(), bg_color: eightBallResponse.bg_class}
      );
      this.setState({
        messages: messages
      });
    }
  },
  handleEnterKeyInput: function (e) {
    if(e.which == 13) {
      this.handleMessageSend();
    }
  },
  componentDidMount: function () {
    this.loadEightBallResponses();
  },
  render: function() {
    return (
      <ChatWindow messages={this.state.messages} messageSend={this.handleMessageSend} enterKeyInput={this.handleEnterKeyInput} />
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react-hook')
);


//resize
$( window ).resize(function() {
  resizeChat();
});

function resizeChat () {
  var screenHeight = $(window).height();
  var chatHeaderHeight = $('.chat-window h4').height();
  var chatInputHeight = $('.message-input').height();
  if(screenHeight > 320) {
    //size to current screen
    var buffer = 100;
    var chatWindowHeight = screenHeight - buffer;
    $('.chat-window').height(chatWindowHeight);
    $('.message-container').height(chatWindowHeight - (chatHeaderHeight + chatInputHeight + 22));
  } else {
    //default to xs screen
    $('.chat-window').height(220);
    $('.message-container').height(139);
  }
  //scroll message container to bottom
  $('.message-container').animate({scrollTop: $('.message-container')[0].scrollHeight}, 0);
}


//message time
function returnMessageTime () {
  var longTextDateTime = d3.time.format('%A, %B %d, %Y %I:%M:%S');
  var messageTime = longTextDateTime(new Date());
  return messageTime;
}
