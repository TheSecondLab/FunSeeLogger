const winston = require('winston');

const generateTransport = require('./tool/generateTransport');
const configLoader = require('./tool/configLoader');

const _config = Symbol('config');
const _logger = Symbol('logger');

class Log {
  constructor(config) {
    if (Log.prototype.__instance === undefined) {
      this.__init(config);
      Log.prototype.__instance = this;
    }

    return Log.prototype.__instance;
  }

  __init(config) {
    this[_config] = configLoader(config);

    const transports = generateTransport(_config);
    this[_logger] = new (winston.Logger)({ transports });
  }

  info(str) {
    this.logger.info(str)
  }

  error(str) {
    this.logger.error(str)
  }

  get config() {
    return this[_config];
  }

  get logger() {
    return this[_logger];
  }
}

module.exports = Log;