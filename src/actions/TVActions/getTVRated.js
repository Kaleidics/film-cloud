import { GET_TV_RATED } from '../types';

const saveTVRated = payload => ({
  type: GET_TV_RATED,
  payload
});

const getTVRated = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVRated(data)))
    .catch(error => console.log(error));
  }
};

export default getTVRated;
