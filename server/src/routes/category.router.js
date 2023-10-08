import { Router } from 'express';

import { categoryController } from '../controllers/category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { categoryMiddleware } from '../middlewares/category.middleware.js';
import { userMiddleware } from '../middlewares/user.middleware.js';
import { roleEnum } from '../constants/role.enum.js';

const router = new Router();

router.post('/',
    authMiddleware.checkIsAuth,
    userMiddleware.checkRole(roleEnum.ADMIN),
    categoryMiddleware.isCategoryUnique,
    categoryController.create
);

router.get('/:id',
    categoryMiddleware.isPresentById,
    categoryController.getById
);

router.get('/',
    categoryController.getAll
);

export const categoryRouter = router;