import { GET_TV_REVIEWS } from '../../actions/types';

const initialState = {
  results: []
};

const getTVReviews = (state = initialState, action) => {
  switch(action.type) {
      case GET_TV_REVIEWS:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
  }
};

export default getTVReviews;
