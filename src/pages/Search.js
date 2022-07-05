import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      previousArtist: '',
      buttonSearch: true,
      loading: false,
      album: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.buttonValidations());
  }

  buttonValidations = () => {
    const { artistName } = this.state;
    const minValue = 2;
    return artistName.length >= minValue
      ? this.setState({ buttonSearch: false })
      : this.setState({ buttonSearch: true });
  }

  buttonSearch = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({ loading: true });
    const artists = await searchAlbumsAPI(artistName);
    this.setState({
      previousArtist: artistName,
      artistName: '',
      loading: false,
      album: [...artists],
    });
  }

  render() {
    const { artistName, buttonSearch, loading, previousArtist, album } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-search">
            <label htmlFor="artistName">
              <input
                data-testid="search-artist-input"
                type="text"
                name="artistName"
                id="artistName"
                value={ artistName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              name="buttonSearch"
              id="buttonSearch"
              disabled={ buttonSearch }
              onClick={ this.buttonSearch }
            >
              Search
            </button>
            <p>{`Resultado de álbuns de: ${previousArtist}`}</p>
            { album.length === 0 ? 'Nenhum álbum foi encontrado' : (
              album.map((item) => (
                <div key={ item.collectionId }>
                  <p>{`ID: ${item.artistId}`}</p>
                  <p>{`Artist name: ${item.artistName}`}</p>
                  <p>{`Collection ID: ${item.collectionId}`}</p>
                  <p>{`Collection name: ${item.collectionName}`}</p>
                  <p>{`Collection price: $${item.collectionPrice}`}</p>
                  <img src={ item.artworkUrl100 } alt="foto do album" />
                  <p>{`Release date: ${item.releaseDate}`}</p>
                  <p>{`Tracks: ${item.trackCount}`}</p>
                  <Link
                    data-testid={ `link-to-album-${item.collectionId}` }
                    to={ `/album/${item.collectionId}` }
                  >
                    Link
                  </Link>
                </div>
              ))) }
          </div>
        )}
      </>
    );
  }
}

export default Search;
