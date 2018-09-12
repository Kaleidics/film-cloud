import React, { Component } from 'react';
import { connect } from 'react-redux';

import setItemType from '../../actions/setItemType';

import postMoviesNowPlaying from '../../actions/movieActions/postMoviesNowPlaying';
import postMoviesPopular from '../../actions/movieActions/postMoviesPopular';
import postMoviesTopRated from '../../actions/movieActions/postMoviesTopRated';
import postMoviesUpcoming from '../../actions/movieActions/postMoviesUpcoming';

import postTVAiringToday from '../../actions/TVActions/postTVAiringToday';
import postTVPopular from '../../actions/TVActions/postTVPopular';
import postTVOnTheAir from '../../actions/TVActions/postTVOnTheAir';
import postTVTopRated from '../../actions/TVActions/postTVTopRated';

import Swiper from 'swiper';
import MainNav from '../MainNav/MainNav';
import HomeHeader from '../HomeHeader/HomeHeader';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import MainFooter from '../MainFooter/MainFooter';
import Loader from '../Loader/Loader';

import './Home.scss';

class Home extends Component {

  // Checks which type of data to fetch
  componentDidMount() {
    if (this.props.itemType === 'MOVIE') {
      this.handleMovieFetch();
    } else if (this.props.itemType === 'TV') {
      this.handleTVFetch();
    }
  }

  // fetches movie data
  handleMovieFetch = () => {
    this.props.postMoviesUpcoming(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.props.apiKey}&language=en-US&page=1`);
    this.props.postMoviesPopular(`https://api.themoviedb.org/3/movie/popular?api_key=${this.props.apiKey}&language=en-US&page=1`);
    this.props.postMoviesNowPlaying(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.props.apiKey}&language=en-US&page=1`);
    this.props.postMoviesTopRated(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.props.apiKey}&language=en-US&page=1`);
  }

  // fetches tv data
  handleTVFetch = () => {
    this.props.postTVAiringToday(`https://api.themoviedb.org/3/tv/airing_today?api_key=${this.props.apiKey}&language=en-US&page=1`);
    this.props.postTVPopular(`https://api.themoviedb.org/3/tv/popular?api_key=${this.props.apiKey}&language=en-US&page=1`);
    this.props.postTVOnTheAir(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.props.apiKey}&language=en-US&page=1`);
    this.props.postTVTopRated(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.props.apiKey}&language=en-US&page=1`);
  }

  render() {
    // Initiates carousels
    (() => {
      const sliderEl = document.querySelectorAll('.swiper-container');
       if(!sliderEl){
         return;
       }
       const slider = new Swiper(sliderEl, {
         init: true,
         slidesPerView: 7,
         loop: true,
         spaceBetween: 14,
         observer: true,

         breakpoints: {
           1145: {
             slidesPerView: 5
           },
           699: {
             slidesPerView: 3
           },
         },
         pagination: {
           el: '.swiper-pagination',
           clickable: true
         },
         navigation: {
           nextEl: '.swiper-button-next',
           prevEl: '.swiper-button-prev',
         }
       });
    })();

    // Displays correct carousels
    let movie;
    if (this.props.itemType === 'MOVIE') {
      movie =
      <div>
        <ItemCarousel title="Upcoming" genres={this.props.movieGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.moviesUpcoming.results} type={this.props.itemType} />
        <ItemCarousel title="Popular" genres={this.props.movieGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.moviesPopular.results} type={this.props.itemType} />
        <ItemCarousel title="Now Playing" genres={this.props.movieGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.moviesNowPlaying.results} type={this.props.itemType} />
        <ItemCarousel title="Top Rated" genres={this.props.movieGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.moviesTopRated.results} type={this.props.itemType} />
      </div>;
    } else if (this.props.itemType === 'TV') {
      movie =
      <div>
        <ItemCarousel title="Airing Today" genres={this.props.TVGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.TVAiringToday.results} type={this.props.itemType} />
        <ItemCarousel title="Popular" genres={this.props.TVGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.TVPopular.results} type={this.props.itemType} />
        <ItemCarousel title="On The Air" genres={this.props.TVGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.TVOnTheAir.results} type={this.props.itemType} />
        <ItemCarousel title="Top Rated" genres={this.props.TVGenres.genres} MDBConfig={this.props.MDBConfig} items={this.props.TVTopRated.results} type={this.props.itemType} />
      </div>;
    }

    return(
      <div className="home-container">

        <MainNav />
        <HomeHeader itemType={this.props.itemType} MDBConfig={this.props.MDBConfig} movieGenres={this.props.itemType === 'TV' ? this.props.TVGenres : this.props.movieGenres} items={this.props.itemType === 'TV' ? this.props.TVAiringToday.results : this.props.moviesNowPlaying.results} />

        <div className="item-controller">
          <button className="item-controller__switch wow fadeInDown" data-wow-delay=".5s" data-wow-duration="1s" onClick={() => { this.props.setItemType('MOVIES'); this.handleMovieFetch(); }}>Movies</button>
          <button className="item-controller__switch wow fadeInDown" data-wow-delay=".5s" data-wow-duration="1s" onClick={() => { this.props.setItemType('TV'); this.handleTVFetch(); }}>TV Shows</button>
        </div>

        <div className="home-container-main">
          {movie}
        </div>

        <MainFooter />
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  movieGenres: state.postMovieGenres,
  TVGenres: state.postTVGenres,

  itemType: state.setItemType.itemType,

  moviesUpcoming: state.postMoviesUpcoming,
  moviesPopular: state.postMoviesPopular,
  moviesNowPlaying: state.postMoviesNowPlaying,
  moviesTopRated: state.postMoviesTopRated,

  TVAiringToday: state.postTVAiringToday,
  TVPopular: state.postTVPopular,
  TVOnTheAir: state.postTVOnTheAir,
  TVTopRated: state.postTVTopRated,
});

const mapDispatchToProps = dispatch => ({
  setItemType: type => dispatch(setItemType(type)),

  postMoviesUpcoming: url => dispatch(postMoviesUpcoming(url)),
  postMoviesPopular: url => dispatch(postMoviesPopular(url)),
  postMoviesNowPlaying: url => dispatch(postMoviesNowPlaying(url)),
  postMoviesTopRated: url => dispatch(postMoviesTopRated(url)),

  postTVAiringToday: url => dispatch(postTVAiringToday(url)),
  postTVPopular: url => dispatch(postTVPopular(url)),
  postTVOnTheAir: url => dispatch(postTVOnTheAir(url)),
  postTVTopRated: url => dispatch(postTVTopRated(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
