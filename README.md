include-media-redux
====================

>An adaptation of include-media-exports for redux.

# Introduction

This library is intended to make JS and CSS speak the same language when it comes to media queries. It is heavily inspired by [`include-media-export`](https://github.com/eduardoboucas/include-media-export). Using this library makes the assumes that you are:

- already using [`include-media`](https://github.com/eduardoboucas/include-media) to declare your breakpoints
- writing your CSS in Sass
- using redux to manage the state of your React application

# Usage

```jsx
// Content.jsx
import React from 'react';
import { connect } from 'react-redux';
import { media } from 'include-media-redux';

function Content({ lessThanMd }) {
  if (lessThanMd) {
    return 'Hello world from BELOW the `md` breakpoint.';
  }

  return 'Hello world from ABOVE the `md` breakpoint.';
}

export default connect(state => ({
  lessThanMd: media.is(state).lessThan('md'),
}))

// App.jsx

import React from 'react';
import { withMedia } from 'include-media-redux';
import Content from './Content.jsx';

function App() {
  return <div><Content /></div>;
}

export default withMedia(App);

// Root.jsx
import React from 'react';
import { Provider } from 'react';
import App from './App.jsx';
import { createStore } from 'redux';
import { reducer } from 'include-media-redux';
import { media } from 'include-media-redux';

// Configure your breakpoints
media({
  breakpoints: {
    sm: 300,
    md: 800,
  },
});

const store = createStore(reducer);

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
```

# Development

In lieu of a formal style guide, please ensure PRs follow the conventions present, and have been properly linted and tested. Feel free to open issues to discuss.

Be aware this module is tested in both browser and node runtimes.

## Available tasks

### Build and test
Runs all tests, static analysis, and bundle for distribution
```shell
$ yarn start
```

### Test
Runs browser and node tests
```shell
$ yarn test
```

Runs browser tests via PhantomJS only
```shell
$ yarn test:browser:once
```

Runs browser tests via SauceLabs only
```shell
$ SAUCELABS=true yarn test:browser
```

Runs node tests only
```shell
$ yarn test:node:once
```

### TDD
Runs browser and node tests in watch mode, re-bundles on src file change
```shell
$ yarn tdd
```

### Docs
Regenerate `API.md` docs from JSDoc comments
```shell
$ yarn docs
```

### Bundle
Packages client and node bundles for distribution, output to `/dist`
```shell
$ yarn bundle
```

### Distribute
Lints, cleans, bundles, and generates docs for distribution
```shell
$ yarn dist
```

### Release
We're using `np` to simplify publishing to git + npm. A changelog and docs are generated as part of this script.

```shell
$ npm run release <semver level/version>
$ npm run release patch # patch release
$ npm run release 100.10.1 # release specific version
```
