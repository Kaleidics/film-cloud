import { POST_TV_POPULAR } from '../../actions/types';

const initialState = {
  results: []
};

const postTVPopular = (state = initialState, action) => {
  switch(action.type) {
    case POST_TV_POPULAR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default postTVPopular;
