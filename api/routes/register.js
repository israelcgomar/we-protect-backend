'use strict';

import Router from 'koa-router';
import { registerUser, getUsers } from '../controllers/regiter';


const router = new Router();

// const prefix = '/user/:idUser';


router.post(
    '/user',
    registerUser,
);

router.get(
    '/user',
    getUsers,
);

export default router;
