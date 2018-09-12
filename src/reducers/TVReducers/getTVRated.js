import { GET_TV_RATED } from '../../actions/types';

const initialState = {
  results: []
};

const getTVRated = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_RATED:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getTVRated;
