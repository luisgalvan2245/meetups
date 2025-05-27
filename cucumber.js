module.exports = {
  default: {
    requireModule: ['tsx'],
    require: ['tests/apps/features/step_definitions/**/*.ts'],
    paths: ['tests/apps/features/**/*.feature'],
    format: ['progress-bar', 'html:cucumber-report.html']
  }
}
