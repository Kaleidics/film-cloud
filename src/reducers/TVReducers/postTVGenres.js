import { POST_TV_GENRES } from '../../actions/types';

const initialState = {};

const postTVGenres = (state = initialState, action) => {
  switch(action.type) {
    case POST_TV_GENRES:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default postTVGenres;
