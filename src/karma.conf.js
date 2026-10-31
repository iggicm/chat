module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [require('karma-jasmine'), require('karma-chrome-launcher'), require('karma-coverage')],
    reporters: ['progress'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    browsers: process.env.CI ? ['ChromeHeadlessCI'] : ['ChromeHeadless'],
    singleRun: true,
    coverageReporter: {dir: require('path').join(__dirname, '../coverage'), reporters: [{type: 'html'}, {type: 'text-summary'}]}
  });
};
