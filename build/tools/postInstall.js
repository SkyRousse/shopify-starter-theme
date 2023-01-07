/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const chalk = require('chalk');

const { log } = console;

// Create a new .env file from template.env
fs.copyFile('template.env', '.env', fs.constants.COPYFILE_EXCL, (err) => {
  if (err) {
    if (err.message.includes("file already exists, copyfile")) {
      log(chalk.yellow('Found an existing .env file. Make sure the vars there match what\'s in template.env'));
    } else {
      log(chalk.red(err));
    }
    // throw err;
  } else {
    log(
      chalk.cyanBright(
        "Created a new .env file, before you begin development make sure to set the values for the variables"
      )
    );
  }
});

log(`
${chalk.green.bold('Shopify theme starter installed')}
Run ${chalk.magentaBright('npm start')} to begin developing.
`);
