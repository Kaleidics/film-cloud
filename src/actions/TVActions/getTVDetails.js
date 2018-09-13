import { GET_TV_DETAILS } from '../types';

const saveTVDetails = payload => ({
  type: GET_TV_DETAILS,
  payload
});

const getTVDetails = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveTVDetails(data)))
    .catch(error => console.log(error))
  };
};

export default getTVDetails;
