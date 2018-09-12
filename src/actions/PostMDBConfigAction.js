import { POST_MDB_CONFIG } from './types.js';

const saveMDBConfig = payload => ({
  type: POST_MDB_CONFIG,
  payload
});

export const postMDBConfig = url => {
  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(saveMDBConfig(data)))
    .catch(error => console.log(error));
  }
};
