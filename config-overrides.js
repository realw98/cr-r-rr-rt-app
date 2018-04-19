const rewireSass = require('react-app-rewire-sass-modules');
const rewireEslint = require('react-app-rewire-eslint');

module.exports = function override(config, env) {
  config = rewireSass(config, env);
  config = rewireEslint(config, env);
  return config;
};
