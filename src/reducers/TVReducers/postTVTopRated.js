import { POST_TV_TOP_RATED } from '../../actions/types';

const initialState = {
  results: []
};

const postTVTopRated = (state = initialState, action) => {
  switch(action.type) {
    case POST_TV_TOP_RATED:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default postTVTopRated;
