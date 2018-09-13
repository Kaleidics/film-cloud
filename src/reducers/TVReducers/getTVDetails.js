import { GET_TV_DETAILS } from '../../actions/types';

const initialState = {

};

const getTVDetails = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_DETAILS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getTVDetails;
