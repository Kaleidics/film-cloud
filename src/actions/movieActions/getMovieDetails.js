import { GET_MOVIE_DETAILS } from '../types.js'

const saveMovieDetails = payload => ({
  type: GET_MOVIE_DETAILS,
  payload
});

const getMovieDetails = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveMovieDetails(data)))
    .catch(error => console.log(error))
  }
};

export default getMovieDetails;
