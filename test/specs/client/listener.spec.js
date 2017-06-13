import listener from '../../../src/listener';
import media, { DEFAULT_CONFIG } from '../../../src/media';
import UPDATE_BREAKPOINTS from '../../../src/redux/UPDATE_BREAKPOINTS';

describe('#listener', () => {
  let dispatch;
  let debounceDelay;

  beforeEach(() => {
    dispatch = sinon.spy();
    media(DEFAULT_CONFIG);
  });

  afterEach(() => {
    media(DEFAULT_CONFIG);
  });

  describe('listener', () => {
    // eslint-disable-next-line no-undef
    sinon.stub(document.documentElement, 'clientWidth').returns(301);
    debounceDelay = 500;
    beforeEach(() => {
      media({
        debounceDelay,
        breakpoints: {
          sm: 300,
          md: 800,
        },
      });
    });

    it('should not call the listener function twice if called twice in quick succession', () => {
      const listenerToCall = listener(dispatch);
      listenerToCall();
      listenerToCall();

      return new Promise(resolve => {
        setTimeout(() => {
          expect(dispatch).to.have.been.calledWith({
            type: UPDATE_BREAKPOINTS,
            payload: {
              breakpoints: {
                sm: true,
                smEqual: false,
                md: false,
                mdEqual: false,
              },
            },
          }).once;
          resolve();
        }, debounceDelay * 2);
      });
    });

    it('should call the listener twice if the calls are properly spaced out', () => {
      debounceDelay = 100;
      media({ debounceDelay });
      const listenerToCall = listener(dispatch);
      listenerToCall();

      return new Promise(resolve => {
        setTimeout(() => {
          listenerToCall();

          setTimeout(() => {
            expect(dispatch).to.have.been.calledTwice;
            resolve();
          }, debounceDelay * 2);
        }, debounceDelay * 2);
      });
    });
  });
});
