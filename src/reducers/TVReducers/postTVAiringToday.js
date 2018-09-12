import { POST_TV_AIRING_TODAY } from '../../actions/types';

const intialState = {
  results: []
};

const postTVAiringToday = (state = intialState, action) => {
  switch(action.type) {
    case POST_TV_AIRING_TODAY:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default postTVAiringToday;
