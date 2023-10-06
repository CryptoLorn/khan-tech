import { Router } from 'express';

import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { userMiddleware } from '../middlewares/user.middleware.js';
import { tokenMiddleware } from '../middlewares/token.middleware.js';

const router = new Router();

router.post('/registration',
    authMiddleware.isBodyForRegistrationValid,
    authMiddleware.isEmailUnique,
    authController.registration
);
router.post('/login',
    authMiddleware.isBodyForLoginValid,
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordMatch,
    authController.login
);
router.get('/refresh',
    tokenMiddleware.isRefreshTokenPresent,
    tokenMiddleware.isDataPresentByToken,
    authController.refresh
);
// router.post('/logout', authController.logout);

export const authRouter = router;