# Scaffold an Adobe After Effects CEP Project

Plugin Play & Neutrino can help you quickly start new projects by
scaffolding your initial project structure.

`@pluginplay/create-cep-project` is _heavily_ inspired by Neutrino's
`@neutrinojs/create-project` repository (a lot of the code from that
repository is used here). If you would like to know more about how
the build pipeline behind your created project is going to work, consider
familiarizing yourself with [Neutrino.](https://neutrinojs.org/)

## Getting Started

Run the following command to start the process. Substitute `<directory-name>`
with the directory name you wish to create for this project.

### Yarn

```
yarn create @pluginplay/cep-project <directory-name> 
```

_Note: The `create` command is a shorthand that helps you do two things
at once. See the [Yarn create docs](https://yarnpkg.com/lang/en/docs/cli/create/)
for more details._

### npm/npx

```
npx @pluginplay/create-cep-project <directory-name>
```

## Project Layout

`@pluginplay/create-cep-project` follows the standard [project layout](https://neutrinojs.org/project-layout/)
specified by Neutrino with some additional modifications. This means that by
default all project source code should live in a directory named `src` in the
root of the project. This includes JavaScript files, CSS stylesheets, images,
and any other assets that would be available to import to your compiled project.
Neutrino will scaffold the project with the initial `package.json`, Neutrino set up,
and project layout necessary to immediately start your project. `create-cep-project`
will also create an `extendscript` folder to house all of your pre-compilation
ExtendScript code.

When it comes to test runners, all project test code should live in a directory
named `test` in the root of the project. Be sure to check out the test runner preset
(in this case, Jest) to get more information on its features and how files should be named.

## Customization

Check out the [Neutrino customization documentation](https://neutrinojs.org/customization/)
for how to do this.
