import { GET_TV_CREDITS } from '../../actions/types'

const initialState = {
  cast: []
};

const getTVCredits = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_CREDITS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

 export default getTVCredits;
