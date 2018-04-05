const winston = require('winston');

module.exports = (config) => {
  return [
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'temp/filelog-info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'temp/filelog-error.log',
      level: 'error',
      handleExceptions: true
    })
  ];
};
