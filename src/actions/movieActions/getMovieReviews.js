import { GET_MOVIE_REVIEWS } from '../types';

const saveMovieReviews = payload => ({
  type: GET_MOVIE_REVIEWS,
  payload
});

const getMovieReviews = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json(res))
    .then(data => dispatch(saveMovieReviews(data)))
    .catch(error => console.log(error))
  };
};

export default getMovieReviews;
