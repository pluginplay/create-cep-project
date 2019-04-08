const Case = require('case')

const questions = (appName) => [
  {
    name: 'bundleName',
    type: 'input',
    message: 'What is the human name of your plugin?',
    default: Case.title(appName)
  },
  {
    name: 'bundleId',
    type: 'input',
    message: 'What do you want your Bundle ID to be?',
    default: `app.pluginplay.${appName}`
  },
  {
    name: 'description',
    type: 'input',
    message: 'How would you describe your plugin? Keep it short and sweet!'
  }
]

module.exports = { questions }
