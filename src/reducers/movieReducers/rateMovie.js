import { RATE_MOVIE } from '../../actions/types'

const initialState = {};

const rateMovie = (state = initialState, action) => {
  switch(action.type) {
    case RATE_MOVIE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default rateMovie;
