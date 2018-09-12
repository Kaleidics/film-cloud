import { POST_MOVIES_POPULAR } from '../../actions/types';

const initialState = {
  results: []
};

const postMoviesPopular = (state = initialState, action) => {
  switch(action.type) {
    case POST_MOVIES_POPULAR:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default postMoviesPopular;
