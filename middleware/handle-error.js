'use strict';

import _log from '../utils/logger';

const log = _log(module);

export default function () {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      log.error(err);
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  };
}
