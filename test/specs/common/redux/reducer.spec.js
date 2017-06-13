import breakpointsReducer from '../../../../src/redux/reducer';
import UPDATE_BREAKPOINTS from '../../../../src/redux/UPDATE_BREAKPOINTS';
import media, { DEFAULT_CONFIG } from '../../../../src/media';
import { createStore, combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

const appInitialState = {
  initialized: false,
  breakpoints: media.config.initialState,
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case 'APP_INITIALIZED':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

const appWithBreakpointsReducer = reduceReducers(appReducer, breakpointsReducer);
const rootReducer = combineReducers({
  app: appWithBreakpointsReducer,
});

describe('reducer', () => {
  let store;
  let log;

  beforeEach(() => {
    log = { warn: sinon.spy() };
    store = createStore(rootReducer)
    media({ ...DEFAULT_CONFIG, debug: true, log });
  });

  afterEach(() => {
    media(DEFAULT_CONFIG);
  });

  it('should start with an initial state', () => {
    expect(store.getState()).to.deep.eql({
      app: {
        initialized: false,
        breakpoints: {}
      },
    });
  });

  it('should should allow for updating the initialized app state of the store', () => {
    store.dispatch({ type: 'APP_INITIALIZED' });
    expect(store.getState().app.initialized).to.be.true;
  });

  describe('when dispatching a Flux Standard Action', () => {
    describe('when dispatching an action with payload that has a breakpoints key and whose value is a POJO', () => {
      it('should should allow for updating the breakpoints of the app', () => {
        const newBreakpointData = {
          sm: true,
          smEqual: false,
          md: false,
          mdEqual: false,
        };

        // Dispatch a Flux Standard Action
        store.dispatch({
          type: UPDATE_BREAKPOINTS,
          payload: { breakpoints: newBreakpointData },
        });

        expect(store.getState().app.breakpoints).to.eql(newBreakpointData);
        expect(log.warn).to.not.have.been.called;
      });
    });

    describe('when dispatching an action with an incorrectly formatted payload', () => {
      it('should return an empty object when the payload is a string', () => {
        // Dispatch a Flux Standard Action
        store.dispatch({
          type: UPDATE_BREAKPOINTS,
          payload: 'foo',
        });
        expect(store.getState().app.breakpoints).to.eql({});
        expect(log.warn).to.have.been.calledOnce;
      });

      it('should log an error when the payload is an object that does not have a `breakpoints` key', () => {
        // Dispatch a Flux Standard Action
        store.dispatch({
          type: UPDATE_BREAKPOINTS,
          payload: {},
        });
        expect(log.warn).to.have.been.calledOnce;
      });
    });
  });
});
