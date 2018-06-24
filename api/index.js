'use strict';

import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import importDir from 'import-dir';
import authBasic from 'koa-basic-auth';

import config from '../config/config-auth';
import auth from './auth';
import { token } from './auth/oauth2';
import { validateBody, schemas } from '../utils/Joi';
import { revokeToken } from './auth/InvalidateToken';


const app = new Koa();
app.use(auth(passport));

const router = new Router({
  prefix: '/api/v1'
});

/* Basic Auth */
router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
    } else {
      throw err;
    }
  }
});

router.post('/auth/token',
            authBasic({ name: config.basicAuthName, pass: config.basicAuthPass }),
            token());

router.post('/auth/token/revoke',
            authBasic({ name: config.basicAuthName, pass: config.basicAuthPass }),
            validateBody(schemas.revokeToken._tokenRevoke),
            revokeToken
          );

const routes = importDir('./routes');

Object.keys(routes).forEach(name => {
  const _route = routes[name];
  router.use(_route.routes());
});
app.use(router.routes());

export default app;
