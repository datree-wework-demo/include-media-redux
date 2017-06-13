import { get, noop } from 'lodash/noop';
import media, { DEFAULT_BREAKPOINTS, DEFAULT_CONFIG } from '../../../src/media';

describe('media', () => {
  beforeEach(() => {
    media(DEFAULT_CONFIG);
  });

  afterEach(() => {
    media(DEFAULT_CONFIG);
  });

  describe('passing in a config', () => {
    describe('when caching the config', () => {
      it('starts out with a default config', () => {
        expect(media.config.debug).to.be.false;
        expect(media.config.log).to.eql(console);
        expect(media.config.breakpoints).to.eql(DEFAULT_BREAKPOINTS);
        expect(media.config.selector).to.be.a('function');
        expect(media.config.debounceDelay).to.eql(100);
      });

      it('can override the default configuration', () => {
        const newLogger = {
          info: noop,
          warn: noop,
          debug: noop,
          error: noop,
          trace: noop,
        };

        const newBreakpoints = {
          tiny: 0,
          sm: 400,
          md: 800,
          lg: 1200,
        };

        const newSelector = state => get(state, 'app.breakpoints');

        media({
          debug: true,
          log: newLogger,
          breakpoints: newBreakpoints,
          selector: newSelector,
          debounceDelay: 200,
        });

        expect(media.config.debug).to.be.true;
        expect(media.config.log).to.eql(newLogger);
        expect(media.config.breakpoints).to.eql(newBreakpoints);
        expect(media.config.selector).to.eql(newSelector);
        expect(media.config.debounceDelay).to.eql(200);
      });
    });
  });

  describe('#read', () => {
    let log;
    let newBreakpointData;

    beforeEach(() => {
      log = {
        trace: sinon.spy(),
      };

      media({
        log,
        breakpoints: {
          sm: 300,
          md: 400,
        },
      });

      newBreakpointData = {
        sm: false,
        smEqual: true,
        md: false,
        mdEqual: false,
      };
    });

    it('should produce breakpoint data for a viewport width of 300', () => {
      expect(media.read(300)).to.eql(newBreakpointData);
    });

    it('should trace log the update', () => {
      media.read(300);
      expect(log.trace).to.have.been.calledWith;
      ({ newBreakpointData }, 'Updated breakpoints');
    });
  });

  describe('#is', () => {
    let breakpoints;
    let state;

    beforeEach(() => {
      breakpoints = {
        sm: 300,
        md: 400,
      };

      media({ breakpoints });
    });

    describe('with breakpoint data', () => {
      beforeEach(() => {
        state = { breakpoints: media.read(301) };
      });

      it('should not be less than sm', () => {
        expect(media.is.lessThan('sm')(state)).to.be.false;
      });

      it('should be greater than sm', () => {
        expect(media.is.greaterThan('sm')(state)).to.be.true;
      });
    });
  });
});
