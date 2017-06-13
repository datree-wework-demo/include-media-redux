/**
 * Figures out breakpoint data in relation to the current width of the viewport.
 * @param {number} viewportWidth The current width of the viewport
 * @param {Object.<string, number>} breakpoints A custom object that describes the breakpoint of an app.
 * @return {Object.<string, boolean>}
 */
export default function read(viewportWidth, breakpoints) {
  const newBreakpointData = Object.keys(breakpoints).reduce((currentObject, breakpoint) => {
    return {
      ...currentObject,
      [breakpoint]: breakpoints[breakpoint] < viewportWidth,
      [`${breakpoint}Equal`]: breakpoints[breakpoint] === viewportWidth,
    };
  }, {});

  return newBreakpointData;
}
