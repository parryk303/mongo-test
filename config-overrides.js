const packageJSON = require('./package.json');
const path = require('path');

module.exports = (config, env) => {
  const alias = packageJSON['@alias'];
	if (alias && Object.keys(alias).length > 0) {
  config.resolve.alias = {
    ...config.resolve.alias,
    ...Object.keys(alias).reduce((acc, key) => {
      acc[key] = path.resolve(alias[key]);
      return acc;
    }, {}),
  };
}

config.entry = './src/client/index.js'

  return config;
};
