/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import mount from 'koa-mount';
import serve from 'koa-static';
import api from './api';
import middleware from './middleware';
import config from './config/config-server';
// import cors from 'cors';

const app = new Koa();
if (config.environment === 'development') {
  app.use(logger());
}
// app.use(cors({ origin: ['http://localhost:8001'] }));
app.use(middleware());
app.use(mount(api));
app.use(serve(`${process.cwd()}/docs`));

export { app };
