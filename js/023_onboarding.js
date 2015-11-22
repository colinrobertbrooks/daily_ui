// bootstrap tour
var tour = new Tour({
  storage: false,
  keyboard: false,
  backdrop: true,
  steps: [
    {
      orphan: true,
      title: 'Welcome',
      content: 'Thanks for signing up for Demo App! If you would like a quick tour of your profile, then click "Next". Otherwise click "End Tour".'
    },
    {
      element: '#user-gravatar',
      placement: 'bottom',
      backdropPadding: 5,
      title: 'Profile Picture',
      content: 'This is your profile picture. You can change it in settings.'
    },
    {
      element: '#user-edit',
      placement: 'bottom',
      backdropPadding: 5,
      title: 'Settings',
      content: 'Click here to access settings. In addition to changing your profile picture, you can also change other settings, including your name, email and password.'
    },
    {
      element: '#sect-1-btn',
      placement: 'bottom',
      title: 'Section 1',
      content: 'This is the section of your profile where you add data (you are currently in this section).'
    },
    {
      element: '#add-data',
      placement: 'bottom',
      backdropPadding: 5,
      title: 'Adding Data',
      content: 'Click here to add data to section 1.'
    },
    {
      element: '#sect-2-btn',
      placement: 'bottom',
      title: 'Section 2',
      content: 'Once you add data in section 1 you will be able to access section 2, which has more features.'
    },
    {
      element: '#sect-3-btn',
      placement: 'bottom',
      backdrop: true,

      title: 'Section 3',
      content: 'You can access section 3 here. Section 3 has even more features.'
    },
    {
      element: '#user-profile-link',
      placement: ($(document).width() <= 767 ? null : 'bottom' ),
      title: 'Profile Link',
      content: 'You can always get back to your profile from any page on the site by clicking here in the menu as long as your logged in.'
    },
    {
      element: '#replay-tour-btn',
      placement: 'bottom',
      title: 'The End',
      content: "That's it! You can replay the tour by clicking here."
    },
  ]
});


// react
var TopCard = React.createClass({
  render: function() {
    return (
      <div id='top-section' className='row text-center'>
        <div className='col-md-12'>
          <div className='col-md-1'>
            <img id='user-gravatar' src={this.props.gravatar} ></img>
          </div>
          <div id='user-container' className='col-md-11'>
            <h1 id='user-name'>{this.props.name}</h1>
            <i id='user-edit' className='fa fa-cog' title='Update your settings'></i>
            <UserOptions />
          </div>
        </div>
      </div>
    );
  }
});

var UserOptions = React.createClass({
  render: function() {
    return (
      <div id='user-options-container'>
        <div id='user-options' className='btn-group' role='group'>
          <button type='button' id='sect-1-btn' className='btn btn-default btn-md selected-btn'>Section 1</button>
          <button type='button' id='sect-2-btn' className='btn btn-default btn-md' disabled>Section 2</button>
          <button type='button' id='sect-3-btn' className='btn btn-default btn-md'>Section 3</button>
        </div>
      </div>
    );
  }
});

var Section1 = React.createClass({
  render: function() {
    return (
      <div id='section-1' className='row text-center'>
        <div className='col-md-12'>
          <div id='section-container'>
            <h2 className='inline'>Section 1</h2>
            <i id='add-data' className="fa fa-plus-circle inline" title='Add data'></i>
          </div>
          <button type='button' id='replay-tour-btn' className='btn btn-default btn-md' onClick={this.props.replay}><i className="fa fa-play-circle-o"></i> Replay Tour</button>
        </div>
      </div>
    );
  }
})

var Profile = React.createClass({
  getInitialState: function() {
    return {
      userGravatar: 'http://www.gravatar.com/avatar/00000000000000000000000000000000',
      userName: 'User Name'
    };
  },
  componentDidMount: function() {
    this.startTour();
  },
  startTour: function() {
    tour
      .init()
      .start();
  },
  replayTour: function() {
    tour.restart();
  },
  render: function() {
    return (
      <div id='app'>
        <TopCard gravatar={this.state.userGravatar} name={this.state.userName} />
        <hr></hr>
        <Section1 replay={this.replayTour} />
      </div>
    );
  }
});

ReactDOM.render(
  <Profile />,
  document.getElementById('react-hook')
);
