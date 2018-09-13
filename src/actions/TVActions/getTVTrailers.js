import { GET_TV_TRAILERS } from '../types';

const saveTVTrailers = payload => ({
  type: GET_TV_TRAILERS,
  payload
});

const getTVTrailers = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVTrailers(data)))
    .catch(error => console.log(error))
  };
};

export default getTVTrailers;
