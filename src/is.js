/**
 * Given a redux store, returns whether the current screen size is less
 * than, greater than or equal to a given media breakpoint. You can also
 * compound the query. For example, to find out if the current viewport is less
 * than `sm` you would simple write:
 *
 * ```js
 * is.lessThan('sm');
 * ```
 *
 * If you want to know if the current viewport is less than OR equal
 * `sm` you'd write:
 *
 * ```js
 * is.lessThan.orEqualTo('sm');
 * ```
 *
 * @param {function} getSelector - A function that returns a selector that should grab the breakpoint data
 *                                 in the redux store.
 * @return {boolean}
 */
const callCallbacks = getSelector => callback => state => {
  const breakpointData = getSelector()(state);
  const callbacks = [].concat(callback);
  for (let i = 0; i < callbacks.length; i += 1) {
    const someCallbackValue = callbacks[i](breakpointData);
    if (someCallbackValue) return true;
  }

  return false;
};

const lessThanCallback = breakpoint => breakpointData => {
  return !breakpointData[breakpoint];
};

const greaterThanCallback = breakpoint => breakpointData => {
  return breakpointData[breakpoint];
};

const orEqualToCallback = breakpoint => breakpointData => {
  return breakpointData[`${breakpoint}Equal`];
};

function lessThan(breakpoint) {
  return callCallbacks(this.getSelector)(lessThanCallback(breakpoint));
}

function greaterThan(breakpoint) {
  return callCallbacks(this.getSelector)(greaterThanCallback(breakpoint));
}

function orEqualTo(ancillaryCallback, breakpoint) {
  return callCallbacks(this.getSelector)([orEqualToCallback(breakpoint), ancillaryCallback(breakpoint)]);
}

const is = { lessThan, greaterThan };

lessThan.orEqualTo = orEqualTo.bind(is, lessThanCallback);
greaterThan.orEqualTo = orEqualTo.bind(is, greaterThanCallback);

export default is;
