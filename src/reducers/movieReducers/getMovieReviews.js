import { GET_MOVIE_REVIEWS } from '../../actions/types';

const initialState = {
  results: []
};

const getMovieReviews = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_REVIEWS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getMovieReviews;
