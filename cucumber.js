module.exports = {
  default: {
    requireModule: ['tsx'],
    require: ['tests/apps/steps/**/*.ts'],
    paths: ['tests/apps/features/**/*.feature'],
    format: ['progress', 'html:cucumber-report.html']
  }
}
