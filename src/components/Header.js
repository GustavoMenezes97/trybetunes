import React from 'react';
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
          <h2 data-testid="header-user-name">{ name }</h2>
        )}
      </header>
    );
  }
}

export default Header;
