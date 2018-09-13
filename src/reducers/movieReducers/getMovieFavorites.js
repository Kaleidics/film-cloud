import { GET_MOVIE_FAVORITES } from '../../actions/types';

const initialState = {
  results: []
};

const getMovieFavorites = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_FAVORITES:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getMovieFavorites;
