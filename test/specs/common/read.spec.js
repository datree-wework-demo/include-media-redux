import read from '../../../src/read';

describe('#read', () => {
  let breakpoints;

  beforeEach(() => {
    breakpoints = {
      sm: 300,
      md: 400,
    };
  });

  describe('with viewport width of 300', () => {
    it('should produce breakpoint data', () => {
      expect(read(300, breakpoints)).to.eql({
        sm: false,
        smEqual: true,
        md: false,
        mdEqual: false,
      });
    });
  });

  describe('with viewport width of 350', () => {
    it('should produce breakpoint data', () => {
      expect(read(350, breakpoints)).to.eql({
        sm: true,
        smEqual: false,
        md: false,
        mdEqual: false,
      });
    });
  });

  describe('with viewport width of 400', () => {
    it('should produce breakpoint data', () => {
      expect(read(400, breakpoints)).to.eql({
        sm: true,
        smEqual: false,
        md: false,
        mdEqual: true,
      });
    });
  });

  describe('with viewport width of 401', () => {
    it('should produce breakpoint data', () => {
      expect(read(401, breakpoints)).to.eql({
        sm: true,
        smEqual: false,
        md: true,
        mdEqual: false,
      });
    });
  });
});
