import { ApiError } from '../errors/api.error.js';
import { userService } from '../services/user.service.js';

export const userMiddleware = {
    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneByEmail(email);
            if (!user) {
                throw new ApiError('Not found user with this email', 404);
            }

            req.res.locals = {user};
            next();
        } catch (e) {
            next(e);
        }
    }
}