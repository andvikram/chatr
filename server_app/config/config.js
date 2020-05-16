const yaml = require('js-yaml');
const fs   = require('fs');

const config = yaml.safeLoad(fs.readFileSync(
  __dirname + '/config.yml', 'utf8'))[process.env.NODE_ENV || 'development'];

module.exports = config;