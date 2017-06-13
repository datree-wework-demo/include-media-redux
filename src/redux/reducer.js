import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import { isFSA } from 'flux-standard-action';
import media from '../media';
import UPDATE_BREAKPOINTS from './UPDATE_BREAKPOINTS';

// If combining with another reducer, you will need to set the initial state there.
const initialState = {
  breakpoints: media.config.initialState,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BREAKPOINTS: {
      if (media.config.debug && !isFSA(action)) {
        media.config.log.warn(
          'Not dispatching a Flux standard action.',
          'See https://github.com/acdlite/flux-standard-action for more information.'
        );
      }

      let breakpoints = get(action, 'payload.breakpoints');

      if (!isPlainObject(breakpoints)) {
        if (media.config.debug) {
          media.config.log.warn('Must dispatch a payload with a breakpoints key, whose value is an object.');
        }
        breakpoints = {};
      }

      return {
        ...state,
        breakpoints,
      };
    }
    default:
      return state;
  }
}
