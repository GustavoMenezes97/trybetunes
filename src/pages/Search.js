import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      buttonSearch: true,
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

  render() {
    const { artistName, buttonSearch } = this.state;
    return (
      <>
        <Header />
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
            type="button"
            name="buttonSearch"
            id="buttonSearch"
            disabled={ buttonSearch }
          >
            Search
          </button>
        </div>
      </>
    );
  }
}

export default Search;
