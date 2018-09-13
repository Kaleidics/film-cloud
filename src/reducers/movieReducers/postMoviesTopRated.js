import { POST_MOVIES_TOP_RATED } from '../../actions/types';

const initialState = {
  results: []
};

const postMoviesTopRated = (state = initialState, actions) => {
  switch(actions.type) {
    case POST_MOVIES_TOP_RATED:
      return {
        ...state,
        ...actions.payload
      };
    default:
      return state;
  }
};

export default postMoviesTopRated;
