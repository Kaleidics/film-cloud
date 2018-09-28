import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import MainNav from '../MainNav/MainNav';
import Loader from '../Loader/Loader';

import getSession from '../../actions/authenticationActions/getSession';
import deleteSession from '../../actions/authenticationActions/deleteSession';
import toggleLogInStatus from '../../actions/authenticationActions/toggleLogInStatus';

import getUserDetails from '../../actions/authenticationActions/getUserDetails';
import getMovieFavorites from '../../actions/movieActions/getMovieFavorites';
import getTVFavorites from '../../actions/TVActions/getTVFavorites';
import getMoviesRated from '../../actions/movieActions/getMoviesRated';
import getTVRated from '../../actions/TVActions/getTVRated';

import profileAvatar from './images/profile-avatar.jpeg';
import './UserProfile.scss';

class UserProfile extends Component {

  // Sets login status to approved
  componentDidMount() {
    if (this.props.match.params.status === 'approved' && !this.props.logInStatus) {
      this.props.getSession(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.props.apiKey}`, this.parseRequestToken(this.props.location.search));
      this.props.toggleLogInStatus({ status: 'APPROVED' });
    }
  }

  // Fetches data for user profile
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.userDetails.id && nextProps.session.session_id) {
      this.props.getUserDetails(`https://api.themoviedb.org/3/account?api_key=${this.props.apiKey}&session_id=${nextProps.session.session_id}`);
      this.handleFavorites(nextProps.userDetails.id, nextProps.session.session_id);
      this.handleRated(nextProps.userDetails.id, nextProps.session.session_id);
    }
  }

  // Parses the request token from a string
  parseRequestToken = token => token.split('?request_token=')[1].split('&')[0];


  handleFavorites = (accountId, sessionId) => {
    this.props.getMovieFavorites(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${this.props.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
    this.props.getTVFavorites(`https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${this.props.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
  }

  handleRated = (accountId, sessionId) => {
    this.props.getMoviesRated(`https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${this.props.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
    this.props.getTVRated(`https://api.themoviedb.org/3/account/${accountId}/rated/tv?api_key=${this.props.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
  }

  handleDeleteSession = sessionId => {
    this.props.deleteSession(`https://api.themoviedb.org/3/authentication/session?api_key=${this.props.apiKey}`, sessionId);
    this.props.toggleLogInStatus({ status: false });
  }

  handleGenres = (genresList, genres) => {
    if (genresList) {
      let genresArr = genresList.filter(genre => genre.id === genres[0] || genre.id === genres[1] ? genre.name : null);
      return <p className="user-profile-container-main-container-item-container__genres">{genresArr[0] ? genresArr[0].name : ''}{genresArr[1] ? ` / ` + genresArr[1].name : ''}</p>
    }
  }

  // Returs the users side nav
  userProfileAsideNav = logInStatus => {
    if (logInStatus === 'APPROVED') {
      return(
        <ul className="user-profile-container-aside-nav-list">

          <li className="user-profile-container-aside-nav-list-item">
            <svg className="user-profile-container-aside-nav-list-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
            <p className="user-profile-container-aside-nav-list-item__title">Favorites</p>
          </li>

          <li className="user-profile-container-aside-nav-list-item">
            <svg className="user-profile-container-aside-nav-list-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
            <p className="user-profile-container-aside-nav-list-item__title">Favorite Movies</p>
          </li>

          <li className="user-profile-container-aside-nav-list-item">
            <svg className="user-profile-container-aside-nav-list-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
            <p className="user-profile-container-aside-nav-list-item__title">Favorite Movies</p>
          </li>

          <li className="user-profile-container-aside-nav-list-item">
            <svg className="user-profile-container-aside-nav-list-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
            <p className="user-profile-container-aside-nav-list-item__title">Favorite Movies</p>
          </li>

          <li className="user-profile-container-aside-nav-list-item">
            <svg className="user-profile-container-aside-nav-list-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
            <p className="user-profile-container-aside-nav-list-item__title">Favorite Movies</p>
          </li>

        </ul>
      );
    } else {
      return(
        <h1>Must be a TMDB User</h1>
      );
    }
  };

  render() {

    return(
      <div className="user-profile">
        <MainNav />
        <div className="user-profile-container">

          <aside className="user-profile-container-aside">
            <nav className="user-profile-container-aside-nav">

              <div className="user-profile-container-aside-nav-profile wow swing" data-wow-delay=".5s" data-wow-duration="5s">
                <img className="user-profile-container-aside-nav-profile-image" src={this.props.userDetails.avatar ? `https://secure.gravatar.com/avatar/${this.props.userDetails.avatar.gravatar.hash}.jpg?s=64` : profileAvatar} alt="user" />
                <div className="user-profile-container-aside-nav-profile-info">
                  <h2 className="user-profile-container-aside-nav-profile-info__user-name">Welcome {this.props.userDetails.username ? this.props.userDetails.username : 'Guest'}</h2>
                  <p className="user-profile-container-aside-nav-profile-info__user-type">{this.props.userDetails.username ? 'TMDB User' : 'Guest'}</p>
                </div>
              </div>

              <Link to='/'>
                <button onClick={() => this.handleDeleteSession(this.props.session.session_id)} className="user-profile-container-aside-nav-log-out wow fadeInUp" data-wow-delay=".5s" data-wow-duration="5s">Log Out</button>
              </Link>

            </nav>
          </aside>

          <main className="user-profile-container-main">
            <div className="user-profile-container-main-info">

              <div className="user-profile-container-main-info-item">
                <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
                <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{this.props.movieFavorites.results.length}</span> Favorite Movies</p>
              </div>

              <div className="user-profile-container-main-info-item">
                <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z"/></svg>
                <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{this.props.TVFavorites.results.length}</span> Favorite TV Shows</p>
              </div>

              <div className="user-profile-container-main-info-item">
                <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>
                <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{this.props.moviesRated.results.length}</span> Rated Movies</p>
              </div>

              <div className="user-profile-container-main-info-item">
                <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>
                <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{this.props.TVRated.results.length}</span> Rated TV Shows</p>
              </div>

            </div>
            <div className="user-profile-container-main-content">

              <div className="user-profile-container-main-container">
                <header className="user-profile-container-main-container-header">
                  <h3 className="user-profile-container-main-container-header__title wow fadeIn" data-wow-duration="3s">Favorite Movies</h3>
                  <hr className="user-profile-container-main-container-header__separator" />
                </header>
                <div className="user-profile-container-main-container-item">
                {this.props.movieFavorites.results.length > 0 ? this.props.movieFavorites.results.map(item => (
                  <Link key={item.id} to={`/details/movie/${item.id}`}>
                    <div className="user-profile-container-main-container-item-container">
                      <img className="user-profile-container-main-container-item-container__image" src={`${this.props.MDBConfig.images.secure_base_url}${this.props.MDBConfig.images.poster_sizes[1]}${item.poster_path}`} alt={item.title}/>
                      <h4 className="user-profile-container-main-container-item-container__title">{item.title}</h4>
                      {this.handleGenres(this.props.movieGenres.genres, item.genre_ids)}
                    </div>
                  </Link>
                )) : (
                  <h3 className="user-profile-container-main-container-item-warning">No favorite movies found</h3>
                )}
                </div>

            </div>

            <div className="user-profile-container-main-container">
              <header className="user-profile-container-main-container-header">
                <h3 className="user-profile-container-main-container-header__title wow fadeIn" data-wow-duration="3s">TV Shows</h3>
                <hr className="user-profile-container-main-container-header__separator" />
              </header>
              <div className="user-profile-container-main-container-item">
                {this.props.TVFavorites.results.length > 0 ? this.props.TVFavorites.results.map(item => (
                  <Link key={item.id} to={`/details/tv/${item.id}`}>
                    <div className="user-profile-container-main-container-item-container">
                      <img className="user-profile-container-main-container-item-container__image" src={`${this.props.MDBConfig.images.secure_base_url}${this.props.MDBConfig.images.poster_sizes[1]}${item.poster_path}`} alt={item.name}/>
                      <h4 className="user-profile-container-main-container-item-container__title">{item.name}</h4>
                      {this.handleGenres(this.props.TVGenres.genres, item.genre_ids)}
                    </div>
                  </Link>
                )) : (
                  <h3 className="user-profile-container-main-container-item-warning">No favorite tv shows found</h3>
                )}
              </div>
            </div>

            <div className="user-profile-container-main-container">
              <header className="user-profile-container-main-container-header">
                <h3 className="user-profile-container-main-container-header__title wow fadeIn" data-wow-duration="3s">Movies Rated</h3>
                <hr className="user-profile-container-main-container-header__separator" />
              </header>
              <div className="user-profile-container-main-container-item">
                {this.props.moviesRated.results.length > 0 ? this.props.movieRated.results.map(item => (
                  <Link key={item.id} to={`/details/movie/${item.id}`}>
                    <div className="user-profile-container-main-container-item-container">
                      <img className="user-profile-container-main-container-item-container__image" src={`${this.props.MDBConfig.images.secure_base_url}${this.props.MDBConfig.images.poster_sizes[1]}${item.poster_path}`} alt={item.title}/>
                      <h4 className="user-profile-container-main-container-item-container__title">{item.title}</h4>
                      {this.handleGenres(this.props.movieGenres.genres, item.genre_ids)}
                    </div>
                  </Link>
                )) : (
                  <h3 className="user-profile-container-main-container-item-warning">No rated movies found</h3>
                )}
              </div>
            </div>

            <div className="user-profile-container-main-container">
              <header className="user-profile-container-main-container-header">
                <h3 className="user-profile-container-main-container-header__title wow fadeIn" data-wow-duration="3s">TV Shows Rated</h3>
                <hr className="user-profile-container-main-container-header__separator" />
              </header>
              <div className="user-profile-container-main-container-item">
                {this.props.TVRated.results.length > 0 ? this.props.TVRated.results.map(item => (
                  <Link key={item.id} to={`/details/tv/${item.id}`}>
                    <div className="user-profile-container-main-container-item-container">
                      <img className="user-profile-container-main-container-item-container__image" src={`${this.props.MDBConfig.images.secure_base_url}${this.props.MDBConfig.images.poster_sizes[1]}${item.poster_path}`} alt={item.name}/>
                      <h4 className="user-profile-container-main-container-item-container__title">{item.name}</h4>
                      {this.handleGenres(this.props.TVGenres.genres, item.genre_ids)}
                    </div>
                  </Link>
                )) : (
                  <h3 className="user-profile-container-main-container-item-warning">No rated tv shows found</h3>
                )}
              </div>
            </div>

            </div>
          </main>

        </div>

        <Loader />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MDBConfig: state.PostMDBConfig,
  apiKey: state.PostMDBConfig.apiKey,
  session: state.getSession,
  requestToken: state.getRequestToken,
  logInStatus: state.toggleLogInStatus.status,
  userDetails: state.getUserDetails,
  movieFavorites: state.getMovieFavorites,
  TVFavorites: state.getTVFavorites,
  moviesRated: state.getMoviesRated,
  TVRated: state.getTVRated,
  movieGenres: state.postMovieGenres,
  TVGenres: state.postTVGenres,
});

const mapDispatchToProps = dispatch => ({
  getSession: (url, token) => dispatch(getSession(url, token)),
  deleteSession: (url, sessionId) => dispatch(deleteSession(url, sessionId)),
  toggleLogInStatus: status => dispatch(toggleLogInStatus(status)),
  getUserDetails: url => dispatch(getUserDetails(url)),
  getMovieFavorites: url => dispatch(getMovieFavorites(url)),
  getTVFavorites: url => dispatch(getTVFavorites(url)),
  getMoviesRated: url => dispatch(getMoviesRated(url)),
  getTVRated: url => dispatch(getTVRated(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
