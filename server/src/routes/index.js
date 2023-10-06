import { Router } from 'express';

import { authRouter } from './auth.router.js';
import { categoryRouter } from './category.router.js';

export const router = new Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);