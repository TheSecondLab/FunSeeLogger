// const winston = require('winston');

// var logger = new (winston.Logger)({
//   transports: [
//     new (winston.transports.File)({
//       name: 'info-file',
//       filename: 'temp/filelog-info.log',
//       level: 'info'
//     }),
//     new (winston.transports.File)({
//       name: 'error-file',
//       filename: 'temp/filelog-error.log',
//       level: 'error',
//       handleExceptions: true
//     })
//   ]
// });

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({ handleExceptions: true })
//   ]
// });

// throw new Error('Hello, winston!');

// logger.info('hello')
// logger.error('error')

const Log = require('./lib/Log');

const log = new Log();
log.info("test123");
log.error('error123')