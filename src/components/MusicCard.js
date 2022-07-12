import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { checked } = this.props;
    this.setState({
      checked,
    });
  }

  addFavoriteMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    await getFavoriteSongs();
    this.setState({ loading: false, checked: true });
  }

  removeFavoriteMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await removeSong(music);
    await getFavoriteSongs();
    this.setState({ loading: false, checked: false });
  }

  render() {
    const { musicName, player, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ player } controls>
          <track kind="captions" />
        </audio>
        <div>
          <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              checked={ checked }
              onChange={ checked ? this.removeFavoriteMusic : this.addFavoriteMusic }
            />
          </label>
        </div>
        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape().isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
