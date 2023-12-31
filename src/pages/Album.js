import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      title: '',
    };
  }

  async componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const favMusics = await getFavoriteSongs();
    const checkedMusics = musics.map((item) => ({
      ...item,
      checked: favMusics && favMusics.some((music) => (
        item.trackId === music.trackId
      )),
    }));
    this.setState({ album: checkedMusics, title: musics[0] });
  }

  render() {
    const { album, title } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{title.artistName}</p>
          <p data-testid="album-name">{title.collectionName}</p>
          { album.filter((item) => item.previewUrl).map((item) => (<MusicCard
            key={ item.trackName }
            trackId={ item.trackId }
            music={ item }
            musicName={ item.trackName }
            player={ item.previewUrl }
            checked={ item.checked }
          />))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
