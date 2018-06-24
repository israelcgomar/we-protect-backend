import Joi from 'joi';
import schemas from './routes-validation';

module.exports = {
  validateParam: (schema, name) => {
     return async (ctx, next) => {
      try {
        const result = Joi.validate({ param: ctx['params'][name] }, schema);
        if (result.error) {
          if (process.env.NODE_ENV == 'development') {
            ctx.status = 400
            return ctx.body = { error: result.error.name, message: result.error.details[0].message }
          } else {
            ctx.status = 400
            return ctx.body = { error: result.error.name}
          }
        } else {
          if (!ctx.request.value)
               ctx.request.value = {};

          if (!ctx.request.value['params'])
               ctx.request.value['params'] = {};

          ctx.request.value['params'][name] = await result.value.param;
          await next();
        }
      } catch (e) {
        console.log(e);
        return ctx.status = 500
      }
    }
  },

  validateBody: (schema) => {
    return async (ctx, next) => {
      try {
        const result = Joi.validate(ctx.request.body, schema);
        if (result.error) {
          if (process.env.NODE_ENV == 'development') {
            ctx.status = 400
            return ctx.body = { error: result.error.name, message: result.error.details[0].message }
          } else {
            ctx.status = 400
            return ctx.body = { error: result.error.name}
          }
        } else {
          if (!ctx.request.value)
               ctx.request.value = {};
          if (!ctx.request.value['body'])
               ctx.request.value['body'] = {};
               ctx.request.value['body'] = await result.value;
               await next();
        }
      } catch (e) {
        console.log(e);
        return ctx.status = 500
      }
    }
  },
  schemas
}
