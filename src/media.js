import get from 'lodash/get';
import each from 'lodash/each';
import includes from 'lodash/includes';
import isPlainObject from 'lodash/isPlainObject';

import read from './read';
import is from './is';

/**
* Sets up the configuration for include-media-redux
*/
function media(config) {
  if (isPlainObject(config)) {
    media.config = {
      ...media.config,
      ...config,
    };
  }
}

media.read = (viewportWidth) => {
  const newBreakpointData = read(viewportWidth, media.config.breakpoints)
  media.config.log.trace({ newBreakpointData }, 'Updated breakpoints');
  return newBreakpointData;
};

media.is = (state) => {
  const breakpointData = media.config.selector(state);

  if (media.config.debug) {
    const breakpointNames = Object.keys(media.config.breakpoints);
    each(breakpointData, (_, breakpointName) => {
      const name = breakpointName.replace(/^(.+)(Equal)$/, '$1');
      if (!includes(breakpointNames, name)) {
        media.config.log.warn(`Breakpoint ${name} is not included in `, media.config.breakpoints);
      }
    })
  }

  return is(breakpointData);
}

// Example breakpoint data. This should be customized on a per app basis.
export const DEFAULT_BREAKPOINTS = {
  phonePortrait: 320, // iPhone 4 portrait width
  phoneLandscape: 480, // iPhone 4 landscape width
  tabletPortrait: 768, // iPad portrait width
  tabletLandscape: 1024, // iPad landscape width
};

export const DEFAULT_CONFIG = {
  selector: state => get(state, 'breakpoints', {}),
  breakpoints: DEFAULT_BREAKPOINTS,
  log: console,
  debug: false,
  debounceDelay: 100,
  initialState: {},
};

media.config = DEFAULT_CONFIG;

export default media;
