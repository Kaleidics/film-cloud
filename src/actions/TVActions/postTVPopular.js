import { POST_TV_POPULAR } from '../types';

const saveTVPopular = payload => ({
  type: POST_TV_POPULAR,
  payload
});

const postTVPopular = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVPopular(data)))
    .catch(error => console.log(error))
  }
};

export default postTVPopular;
