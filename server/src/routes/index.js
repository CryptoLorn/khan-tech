import { Router } from 'express';

import { authRouter } from './auth.router.js';
import { categoryRouter } from './category.router.js';
import { articleRouter } from './article.router.js';
import { userRouter } from './user.router.js';

export const router = new Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/article', articleRouter);
router.use('/users', userRouter);