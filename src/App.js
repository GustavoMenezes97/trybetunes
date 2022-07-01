import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <div>
          <Search />
          <Album />
          <Favorites />
          <ProfileEdit />
          <Profile />
          <NotFound />
          <Login />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
