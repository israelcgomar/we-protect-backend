'use strict';

import Router from 'koa-router';
import koaBody from 'koa-body';
import { authorize } from '../auth/oauth2';
import { validUser } from '../../middleware/valid-user';

import { create, consult } from '../controllers/photo';

const router = new Router();

router.post('/photo',
    validUser,
    authorize(),
    koaBody({ multipart: true }),
    create
);

router.get('photo',
    validUser,
    authorize(),
    koaBody({ multipart: true }),
    consult
);


export default router;
