import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

export default class YouTubePlayer extends React.Component {
  static propTypes = {
    videos: PropTypes.objectOf(PropTypes.any).isRequired
  };

  constructor(props) {
    super(props);
    this.onReady = this.onReady.bind(this);
    this.state = { ready: false };
  }

  componentDidMount() {
    this.setState({ ready: true }); // eslint-disable-line
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    this.setState({ ready: true });
    event.target.pauseVideo();
  }

  render() {
    /* */
    const { id } = this.props;
    const opts = {
      height: 'auto',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    // return

    return (
      <div>
        {id && (
          <div className="embed-responsive embed-responsive-16by9 mb-3">
            {this.state.ready && <YouTube videoId={id} opts={opts} />}
          </div>
        )}
      </div>
    );
  }
}
