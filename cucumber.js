module.exports = {
  default: {
    requireModule: ['tsx'],
    require: ['tests/apps/steps/**/*.ts'],
    paths: ['tests/apps/features/**/*.feature'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
}
