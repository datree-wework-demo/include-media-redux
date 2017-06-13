require('babel-register');
const _ = require('lodash');
require('./runner');

// require all `/test/specs/**/*.spec.js`
const testsContext = require.context('./specs', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
