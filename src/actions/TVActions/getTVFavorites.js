import { GET_TV_FAVORITES } from '../types';

const saveTVFavorites = payload => ({
  type: GET_TV_FAVORITES,
  payload
});

const getTVFavorites = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVFavorites(data)))
    .catch(error => console.log(error));
  };
};

export default getTVFavorites;
