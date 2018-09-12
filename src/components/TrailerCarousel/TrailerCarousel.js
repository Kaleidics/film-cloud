import React, { Component } from 'react';
import Swiper from 'swiper'
import './TrailerCarousel.scss'

class TrailerCarousel extends Component {

  render() {

    // Initiates carousel
    (() => {
      const sliderEl = document.querySelectorAll('.trailer-swiper-container');
       if(!sliderEl){
         return;
       }
       const slider = new Swiper(sliderEl, {
         init: true,
         slidesPerView: 3,
         loop: true,
         spaceBetween: 0,
         observer: true,
         centeredSlides: true,

         breakpoints: {
           1500: {
             slidesPerView: 2,
           },
           800: {
             slidesPerView: 1,
           }
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

    return(
      <div className="trailer-carousel">
        <div className="trailer-swiper-container">

          <div className="swiper-wrapper">
            {this.props.movieTrailers.results.map(trailer => (

              <div key={trailer.key} className="swiper-slide">
                <iframe title="1" width="420" height="315"src={`https://www.youtube.com/embed/${trailer.key}`}></iframe>
              </div>

            ))}
          </div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    );
  }
}

export default TrailerCarousel;
