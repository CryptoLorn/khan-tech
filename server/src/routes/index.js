import { Router } from 'express';

import { authRouter } from './auth.router.js';

export const router = new Router();

router.use('/auth', authRouter);