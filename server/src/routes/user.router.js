import { Router } from 'express';

import { userMiddleware } from '../middlewares/user.middleware.js';
import { userController } from '../controllers/user.controller.js';

const router = new Router();

router.get('/',
    userController.getAll
);

router.get('/:id',
    userMiddleware.isUserPresentById,
    userController.getById
);

export const userRouter = router;