import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import getMovieDetails from '../../actions/movieActions/getMovieDetails';
import getMovieCredits from '../../actions/movieActions/getMovieCredits';
import getMovieTrailers from '../../actions/movieActions/getMovieTrailers';
import getMovieReviews from '../../actions/movieActions/getMovieReviews';

import getTVDetails from '../../actions/TVActions/getTVDetails';
import getTVCredits from '../../actions/TVActions/getTVCredits';
import getTVTrailers from '../../actions/TVActions/getTVTrailers';
import getTVReviews from '../../actions/TVActions/getTVReviews';

import getPeopleDetails from '../../actions/peopleActions/getPeopleDetails';
import getPeopleCombinedCredits from '../../actions/peopleActions/getPeopleCombinedCredits';

import StarRating from '../StarRating/StarRating';
import PeopleCarousel from '../PeopleCarousel/PeopleCarousel';
import TrailerCarousel from '../TrailerCarousel/TrailerCarousel';
import Loader from '../Loader/Loader';

import './ItemDetails.scss';

class ItemDetails extends Component {

  // Fetches intial details
  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  // Checks if the component received new props and refetches data
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps.match.params.id, nextProps.match.params.type);
    }
  }

  // Fetches data based on property passed
  fetchData(id, type = this.props.match.params.type) {

    if (type === 'movie') {

      this.props.getMovieDetails(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getMovieCredits(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getMovieTrailers(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getMovieReviews(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.props.apiKey}&language=en-US`);

    } else if (type === 'tv') {

      this.props.getTVDetails(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getTVCredits(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getTVTrailers(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getTVReviews(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${this.props.apiKey}&language=en-US`);

    } else if (type === 'people') {

      this.props.getPeopleDetails(`https://api.themoviedb.org/3/person/${id}?api_key=${this.props.apiKey}&language=en-US`);
      this.props.getPeopleCombinedCredits(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${this.props.apiKey}&language=en-US`);

    }

  }

  // Takes a date of birth and reformats it to DAY / MONTH / YEAR
  formatYearOfBirth = date => date.split('-').reverse().join(' / ');

  // Takes a date of birth and returns age
  findAge = date => new Date().getFullYear() - parseInt(date.split('-')[0], 10);

  // Takes string and shortens it to 50 words
  shortText = (str, length = 50) => {
    const strArr = str.split(' ');
    return strArr.length < length ? str : strArr.filter((word, i) => i < length).join(' ') + '...';
  }

  // Toggles visiblity of share bar
  handleShareButton = () => {
    document.querySelector('.item-details-header-info-share-buttons').classList.toggle('item-details-header-info-share-buttons__hide');
  }

  // Handles logic for favorite items
  handleFavoriteItem = (event, accountId, apiKey, sessionId, itemType, itemId) => {

    // Checks if the user is logged in and posts favorite data
    if (this.props.logInStatus === 'APPROVED') {
      fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
        method: 'POST',
        body: JSON.stringify({
          "media_type": itemType,
          "media_id": itemId,
          "favorite": !event.target.closest('.item-details-header-info-container-content__favorite').classList.value.includes('--active')
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => console.log(error))

      event.target.closest('.item-details-header-info-container-content__favorite').classList.toggle('item-details-header-info-container-content__favorite--active');

      // Displays a warning popup if user is not approved
    } else if (this.props.logInStatus === 'GUEST') {
      document.querySelector('.item-details-header-info-container-account-warning').classList.remove('item-details-header-info-container-account-warning--hide');
      setTimeout(() => {
        document.querySelector('.item-details-header-info-container-account-warning').classList.add('item-details-header-info-container-account-warning--hide');
      }, 3000);
    } else {
      document.querySelector('.item-details-header-info-container-account-warning').classList.remove('item-details-header-info-container-account-warning--hide');
      setTimeout(() => {
        document.querySelector('.item-details-header-info-container-account-warning').classList.add('item-details-header-info-container-account-warning--hide');
      }, 3000);
    }
  }

  // Returns header based on media type details
  ItemDetailsHeaderImage = type => {
    switch(type) {

      case 'movie':
        return (
          <div className="item-details-header-info-container">
            <img className="item-details-header-info-container-image" src={this.props.MDBConfig.images ? this.props.MDBConfig.images.secure_base_url +  this.props.MDBConfig.images.poster_sizes[0] + `${this.props.movieDetails ? this.props.movieDetails.poster_path : ''}` : ''} alt={this.props.movieDetails ? this.props.movieDetails.title : ''} />

            <div className="item-details-header-info-container-content">
              <h1 className="item-details-header-info-container-content__title">{this.props.movieDetails ? this.props.movieDetails.title : ''}</h1>

              <div className="item-details-header-info-container-content-rating">
                <p className="item-details-header-info-container-content-rating__digit">{this.props.movieDetails ? this.props.movieDetails.vote_average : ''}</p>
                <StarRating className="item-details-header-info-container-content-rating__stars" rating={this.props.movieDetails ? this.props.movieDetails.vote_average : ''} itemType="movie" itemId={this.props.movieDetails.id}/>
              </div>

              <p className="item-details-header-info-container-content__detail">{this.props.movieDetails ? this.props.movieDetails.status : ''} | {this.props.movieDetails.original_language ? this.props.movieDetails.original_language.toUpperCase(): ''}</p>
              <p className="item-details-header-info-container-content__genre">{this.props.movieDetails.genres ? `${this.props.movieDetails.genres[0] ? this.props.movieDetails.genres[0].name : ''}` + `${this.props.movieDetails.genres[1] ? ' | ' + this.props.movieDetails.genres[1].name : ''}`: ''}</p>

              <svg onClick={(e) => {this.handleFavoriteItem(e, this.props.userDetails.id, this.props.apiKey, this.props.session.session_id, 'movie', this.props.movieDetails.id)}} className="item-details-header-info-container-content__favorite wow pulse" data-wow-delay=".5s" data-wow-duration="2s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"/></svg>

              <div className="item-details-header-info-container-account-warning item-details-header-info-container-account-warning--hide">
                <p>Use a TDMB account to use this feature</p>
              </div>
            </div>

          </div>
        );

      case 'tv':
        return (
          <div className="item-details-header-info-container">
            <img className="item-details-header-info-container-image" src={this.props.MDBConfig.images ? this.props.MDBConfig.images.secure_base_url +  this.props.MDBConfig.images.poster_sizes[0] + `${this.props.TVDetails ? this.props.TVDetails.poster_path : ''}` : ''} alt={this.props.TVDetails ? this.props.TVDetails.title : ''} />

            <div className="item-details-header-info-container-content">
              <h1 className="item-details-header-info-container-content__title">{this.props.TVDetails ? this.props.TVDetails.name : ''}</h1>

              <div className="item-details-header-info-container-content-rating">
                <p className="item-details-header-info-container-content-rating__digit">{this.props.TVDetails ? this.props.TVDetails.vote_average : ''}</p>
                <StarRating className="item-details-header-info-container-content-rating__stars" rating={this.props.TVDetails ? this.props.TVDetails.vote_average : ''}  itemType="tv" itemId={this.props.TVDetails.id} />
              </div>

              <p className="item-details-header-info-container-content__detail">{this.props.TVDetails ? this.props.TVDetails.status : ''} | {this.props.TVDetails.original_language ? this.props.TVDetails.original_language.toUpperCase() : ''}</p>
              <p className="item-details-header-info-container-content__genre">{this.props.TVDetails.genres ? `${this.props.TVDetails.genres[0] ? this.props.TVDetails.genres[0].name : ''}` +  `${this.props.TVDetails.genres[1] ? ' | ' + this.props.TVDetails.genres[1].name : ''}` : ''}</p>

              <svg onClick={(e) => {this.handleFavoriteItem(e, this.props.userDetails.id, this.props.apiKey, this.props.session.session_id, 'tv', this.props.TVDetails.id)}} className="item-details-header-info-container-content__favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"/></svg>

              <div className="item-details-header-info-container-account-warning item-details-header-info-container-account-warning--hide">
                <p>Use a TDMB account to use this feature</p>
              </div>
            </div>

          </div>
        );

      case 'people':
        return (
          <div className="item-details-header-info-container">
            <img className="item-details-header-info-container-image" src={this.props.MDBConfig.images ? this.props.MDBConfig.images.secure_base_url +  this.props.MDBConfig.images.poster_sizes[0] + `${this.props.peopleDetails ? this.props.peopleDetails.profile_path : ''}` : ''} alt={this.props.peopleDetails ? this.props.peopleDetails.name : ''} />

            <div className="item-details-header-info-container-content">
              <h1 className="item-details-header-info-container-content__title">{this.props.peopleDetails ? this.props.peopleDetails.name : ''}</h1>

              <div className="item-details-header-info-container-content-rating">
                <p className="item-details-header-info-container-content-rating__digit">{this.props.peopleDetails ? Math.round(this.props.peopleDetails.popularity) : ''}</p>
                <StarRating className="item-details-header-info-container-content-rating__stars" rating={this.props.peopleDetails ? this.props.peopleDetails.popularity : ''}  itemType="people" itemId={this.props.peopleDetails.id} />
              </div>

              <p className="item-details-header-info-container-content__detail">{this.props.peopleDetails ? `${this.props.peopleDetails.gender === 1 ? 'Female' : 'Male'}` : ''} | {this.props.peopleDetails ? this.props.peopleDetails.known_for_department : ''}</p>
              <p className="item-details-header-info-container-content__genre">{this.props.peopleDetails.birthday ? this.formatYearOfBirth(this.props.peopleDetails.birthday) + ' | ' + this.findAge(this.props.peopleDetails.birthday) + ' yo' : ''}</p>

            </div>

          </div>
        );
      default:
        return null;
    }
  }

  // Returns summary based on media type details
  ItemDetailsMainSummary = type => {
    switch (type) {

      case 'movie':
        return(
          <div className="item-details-main-summary">
            <h2 className="item-details-main-summary__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Summary</h2>
            <p className="item-details-main-summary__content">{this.props.movieDetails.overview ? `${this.props.movieDetails.overview.length > 0 ? this.props.movieDetails.overview : 'Overview not found'}` : ''}</p>
          </div>
        );

      case 'tv':
        return(
          <div className="item-details-main-summary">
            <h2 className="item-details-main-summary__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Summary</h2>
            <p className="item-details-main-summary__content">{this.props.TVDetails.overview ? `${this.props.TVDetails.overview.length > 0 ? this.props.TVDetails.overview : 'Overview not found'}` : ''}</p>
          </div>
        );

      case 'people':
        return(
          <div className="item-details-main-summary">
            <h2 className="item-details-main-summary__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Biography</h2>
            <p className="item-details-main-summary__content">{this.props.peopleDetails.biography ? this.shortText(this.props.peopleDetails.biography, 100) : ''}</p>
          </div>
        );

      default:
        return null;
    }
  }

  // Returns cast based on media type details
  ItemDetailsMainCast = type => {
    switch (type) {

      case 'movie':
        return(
          <div className="item-details-main-cast">
            <h2 className="item-details-main-cast__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Cast</h2>
            <PeopleCarousel backdropUrl={this.props.movieDetails ? this.props.movieDetails.backdrop_path : ''} MDBConfig={this.props.MDBConfig} people={this.props.movieCredits.cast ? this.props.movieCredits.cast : ''} />
          </div>
        );

      case 'tv':
        return(
          <div className="item-details-main-cast">
            <h2 className="item-details-main-cast__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Cast</h2>
            <PeopleCarousel backdropUrl={this.props.TVDetails ? this.props.TVDetails.backdrop_path : ''} MDBConfig={this.props.MDBConfig} people={this.props.TVCredits ? this.props.TVCredits.cast : ''} />
          </div>
        );

      case 'people':
        return null;

      default:
        return null;
    }
  }

  // Returns trailers based on media type details
  ItemDetailsMainTrailers = type => {
    switch (type) {

      case 'movie':
        return(
          <div className="item-details-main-trailers">
            <h2 className="item-details-main-trailers__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Trailers</h2>
            {this.props.movieTrailers.results.length > 0 ?
              <TrailerCarousel movieTrailers={this.props.movieTrailers} />
              :
              <h3 className="item-details-main-trailers__error">No trailers found :(</h3>
            }
          </div>
        );

      case 'tv':
        return(
          <div className="item-details-main-trailers">
            <h2 className="item-details-main-trailers__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Trailers</h2>
            {this.props.TVTrailers.results.length > 0 ?
              <TrailerCarousel movieTrailers={this.props.TVTrailers} />
              :
              <h3 className="item-details-main-trailers__error">No trailers found :(</h3>
            }
          </div>
        );

      case 'people':
        return null;

      default:
        return null;
    }
  }

  // Returns reviews based on media type details
  ItemDetailsMainReviews = type => {
    switch (type) {

      case 'movie':
        return(
          <div className="item-details-main-reviews">
            <h2 className="item-details-main-reviews__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Popular Reviews</h2>

            {this.props.movieReviews.results.length > 0 ? this.props.movieReviews.results.map(review =>
              (<div key={review.url} className="item-details-main-reviews-container">
                <h3 className="item-details-main-reviews-container__author">{review.author}</h3>
                <p className="item-details-main-reviews-container__content">{this.shortText(review.content)}</p>
                <a className="item-details-main-reviews-container__link" href={review.url} target="_blank">
                  <p>See full review</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>
                </a>
              </div>)
          ) :
            (<div className="item-details-main-reviews-container">
              <p className="item-details-main-reviews-container__error">No reviews found :(</p>
            </div>)
          }

          </div>
        );

      case 'tv':
        return(
          <div className="item-details-main-reviews">
            <h2 className="item-details-main-reviews__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Popular Reviews</h2>

            {this.props.TVReviews.results.length > 0 ? this.props.TVReviews.results.map(review =>
              (<div key={review.url} className="item-details-main-reviews-container">
                <h3 className="item-details-main-reviews-container__author">{review.author}</h3>
                <p className="item-details-main-reviews-container__content">{this.shortText(review.content)}</p>
                <a className="item-details-main-reviews-container__link" href={review.url} target="_blank" rel="noopener noreferrer">
                  <p>See full review</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>
                </a>
              </div>)
          ) :
            (<div className="item-details-main-reviews-container">
              <p className="item-details-main-reviews-container__error">No reviews found :(</p>
            </div>)
          }

          </div>
        );

      case 'people':
        return(
          <div className="item-details-main-popular-roles">
            <h2 className="item-details-main-popular-roles__title wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">Popular Roles</h2>

            {this.props.peopleCombinedCredits.cast.length > 0 ? this.props.peopleCombinedCredits.cast.map((role, index) =>
              index < 15 ?
              (
                <div key={role.title} className="item-details-main-popular-roles-container">
                  <Link to={`/details/${role.media_type}/${role.id}`}>
                    <header className="item-details-main-popular-roles-container-header">
                      <img className="iitem-details-main-popular-roles-container-header-image" src={this.props.MDBConfig.images ? this.props.MDBConfig.images.secure_base_url +  this.props.MDBConfig.images.poster_sizes[0] + role.poster_path : ''} alt={role.title} />
                      <div className="item-details-main-popular-roles-container-header-info">
                        <h3 className="item-details-main-popular-roles-container-header-info__title">{role.title}</h3>
                        <p className="item-details-main-popular-roles-container-header-info__character">{role.character}</p>
                      </div>
                    </header>
                  </Link>

                  <p className="item-details-main-popular-roles-container__content">{this.shortText(role.overview)}</p>

                </div>
            )
              : null
          ) :
            (<div className="item-details-main-popular-roles-container">
              <p className="item-details-main-popular-roles-container__error">No roles found :(</p>
            </div>)
          }

          </div>
        );

      default:
        return null;
    }
  }

  render() {

    return(
      <div className="item-details" id="item-details-top">

        <header className="item-details-header-info"
        style={{
          background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
          url(${this.props.MDBConfig.images ? `${this.props.MDBConfig.images.secure_base_url}original${this.props.match.params.type === 'people' ? `${this.props.location.state ? this.props.location.state.backdropUrl : `${this.props.peopleCombinedCredits.cast.length > 0 ? this.props.peopleCombinedCredits.cast[0].backdrop_path : ''}`}` : `${this.props.match.params.type === 'movie' ? this.props.movieDetails.backdrop_path : this.props.TVDetails.backdrop_path}`}` : ''})
          center top no-repeat`}}>

          <div className="item-details-header-info-nav">
            <svg className="item-details-header-info-nav__icon wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="2s" onClick={() => this.props.history.goBack()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"/></svg>
            <svg onClick={this.handleShareButton} className="item-details-header-info-nav__icon wow fadeInLeft" data-wow-delay=".5s" data-wow-duration="2s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 248L288 96v85.334C138.666 202.667 85.333 309.334 64 416c53.333-74.666 117.333-108.802 224-108.802v87.469L448 248z"/></svg>
          </div>

          {/* Share bar */}
          <div className="item-details-header-info-share-buttons item-details-header-info-share-buttons__hide">

              <a onClick={this.handleShareButton} href={`mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 ${'www.filmcloud.xyz/' + this.props.match.params.type + '/' + `${this.props.match.params.type === 'movie' ? this.props.movieDetails.id : this.props.TVDetails.id}`}`}><img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" /></a>
              <a onClick={this.handleShareButton} href={`http://www.facebook.com/sharer.php?u=${'www.filmcloud.xyz/' + this.props.match.params.type + '/' + `${this.props.match.params.type === 'movie' ? this.props.movieDetails.id : this.props.TVDetails.id}`}`} rel="noopener noreferrer" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" /></a>
              <a onClick={this.handleShareButton} href={`https://plus.google.com/share?url=${'www.filmcloud.xyz/' + this.props.match.params.type + '/' + `${this.props.match.params.type === 'movie' ? this.props.movieDetails.id : this.props.TVDetails.id}`}`} rel="noopener noreferrer" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" /> </a>
              <a onClick={this.handleShareButton} href={`http://reddit.com/submit?url=${'www.filmcloud.xyz/' + this.props.match.params.type + '/' + `${this.props.match.params.type === 'movie' ? this.props.movieDetails.id : this.props.TVDetails.id}`}&amp;title=Film Cloud`} rel="noopener noreferrer" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/reddit.png" alt="Reddit" /></a>
              <a onClick={this.handleShareButton} href={`http://www.tumblr.com/share/link?url=${'www.filmcloud.xyz/' + this.props.match.params.type + '/' + `${this.props.match.params.type === 'movie' ? this.props.movieDetails.id : this.props.TVDetails.id}`}&amp;title=Film Cloud`} rel="noopener noreferrer" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/tumblr.png" alt="Tumblr" /></a>
              <a onClick={this.handleShareButton} href={`https://twitter.com/share?url=${'www.filmcloud.xyz/' + this.props.match.params.type + '/' + `${this.props.match.params.type === 'movie' ? this.props.movieDetails.id : this.props.TVDetails.id}`}&amp;text=Film%20Cloud%20&amp;hashtags=filmcloud`} rel="noopener noreferrer" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" /></a>

          </div>

          {this.ItemDetailsHeaderImage(this.props.match.params.type)}

        </header>

        <main className="item-details-main">

          {this.ItemDetailsMainSummary(this.props.match.params.type)}
          {this.ItemDetailsMainCast(this.props.match.params.type)}
          {this.ItemDetailsMainTrailers(this.props.match.params.type)}
          {this.ItemDetailsMainReviews(this.props.match.params.type)}

        </main>

        <Loader />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  userDetails: state.getUserDetails,
  session: state.getSession,
  logInStatus: state.toggleLogInStatus.status,

  itemType: state.setItemType.itemType,

  movieDetails: state.getMovieDetails,
  movieCredits: state.getMovieCredits,
  movieTrailers: state.getMovieTrailers,
  movieReviews: state.getMovieReviews,

  TVDetails: state.getTVDetails,
  TVCredits: state.getTVCredits,
  TVTrailers: state.getTVTrailers,
  TVReviews: state.getTVReviews,

  peopleDetails: state.getPeopleDetails,
  peopleCombinedCredits: state.getPeopleCombinedCredits,
});

const mapDispatchToProps = dispatch => ({
  getMovieDetails: url => dispatch(getMovieDetails(url)),
  getMovieCredits: url => dispatch(getMovieCredits(url)),
  getMovieTrailers: url => dispatch(getMovieTrailers(url)),
  getMovieReviews: url => dispatch(getMovieReviews(url)),

  getTVDetails: url => dispatch(getTVDetails(url)),
  getTVCredits: url => dispatch(getTVCredits(url)),
  getTVTrailers: url => dispatch(getTVTrailers(url)),
  getTVReviews: url => dispatch(getTVReviews(url)),

  getPeopleDetails: url => dispatch(getPeopleDetails(url)),
  getPeopleCombinedCredits: url => dispatch(getPeopleCombinedCredits(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
