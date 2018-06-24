
import Router from 'koa-router';
import { newPost, getPost } from "../controllers/posts";


const router = new Router();

router.post('/post',
    newPost,
);

router.get('/post',
    getPost,
);

export default router;
