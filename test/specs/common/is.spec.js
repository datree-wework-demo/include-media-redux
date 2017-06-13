import is from '../../../src/is';

describe('#is', () => {
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

  describe('below `sm` breakpoint', () => {
    const breakpoints = {
      ...defaultBreakpoints,
      xs: true,
    };

    it('is greater than `xs`', () => {
      expect(is(breakpoints).greaterThan('xs')).to.be.true;
    });

    it('is greater than or equal to `xs`', () => {
      expect(is(breakpoints).greaterThan().orEqualTo('xs')).to.be.true;
    });

    it('is not less than `xs`', () => {
      expect(is(breakpoints).lessThan('xs')).to.be.false;
    });

    it('is not less than or equal to `xs`', () => {
      expect(is(breakpoints).lessThan().orEqualTo('xs')).to.be.false;
    });

    it('is less than `sm`', () => {
      expect(is(breakpoints).lessThan('sm')).to.be.true;
    });

    it('is not greater than `sm`', () => {
      expect(is(breakpoints).greaterThan('sm')).to.be.false;
    });

    it('is less than or equal to `sm`', () => {
      expect(is(breakpoints).lessThan().orEqualTo('sm')).to.be.true;
    });

    it('is less than `tablet`', () => {
      expect(is(breakpoints).lessThan('tablet')).to.be.true;
    });

    it('is not greater than `tablet`', () => {
      expect(is(breakpoints).greaterThan('tablet')).to.be.false;
    });

    it('is less than `md`', () => {
      expect(is(breakpoints).lessThan('md')).to.be.true;
    });

    it('is less than or equal to `md`', () => {
      expect(is(breakpoints).lessThan().orEqualTo('md')).to.be.true;
    });

    it('is not greater than `md`', () => {
      expect(is(breakpoints).greaterThan('md')).to.be.false;
    });

    it('is not greater than `md`', () => {
      expect(is(breakpoints).greaterThan('md')).to.be.false;
    });
  });

  describe('on `sm` breakpoint', () => {
    const breakpoints = {
      ...defaultBreakpoints,
      xs: true,
      sm: true,
      smEqual: true,
    };

    it('is not less than `sm`', () => {
      expect(is(breakpoints).lessThan('sm')).to.be.false;
    });

    it('is less than or equal to `sm`', () => {
      expect(is(breakpoints).lessThan().orEqualTo('sm')).to.be.true;
    });
  });
});
