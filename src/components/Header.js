import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const userName = await getUser();
    this.setState({ name: userName.name });
    this.setState({ loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <>
            <h2 data-testid="header-user-name">{ name }</h2>
            <Link data-testid="link-to-search" to="/search">Search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;
