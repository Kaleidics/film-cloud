import { POST_TV_AIRING_TODAY } from '../types';

const saveTVAiringToday = payload => ({
  type: POST_TV_AIRING_TODAY,
  payload
});

const postTVAiringToday = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVAiringToday(data)))
    .catch(error => console.log(error))
  }
};

export default postTVAiringToday;
