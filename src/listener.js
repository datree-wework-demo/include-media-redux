import debounce from 'lodash/debounce';
import media from './media';
import action from './redux/action';

/*
 * A function that dispatches a Flux Standard Action to update the breakpoint data.
 * Updates the state of the store based of the client width of the root document element.
 */
const updater = dispatch => {
  // eslint-disable-next-line no-undef
  const windowWidth = document.documentElement.clientWidth;
  if (windowWidth) {
    const newBreakpointData = media.read(windowWidth);
    dispatch(action(newBreakpointData));
  }
};

/*
 * A debounced version of `#updater`.
 */
const debouncedUpdater = debounce(updater, media.config.debounceDelay);

export const nonDebouncedListener = dispatch => () => updater(dispatch);
const listener = dispatch => () => debouncedUpdater(dispatch);

export default listener;
