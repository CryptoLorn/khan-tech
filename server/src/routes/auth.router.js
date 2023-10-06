import { Router } from 'express';

import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = new Router();

router.post('/registration',
    authMiddleware.isBodyForRegistrationValid,
    authMiddleware.isEmailUnique,
    authController.registration
);
// router.post('/login',
//     userMiddleware.checkIsDataValid,
//     userMiddleware.isUserPresent,
//     authController.login
// );
// router.get('/refresh', authController.refresh);
// router.post('/logout', authController.logout);

export const authRouter = router;