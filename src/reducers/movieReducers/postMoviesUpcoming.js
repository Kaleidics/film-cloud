import { POST_MOVIES_UPCOMING } from '../../actions/types';

const initialState = {
  results: []
};

const postMoviesUpcoming = (state = initialState, action) => {
  switch(action.type) {
    case POST_MOVIES_UPCOMING:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
};

export default postMoviesUpcoming;
