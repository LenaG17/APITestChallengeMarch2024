const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Specify the pattern of test files
    specPattern: 'cypress/e2e/**/*.ts',
  },
})
