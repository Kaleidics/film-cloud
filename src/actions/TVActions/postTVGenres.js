import { POST_TV_GENRES } from '../types';

const saveTVGenres = payload => ({
  type: POST_TV_GENRES,
  payload
});

const postTVGenres = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVGenres(data)))
    .catch(error => console.log(error))
  }
};

export default postTVGenres;
