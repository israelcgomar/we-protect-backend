'use strict';

import Router from 'koa-router';
import { newComment, getComment } from '../controllers/comments';

const router = new Router();

router.post('/comment', newComment);

router.get('/comment', getComment);

export default router;
