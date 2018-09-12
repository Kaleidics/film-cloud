import { GET_MOVIES_RATED } from '../types';

const saveMoviesRated = payload => ({
  type: GET_MOVIES_RATED,
  payload
});

const getMoviesRated = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveMoviesRated(data)))
    .catch(error => console.log(error))
  };
};

export default getMoviesRated;
