'use strict';

import mongoose from 'mongoose';
import _debug from 'debug';

const debug = _debug('koa-rest-api:route-constraints:objectId');

/**
 * A check to see if id is a valid ObjectId or not
 * @returns {Function}
 */
export function objectIdConstraint() {
  return async (ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
      debug('Invalid ObjectId ==> %s', ctx.params.id);
      ctx.status = 404;
      return ctx.body = {
        error: 'Endpoint not found'
      };
    }
    await next();
  };
}
