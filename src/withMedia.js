import React, { PureComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';
import listener from './listener';
import media from './media';
import hoistStatics from 'hoist-non-react-statics';

const withMedia = (Component) => {
  class EnhancedWithMedia extends PureComponent {
    constructor(props) {
      super(props);
      this.listener = listener(props.dispatch);
    }

    componentDidMount() {
      media.config.log.debug('Setting initial client-side breakpoint data within the redux store');
      this.listener();
      media.config.log.debug('Registering include-media resize handler');
      window.addEventListener('resize', this.listener);
    }

    componentWillMount() {
      media.config.log.debug('De-registering include-media resize handler');
      window.removeEventListener('resize', this.listener);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const EnhancedComponent = connect()(EnhancedWithMedia);
  return hoistStatics(EnhancedComponent, Component);
}

export default withMedia;
