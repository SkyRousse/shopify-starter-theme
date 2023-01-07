/* eslint-disable consistent-return */
const fs = require('fs');
const chalk = require('chalk');
const prompts = require('prompts');
const { log, warn } = console;

const questions = [
  {
    type: 'select',
    name: 'storeType',
    message: 'Pick the store you want to work on',
    choices: [
      { title: 'DEV', value: 'development' },
      { title: 'PROD', value: 'production' }
    ],
  }
];

(async () => {
  const response = await prompts(questions);

  fs.readFile('.env', 'utf8', (readError, data) => {
    if (readError) return warn(readError);

    const result = data.replace(/NODE_ENV=.*/g, `NODE_ENV=${response.storeType}`);

    fs.writeFile('.env', result, 'utf8', (writeError) => {
      if (writeError) return warn(writeError);
      return log(`
      ${chalk.green.bold('setStore successful')}
      Run ${chalk.magentaBright('npm start')} to begin developing.
      `);
    });
  });
})();
