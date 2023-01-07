require('dotenv').config();
const { spawn } = require('child_process');

const { STORE_NAME, DEV_STORE_NAME, NODE_ENV } = process.env;
const store = NODE_ENV === 'development' ? DEV_STORE_NAME : STORE_NAME;

spawn('shopify', ['theme', 'list', `--store=${store}`], {
  stdio: 'inherit',
});
