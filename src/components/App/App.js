import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { postMDBConfig } from '../../actions/PostMDBConfigAction';
import postMovieGenres from '../../actions/movieActions/postMovieGenres';
import postTVGenres from '../../actions/TVActions/postTVGenres';

import Home from '../Home/Home';
import UserLogIn from '../UserLogIn/UserLogIn';
import UserProfile from '../UserProfile/UserProfile';
import Discover from '../Discover/Discover';

import ItemDetails from '../ItemDetails/ItemDetails';
import SearchResults from '../SearchResults/SearchResults';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

class App extends Component {
  componentWillMount() {
    // fetch genres and api configuration
    this.props.postMDBConfig(`https://api.themoviedb.org/3/configuration?api_key=${this.props.apiKey}`);
    this.props.postMovieGenres(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.props.apiKey}`);
    this.props.postTVGenres(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.props.apiKey}`);
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="App">

            <Route path="/" exact component={Home} />
            <Route path="/details/:type/:id" exact component={ItemDetails} />
            <Route path="/search-results/:id" exact component={SearchResults} />
            <Route path="/discover" exact component={Discover} />

            <Switch>

              {/* Hanlde routing for authentication */}
              <Route path="/log-in" exact component={UserLogIn} />
              <Route path="/profile/:status" exact component={UserProfile} />

              {!this.props.logInStatus || this.props.session.failure  ? <Redirect from='/profile' to="/log-in" /> : <Redirect from='/profile' to='/profile/approved' /> }
              {!this.props.logInStatus || this.props.session.failure  ? <Redirect from='/profile/approved' to="/log-in" /> : <Redirect from='/log-in' to='/profile/approved' /> }
              {!this.props.logInStatus === 'GUEST'  ? <Redirect from='/log-in' to='/profile/guest' /> : <Redirect from='/profile/guest' to="/log-in" /> }

            </Switch>

          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  logInStatus: state.toggleLogInStatus.status,
  session: state.getSession
});

const mapDispatcherToProps = dispatch => ({
  postMDBConfig: url => dispatch(postMDBConfig(url)),
  postMovieGenres: url => dispatch(postMovieGenres(url)),
  postTVGenres: url => dispatch(postTVGenres(url))
});

export default connect(mapStateToProps, mapDispatcherToProps)(App);
