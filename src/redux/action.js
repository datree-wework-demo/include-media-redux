import UPDATE_BREAKPOINTS from './UPDATE_BREAKPOINTS';

/**
 * A flux standard action
 * @typedef {Object} FluxStandardAction
 * @property {string} type - The type of Flux Standard Action being dispatched
 * @property {*} payload - The payload of the Flux Standard Action being dispatched
 */

/**
 * Returns the Flux Standard Action to dispatch to the redux store
 * @param {Object.<string, boolean>} breakpointData - The breakpoint data read from media.read
 * @return {FluxStandardAction}
 */
export default function(breakpointData) {
  return {
    type: UPDATE_BREAKPOINTS,
    payload: {
      breakpoints: breakpointData,
    },
  };
}
