const Log = require('./Log');

const formatReqInfo = ctx => `OriginalUrl: ${ctx.request.originalUrl}
Method: ${ctx.request.method}
ClientIp: ${ctx.request.ip}
RequestBody: ${JSON.stringify(ctx.request.body)}`;

const formatInfo = (ctx, ms) => `${formatReqInfo(ctx)}
ResponseTime: ${ms}ms
ResponseStatus: ${ctx.status}
ResponseBody: ${ctx.request.originalUrl.startsWith('/api') ? JSON.stringify(ctx.body) : 'This is not a service api call'}`;

const formatDump = (ctx, e, ms) => `${formatReqInfo(ctx)}
ResponseTime: ${ms}ms
ErrorName: ${e.name}
ErrorMessage: ${e.message}
ErrorStack: ${e.stack}`;

module.exports = (config, app) => async (ctx, next) => {
  const logger = new Log(config);
  const date = Date.now();

  app.context.logger = app.context.logger || logger;

  try {
    await next();
    logger.reqInfo(formatInfo(ctx, Date.now() - date));
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
    logger.systemDump(formatDump(ctx, e, Date.now() - date));
  }
};
