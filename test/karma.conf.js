require('babel-register');
const webpackClientConfig = require('./webpack.client.config');
const saucelabsBrowsers = require('./saucelabs-browsers.json').browsers;

module.exports = function (config) {
  // Default
  let browsers = ['PhantomJS'];
  // Saucelabs run
  if (process.env.SAUCELABS === 'true') {
    browsers = Object.keys(saucelabsBrowsers);
  }

  config.set({
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'browser.index.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'browser.index.js': ['webpack'],
    },

    reporters: ['mocha'],

    client: {
      captureConsole: false,
      mocha: {
        reporter: 'html',
        ui: 'bdd',
      },
      chai: {
        includeStack: true,
      },
    },

    mochaReporter: {
      output: 'autowatch',
      showDiff: 'true',
    },

    webpack: webpackClientConfig,

    webpackServer: {
      headers: {},
      host: 'localhost',
      port: 8080,
      enabled: true,
      compress: true,
      stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
      },
    },
  });
};
