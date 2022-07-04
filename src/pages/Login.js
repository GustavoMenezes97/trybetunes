import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      buttonLogin: true,
      loading: false,
      loaded: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.buttonValidation());
  }

  buttonValidation = () => {
    const { userName } = this.state;
    const minValue = 3;
    return userName.length >= minValue
      ? this.setState({ buttonLogin: false })
      : this.setState({ buttonLogin: true });
  }

  buttonFunction = async (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false, loaded: true });
  }

  render() {
    const { userName, buttonLogin, loading, loaded } = this.state;
    return (
      <div data-testid="page-login">
        {loaded && <Redirect to="/search" />}
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="userName">
              User name:
              <input
                data-testid="login-name-input"
                type="text"
                name="userName"
                id="userName"
                placeholder="first and last name"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              name="buttonLogin"
              disabled={ buttonLogin }
              onClick={ this.buttonFunction }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
