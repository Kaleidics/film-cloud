import { GET_MOVIE_DETAILS } from '../../actions/types'

const initialState = {

};

const getMovieDetails = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getMovieDetails;
