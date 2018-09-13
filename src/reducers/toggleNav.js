import { TOGGLE_NAV } from '../actions/types';

const initialState = {
  navStatus: false
};

const toggleMav = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        navStatus: state.navStatus ? false : true
      }
    default:
      return state;
  }
}

export default toggleMav;
