import { GET_TV_FAVORITES } from '../../actions/types';

const initialState = {
  results: []
};

const getTVFavorites = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_FAVORITES:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getTVFavorites;
