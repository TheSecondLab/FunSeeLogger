const Log = require('./Log');

const formatReqInfo = ctx => `
  OriginalUrl: ${ctx.request.originalUrl} \n
  Method: ${ctx.request.method} \n
  ClientIp: ${ctx.request.ip} \n
  RequestBody: ${ctx.request.body}
`;

const formatInfo = (ctx, ms) => `
  ${formatReqInfo(ctx)} \n
  ResponseTime: ${ms}ms \n
  ResponseStatus: ${ctx.status} \n
  ResponseBody: ${ctx.request.originalUrl.indexOf('/api') > 0 ? JSON.stringify(ctx.body) : 'This is not a service api call'}
`;

const formatDump = (ctx, e, ms) => `
  ${formatReqInfo(ctx)} \n
  ResponseTime: ${ms}ms \n
  ErrorName: ${e.name} \n
  ErrorMessage: ${e.message} \n
  ErrorStack: ${e.stack}
`;

module.exports = config => async (ctx, next) => {
  const logger = new Log(config);
  const date = Date.now();

  try {
    await next();
    logger.reqInfo(formatInfo(ctx, Date.now() - date));
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
    logger.systemDump(formatDump(ctx, e, Date.now() - date));
  }
};
