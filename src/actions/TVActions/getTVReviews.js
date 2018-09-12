import { GET_TV_REVIEWS } from '../types';

const saveTVReviews = payload => ({
  type: GET_TV_REVIEWS,
  payload
});

const getTVReviews = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVReviews(data)))
    .catch(error => console.log(error))
  };
};

export default getTVReviews;
