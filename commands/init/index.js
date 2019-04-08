const { ensureDirSync, pathExistsSync, readJsonSync, removeSync, writeJsonSync } = require('fs-extra')
const { basename, join, relative } = require('path')
const { cyan, green, white, yellow } = require('chalk')
const Generator = require('yeoman-generator')
const { appendFileSync } = require('fs')
const { questions } = require('./constants')
const { packageManager } = require('./utils')
const packageJsonTemplate = require('./package.json')
const merge = require('deepmerge')
const Case = require('case')
const cepScriptsConfig = require('@pluginplay/cep-scripts/cep-scripts.json')

module.exports = class Project extends Generator {
  _spawnSync(cmd) {
    const [command, ...args] = cmd.split(' ')
    const { directory, stdio, debug } = this.options
    const result = this.spawnCommandSync(command, args, {
      cwd: directory,
      stdio,
      env: process.env,
    })

    if (result.error || result.status !== 0) {
      if (result.error) {
        // The child process failed to start entirely, or timed out.
        this.log.error(result.error)
      }

      this.log.error(`The command "${cmd}" exited unsuccessfully.`)

      if (!debug) {
        this.log.error('Cleaning up the incomplete project directory.')
        removeSync(directory);
        this.log.error(
          'Try again with the --debug flag for more information and to skip cleanup.',
        )
      }

      process.exit(result.status || 1)
    }

    return result
  }

  async prompting () {
    const done = this.async()

    this.log(white.bold('Welcome to the Plugin Play CEP Generator! 👋'))
    this.log(cyan('To help you create your new plugin, I am going to ask you a few questions.\n'))

    const answers = await this.prompt(questions(this.options.name))
    const packageJson = merge(packageJsonTemplate, {
      name: this.options.name,
      description: answers.description,
      extendScriptClass: Case.pascal(this.options.name),
      manifest: {
        bundleName: answers.bundleName,
        bundleId: answers.bundleId,
        extensions: {
          panel: {
            title: answers.bundleName
          }
        }
      }
    })
    const cepScriptsJson = merge(cepScriptsConfig, {
      packageName: `${this.options.name}-[version].zxp`,
      packageZipName: `${this.options.name}-[version].zip`,
      certificateName: this.options.name
    })

    this.data = {
      ...answers,
      packageJson,
      cepScriptsJson
    }

    this.log(
      `\n👌  ${white.bold(
        'Looks like I have all the info I need. Give me a moment while I create your project!',
      )}\n`
    )

    done()
  }

  writing () {
    const { directory, name } = this.options

    if (pathExistsSync(directory)) {
      this.log.error(
        `The directory ${directory} already exists. ` +
          'For safety, please use create-cep-project with a non-existent directory.'
      )
      process.exit(1)
    }

    ensureDirSync(directory)

    const { packageJson, cepScriptsJson } = this.data
    const { dependencies, devDependencies, ...pkgJson } = packageJson
    const jsonPath = join(directory, 'package.json')

    this._spawnSync(packageManager('init --yes'))
    writeJsonSync(jsonPath, merge(readJsonSync(jsonPath), pkgJson), {
      spaces: 2
    })
    this.log(
      `   ${green('create')} ${join(basename(directory), 'package.json')}`,
    )

    const cepJsonPath = join(directory, 'cep-scripts.json')
    writeJsonSync(cepJsonPath, cepScriptsJson, {
      spaces: 2
    })
    this.log(
      `   ${green('create')} ${join(basename(directory), 'cep-scripts.json')}`,
    )

    this._spawnSync('npx gitignore node')
    appendFileSync(
      join(directory, '.gitignore'),
      '\n#Neutrino build directory\nbuild'
    )
    appendFileSync(
      join(directory, '.gitignore'),
      `\n#Plugin Play CEP\nsigning/certificate/*\ncep-scripts.json\n${name}*.zxp\n${name}*.zip\nbuild\naescripts`
    )

    this.fs.copyTpl(
      this.templatePath('**'),
      directory,
      { data: { ...this.options, ...this.data } },
      {},
      { globOptions: { dot: true } }
    )
  }

  install () {
    const { registry } = this.options
    const { dependencies, devDependencies } = this.data.packageJson

    this.log('')

    if (dependencies && dependencies.length) {
      this.log(
        `${green('⏳  Installing dependencies:')} ${yellow(
          dependencies.join(', '),
        )}`,
      )
      this._spawnSync(
        packageManager(`add ${dependencies.sort().join(' ')}`, registry),
      )
    }

    if (devDependencies && devDependencies.length) {
      this.log(
        `${green('⏳  Installing devDependencies:')} ${yellow(
          devDependencies.join(', '),
        )}`,
      )
      this._spawnSync(
        packageManager(
          `add --dev ${devDependencies.sort().join(' ')}`,
          registry,
        ),
      )
    }
  }

  end () {
    const { directory } = this.options

    this.log(`\n${green('Hooray, I successfully created your project!')}`)
    this.log(
      `\nI have added a few ${packageManager()} scripts to help you get started:`,
    )
    this.log(
      `  • To build your plugin run:  ${cyan.bold(
        packageManager('run build'),
      )}`,
    )
    this.log(
      `  • To deploy your plugin to After Effects locally run:  ${cyan.bold(
        packageManager('run deploy-local'),
      )}`,
    )
    this.log(
      `  • To package your plugin run:  ${cyan.bold(
        packageManager('run package'),
      )}`,
    )
    this.log(
      `  • To update your CHANGELOG and generate a new release run:  ${cyan.bold(
        packageManager('run release'),
      )}`,
    )
    this.log(
      `  • To publish a release of your plugin to GitHub run:  ${cyan.bold(
        packageManager('run publish-release'),
      )}`,
    )

    this.log('\nNow change your directory to the following to get started:')
    this.log(`  ${cyan('cd')} ${cyan(relative(process.cwd(), directory))}`)
    this.log(yellow.bold('\nMake sure to update cep-scripts.json before deploying locally or packaging!\n'))
    this.log(`\n❤️  ${white.bold('Plugin Play & Neutrino')}`)
  }
}
