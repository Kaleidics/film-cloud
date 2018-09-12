import React, { Component } from 'react';
import { connect } from 'react-redux';

import rateMovie from '../../actions/movieActions/rateMovie';

import './StarRating.scss';

class StartRating extends Component {

  // Removes all active stars and sets new active stars up to where the user clicked
  activateStar = e => {

    const nodes = e.target.closest(".star-rating-container__item").parentNode.childNodes;

    nodes.forEach(node => {
      node.classList.remove("star-rating-container__item--active");
    });

    for (let node of nodes) {
      node.classList.toggle("star-rating-container__item--active");
      if (e.target.closest(".star-rating-container__item") === node) {
        node.classList.toggle("star-rating-container__item__active");
        break;
      }

    }

  };

  // Activates stars based on star rating
  setRating = rating => {

    rating = Math.round(rating / 2);

    document.querySelectorAll('.star-rating-container__item').forEach((node, i) => {
      if (i < rating) {
        node.classList.add("star-rating-container__item--active");
      }
    });
  };

  // Posts user rating
  postRating = (e, logInStatus, itemType, itemId, apiKey, sessionId) => {

    if (logInStatus === 'GUEST') {
      this.activateStar(e);
      const rating = document.querySelectorAll('.star-rating-container__item__active').length * 2;

      if (itemType === 'movies') {
        this.props.rateMovie(`https://api.themoviedb.org/3/movie/${itemId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, rating);
      } else if (itemType === 'tv') {
        this.props.rateMovie(`https://api.themoviedb.org/3/tv/${itemId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, rating);
      }

    } else if (logInStatus === 'APPROVED') {
      this.activateStar(e);
      const rating = document.querySelectorAll('.star-rating-container__item__active').length * 2;

        if (itemType === 'movies') {
          this.props.rateMovie(`https://api.themoviedb.org/3/movie/${itemId}/rating?api_key=${apiKey}&session_id=${sessionId}`, rating);
        } else if (itemType === 'tv') {
          this.props.rateMovie(`https://api.themoviedb.org/3/tv/${itemId}/rating?api_key=${apiKey}&session_id=${sessionId}`, rating);
        }

        // Activates popup telling user to sign in
    } else {
      document.querySelector('.star-rating-container-warning').classList.remove('star-rating-container-warning--hide');
      setTimeout(() => {
        document.querySelector('.star-rating-container-warning').classList.add('star-rating-container-warning--hide');
      }, 3000);
    }

  }

  render() {
    this.setRating(this.props.rating);

    return(
      <div onClick={(e) => this.postRating(e, this.props.logInStatus, this.props.itemType, this.props.itemId, this.props.apiKey, this.props.sessionId.session_id)} className="star-rating-container">

        <svg className="star-rating-container__item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>
        <svg className="star-rating-container__item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>
        <svg className="star-rating-container__item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>
        <svg className="star-rating-container__item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>
        <svg className="star-rating-container__item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/></svg>

        <div className="star-rating-container-warning star-rating-container-warning--hide">
          <p>Please sign in to use feature</p>
        </div>

      </div>
    );
  }
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  logInStatus: state.toggleLogInStatus.status,
  sessionId: state.getSession,
});

const mapDispatchToProps = dispatch => ({
  rateMovie: (url, value) => dispatch(rateMovie(url, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartRating);
