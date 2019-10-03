// @flow
require('safestart')(__dirname);
require('babel-core/register');
require('babel-polyfill');

const vault = require('node-vault');
async function buildSecretsBuffer() {
  const vaultClient = vault({
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN,
  });

  const secrets = await vaultClient.list(`apps/outline/staging`, {
    format: 'json',
  });
  const { keys } = secrets.data;
  let output = '';
  for (let key of keys) {
    const read = await vaultClient.read(`apps/outline/staging/${key}`);
    const { value } = read.data;
    output += `${key.toUpperCase()}=${value}\n`;
  }

  return Buffer.from(output);
}

require('dotenv').config({ path: buildSecretsBuffer(), silent: true });
