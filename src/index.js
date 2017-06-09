/**
 * Figures out breakpoint data in relation to the current width of the viewport.
 * @param {number} viewportWidth The current width of the viewport
 * @param {object<string, number>} breakpoints A custom object that describes the breakpoint of an app.
 * @return {object<string, boolean>}
 */
function read(viewportWidth, breakpoints) {
  const newBreakpointData = Object.keys(breakpoints).reduce((currentObject, breakpoint) => {
    return {
      ...currentObject,
      [breakpoint]: breakpoints[breakpoint] < viewportWidth,
      [`${breakpoint}Equal`]: breakpoints[breakpoint] === viewportWidth,
    };
  }, {});

  return newBreakpointData;
}

/**
 * Given a breakpoint data object, returns whether the current screen size
 * is less than, greater than or equal to a given media breakpoint. You can also
 * compound the query. For example, to find out if the current viewport is less
 * than `sm` you would simple write:
 *
 * ```js
 * is(breakpointData).lessThan('sm');
 * ```
 *
 * If you want to know if the current viewport is less than OR equal
 * `sm` you'd write:
 *
 * ```js
 * is(breakpointData).lessThan().orEqualTo('sm');
 * ```
 *
 * @param {Object} Takes in breakpoint data and a media breakpoint as a string
 *                 and returns whether the current screen size is less than,
 *                 greater than or equal to that media breakpoint.
 * @return {Bool}
 */
function is(passedInBreakpoints) {
  return {
    lessThan(breakpoint) {
      if (breakpoint) {
        return !passedInBreakpoints[breakpoint];
      }

      return { ...this, type: 'lessThan' };
    },
    greaterThan(breakpoint) {
      if (breakpoint) {
        return !this.lessThan(breakpoint);
      }

      return { ...this, type: 'greaterThan' };
    },
    orEqualTo(breakpoint) {
      return (
        passedInBreakpoints[`${breakpoint}Equal`] ||
        this[this.type](breakpoint)
      );
    },
  };
}

export default {
  read,
  is,
};
