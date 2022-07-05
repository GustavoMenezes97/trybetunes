import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, player } = this.props;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ player } controls>
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
};

export default MusicCard;
