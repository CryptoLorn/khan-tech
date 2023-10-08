import { Router } from 'express';

import { articleController } from '../controllers/article.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { userMiddleware } from '../middlewares/user.middleware.js';
import { articleMiddleware } from '../middlewares/article.middleware.js';
import { roleEnum } from '../constants/role.enum.js';

const router = new Router();

router.get('/',
    articleController.getAll
);

router.post('/',
    authMiddleware.checkIsAuth,
    userMiddleware.checkRole(roleEnum.ADMIN),
    articleMiddleware.isBodyCreateValid,
    articleMiddleware.checkIsImg,
    articleMiddleware.isTitleUnique,
    articleController.create
);

router.put('/:id',
    authMiddleware.checkIsAuth,
    userMiddleware.checkRole(roleEnum.ADMIN),
    articleMiddleware.isBodyUpdateValid,
    articleMiddleware.checkIsPresentById,
    articleController.updateById
);

router.delete('/:id',
    authMiddleware.checkIsAuth,
    userMiddleware.checkRole(roleEnum.ADMIN),
    articleMiddleware.checkIsPresentById,
    articleController.deleteById
);

export const articleRouter = router;