import { GET_MOVIE_TRAILERS } from '../../actions/types';

const initialState = {
  results: []
};

const getMovieTrailers = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_TRAILERS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default getMovieTrailers;
