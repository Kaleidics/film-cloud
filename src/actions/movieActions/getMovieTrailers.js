import { GET_MOVIE_TRAILERS } from '../types';

const saveMovieTrailers = payload => ({
  type: GET_MOVIE_TRAILERS,
  payload
});

const getMovieTrailers = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveMovieTrailers(data)))
    .catch(error => console.log(error))
  };
};

export default getMovieTrailers;
