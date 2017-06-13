import React from 'react';
import withmedia from '../../../src/withmedia';
import media, { DEFAULT_CONFIG } from '../../../src/media';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../../src/redux/reducer';
import { mount } from 'enzyme';
import UPDATE_BREAKPOINTS from '../../../src/redux/UPDATE_BREAKPOINTS';
import keys from 'lodash/keys';
import * as listenerModule from '../../../src/listener';
import noop from 'lodash/noop';

describe('withmedia', () => {
  let Component;
  let log;
  let breakpoints;
  let EnhancedComponent;
  let StoreWrappedComponent;
  let store;
  let dispatch;
  let debounceDelay;
  let addEventListener;
  let removeEventListener;
  let fakeListener;

  const mountComponent = (ComponentToWrap, store) => mount(
    <Provider store={store}>
      <ComponentToWrap />
    </Provider>
  );

  beforeEach(() => {
    fakeListener = noop;
    log = {
      debug: sinon.spy(),
      warn: sinon.spy(),
      trace: sinon.spy(),
    };

    breakpoints = {
      sm: 300,
      md: 800,
    };

    debounceDelay = 100;

    media({
      ...DEFAULT_CONFIG,
      log,
      breakpoints,
      debounceDelay,
    });

    store = createStore(reducer, { breakpoints: {} });
    sinon.stub(store, 'dispatch').callThrough();
    sinon.stub(window, 'addEventListener').callThrough();
    sinon.stub(window, 'removeEventListener').callThrough();

    Component = (props) => <div>Oh hai</div>;
    EnhancedComponent = withmedia(Component);
  });

  afterEach(() => {
    media(DEFAULT_CONFIG);
  });

  it('should dispatch the breakpoint data to the redux store on componentDidMount', () => {
    mountComponent(EnhancedComponent, store);

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(store.dispatch).to.have.been.calledOnce;
        const { type, payload } = store.dispatch.getCall(0).args[0];
        expect(type).to.eql(UPDATE_BREAKPOINTS);
        expect(payload).to.be.an.object;
        expect(payload).to.have.key('breakpoints');
        expect(keys(payload.breakpoints)).to.include('sm');
        expect(keys(payload.breakpoints)).to.include('smEqual');
        expect(keys(payload.breakpoints)).to.include('md');
        expect(keys(payload.breakpoints)).to.include('mdEqual');
        resolve();
      }, debounceDelay * 2)
    });
  });

  it('should add an event listener to the window on resize when the component mounts', () => {
    sinon.stub(listenerModule, 'default').returns(fakeListener);
    mountComponent(EnhancedComponent, store);
    expect(window.addEventListener).to.have.been.calledWith('resize', fakeListener);
  });

  it('should remove the event listener when the component unmounts', () => {
    sinon.stub(listenerModule, 'default').returns(fakeListener);
    const wrapper = mountComponent(EnhancedComponent, store);
    wrapper.unmount();
    expect(window.removeEventListener).to.have.been.calledWith('resize', fakeListener);
  });
});
