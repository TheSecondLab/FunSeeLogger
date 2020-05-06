const winston = require('winston');

const __validateConfig = (object) => {
  if (!object.name) {
    throw Error('Please fill in the name for log config');
  }

  if (object.type !== 'console' && object.type !== 'file') {
    throw Error(`Expect the log type to be console or file, but got ${object.type}`);
  }

  if (object.type === 'file' && !object.filename) {
    throw Error('Log filename is required when the type is file');
  }

  if (typeof object.formatter !== 'function') {
    throw Error(`Expect the log formatter to be a function, but got ${typeof object.formatter}`);
  }
};

const defaultTimeStamp = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const defaultFormatter = options => `${options.timestamp()} [${options.level}] ${options.message}`;

const __transTransportsFromString = (key, value) =>
  (value === 'console' ?
    new (winston.transports.Console)({
      name: `${key}_${value}`,
      level: key,
      handleExceptions: key === 'error',
      timestamp: defaultTimeStamp,
      formatter: defaultFormatter
    })
    :
    new (winston.transports.File)({
      name: `${key}_${value}`,
      filename: value,
      level: key,
      handleExceptions: key === 'error',
      json: false,
      timestamp: defaultTimeStamp,
      formatter: defaultFormatter
    }));

const __transTransportsFromObject = (key, object) => {
  __validateConfig(object);

  const {
    type, name, formatter, filename, ...others
  } = object;

  return type === 'console' ?
    new (winston.transports.Console)({
      name,
      level: key,
      handleExceptions: key === 'error',
      formatter,
      ...others
    })
    :
    new (winston.transports.File)({
      name,
      filename,
      level: key,
      handleExceptions: key === 'error',
      formatter,
      ...others
    });
};

module.exports = (config) => {
  const transports = [];
  const keys = Object.keys(config);
  keys.forEach((key) => {
    switch (typeof config[key]) {
      case 'object':
        transports.push(__transTransportsFromObject(key, config[key]));
        break;
      case 'string':
      default:
        transports.push(__transTransportsFromString(key, config[key]));
        break;
    }
  });

  return transports;
};
