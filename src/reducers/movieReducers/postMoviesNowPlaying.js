import { POST_MOVIES_NOWPLAYING } from '../../actions/types';

const initialState = {
  results: []
};

const postMoviesNowPlaying = (state = initialState, action) => {
  switch(action.type) {
    case POST_MOVIES_NOWPLAYING:
      return {...action.payload};
    default:
      return state;
  }
};

export default postMoviesNowPlaying;
