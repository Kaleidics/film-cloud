import { SEARCH_DATA } from '../actions/types';

const initialState = {
  results: []
};

const searchData = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_DATA:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default searchData;
