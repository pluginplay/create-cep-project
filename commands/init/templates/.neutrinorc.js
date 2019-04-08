module.exports = {
  options: {
    output: process.env.OUTPUT || 'build'
  },
  use: [
    '@neutrinojs/standardjs',
    ['neutrino-preset-cep'],
    ['@neutrinojs/jest', {
      setupFiles: [
        '<rootDir>/test/jest_setup.js'
      ],
      setupTestFrameworkScriptFile: '<rootDir>/test/jest_framework_setup.js'
    }],
    (neutrino) => {
      // Any additional Neutrino modifications go here...
    }
  ]
}
