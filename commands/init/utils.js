const commandExists = require('command-exists')

const isYarn = commandExists.sync('yarnpkg')
const cli = isYarn ? 'yarn' : 'npm'
const yarnReplacers = new Map()
const npmReplacers = new Map()

yarnReplacers.set(/^run /, '');
yarnReplacers.set(/^install /, 'add ');
yarnReplacers.set(/--save-dev/, '--dev');
npmReplacers.set(/--dev/, '--save-dev');
npmReplacers.set(/^add /, 'install ');
npmReplacers.set(/--fix/, '-- --fix');

const packageManager = (command, registry) => {
  if (!command) {
    return cli
  }

  const formatted = [...(isYarn ? yarnReplacers : npmReplacers)].reduce(
    (command, [matcher, replacement]) =>
      matcher.test(command) ? command.replace(matcher, replacement) : command,
    command,
  )

  return registry
    ? `${cli} --registry ${registry} ${formatted}`
    : `${cli} ${formatted}`
}

module.exports = { packageManager }
