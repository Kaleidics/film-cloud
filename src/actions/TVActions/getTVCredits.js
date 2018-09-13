import { GET_TV_CREDITS } from '../types';

const saveTVCredits = payload => ({
  type: GET_TV_CREDITS,
  payload
});

const getTVCredits = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVCredits(data)))
    .catch(error => console.log(error))
  };
};

export default getTVCredits;
