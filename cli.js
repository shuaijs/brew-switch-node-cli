#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk');
const inquirer = require('inquirer');
const PKG = require('./package.json');
const { execSync } = require('child_process');

program
  .version(`@shuaijs/brew-switch-node-cli ${PKG.version}`)

program
  .command('ls')
  .description('List all installed node by brew')
  .action(onList);

program
  .command('go')
  .description('start change node version')
  .action(onStart);

program
  .command('sw <version>')
  .description('switch a node version')
  .action(onSwitch);

program
  .command('help', { isDefault: true })
  .description('Print this help')
  .action(function () {
      program.outputHelp();
  });

program
    .parse(process.argv);

function onList() {
  if (!hasBrew()) {
    console.log(
      chalk.red('brew is not installed')
    );
  }

  const currentVersion = getCurrentNodeVersion();
  console.log(
    chalk.green(`current node version: ${currentVersion}`)
  );

  const allVersions = getInstalledNodeVersions();
  if (!allVersions) {
    console.log(
      chalk.yellow('none of versions installed')
    );
  }

  console.log(
    chalk.green(`brew installed version:\n${allVersions}`)
  );

  return allVersions;
}

function onStart() {
  const allVersions = onList();
  const list = allVersions.split('\n');

  const promptList = [{
    type: 'list',
    message: 'Please select a version:',
    name: 'version',
    choices: list
  }];

  inquirer.prompt(promptList).then(({version}) => {
    onSwitch(version);
  })
}

function onSwitch(version) {
  if (!version) {
    console.log(
      chalk.red('version does not exist')
    );
  }

  const currentVersion = getCurrentNodeVersion();
  if (currentVersion.includes(version)) {
    console.log(
      chalk.yellow(`already in ${currentVersion}`)
    );
    return;
  }

  const allVersions = getInstalledNodeVersions();
  if (!allVersions.includes(version)) {
    console.log(
      chalk.yellow(`version ${version} not installed`)
    );
    return;
  }

  try {
    console.log('start switch...');
    execSync(`brew unlink node && brew switch node ${version}`);
    const currentVersion = getCurrentNodeVersion();
    console.log(
      chalk.green(`current node version: ${currentVersion}`)
    );
    console.log(
      chalk.green(`switch success`)
    );
  } catch (e) {
    console.log(
      chalk.red('switch error: ', e)
    );
  }
}

function hasBrew() {
  try {
    execSync('brew -v', {stdio: 'ignore'})
    return true;
  } catch (e) {
    console.log('e: ', e);
    return false;
  }
}

function getInstalledNodeVersions() {
  try {
    const str = execSync('ls /usr/local/Cellar/node*');
    return str.toString('utf8').trim();
  } catch (e) {
    console.log(
      chalk.red('error: ', e)
    );
    return '';
  }
}

function getCurrentNodeVersion() {
  try {
    const str = execSync('node --version');
    return str.toString('utf8').trim();
  } catch (e) {
    console.log(
      chalk.red('error: ', e)
    );
    return [];
  }
}