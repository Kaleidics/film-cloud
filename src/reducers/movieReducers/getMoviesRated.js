import { GET_MOVIES_RATED } from '../../actions/types';

const initialState = {
  results: []
};

const getMoviesRated = (state= initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_RATED:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default getMoviesRated;
