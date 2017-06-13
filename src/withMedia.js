import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { connect } from 'react-redux';
import listener from './listener';
import media from './media';

const withMedia = ComposedComponent => {
  class EnhancedWithMedia extends Component {
    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      this.listener = listener(props.dispatch);
    }

    componentDidMount() {
      media.config.log.debug('Setting initial client-side breakpoint data within the redux store');
      this.listener();
      media.config.log.debug('Registering include-media resize handler');
      // eslint-disable-next-line no-undef
      window.addEventListener('resize', this.listener);
    }

    componentWillUnmount() {
      media.config.log.debug('De-registering include-media resize handler');
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', this.listener);
    }

    render() {
      // eslint-disable-next-line react/jsx-filename-extension
      return <ComposedComponent {...this.props} />;
    }
  }

  const EnhancedComponent = connect(null, null, null, { pure: false })(EnhancedWithMedia);
  return hoistStatics(EnhancedComponent, ComposedComponent);
};

export default withMedia;
