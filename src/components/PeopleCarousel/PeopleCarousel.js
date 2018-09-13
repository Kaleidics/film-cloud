import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Swiper from 'swiper';
import backup from './images/backup.jpg';
import './PeopleCarousel.scss'


class PeopleCarousel extends Component {

  render() {

    // Initiate carousels
    (() => {
      const sliderEl = document.querySelectorAll('.swiper-container');
       if(!sliderEl){
         return;
       }
       const slider = new Swiper(sliderEl, {
         init: true,
         slidesPerView: 5,
         loop: true,
         spaceBetween: 30,
         observer: true,

         breakpoints: {
           768: {
             slidesPerView: 5
           },
           640: {
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

    const config = this.props.MDBConfig;

    return(
      <div className="people-carousel-container">
        {this.props.people.length > 0 ?
          <div className="swiper-container">

            <div className="swiper-wrapper">

              {/* Loops through people data and returns a carousel item */}
              {this.props.people.map((person, i) => {
                if (i <= 10) {
                  return(
                    <div key={person.id} className="swiper-slide">
                      <Link to={{ pathname: `/details/people/${person.id}`, state: {backdropUrl: this.props.backdropUrl} }}>
                        <img className="swiper-slide__image" src={person.profile_path && config.images ? `${config.images ? config.images.secure_base_url : ''}${config.images ? config.images.profile_sizes[1] : ''}${person.profile_path}` : backup} alt={person.name} />
                        <h3 className="swiper-slide__title">{person.name}</h3>
                      </Link>
                    </div>
                  );
                }
              })}


            </div>

            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        :
        <p className="people-carousel-container-error">No cast found :(</p>
      }
      </div>
    );
  }
};

export default withRouter(PeopleCarousel);
