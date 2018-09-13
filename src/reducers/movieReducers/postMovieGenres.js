import { POST_MOVIE_GENRES } from '../../actions/types';

const initialState = [];

const postMovieGenres = (state = initialState, action) => {
  switch(action.type) {
    case POST_MOVIE_GENRES:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default postMovieGenres;
