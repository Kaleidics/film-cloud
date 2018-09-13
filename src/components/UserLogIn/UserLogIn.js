import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import toggleLogInStatus from '../../actions/authenticationActions/toggleLogInStatus';
import getRequestToken from '../../actions/authenticationActions/getRequestToken';
import getGuestSession from '../../actions/authenticationActions/getGuestSession';

import logo from '../../images/logo.png';
import './UserLogIn.scss';

class UserLogIn extends Component {

  // Requests authentication token when component mounts
  componentDidMount() {
    this.props.getRequestToken(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.props.apiKey}`);
  }

  // Creates guest session
  handleBrowseAsGuest = () => {
    this.props.getGuestSession(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.props.apiKey}`);
    this.props.toggleLogInStatus({ status: 'GUEST' });
  }

  render() {
    return(
      <div className="user-log-in">

        <div className="user-log-in-container">

          <header className="user-log-in-container-header">
            <img className="user-log-in-container-header__logo" src={logo} alt="logo" />
            <h1 className="user-log-in-container-header__title">Log In</h1>
            <h2 className="user-log-in-container-header__name">Film Cloud</h2>
          </header>

          <div className="user-log-in-container-content">
            <a href={`https://www.themoviedb.org/authenticate/${this.props.requestToken.request_token}?redirect_to=http://localhost:3000/profile/approved`}>
              <button className="user-log-in-container-content__button" onClick={this.handleLogIn} >Log In</button>
            </a>
            <Link onClick={this.handleBrowseAsGuest} to="/profile/guest">
              <button className="user-log-in-container-content__button" onClick={this.handleBrowseAsGuest} >Browse as Guest</button>
            </Link>
          </div>

          <p className="user-log-in-container-content__warning">Guest users have access to limited features</p>

        </div>

        <div className="user-log-in-side-image">
          <h2 className="user-log-in-side-image__title">Browse and rate your favorite shows</h2>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  requestToken: state.getRequestToken,
  guestSession: state.getGuestSession,
});

const mapDispatchToProps = dispatch => ({
  getRequestToken: url => dispatch(getRequestToken(url)),
  getGuestSession: url => dispatch(getGuestSession(url)),
  toggleLogInStatus: status => dispatch(toggleLogInStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogIn);
