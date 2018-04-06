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

    const transports = generateTransport(this.config);
    this[_logger] = new (winston.Logger)({ transports });
  }

  reqInfo(str) {
    this.logger.log('silly', 'Node request message: \n ********request start********** \n%s \n ********request end**********', str);
  }

  systemDump(str) {
    this.logger.log('silly', 'Node Dump: \n WMWMWMWMWMWMWMWMW\n%s \nWMWMWMWMWMWMWMWMW', str);
  }

  error(str) {
    this.logger.error(str);
  }

  warn(str) {
    this.logger.warn(str);
  }

  info(str) {
    this.logger.info(str);
  }

  verbose(str) {
    this.logger.verbose(str);
  }

  debug(str) {
    this.logger.debug(str);
  }

  silly(str) {
    this.logger.silly(str);
  }

  get config() {
    return this[_config];
  }

  get logger() {
    return this[_logger];
  }
}

module.exports = Log;
