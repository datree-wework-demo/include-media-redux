import get from 'lodash/get';
import is from '../../../src/is';

describe('#is', () => {
  let currentState;

  const defaultBreakpoints = {
    xs: false,
    xsEqual: false,
    sm: false,
    smEqual: false,
    tablet: false,
    tabletEqual: false,
    md: false,
    mdEqual: false,
    lg: false,
    lgEqual: false,
  };

  beforeEach(() => {
    is.getSelector = () => state => get(state, 'breakpoints', {});
  });

  describe('below `sm` breakpoint', () => {
    beforeEach(() => {
      currentState = {
        breakpoints: {
          ...defaultBreakpoints,
          xs: true,
        },
      };
    });

    it('is greater than `xs`', () => {
      expect(is.greaterThan('xs')(currentState)).to.be.true;
    });

    it('is greater than or equal to `xs`', () => {
      expect(is.greaterThan.orEqualTo('xs')(currentState)).to.be.true;
    });

    it('is not less than `xs`', () => {
      expect(is.lessThan('xs')(currentState)).to.be.false;
    });

    it('is not less than or equal to `xs`', () => {
      expect(is.lessThan.orEqualTo('xs')(currentState)).to.be.false;
    });

    it('is less than `sm`', () => {
      expect(is.lessThan('sm')(currentState)).to.be.true;
    });

    it('is not greater than `sm`', () => {
      expect(is.greaterThan('sm')(currentState)).to.be.false;
    });

    it('is less than or equal to `sm`', () => {
      expect(is.lessThan.orEqualTo('sm')(currentState)).to.be.true;
    });

    it('is less than `tablet`', () => {
      expect(is.lessThan('tablet')(currentState)).to.be.true;
    });

    it('is not greater than `tablet`', () => {
      expect(is.greaterThan('tablet')(currentState)).to.be.false;
    });

    it('is less than `md`', () => {
      expect(is.lessThan('md')(currentState)).to.be.true;
    });

    it('is less than or equal to `md`', () => {
      expect(is.lessThan.orEqualTo('md')(currentState)).to.be.true;
    });

    it('is not greater than `md`', () => {
      expect(is.greaterThan('md')(currentState)).to.be.false;
    });

    it('is not greater than `md`', () => {
      expect(is.greaterThan('md')(currentState)).to.be.false;
    });
  });

  describe('on `sm` breakpoint', () => {
    beforeEach(() => {
      currentState = {
        breakpoints: {
          ...defaultBreakpoints,
          xs: true,
          sm: true,
          smEqual: true,
        },
      };
    });

    it('is not less than `sm`', () => {
      expect(is.lessThan('sm')(currentState)).to.be.false;
    });

    it('is less than or equal to `sm`', () => {
      expect(is.lessThan.orEqualTo('sm')(currentState)).to.be.true;
    });
  });
});
