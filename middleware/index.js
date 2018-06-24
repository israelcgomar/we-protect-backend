'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import handleError from './handle-error';

export default function () {
  return compose([
    helmet(),
    convert(cors()),
    convert(bodyParser({
      formidable:{uploadDir: './uploads'},
      multipart: true,
      urlencoded: true
    })),
    convert(methodOverride()),
    handleError()
  ]);
}
