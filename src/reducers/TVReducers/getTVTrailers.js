import { GET_TV_TRAILERS } from '../../actions/types';

const initialState = {
  results: []
};

const getTVTrailers = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_TRAILERS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getTVTrailers;
