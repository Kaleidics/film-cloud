import { POST_TV_ON_THE_AIR } from '../types';

const saveTVOnTheAir = payload => ({
  type: POST_TV_ON_THE_AIR,
  payload
});

const postTVOnTheAir = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVOnTheAir(data)))
    .catch(error => console.log(error))
  }
};

export default postTVOnTheAir;
