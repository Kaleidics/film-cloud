import { POST_TV_TOP_RATED } from '../types';

const saveTVTopRated = payload =>({
  type: POST_TV_TOP_RATED,
  payload
});

const postTVTopRated = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVTopRated(data)))
    .catch(error => console.log(error))
  }
}

export default postTVTopRated;
