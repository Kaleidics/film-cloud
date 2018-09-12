import { SET_ITEM_TYPE_MOVIE, SET_ITEM_TYPE_TV } from '../actions/types';

const initialState = {
  itemType: 'MOVIE'
};

const setItemType = (state = initialState, action) => {
  switch(action.type) {
    case SET_ITEM_TYPE_MOVIE:
      return {
        itemType: 'MOVIE'
      };
    case SET_ITEM_TYPE_TV:
      return {
        itemType: 'TV'
      };
    default:
      return state;
  }
};

export default setItemType;
