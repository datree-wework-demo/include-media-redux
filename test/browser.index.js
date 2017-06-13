require('babel-register');
require('./runner');

// require all `/test/specs/**/*.spec.js`
const testsContext = require.context('./specs', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
