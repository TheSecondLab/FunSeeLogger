const defaultConfig = require('../config/defaultConfig');

module.exports = config => ({
  ...defaultConfig,
  ...config
});
